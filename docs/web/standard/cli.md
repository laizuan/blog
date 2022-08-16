## 结构总览

**新增文件或者文件夹需要安装以下风格命名**

```
├── ProjectName
| | ├── .husky                                                  # 提交校验配置文件
| | ├── .vscode                                                 # IDE工具推荐配置文件（开发辅助）
| | ├── build											                              # 构建工具
| | ├── node_modules                                            # 模块包
| | ├── public                                                  # 静态资源
| | ├── src										                                  👉 项目源代码
| | ├── types                                                   # 全局 TS 类型配置
| | ├── .editorconfig                                           # 编辑器读取文件格式及样式定义配置
| | ├── .env                                                    # 全局环境变量配置
| | ├── .env.development                                        # 开发环境变量配置
| | ├── .env.production                                         # 生产环境变量配置
| | ├── .env.test                                               # 测试环境变量配置
| | ├── .npmrc                                                  # npm仓库配置
| | ├── .eslintignore                                           # eslint 语法检查忽略文件
| | ├── .eslintrc.js                                            # eslint 语法检查配置
| | ├── .gitignore                                              # git 提交忽略文件
| | ├── .prettierignore                                         # prettier 插件配置
| | ├── .prettierrc                                             # prettier 插件配置
| | ├── .stylelintignore                                        # stylelint 插件检查忽略文件
| | ├── .stylelintrc.js                                         # stylelint 插件配置文件
| | ├── commitlint.config.js                                    # git 提交检查配置
| | ├── index.html                                              # html 主入口
| | ├── package.json                                            # 依赖包管理 JSON 文件
| | ├── pnpm-lock.yaml                                          # 依赖包版本内容锁定文件
| | ├── README.md                                               # README
| | ├── stylelint.config.js                                     # stylelint 插件配置
| | ├── tsconfig.json                                           # ts 配置
| | └── vite.config.ts                                          # vite 配置
| | └── windi.config.ts                                         # windicss 配置
```

## 目录概述

- .husky：GitHooks 工具，用于在 git 执行某些操作（比如 commmit）时触发设定的脚本，比如 commit 前配合 lint 检验提交格式是否规范

```
├── .husky (可选)										👉 # 提交校验配置文件
│   │   ├────
│   │   |	├── .gitignore
│   │   |	└── husky.sh
│   │   ├── commit-msg
│   │   ├── common.sh
│   │   ├── lintstagedrc.js
│   │   └── pre-commit
```

同时在 `package.json` 中作配置

```json
 "scripts": {
  "lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock}/**/*.{vue,ts,tsx}\" --fix",
  "lint:prettier": "prettier --write  \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\"",
  "lint:stylelint": "stylelint --cache --fix \"**/*.{vue,css,scss,postcss,less}\" --cache --cache-location node_modules/.cache/stylelint/",
  "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
  "lint:pretty": "pretty-quick --staged",
  "lint": "pnpm lint:eslint && pnpm lint:prettier && pnpm lint:stylelint && pnpm lint:pretty",
  "prepare": "husky install",
 },
```

安装 husky 后执行 "prepare": "husky install"，会自动生成如下结构

```
├── .husky (可选)										👉 # 提交校验配置文件
│   │   ├── _
│   │   |	├── .gitignore
│   │   |	└── husky.sh
```

本项目中还增添了一个提交检验的配置文件 commilint.config.js

- .vscode：IDE 工具中恰当的配置能够极大的提高我们的开发效率和开发乐趣

```
├── .vscode (可选)									👉 # IDE工具推荐配置文件（开发辅助）
│   │   ├── settings.json（可自定义）                     # vscode 配置
│   │   ├── vue3.0.code-snippets（如果你想用的话）         # vue3.0代码片段模板
│   │   └── vue3.2.setup-snippets（推荐）                # vue3.2代码片段模板
```

- build：构建工具函数，主要处理环境和跨域

```
├── build											 👉 构建工具函数
│   ├── index.ts
```

- public：静态资源

```
├── public											👉 # 静态资源
│   │   ├── favicon.ico
│   │   ├── iconfont.css
│   │   ├── serverConfig.json                           # 全局配置文件
│   │   └── sortable.min.js
```

- types：全局 TS 类型配置

```
├── types                                            👉 # 全局 TS 类型配置
│   │   ├── global.d.ts
│   │   ├── shims-tsx.d.ts
│   │   ├── shims-vue.d.ts
│   │   └── index.d.ts
```

### 核心

```
├── src										                               👉 # 项目源代码
│   ├── api                                                  # 请求 api
│   ├── assets                                               # 字体、图片等静态资源
│   ├── components                                           # 全局自定义公用组件
│   ├── directives                                           # 全局自定义指令
│   ├── hooks                                                # 项目钩子函数
│   ├── layout                                               # 主要页面布局
│   ├── setting                                              # 项目配置
│   ├── router                                               # 路由配置
│   ├── store                                                # 全局状态管理
│   ├── styles                                               # 全局样式
│   ├── utils                                                # 全局工具方法
│   ├── views                                                # 全局单页面组件
│   ├── App.vue                                              # 入口页面
│   ├── main.ts                                              # 入口文件
│   ├── registerGlobalComponents.ts                          # 组件按需引入配置文件
```

- api：后端数据请求接口

```
│   ├── api                                             👉 # 请求 api
│   │   ├── routes.ts                                       # 路由数据
│   │   └── user.ts                                         # 用户数据
```

- assets：src 内使用的静态资源文件

```
│   ├── assets                                          👉 # 字体、图片等静态资源
│   │   ├── iconfont
│   │   ├── svg
│   │   └── ...
```

- components：全局自定义组件

```
│   ├── components									    👉 # 全局自定义公用组件
│   │   ├── MyComponent
│   │   |    |── index.vue
│   │   |    |── index.scss
│   │   |    └── index.ts
```

- setting：全局配置（这里获取动态全局配置，public 文件下为此自定义了一个全局环境下的默认配置）

- directives：全局自定义指令（方便逻辑处理）

```
│   ├── directives						👉 # 全局自定义指令
│   │   ├── elResizeDetector                # 容器改变监听
│   │   ├── permission                      # 权限指令
│   │   └── index.ts
```

- layout：页面布局

```
│   ├── layout									     👉 # 主要页面布局
│   │   ├── components                                      # 布局组件
│   │   │   ├── notice
│   │   │   ├── panel
│   │   │   ├── screenfull
│   │   │   ├── setting
│   │   │   ├── sidebar
│   │   │   │   ├── breadCrumb.vue
│   │   │   │   ├── hamBurger.vue
│   │   │   │   ├── horizontal.vue                          # 顶部菜单模式
│   │   │   │   ├── logo.vue
│   │   │   │   ├── sidebarItem.vue
│   │   │   │   └── vertical.vue                            # 左侧菜单模式
│   │   │   ├── tag
│   │   │   ├── appMain.vue
│   │   │   └── navbar.vue
│   │   ├── theme
│   │   ├── index.vue                                       # 布局容器主体
│   │   └── types.ts                                        # 局部类型定义
```

- router：全局路由模块

```
│   ├── router										 👉 # 路由配置
│   │   ├── modules										 # 模块化路由配置
│   │   │   ├── components.ts
│   │   │   ├── editor.ts
│   │   │   ├── error.ts
│   │   │   ├── externalLink.ts
│   │   │   ├── flowchart.ts
│   │   │   ├── home.ts
│   │   │   ├── nested.ts
│   │   │   └── remaining.ts
│   │   └── index.ts									  # 路由主入口
```

- store：全局状态管理

```
│   ├── store										 👉 # 全局状态管理
│   │   ├── modules										 # 模块化状态
│   │   │   ├── app.ts
│   │   │   ├── multiTags.ts
│   │   │   ├── permission.ts
│   │   │   ├── settings.ts
│   │   │   ├── user.ts
│   │   │   └── types.ts
│   │   └── index.ts									 # 状态主入口
```

- styles：全局样式配置

```
│   ├── styles										👉 # 样式文件
│   │   ├── element-plus.scss                            # 覆盖element-plus样式
│   │   ├── index.scss                                   # 全局样式
│   │   ├── login.css                                    # 登录页样式
│   │   ├── mixin.scss
│   │   ├── sidebar.scss                                 # 导航及布局样式
│   │   └── transition.scss
```

- utils：封装的方法工具

```
│   ├── utils			       👉 # 全局方法工具
│   │   ├── algorithm
│   │   ├── debounce                # 延迟、防抖函数
│   │   ├── deviceDtection          # 检测设备类型、获取浏览器型号以及版本
│   │   ├── http                    # 封装axios
│   │   ├── loaders                 # 动态创建标签加载js、css资源
│   │   ├── message                 # 封装element-plus消息组件
│   │   ├── operate                 # 类名操作（hasClass、addClass、removeClass、toggleClass）
│   │   ├── progress                # 封装nprogress
│   │   ├── resize                  # 监听容器函数（resizeHandler、addResizeListener、removeResizeListener）
│   │   └── storage                 # 封装本地存储
│   │   └── auth                    # 处理token
│   │   ├── is.ts                   # 类型判断
│   │   ├── link.ts                 # 创建链接
│   │   ├── mitt.ts                 # 公共事件
│   │   ├── propTypes.ts            # 封装propTypes
│   │   ├── useAttrs.ts             # 封装attrs
│   │   ├── useCopyToClipboard.ts   # 文件拷贝
│   │   └── uuid.ts                 # uuid
```

- views：核心页面组件

```
│   ├── views										  👉 # 全局单页面组件
│   │   ├── components
│   │   │   ├── button
│   │   │   ├── contextmenu
│   │   │   │   ├── basic.vue
│   │   │   │   ├── menuDynamic.vue
│   │   │   │   ├── menuGroup.vue
│   │   │   │   └── index.vue
│   │   │   ├── count-to
│   │   │   ├── cropping
│   │   │   ├── draggable
│   │   │   ├── map
│   │   │   ├── seamless-scroll
│   │   │   ├── selector
│   │   │   ├── split-pane
│   │   │   └── video
│   │   ├── editor                                            # 编辑页面
│   │   ├── error                                             # 错误页面
│   │   │   ├── 401.vue
│   │   │   └── 404.vue
│   │   ├── flow-chart                                        # 流程图
│   │   │   ├── dataTurbo.json
│   │   │   └── index.vue
│   │   ├── nested                                            # 局部菜单栏列表
│   │   │   ├── menu1
│   │   │   │   ├── menu1-1
│   │   │   │   ├── menu1-2
│   │   │   │   │   ├── menu1-2-1
│   │   │   │   │   ├── menu1-2-2
│   │   │   │   │   └── index.vue
│   │   │   │   ├── menu1-3
│   │   │   │   └── index.vue
│   │   │   └── menu2
│   │   ├── permission                                         # 权限页面
│   │   │   ├── button
│   │   │   └── page
│   │   ├── system                                             # 系统操作页面
│   │   │   ├── dict
│   │   │   └── user
│   │   ├── login.vue                                          # 登录页面
│   │   ├── redirect.vue                                       # 重定向页面
│   │   ├── register.vue                                       # 注册页面
│   │   ├── welcome.vue                                        # 欢迎页面
│   │   └── type.ts                                            # 局部类型定义
```
