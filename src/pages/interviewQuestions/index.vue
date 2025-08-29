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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          前端面试题库
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          精选高频面试题，助力前端开发者求职
        </p>
      </div>

      <!-- 题库内容（占位） -->
      <div class="bg-white overflow-hidden shadow rounded-lg p-8 text-center">
        <p class="text-gray-700 mb-6">
          题库正在整理中，现暂提供飞书文档地址占位，稍后上线完整题库。
        </p>
        <a
          href="https://ts79eulyh8.feishu.cn/docx/LNgBdwRxyo2nzcxD5uycboylnHf"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
