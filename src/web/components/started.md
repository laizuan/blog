<script setup>
import Preview from '../../components/Preview.vue'
</script>

# 快速上手

## 安装

```js
yarn add element-next
# 或者
npm i element-next
# 或者
pnpm add element-next
```

## 完整引入

```js
import { createApp } from 'vue'
import App from './App.vue'

import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'

import ElementNext from 'element-next'
import 'element-next/lib/styles/index.css'

const app = createApp(App)

app.use(ElButton)
app.use(ElementNext)
app.mount('#app')
```

## 按需引入

::: warning 提示

因为组件是动态构建，所有 `element-plus` 依赖不能动态引入，必须是全量或者按需引入。包括`element-next`的时候也是一样。`n-from`组件的 item 项如果使用到了内置的拓展组件(n-tip,n-date-pricker .....) 都需要手工引入。

:::

### 组件级注册

```js
import { NSelect, NDatePricker } from 'element-next'
import 'element-plus/dist/index.css'
app.use(NSelect)
app.use(NDatePricker)
```

#### Css 按需引入

```js
import { NForm } from 'element-pro'
import 'element-pro/lib/styles/form'
```

### 使用 unplugin-vue-components

安装及使用查看 [unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components)

- 配置信息

```js
{
  resolvers: [
    (name) => {
      if (name.startsWith('N')) {
        const fileName = name.slice(1).replace(/\B([A-Z])/g, '-$1').toLocaleLowerCase()
        return {
          importName: name,
          path: 'element-next',
          sideEffects: `element-next/lib/styles/${fileName}`
        }
      }
    }
  ],
}
```

### 在 vite 中使用 vite-plugin-style-import

安装及使用查看 [vite-plugin-style-import](https://www.npmjs.com/package/vite-plugin-style-import)

- 修改配置 vite.config

```js
import styleImport from 'vite-plugin-style-import'

export default {
  plugins: [
    styleImport({
      libs: [
        {
          importTest: /^N/,
          libraryName: 'element-next',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-next/lib/styles/${name.slice(2)}`
          },
        },
      ],
    }),
  ],
}
```

## 全局配置

| Name          | Description          | Type              | Options | Default |
| ------------- | -------------------- | ----------------- | ------- | ------- |
| Pagination    | 分页全局配置         | Pagination        | -       | -       |
| action        | 操作按钮配置         | ActionOptions     | -       | -       |
| form          | 表单全局配置         | FormGlobalConfig  | -       | -       |
| table         | 表格全局配置         | TableGlobalConfig | -       | -       |
| axiosInstance | axios 实例           | AxiosInstance     | -       | -       |
| tinymce       | 富文本全局配置       | TinymceConfig     | -       | -       |
| dict          | 远端基础数据请求配置 | DictConfig        | -       | -       |

### Pagination

支持 `element-plus` [Pagination 分页属性](https://element-plus.gitee.io/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7)

| Name       | Description                  | Type    | Options | Default                         |
| ---------- | ---------------------------- | ------- | ------- | ------------------------------- |
| background | 是否为分页按钮添加背景色     | boolean | -       | true                            |
| layout     | 组件布局，子组件名用逗号分隔 | string  | -       | total, sizes, prev, pager, next |

### ActionOptions

| Name        | Description          | Type   | Options | Default |
| ----------- | -------------------- | ------ | ------- | ------- |
| addProps    | 表格表单新增按钮属性 | object | -       | -       |
| submitProps | 表单提交按钮属性     | object | -       | -       |
| resetProps  | 表单提交按钮重置按钮 | object | -       | -       |

### TableGlobalConfig

| Name          | Description                                               | Type   | Options | Default |
| ------------- | --------------------------------------------------------- | ------ | ------- | ------- |
| outsideHeight | 用于计算表格高度，详见`ProTableForm`的`outsideHeight`属性 | number | -       | 0       |
| actionLimit   | 列表按钮显示个数，详见`ProTableForm`的`actionLimit`属性   | number | -       | 4       |
| columns       | 表格列操作配置                                            | object | -       | -       |

### FormGlobalConfig

| Name              | Description                                        | Type    | Options | Default |
| ----------------- | -------------------------------------------------- | ------- | ------- | ------- |
| limit             | 最多显示多少个`field`项，`showMore=true`的时候有效 | number  |         | 4       |
| highlightError    | 表单验证不通过的时候输入框是否高亮                 | boolean | -       | -       |
| highlightRequired | 表单必填项输入框是否高亮                           | boolean | -       | -       |

### DictConfig

| Name         | Description                                                  | Type                          | Options    | Default        |
| ------------ | ------------------------------------------------------------ | ----------------------------- | ---------- | -------------- |
| url          | 请求路径                                                     | string                        | -          | -              |
| method       | 请求方法                                                     | string                        | `post,get` | 'get'          |
| cache        | 是否开启缓存                                                 | boolean                       | -          | true           |
| cache-key    | 缓存的键，这里相当于是数据表的名称。具体的数据键值由参数组成 | string                        | -          | `_dict_`       |
| storage-type | 缓存类型                                                     | `sessionStorage,localStorage` | -          | `localStorage` |
| expires      | 过期时间，默认单位：天                                       | number                        | -          | 7              |

### TinymceConfig

如果下载的依赖包放到项目的`public/resources`下则无需配置，但是要注意不要更改下载下来的包文件目录位置。<Preview url="/resources/tinymce.zip" text="下载 Tinymce"/>

| Name         | Description           | Type   | Options | Default                             |
| ------------ | --------------------- | ------ | ------- | ----------------------------------- |
| tinymceJsUrl | `tinymce.min.js` 路径 | string | -       | `/resources/tinymce/tinymce.min.js` |

### 默认配置

```json
{
  dict: {
    url: '',
    method: 'get',
    cache: true,
    cacheKey: '_dict_',
    storageType: 'localStorage',
    expires: 7,
  },
  table: {
    outsideHeight: 0,
    actionLimit: 4,
    columns: {
      saveUrl: '',
      listUrl: '',
      saveMethod: 'post',
      listMethod: 'post',
      requestConfig: undefined,
      cacheKey: '_table_columns_',
      storageType: 'localStorage',
      expires: 7,
      cache: true,
    },
  },
  form: {
    highlightError: true,
    highlightRequired: true,
    limit: 4,
  },
  pagination: {
    pageSize: 20,
    pageSizes: [20, 50, 100, 150, 200],
    background: true,
    layout: 'total, sizes, prev, pager, next',
  },
  action: {
    addProps: { type: 'primary', icon: markRaw(Plus) },
    submitProps: { type: 'primary' },
    searchProps: { type: 'primary', icon: markRaw(Search) },
    resetProps: { type: 'info' },
  },
  tinymce: {
    tinymceJsUrl: '/resources/tinymce/tinymce.min.js',
  },
}
```

### 配置

全局引入

```js
app.use(ElementNext, {
  pagination: {
    small: true,
    hideOnSinglePage: true,
    layout: 'prev, pager, next',
  },
})
```

按需引入全局配置

通过导出的`setGlobalConfig`函数设置。注意它不是响应式的

```tsx
import { setGlobalConfig } from 'element-next'
setGlobalConfig({
  dict: {
    url: '/sysDict/getByType',
  },
  axiosInstance: axios,
})
```

::: tip 提示

文档示例基于 [组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html) 语法，如果不熟悉语法请前往官方文档查看

如果使用 VS Code 开发，配合 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 使用提供完整的组件、属性、事件补全。例如：输入 `<n-` 将罗列出所有组件库组件

对于使用 VS Code 配合 typescript 开发，推荐使用插件 [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)。只需要中向 `tsconfig.json` 文件中的 `include` 字段增加

```diff
{
  "include": [
    "node_modules/element-next/types/components.d.ts"
  ]
}
```

:::
