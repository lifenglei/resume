<template>
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="(section, index) in footerSections" :key="index">
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            {{ section.title }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
              <a
                href="#"
                class="text-base text-gray-500 hover:text-gray-900"
                @click.prevent="handleLinkClick(link.text)"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">联系我们</h3>
          <ul class="mt-4 space-y-4">
            <li>
              <a
                href="http://github.com/lifenglei"
                class="text-base text-gray-500 hover:text-gray-900"
              >
                http://github.com/lifenglei
              </a>
            </li>
            <li class="flex space-x-6 mt-4">
              <a
                v-for="(social, socialIndex) in socialLinks"
                :key="socialIndex"
                href="#"
                class="text-gray-400 hover:text-gray-500"
                @click.prevent="handleSocialClick(social.name)"
              >
                <i :class="social.icon + ' text-xl'"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-12 border-t border-gray-200 pt-8">
        <p class="text-base text-gray-400 text-center">
          &copy; {{ currentYear }} FrontEnd Career Coach. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      currentYear: new Date().getFullYear(),
      footerSections: [
        {
          title: '产品',
          links: [
            { text: '简历优化' },
            { text: '面试题库' },
            { text: '薪资报告' }
          ]
        },
        {
          title: '资源',
          links: [
            { text: '前端博客' },
            { text: '学习路线' },
            { text: '技术雷达' }
          ]
        },
        {
          title: '公司',
          links: [
            { text: '关于我们' },
            { text: '职业机会' },
            { text: '合作伙伴' }
          ]
        }
      ],
      socialLinks: [
        { name: 'wechat', icon: 'fab fa-weixin' },
        { name: 'github', icon: 'fab fa-github' },
        { name: 'linkedin', icon: 'fab fa-linkedin' }
      ]
    }
  },
  methods: {
    handleLinkClick (linkText) {
      console.log(`点击了: ${linkText}`)
      // 这里可以添加路由跳转逻辑
    },
    handleSocialClick (socialName) {
      console.log(`点击了社交图标: ${socialName}`)
      // 这里可以添加社交链接跳转逻辑
    }
  }
}
</script>
