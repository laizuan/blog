# Input 输入框
继承`el-input`，并新增以下属性


## Attribute

| 属性          | 说明                                                                                                     | 类型                    | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| upperCase         |     是否输入的时候字母转大写                                                    | Boolean                 | false  |
| lowerCase          | 是否输入的时候字母转小写                  | Boolean  | false |
| trim  | 是否去除左右空格                     | Boolean                 | true  |
| trimAll | 是否去除所有空格，只有`trim=true`的时候有效 | Boolean | false |
| clearable      | 是否显示清除文本图标                     | Boolean                 | true |

## Example

::: demo
```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <s-input lowerCase v-model="input" placeholder="输入大写会转小写" />
    </el-col>
    <el-col :span="12">
        <s-input upperCase v-model="input" placeholder="输入小写会转大写" />
     </el-col>
    </el-row>
</template>
<script>
    export default {
        data () {
            return {
              input: null
            }
        }
    }
</script>
```
:::
