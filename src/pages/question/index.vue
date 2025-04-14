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
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6">面试题列表</h1>
    <ul class="space-y-4">
      <li v-for="(item, index) in questions" :key="index" class="p-4 border-b border-gray-300">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ item.question }}</h2>
          <button @click="toggleAnswer(index)" class="text-blue-500 hover:underline">
            {{ item.showAnswer ? '隐藏答案' : '查看答案' }}
          </button>
        </div>
        <p v-if="item.showAnswer" class="mt-2 text-gray-700">{{ item.answer }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questions: [],
      apiKey: 'pat_OZualCgEvs4Fus0q5q99GMFbGlCqKQX4n2RO3Ol8mO1sJFgQLwRc2RwhcWFycu0t', // 替换为您的 API Key
      workflowId: '7490816748992823337' // 替换为您的 workflow ID
    }
  },
  mounted () {
    this.fetchQuestions()
  },
  methods: {
    async fetchQuestions () {
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
      }
    },
    toggleAnswer (index) {
      this.questions[index].showAnswer = !this.questions[index].showAnswer
    }
  }
}
</script>

<style scoped>
/* 这里可以添加其他自定义样式 */
</style>
