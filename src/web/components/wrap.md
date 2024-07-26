---
title: Warp
meta:
  - name: description
    content: 容器
---

# Warp

容器

## 使用

### 基础使用

:::demo

```vue
<template>
  <div class="wrap-demo">
    <n-wrap> 这是个容器 </n-wrap>
  </div>
</template>
<style>
.wrap-demo {
  padding: 30px;
  width: 100%;
  background-color: var(--el-bg-color-page);
}
</style>
```

:::

### 底部固定区域

**注意：底部槽位是固定在页面的底部的。一般在编辑或者详情的时候用来放置用户操作按钮使用**

:::demo

```vue
<template>
  <div class="wrap-demo">
    <n-wrap>
      这是个容器

      <template #footer>
        <el-button>操作一</el-button>
        <el-button type="primary">操作二</el-button>
      </template>
    </n-wrap>
  </div>
</template>
<style>
.wrap-demo {
  padding: 30px;
  width: 100%;
  background-color: var(--el-bg-color-page);
}
</style>
```

:::

## Props

| Name         | Description    | Type                | Options | Default  |
| ------------ | -------------- | ------------------- | ------- | -------- |
| loading      | 是否显示骨架屏 | boolean             | —       | false    |
| loadingStyle | 骨架屏样式     | `form\table\detail` | —       | `detail` |

## Slot

| Name   | Description  |
| ------ | ------------ |
| footer | 底部固定区域 |
