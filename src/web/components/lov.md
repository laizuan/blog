---
title: Lov
meta:
  - name: description
    content: 弹出选择输入框
---

# Lov

大数据值集取值表单控件，弹出选择输入框。

:::demo

```vue
<template>
  <n-card title="基础使用">
    <n-lov
      v-model="inputVal"
      v-model:queryForm="queryForm"
      title="弹窗选择"
      :form-props="{ fields }"
      :table-props="{ columns, data }"
      value-key="name"
      @query="doQuery"
    ></n-lov>
    {{ inputVal }}
    {{ queryForm }}
  </n-card>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const inputVal = ref()
    const queryForm = ref({})
    const doQuery = (done) => {
      setTimeout(() => {
        done()
      }, 2000)
    }
    const fields = ref([
      {
        md: 8,
        xl: 6,
        label: '地址',
        prop: 'address',
        component: 'n-input'
      },
      {
        label: '名字',
        prop: 'name.value',
        component: 'n-select',
        md: 8,
        xl: 6,
        props: {
          data: [
            { value: '1', desc: '测试' },
            { value: '2', desc: '测试二' },
            { value: '3', desc: '测试三' }
          ]
        }
      },
      {
        md: 8,
        xl: 6,
        label: '年龄',
        prop: 'age',
        component: 'n-input'
      },
      {
        md: 8,
        xl: 6,
        label: '身高',
        prop: 'height',
        component: 'n-input'
      }
    ])

    const columns = ref([
      {
        label: '日期',
        prop: 'date'
      },
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '地址',
        prop: 'address'
      }
    ])

    const data = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    return {
      data,
      columns,
      fields,
      doQuery,
      queryForm,
      inputVal
    }
  }
}
</script>
```

:::

## Props

| Name              | Description                            | Type          | Options | Default |
| :---------------- | :------------------------------------- | :------------ | :------ | :------ |
| v-model           | 输入框的值                             | string/number | -       | -       |
| v-model:queryForm | 查询表单值                             | object        | -       | -       |
| form-props        | 请参考 [NForm](./form.md#props) 属性   | object        | -       | -       |
| table-props       | 请参考 [NTable](./table.md#props) 属性 | object        | -       | -       |
| title             | 窗口标题                               | string        | -       | -       |
| db-click-show     | 双击按钮显示弹窗                       | boolean       | -       | true    |
| value-key         | v-model 值在表格行数据的 key           | string        | -       | -       |

**支持[NTableForm 属性](./table-form.md#props) 和 [Dialog 属性](./dialog.md#props)**

## Events

| Name           | Description                                               | Parameters |
| -------------- | --------------------------------------------------------- | ---------- |
| query          | 查询按钮被点击后触发，使用`done()`函数来关闭`loading`状态 | done       |
| reset          | 重置按钮被点击后触发                                      | -          |
| select         | 双击行选中数据或者点确定按钮时候的回调                    | row        |
| size-change    | 页数改变                                                  | size       |
| current-change | 页码改变                                                  | size       |
| open           | 打开弹窗                                                  | -          |
| close          | 关闭弹窗                                                  | -          |
