<template>
  <div class="gradient-bg text-white">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:py-24 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          让您的前端简历
          <span class="block sm:inline">脱颖而出</span>
        </h1>
        <p class="mt-4 sm:mt-6 max-w-lg mx-auto text-lg sm:text-xl px-4 sm:px-0">
          专为前端开发者设计的AI简历优化平台，通过率提升300%
        </p>
        <!-- 移动端优化：添加按钮区域 -->
        <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
          <router-link
            to="/resume-optimize"
            class="bg-white text-indigo-600 px-6 py-3 rounded-md text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors duration-200"
          >
            免费分析简历
          </router-link>
          <router-link
            to="/interview-questions"
            class="bg-indigo-500 bg-opacity-20 text-white px-6 py-3 rounded-md text-base sm:text-lg font-bold hover:bg-opacity-30 transition-colors duration-200"
          >
            查看成功案例
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style scoped>
/* 确保渐变背景在所有设备上都有良好效果 */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
}

/* 移动端文字优化 */
@media (max-width: 640px) {
  .gradient-bg {
    min-height: 50vh;
  }
}
</style>
