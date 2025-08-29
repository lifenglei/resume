<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-semibold mb-4">AI生成简历</h1>

    <div class="bg-white shadow rounded p-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">请输入自我介绍</label>
      <textarea
        v-model="selfIntro"
        class="w-full border rounded p-3 h-32 focus:outline-none focus:ring"
        placeholder="例如：我有5年前端开发经验，熟悉 Vue/React，参与过大型电商项目..."
      ></textarea>

      <div class="mt-4 flex items-center gap-3">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          :disabled="loading || !trimmedIntro"
          @click="runWorkflow"
        >
          {{ loading ? '生成中...' : '生成简历' }}
        </button>
        <span v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</span>
      </div>
    </div>

    <div class="mt-6">
      <div v-if="imageUrl" class="rounded overflow-hidden">
        <!-- <img :src="imageUrl" alt="薪资报告" class="w-full object-contain" /> -->
        <a :href="imageUrl" target="_blank" class="jieguo">
          简历生成结果
        </a>
      </div>
      <div v-else class="text-gray-500 text-sm">生成结果将显示在这里</div>
    </div>
  </div>
</template>

<script>
const apiKey = 'pat_4N00UV2YPHzZrUT5wHVpzMvKc1bbRQ1UufqnOqf2rf8r4MCgm8YU29d0rdXIPh6y'
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

<style>
  .jieguo {
    display: block;
    width: 300px;
    height: 60px;
    line-height: 60px;
    background-color: #f0f0f0;
    text-align: center;
    text-decoration: none;
    color: #fff;
    border-radius: 10px;
    margin: 0 auto;
    border: none;
    background-color:rgb(79 70 229 / var(--tw-bg-opacity, 1))
  }
</style>
