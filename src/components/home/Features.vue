<template>
  <div class="py-8 sm:py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 lg:text-4xl">
          为什么选择我
        </h2>
        <p class="mt-3 sm:mt-4 max-w-2xl text-lg sm:text-xl text-gray-500 mx-auto px-4 sm:px-0">
          资深前端工程师 · 一对一辅导 · 深入了解前端招聘标准
        </p>
      </div>

      <div class="mt-12 sm:mt-16">
        <div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          <!-- 功能卡片1 -->
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-file-alt text-xl"></i>
                </div>
                <h3 class="mt-6 sm:mt-8 text-lg font-medium text-gray-900 text-center">智能简历分析</h3>
                <p class="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500">
                  深度解析您的简历问题，识别技术关键词缺失、项目描述不足等常见问题，提供具体修改建议
                </p>
                <div class="mt-4 sm:mt-6 code-block text-xs sm:text-sm text-gray-200 p-2 sm:p-3 rounded overflow-x-auto">
                  <span class="text-green-400">// 检测示例：</span><br>
                  if (<span class="text-yellow-300">!resume.includes('React Hooks')</span>) {<br>
                  &nbsp;&nbsp;console.<span class="text-blue-400">warn</span>('建议添加Hooks经验');<br>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- 功能卡片2 -->
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-laptop-code text-xl"></i>
                </div>
                <h3 class="mt-6 sm:mt-8 text-lg font-medium text-gray-900 text-center">技术面试模拟</h3>
                <p class="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500">
                  真实还原大厂前端面试场景，涵盖React原理、浏览器机制、性能优化等高频考点
                </p>
                <div class="mt-4 sm:mt-6">
                  <div class="flex flex-wrap justify-center gap-1 sm:gap-2">
                    <span
                      v-for="(tag, index) in interviewTags"
                      :key="index"
                      class="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 功能卡片3 -->
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-chart-line text-xl"></i>
                </div>
                <h3 class="mt-6 sm:mt-8 text-lg font-medium text-gray-900 text-center">项目难题讲解</h3>
                <p class="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500">
                  面试过程中经常问到的业务场景难点或者是简历中项目存在的难题
                </p>
                <div class="mt-4 sm:mt-6">
                  <div class="flex flex-wrap justify-center gap-1 sm:gap-2">
                    <span
                      v-for="(tag, index) in projectTags"
                      :key="index"
                      class="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 功能卡片4 -->
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-chart-line text-xl"></i>
                </div>
                <h3 class="mt-6 sm:mt-8 text-lg font-medium text-gray-900 text-center">薪资谈判</h3>
                <p class="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500">
                  基于10,000+前端岗位数据分析，为您提供个性化的薪资谈判建议和市场定位
                </p>
              </div>
            </div>
          </div>

          <!-- 功能卡片5 -->
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-chart-line text-xl"></i>
                </div>
                <h3 class="mt-6 sm:mt-8 text-lg font-medium text-gray-900 text-center">售后服务</h3>
                <p class="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500">
                  简历优化后，我们提供售后服务，帮助您解决简历优化后遇到的问题 微群答疑 知识星球🌍
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features',
  data () {
    return {
      interviewTags: ['虚拟DOM', 'Webpack', 'HTTP2', 'Tree Shaking', 'SSR', '性能优化'],
      projectTags: ['项目难点', '业务场景', '技术难题'],
      salaryData: [
        { level: '初级前端', range: '12-20K', width: '40%' },
        { level: '高级前端', range: '25-40K', width: '70%' }
      ]
    }
  }
}
</script>

<style scoped>
/* 确保代码块在移动端可以横向滚动 */
.code-block {
  font-family: 'SF Mono', Menlo, monospace;
  background: rgba(0,0,0,0.7);
  border-left: 3px solid #4fd1c5;
  white-space: nowrap;
}

/* 移动端优化 */
@media (max-width: 640px) {
  .code-block {
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
