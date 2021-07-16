# Wrap 主体容器

用于包裹主区域内容

## Attribute

| 属性   | 说明                                       | 类型    | 默认值 |
| ------ | ------------------------------------------ | ------- | ------ |
| footer | 是否显示底部按钮操作区，一般用于编辑页面。 | Boolean | false  |

## Events

| 事件名 | 说明 | 返回值 |
| ------ | ---- | ------ |
|        |      |        |

## Slot

| 名称   | 说明                                                   |
| ------ | ------------------------------------------------------ |
| footer | 自定义底部按钮操作区域。需要`footer`设置成`true`才有效 |

## Example

::: demo 有些文字显示`undefined`是文档插件的BUG，在实际应用中不存在这个问题

```html
<template>
    <s-wrap>
   		<h1>这是没有底部按钮的示例</h1>
    </s-wrap>
    <hr />
     <s-wrap footer>
    	<h1>这是有底部按钮的示例</h1>
         <template v-slot:footer>
         	<el-button type="primary">按钮一</el-button>
            <el-button type="danger">按钮二</el-button>
            <el-button type="default">按钮三</el-button>
         </template>
    </s-wrap>
</template>
```

:::
