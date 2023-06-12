---
title: DragVerify
meta:
  - name: description
    content: 滑动验证
---

::: warning 警告
**1.29.0 版本以后不在提供该组件**
:::

# DragVerify

滑动验证。[来源](https://vvbin.cn/doc-next/components/verify.html)

## 使用

### 基础使用

::: demo

```vue
<template>
  <div class="wrap-demo">
    <n-drag-verify @success="handleSuccess" ref="elRef" />
    <p>{{ optTime }}</p>
    <el-button type="primary" @click="reset">还原</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const optTime = ref<string | null>()
const reset = () => {
  elRef.value.resume()
  optTime.value = null
}
const elRef = ref(null)
function handleSuccess(data: any) {
  const { time } = data
  console.log(data)
  optTime.value = `校验成功,耗时${time}秒`
}
</script>
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

| Name         | Type      | Default          | Description        |
| ------------ | --------- | ---------------- | ------------------ |
| value        | `boolean` | -                | 是否通过           |
| text         | `string`  | `请按住滑块拖动` | 未拖动时候显示文字 |
| successText  | `string`  | `验证通过`       | 验证成功后显示文本 |
| height       | `number`  | 40               | 高度               |
| width        | `number`  | 260              | 宽度               |
| circle       | `boolean` | false            | 是否圆角           |
| wrapStyle    | `object`  | -                | 外层容器样式       |
| contentStyle | `object`  | -                | 主体内容样式       |
| barStyle     | `object`  | -                | bar 样式           |
| actionStyle  | `object`  | -                | 拖拽按钮样式       |

## Methods

| Name   | Parameters | Description |
| ------ | ---------- | ----------- |
| resume | `()=>{}`   | 还原初始值  |

## Slot

| Name        | Description                                |
| ----------- | ------------------------------------------ |
| action-icon | 自定义拖动按钮图标，传入是否验证通过的参数 |
| content     | 自定义管道内容 ，传入是否验证通过的参数    |
