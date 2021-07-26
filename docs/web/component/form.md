# Form 表单组件

通过json操作form表单。

## Attribute

- Form

  表单属性，除以下属性外支持Element Form 的全部属性

| 参数               | 说明                                                         | 类型    | 可选值 | 默认值           |
| ------------------ | ------------------------------------------------------------ | ------- | ------ | ---------------- |
| fields             | 配置项                                                       | Array   |        |                  |
| submitOption       | 提交按钮配置项                                               | Object  |        |                  |
| resetOption        | 重置按钮配置项                                               | Object  |        |                  |
| gutter             | 每一项的间距，`el-row`属性                                   | Number  |        | 10               |
| col                | `el-col`配置，支持所有属性。                                 | Object  |        | { md: 8, xl: 6 } |
| action-class       | 按钮区class样式配置，内置了按钮对齐方式`right、center、left` | String  |        | 'right'          |
| showMore           | 是否显示更多，需要配合`limit`使用                            | Boolean |        | false            |
| limit              | 最多显示多少个item项，`showMore=true`的时候有效              | Number  |        | 4                |
| enterExecuteSubmit | 回车执行提交按钮点击事件                                     | Boolean |        | false            |
| firstAutoFocus     | 第一个元素是否自动获取焦点                                   | Boolean |        | true             |

- fields

  字段属性。

| 参数       | 说明                                                         | 类型                         | 可选值                                                       | 默认值    |
| ---------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ | --------- |
| tag        | 组件名称，规则：`el-`开头标识`elementUi`组件。去除`el-`表示拓展组件库中的组件。 | String                       | `el-radio/el-checkbox/el-cascader/el-upload/el-checkbox-group/el-switch` <br /><br /> `input/date/select/switch/tree-select` |           |
| itemAttrs  | `form-item`属性配置，支持全部原生属性。额外属性参考下方表格  | Object                       |                                                              |           |
| attrs      | 元素属性，支持原生所有属性，如果是定制主键支持定制主键独有的属性。[额外属性](#额外属性) | Object                       |                                                              |           |
| name       | 字段名称，支持多级字符串`a.b.c`，最终会得到这个对象`{a:{b:{c:null}}}` | String                       |                                                              |           |
| value      | 字段值                                                       | 查看主键对应支持的绑定值类型 |                                                              |           |
| show       | 是否显示该item                                               | Boolean                      |                                                              | true      |
| ifDisabled | 是否禁用。返回true和false控制。这个有限级高于`disabled`属性 | Function(model) ||                       |
| ifRender   | 动态控制是否显示，返回true和false。**如果`show=false`那么这个属性则无效** | Function(model)              | -                                                            | -         |
| showRemind | 显示label提示语                                              | Boolean                      |                                                              | false     |
| tooltip    | 提示语                                                       | String                       |                                                              | -         |
| placement  | 提示语的显示方向                                             | String                       |                                                              | top-start |
| labelSlot  | 是否自定义label文本内容                                      | Boolean                      |                                                              | false     |
| slot       | 是否自定义`form-item`内容                                    | Boolean                      |                                                              | false     |

- itemAttrs 

  form item 额外属性

| 参数    | 说明                                                         | 类型            | 可选值 | 默认值 |
| ------- | ------------------------------------------------------------ | --------------- | ------ | ------ |
| ifRules | 校验规则，这个函数返回的规则会覆盖掉`form-item`的`rules`规则。该函数需要返回一个数组。 | Function(model) |        |        |

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

## 额外属性

| `tag`元素标签     | 额外属性                               | 说明 |
| ----------------- | -------------------------------------- | ---- |
| el-checkbox-group | `border`：为`true`设置样式未`按钮样式` |      |
| el-radio-group    | `border`：为`true`设置样式未`按钮样式` |      |
|                   |                                        |      |



## Events

| 事件名     | 说明                 | 返回值               |
| ---------- | -------------------- | -------------------- |
| submit     | 点击提交按钮时候触发 | 当前表单的值         |
| reset      | 点重置按钮时候触发   | -                    |
| handleMore | 点击更多按钮是触发   | true 显示，false隐藏 |

## Slot

| 名称                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| item-`fitelds.name`  | 自定义`el-form-item`内容，需要设置`slot=true`。回调`item`值  |
| label-`fitelds.name` | `form-item`标签文本的内容插槽，需要设置`labelSlot=true`它和`itemAttrs.showRemind`互斥。回调`item`值 |
| beforeAction         | 操作按钮，放在默认按钮前面                                   |
| afterAction          | 操作按钮，放在默认按钮后面，如果开启`showMore`则在`showMore`按钮之前 |
| formFooter           | 自定义表单底部区域                                           |
| before               | 自定义表单开始内容                                           |
| after                | 自定义表单结束内容。在操作栏之前                             |

## FAQ

### 使用下拉树

`field`设置。支持`TreeSelect`组件的所有属性

```json
{
          name: 'treeSelect',
          tag: 'tree-select',
          itemAttrs: {
            label: 'TreeSelect'
          },
          attrs: {
            ref: 'TreeSelect', // 设置ref
            selectParams: {
              placeholder: '请输入内容'
            },
            treeParams: {
              clickParent: true,
              filterable: true,
              // 只想要子节点，不需要父节点
              leafOnly: true,
              includeHalfChecked: false,
              'check-strictly': false,
              'default-expand-all': true,
              'expand-on-click-node': false,
              'render-content': this._renderFun, // 自定义渲染方法
              data: [],
              props: {
                children: 'children',
                label: 'name',
                rootId: '0',
                disabled: 'disabled',
                parentId: 'parentId',
                value: 'id'
              }
            }
          }
```

设置`tree`数据

```js
 this.$refs.simpleForm.$refs.TreeSelect.treeDataUpdateFun(data);
```

### 字段分组

- 字段分组示例，更多复杂分组请看示例

如果需要字段分组那么你需要在每一组字段包裹一个对象。这个对象有3个字段。`title`: 显示在页面上的分组名称。`type`: 样式类型，`card`和`title`。请参考`Card`组件属性，支持它的全部属性。`children`这个分组的字段。

```js
{
          type: 'title',
          title: '测试一',
          children: [
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
              name: 'name2',
              tag: 'input',
              itemAttrs: {
                label: '姓名',
                rules: [{ required: true, message: '姓名不能为空' }]
              },
              attrs: {
                placeholder: '请输入姓名'
              }
            }
          ]
        }
```

## Events

## Example

::: demo
```html
<template>
  <div>
    <h2>常规的</h2>
    <s-form
      v-model="formValues1"
      :col="{ md: 8, xl: 6 }"
      :actionCol="{ md: 12, xl: 8 }"
      :fields="fields"
      :submitOption="{ validate: true }"
      @submit="handleSubmit1"
    >
      <template v-slot:item-slot>测试slotItem</template>
      <template v-slot:test="scope"><el-input :value="JSON.stringify(scope)" type="textarea"></el-input></template>
      <template v-slot:beforeAction>
        <el-button>测试按钮一</el-button>
      </template>
      <template v-slot:afterAction>
        <el-button>测试按钮二</el-button>
      </template>
    </s-form>

    <h2>正常分组</h2>
    <s-form
      v-model="formValues2"
      :col="{ md: 8, xl: 6 }"
      :actionCol="{ md: 12, xl: 8 }"
      :fields="fields2"
      :submitOption="{ validate: true }"
      @submit="handleSubmit2"
    >
      <template v-slot:item-slot>测试slotItem</template>
      <template v-slot:test="scope"><el-input :value="JSON.stringify(scope)" type="textarea"></el-input></template>
      <template v-slot:beforeAction>
        <el-button>测试按钮一</el-button>
      </template>
      <template v-slot:afterAction>
        <el-button>测试按钮二</el-button>
      </template>
    </s-form>

    <h2>复杂分组</h2>
    <s-form
      v-model="formValues3"
      :col="{ md: 8, xl: 6 }"
      :actionCol="{ md: 12, xl: 8 }"
      :fields="fieldsByRow"
      :submitOption="{ validate: true }"
      @submit="handleSubmit3"
    >
      <template v-slot:item-slot>测试slotItem</template>
      <template v-slot:test="scope"><el-input :value="JSON.stringify(scope)" type="textarea"></el-input></template>
      <template v-slot:beforeAction>
        <el-button>测试按钮一</el-button>
      </template>
      <template v-slot:afterAction>
        <el-button>测试按钮二</el-button>
      </template>
    </s-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: null,
      fields: [
        {
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
          name: 'test',
          slot: 'test',
          itemAttrs: {
            label: '测试'
          }
        },

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
        },
        {
          name: 'faq',
          tag: 'input',
          showRemind: true,
          tooltip: '测试提示语',
          placement: 'left',
          itemAttrs: {
            label: 'FAQ'
          }
        },

        {
          name: 'checkbox.n.v',
          tag: 'el-checkbox',
          itemAttrs: {
            label: 'CheckBox'
          },
          attrs: {}
        },

        {
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
      ],
      fields2: [
        {
          type: 'title',
          title: '测试一',
          children: [
            {
              name: 'name1',
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
              name: 'name2',
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
              name: 'name3',
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
              name: 'name4',
              tag: 'input',
              itemAttrs: {
                label: '姓名',
                rules: [{ required: true, message: '姓名不能为空' }]
              },
              attrs: {
                placeholder: '请输入姓名'
              }
            }
          ]
        },
        {
          type: 'title',
          title: '测试二',
          children: [
            {
              name: 'name3',
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
              name: 'name4',
              tag: 'input',
              itemAttrs: {
                label: '姓名',
                rules: [{ required: true, message: '姓名不能为空' }]
              },
              attrs: {
                placeholder: '请输入姓名'
              }
            }
          ]
        }
      ],
      fieldsByRow: [
        {
          name: 'name5',
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
          name: 'name6',
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
          name: 'name7',
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
          type: 'title',
          title: '测试一',
          children: [
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
              name: 'name2',
              tag: 'input',
              itemAttrs: {
                label: '姓名',
                rules: [{ required: true, message: '姓名不能为空' }]
              },
              attrs: {
                placeholder: '请输入姓名'
              }
            }
          ]
        },
        {
          type: 'title',
          title: '测试二',
          children: [
            {
              name: 'name3',
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
              name: 'name4',
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
              name: 'name10',
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
              name: 'name11',
              tag: 'input',
              itemAttrs: {
                label: '姓名',
                rules: [{ required: true, message: '姓名不能为空' }]
              },
              attrs: {
                placeholder: '请输入姓名'
              }
            }
          ]
        },
        {
          name: 'name8',
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
          name: 'name9',
          tag: 'input',
          itemAttrs: {
            label: '姓名',
            rules: [{ required: true, message: '姓名不能为空' }]
          },
          attrs: {
            placeholder: '请输入姓名'
          }
        }
      ],
      formValues1: {},
      formValues2: {},
      formValues3: {}
    };
  },
  created() {},
  methods: {
    handleSubmit1(data) {
      console.log(this.formValues1);
    },
    handleSubmit2(data) {
      console.log(this.formValues2);
    },
    handleSubmit3(data) {
      console.log(this.formValues3);
    }
  }
};
</script>
<style>
.clear {
  margin-top: 20px;
}
</style>
```
:::
