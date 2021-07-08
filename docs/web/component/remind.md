# Remind 提示组件

## Attribute

| 属性          | 说明                                                                                                     | 类型                    | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| label         |     label文字                                                    | String                 | -  |
| tooltip          | 提示语 | String                  | -  |
| placement      | 提示语显示位置，参考`el-tooltip`组件                     | String                 | top-start  |

## Slot

| 名称  | 说明                   |
| ----- | ---------------------- |
| tooltip  | 提示语插槽 |

## Example

::: demo 有些文字显示`undefined`是文档插件的BUG，在实际应用中不存在这个问题
```html
<template>
    <s-remind :label="label" :tooltip="tooltip" />
    <s-remind :label="label" :tooltip="tooltip" placement="left"/>
</template>
<script>
    export default {
        data () {
            return {
              label: '测试',
              tooltip: '这是一个提示'
            }
        },
        methods: {

        }
    }
</script>
```
:::
