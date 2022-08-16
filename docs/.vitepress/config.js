import { defineConfig } from 'vitepress'
const base = process.env.BASE || '/'
const nav = require('./configs/nav')
const sidebar = require('./configs/sidebar')
const externalGlobals = require('rollup-plugin-external-globals')
export default defineConfig({
  title: 'Seetltd 官方文档',
  description: '前后端低代码解决方案',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  base: base,
  // lang: 'zh-CN',
  appearance: true,
  lastUpdated: true,
  vite: {
    plugins: [
      externalGlobals({
        vuedraggable: 'vuedraggable',
      }),
    ],
  },
  themeConfig: {
    logo: '/logo.svg',
    // docsDir: 'docs',
    algolia: {
      // appId: '8TBF6K4PZU',
      appKey: 'a953370a8ee3382c31ae89d4cc35acf5',
      indexName: 'seedltd-online-docs',
    },

    // nav
    nav,

    // sidebar
    sidebar,
    lastUpdatedText: '上次更新',
    footer: {
      message: '粤ICP备2022017444号',
      copyright: 'Copyright © 2019-present Seetltd',
    },
  },

  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: (md) => {
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss',
      })
    },
  },
})
// module.exports = {}
