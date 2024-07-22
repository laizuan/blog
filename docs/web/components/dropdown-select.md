# Input

ElInput 增强

::: demo

```vue
<template>

  <n-card title="多选">
    <n-dropdown-select v-model="v1" :data="data1" />
  </n-card>
  <n-card title="单选">
    <n-dropdown-select v-model="v3" :multiple="false" placeholder="自定义配置" :data="data2"
      :config="{ value: 'code', desc: 'label' }" />
  </n-card>
  <n-card title="自定义配置">
    <n-dropdown-select v-model="v2" placeholder="自定义配置" :data="data2" :config="{ value: 'code', desc: 'label' }" />
  </n-card>

  <div>多选: {{ v1 }}</div>
  <div>单选: {{ v3 }}</div>
  <div>自定义配置: {{ v2 }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const v1 = ref()
const v2 = ref()
const v3 = ref()
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const data1 = Array.from({ length: 10 }).map((_, idx) => ({
  desc: `Option${idx + 1}`,
  value: `Data1 - ${initials[idx % 10]}${idx}`,
}))

const data2 = Array.from({ length: 10 }).map((_, idx) => ({
  code: `Option${idx + 1}`,
  label: `Data2 - ${initials[idx % 10]}${idx}`,
}))

</script>
```

:::

## Props

| Name     | Description    | Type   | Options                               | Default |
| -------- | -------------- | ------ | ------------------------------------- | ------- |
| modelValue   | 值   | `String, Number, Array<string>, Array<number>` | `-`    | -    |
| data | 下拉数据 | `Record<String, String\|Number>` | - | -    |
| multiple | 是否多选 | Boolean | - | true    |
| disabled | 是否禁用 | Boolean | - | false    |
| placement | 选中后label提示方向 | String | - | left    |
| trigger | 下拉项触发形式 | `hover/click` | - | click    |
| placeholder | 未选择时占用提示语 | String | - | -    |
| labelStyle | label样式 | String | - | `max-width: 100px`    |
| config | 下拉数据配置 | `Record<String, String>` | - |  `{'value':'value', 'desc':'desc', 'disabled': 'disabled'}`   |

### Config

| Name     | Description    | Type   | Options                               | Default |
| -------- | -------------- | ------ | ------------------------------------- | ------- |
| value   | 值   | `String` | `-`    | value    |
| desc   | 显示的label   | `String` | `-`    | desc    |
| disabled   | 当前项是否禁用标识   | `String` | `-`    | disabled    |

## Events

| Name  | Description            | Parameters         |
| ----- | ---------------------- | ------------------ |
| change | 每次点击下拉项的时候回调 | `Record<String, String\|Number>`当前选中的值，`Record<String, String\|Number>\|Record<String, String\|Number>[]`旧的值 |
| select | 最终选择完成的回调事件 |`Record<String, String\|Number>\|Record<String, String\|Number>[]`最终的值，也就是`modelValue`的值 |


## Slot


| Name  | Description            | Parameters         |
| ----- | ---------------------- | ------------------ |
| defaulet | 下拉选项插槽 | `item`: 当前项的值 |
