---
title: Tag 标签
meta:
  - name: description
    content: 对 ElementPlus Tab 组件 type 属性的一个拓展
---

# Tag

`el-tag` 颜色拓展。

- `success`
- `info`
- `warning`
- `danger`

- `black`
- `cyan`
- `green`
- `grey`
- `blue`
- `lime`
- `orange`
- `pink`
- `purple`
- `red`
- `teal`
- `violet`
- `yellow`

:::demo

```vue
<template>
  <div class="tag-demo">
    <n-tag type="success">success</n-tag>
    <n-tag type="warning">warning</n-tag>
    <n-tag type="info">info</n-tag>
    <n-tag type="danger">danger</n-tag>
    <n-tag type="amber">amber</n-tag>
    <n-tag type="black">black</n-tag>
    <n-tag type="cyan">cyan</n-tag>
    <n-tag type="green">green</n-tag>
    <n-tag type="grey">grey</n-tag>
    <n-tag type="blue">blue</n-tag>
    <n-tag type="lime">lime</n-tag>
    <n-tag type="orange">orange</n-tag>
    <n-tag type="pink">pink</n-tag>
    <n-tag type="purple">purple</n-tag>
    <n-tag type="red">red</n-tag>
    <n-tag type="teal">teal</n-tag>
    <n-tag type="violet">violet</n-tag>
    <n-tag type="yellow">yellow</n-tag>
  </div>
</template>
<style>
  .tag-demo .el-tag {
    margin-bottom: 20px;
    margin-left: 20px;
  }
</style>
```

:::

## Props

| Name | Description                                    | Type   | Options               | Default |
| ---- | ---------------------------------------------- | ------ | --------------------- | ------- |
| text | 文本内容，也可以通过默认插槽传入，后者优先级高 | string | -                     | -       |
| size | 尺寸                                           | string | medium / small / mini | -       |
| type | 类型                                           | string |                       | -       |
