---
title: Dialog 弹窗
meta:
  - name: description
    content: element-plus dialog 弹窗拓展
---

# Dialog

`ElDialog` 弹窗拓展

## 示例

:::demo

```vue
<template>
  <el-button @click="doShow">显示{{ show }}</el-button>
  <n-dialog
    title="标题"
    v-model="show"
    autoWidth
    :fixedHeight="true"
    @cancel="doCancel"
    top="10px"
    helperMessage="提示"
    :loading="false"
    @open="doOpen"
  >
    <h1>
      111111111111111111111111111111111111111111111111111111111111111111111111111111111
    </h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <h1>测试</h1>
    <template #title1>
      <el-button>前置槽位</el-button>
    </template>
    <template #footer-before>
      <el-button>前置槽位</el-button>
    </template>
    <template #footer-after>
      <el-button>后置槽位</el-button>
    </template>
  </n-dialog>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const show = ref(false)
    const doShow = () => {
      show.value = !show.value
    }
    const doCancel = () => {
      console.log('doCancel')
    }
    const doOpen = () => {
      console.log('doOpen')
    }
    return {
      show,
      doCancel,
      doOpen,
      doShow,
    }
  },
}
</script>
```

:::

## Props

| Name             | Description                                                  | Type                                 | Options | Default                                                      |
| :--------------- | :----------------------------------------------------------- | :----------------------------------- | :------ | :----------------------------------------------------------- |
| v-model          | 是否显示 Dialog                                              | boolean                              | -       | -                                                            |
| draggable        | 是否可拖拽窗口                                               | boolean                              | -       | true                                                         |
| show-full-screen | 是否显示全屏图标，如果是自定义`title`插槽该属性无效          | boolean                              | -       | true                                                         |
| fixed-height     | 是否固定弹窗内容高度                                         | boolean                              | -       | false                                                        |
| confirm-props    | 确定按钮属性，见下方`confirm-props`                          | object                               | -       | `{text: '确定', show: true, type: 'primary'}`                |
| cancel-props     | 确定按钮属性，见下方`confirm-props`                          | object                               | -       | `{text: '取消', show: true, type: 'default'}`                |
| auto-width       | 是否启用自动计算宽度。详情见下方`auto-width`                 | boolean                              | -       | true                                                         |
| width-config     | 自动计算宽度配置。                                           | object                               | -       | `{ xs: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%', }` |
| cancel-close     | 是否点击取消按钮的时候关闭弹窗                               | boolean                              | -       | true                                                         |
| before-close     | 关闭前的回调，会暂停 Dialog 的关闭，如果没有传值，那么直接关闭弹窗 | function(done)，done 用于关闭 Dialog | -       | -                                                            |
| helper-message   | 显示提示信息内容，不为空的时候显示`ElTooltip` 组件           | `string|string[]`                    | -       | -                                                            |
| loading          | 弹窗内容是否显示 loading                                     | boolean                              | -       | false                                                        |

::: tip 提示

**支持[ElDialog](https://element-plus.gitee.io/zh-CN/component/dialog.html#%E5%B1%9E%E6%80%A7)属性**

`auto-width`实现方式：先获取到电脑屏幕的宽度，然后转换成 Bootstrap 的 响应式设计的五个响应尺寸：xs、sm、md、lg 和 xl。这些响应式尺寸可以通过 `width-config` 来配置。你传入的匹配会和`width-config`默认的配置合并。

**需要注意的是：如果你设置了`width`属性，那么 `auto-width` 和 `width-config` 两个属性无效**

:::

### Confirm & Cancel Props

| 参数  | 说明     | 类型    | 可选值 | 默认值    |
| :---- | :------- | :------ | :----- | :-------- |
| label | 按钮文案 | string  | -      | 确定/取消 |
| show  | 是否显示 | boolean | -      | true      |

**支持 [ElButton](https://element-plus.gitee.io/zh-CN/component/button.html#button-%E5%B1%9E%E6%80%A7) 属性**

## Slots

| Name          | Description              |
| ------------- | ------------------------ |
| footer-before | 取消按钮前的自定义内容   |
| footer-after  | 取消按钮之后的自定义内容 |
| header         | Dialog 标题区的内容      |

**不支持 `ElDialog` 的 `footer` 插槽**

## Evetns

| Name    | Description                                                                    | 参数 |
| :------ | :----------------------------------------------------------------------------- | :--- |
| confirm | 点击确定按钮的回调                                                             | -    |
| cancel  | 点击取消按钮的回调，**注意：会先关闭弹窗，可以通过 `cancel-close` 属性来取消** | -    |

**支持 [ElDialog](https://element-plus.gitee.io/zh-CN/component/dialog.html#%E4%BA%8B%E4%BB%B6)事件**
