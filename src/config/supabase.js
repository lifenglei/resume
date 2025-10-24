/*
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-01-27 14:39:37
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-01-27 14:39:37
 * @FilePath: /resume/src/config/supabase.js
 * @Description: Supabase 配置文件 - 初始化 Supabase 客户端
 */

import { createClient } from '@supabase/supabase-js'

// 从环境变量获取配置
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

// 验证必要的环境变量
if (!supabaseUrl) {
  throw new Error('Missing VUE_APP_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VUE_APP_SUPABASE_ANON_KEY environment variable')
}

// 创建 Supabase 客户端
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // 自动刷新 token
    autoRefreshToken: true,
    // 持久化会话
    persistSession: true,
    // 检测 URL 中的认证信息
    detectSessionInUrl: true,
    // 多标签页同步
    multiTab: true
  }
})

// 导出客户端实例
export default supabase

// 导出配置信息（用于调试）
export const config = {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey
}
