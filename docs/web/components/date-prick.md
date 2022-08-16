---
title: DatePrick
meta:
  - name: description
    content: 日期选择器
---

# DatePrick

`el-date-prick`日期选择器增强

## 使用

::: demo

```vue
<template>
  <n-card title="快捷选择">
    <n-date-picker v-model="time" show-fast />
    {{ time }}
  </n-card>
  <n-card title="基础用法">
    <n-date-picker v-model="time2" type="datetime" />
    {{ time2 }}
  </n-card>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const time = ref([]);
      const time2 = ref([]);
      return { time, time2 };
    },
  };
</script>
```

:::

## Props

| Name | Description | Type | Options | Default |
| --- | --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | date(DateTimePicker) / array(DateTimeRangePicker) | - | - |
| show-fast | 是否显示快捷操作栏 | boolean | - | false |
| max | 最大可选天数, 0 表示最大可选到当天, -1 不限制。仅在`datetimerange、daterange`的时候生效 | number | - | 0 |
| min | 最小可选天数, 0 表示不限制。仅在`datetimerange、daterange`的时候生效 | number | - | 0 |
| default-range | 默认范围时间，0 不默认。单位天。设置 7 表示当前时间之前的第 7 天到现在的时间段。 | number | - | 0 |
| value-format | 可选，绑定值的格式。 默认时间戳格式 | string | - | X |
| readonly | 只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| size | 输入框尺寸 | string | large/medium/small/mini | large |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| type | 显示类型 | string | year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange | date |
| format | 显示在输入框中的格式 | string | 请查看 [date formats](https://element-plus.gitee.io/en-US/component/date-picker.html#date-formats) | YYYY-MM-DD |
| popper-class | DatePicker 下拉框的类名 | string | — | — |
| range-separator | 选择范围时的分隔符 | string | — | '-' |
| default-value | 可选，选择器打开时默认显示的时间 | Date | anything accepted by `new Date()` | — |
| default-time | 范围选择时选中日期所使用的当日内具体时刻 | Date[] | 长度为 2 的数组，每一项都是 Date 对象。 第一项是起始日期，第二项是终止日期 | — |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 请查阅 [date formats](https://element-plus.gitee.io/en-US/component/date-picker.html#date-formats) | — |
| name | 原生属性 | string | — | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | boolean | — | false |
| prefix-icon | 自定义前缀图标 | string / Component | — | Date |
| clear-icon | 清楚日期图标 | string / Component | — | CircleClose |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |
| disabledDate | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数 ，应该返回一个 Boolean 值 Should return a Boolean | function | — | — |
| shortcuts | 设置快捷选项，需要传入数组对象 | object[{ text: string, value: date / function }] | — | — |

## Events

| Name | Description | 参数 |
| :-- | :-- | :-- |
| change | 用户确认选定的值时触发 | 组件绑定值 |
| blur | 在组件 Input 失去焦点时触发 | 组件实例 |
| focus | 在组件 Input 获得焦点时触发 | 组件实例 |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 `default-value` 来设置成其他的日期。 | [Date, Date] |

## Methods

| Name  | Description       | 参数 |
| :---- | :---------------- | :--- |
| focus | 使 input 获取焦点 |      |

## Slots

| Name            | Description          |
| --------------- | -------------------- |
| default         | 自定义内容           |
| range-separator | 自定义范围分割符内容 |
