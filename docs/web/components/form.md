---
title: Form 动态表单
meta:
  - name: description
    content: 封装表单组件实现通过配置动态生成表单
---

# Form

[ElForm](https://element-plus.gitee.io/zh-CN/component/form.html) 表单增强

::: tip 提示

支持 `element-plus` 的 **Form 表单组件**，以及本组件库的组件。建议优先使用本组件库的组件

:::

## 使用

当 `fields` 绑定的是一个具有响应式的数组时，数组的变动会影响表单变动（及动态表单）。如果不需要动态表单推荐绑定一个普通数组，

### 基础用法

支持动态 `Rules`，动态禁用，动态显示功能。支持字段名称多层级（`name.value` 最终会解析成 `{name: {value: null}}`）

::: demo

```vue
<template>
  <n-form v-model="form" :fields="fields" label-width="100px" @submit="submit" />
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const form = ref({})
    const fields = [
      {
        label: '名字',
        prop: 'name.value',
        showHelper: true,
        helperMessage: '地址栏不为空的时候禁用该项',
        component: 'n-select',
        props: {
          style: 'width:100%',
          clearable: true,
          placeholder: '名字不为空的时候可以显示地址字段',
          ifDisabled: (f) => {
            return f.address !== undefined && f.address !== ''
          },
          displayKey: ['label'],
          config: { value: 'value', desc: 'label' },
          data: [
            { value: '1', label: '地址栏最多输入5个字符，最少2个' },
            { value: '2', label: '地址栏必填' },
            { value: '3', label: '地址栏没有校验' }
          ]
        }
      },
      {
        label: '地址',
        prop: 'address',
        component: 'el-input',
        ifShow: (model) => {
          return model.name.value
        },
        props: {
          clearable: true,
          placeholder: '地址不为空的时候禁用名字选择'
        },
        ifRules: (val, rules) => {
          if (val.name.value == 1) {
            return [
              {
                max: 5,
                min: 2,
                message: '地址栏最多输入5个字符，最少2个',
                trigger: 'blur'
              }
            ]
          } else if (val.name.value == 2) {
            return [
              {
                required: true,
                message: '地址栏必填',
                trigger: 'blur'
              }
            ]
          }
          return []
        }
      }
    ]
    const submit = (done, isValid, invalidFields) => {
      console.log(JSON.stringify(form.value))
      console.log(isValid, invalidFields)
      setTimeout(() => {
        done()
      }, 1000)
    }

    return {
      form,
      fields,
      submit
    }
  }
}
</script>
```

:::

### 内置 Label

::: tip 提示

目前支持 `n-input` `n-select` `n-date-picker` 组件

:::

::: demo

```vue
<template>
  <n-form ref="ruleForm" v-model="form22" :inner-label="true" :fields="fields22" />
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const fields22 = [
      {
        label: '姓名',
        prop: 'name',
        component: 'n-input'
      },
      {
        label: '地址',
        prop: 'address',
        component: 'n-select',
        props: {
          data: [
            { value: '1', desc: '地址栏最多输入5个字符，最少2个' },
            { value: '2', desc: '地址栏必填' },
            { value: '3', desc: '地址栏没有校验' }
          ]
        }
      },
      {
        label: '生日',
        prop: 's2',
        component: 'n-date-picker',
        props: {
          type: 'datetime'
        }
      },
      {
        label: '范围日期',
        prop: 's',
        component: 'n-date-picker'
      }
    ]

    const form22 = ref({ address: null, name: null })
  }
}
</script>
```

:::

### 分组使用

添加 `group` 属性进行分组

::: warning 提示

只支持一级分组，不支持嵌套。并且在开启`收起展开`的时候，只会收起`item`组件，不会收起**卡片和块组件**。点下面的`展开`查看问题

:::

::: demo

```vue
<template>
  <n-form v-model="form2" :fields="fields2" label-width="100px" @submit="submit" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const form2 = ref({})

    const fields2 = [
      {
        label: '名字',
        prop: 'name.value',
        component: 'n-select',
        props: {
          data: [
            { value: '1', desc: '测试' },
            { value: '2', desc: '测试二' },
            { value: '3', desc: '测试三' }
          ]
        }
      },
      {
        label: '地址',
        prop: 'address',
        component: 'el-input'
      },
      {
        group: {
          title: '测试分组一',
          children: [
            {
              label: '年龄',
              prop: 'age',
              component: 'el-input'
            },
            {
              label: '身高',
              prop: 'height',
              component: 'el-input'
            }
          ]
        }
      },
      {
        group: {
          title: '卡片形式',
          card: true,
          border: true,
          shadow: true,
          children: [
            {
              label: '学历',
              prop: 'education',
              component: 'el-input'
            },
            {
              label: '学校',
              prop: 'school',
              component: 'el-input'
            }
          ]
        }
      },
      {
        label: '学分',
        prop: 'credit',
        component: 'el-input'
      },
      {
        label: '特长',
        prop: 'credit',
        component: 'el-input'
      }
    ]
    const submit = (done, isValid, invalidFields) => {
      console.log(JSON.stringify(form.value))
      console.log(isValid, invalidFields)
      setTimeout(() => {
        done()
      }, 1000)
    }

    return {
      form2,
      fields2,
      submit
    }
  }
}
</script>
```

:::

### 网格

与使用 el-row 和 el-col 组件相同 (el-col 对应 field)，通过相关配置可以自由地组合布局。

::: demo

```vue
<template>
  <n-form v-model="form3" :fields="fields3" label-width="100px" @submit="submit" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const form3 = ref({})

    const fields3 = [
      {
        label: '名字',
        prop: 'name.value',
        component: 'n-select',
        md: 8,
        xl: 12,
        props: {
          data: [
            { value: '1', desc: '测试' },
            { value: '2', desc: '测试二' },
            { value: '3', desc: '测试三' }
          ]
        }
      },
      {
        md: 8,
        xl: 12,
        label: '地址',
        prop: 'address',
        component: 'el-input'
      },

      {
        md: 12,
        label: '年龄',
        prop: 'age',
        component: 'el-input'
      },
      {
        md: 24,
        label: '身高',
        prop: 'height',
        component: 'el-input'
      },

      {
        label: '学历',
        prop: 'education',
        component: 'el-input',
        md: 6
      },
      {
        md: 6,
        label: '学校',
        prop: 'school',
        component: 'el-input'
      },

      {
        md: 6,
        label: '学分',
        prop: 'credit',
        component: 'el-input'
      },
      {
        md: 6,
        label: '特长',
        prop: 'credit',
        component: 'el-input'
      }
    ]
    const submit = (done, isValid, invalidFields) => {
      console.log(JSON.stringify(form.value))
      console.log(isValid, invalidFields)
      setTimeout(() => {
        done()
      }, 1000)
    }

    return {
      form3,
      fields3,
      submit
    }
  }
}
</script>
```

:::

## Props

| Name                | Description                                                                                                            | Type                                             | Options                                             | Default |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- | :-------------------------------------------------- | :------ |
| v-model             | 绑定值                                                                                                                 | object                                           | -                                                   | -       |
| fields              | 表单项配置，参考下面 [fields](#fields-props) 属性                                                                      | array                                            | -                                                   | -       |
| action              | 操作项按钮配置，参考下面 [action](#action-props)属性                                                                   | object                                           | -                                                   | -       |
| inner-label         | 是否使用内置 label 模式，`element-plus` 组件无效                                                                       | boolean                                          | -                                                   | false   |
| enter-on-submit     | 输入框回车触发提交按钮点击事件，如果开启则自定义的 `onKeyup`事件无效                                                   | boolean                                          |                                                     | false   |
| validate-on-submit  | 点击提交按钮的时候校验表单，拦截并提示校验不通过的内容                                                                 | boolean                                          |                                                     | true    |
| first-auto-focus    | 进入页面第一个输入框是否获取焦点，只有第一个元素是 input 的时候有效                                                    | boolean                                          |                                                     | true    |
| show-more           | 是否显示更多，需要配合`limit`使用，**如果需要记住状态需要配置 RouteName**，我们会把 RouteName 做为保存在浏览器中的 key | boolean                                          |                                                     | false   |
| limit               | 最多显示多少个`field`项，`showMore=true`的时候有效                                                                     | number                                           |                                                     | 4       |
| highlight-error     | 表单验证不通过的时候输入框是否高亮                                                                                     | boolean                                          | -                                                   | true    |
| highlight-required  | 表单必填项输入框是否高亮                                                                                               | boolean                                          | -                                                   | true    |
| gutter              | `el-row` 栅格间隔，如果定义了`group`属性默认一个`group`属性就是一个`el-row`标签                                        | number                                           | -                                                   | 0       |
| justify             | `el-row` flex 布局下的水平排列方式，如果定义了`group`属性默认一个`group`属性就是一个`el-row`标签                       | string                                           | start / end / center / space-around / space-between | start   |
| align               | `el-row`flex 布局下的垂直排列方式，如果定义了`group`属性默认一个`group`属性就是一个`el-row`标签                        | string                                           | top / middle / bottom                               | top     |
| field-adaptive      | 表单项自适应栅格系统，开启后会自动添加`{ md: 8, xl: 6, sm: 12, xs: 24 }`属性                                           | boolean                                          | -                                                   | false   |
| fixed-action        | 是否把表单的操作按钮固定在左边，查询表单的时候很有用                                                                   | boolean                                          | -                                                   | false   |
| enter-next          | 回车是否跳转到下一个元素                                                                                               | boolean                                          | -                                                   | true    |
| scroll-to-error     | 校验不通过示范滚动当第一个错误项                                                                                       | boolean                                          | -                                                   | true    |
| field-map-to-time   | 用于将表单内时间区域的应设成 2 个字段,见下方说明                                                                       | `[string, [string, string], string?,boolean?][]` | -                                                   | -       |
| fiexd-error-message | 是否固定验证失败消息在右下角                                                                                           | boolean                                          | -                                                   | -       |

**支持 [el-form](https://element-plus.gitee.io/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7) 的所有属性**

### fieldMapToTime

[代码片段来源 Vben Admin](https://vvbin.cn/doc-next/components/form.html#fieldmaptotime)

将表单内时间区域的值映射成 2 个字段

如果表单内有时间区间组件，获取到的值是一个数组，但是往往我们传递到后台需要是 2 个字段

```ts

fieldMapToTime: [
  // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间于结束时间
  // 'YYYY-MM-DD'为时间格式，参考moment
  ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
  // 支持多个字段
  ['datetime1', ['startTime1', 'endTime1'], 'YYYY-MM-DD HH:mm:ss'],
  // 支持开始时间和结束时间，如果设置了第四个参数，那么第三个参数会默认为：YYYY-MM-DD HH:mm:ss
  ['datetime2', ['startTime2', 'endTime2'], 'YYYY-MM-DD', true],
],


// fieldMapToTime没写的时候表单获取到的值
{
  datetime: [Date(),Date()]
}
//  ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],之后
{
    datetime: [Date(),Date()],
    startTime: '2020-08-12',
    endTime: '2020-08-15',
}

// ['datetime2', ['startTime2', 'endTime2'], 'YYYY-MM-DD', true]
{
    datetime2: [Date(),Date()],
    startTime2: "2022-06-15 00:00:00",
    endTime2: "2022-07-15 23:59:59"
}
```

### fields Props

| Name           | Description                                                                        | Type                                             | Options | Default |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ | ------- | ------- |
| prop           | 表单域 `model` 字段， 在使用 validate、resetFields 方法的情况下，该属性是必填的    | string                                           | -       | -       |
| label          | 标签                                                                               | string                                           | -       | -       |
| component      | 当前项对应的组件，可以直接传入局部组件，支持`elment-plus` Form 表单组件            | `string / Component`                             | -       | -       |
| props          | 传递的对应的组件的参数                                                             | object                                           | -       | -       |
| show           | 是否显示该`item`项                                                                 | boolean                                          |         | TRUE    |
| if-show        | 动态控制是否显示`item`项。返回 true 渲染，false 不渲染                             | `Function(modelValue):boolean`                   | -       | -       |
| if-disabled    | 动态控制禁用状态                                                                   | `Function(modelValue):boolean`                   | -       | -       |
| if-rules       | 动态校验规则，返回最新的`rules`数组                                                | `Function(modelValue,rules):Array[FormItemRule]` | -       | -       |
| default-value  | 默认值                                                                             | `string / number / boolean / array / object`     | -       | -       |
| show-helper    | 是否显示提示图标，自定义头部插槽的时候无效                                         | boolean                                          | -       | FALSE   |
| helper-message | 提示内容，`show-helper`为真的时候有效                                              | `string / string[]`                              | -       | -       |
| extra-message  | 给`Form item`添加额外信息和帮助信息                                                | string                                           | -       | -       |
| group          | 分组，请参考[group](#group-props)属性                                              | object                                           | -       | -       |
| span           | 栅格占据的列数。`el-col`的属性，每个 item 就是一个`el-col`                         | number                                           | -       | 24      |
| offset         | 栅格左侧的间隔格数。`el-col`的属性，每个 item 就是一个`el-col`                     | number                                           | -       | 0       |
| push           | 栅格向右移动格数。`el-col`的属性，每个 item 就是一个`el-col`                       | number                                           | -       | 0       |
| pull           | 栅格向左移动格数。`el-col`的属性，每个 item 就是一个`el-col`                       | number                                           | -       | 0       |
| xs             | `<768px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col`  | `number / object`                                | -       | -       |
| sm             | `≥768px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col`  | `number / object`                                | -       | -       |
| md             | `≥992px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col`  | `number / object`                                | -       | -       |
| lg             | `≥1200px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | `number / object`                                | -       | -       |
| xl             | `≥1920px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | `number / object`                                | -       | -       |

::: tip 关于 Fields

**支持 [el-form-item](https://element-plus.gitee.io/zh-CN/component/form.html#formitem-%E5%B1%9E%E6%80%A7) 的所有属性**

props 的属性将全部传递给 component 指定的组件

- 对于存在连字符的属性，可以通过字符串包裹或者转换为驼峰结构
- 通过 `slots` 可以向组件传递简单的[渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)
- **对于事件需要通过 `on[Event]` 驼峰这种形式绑定。如：`change` -> `onChange`, `input` -> `onInput`**

:::

```js
import { markRaw } from 'vue'
import { Search } from '@element-plus/icons-vue'
props: {
  clearable: true,
  'prefix-icon': markRaw(Search),
  suffixIcon: markRaw(Search),
  slots: {
    prefix: () => h('ElIcon', { icon: markRaw(Search) }),
    append: () => '搜索'
  },
  onChange: e => console.log(e),
}
```

### group Props

| Name      | Description                      | Type    | Options | Default |
| :-------- | :------------------------------- | :------ | :------ | :------ |
| card      | 是否卡片模式，`false` 块状模式   | boolean | -       | false   |
| title     | 标题                             | string  | -       | -       |
| border    | 是否显示边框，只在卡片模式下生效 | boolean | -       | false   |
| shawod    | 是否显示阴影，只在卡片模式下生效 | boolean | -       | false   |
| className | 样式类名                         | string  | -       | -       |
| children  | 分组下的`fields`属性             | array   | -       | []      |

**分组不支持嵌套，可查看[分组示例](#分组使用)**

### action Props

该表单项栅格系统默认为：`{ md: 8, xl: 6, sm: 12, xs: 24 }`
| Name | Description | Type | Options | Default |
| :-- | :-- | :-- | :-- | :-- |
| submit | 是否显示 submit 按钮 | boolean | - | true |
| submitText | submit 按钮显示的文字 | string | - | 提交 |
| submitProps | submit 按钮的配置，参考 el-button | object | - | { type: 'primary' } |
| reset | 是否显示 reset 按钮 | boolean | - | true |
| resetText | 是否显示 reset 按钮显示的文字 | string | - | 重置 |
| resetProps | reset 按钮的配置，参考 el-button | object | - | - |
| align | 对齐方式 | string | `left / right / center` | - |
| span | 栅格占据的列数。`el-col`的属性，每个 item 就是一个`el-col` | number | - | 24 |
| offset | 栅格左侧的间隔格数。`el-col`的属性，每个 item 就是一个`el-col` | number | - | 0 |
| push | 栅格向右移动格数。`el-col`的属性，每个 item 就是一个`el-col` | number | - | 0 |
| pull | 栅格向左移动格数。`el-col`的属性，每个 item 就是一个`el-col` | number | - | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | number / object | - | - |
| sm | `≥768px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | number / object | - | - |
| md | `≥992px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | number / object | - | - |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | number / object | - | - |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象。`el-col`的属性，每个 item 就是一个`el-col` | number / object | - | - |

## Events

| Name     | Description                                              | Parameters                                     |
| -------- | -------------------------------------------------------- | ---------------------------------------------- |
| submit   | submit 被点击后触发，使用`done()`函数来关闭`loading`状态 | done, isValid, invalidFields                   |
| reset    | reset 按钮被点击后触发                                   | -                                              |
| nextDone | 回车跳转到下一个元素开启后，最后一个元素回车后回调事件   | -                                              |
| validate | 任一表单项被校验后触发                                   | 被校验的表单项 prop 值, isValid, invalidFields |

## Methods

| Name          | Description                                                                                                                                                          | Parameters                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))                              |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                         | Function(props: array \| string, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | -                                                                          |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果                                                             | Function(props: array \| string)                                           |
| setErrors     | 设置表单错误信息                                                                                                                                                     | Function(errors: ValidateError) => void                                    |

::: tip 提示

如果使用 `typescript` 可以从组件中导出 `FormExpose` 提供更好的类型推导。参考如下在 setup 中使用

:::

```vue
<template>
  <n-form ref="ruleForm" v-model="form" :fields="fields" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { FormExpose } from 'element-pro'

export default defineComponent({
  setup() {
    const ruleForm = ref<FormExpose>({} as FormExpose)

    function clearValidate() {
      ruleForm.value.clearValidate()
    }

    return { ruleForm, clearValidate }
  }
})
</script>
```

## Slots

| Name          | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| -             | 按钮节点之前的内容                                               |
| form-before   | 字段开始之前的内容                                               |
| form-after    | 按钮节点之后的内容                                               |
| action-before | 在重置按钮之前的内容                                             |
| action-after  | 在提交按钮之后的内容，如果开启更多按钮则在更多按钮前面           |
| [prop]        | 当前这项的 Form Item 的内容，参数为`{ item, value, setValue }`   |
| [prop]-label  | 当前这项的标签文本的内容，参数为 `{ item } `                     |
| [prop]-error  | 当前这项的自定义表单校验信息的显示方式，参数为 `{ error, item }` |

::: tip 提示

[prop] 为 fields 中定义的 prop

:::

## TypeScript 定义

```ts
export declare function defineFormFields<T = any>(fileds: Array<FormField<T>>): Array<FormField<T>>
export declare function defineFormGropuFileds<T = ExternalParam>(
  fileds: FormGroup<T>[]
): FormGroup<T>[]
export declare function defineFormActions(action: FormAction): FormAction
export declare const defineFormMethod: () => Ref<FormExpose>

interface ValidateError {
  message: string
  field: string
}
```
