---
title: Descriptions
meta:
  - name: description
    content: 描述列表
---

# Descriptions

对[ElDescriptions](https://element-plus.gitee.io/zh-CN/component/descriptions.html)封装

## 使用

::: demo

```vue
<template>
  <div class="decoration-dome">
    <n-descriptions
      :groups="schema"
      :data="mockData"
      :border="true"
      :folding="true"
      :column="4"
      label-class-name="w-120"
    >
      <template #label-username>
        <el-tag>用户名</el-tag>
      </template>
      <template #field-sex="{ sex }">
        <el-tag>{{ sex }}</el-tag>
      </template>
    </n-descriptions>
  </div>
</template>

<script>
import { h } from 'vue'
export default {
  setup() {
    const mockData = {
      username: 'test',
      nickName: 'testNick',
      age: 123,
      phone: '15695909xxx',
      email: 'xxxxxx@qq.com',
      addr: '深圳',
      sex: '男',
      cardId: '007',
      tag: 'orange',
      time: Date.now(),
    }
    const schema = [
      {
        title: '测试',
        showHelper: true,
        helperMessage: '测试',
        folding: false,
        isCard: false,
        left: () => {
          return h('div', '左边插槽')
        },
        fields: [
          {
            prop: 'username',
            label: '用户名',
          },
          {
            prop: 'nickName',
            label: '昵称',
            render: (curVal, data) => {
              return `${data.username}------${curVal}`
            },
          },
          {
            prop: 'phone',
            label: '联系电话',
            showCopy: true,
          },
          {
            prop: 'email',
            label: '邮箱',
          },
          {
            prop: 'addr',
            label: '地址',
            labelColor: '#081',
          },
        ],
      },
      {
        title: '测试2',
        column: 2,
        shadow: true,
        right: () => {
          return h('div', '右边插槽')
        },
        fields: [
          {
            prop: 'sex',
            label: '性别',
            showHelper: true,
            helperMessage: '值使用的是插槽来完成的',
          },
          {
            prop: 'cardId',
            label: '工位号',
            render: (curVal, data) => {
              return `${data.username}-${curVal}`
            },
          },
          {
            prop: 'tag',
            label: '标签',
            color: '#f90',
          },
        ],
      },
      {
        title: '测试3',
        direction: 'vertical',
        size: 'small',
        labelAlign: 'center',
        cardBorder: true,
        footer: () => {
          return h('div', '底部插槽')
        },
        fields: [
          {
            prop: 'sex',
            label: '性别',
          },
          {
            prop: 'time',
            label: '时间',
            showHelper: true,
            helperMessage:
              '我是通过class来控制lable宽度的。时间是自动格式化的, 当然你也可以传入格式化类型',
            labelClassName: 'w-200',
            timeFormat: true,
          },
          {
            prop: 'cardId',
            label: '工位号',
            render: (curVal, data) => {
              return `${curVal} - 右边的标签列被动态隐藏了，请看示例代码`
            },
          },
          {
            prop: 'tag',
            label: '标签',
            ifShow: (data) => {
              return false
            },
          },
        ],
      },
    ]
    return {
      mockData,
      schema,
    }
  },
}
</script>
<style>
.decoration-dome {
  padding: 16px;
  width: 100%;
  // background-color: var(--el-bg-color-page);
}
.decoration-dome .w-120 {
  width: 120px !important;
}
.decoration-dome .w-200 {
  width: 200px !important;
}
</style>
```

:::

## Props

| Name             | Description                                          | Type                            | Options                 | Default    |
| ---------------- | ---------------------------------------------------- | ------------------------------- | ----------------------- | ---------- |
| is-card          | 是否卡片模式                                         | boolean                         | -                       | false      |
| card-border      | 是否显示 border，在`card=true`的时候有效             | boolean                         | -                       | false      |
| shadow           | 是否显示阴影，在`card=true`的时候有效                | boolean                         | -                       | false      |
| folding          | 卡片是否支持内容展开和收缩                           | boolean                         | -                       | false      |
| border           | 描述内容是否带有边框                                 | boolean                         | -                       | true       |
| column           | 一行 `Descriptions Item` 的数量                      | number                          | -                       | 3          |
| class-name       | css 类名                                             | string                          | -                       | -          |
| direction        | 排列的方向                                           | string                          | vertical / horizontal   | horizontal |
| size             | 列表的尺寸                                           | string                          | large / default / small | small      |
| align            | 列的内容对齐方式                                     | string                          | left / center / right   | left       |
| label-align      | 列的标签对齐方式，若不设置该项，则使用内容的对齐方式 | string                          | left / center / right   | right      |
| class-name       | 列的内容自定义类名                                   | string                          | -                       | -          |
| label-class-name | 列的标签自定义类名                                   | string                          | -                       | -          |
| groups           | `Descriptions`集合                                   | `Array<Description<DescField>>` | -                       | `[]`       |
| data             | 数据源                                               | object                          | -                       | -          |

### Description

| Name             | Description                                          | Type               | Options                 | Default    |
| ---------------- | ---------------------------------------------------- | ------------------ | ----------------------- | ---------- | --- |
| title            | 标题名称                                             | string             | -                       | -          |
| is-card          | 是否卡片模式                                         | boolean            | -                       | false      |
| card-border      | 是否显示 border，在`card=true`的时候有效             | boolean            | -                       | false      |
| shadow           | 是否显示阴影，在`card=true`的时候有效                | boolean            | -                       | false      |
| show-helper      | 是否显示提示图标                                     | boolean            | -                       | false      |
| helper-message   | 提示内容                                             | `string            | string[]`               | -          | -   |
| folding          | 卡片是否支持内容展开和收缩                           | boolean            | -                       | false      |
| border           | 描述内容是否带有边框                                 | boolean            | -                       | true       |
| column           | 一行 `Descriptions Item` 的数量                      | number             | -                       | 3          |
| class-name       | css 类名                                             | string             | -                       | -          |
| placement        | 提示内容显示方向                                     | string             | -                       | top-start  |
| direction        | 排列的方向                                           | string             | vertical / horizontal   | horizontal |
| size             | 列表的尺寸                                           | string             | large / default / small | small      |
| align            | 列的内容对齐方式                                     | string             | left / center / right   | left       |
| label-align      | 列的标签对齐方式，若不设置该项，则使用内容的对齐方式 | string             | left / center / right   | right      |
| class-name       | 列的内容自定义类名                                   | string             | -                       | -          |
| label-class-name | 列的标签自定义类名                                   | string             | -                       | -          |
| left             | Card 卡片左边插槽                                    | `()=>VNode`        | -                       | -          |
| right            | Card 卡片右边插槽                                    | `()=>VNode`        | -                       | -          |
| footer           | Card 卡片底部插槽                                    | `()=>VNode`        | -                       | -          |
| fields           | DescField 集合                                       | `Array<DescField>` | -                       | -          |

### DescField

| Name                | Description                                                                                                                                          | Type                                     | Options                 | Default    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------- | ---------- | ------- | ------ | ------------- | ------- |
| prop                | 字段名称                                                                                                                                             | string                                   | -                       | -          |
| label               | 文本名称                                                                                                                                             | string                                   | -                       | -          |
| span                | 列的数量                                                                                                                                             | number                                   | -                       | 1          |
| width               | 列的宽度，不同行相同列的宽度按最大值设定（如无 `border` ，宽度包含标签与内容）                                                                       | `string / number`                        | -                       | -          |
| min-width           | 列的最小宽度，与 `width` 的区别是 `width` 是固定的，`min-width` 会把剩余宽度按比例分配给设置了 `min-width` 的列（如无 `border`，宽度包含标签与内容） | `string / number`                        | -                       | -          |
| align               | 列的内容对齐方式（如无 `border`，对标签和内容均生效）                                                                                                | string                                   | `left / center / right` | `left`     |
| label-align         | 列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 `border`，请使用 `align` 参数）                                                           | string                                   | `left / center / right` | -          |
| class-name          | 列的内容自定义类名                                                                                                                                   | string                                   | -                       | -          |
| label-class-name    | 标签自定义类名                                                                                                                                       | string                                   | -                       | -          |
| color               | 列的内容字体 16 进制颜色                                                                                                                             | string                                   | -                       | -          |
| label-color         | 标签字体 16 进制颜色                                                                                                                                 | string                                   | -                       | -          |
| tag-type-name       | 设置内容为 tab 样式。取值`NTag`中的 type 属性                                                                                                        | string                                   | -                       | -          |
| time-format         | 时间格式化格式，不为空的时候客户化。如果为`true`，则格式化为`YYYY-MM-DD HH:mm:ss`                                                                    | string\|boolean                          | -                       | false      |
| show-helper         | 标签旁边是否显示提示图标                                                                                                                             | boolean                                  | -                       | false      |
| helper-message      | 提示内容                                                                                                                                             | `string                                  | string[]`               | -          | -       |
| show-copy           | 列内容是否可以拷贝                                                                                                                                   | boolean                                  | -                       | false      |
| if-show             | 动态控制该`filed`是否显示                                                                                                                            | `(data: Record<string, any>) => boolean` | -                       | -          |
| render              | 动态渲染                                                                                                                                             | `(val: string, data: any) => string      | VNode                   | VNode [] ` | -       | -      |
| image               | 显示图片的图片地址                                                                                                                                   | string                                   | -                       | -          |
| image-width         | 图片宽度                                                                                                                                             | string                                   | -                       | `60px`     |
| image-height        | 图片高度                                                                                                                                             | string                                   | -                       | `60px`     |
| image-fit           | 图片展示样式                                                                                                                                         | string                                   | `'fill'                 | 'contain'  | 'cover' | 'none' | 'scale-down'` | `cover` |
| image-src-list-prop | 预览图片 url 集合字段属性名称                                                                                                                        | string                                   | -                       | -          |

## Slots

`[field]`表示字段名称

| Name            | Description                      |
| --------------- | -------------------------------- |
| label-`[field]` | 自定义标签内容。参数为 data 数据 |
| prop-`[field]`  | 自定义列内容。参数为 data 数据   |

## TypeScript 定义

```js
export declare function defineDescription<T = ExternalParam>(descriptions: NDescription<T>[]): NDescription<T>[];
```
