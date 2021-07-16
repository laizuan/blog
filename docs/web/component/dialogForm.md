# DialogForm 弹窗表单

弹窗嵌套表单，支持`Dialog`和`Form`的属性

## Attribute

| 参数          | 说明                                                         | 类型    | 可选值 | 默认值                                                       |
| ------------- | ------------------------------------------------------------ | ------- | ------ | ------------------------------------------------------------ |
| fields        | 配置项                                                       | Array   |        |                                                              |
| value/v-model | form 表单值对象                                              | Object  |        |                                                              |
| visible       | 是否显示弹窗，这部分和`Diablg`组件不一样，这里不能用`v-model`控制弹窗显示，只能由这个值控制。支持`.sync` | Boolean |        | false                                                        |
| title         | 窗口标题                                                     | String  |        | -                                                            |
| dialogAttr    | 弹窗组件的其它属性                                           | Object  |        | `{ confirmBtnAttr: { show: true, text: '保存', type: 'primary' } }` |
| formAttr      | 表单其它属性。**注意，窗口按钮不是表单组件的按钮，是弹窗组件的按钮。按钮配置在`dialogAttr`中配置** | Object  |        | `{ col: { md: 24, xl: 12 }, submitOption: { show: false }, resetOption: { show: false } }` |

## Events

| 事件名       | 说明                 | 返回值 |
| ------------ | -------------------- | ------ |
| submit       | 点击提交按钮时候触发 | -      |
| handlerClose | 关闭弹窗时候回调     | -      |
|              |                      |        |

## Slot

下面列出的是`Dialog`组件的插槽，原生插槽不再支持。`Form`组件的插槽全部支持

| 名称         | 说明                         |
| ------------ | ---------------------------- |
| footerBefore | 自定义底部关闭按钮之前的内容 |
| footerAfter  | 自定义底部保存按钮之后的内容 |
| title        | 弹窗标题                     |

## Example

::: demo 

```html
<template>
   <el-button @click="doShowDialogForm()">打开DialogForm</el-button>
    <s-dialog-form
      v-model="formValues"
      title="测试DialogForm"
      :fields="fields"
      :dialogAttr="{ 'close-on-click-modal': false }"
      @submit="doSubmit"
      :visible.sync="showDialogForm"
    >
      <template v-slot:title>
        <el-tag>测试DialogForm</el-tag>
      </template>

      <template v-slot:item-test>sdfasdasd</template>
      <template v-slot:footerBefore>
        <el-button>前置按钮</el-button>
      </template>
      <template v-slot:footerAfter>
        <el-button>后置按钮</el-button>
      </template>
    </s-dialog-form>
</template>
<script>
    export default {
        data () {
            return {
 showDialogForm: false,
      fields: [
        {
          name: 'test',
          slot: true,
          itemAttrs: {
            label: '测试Slot'
          }
        },

        {
          name: 'select.a.b',
          tag: 'el-select',
          value: '1',
          itemAttrs: {
            label: 'Select',
            rules: [{ required: true, message: 'select不能为空' }]
          },
          attrs: {
            options: [
              { label: '阿里云', value: '1' },
              { label: '腾讯云', value: '2' },
              { label: '华为云', value: '3' }
            ]
          }
        },
        {
          name: 'name',
          tag: 'input',
          itemAttrs: {
            label: '姓名',
            rules: [{ required: true, message: '姓名不能为空' }]
          },
          attrs: {
            placeholder: '请输入姓名'
          }
        },
        {
          name: 'age',
          tag: 'input',
          itemAttrs: {
            label: '年龄'
          },
          attrs: {
            placeholder: '请输入年龄'
          }
        },
        {
          type: 'title',
          title: '测试一',
          children: [
            {
              name: 'checkboxGroup',
              tag: 'el-checkbox-group',
              itemAttrs: {
                label: 'CheckboxGroup'
              },
              attrs: {
                options: [
                  { label: '阿里云', value: '1' },
                  { label: '腾讯云', value: '2' },
                  { label: '华为云', value: '3' }
                ]
              }
            },
            {
              name: 'switch',
              tag: 'switch',
              itemAttrs: {
                label: '开关'
              }
            }
          ]
        }
      ],
      formValues: {}
            }
        },
       methods: {
    doShowDialogForm() {
      this.showDialogForm = true;
      setTimeout(() => {
        this.formValues = {
          name: '张三',
          age: 23,
          select: {
            a: {
              b: '2'
            }
          }
        };
      }, 2000);
    },
    doSubmit() {
      console.log(this.formValues);
    },
    doShowDialog() {
      this.showDialog = true;
    }
  }
    }
</script>
```

:::