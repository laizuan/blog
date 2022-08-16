import ElementPlus from 'element-plus'
import ElementNext from 'element-next'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
export function registerComponents(app) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
  app.use(ElementPlus)
  app.use(ElementNext, {
    tinymce: {
      tinymceJsUrl: 'https://lib.baomitu.com/tinymce/5.10.3/tinymce.min.js',
      languageUrl: '/resources/tinymce/langs/',
      skinUrl: '/resources/tinymce/skins/ui/',
    },
  })
}
