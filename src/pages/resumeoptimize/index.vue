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
          <div class="resume-result-container bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 shadow-inner border border-gray-200 flex-shrink-0">
            <div class="resume-result-content whitespace-pre-wrap text-gray-700 text-left text-sm sm:text-base leading-relaxed" v-html="parsedResume"></div>
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
          
          <!-- 优化后的建议展示区域 -->
          <div v-if="suggestions.length" class="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            <!-- 评分卡片 -->
            <div v-if="getScoreSection()" class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-800">简历评分</h3>
                    <p class="text-xs text-gray-600">综合评估结果</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-blue-600">{{ extractScore(getScoreSection().content) }}</div>
                  <div class="text-xs text-gray-500">分</div>
                </div>
              </div>
            </div>

            <!-- 摘要重写卡片 -->
            <div v-if="getSummarySection()" class="border border-green-200 rounded-lg p-4 bg-green-50 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-start gap-3 mb-3">
                <div class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-semibold text-green-800 mb-2">{{ getSummarySection().section }}</h3>
                  <div class="text-sm text-green-700 leading-relaxed bg-white p-3 rounded border border-green-100">
                    {{ getSummarySection().content }}
                  </div>
                  <button @click="copySectionContent(getSummarySection().content)" 
                          class="mt-2 text-xs text-green-600 hover:text-green-800 font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    复制摘要
                  </button>
                </div>
              </div>
            </div>

            <!-- 其他建议卡片 -->
            <div v-for="(section, sectionIndex) in getOtherSections()" :key="sectionIndex" 
                 class="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                 :class="getSectionStyle(section.section)">
              
              <!-- 卡片头部 -->
              <div class="p-4 pb-3 cursor-pointer" @click="toggleSection(sectionIndex)">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-3">
                    <div class="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
                         :class="getSectionIconStyle(section.section)">
                      <!-- 优化建议图标 -->
                      <svg v-if="section.section === '优化建议'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <!-- 项目亮点图标 -->
                      <svg v-else-if="section.section === '项目亮点'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <!-- 技术技能优化图标 -->
                      <svg v-else-if="section.section === '技术技能优化'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <!-- STAR法则图标 -->
                      <svg v-else-if="section.section === 'STAR法则重写项目经验'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <!-- 默认图标 -->
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-sm font-semibold mb-1" :class="getSectionTitleColor(section.section)">
                        {{ section.section }}
                      </h3>
                      <p class="text-xs text-gray-500">{{ getSectionDescription(section.section) }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="section.section === '优化建议'" class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                      {{ getOptimizationCount(section.content) }} 项
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         class="h-4 w-4 text-gray-400 transition-transform duration-200"
                         :class="{ 'rotate-180': expandedSections[sectionIndex] }"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- 卡片内容 -->
              <div v-show="expandedSections[sectionIndex]" class="px-4 pb-4">
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div v-if="section.section === '优化建议'" class="space-y-3">
                    <div v-for="(item, idx) in parseOptimizationSuggestions(section.content)" :key="idx"
                         class="bg-white p-3 rounded border border-orange-100 hover:border-orange-200 transition-colors duration-200">
                      <h4 class="text-sm font-semibold text-orange-800 mb-2">{{ item.title }}</h4>
                      <ul class="space-y-1">
                        <li v-for="(suggestion, subIdx) in item.suggestions" :key="subIdx" 
                            class="text-xs text-gray-700 flex items-start gap-2">
                          <span class="inline-block w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{{ suggestion }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div v-else-if="section.section === '项目亮点'" class="space-y-3">
                    <div v-for="(project, idx) in parseProjectHighlights(section.content)" :key="idx"
                         class="bg-white p-3 rounded border border-purple-100 hover:border-purple-200 transition-colors duration-200">
                      <div class="flex items-start gap-3">
                        <div class="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold flex-shrink-0">
                          {{ project.number }}
                        </div>
                        <div class="flex-1">
                          <h4 class="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
                            <span class="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
                            {{ project.title }}
                          </h4>
                          <p class="text-xs text-gray-700 leading-relaxed">{{ project.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {{ section.content }}
                  </div>
                </div>
                
                <!-- 操作按钮 -->
                <div class="flex gap-2 mt-3">
                  <button @click="copySectionContent(section.content)" 
                          class="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-2 py-1 hover:bg-blue-50 rounded transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    复制
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="flex flex-col items-center text-center text-gray-500 py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h9.5a2 2 0 001.6-.8l3.5-4.667a2 2 0 00.4-1.2V4a2 2 0 00-2-2H6zm0 2h12v11h-3a2 2 0 00-2 2v3H6V4zm9 16.25V17a.75.75 0 01.75-.75H20l-5 4z"/>
            </svg>
            <p class="text-sm sm:text-base font-medium mb-2">暂无建议结果</p>
            <p class="text-xs sm:text-sm text-gray-400">上传简历并点击"解析简历"，再获取建议</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const apiKey = 'pat_D8vhiHgR6HQMWPMZewxlDEvCTu4xodXKdLJTrENSzNphwYyH5avF3wxulR0DtxHH'
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
      loading2: false,
      expandedSections: {} // 新增：控制展开状态
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
    },
    
    // 新增：获取评分部分
    getScoreSection() {
      return this.suggestions.find(s => s.section === '评分')
    },
    
    // 新增：获取摘要重写部分
    getSummarySection() {
      return this.suggestions.find(s => s.section === '摘要重写')
    },
    
    // 新增：获取其他部分
    getOtherSections() {
      return this.suggestions.filter(s => !['评分', '摘要重写'].includes(s.section))
    },
    
    // 新增：提取评分
    extractScore(content) {
      const match = content.match(/(\d+)分/)
      return match ? match[1] : '0'
    },
    
    // 新增：切换展开状态
    toggleSection(index) {
      this.$set(this.expandedSections, index, !this.expandedSections[index])
    },
    
    // 新增：复制单个部分内容
    copySectionContent(content) {
      navigator.clipboard.writeText(content)
        .then(() => {
          this.showToast('内容已复制到剪贴板！')
        })
        .catch(err => {
          console.error('复制失败:', err)
          this.showToast('复制失败，请重试', 'error')
        })
    },
    
    // 新增：显示提示信息
    showToast(message, type = 'success') {
      // 简单的提示实现，你可以替换为更好的toast组件
      alert(message)
    },
    
    // 新增：获取部分样式
    getSectionStyle(section) {
      const styles = {
        '优化建议': 'border-orange-200 bg-orange-50',
        '项目亮点': 'border-purple-200 bg-purple-50',
        '技术技能优化': 'border-blue-200 bg-blue-50',
        'STAR法则重写项目经验': 'border-indigo-200 bg-indigo-50'
      }
      return styles[section] || 'bg-gray-50'
    },
    
    // 新增：获取部分图标样式
    getSectionIconStyle(section) {
      const styles = {
        '优化建议': 'bg-orange-100 text-orange-600',
        '项目亮点': 'bg-purple-100 text-purple-600',
        '技术技能优化': 'bg-blue-100 text-blue-600',
        'STAR法则重写项目经验': 'bg-indigo-100 text-indigo-600'
      }
      return styles[section] || 'bg-gray-100 text-gray-600'
    },
    
    // 新增：获取部分标题颜色
    getSectionTitleColor(section) {
      const colors = {
        '优化建议': 'text-orange-800',
        '项目亮点': 'text-purple-800',
        '技术技能优化': 'text-blue-800',
        'STAR法则重写项目经验': 'text-indigo-800'
      }
      return colors[section] || 'text-gray-800'
    },
    
    // 新增：获取部分描述
    getSectionDescription(section) {
      const descriptions = {
        '优化建议': '格式、内容和表达方面的改进建议',
        '项目亮点': '项目经验的亮点总结',
        '技术技能优化': '技能匹配度分析和优化建议',
        'STAR法则重写项目经验': '使用STAR法则重写的项目经验'
      }
      return descriptions[section] || '详细建议内容'
    },
    
    // 新增：获取部分图标
    getSectionIcon(section) {
      // 返回SVG字符串或组件名
      const icons = {
        '优化建议': 'svg',
        '项目亮点': 'svg',
        '技术技能优化': 'svg',
        'STAR法则重写项目经验': 'svg'
      }
      // 这里简化处理，实际使用时可以返回具体的图标组件
      return 'svg'
    },
    
    // 新增：获取优化建议数量
    getOptimizationCount(content) {
      const matches = content.match(/\d+\.\s\*\*/g)
      return matches ? matches.length : 0
    },
    
    // 新增：解析优化建议
    parseOptimizationSuggestions(content) {
      const sections = []
      const parts = content.split(/\d+\.\s\*\*(.+?)\*\*：/).filter(Boolean)
      
      for (let i = 0; i < parts.length; i += 2) {
        if (parts[i] && parts[i + 1]) {
          const title = parts[i].trim()
          const suggestions = parts[i + 1]
            .split(/\s*-\s/)
            .filter(Boolean)
            .map(s => s.trim().replace(/。$/, ''))
          
          sections.push({ title, suggestions })
        }
      }
      
      return sections
    },
    
    // 新增：解析项目亮点
    parseProjectHighlights(content) {
      const projects = []
      
      // 先清理内容，移除HTML标签
      const cleanContent = content.replace(/<[^>]*>/g, '')
      
      // 使用兼容性更好的方法解析项目
      // 按行分割内容
      const lines = cleanContent.split('\n').filter(line => line.trim())
      let currentProject = null
      
      lines.forEach(line => {
        // 匹配项目标题行：数字. **项目名称**：内容
        const titleMatch = line.match(/(\d+)\.\s*\*\*(.+?)\*\*：(.+)/)
        
        if (titleMatch) {
          // 如果之前有项目，先保存它
          if (currentProject) {
            projects.push(currentProject)
          }
          
          // 创建新项目
          currentProject = {
            number: titleMatch[1].trim(),
            title: titleMatch[2].trim(),
            content: titleMatch[3].trim()
          }
        } else if (currentProject && line.trim()) {
          // 如果当前行不是标题行，但存在当前项目，则追加到内容中
          currentProject.content += ' ' + line.trim()
        }
      })
      
      // 保存最后一个项目
      if (currentProject) {
        projects.push(currentProject)
      }
      
      // 如果上面的方法没有解析出内容，尝试备用方法
      if (projects.length === 0) {
        // 尝试用正则表达式分割整个内容
        const projectSections = cleanContent.split(/(\d+)\.\s*\*\*(.+?)\*\*：/)
        
        for (let i = 1; i < projectSections.length; i += 3) {
          if (projectSections[i] && projectSections[i + 1] && projectSections[i + 2]) {
            projects.push({
              number: projectSections[i].trim(),
              title: projectSections[i + 1].trim(),
              content: projectSections[i + 2].trim().replace(/\n\s*/g, ' ').trim()
            })
          }
        }
      }
      
      return projects
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

/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* 移动端滚动条优化 */
@media (max-width: 640px) {
    .overflow-y-auto::-webkit-scrollbar {
        width: 4px;
    }
}

/* 强制限制解析结果容器高度 */
.resume-result-container {
    height: 300px !important;
    max-height: 300px !important;
    overflow-y: auto !important;
}

@media (min-width: 640px) {
    .resume-result-container {
        height: 400px !important;
        max-height: 400px !important;
    }
}

@media (min-width: 768px) {
    .resume-result-container {
        height: 500px !important;
        max-height: 500px !important;
    }
}

/* 确保内容不会撑开容器 */
.resume-result-content {
    height: 100% !important;
    overflow-y: auto !important;
}
</style>
