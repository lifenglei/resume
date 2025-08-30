<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
/* 全局样式重置和优化 */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  overflow-x: hidden; /* 防止水平滚动 */
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 确保路由视图占满剩余空间 */
.router-view {
  flex: 1;
}

/* 移动端优化 */
@media (max-width: 640px) {
  html {
    font-size: 16px; /* 防止iOS缩放 */
  }
  
  body {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  
  /* 优化触摸区域 */
  button, a, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* 确保文本在小屏幕上可读 */
  p, h1, h2, h3, h4, h5, h6 {
    line-height: 1.5;
    word-wrap: break-word;
  }
}

/* 确保所有图片响应式 */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 优化滚动体验 */
html {
  scroll-behavior: smooth;
}

/* 防止移动端双击缩放 */
@media screen and (max-width: 640px) {
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  input, textarea {
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
}
</style>
