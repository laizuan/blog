# 快速开始
它是基于 ElementUI 2.x 基础上增强的懿点网前端组件库

## 当前版本

`1.0.9`

## 依赖

- [Vue 2.x](https://cn.vuejs.org/v2/guide/)
- [ElementUI 2.x](https://element.eleme.cn/#/zh-CN/component/installation) **至少需要`2.15.3`及以上版本**
- [lodash 4.x](https://www.lodashjs.com/)
- [fuse.js 3.6.1](https://fusejs.io/) **必须是`3.6.1`版本**
- [vuedraggable 2.x](https://github.com/SortableJS/Vue.Draggable)
- [jstool](./component/tool.md)

## 设置仓库源

- 设置`npm`仓库源
```sh
npm config set registry http://nexus.1-dian.cn/repository/npm/
```

- 设置`yarn`仓库源

```js
yarn config set registry http://nexus.1-dian.cn/repository/npm/
```

## 安装

如果出现`error An unexpected error occurred: "http://registry.npm.taobao.org/pro-element-ui: Not found".`先清除``npm`和`yarn`缓存

#### npm 安装
```sh
npm i pro-element-ui -S
```
#### Yarn 安装
```sh
yarn add pro-element-ui
```
#### CDN
```sh

```

## 使用

```js
import ProElementUI from 'pro-element-ui'
import 'pro-element-ui/lib/styles/index.css'

Vue.use(ProElementUI, {
  pageSizes: [20, 50, 100, 150, 200],
  basicHeight: 112,
  baseUrl: '/pcc',
  request
})
```

## 全局设置

```js
Vue.use(UI, {
  basicHeight: 112, // 页面除开主题内容以外的其它高度
  baseUrl: '/pcc', // 请求函数前缀路径，如果request配置了baseUrl则不需要
  request, // http 请求函数
  pageSizes:[20, 50, 100, 150, 200], // 表格每页显示个数选择器的选项设置
  pageSize: 20 // 每页显示条数
});
```
