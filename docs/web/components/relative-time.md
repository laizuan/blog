---
title: RelativeTime
meta:
  - name: description
    content: 相对时间
---

# RelativeTime

相对时间组件。[来源](https://vvbin.cn/doc-next/components/time.html)

## 使用

::: demo

```vue
<template>
  <div class="wrap-demo">
    <n-relative-time :value="time"></n-relative-time>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const now = new Date().getTime()
const time = ref(now - 60 * 3 * 1000)
</script>
<style>
.wrap-demo {
  padding: 30px;
  width: 100%;
  background-color: var(--el-bg-color-page);
}
</style>
```

## Props

| Name  | Type                 | Default    | Options                      | Description                                         |
| ----- | -------------------- | ---------- | ---------------------------- | --------------------------------------------------- |
| value | `string,Date,number` | -          | -                            | 时间值                                              |
| step  | `number`             | `60`       | -                            | 刷新时间                                            |
| mode  | `string`             | `relative` | `date / datetime / relative` | 模式，date:日期，datetime:时间戳，relative:相对时间 |
