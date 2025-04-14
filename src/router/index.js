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
import home from '@/pages/home'
import InterviewQuestions from '@/pages/interviewQuestions'
import ResumeOoptimize from '@/pages/resumeoptimize'
import SalaryReport from '@/pages/salaryreport'

Vue.use(Router)

export default new Router({
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
        title: '简历优化'
      }
    },
    {
      path: '/interview-questions',
      name: 'interview-questions',
      component: InterviewQuestions,
      meta: {
        title: '前端面试题库'
      }
    },
    {
      path: '/interview-questions/:type',
      name: 'interview-questions-type',
      component: () => import('@/pages/question/index'),
      meta: {
        title: '前端面试题库'
      }
    },
    {
      path: '/salary-report',
      name: 'salary-report',
      component: SalaryReport,
      meta: {
        title: '薪资报告'
      }
    }
  ]
})
