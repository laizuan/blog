import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'


import nav from './configs/nav'
import sidebar from './configs/sidebar'
import plantuml from 'markdown-it-plantuml'
const base = process.env.BASE || '/'


function MdCustomAttrPugin(md, type, mdOptions: Record<string, Object>) {
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Seetltd 官方文档",
  description: "前后端低代码解决方案",
  head: [
    [
      'link',
      { rel: 'stylesheet', href: '/css/fancybox.min.css' },
    ],
    ['script', { src: '/js/fancybox.min.js' }]
  ],
  base: base,
  lang: 'zh-CN',
  appearance: true,
  lastUpdated: true,
  themeConfig: {
    outline: {
      level: 'deep', // 右侧大纲标题层级
      label: '目录', // 右侧大纲标题文本配置
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '8TBF6K4PZU',
        apiKey: '0980bf516b159e87fc81e03ecb896ce4',
        indexName: 'seedltd-online-docs',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      },
      // 本地离线搜索
      // provider: 'local',
      // options: localSearchOptions
    },
    darkModeSwitchLabel: '切换日光/暗黑模式',
    sidebarMenuLabel: '文章',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新',

    logo: '/logo.svg',

    // nav
    nav,

    // sidebar
    sidebar,
    footer: {
      message: '粤ICP备2022017444号',
      copyright: 'Copyright © 2019-present Seetltd'
    }
  },
  vite: {
      ssr: {
        noExternal: ["element-next"],
      },
    plugins: [demoblockVitePlugin()]
  },
  markdown: {
    // options for markdown-it-toc
    toc: { level: [1, 2, 3] },
    config: (md) => {
      // md.use(demoBlockPlugin, {
      //   cssPreprocessor: 'scss',
      //   scriptImports: [
      //     "import * as ElementPlus from 'element-plus'",
      //     "import * as ElementPlus from 'element-next'"
      //   ],
      //   scriptReplaces: [
      //     {
      //       searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
      //       replaceValue: 'const { defineComponent: _defineComponent } = Vue'
      //     },
      //     {
      //       searchValue: /import ({.*}) from 'element-plus'/g,
      //       replaceValue: (s, s1) => `const ${s1} = ElementPlus`
      //     },
      //     {
      //       searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
      //       replaceValue: 'const { defineComponent: _defineComponent } = Vue'
      //     },
      //     {
      //       searchValue: /import ({.*}) from 'element-next'/g,
      //       replaceValue: (s, s1) => `const ${s1} = ElementNext`
      //     }
      //   ]
      // })
      // @ts-ignore
      md.use(demoblockPlugin)

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
