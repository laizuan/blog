---
title: 自定义主题
meta:
  - name: description
    content: 如何自定义 element-next 组件库的主题
---

# 自定义主题

::: tip 提示

内部 css-variables 将优先使用来自 `Element Plus` 的 css-variables，方便你同时控制两个组件库的样式。

:::

## 自定义主题色

[查看官方文档](https://element-plus.gitee.io/en-US/guide/theming.html#change-theme-color-since-1-1-0-beta-1) 。如果你喜欢内置主题你也可以通过 `main.ts` 中引入

```ts
// 引入element-next样式
import 'element-next/lib/styles/index.css'
// 引入自定义主题
import './styles/theme.scss'
// 引入重置个别组件样式
import 'element-next/styles/reset.css';
```

theme.scss 源码

```scss
$--colors: (
  'primary': (
    'base': #0054a4,
  ),
  'success': (
    'base': #19be6b,
  ),
  'warning': (
    'base': #ff9900,
  ),
  'danger': (
    'base': #e11b22,
  ),
  'error': (
    'base': #e11b22,
  ),
  'info': (
    'base': #949494,
  ),
);

$--text-color: (
  'primary': #17233d,
  'regular': #515a6e,
  'secondary': #808695,
  'placeholder': #c5c8ce,
);

// You should use them in scss, because we calculate it by sass.
// comment next lines to use default color
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  // do not use same name, it will override.
  $colors: $--colors,
  $text-color: $--text-color
);

@use 'element-plus/theme-chalk/src/index.scss' as *;

// 引入element-plus暗黑主题变量
@use 'element-plus/theme-chalk/src/dark/css-vars.scss' as *;

// 引入暗黑自定义变量
@use './dark.scss' as *;
```
