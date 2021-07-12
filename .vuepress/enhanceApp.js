// 全局注册 Element 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'pro-element-ui/lib/styles/index.css';



export default async ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata,
  isServer
}) => {
  // 使用 element-ui
  Vue.use(ElementUI);

  if (!isServer) {
      await import('pro-element-ui/lib/pro-element-ui.min.js').then(module => {
          Vue.use(module.default);
      });
  }
}
