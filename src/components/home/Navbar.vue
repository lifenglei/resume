<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 15:02:18
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-08-30
 * @FilePath: /resume/src/components/home/Navbar.vue
 * @Description: 响应式导航栏组件，支持桌面端和移动端完美展示
 *
-->
<template>
  <div class="relative">
    <nav class="bg-white/95">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo和品牌 -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center group">
              <div class="relative">
                <div class="absolute -inset-1 bg-indigo-400 rounded-full opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <router-link to="/" class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                <span class="font-bold text-xl text-primary"> 简历助手 </span>
              </router-link>
            </div>
          </div>

          <!-- 桌面端导航菜单 -->
          <div class="hidden md:flex md:items-center md:space-x-1">
            <router-link
              to="/"
              class="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              active-class="text-indigo-600 bg-indigo-50"
              exact
            >
              <span class="relative z-10">首页</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 transition-opacity duration-200" :class="{'opacity-100': $route.path === '/'}"></div>
            </router-link>
            
            <router-link
              to="/resume-optimize"
              class="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              active-class="text-indigo-600 bg-indigo-50"
            >
              <span class="relative z-10">AI简历优化</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 transition-opacity duration-200" :class="{'opacity-100': $route.path === '/resume-optimize'}"></div>
            </router-link>
            <router-link
              to="/salary-report"
              class="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              active-class="text-indigo-600 bg-indigo-50"
            >
              <span class="relative z-10">AI生成简历</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 transition-opacity duration-200" :class="{'opacity-100': $route.path === '/salary-report'}"></div>
            </router-link>
            <router-link
            to="/interview-questions"
            class="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
            active-class="text-indigo-600 bg-indigo-50"
          >
            <span class="relative z-10">面试题库</span>
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 transition-opacity duration-200" :class="{'opacity-100': $route.path === '/interview-questions'}"></div>
          </router-link>
            <router-link
              to="/donate"
              class="relative animate-bounce px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              active-class="text-indigo-600 bg-indigo-50"
            >
              <span class="relative z-10 text-red-500" style="font-size: 18px;">打赏</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 transition-opacity duration-200" :class="{'opacity-100': $route.path === '/donate'}"></div>
            </router-link>
          </div>

          <!-- 桌面端CTA按钮 -->
          <div class="hidden md:flex md:items-center md:space-x-3">
            <!-- 未登录状态显示登录按钮 -->
            <router-link
              v-if="!currentUser"
              to="/login"
              class="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              active-class="text-white bg-indigo-600"
            >
              <span class="relative z-10">登录</span>
              <div class="absolute inset-0 bg-white rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            </router-link>

            <!-- 已登录状态显示用户头像 -->
            <div v-else class="relative">
              <button
                @click="toggleUserDropdown"
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="text-sm font-medium">{{ getUserAvatar() }}</span>
              </button>

              <!-- 用户下拉菜单 -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="showUserDropdown"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                  <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div class="font-medium">{{ currentUser.email }}</div>
                    <div class="text-xs text-gray-500">{{ currentUser.email }}</div>
                  </div>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <i class="fas fa-sign-out-alt mr-2"></i>
                    退出登录
                  </button>
                </div>
              </transition>
            </div>

            <router-link
              to="/resume-optimize"
              class="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span class="relative z-10">开始优化简历</span>
              <div class="absolute inset-0 bg-white rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            </router-link>
          </div>

          <!-- 移动端菜单按钮 -->
          <div class="md:hidden flex items-center bg-white">
            <button
              @click="toggleMobileMenu"
              class="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">打开主菜单</span>
              
              <!-- 汉堡菜单图标 -->
              <div class="relative w-6 h-6">
                <span
                  class="absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300"
                  :class="{ 'rotate-45 translate-y-2.5': isMobileMenuOpen }"
                ></span>
                <span
                  class="absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300"
                  :class="{ 'opacity-0': isMobileMenuOpen }"
                ></span>
                <span
                  class="absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300"
                  :class="{ '-rotate-45 -translate-y-2.5': isMobileMenuOpen }"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 移动端遮罩层 - 覆盖整个页面 -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden fixed inset-0 bg-black bg-opacity-60 z-50"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <!-- 移动端菜单 - 在遮罩层之上 -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-4 opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-2xl border-t border-gray-100"
      >
        <div class="px-4 pt-4 pb-6 space-y-3">
          <router-link
            to="/"
            class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            active-class="text-indigo-600 bg-indigo-50"
            exact
            @click.native="closeMobileMenu"
          >
            <i class="fas fa-home mr-3 text-indigo-500"></i>
            首页
          </router-link>
          
          <router-link
            to="/resume-optimize"
            class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            active-class="text-indigo-600 bg-indigo-50"
            @click.native="closeMobileMenu"
          >
            <i class="fas fa-magic mr-3 text-indigo-500"></i>
            AI简历优化
          </router-link>
          <router-link
            to="/salary-report"
            class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            active-class="text-indigo-600 bg-indigo-50"
            @click.native="closeMobileMenu"
          >
            <i class="fas fa-file-alt mr-3 text-indigo-500"></i>
            AI生成简历
          </router-link>
          <router-link
          to="/interview-questions"
          class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
          active-class="text-indigo-600 bg-indigo-50"
          @click.native="closeMobileMenu"
        >
          <i class="fas fa-graduation-cap mr-3 text-indigo-500"></i>
          面试题库
        </router-link>

          <!-- 移动端未登录状态 -->
          <router-link
            v-if="!currentUser"
            to="/login"
            class="flex items-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md"
            active-class="text-white bg-indigo-600"
            @click.native="closeMobileMenu"
          >
            <i class="fas fa-sign-in-alt mr-3 text-white"></i>
            登录
          </router-link>

          <!-- 移动端已登录状态 -->
          <div v-else class="pt-3 border-t border-gray-100">
            <div class="flex items-center px-4 py-2 mb-2">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-xs mr-3">
                <span class="text-xs">{{ getUserAvatar() }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-gray-900 truncate">{{ currentUser.email }}</div>
                <div class="text-xs text-gray-500 truncate">{{ currentUser.email }}</div>
              </div>
            </div>
            <button
              @click="handleLogout(); closeMobileMenu()"
              class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
            >
              <i class="fas fa-sign-out-alt mr-3"></i>
              退出登录
            </button>
          </div>

          <!-- <div class="pt-4 border-t border-gray-100">
            <router-link
              to="/resume-optimize"
              class="block w-full px-4 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              @click="closeMobileMenu"
            >
              <i class="fas fa-rocket mr-2"></i>
              开始优化简历
            </router-link>
          </div> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'Navbar',
  data() {
    return {
      isMobileMenuOpen: false,
      isScrolled: false,
      currentUser: null,
      showUserDropdown: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      this.toggleBodyScroll()
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      this.toggleBodyScroll()
    },
    toggleBodyScroll() {
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10
    },
    // 获取用户信息
    getCurrentUser() {
      this.currentUser = authService.getCurrentUser()
    },
    // 切换用户下拉菜单
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
    },
    // 关闭用户下拉菜单
    closeUserDropdown() {
      this.showUserDropdown = false
    },
    // 处理退出登录
    async handleLogout() {
      try {
        const result = await authService.signOut()
        if (result.success) {
          this.currentUser = null
          this.showUserDropdown = false
          this.$router.push('/')
        }
      } catch (error) {
        console.error('退出登录失败:', error)
      }
    },
    // 获取用户头像或首字母
    getUserAvatar() {
      if (!this.currentUser) return ''

      // 返回邮箱首字母作为头像
      return  'D'
    }
  },
  mounted() {
    // 获取当前用户信息
    this.getCurrentUser()

    // 监听认证状态变化
    this.unsubscribeAuth = authService.onAuthStateChange((event, session) => {
      this.getCurrentUser()
    })

    // 监听窗口大小变化
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        this.closeMobileMenu()
        this.closeUserDropdown()
      }
    }

    // 监听滚动
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', handleResize)

    // 点击外部关闭下拉菜单
    this.handleClickOutside = (event) => {
      if (!this.$el.contains(event.target)) {
        this.closeUserDropdown()
      }
    }
    document.addEventListener('click', this.handleClickOutside)

    // 保存事件处理器以便清理
    this._handleResize = handleResize
  },
  beforeDestroy() {
    // 清理认证状态监听
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth()
    }

    // 清理事件监听器
    window.removeEventListener('scroll', this.handleScroll)
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize)
    }
    if (this.handleClickOutside) {
      document.removeEventListener('click', this.handleClickOutside)
    }
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
/* 固定导航栏的顶部间距补偿 */
body {
  margin-top: 0;
}

/* 导航栏固定定位的样式增强 */
nav {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 链接样式重置 */
.router-link-active {
  text-decoration: none;
}

/* 移动端菜单动画优化 */
@media (max-width: 767px) {
  .md\:hidden {
    transition: all 0.3s ease-in-out;
  }
}

/* 滚动时的导航栏样式 */
nav.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 用户下拉菜单样式 */
.user-dropdown {
  transform-origin: top right;
}

/* 头像按钮样式 */
.avatar-button {
  position: relative;
  overflow: hidden;
}

.avatar-button img {
  transition: transform 0.2s ease;
}

.avatar-button:hover img {
  transform: scale(1.05);
}

/* 下拉菜单项样式 */
.dropdown-item {
  transition: all 0.15s ease;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

/* 移动端用户信息样式 */
.mobile-user-info {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}
</style>
