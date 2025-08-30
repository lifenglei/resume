<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-04-08 14:07:45
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-04-08 15:17:20
 * @FilePath: /jd/resume/src/pages/question/index.vue
 * @Description:
 *
-->
<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-6 min-h-screen bg-gray-50">
    <h1 class="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">面试题列表</h1>
    <ul class="space-y-3 sm:space-y-4">
      <li v-for="(item, index) in questions" :key="index" class="p-3 sm:p-4 border-b border-gray-300 bg-white rounded-lg shadow-sm">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800 flex-1">{{ item.question }}</h2>
          <button @click="toggleAnswer(index)" class="text-blue-500 hover:text-blue-700 hover:underline text-sm sm:text-base font-medium transition-colors duration-200 self-start sm:self-center">
            {{ item.showAnswer ? '隐藏答案' : '查看答案' }}
          </button>
        </div>
        <p v-if="item.showAnswer" class="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">{{ item.answer }}</p>
      </li>
    </ul>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-500">加载中...</p>
    </div>
    
    <!-- 空状态 -->
    <div v-if="!loading && questions.length === 0" class="text-center py-8">
      <p class="text-gray-500">暂无面试题</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questions: [],
      loading: false,
      apiKey: 'pat_OZualCgEvs4Fus0q5q99GMFbGlCqKQX4n2RO3Ol8mO1sJFgQLwRc2RwhcWFycu0t', // 替换为您的 API Key
      workflowId: '7490816748992823337' // 替换为您的 workflow ID
    }
  },
  mounted () {
    this.fetchQuestions()
  },
  methods: {
    async fetchQuestions () {
      this.loading = true
      console.log(this.$route.params)
      try {
        const response = await fetch('/api/v1/workflow/run', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            workflow_id: this.workflowId,
            parameters: {
              input: {
                file_id: this.$route.params.type
              }
            }
          })
        })

        if (!response.ok) {
          throw new Error('网络响应不正常')
        }

        const data = await response.json()
        console.log(data)

        const jsonString = JSON.parse(data.data).result.replace(/```json\n|\n```/g, '')
        console.log(jsonString)
        this.questions = []
      } catch (error) {
        console.error('获取面试题时出错:', error)
        alert('获取面试题失败，请重试')
      } finally {
        this.loading = false
      }
    },
    toggleAnswer (index) {
      this.questions[index].showAnswer = !this.questions[index].showAnswer
    }
  }
}
</script>

<style scoped>
/* 移动端优化 */
@media (max-width: 640px) {
  /* 确保按钮在移动端有足够的点击区域 */
  button {
    min-height: 44px;
    padding: 8px 12px;
  }
  
  /* 优化卡片间距 */
  li {
    margin-bottom: 12px;
  }
}

/* 平滑过渡动画 */
li {
  transition: all 0.3s ease;
}

li:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 答案显示动画 */
p {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
