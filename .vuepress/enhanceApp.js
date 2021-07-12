// 全局注册 Element 组件库
import ElementUI from 'element-ui';
import UI from 'pro-element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'pro-element-ui/lib/styles/index.css';

export default ({Vue}) => {
  Vue.use(ElementUI)
  Vue.use(UI)
}
