
<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 14:39:37
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-03-27 15:41:33
 * @Description:
 *
-->
<template>
  <div id="app">
    <Hero />
    <Features />
    <SuccessCases />
    <Cta />
    <!-- <Footer /> -->
    <a
      class="github-link"
      href="https://github.com/lifenglei/resume"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source on GitHub"
    >GitHub</a>
  </div>
</template>

<script>
import Hero from '@/components/home/Hero.vue'
import Features from '@/components/home/Features.vue'
import SuccessCases from '@/components/home/SuccessCases.vue'
import Cta from '@/components/home/Cta.vue'
import Footer from '@/components/home/Footer.vue'

export default {
  name: 'App',
  components: {
    Hero,
    Features,
    SuccessCases,
    Cta,
    Footer
  }
}
</script>

<style>
/* 全局样式优化 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden; /* 防止水平滚动 */
}

/* GitHub 按钮 */
.github-link {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  background: #24292e;
  color: #ffffff;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.1s ease;
}

.github-link:hover {
  background: #2f363d;
}

.github-link:active {
  transform: translateY(1px);
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.code-block {
  font-family: 'SF Mono', Menlo, monospace;
  background: rgba(0,0,0,0.7);
  border-left: 3px solid #4fd1c5;
}

.resume-card {
  transition: all 0.3s ease;
}

.resume-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 移动端优化 */
@media (max-width: 640px) {
  .resume-card:hover {
    transform: none;
  }
  
  /* 确保所有文本在小屏幕上都有合适的行高 */
  p, h1, h2, h3, h4, h5, h6 {
    line-height: 1.5;
  }
  
  /* 优化按钮和链接的触摸区域 */
  button, a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

/* 确保图片响应式 */
img {
  max-width: 100%;
  height: auto;
}

/* 优化滚动体验 */
html {
  scroll-behavior: smooth;
}

/* 防止移动端缩放问题 */
@media screen and (max-width: 640px) {
  html {
    font-size: 16px;
  }
}
</style>
