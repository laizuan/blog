# FormTable 列表查询组件
将`form`组件和`table`组合在一起形成一个查询列表页。支持两个组件的所有属性


## Attribute

| 属性          | 说明                                                                                                     | 类型                    | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| value/v-model | 表单值对象，*如果设置查询条件无效的时候请注意对象是否创建的时候包含该属性* | Object | - |
| limit | 搜索条件最多显示几条，和`Form`的配置对齐 | Number | 4 |
| actionCol | 表单按钮`el-col`配置，和`Form`的配置对齐并在这基础上添加class属性 | Object | { md: 8, xl: 6 ,class:'btn-group'} |
| pageSize | 每页显示条数，配置该属性会覆盖全局配置。和`Table`的配置对齐 | Number | 20                                                           |
| url           | 请求列表数据的后端地址，注意：请求类型是`POST`，请求头`application/json`。请求参数就是表单的值。如果是时间范围并且`name=rangeTime`那么请求的时候会分成`startTime`和`endTime`两个字段。并且剔除`rangeTime`属性. | String       | -                                                            |
| fields        | 查询条件配置。和`Form`的配置对齐                             | Array/Object | -                                                            |
| formAttr      | 表单配置。和`Form`的配置对齐                                 | Object       | `{"showMore":true,"limit":3,"resetOption":{"icon":"el-icon-refresh-right"},"submitOption":{"show":true,"text":"查询","icon":"el-icon-search","wait":1000}}` |
| addBtnAttr    | 表单查询新增按钮配置，支持`element button`组件所有属性。`show`和`text`是新增属性，表示是否显示新增按钮和按钮文字 | Object       | `{ show: true, text: '新增', type: 'primary', icon: 'el-icon-plus' }` |
| tableAttr     | table属性配置，和`Table`组件配置对齐                         | Object       | -                                                            |
| sourceData     | 表格数据源，如果没有没配置url或者自定义表格数据的时候该属性必填，和`Table`组件配置对齐                         | Array       | -                                                            |
| actionAttr    | 表格操作列配置，和`Table`组件配置对齐                        | Object       | `{ fixed: 'right' }`                                         |
| rowButtons    | 表格数据行按钮配置，和`Table`组件配置对齐                    | Array        | -                                                            |
| columns       | 表格列配置，和`Table`组件配置对齐                            | Array        | -                                                            |
| initQuery     | 是否创建组件的时候加载表格数据                               | Boolean      | true                                                         |

## Methods

`this.$refs[].doQuery`

| 事件名称 | 说明         | 参数           |
| -------- | ------------ | -------------- |
| doQuery  | 查询事件     |                |
| doReset  | 重置按钮事件 | 参考`Form`组件 |

## Events

支持表单和表格的所有事件，**注意：如果你监听了事件，那么下表的事件将会替代默认的事件行为。**如果事件不起效果，请检查是否覆盖了内置事件。

| 事件名称             | 说明                           | 参数            |
| -------------------- | ------------------------------ | --------------- |
| submit               | 查询事件                       | 参考`Form`组件  |
| reset                | 重置按钮事件                   | 参考`Form`组件  |
| handleRefresh        | 表格刷新按钮点击事件           | 参考`Table`组件 |
| handlerSizeChange    | 表格分页改变每页显示条数的时候 | 参考`Table`组件 |
| handlerCurrentChange | 表格分页改变页数的时候         | 参考`Table`组件 |
| handelSaveColumns    | 保存列配置回调。               | 参考`Table`组件 |
| handleClickAdd       | 点击新增按钮回调               | -               |

## Slot

参考`Form`组件和`Table`组件

## Example

::: demo
```html
<template>
  <div>
    <s-form-table
      :fields="fields"
      url="/table/dataList"
      :rowButtons="rowButtons"
      :columns.sync="columns"
      :tableAttr="{ height: 500, showColumnConfig: true }"
      :actionAttr="{ width: 200 }"
      @handleClickAdd="doAdd"
      showColumnConfig
      :actionCol="{ md: 12 }"
      v-model="formValues"
    >
      <template v-slot:afterAction>
        <el-button>22222</el-button>
      </template>

      <template v-slot:column-author="scope">
        <el-tag>{{ scope.row.author }}</el-tag>
      </template>

      <template v-slot:footer>
        <el-tag>11111111</el-tag>
      </template>
    </s-form-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: null,
      fields: {
        input: {
          name: 'name',
          tag: 'input',
          itemAttrs: {
            label: '姓名'
          },
          attrs: {
            placeholder: '请输入姓名'
          }
        },
        age: {
          name: 'age',
          tag: 'input',
          itemAttrs: {
            label: '年龄'
          },
          attrs: {
            placeholder: '请输入年龄'
          }
        },
        faq: {
          name: 'faq',
          tag: 'input',
          showRemind: true,
          tooltip: '测试提示语',
          placement: 'left',
          itemAttrs: {
            label: 'FAQ'
          }
        },
        switch: {
          name: 'switch',
          tag: 'switch',
          itemAttrs: {
            label: '开关'
          }
        }
      },
      formValues: { age: 120 },
      rowButtons: [
        {
          text: '详情'
        },
        {
          color: 'primary',
          text: '编辑',
          click(row, index) {
            console.log('编辑', row, index);
          }
        },
        {
          color: 'success',
          icon: 'el-icon-position',
          text: '发布',
          click(row, index) {
            console.log('发布', row, index);
          }
        },
        {
          color: 'warning',
          text: '撤回'
        },
        {
          color: 'danger',
          text: '删除'
        }
      ],
      columns: [
        { prop: 'author', label: '作者', slot: true },
        { prop: 'title', label: '标题', width: 500 },
        { prop: 'image_uri', label: '封面' },
        {
          prop: 'pageviews',
          label: '阅读量',
          align: 'right',
          sortable: 'custom'
        },
        {
          prop: 'status',
          label: '当前状态',
          render: (h, { row, index }) => {
            return h(
              'el-tag',
              {
                props: { type: 'success' },
                on: {
                  click() {
                    alert(index);
                  }
                }
              },
              row.status + ' - ' + index
            );
          }
        },
        { prop: 'display_time', label: '发布时间' }
      ]
    };
  },
  created() {
  },
  methods: {
    doAdd(v) {
      console.log('---> add ', this.formValues);
    },
    getFormFields() {
      request({
        url: '/getFormTable/config',
        method: 'get'
      }).then(res => {
        const data = res;
        this.fields = data;
      });
    }
  }
};
</script>
```
:::
