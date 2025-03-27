<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          我们的专业服务
        </h2>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          从简历优化到面试准备的全流程解决方案
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- 功能卡片1 -->
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-file-alt text-xl"></i>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 text-center">智能简历分析</h3>
                <p class="mt-5 text-base text-gray-500">
                  深度解析您的简历问题，识别技术关键词缺失、项目描述不足等常见问题，提供具体修改建议
                </p>
                <div class="mt-6 code-block text-sm text-gray-200 p-3 rounded">
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
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-laptop-code text-xl"></i>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 text-center">技术面试模拟</h3>
                <p class="mt-5 text-base text-gray-500">
                  真实还原大厂前端面试场景，涵盖React原理、浏览器机制、性能优化等高频考点
                </p>
                <div class="mt-6">
                  <div class="flex flex-wrap justify-center gap-2">
                    <span
                      v-for="(tag, index) in interviewTags"
                      :key="index"
                      class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
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
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <i class="fas fa-chart-line text-xl"></i>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 text-center">薪资竞争力报告</h3>
                <p class="mt-5 text-base text-gray-500">
                  基于10,000+前端岗位数据分析，为您提供个性化的薪资谈判建议和市场定位
                </p>
                <div class="mt-6">
                  <div class="bg-white p-3 rounded shadow">
                    <div
                      v-for="(item, index) in salaryData"
                      :key="index"
                      class="mb-3 last:mb-0"
                    >
                      <div class="flex justify-between text-sm text-gray-600">
                        <span>{{ item.level }}</span>
                        <span>{{ item.range }}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          class="bg-indigo-600 h-2 rounded-full"
                          :style="{ width: item.width }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
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
      salaryData: [
        { level: '初级前端', range: '12-20K', width: '40%' },
        { level: '高级前端', range: '25-40K', width: '70%' }
      ]
    }
  }
}
</script>
