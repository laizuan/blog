---
title: Input
meta:
  - name: description
    content: ElInput 增强
---

# Input

ElInput 增强

::: demo

```vue
<template>
  <n-card title="清空空格">
    <p>类型：{{ trimType }}</p>
    <el-button @click="trimType = 'start'">开头不能输入空格</el-button>
    <el-button @click="trimType = 'end'">结尾不能输入空格</el-button>
    <el-button @click="trimType = 'both'">两端不能有空格</el-button>
    <el-button @click="trimType = 'all'">不能输入空格</el-button>
    <n-input v-model="inputValue" class="mt-20" :trim-type="trimType" @input="onInput" />
  </n-card>

  {{ inputValue }}
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const inputValue = ref()
    const trimType = ref('start')

    const onInput = (v) => {
      console.log('onInput :>> ', v)
    }
    return {
      inputValue,
      onInput
    }
  }
}
</script>
```

:::

## Props

| Name     | Description    | Type   | Options                               | Default |
| -------- | -------------- | ------ | ------------------------------------- | ------- |
| format   | 字符串格式化   | string | uppercase / lowercase / capitalize    | -       |
| trimType | 清空输入的空格 | string | 'start', 'end', 'both', 'all', 'none' | both    |

## Events

| Name  | Description            | Parameters         |
| ----- | ---------------------- | ------------------ |
| enter | 输入框聚焦后的回车事件 | evt: KeyboardEvent |
