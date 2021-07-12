# 快速开始
它是基于 ElementUI 2.x 基础上增强的懿点网前端组件库

### 依赖
- [Vue 2.x](https://cn.vuejs.org/v2/guide/)
- [ElementUI 2.x](https://element.eleme.cn/#/zh-CN/component/installation)
- [lodash 4.x](https://www.lodashjs.com/)

### 使用

- 设置npm仓库源
```sh
npm config set registry http://nexus.1-dian.cn/repository/npm/
```

### 安装
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
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>、
```

### 全局设置

```js
Vue.use(UI, {
  request, // http 请求函数
  pageSize, // 表格每页显示个数选择器的选项设置
});
```
