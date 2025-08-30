<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 15:26:00
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-03-27 15:27:36
 * @FilePath: /resume/src/pages/interviewQuestions/index.vue
 * @Description:
 *
-->
<!-- views/InterviewQuestions.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 sm:tracking-tight">
          前端面试题库
        </h1>
        <p class="mt-3 sm:mt-5 max-w-xl mx-auto text-lg sm:text-xl text-gray-500 px-4 sm:px-0">
          精选高频面试题，助力前端开发者求职
        </p>
      </div>

      <!-- 题库内容（占位） -->
      <div class="bg-white overflow-hidden shadow rounded-lg p-4 sm:p-6 lg:p-8 text-center">
        <p class="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
          题库正在整理中，现暂提供飞书文档地址占位，稍后上线完整题库。
        </p>
        <a
          href="https://ts79eulyh8.feishu.cn/docx/LNgBdwRxyo2nzcxD5uycboylnHf"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-auto justify-center"
        >
          前往飞书题库
          <span class="ml-2">↗</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterviewQuestions',
  components: {
  },
  data () {
    return {
      categories: [
        {
          id: 'javascript',
          name: 'JavaScript',
          icon: 'fab fa-js',
          count: 128
        },
        {
          id: 'react',
          name: 'React',
          icon: 'fab fa-react',
          count: 86
        },
        {
          id: 'vue',
          name: 'Vue',
          icon: 'fab fa-vuejs',
          count: 72
        },
        {
          id: 'browser',
          name: '浏览器原理',
          icon: 'fas fa-window-maximize',
          count: 54
        },
        {
          id: 'algorithm',
          name: '算法与数据结构',
          icon: 'fas fa-project-diagram',
          count: 63
        },
        {
          id: 'system-design',
          name: '系统设计',
          icon: 'fas fa-sitemap',
          count: 42
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 移动端优化 */
@media (max-width: 640px) {
  /* 确保按钮在移动端有足够的点击区域 */
  a {
    min-height: 44px;
  }
}
</style>
