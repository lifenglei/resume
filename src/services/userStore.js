/*
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-01-27 14:39:37
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-01-27 14:39:37
 * @FilePath: /resume/src/services/userStore.js
 * @Description: 用户状态管理 - 全局用户状态管理和跨组件通信
 */

import Vue from 'vue'
import authService from './authService'

// 创建全局事件总线
const eventBus = new Vue()

// 用户状态数据
const state = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  lastActivity: null
}

// 用户状态管理类
class UserStore {
  constructor() {
    this.state = Vue.observable(state)
    this.initializeStore()
  }

  /**
   * 初始化用户状态管理
   */
  initializeStore() {
    // 监听认证状态变化
    authService.onAuthStateChange((event, session) => {
      this.handleAuthStateChange(event, session)
    })

    // 监听页面可见性变化（处理跨标签页同步）
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.syncAuthState()
      }
    })

    // 监听存储变化（处理跨标签页同步）
    window.addEventListener('storage', (e) => {
      if (e.key === 'supabase.auth.token') {
        this.syncAuthState()
      }
    })

    // 定期同步认证状态
    setInterval(() => {
      this.syncAuthState()
    }, 30000) // 每30秒同步一次
  }

  /**
   * 处理认证状态变化
   * @param {string} event - 认证事件
   * @param {object} session - 会话信息
   */
  handleAuthStateChange(event, session) {
    console.log('认证状态变化:', event, session)
    
    this.state.isLoading = false
    
    switch (event) {
      case 'SIGNED_IN':
        this.state.user = session.user
        this.state.session = session
        this.state.isAuthenticated = true
        this.state.lastActivity = new Date()
        this.emit('user:login', session.user)
        break
        
      case 'SIGNED_OUT':
        this.state.user = null
        this.state.session = null
        this.state.isAuthenticated = false
        this.state.lastActivity = null
        this.emit('user:logout')
        break
        
      case 'TOKEN_REFRESHED':
        this.state.session = session
        this.state.lastActivity = new Date()
        this.emit('user:token-refreshed', session)
        break
        
      case 'USER_UPDATED':
        this.state.user = session.user
        this.state.lastActivity = new Date()
        this.emit('user:updated', session.user)
        break
    }
  }

  /**
   * 同步认证状态
   */
  async syncAuthState() {
    try {
      const isAuth = authService.isAuthenticated()
      const user = authService.getCurrentUser()
      const session = authService.getCurrentSession()
      
      if (isAuth !== this.state.isAuthenticated) {
        this.state.isAuthenticated = isAuth
        this.state.user = user
        this.state.session = session
        this.state.lastActivity = new Date()
        
        if (isAuth) {
          this.emit('user:sync-login', user)
        } else {
          this.emit('user:sync-logout')
        }
      }
    } catch (error) {
      console.error('同步认证状态失败:', error)
    }
  }

  /**
   * 获取当前用户
   * @returns {object|null} 当前用户信息
   */
  getCurrentUser() {
    return this.state.user
  }

  /**
   * 获取当前会话
   * @returns {object|null} 当前会话信息
   */
  getCurrentSession() {
    return this.state.session
  }

  /**
   * 检查用户是否已认证
   * @returns {boolean} 是否已认证
   */
  isAuthenticated() {
    return this.state.isAuthenticated
  }

  /**
   * 获取用户信息
   * @param {string} key - 用户信息键名
   * @returns {any} 用户信息值
   */
  getUserInfo(key) {
    if (!this.state.user) return null
    
    if (key) {
      return this.state.user[key] || this.state.user.user_metadata[key]
    }
    
    return this.state.user
  }

  /**
   * 更新用户信息
   * @param {object} updates - 要更新的用户信息
   * @returns {Promise<{success: boolean, error?: object}>}
   */
  async updateUserInfo(updates) {
    try {
      this.state.isLoading = true
      
      const result = await authService.updateUser(updates)
      
      if (result.success) {
        this.state.lastActivity = new Date()
        this.emit('user:info-updated', updates)
      }
      
      return result
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return {
        success: false,
        error: { message: '更新用户信息失败' }
      }
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * 用户登出
   * @returns {Promise<{success: boolean, error?: object}>}
   */
  async logout() {
    try {
      this.state.isLoading = true
      
      const result = await authService.signOut()
      
      if (result.success) {
        this.state.user = null
        this.state.session = null
        this.state.isAuthenticated = false
        this.state.lastActivity = null
        this.emit('user:logout')
      }
      
      return result
    } catch (error) {
      console.error('用户登出失败:', error)
      return {
        success: false,
        error: { message: '用户登出失败' }
      }
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * 添加事件监听器
   * @param {string} event - 事件名称
   * @param {function} callback - 回调函数
   * @returns {function} 取消监听的函数
   */
  on(event, callback) {
    eventBus.$on(event, callback)
    
    // 返回取消监听的函数
    return () => {
      eventBus.$off(event, callback)
    }
  }

  /**
   * 触发事件
   * @param {string} event - 事件名称
   * @param {...any} args - 事件参数
   */
  emit(event, ...args) {
    eventBus.$emit(event, ...args)
  }

  /**
   * 获取用户状态
   * @returns {object} 用户状态对象
   */
  getState() {
    return {
      user: this.state.user,
      session: this.state.session,
      isAuthenticated: this.state.isAuthenticated,
      isLoading: this.state.isLoading,
      lastActivity: this.state.lastActivity
    }
  }

  /**
   * 检查用户权限
   * @param {string} permission - 权限名称
   * @returns {boolean} 是否有权限
   */
  hasPermission(permission) {
    if (!this.state.user) return false
    
    const userRole = this.state.user.role || 'user'
    const userPermissions = this.state.user.user_metadata[permissions] || []
    
    // 管理员拥有所有权限
    if (userRole === 'admin') return true
    
    // 检查特定权限
    return userPermissions.includes(permission)
  }

  /**
   * 检查用户角色
   * @param {string} role - 角色名称
   * @returns {boolean} 是否有该角色
   */
  hasRole(role) {
    if (!this.state.user) return false
    
    const userRole = this.state.user.role || 'user'
    return userRole === role
  }
}

// 创建单例实例
const userStore = new UserStore()

// 导出实例和类
export default userStore
export { UserStore }
