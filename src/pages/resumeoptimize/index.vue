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
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <div class="flex w-full max-w-6xl">
      <!-- 左侧容器 -->
      <div class="w-[70%] mr-4 bg-white shadow-lg rounded-lg p-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-4xl font-bold text-blue-700">简历优化</h1>
          <button @click="getSuggestions" class="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition duration-200">
            <span v-if="loading2">加载中...</span>
            <span v-else>增加修改建议</span>
          </button>
        </div>

        <input type="file" @change="handleFileUpload" class="mb-6 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <button @click="parseResume" :disabled="loading" class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg mb-6 hover:shadow-lg transition duration-200" v-if="!parsedResume">
          <span v-if="loading">加载中...</span>
          <span v-else>解析简历</span>
        </button>

        <div v-if="parsedResume" class="mt-8">
          <h2 class="text-2xl font-semibold text-gray-800">解析结果</h2>
          <div class="bg-gray-100 rounded-lg p-6 shadow-inner">
            <div class="whitespace-pre-wrap text-gray-700 text-left" v-html="parsedResume"></div>
          </div>
          <button @click="copyResult" class="mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition duration-200">
            复制结果
          </button>
        </div>
      </div>

      <!-- 右侧容器 -->
      <div class="w-[30%] bg-white shadow-lg rounded-lg p-8">
        <div v-if="suggestions.length" class="mt-6">
          <h2 class="text-2xl font-semibold text-gray-800">建议结果</h2>
          <div v-for="(section, sectionIndex) in suggestions" :key="sectionIndex" class="mt-4 border-b border-gray-300 pb-4">
            <h3 class="text-lg font-medium text-gray-70 suggestion-title">{{ section.section }}</h3>
            <div v-if="section.suggestions">
              <div v-for="(suggestion, index) in section.suggestions" :key="index" class="mt-2">
                <p class="suggestion-content">- {{ suggestion }}</p>
              </div>
            </div>
            <div v-else-if="section.score !== undefined">
              <p class="mt-2">简历得分: <span class="font-bold">{{ section.score }}</span></p>
              <p class="mt-1 text-gray-600">{{ section.comments }}</p>
            </div>
          </div>
        </div>
        <div v-else class="mt-6 flex flex-col items-center">
          <i class="fas fa-file-alt text-gray-400 text-6xl"></i> <!-- Font Awesome 图标 -->
          <p class="text-gray-600">暂无建议结果</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const apiKey = 'pat_OZualCgEvs4Fus0q5q99GMFbGlCqKQX4n2RO3Ol8mO1sJFgQLwRc2RwhcWFycu0t'
const workflowId = '7488721892912660532' // 简历解析
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

      fetch('/api/v1/files/upload', {
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
        const response = await fetch('/api/v1/workflow/run', {
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
        this.parsedResume = res.result
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
        const response = await fetch('/api/v1/workflow/run', {
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
        this.suggestions = res.result
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
    }
  }
}
</script>

<style lang="css" scoped>
/* 这里可以添加自定义样式 */
.suggestion-title {
    font-size: 18px; /* 标题字体大小 */
    font-weight: bold;
    color: #1E3A8A; /* 标题颜色 */
}

.suggestion-content {
    font-size: 14px; /* 正文字体大小 */
    color: #555; /* 正文颜色 */
    line-height: 1.5; /* 行间距 */
}
</style>
