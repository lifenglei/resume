<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 15:03:17
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-03-27 15:03:56
 * @Description:
 *
-->
<template>
  <div class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          成功案例
        </h2>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          经过我们辅导的学员平均面试邀请率提升3倍
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(successCase, index) in successCases"
          :key="index"
          class="resume-card bg-white overflow-hidden shadow rounded-lg"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <i :class="successCase.icon + ' text-white text-xl'"></i>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-gray-900">{{ successCase.name }}</h3>
                <p class="text-sm text-gray-500">{{ successCase.experience }} | {{ successCase.location }}</p>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-gray-600">
                "{{ successCase.testimonial }}"
              </p>
              <div class="mt-4 flex items-center text-sm text-gray-500">
                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                <span>重点优化：{{ successCase.optimization }}</span>
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
  name: 'SuccessCases',
  data () {
    return {
      successCases: [
        {
          name: '张同学',
          icon: 'fas fa-user-tie',
          experience: '2年经验',
          location: '上海',
          testimonial: '优化后一周内收到5个面试邀请，最终拿到字节跳动offer，薪资涨幅40%',
          optimization: '项目成果量化、技术深度描述'
        },
        {
          name: '李同学',
          icon: 'fas fa-user-graduate',
          experience: '应届生',
          location: '北京',
          testimonial: '作为应届生成功获得美团SP offer，面试官特别称赞项目描述的专业性',
          optimization: '技术栈可视化、实习经历结构化'
        },
        {
          name: '王同学',
          icon: 'fas fa-user-ninja',
          experience: '5年经验',
          location: '远程工作',
          testimonial: '成功转型全栈开发，获得美国公司远程offer，年薪达到$85k',
          optimization: '国际简历格式、开源项目展示'
        }
      ]
    }
  }
}
</script>
