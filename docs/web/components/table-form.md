---
title: TableForm
meta:
  - name: description
    content: 查询列表
---

# TableForm

查询列表

## 使用

::: demo

```vue
<template>
  <n-table-form
    v-model="queryForm"
    :form-props="{ fields: fields }"
    :table-props="{ data: data, columns: columns3, total: total }"
    @submit="doSubmit"
    @save="doSaveColumns"
  >
    <template #address-column="{ row }">
      <strong>{{ row.address }}</strong>
    </template>
  </n-table-form>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const queryForm = ref({})
    const fields = [
      {
        md: 8,
        xl: 6,
        label: '地址',
        prop: 'address',
        component: 'el-input'
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
        component: 'el-input'
      },
      {
        md: 24,
        label: '身高',
        prop: 'height',
        component: 'el-input'
      },
      {
        label: '学历',
        prop: 'education',
        component: 'el-input',
        md: 6
      },
      {
        md: 6,
        label: '学校',
        prop: 'school',
        component: 'el-input'
      },
      {
        md: 6,
        label: '学分',
        prop: 'credit',
        component: 'el-input'
      },
      {
        md: 6,
        label: '特长',
        prop: 'credit',
        component: 'el-input'
      }
    ]

    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(50)
    const columns3 = ref([
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

    const doSaveColumn = (list, done) => {
      console.log('doSaveColumn ===>', list, done)
    }

    const doSubmit = (done) => {
      console.log('doSubmit ===>', done)
      setTimeout(() => {
        done()
      }, 2000)
    }

    const doSaveColumns = (columns, done) => {
      setTimeout(() => {
        columns3.value = columns
        done()
      }, 2000)
    }
    return {
      fields,
      queryForm,
      doSaveColumn,
      currentPage,
      pageSize,
      total,
      data,
      columns3
    }
  }
}
</script>
```

:::

## Props

| Name           | Description                                                                                   | Type    | Options | Default |
| :------------- | :-------------------------------------------------------------------------------------------- | :------ | :------ | :------ |
| v-model        | 表单值                                                                                        | object  | -       | -       |
| form-props     | 请参考 [NForm](./form.md#props) 属性                                                          | object  | -       | -       |
| table-props    | 请参考 [NTable](./table.md#props) 属性                                                        | object  | -       | -       |
| add            | 是否显示 add 按钮                                                                             | boolean | -       | -       |
| add-props      | add 按钮属性                                                                                  | object  | -       | -       |
| enter-query    | 输入框回车是否触发查询事件                                                                    | boolean | -       | true    |
| outside-height | 用户计算表格高度。除开 `ProTableForm` 之外的其它元素高度，设置了表格高度或者设置成 0 则无效， | number  | -       | 0       |

**支持[Form 属性](./form.md#props) 和 [Dialog 属性](./dialog.md#props)**

## Events

| Name           | Description                                                                                                                                                                                 | Parameters                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| query          | 查询按钮被点击后触发，使用`done()`函数来关闭`loading`状态                                                                                                                                   | done, isValid, invalidFields |
| reset          | 重置按钮被点击后触发                                                                                                                                                                        | -                            |
| add            | 新增按钮被点击后触发                                                                                                                                                                        | -                            |
| size-change    | pageSize 改变时会触发                                                                                                                                                                       | 每页条数                     |
| current-change | currentPage 改变时会触发                                                                                                                                                                    | 当前页                       |
| prev-click     | 用户点击上一页按钮改变当前页后触发                                                                                                                                                          | 当前页                       |
| next-click     | 用户点击下一页按钮改变当前页后触发                                                                                                                                                          | 当前页                       |
| save           | 用户点击保存自定义列的时候触发，其中 `done` 函数可以关闭 `loading` 状态和弹窗，如果传入 `false` 只关闭 `loading`，不关闭弹窗。拿到 `columns` 属性之后你需要重置旧的属性值以达到改变列的状态 | `function(columns, done)`    |

## Methods

| Name               | Description                                                                                                     | Parameters                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------------- |
| resetFields        | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                      | -                           |
| clearSelection     | 用于多选表格，清空用户的选择                                                                                    | —                           |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）    | row, selected               |
| toggleAllSelection | 用于多选表格，切换全选和全不选                                                                                  | —                           |
| toggleRowExpansion | 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。         | row, expanded               |
| setCurrentRow      | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。                           | row                         |
| clearSort          | 用于清空排序条件，数据会恢复成未排序的状态                                                                      | —                           |
| clearFilter        | 传入由`columnKey` 组成的数组以清除指定列的过滤条件。 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态 | columnKeys                  |
| doLayout           | 对 Table 进行重新布局。 当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法                             | —                           |
| sort               | 手动对 Table 进行排序。 参数 `prop` 属性指定排序列，`order` 指定排序顺序。                                      | prop: string, order: string |
| doQuery            | 手动触发`query`事件                                                                                             | -                           |

## Slots

| Name          | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| -             | 按钮节点之前的内容                                               |
| form-before   | 字段开始之前的内容                                               |
| form-after    | 按钮节点之后的内容                                               |
| action-before | 在关闭按钮之前的内容                                             |
| action-after  | 在**新增**按钮之后的内容，如果开启更多按钮则在更多按钮前面       |
| [prop]        | 当前这项的 Form Item 的内容，参数为`{ item, value, setValue }`   |
| [prop]-label  | 当前这项的标签文本的内容，参数为 `{ item }`                      |
| [prop]-error  | 当前这项的自定义表单校验信息的显示方式，参数为 `{ error, item }` |
| title         | 自定义弹窗标题                                                   |

::: tip 提示

**`Dialog` 组件插槽除了`title`以外其它无效**

[prop] 为 fields 中定义的 prop

:::

## TypeScript 定义

```ts
export declare const defineTableFormMethod: () => Ref<TableFormExpose>
```
