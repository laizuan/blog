import { defineConfig } from 'vitepress'
const base = process.env.BASE || '/'
const nav = require('./configs/nav')
const sidebar = require('./configs/sidebar')
const externalGlobals = require('rollup-plugin-external-globals')
import plantuml from 'markdown-it-plantuml'

function MdCustomAttrPugin(md, type, mdOptions = null) {
  var defaultRenderer = md.renderer.rules[type]

  md.renderer.rules[type] = function (tokens, idx, options, env, self) {
    var token = tokens[idx]
    if (mdOptions) {
      for (let i in mdOptions) {
        token.attrSet(i, mdOptions[i])
      }
    }
    return defaultRenderer(tokens, idx, options, env, self)
  }
}

export default defineConfig({
  title: 'Seetltd 官方文档',
  description: '前后端低代码解决方案',
  head: [
    [
      'link',
      { rel: 'stylesheet', href: '/css/fancybox.min.css' },
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
    ],
    ['script', { src: '/js/fancybox.min.js' }]
  ],
  base: base,
  // lang: 'zh-CN',
  appearance: true,
  lastUpdated: true,
  vite: {
    plugins: [
      externalGlobals({
        vuedraggable: 'vuedraggable'
      })
    ]
  },
  themeConfig: {
    logo: '/logo.svg',
    // docsDir: 'docs',
    algolia: {
      // appId: '8TBF6K4PZU',
      appKey: 'a953370a8ee3382c31ae89d4cc35acf5',
      indexName: 'seedltd-online-docs'
    },

    // nav
    nav,

    // sidebar
    sidebar,
    lastUpdatedText: '上次更新',
    footer: {
      message: '粤ICP备2022017444号',
      copyright: 'Copyright © 2019-present Seetltd'
    }
  },

  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: (md) => {
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss'
      })
      md.use(MdCustomAttrPugin, 'image', {
        'data-fancybox': 'gallery'
      })
      md.use(plantuml, {
        openMarker: '```plantuml',
        closeMarker: '```'
      })
    }
  }
})
