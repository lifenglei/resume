'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SUPABASE_URL: '"https://zaxwascdrpnioqtvuain.supabase.co"',
  VUE_APP_SUPABASE_ANON_KEY: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpheHdhc2NkcnBuaW9xdHZ1YWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExOTg3MzIsImV4cCI6MjA3Njc3NDczMn0.9p-25kOXZkmGhFaz2j4fH89dwUK6habXnD_NYZPfakA"'
})
