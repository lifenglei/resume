/*
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-01-27 14:39:37
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-01-27 14:39:37
 * @FilePath: /resume/src/services/authService.js
 * @Description: 认证服务 - 封装所有 Supabase 认证相关的方法和逻辑
 */

import supabase from '../config/supabase'

// 用户状态管理
let currentUser = null
let currentSession = null
let authListeners = []

/**
 * 认证服务类
 */
class AuthService {
  constructor() {
    this.initializeAuth()
  }

  /**
   * 初始化认证状态
   */
  async initializeAuth() {
    try {
      // 对于 Supabase 1.35.7 版本，使用 session() 而不是 getSession()
      const session = supabase.auth.session()

      if (session) {
        currentSession = session
        currentUser = session.user
        this.notifyListeners('SIGNED_IN', session)
      }
    } catch (error) {
      console.error('初始化认证失败:', error)
    }

    // 监听认证状态变化
    supabase.auth.onAuthStateChange((event, session) => {
      currentSession = session
      currentUser = session && session.user || null
      this.notifyListeners(event, session)
    })
  }

  /**
   * 用户登录
   * @param {string} email - 邮箱地址
   * @param {string} password - 密码
   * @returns {Promise<{success: boolean, user?: object, error?: object}>}
   */
  async signIn(email, password) {
    try {
      // 对于 Supabase 1.35.7 版本，使用 signIn() 方法
      const result = await supabase.auth.signIn({
        email,
        password
      })

      // 解析返回的数据结构
      let user = null
      let session = null
      let error = null

      if (result.error) {
        error = result.error
      } else if (result.user && result.session) {
        // 直接解构格式
        user = result.user
        session = result.session
      } else if (result.data) {
        // 嵌套data格式
        user = result.data.user
        session = result.data.session
      } else {
        console.warn('登录成功但返回数据格式异常:', result)
      }

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      currentUser = user
      currentSession = session

      return {
        success: true,
        user: user,
        session: session
      }
    } catch (error) {
      console.error('登录失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 用户注册
   * @param {string} email - 邮箱地址
   * @param {string} password - 密码
   * @param {object} metadata - 用户元数据
   * @returns {Promise<{success: boolean, user?: object, error?: object}>}
   */
  async signUp(email, password, metadata = {}) {
    try {
      const result = await supabase.auth.signUp({
        email,
        password,
        data: metadata  // 对于1.35.7版本，直接传递data而不是options.data
      })

      // Supabase 1.35.7 版本的 signUp 返回结构分析
      // result 可能包含: { user, session, error } 或 { data: { user, session }, error }
      let user = null
      let session = null
      let error = null

      if (result.error) {
        error = result.error
      } else if (result.user && result.session) {
        // 直接解构格式
        user = result.user
        session = result.session
      } else if (result.data) {
        // 嵌套data格式
        user = result.data.user
        session = result.data.session
      } else {
        // 安全降级，防止空数据
        console.warn('注册成功但返回数据格式异常:', result)
      }

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      return {
        success: true,
        user: user,
        session: session
      }
    } catch (error) {
      console.error('注册失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 用户登出
   * @returns {Promise<{success: boolean, error?: object}>}
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      currentUser = null
      currentSession = null

      return {
        success: true
      }
    } catch (error) {
      console.error('登出失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 重置密码
   * @param {string} email - 邮箱地址
   * @returns {Promise<{success: boolean, error?: object}>}
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?reset=true`
      })

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      return {
        success: true
      }
    } catch (error) {
      console.error('重置密码失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 更新密码
   * @param {string} newPassword - 新密码
   * @returns {Promise<{success: boolean, error?: object}>}
   */
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      return {
        success: true
      }
    } catch (error) {
      console.error('更新密码失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 获取当前用户
   * @returns {object|null} 当前用户信息
   */
  getCurrentUser() {
    return currentUser
  }

  /**
   * 获取当前会话
   * @returns {object|null} 当前会话信息
   */
  getCurrentSession() {
    return currentSession
  }

  /**
   * 检查用户是否已认证
   * @returns {boolean} 是否已认证
   */
  isAuthenticated() {
    return !!currentUser && !!currentSession
  }

  /**
   * 获取访问令牌
   * @returns {string|null} 访问令牌
   */
  getAccessToken() {
    return currentSession && currentSession.access_token || null
  }

  /**
   * 添加认证状态监听器
   * @param {function} callback - 回调函数
   * @returns {function} 取消监听的函数
   */
  onAuthStateChange(callback) {
    authListeners.push(callback)

    // 返回取消监听的函数
    return () => {
      const index = authListeners.indexOf(callback)
      if (index > -1) {
        authListeners.splice(index, 1)
      }
    }
  }

  /**
   * 通知所有监听器
   * @param {string} event - 事件类型
   * @param {object} session - 会话信息
   */
  notifyListeners(event, session) {
    authListeners.forEach(callback => {
      try {
        callback(event, session)
      } catch (error) {
        console.error('认证状态监听器错误:', error)
      }
    })
  }

  /**
   * 格式化错误信息
   * @param {object} error - 原始错误对象
   * @returns {object} 格式化后的错误对象
   */
  formatError(error) {
    if (!error) return { message: '未知错误' }

    // 常见错误消息映射
    const errorMessages = {
      'Invalid login credentials': '邮箱或密码错误',
      'Email not confirmed': '请先验证您的邮箱',
      'User already registered': '该邮箱已被注册',
      'Password should be at least 6 characters': '密码至少需要6个字符',
      'Invalid email': '邮箱格式不正确',
      'Signup is disabled': '注册功能暂时关闭',
      'Email rate limit exceeded': '发送邮件过于频繁，请稍后重试',
      'Invalid token': '无效的令牌',
      'Token has expired': '令牌已过期',
      'User not found': '用户不存在'
    }

    return {
      message: errorMessages[error.message] || error.message || '操作失败，请稍后重试',
      originalError: error
    }
  }

  /**
   * 更新用户信息
   * @param {object} updates - 要更新的用户信息
   * @returns {Promise<{success: boolean, user?: object, error?: object}>}
   */
  async updateUser(updates) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      currentUser = data.user

      return {
        success: true,
        user: data.user
      }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 刷新会话
   * @returns {Promise<{success: boolean, session?: object, error?: object}>}
   */
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession()

      if (error) {
        return {
          success: false,
          error: this.formatError(error)
        }
      }

      currentSession = data.session
      currentUser = data.user

      return {
        success: true,
        session: data.session,
        user: data.user
      }
    } catch (error) {
      console.error('刷新会话失败:', error)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }
}

// 创建单例实例
const authService = new AuthService()

// 导出实例和类
export default authService
export { AuthService }
