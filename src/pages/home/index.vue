
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
    <Footer />
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
</style>
