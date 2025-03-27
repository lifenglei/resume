<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 15:02:18
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-03-27 15:26:45
 * @FilePath: /resume/src/components/home/Navbar.vue
 * @Description:
 *
-->
<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <i class="fas fa-code text-2xl text-indigo-600 mr-2"></i>
            <router-link to="/" class="text-xl font-bold text-gray-900 no-underline">FrontEnd Career</router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
              exact
            >
              首页
            </router-link>
            <router-link
              to="/resume-optimize"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
              简历优化
            </router-link>
            <router-link
              to="/interview-questions"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
              面试题库
            </router-link>
            <router-link
              to="/salary-report"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
              薪资报告
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <router-link
            to="/resume-optimize"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            开始优化简历
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* 确保链接没有下划线 */
.no-underline {
  text-decoration: none;
}
</style>
