<template>
  <div class="bg-indigo-700">
    <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
        <span class="block">立即提升您的求职竞争力</span>
      </h2>
      <p class="mt-4 text-lg leading-6 text-indigo-200">
        前端开发者的第一选择，已有3,287位开发者通过我们的服务获得理想工作
      </p>
      <button
        class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        @click="handleCtaClick"
      >
        免费开始优化
        <i class="fas fa-arrow-right ml-3"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cta',
  methods: {
    handleCtaClick () {
      // 这里可以添加点击事件处理逻辑
      console.log('CTA按钮被点击')
      // 例如: this.$router.push('/signup')
    }
  }
}
</script>
