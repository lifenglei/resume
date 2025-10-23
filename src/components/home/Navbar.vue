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
          <div class="hidden md:flex md:items-center">
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
export default {
  name: 'Navbar',
  data() {
    return {
      isMobileMenuOpen: false,
      isScrolled: false
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
    }
  },
  mounted() {
    // 监听窗口大小变化
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        this.closeMobileMenu()
      }
    }
    
    // 监听滚动
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', handleResize)
    
    // 保存事件处理器以便清理
    this._handleResize = handleResize
  },
  beforeDestroy() {
    // 清理事件监听器
    window.removeEventListener('scroll', this.handleScroll)
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize)
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
</style>
