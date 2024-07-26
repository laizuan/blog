---
title: Card
meta:
  - name: description
    content: 卡片和块
---

# Card

卡片和区域块

:::tip 提示

`border` 和 `shadow` 属性以及 `footer` 插槽只有在 `card=true` 的时候有效。

:::

## 使用

:::demo

```vue
<template>
  <div class="card-demo">
    <el-button @click="doSwitch">切换模式</el-button>
    <el-button @click="doSwitchBorder">Border</el-button>
    <el-button @click="doSwitchShadow">Shadow</el-button>
    <n-card
      title="这是个标题"
      className="121212"
      :card="card"
      style="margin-top:20px"
      :border="border"
      :shadow="shadow"
    >
      <template #left>
        <el-tag>Left Slot</el-tag>
      </template>
      <template #right>
        <el-tag>Right Slot</el-tag>
      </template>
      <template #footer>
        <el-tag>Footer Slot</el-tag>
      </template>
      <n-form
        v-model="form"
        :fields="fields"
        label-width="100px"
        @submit="submit"
      />
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'


    const doSwitch = () => {
      card.value = !card.value
    }

    const doSwitchBorder = () => {
      border.value = !border.value
    }

    const doSwitchShadow = () => {
      shadow.value = !shadow.value
    }

    const card = ref(false)
    const border = ref(false)
    const shadow = ref(false)

    const form = ref({})
    const rules = ref({
      'name.value': {
        required: true,
        message: '日期不能为空',
        trigger: 'change',
      },
      address: { required: true, message: '用户不能为空', trigger: 'blur' },
    })
    const fields = [
      {
        label: '名字',
        prop: 'name.value',
        component: 'n-select',
        props: {
          disabled: true,
          ifDisabled: (f) => {
            return f.address !== undefined && f.address !== ''
          },
          data: [
            { value: '1', desc: '测试' },
            { value: '2', desc: '测试二' },
            { value: '3', desc: '测试三' },
          ],
        },
      },
      {
        label: '地址',
        prop: 'address',
        component: 'el-input',
        ifShow: (model) => {
          return model.name?.value
        },
        rules: [],
        ifRules: (val, rules) => {
          if (val.name?.value == 1) {
            rules.push({
              max: 5,
              min: 2,
              message: 'Please input Activity name',
              trigger: 'blur',
            })
            return rules
          }
          return []
        },
      },
    ]
    const submit = (done, isValid, invalidFields) => {
      console.log(JSON.stringify(form.value))
      console.log(isValid, invalidFields)
      setTimeout(() => {
        done()
      }, 1000)
    }


</script>
<style>
.card-demo {
  background-color: var(--el-bg-color-page);
  padding: 15px;
}
</style>
```

:::

## Props

| Name           | Description      | Type    | Options   | Default   |
| -------------- | ---------------- | ------- | -------- | --------- |
| title          | 标题名称                                 | string  | -         | -         |
| card           | 是否卡片模式                             | boolean | -         | false     |
| border         | 是否显示 border，在`card=true`的时候有效 | boolean | -         | false     |
| shadow         | 是否显示阴影，在`card=true`的时候有效    | boolean | -         | false     |
| class-name     | css 类名                                 | string  | -         | -         |
| show-helper    | 是否显示提示图标                         | boolean | -         | false     |
| helper-message | 提示内容                                 | `string | string[]` | -         | -   |
| placement      | Tooltip 出现的位置， 参考`ElTooltip`属性 | string  | -         | top-start |
| folding        | 是否可以展开/收缩                        | boolean | -         | false     |

## Slots

| Name   | Description                          |
| ------ | ------------------------------------ |
| title  | 头部标题内容                         |
| left   | 头部左边内容                         |
| right  | 头部右边内容                         |
| footer | 底部内容，只有 `card=true`的时候有效 |
