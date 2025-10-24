// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Critical: Define CommonJS globals BEFORE any imports
(function() {
  // Ensure CommonJS environment exists
  if (typeof global === 'undefined') {
    window.global = window;
  }
  if (typeof exports === 'undefined') {
    window.exports = {};
  }
  if (typeof module === 'undefined') {
    window.module = {
      exports: window.exports,
      require: function() { return {}; }
    };
  }
  if (typeof require === 'undefined') {
    window.require = function() { return {}; };
  }
})();

// Import polyfills first to ensure compatibility
import './polyfills'

import Vue from 'vue'
import App from './App'
import router from './router'
import userStore from './services/userStore'

Vue.config.productionTip = false

// 将用户状态管理添加到 Vue 原型上，方便在组件中使用
Vue.prototype.$userStore = userStore

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
