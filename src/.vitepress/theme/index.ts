// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'

import ElementPlus from 'element-plus'
import ElementNext  from 'element-next'
import 'element-plus/dist/index.css'
import 'element-next/lib/styles/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import nextZhcn  from  'element-next/lib/lang/zh-cn'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    useComponents(ctx.app)
    ctx.app.use(ElementPlus, {locale: {...nextZhcn, ...zhCn}})
    ctx.app.use(ElementNext )
  }
}
