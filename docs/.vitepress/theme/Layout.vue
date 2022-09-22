<script setup>
import DefaultTheme from 'vitepress/theme'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-next/lib/lang/zh-cn.js'
import { ElConfigProvider } from 'element-plus'
const locale = {
  ...zhCn,
}
const { Layout } = DefaultTheme
</script>

<template>
  <ElConfigProvider :locale="locale">
    <Layout></Layout>
  </ElConfigProvider>
</template>
