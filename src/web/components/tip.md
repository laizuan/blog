---
title: Tip
meta:
  - name: description
    content: 提示组件
---

# Tip

提示组件

:::demo

```vue
<template>
  <div class="tip-demo">
    <n-card title="基础用法">
      <n-tip text="提示" content="这是很长很长的提示" />
    </n-card>

    <n-card title="点击图片可隐藏提示信息">
      <n-tip text="提示" click-enable content="这是很长很长的提示" />
    </n-card>

    <n-card title="图标在右边">
      <n-tip text="提示" iconPlacement="right" content="这是很长很长的提示" />
    </n-card>

    <n-card title="图标颜色">
      <n-tip text="提示" color="#f90" content="这是很长很长的提示" />
    </n-card>


    <n-card title="多行内容">
      <n-tip text="提示" color="#f90" :content="['第一行内容', '第二行内容']" />
    </n-card>
  </div>
</template>
```

:::

## Props

| Name | Description | Type | Options | Default |
| --- | --- | --- | --- | --- |
| text | 文本内容，可以通过`#default`插槽传入。支持`<br />`换行 | string | - | - |
| tag | 包裹组件的外层容器的标签名 | string | - | `span` |
| click-enable | 点击图标时候启用或者禁用提示文字 | boolean | - | false |
| size | 图标大小 | String | - | - |
| icon | 图标组件 | Component | - | QuestionFilled |
| icon-placement | 图标在文本内容的左侧还是右侧 | string | left / right | left |
| color | 图标颜色 | string | - | --el-color-primary |
| content | 显示的内容，也可以通过 `slot#content` 传入 DOM。如果传入的是`string[]`对象，那么将内容作为 HTML 字符串处理，请确保 `content` 的内容是可信的 | `String| string[]` | — | — |
| model-value / v-model | 状态是否可见 | boolean | — | false |

## Slots

| Name        | Description          |
| ----------- | -------------------- |
| default     | 默认区域             |
| placeholder | 组件未加载的占位内容 |
