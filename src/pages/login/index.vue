<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-01-27 14:39:37
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-01-27 14:39:37
 * @FilePath: /resume/src/pages/login /index.vue
 * @Description: 登录注册页面 - 支持用户登录、注册和密码重置
-->

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 页面标题 -->
      <div class="text-center">
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
          <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ isLoginMode ? '欢迎回来' : '创建账户' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLoginMode ? '登录您的账户以继续使用' : '注册新账户开始您的旅程' }}
        </p>
      </div>

      <!-- 认证表单 -->
      <div class="mt-8 bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
        <!-- 模式切换按钮 -->
        <div class="flex rounded-lg p-1 bg-gray-100 mb-6">
          <button
            @click="switchToLogin"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
              isLoginMode 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            登录
          </button>
          <button
            @click="switchToRegister"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
              !isLoginMode 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            注册
          </button>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <!-- 成功提示 -->
        <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-800">{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 邮箱输入 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              邮箱地址
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="请输入邮箱地址"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': emailError }"
              />
            </div>
            <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
          </div>

          <!-- 密码输入 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="请输入密码"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': passwordError }"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                  <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
          </div>

          <!-- 确认密码（仅注册时显示） -->
          <div v-if="!isLoginMode">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              确认密码
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="请再次输入密码"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': confirmPasswordError }"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  @click="toggleConfirmPasswordVisibility"
                  class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                  <svg v-if="showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">{{ confirmPasswordError }}</p>
          </div>

          <!-- 忘记密码链接（仅登录时显示） -->
          <div v-if="isLoginMode" class="flex items-center justify-between">
            <button
              type="button"
              @click="handleForgotPassword"
              class="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
            >
              忘记密码？
            </button>
          </div>

          <!-- 提交按钮 -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isLoading ? (isLoginMode ? '登录中...' : '注册中...') : (isLoginMode ? '登录' : '注册') }}
            </button>
          </div>

          <!-- 返回首页链接 -->
          <div class="text-center">
            <router-link
              to="/"
              class="text-sm text-gray-600 hover:text-indigo-600 focus:outline-none focus:underline"
            >
              ← 返回首页
            </router-link>
          </div>
        </form>
      </div>

      <!-- 底部说明 -->
      <div class="text-center text-sm text-gray-500">
        <p>使用我们的服务即表示您同意我们的</p>
        <a href="#" class="text-indigo-600 hover:text-indigo-500">服务条款</a>
        <span> 和 </span>
        <a href="#" class="text-indigo-600 hover:text-indigo-500">隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'LoginPage',
  data() {
    return {
      // 表单数据
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      
      // UI 状态
      isLoginMode: true,
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false,
      
      // 错误和成功消息
      errorMessage: '',
      successMessage: '',
      
      // 表单验证错误
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    }
  },
  
  methods: {
    // 切换到登录模式
    switchToLogin() {
      this.isLoginMode = true
      this.clearMessages()
      this.clearForm()
    },
    
    // 切换到注册模式
    switchToRegister() {
      this.isLoginMode = false
      this.clearMessages()
      this.clearForm()
    },
    
    // 清除消息
    clearMessages() {
      this.errorMessage = ''
      this.successMessage = ''
      this.emailError = ''
      this.passwordError = ''
      this.confirmPasswordError = ''
    },
    
    // 清除表单
    clearForm() {
      this.form = {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    
    // 切换密码可见性
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    
    // 切换确认密码可见性
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    
    // 表单验证
    validateForm() {
      this.clearMessages()
      let isValid = true
      
      // 邮箱验证
      if (!this.form.email) {
        this.emailError = '请输入邮箱地址'
        isValid = false
      } else if (!this.isValidEmail(this.form.email)) {
        this.emailError = '请输入有效的邮箱地址'
        isValid = false
      }
      
      // 密码验证
      if (!this.form.password) {
        this.passwordError = '请输入密码'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.passwordError = '密码至少需要6个字符'
        isValid = false
      }
      
      // 确认密码验证（仅注册时）
      if (!this.isLoginMode) {
        if (!this.form.confirmPassword) {
          this.confirmPasswordError = '请确认密码'
          isValid = false
        } else if (this.form.password !== this.form.confirmPassword) {
          this.confirmPasswordError = '两次输入的密码不一致'
          isValid = false
        }
      }
      
      return isValid
    },
    
    // 邮箱格式验证
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    // 处理表单提交
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.isLoading = true
      this.clearMessages()
      
      try {
        if (this.isLoginMode) {
          await this.handleLogin()
        } else {
          await this.handleRegister()
        }
      } catch (error) {
        console.error('认证失败:', error)
        this.errorMessage = '操作失败，请稍后重试'
      } finally {
        this.isLoading = false
      }
    },
    
    // 处理登录
    async handleLogin() {
      const result = await authService.signIn(this.form.email, this.form.password)
      
      if (result.success) {
        this.successMessage = '登录成功！正在跳转...'
        setTimeout(() => {
          // 检查是否有重定向路径
          const redirectPath = this.$route.query.redirect || '/'
          this.$router.push(redirectPath)
        }, 1500)
      } else {
        this.errorMessage = this.getErrorMessage(result.error)
      }
    },
    
    // 处理注册
    async handleRegister() {
      const result = await authService.signUp(
        this.form.email, 
        this.form.password,
        {
          full_name: this.form.email.split('@')[0] // 使用邮箱前缀作为默认用户名
        }
      )
      
      if (result.success) {
        this.successMessage = '注册成功！请检查您的邮箱以验证账户。'
        // 可以在这里添加邮箱验证提示
      } else {
        this.errorMessage = this.getErrorMessage(result.error)
      }
    },
    
    // 处理忘记密码
    async handleForgotPassword() {
      if (!this.form.email) {
        this.errorMessage = '请先输入邮箱地址'
        return
      }
      
      if (!this.isValidEmail(this.form.email)) {
        this.errorMessage = '请输入有效的邮箱地址'
        return
      }
      
      this.isLoading = true
      this.clearMessages()
      
      try {
        const result = await authService.resetPassword(this.form.email)
        
        if (result.success) {
          this.successMessage = '密码重置邮件已发送，请检查您的邮箱。'
        } else {
          this.errorMessage = this.getErrorMessage(result.error)
        }
      } catch (error) {
        console.error('重置密码失败:', error)
        this.errorMessage = '发送重置邮件失败，请稍后重试'
      } finally {
        this.isLoading = false
      }
    },
    
    // 获取错误消息
    getErrorMessage(error) {
      if (!error) return '未知错误'
      
      // 使用 authService 的 formatError 方法
      const formattedError = authService.formatError(error)
      return formattedError.message || '操作失败，请稍后重试'
    }
  },
  
  mounted() {
    // 检查是否已经登录
    if (authService.isAuthenticated()) {
      this.$router.push('/')
    }
    
    // 添加认证状态监听
    this.unsubscribeAuth = authService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        this.successMessage = '登录成功！正在跳转...'
        setTimeout(() => {
          const redirectPath = this.$route.query.redirect || '/'
          this.$router.push(redirectPath)
        }, 1500)
      }
    })
  },
  
  beforeDestroy() {
    // 清理认证状态监听
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth()
    }
  }
}
</script>

<style scoped>
/* 自定义样式 */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 输入框聚焦效果 */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

/* 按钮悬停效果 */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .min-h-screen {
    padding: 1rem;
  }
  
  .max-w-md {
    max-width: 100%;
  }
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
