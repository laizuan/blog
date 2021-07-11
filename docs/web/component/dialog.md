# Dialog 弹窗组件

支持`v-model`的`dialog`弹窗组件

## Attribute

| 属性           | 说明                                                         | 类型    | 默认值                                          |
| -------------- | ------------------------------------------------------------ | ------- | ----------------------------------------------- |
| value          | 是否显示，可以使用 v-model 双向绑定数据                      | Boolean | false                                           |
| closeBtnAttr   | 关闭按钮属性配置，支持`el-button`的所有属性。另外添加`show`和`text`属性 | Object  | `{ text: '关闭', show: true }`                  |
| confirmBtnAttr | 确定按钮属性配置，支持`el-button`的所有属性。另外添加`show`和`text`属性 | Object  | `{ text: '确定', show: true, type: 'primary' }` |
| align          | 底部按钮对齐方式。`left/center/right`                        | String  | `right`                                         |
| confirmClose   | 点击却按钮的时候是否关闭弹窗                                 | Boolean | true                                            |

## Events

| 事件名         | 说明                                                         | 返回值                               |
| -------------- | ------------------------------------------------------------ | ------------------------------------ |
| before-close   | 点击右上角关闭按钮回调函数，它会先关闭弹窗在触发回调         | function(done)，done 用于关闭 Dialog |
| handlerClose   | 点击关闭按钮事件，它会先关闭弹窗在触发回调                   | -                                    |
| handlerConfirm | 点击确定按钮事件。如果`confirmClose=true`，那么它会先关闭弹窗在触发回调 | -                                    |

## Slot

注意：原生`footer`插槽已无效

| 名称   | 说明                             |
| ------ | -------------------------------- |
| title  | Dialog 标题区的内容              |
| close  | 自定义显示关闭时的内容           |
| before | 自定义底部内容在（关闭按钮）之前 |
| after  | 自定义底部内容在（确定按钮）之后 |

## Example

::: demo 
```html
<template>
    <el-button @click="doShowDialog()">打开Dialog</el-button>
    <s-dialog align="center" title="测试Dialog" v-model="showDialog">这个一个测试内容</s-dialog>
</template>
<script>
    export default {
        data () {
            return {
                showDialog: false
            }
        },
        methods: {
           doShowDialog() {
      			this.showDialog = true;
    		}
        }
    }
</script>
```
:::
