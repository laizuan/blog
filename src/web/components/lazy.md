---
title: Lazy
meta:
  - name: description
    content: 组件懒加载
---

# Lazy

可以将组件定义成多少毫秒之后创建加载

## 使用

:::demo

```vue
<template>
  <n-lazy :time="3000">
    <el-button>我是一个懒加载之后的按钮</el-button>
    <template #placeholder> {{ timeout }} s 后会显示一个按钮 </template>
  </n-lazy>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const timeout = ref(3);
      const flag = setInterval(() => {
        timeout.value = timeout.value - 1;
        if (timeout.value === 0) {
          clearInterval(flag);
        }
      }, 1000);

      return {
        timeout,
      };
    },
  };
</script>
```

:::

## Props

| Name | Description                        | Type   | Options | Default |
| ---- | ---------------------------------- | ------ | ------- | ------- |
| time | 多少毫秒之后初始化组件，0 即刻渲染 | number | -       | 0       |
| tag  | 包裹组件的外层容器的标签名         | string | -       | `div`   |

## Slots

| Name        | Description          |
| ----------- | -------------------- |
| default     | 默认区域             |
| placeholder | 组件未加载的占位内容 |
