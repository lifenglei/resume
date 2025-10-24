/*
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 14:39:37
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-04-08 14:10:55
 * @FilePath: /jd/resume/src/router/index.js
 * @Description:
 *
 */
import Vue from 'vue'
import Router from 'vue-router'
import authService from '@/services/authService'
import home from '@/pages/home'
import InterviewQuestions from '@/pages/interviewQuestions'
import ResumeOoptimize from '@/pages/resumeoptimize'
import SalaryReport from '@/pages/salaryreport'
import Donate from '@/pages/donate'
import Login from '@/pages/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/resume-optimize',
      name: 'resume-optimize',
      component: ResumeOoptimize,
      meta: {
        title: '简历优化',
        requiresAuth: true
      }
    },
    {
      path: '/interview-questions',
      name: 'interview-questions',
      component: InterviewQuestions,
      meta: {
        title: '前端面试题库',
        requiresAuth: true
      }
    },
    {
      path: '/interview-questions/:type',
      name: 'interview-questions-type',
      component: () => import('@/pages/question/index'),
      meta: {
        title: '前端面试题库',
        requiresAuth: true
      }
    },
    {
      path: '/salary-report',
      name: 'salary-report',
      component: SalaryReport,
      meta: {
        title: '薪资报告',
        requiresAuth: true
      }
    },
    {
      path: '/donate',
      name: 'donate',
      component: Donate,
      meta: {
        title: '打赏支持'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查路由是否需要认证
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    // 检查用户是否已认证
    if (authService.isAuthenticated()) {
      // 用户已认证，允许访问
      next()
    } else {
      // 用户未认证，重定向到登录页
      // 保存原始路径，登录后可以重定向回来
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 不需要认证的路由，直接允许访问
    next()
  }
})

export default router
