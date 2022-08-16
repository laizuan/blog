# 组件库常见问题

## 字符串函数

传入函数的 body 字符串将它解析成函数。需要注意的是文档上有标注支持**字符串函数**的字眼才有效。比如[NTable#columns Props 中的 render 属性](../components/table.html#columns-props)

::: tip 语法

1. 它只需要大括号里面的内容
   ```js
   {
     console.log(1);
   }
   ```
2. 关于 body 中的参数，在文档中标注传入的传参数都可以使用，仅此而已。不能使用上下文中的其它函数或者定义的变量。

   比如 [NTable#columns Props 中的 render 属性](../components/table.html#columns-props) 中只能使用：`row,h,index ` 3 个参数。

:::

:::tip warning

如果你的表格需要自定义拖动列使用字符串函数的时候不要返回`VNode`对象，也就是不能使用`h`函数否则会出现意想不到的错误。你可以直接返回简单的文字。

:::

示例：

NTable column 属性从后端加载动态渲染表格. 详见标注内容，变量名称需要按钮文档定义的来使用。在字符串 body 里面使用不了任何它之外的其它属性或者时间，比如 `count` 属性

```vue{16,29}
<template>
  <n-table :data="data" :columns="columns"></n-table>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const count = ref(10);
      const columns = ref([
        {
          label: '身高',
          prop: 'heigh',
          render:
            "{
              console.log(count.value) // out put undefined
              const  heigh  = row.heigh;
              if (heigh >= 180) {
                return h('span', { class: 'el-tag' }, heigh);
              } else if (heigh >= 170) {
                return h('span', { class: 'el-tag el-tag--warning' }, heigh);
              }
              else if (heigh >= 160) {
                return h('span', {  class: 'el-tag el-tag--success' }, heigh);
              }
            }",
        },
      ]);
      const data = ref([
        {
          heigh: 160,
        },
        {
          heigh: 170,
        },
        {
          heigh: 180,
        },
      ]);

      return {
        data,
        columns,
      };
    },
  };
</script>
```
