<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">AI 智能简历生成</h1>
        <p class="text-lg text-gray-600">根据您的经历自动生成专业简历</p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Input Section -->
        <div class="p-6 sm:p-8 lg:p-10">
          <div class="mb-6">
            <label class="block text-lg font-semibold text-gray-800 mb-3">
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                个人经历描述
              </span>
            </label>
            <div class="relative">
              <textarea
                v-model="selfIntro"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors duration-200 text-gray-700 placeholder-gray-400 resize-none"
                :class="{ 'border-red-300': errorMessage }"
                rows="4"
                placeholder="例如：我有5年前端开发经验，精通 Vue.js 和 React，曾主导开发过月活百万的电商平台，擅长性能优化和组件设计..."
              ></textarea>
              <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                {{ selfIntro.length }}/500
              </div>
            </div>
            <p v-if="errorMessage" class="mt-2 text-sm text-red-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              {{ errorMessage }}
            </p>
          </div>

          <!-- Action Button -->
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <button
              class="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              :disabled="loading || !trimmedIntro"
              @click="runWorkflow"
            >
              <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <svg v-else class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ loading ? 'AI 正在生成...' : '开始生成简历' }}
            </button>
            
            <div v-if="loading" class="text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>正在分析您的经历...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="bg-gray-50 px-6 sm:px-8 lg:px-10 py-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            生成结果
          </h3>
          
          <div v-if="imageUrl" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="text-center">
              <div class="mb-4">
                <svg class="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h4 class="text-lg font-medium text-gray-900">简历生成完成！</h4>
                <p class="text-sm text-gray-600 mt-1">点击下方按钮查看或下载您的专业简历</p>
              </div>
              
              <a
                :href="imageUrl"
                target="_blank"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                查看完整简历
              </a>
            </div>
          </div>
          
          <div v-else class="text-center py-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p class="text-gray-500">请输入您的个人经历，点击生成按钮开始创建简历</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-sm text-gray-500">
          基于 AI 技术自动生成，确保简历专业性和个性化
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const apiKey = 'pat_c2W6F3fuDCGmnFsYXvnHphOS40BUBC4XiDL9YENJV107ooGJGvrprrwPQl4H6DOY'
const workflowId = '7540938263634116660'
export default {
  data () {
    return {
      selfIntro: '',
      imageUrl: '',
      loading: false,
      errorMessage: ''
    }
  },
  computed: {
    trimmedIntro () {
      return (this.selfIntro || '').trim()
    }
  },
  methods: {
    async runWorkflow () {
      if (!this.trimmedIntro) return
      this.errorMessage = ''
      this.imageUrl = ''
      this.loading = true

      const payload = {
        workflow_id: workflowId,
        parameters: {
          input: this.trimmedIntro
        }
      }

      try {
        const response = await fetch('https://api.coze.cn/v1/workflow/run', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('网络响应不正常')
        }

        const data = await response.json()
        // 后端约定与简历解析一致：data.data 为字符串化 JSON
        const parsed = JSON.parse(data.data)
        // 兼容不同字段命名：image_url 或 imageUrl
        this.imageUrl = parsed.url
        if (!this.imageUrl) {
          this.errorMessage = '未获取到图片地址'
        }
      } catch (err) {
        console.error('调用工作流失败:', err)
        this.errorMessage = '生成失败，请重试'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar styles */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .max-w-4xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .p-6, .p-8, .p-10 {
    padding: 1.5rem;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  h1 {
    font-size: 2.5rem;
  }
}

/* Ensure proper touch targets on mobile */
@media (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px;
  }
  
  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}
</style>
