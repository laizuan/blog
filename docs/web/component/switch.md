# Switch 组件

基于`iviewui`[Switch](https://www.iviewui.com/components/switch)改动

## Attribute

| 属性           | 说明                                                         | 类型                    | 默认值 |
| -------------- | ------------------------------------------------------------ | ----------------------- | ------ |
| value          | 指定当前是否选中，可以使用 v-model 双向绑定数据              | Boolean                 | false  |
| size           | 开关的尺寸，可选值为`large`、`small`、`default`或者不写。建议开关如果使用了2个汉字的文字，使用 large。 | String                  | large  |
| disabled       | 禁用开关                                                     | Boolean                 | false  |
| active-value   | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用       | String, Number, Boolean | true   |
| inactive-value | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用   | String, Number, Boolean | false  |
| active-color   | 自定义打开时的背景色                                         | String                  | -      |
| inactive-color | 自定义关闭时的背景色                                         | String                  | -      |
| before-change  | 返回 Promise 可以阻止切换                                    | Function                | -      |
| loading        | 加载中的开关                                                 | Boolean                 | false  |
| active-text    | 选中时显示的文字                                             | String                  | 开启   |
| inactive-text  | 没有选中时显示的文字                                         | String                  | 关闭   |

## Events

| 事件名 | 说明                           | 返回值        |
| ------ | ------------------------------ | ------------- |
| change | 开关变化时触发，返回当前的状态 | true \| false |

## Slot

| 名称  | 说明                   |
| ----- | ---------------------- |
| open  | 自定义显示打开时的内容 |
| close | 自定义显示关闭时的内容 |

## Example

::: demo 有些文字显示`undefined`是文档插件的BUG，在实际应用中不存在这个问题
```html
<template>
    <s-switch v-model="switch1" @change="change" :before-change="handleBeforeChange"/>
</template>
<script>
    export default {
        data () {
            return {
                switch1: false
            }
        },
        methods: {
          handleBeforeChange () {
                return this.$confirm( '您确认要切换开关状态吗？', '切换确认');
            },
            change (status) {
               console.log(status)
            }
        }
    }
</script>
```
:::
