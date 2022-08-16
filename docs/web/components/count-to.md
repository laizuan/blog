---
title: CountTo
meta:
  - name: description
    content: 数字动画组件
---

# CountTo

数字动画组件。[来源](https://github.com/PanJiaChen/vue-countTo)

## 使用

::: demo

```vue
<template>
  <div class="wrap-demo">
    <n-count-to
      prefix="$"
      color="#409EFF"
      ref="countRef"
      :startVal="0"
      :endVal="2000"
      :duration="1500"
    ></n-count-to>
    <el-button type="primary" @click="resetCount"> 还原 </el-button>
    <el-button type="primary" @click="restartCount"> 重新开始 </el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const countRef = ref(null)
const resetCount = () => {
  countRef.value.reset()
}
const restartCount = () => {
  resetCount()
  countRef.value.start()
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

| Name      | Description      | Type       | Default |
| --------- | ---------------- | ---------- | ------- |
| startVal  | 开始的值         | number     | 0       |
| endVal    | 结束的值         | number     | -       |
| duration  | 动画持续的毫秒数 | number     | 3000    |
| autoplay  | 是否自动执行     | boolean    | true    |
| decimals  | 保留小数点位数   | number     | 0       |
| decimal   | 分割小数符号     | string     | .       |
| separator | 分隔符           | string     | ,       |
| prefix    | 前缀             | string     | ''      |
| suffix    | 后缀             | string     | ''      |
| useEasing | 是否开启动画     | boolean    | true    |
| easingFn  | 动画计算函数     | `function` | -       |
| color     | 字体颜色         | string     | -       |

## Events

| Name     | Description  | Parameters |
| -------- | ------------ | ---------- |
| started  | 开始滚动回调 | -          |
| finished | 滚动完成回调 | -          |

## Methods

| Name        | Parameters | Description  |
| ----------- | ---------- | ------------ |
| start       | -          | 开始执行动画 |
| reset       | -          | 重置         |
| pause       | -          | 暂停         |
| pauseResume | -          | 暂停或者开始 |
