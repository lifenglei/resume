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

      <!-- 题库内容 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 题目分类卡片 -->
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/interview-questions/${category.id}`"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <i :class="category.icon" class="text-white text-xl"></i>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-gray-900">{{ category.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ category.count }}道题目</p>
              </div>
            </div>
          </div>
        </router-link>
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
