<template>
  <div class="bg-indigo-700">
    <div class="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white lg:text-4xl leading-tight">
        <span class="block">立即提升您的求职竞争力</span>
      </h2>
      <p class="mt-3 sm:mt-4 text-base sm:text-lg leading-6 text-indigo-200 px-2 sm:px-0">
        前端开发者的第一选择，已有3,287位开发者通过我们的服务获得理想工作
      </p>
      <div class="mt-6 sm:mt-8">
        <router-link
          to="/resume-optimize"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"
        >
          免费开始优化
          <i class="fas fa-arrow-right ml-2 sm:ml-3"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cta'
}
</script>

<style scoped>
/* 确保按钮在移动端有足够的点击区域 */
@media (max-width: 640px) {
  .inline-flex {
    min-height: 48px;
  }
}
</style>
