<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-4">打赏支持</h1>
      <p class="text-gray-600 mb-8">如果这个开源项目对你有帮助，可以请我喝一杯咖啡 ☕️。你的支持将帮助我持续维护与迭代。</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        <div class="w-full bg-white rounded-xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-3">微信 WeChat</h2>
          <div class="aspect-w-1 aspect-h-1 w-full max-w-xs mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            <span>
              <img src="@/assets/wechat.png" alt="微信收款码" class="w-full h-[200px] object-contain scale110">
            </span>
          </div>
        </div>
        <div class="w-full bg-white rounded-xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-3">支付宝 Alipay</h2>
          <div class="aspect-w-1 aspect-h-1 w-full max-w-xs mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            <span>
              <img src="@/assets/alipay.png" alt="支付宝收款码" class="w-full h-[200px] object-contain scale110">
            </span>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
        >
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donate'
}
</script>

<style scoped>
/* 这里可以替换为你的二维码图片，例如：
  将二维码图片放在 static 或 assets 目录中，然后用 <img> 引用
*/
.scale110{
  transform: scale(0.6);
}
</style> 