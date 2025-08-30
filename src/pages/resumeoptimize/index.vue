<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 15:36:54
 * @LastEditors: 李风磊 lifenglei@cestc.cn
 * @LastEditTime: 2025-04-03 10:49:11
 * @FilePath: /jd/resume/src/pages/resumeoptimize/index.vue
 * @Description:
 *
-->
<template>
  <div class="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6" style="margin-top: 100px;">
    <div class="flex flex-col lg:flex-row w-full max-w-7xl gap-3 sm:gap-4 lg:gap-6">
      <!-- 左侧容器 -->
      <div class="w-full lg:w-[65%] xl:w-[70%] bg-white shadow-xl rounded-xl p-4 sm:p-5 md:p-6 lg:p-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 leading-tight">简历优化</h1>
          <button @click="getSuggestions" class="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all duration-200 text-sm sm:text-base font-medium w-full sm:w-auto min-h-[44px] touch-manipulation">
            <template v-if="loading2">
              <svg class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>加载中...</span>
            </template>
            <span v-else class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              增加修改建议
            </span>
          </button>
        </div>

        <div class="space-y-4 sm:space-y-5">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-2">上传简历文件</label>
            <input type="file" @change="handleFileUpload" class="block w-full text-sm sm:text-base text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer" accept=".pdf,.doc,.docx,.txt" />
            <p class="mt-1 text-xs text-gray-500">支持 PDF、Word、TXT 格式</p>
          </div>

          <button @click="parseResume" :disabled="loading || !uploadedFile" class="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto min-h-[44px] touch-manipulation" v-if="!parsedResume">
            <template v-if="loading">
              <svg class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>加载中...</span>
            </template>
            <span v-else class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8M8 8h8M8 16h8"/></svg>
              解析简历
            </span>
          </button>
        </div>

        <div v-if="parsedResume" class="mt-6 sm:mt-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">解析结果</h2>
            <button @click="copyResult" class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              复制
            </button>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 shadow-inner max-h-[50vh] sm:max-h-[60vh] overflow-y-auto border border-gray-200">
            <div class="whitespace-pre-wrap text-gray-700 text-left text-sm sm:text-base leading-relaxed" v-html="parsedResume"></div>
          </div>
        </div>
      </div>

      <!-- 右侧容器 -->
      <div class="w-full lg:w-[35%] xl:w-[30%] bg-white shadow-xl rounded-xl p-4 sm:p-5 md:p-6 lg:p-8">
        <div class="sticky top-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">优化建议</h2>
            <span v-if="suggestions.length" class="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {{ suggestions.length }} 条
            </span>
          </div>
          
          <div v-if="suggestions.length" class="space-y-4">
            <div v-for="(section, sectionIndex) in suggestions" :key="sectionIndex" class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
              <h3 class="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <span class="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                {{ section.section }}
              </h3>
              <div v-if="section.content" class="text-sm text-gray-700 leading-relaxed">
                <p class="break-words">{{ section.content }}</p>
              </div>
            </div>
          </div>
          
          <div v-else class="flex flex-col items-center text-center text-gray-500 py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h9.5a2 2 0 001.6-.8l3.5-4.667a2 2 0 00.4-1.2V4a2 2 0 00-2-2H6zm0 2h12v11h-3a2 2 0 00-2 2v3H6V4zm9 16.25V17a.75.75 0 01.75-.75H20l-5 4z"/></svg>
            <p class="text-sm sm:text-base font-medium mb-2">暂无建议结果</p>
            <p class="text-xs sm:text-sm text-gray-400">上传简历并点击"解析简历"，再获取建议</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const apiKey = 'pat_4N00UV2YPHzZrUT5wHVpzMvKc1bbRQ1UufqnOqf2rf8r4MCgm8YU29d0rdXIPh6y'
const workflowId = '7543892071598800948' // 简历解析
const workflowId2 = '7488891332678254655' // 简历建议
export default {
  data () {
    return {
      suggestions: [],
      parsedResume: '',
      uploadedFile: null, // 用于存储上传的文件
      fileId: '',
      loading: false,
      loading2: false
    }
  },
  methods: {
    handleFileUpload (event) {
      this.uploadedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', this.uploadedFile)

      fetch('https://api.coze.cn/v1/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data)
          this.fileId = data.data.id
          // Handle the response data as needed
        })
        .catch(error => {
          console.error('Error uploading file:', error)
        })
    },
    async parseResume () {
      if (!this.uploadedFile) {
        alert('请先上传简历文件')
        return
      }

      this.loading = true
      const formData = new FormData()
      formData.append('file', this.uploadedFile)
      const requestData = {
        workflow_id: workflowId,
        parameters: {
          input: {
            file_id: this.fileId
          }
        }
      }
      try {
        const response = await fetch('https://api.coze.cn/v1/workflow/run', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}` // 替换为您的 API Key
          },
          body: JSON.stringify(requestData)
        })

        if (!response.ok) {
          throw new Error('网络响应不正常')
        }

        const data = await response.json()
        const res = JSON.parse(data.data)
        console.log(res)
        this.parsedResume = res.output
      } catch (error) {
        console.error('解析简历时出错:', error)
        alert('解析简历失败，请重试')
      } finally {
        this.loading = false
      }
    },
    async getSuggestions () {
      if (!this.parsedResume) {
        alert('请先解析简历')
        return
      }

      this.loading2 = true
      const query = {
        workflow_id: workflowId2,
        parameters: {
          input: this.parsedResume
        }
      }
      try {
        const response = await fetch('https://api.coze.cn/v1/workflow/run', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}` // 替换为您的 API Key
          },
          body: JSON.stringify(query)
        })

        if (!response.ok) {
          throw new Error('网络响应不正常')
        }

        const data = await response.json()
        const res = JSON.parse(data.data)
        this.suggestions = Array.isArray(res) ? res : (res.result || [])
        console.log(this.suggestions)
      } catch (error) {
        console.error('获取建议时出错:', error)
        alert('获取建议失败，请重试')
      } finally {
        this.loading2 = false
      }
    },
    copyResult () {
      navigator.clipboard.writeText(this.parsedResume)
        .then(() => {
          alert('结果已复制到剪贴板！')
        })
        .catch(err => {
          console.error('复制失败:', err)
          alert('复制失败，请重试')
        })
    },
    // 新增：类型与结构辅助方法
    isArray (val) {
      return Array.isArray(val)
    },
    isObject (val) {
      return val !== null && typeof val === 'object' && !Array.isArray(val)
    },
    isPrimitive (val) {
      return (typeof val !== 'object' || val === null)
    },
    objectEntries (obj) {
      return Object.entries(obj)
    },
    // 新增：将长字符串拆分为更易读的行
    getTextSegments (text) {
      if (text == null) return []
      const raw = String(text)
      const parts = raw
        .split(/[；;。\n]+/)
        .map(s => s.trim())
        .filter(Boolean)
      return parts
    },
    // 新增：拆分"标签：值"的结构
    splitLabelValue (line) {
      if (!line) return { label: '', value: '' }
      const idx = line.indexOf('：')
      if (idx === -1) return { label: '', value: line }
      return { label: line.slice(0, idx), value: line.slice(idx + 1) }
    }
  }
}
</script>

<style lang="css" scoped>
/* 移动端优化样式 */
.suggestion-title {
    font-size: 16px; /* 标题字体大小 */
    font-weight: bold;
    color: #1E3A8A; /* 标题颜色 */
}

.suggestion-content {
    font-size: 14px; /* 正文字体大小 */
    color: #555; /* 正文颜色 */
    line-height: 1.5; /* 行间距 */
}

/* 移动端响应式优化 */
@media (max-width: 640px) {
    .suggestion-title {
        font-size: 14px;
    }
    
    .suggestion-content {
        font-size: 12px;
    }
    
    /* 确保按钮在移动端有足够的点击区域 */
    button {
        min-height: 44px;
    }
    
    /* 优化文件上传按钮 */
    input[type="file"] {
        min-height: 44px;
    }
}

/* 确保滚动区域在移动端有良好的体验 */
.overflow-y-auto {
    -webkit-overflow-scrolling: touch;
}
</style>
