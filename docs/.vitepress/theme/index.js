import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

import { registerComponents } from './register-components'

import 'element-plus/dist/index.css'
import 'element-next/lib/styles/index.css'
import 'element-next/lib/styles/theme.scss'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import './styles/index.scss'
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    registerComponents(app)
  }
}
