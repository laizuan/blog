# Form 表单组件

通过json操作form表单。

## Attribute

- Form

  表单属性，除以下属性外支持Element Form 的全部属性

| 参数         | 说明                                            | 类型    | 可选值 | 默认值           |
| ------------ | ----------------------------------------------- | ------- | ------ | ---------------- |
| fields       | 配置项                                          | Array   |        |                  |
| submitOption | 提交按钮配置项                                  | Object  |        |                  |
| resetOption  | 重置按钮配置项                                  | Object  |        |                  |
| gutter       | 每一项的间距，`el-row`属性                      | Number  |        | 10               |
| col          | `el-col`配置，支持所有属性                      | Object  |        | { md: 8, xl: 6 } |
| actionCol    | 按钮区`el-col`配置                              | Object  |        | { md: 8, xl: 6 } |
| showMore     | 是否显示更多，需要配合`limit`使用               | Boolean |        | false            |
| limit        | 最多显示多少个item项，`showMore=true`的时候有效 | Number  |        | 4                |

- fields

  字段属性

| 参数       | 说明                                                         | 类型                         | 可选值                                                       | 默认值    |
| ---------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ | --------- |
| tag        | 组件名称，规则：`el-`开头标识`elementUi`组件。去除`el-`表示拓展组件库中的组件。 | String                       | `el-radio/el-checkbox/el-cascader/el-upload/el-checkbox-group/el-switch` <br /><br /> `input/date/select/switch` |           |
| itemAttrs  | `form-item`属性配置，支持全部原生属性                        | Object                       |                                                              |           |
| attrs      | 元素属性，支持原生所有属性，如果是定制主键支持定制主键独有的属性 | Object                       |                                                              |           |
| name       | 字段名称，支持多级字符串`a.b.c`，最终会得到这个对象`{a:{b:{c:null}}}` | String                       |                                                              |           |
| value      | 字段值                                                       | 查看主键对应支持的绑定值类型 |                                                              |           |
| show       | 是否显示该item                                               | Boolean                      |                                                              | true      |
| ifRender   | 动态控制是否显示，返回true和false                            | Function(model)              | -                                                            | -         |
| showRemind | 显示label提示语                                              | Boolean                      |                                                              | false     |
| tooltip    | 提示语                                                       | String                       |                                                              | -         |
| placement  | 提示语的显示方向                                             | String                       |                                                              | top-start |

- submitOption

  提交按钮属性

| 参数        | 说明                     | 类型    | 可选值                  | 默认值  |
| ----------- | ------------------------ | ------- | ----------------------- | ------- |
| show        | 是否显示该按钮           | Boolean |                         | true    |
| validate    | 点击按钮是否校验表单     | Boolean |                         | false   |
| text        | 按钮名称                 | String  |                         | 提交    |
| type        | 按钮类型                 | String  |                         | primary |
| icon        | 按钮图标                 | String  |                         | -       |
| loading     | 是否显示加载中           | Boolean |                         | false   |
| plain       | 是否朴素按钮             | boolean | —                       | false   |
| round       | 是否圆角按钮             | boolean | —                       | false   |
| circle      | 是否圆形按钮             | boolean | —                       | false   |
| disabled    | 是否禁用状态             | boolean | —                       | false   |
| icon        | 图标类名                 | string  | —                       | —       |
| autofocus   | 是否默认聚焦             | boolean | —                       | false   |
| native-type | 原生 type 属性           | string  | button / submit / reset | button  |
| wait        | 点击后多少毫秒才能继续点 | Number  |                         | 500     |

- resetOption

  重置按钮属性

| 参数          | 说明                                       | 类型    | 可选值                  | 默认值                |
| ------------- | ------------------------------------------ | ------- | ----------------------- | --------------------- |
| show          | 是否显示该按钮                             | Boolean |                         | true                  |
| text          | 按钮名称                                   | String  |                         | 重置                  |
| type          | 按钮类型                                   | String  |                         | info                  |
| icon          | 按钮图标                                   | String  |                         | el-icon-refresh-right |
| executeSubmit | 点击重置按钮是否执行`submitOption`点击事件 | Boolean |                         | false                 |
| plain         | 是否朴素按钮                               | boolean | —                       | false                 |
| round         | 是否圆角按钮                               | boolean | —                       | false                 |
| circle        | 是否圆形按钮                               | boolean | —                       | false                 |
| disabled      | 是否禁用状态                               | boolean | —                       | false                 |
| icon          | 图标类名                                   | string  | —                       | —                     |
| autofocus     | 是否默认聚焦                               | boolean | —                       | false                 |
| native-type   | 原生 type 属性                             | string  | button / submit / reset | button                |

## Events

| 事件名 | 说明                 | 返回值       |
| ------ | -------------------- | ------------ |
| submit | 点击提交按钮时候触发 | 当前表单的值 |
| reset  | 点重置按钮时候触发   | -            |

## Slot

| 名称                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `fields.slot`       | 动态插槽，插槽名称就是自定义的`slot`。会回调当前`Form`表单的值 |
| item-`fitelds.name` | `form-item`标签文本的内容插槽，它和`itemAttrs.showRemind`互斥 |
| beforeAction        | 操作按钮，放在默认按钮前面                                   |
| afterAction         | 操作按钮，放在默认按钮后面，如果开启`showMore`则在`showMore`按钮之前 |

## Example

::: demo 有些文字显示`undefined`是文档插件的BUG，在实际应用中不存在这个问题
```html
<template>
  <s-form
    v-model="formValues"
    :col="{ md: 24, xl: 24 }"
    :actionCol="{ md: 24, xl: 24 }"
    showMore
    :fields="fields"
    :submitOption="{ validate: true }"
    @submit="handleSubmit"
  >
    <template v-slot:item-slot>测试slotItem</template>
    <template v-slot:test="scope">
        <el-input :value="JSON.stringify(scope)" type="textarea"></el-input>
    </template>
    <template v-slot:beforeAction>
      <el-button>测试按钮一</el-button>
    </template>
    <template v-slot:afterAction>
      <el-button>测试按钮二</el-button>
    </template>
  </s-form>
</template>
<script>
export default {
  data() {
    return {
       fields: {
         'select.a.b': {
        name: 'select.a.b',
        tag: 'select',
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
      input: {
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
      age: {
        name: 'age',
        tag: 'input',
        itemAttrs: {
          label: '年龄'
        },
        attrs: {
          placeholder: '请输入年龄'
        }
      },

      test: {
        name: 'test',
        slot: 'test',
        itemAttrs: {
          label: '测试'
        }
      },

      'checkbox-group': {
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
      switch: {
        name: 'switch',
        tag: 'switch',
        itemAttrs: {
          label: '开关'
        }
      },
      faq: {
        name: 'faq',
        tag: 'input',
        showRemind: true,
        tooltip: '测试提示语',
        placement: 'left',
        itemAttrs: {
          label: 'FAQ'
        }
      },
      slot: {
        name: 'slot',
        tag: 'input'
      },
      'checkbox.n.v': {
        name: 'checkbox.n.v',
        tag: 'el-checkbox',
        itemAttrs: {
          label: 'CheckBox'
        },
        attrs: {}
      },

      cloud: {
        name: 'cloud',
        tag: 'el-radio-group',
        itemAttrs: {
          label: '云厂商'
        },
        attrs: {
          options: [
            { label: '阿里云', value: '1' },
            { label: '腾讯云', value: '2' },
            { label: '华为云', value: '3' }
          ]
        }
      }
      },
      formValues: {}
    };
  },
  created() {
    // request({
    //   url: '/getForm/config',
    //   method: 'get'
    // }).then(res => {
    //   const data = res.data;
    //    // 设置字段事件
    //   // data["name"].events.blur = function(e) {
    //   //   console.log(e);
    //   // }
    //   //  data["select.a.b"].events.change = function(e) {
    //   //  console.log(e);
    //   // }

    //   this.fields = data;
    // });
  },
  methods: {
    handleSubmit(data) {
      console.log(data);
    }
  }
}
</script>
```
:::