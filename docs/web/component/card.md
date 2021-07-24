# Card 卡片



## Attribute

| 属性   | 说明           | 类型    | 默认值 |
| ------ | -------------- | ------- | ------ |
| title  | 标题名称       | String  | -      |
| card   | 是否卡片模式   | Boolean | true   |
| border | 是否显示border | Boolean | false  |

## Events

| 事件名 | 说明 | 返回值 |
| ------ | ---- | ------ |
|        |      |        |

## Slot

| 名称   | 说明                                  |
| ------ | ------------------------------------- |
| left   | 自定义头部左边内容，在`title`文字之后 |
| right  | 自定义头部右边内容                    |
| footer | 自定义底部内容                        |

## Example

::: demo 

```html
<template>
     <h1>
        title模式
    </h1>
    <s-card title="测试" :card="false">
      <h1>1</h1>
      <h1>11</h1>
      <h1>111</h1>
      <h1>1111</h1>
      <h1>11111</h1>
      <h1>111111</h1>
    </s-card>
    
    <hr />
    <h1>
        卡片模式
    </h1>
	<s-card title="测试" border>
      <h1>1</h1>
      <h1>11</h1>
      <h1>111</h1>
      <h1>1111</h1>
      <h1>11111</h1>
      <h1>111111</h1>

      <template v-slot:footer>
        <p>222222222222</p>
      </template>
    </s-card>
    
</template>
```

:::