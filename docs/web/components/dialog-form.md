---
title: DialogForm
meta:
  - name: description
    content: 弹窗表单
---

# DialogForm

弹窗组件和表单组件的结合体

## 使用

::: tip 提示

- Dialog

  - `confirm-prop` 属性和事件都无效。请使用 form 组件的 `action` 的 `submit` 相关属性。关闭按钮使用`cancelProp`来定义
  - `footer-before` 和 `footer-after` 槽位无效，请使用 `form` 组件的 `action-before` 和 `action-after` 槽位

- Form

:::

::: demo

```vue
<template>
  <el-button @click="doShow">显示{{ show }}</el-button>
  <n-dialog-form
    ref="elRef"
    v-model="form"
    v-model:visible="show"
    :dialog-props="{ title: '标题', autoWidth: true, fixedHeight: true, top: '10px' }"
    :form-props="{ fields: fields }"
    @submit="submit"
    @cancel="doOpen"
    @open="doOpen"
  >
    <template #action-before>
      <el-button>前置槽位</el-button>
    </template>
    <template #action-after>
      <el-button>后置槽位</el-button>
    </template>
    <template #aaddress2>
      <el-button>aaddress2</el-button>
    </template>
  </n-dialog-form>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const show = ref(false);
      const elRef = ref({});
      const doShow = () => {
        show.value = !show.value;
      };
      const doOpen = () => {
        console.log(1);
      };

      const form = ref({});
      const fields = [
        {
          label: '名字',
          prop: 'name.value',
          component: 'n-select',
          props: {
            disabled: true,
            ifDisabled: (f) => {
              return f.address !== undefined && f.address !== '';
            },
            data: [
              { value: '1', desc: '测试一' },
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
            return model.name.value != null && model.name.value !== '';
          },
          ifRules: (val, rules) => {
            if (val.name.value == 1) {
              rules.push({
                max: 5,
                min: 2,
                message: 'Please input Activity name',
                trigger: 'blur',
              });
              return rules;
            }
            return [
              {
                required: true,
                message: 'Please input Activity name',
                trigger: 'blur',
              },
            ];
          },
        },
        {
          label: '地址2',
          prop: 'address2',
          component: 'el-input',
          md: 8,
          xl: 6,
        },
        {
          label: '地址3',
          prop: 'address3',
          component: 'el-input',
          md: 8,
          xl: 6,
        },
        {
          label: '地址4',
          prop: 'address4',
          component: 'el-input',
          md: 8,
          xl: 6,
        },
        {
          label: '地址5',
          prop: 'address5',
          component: 'el-input',
          md: 8,
          xl: 6,
        },
        {
          label: '地址6',
          prop: 'address6',
          component: 'el-input',
          md: 8,
          xl: 6,
        },
        {
          label: '地址7',
          prop: 'address7',
          component: 'el-input',
          md: 8,
          xl: 18,
        },
        {
          label: '地址8',
          prop: 'address8',
          component: 'el-input',
        },
        {
          label: '地址9',
          prop: 'address9',
          component: 'el-input',
        },
        {
          label: '地址10',
          prop: 'address10',
          component: 'el-input',
        },
        {
          label: '地址11',
          prop: 'address11',
          component: 'el-input',
        },
        {
          label: '地址12',
          prop: 'address12',
          component: 'el-input',
        },
        {
          label: '地址13',
          prop: 'address13',
          component: 'el-input',
        },
        {
          label: '地址14',
          prop: 'address14',
          component: 'el-input',
        },
        {
          label: '地址15',
          prop: 'address15',
          component: 'el-input',
        },
        {
          label: '地址16',
          prop: 'address16',
          component: 'el-input',
        },
      ];
      const submit = (done, isValid, invalidFields) => {
        console.log(JSON.stringify(form.value), isValid, invalidFields);
        setTimeout(() => {
          done();
        }, 1000);
      };
      return {
        form,
        elRef,
        show,
        doOpen,
        doShow,
        fields,
        submit,
      };
    },
  };
</script>
```

:::

## Props

| Name               | Description                            | Type    | Options | Default |
| :----------------- | :------------------------------------- | :------ | :------ | :------ |
| v-model            | 表单值                                 | object  | -       | -       |
| v-mode:visibled    | 显示窗口                               | boolean | -       | false   |
| form-props         | 请参考 [NForm](./form.md#props) 属性   | object  | -       | -       |
| dialog-props       | 请参考 [NTable](./table.md#Props) 属性 | object  | -       | -       |
| submit-on-validate | 校验不通过的时候不触发提交事件         | boolean | -       | true    |
| close-reset        | 关闭弹窗重置表单                       | boolean | -       | true    |

::: tip 提示

支持[Form 属性](./form.md#props) 和 [Dialog 属性](./dialog.md#props)

:::

## Events

| Name | Description | Parameters |
| --- | --- | --- |
| submit | submit 被点击后触发，使用`done()`函数来关闭`loading`状态 | done, isValid, invalidFields |
| reset | reset 按钮被点击后触发 | - |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值, isValid, invalidFields |
| cancel | 点击关闭按钮事件 | - |
| close | Dialog 关闭的回调 | - |
| closed | Dialog 关闭动画结束时的回调 | - |
| open | Dialog 打开的回调 | - |
| opened | Dialog 打开动画结束时的回调 | - |

## Methods

| Name | Description | Parameters |
| --- | --- | --- |
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |
| validateField | 对部分表单字段进行校验的方法 | Function(props: array \| string, callback: Function(errorMessage: string)) |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | - |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string) |

## Slots

| name          | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| -             | 按钮节点之前的内容                                               |
| form-before   | 字段开始之前的内容                                               |
| form-after    | 按钮节点之后的内容                                               |
| action-before | 在关闭按钮之前的内容                                             |
| action-after  | 在关闭按钮之后的内容         |
| [prop]        | 当前这项的 Form Item 的内容，参数为`{ item, value, setValue }`   |
| [prop]-label  | 当前这项的标签文本的内容，参数为 `{ item }`                      |
| [prop]-error  | 当前这项的自定义表单校验信息的显示方式，参数为 `{ error, item }` |
| title         | 自定义弹窗标题                                                   |

::: tip 提示

- [prop] 为 fields 中定义的 prop

- `Dialog` 组件插槽除了`title`以外其它无效

:::
