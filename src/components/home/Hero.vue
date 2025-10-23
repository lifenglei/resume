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
    <div class="hidden lg:block">
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div class="bg-white rounded-xl p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <span class="text-gray-900 font-semibold">面试邀请率</span>
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">+250%</span>
          </div>
          <div class="relative h-48">
            <svg viewBox="0 0 300 150" class="w-full h-full">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
                </linearGradient>
              </defs>
              <path d="M 0 120 Q 50 100 75 80 T 150 50 T 225 20 T 300 10" 
                    stroke="#3b82f6" 
                    stroke-width="3" 
                    fill="none" 
                    stroke-linecap="round"/>
              <path d="M 0 120 Q 50 100 75 80 T 150 50 T 225 20 T 300 10 L 300 150 L 0 150 Z" 
                    fill="url(#gradient)"/>
            </svg>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <div class="text-2xl font-bold text-gray-900">85%</div>
              <div class="text-xs text-gray-600">优化前</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-700">98%</div>
              <div class="text-xs text-gray-600">优化后</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-green-600">+13%</div>
              <div class="text-xs text-gray-600">提升率</div>
            </div>
          </div>
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
