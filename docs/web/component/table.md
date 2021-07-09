# Table 组件

## Attribute

- Table 属性

| 属性          | 说明                                                                                                     | 类型                    | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| border              | 表格边框                                                     | Boolean  | true                                      |
| size                | 表格尺寸                                                     | String   | mini                                      |
| sourceData          | 表格数据                                                     | Array    | -                                         |
| rowBtnLimit         | 数据行操作按钮最多显示多少个按钮，多余的放到`更多`下拉按钮中。0 全部显示不放`更多`里面 | Number   | 0                                         |
| columns             | 列配置，见下方`Column属性`。支持`.sync`                         | Array    | -                                         |
| loading             | 是否显示加载中                                               | Boolean  | false                                     |
| showSelect          | 是否可选择行                                                 | Boolean  | false                                     |
| showIndex           | 是否显示行号                                                 | Boolean  | true                                      |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip。如果`Column属性`配置了这个属性则以`Column属性`的为准 | Boolean  | true                                      |
| rowButtons          | 数据行按钮配置，见下方`RowButton属性`                        | Array    | -                                         |
| actionAttr          | 操作列配置，见下方`ActionAttr属性`                           | Object   | -                                         |
| dropdownAttr        | 更多操作按钮下拉属性配置，见下方`DropdownAttr属性`           | Object   | -                                         |
| hideOnSinglePage    | 只有一页时是否隐藏分页                                       | Boolean  | true                                      |
| pageSize            | 每页显示条数，如果设置该属性会覆盖全局的配置                 | Number   | 20                                        |
| total               | 总条数                                                       | Number   | 20                                        |
| showPagination      | 是否显示分页                                                 | Boolean  | true                                      |
| layout              | 组件布局，子组件名用逗号分隔                                 | String   | `total, sizes, prev, pager, next, jumper` |
| pageSizes           | 每页显示个数选择器的选项设置，设置了该属性则该属性优先级最高。没设置该属性则取全局设置，没有全局设置则使用默认值 | Number[] | [10, 20, 50, 100, 150]                    |
| showColumnConfig    | 是否显示列配置 | Boolean  | false                                     |
| showRefreshBtn      | 是否显示刷新按钮                                             | Boolean  | true                                      |

- Column属性

| 属性         | 说明                                                         | 类型                        | 默认值  |
| ------------ | ------------------------------------------------------------ | --------------------------- | ------- |
| render       | 自定义渲染函数，请参考官网[渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)。它的优先级高于`slot`属性。如果是服务的报关自定义列的内容，该函数无效 | Function(h, { row, index }) | -       |
| slot         | 是否对该列做自定义列插槽，参数请见`Slot`文档                 | Boolean                     | false   |
| show         | 是否显示该列                                                 | Boolean                     | true    |
| enumDescName | 枚举label字段名称                                            | String                      | desc    |
| tagTypeName  | 枚举状态类型字段名称。值内容参考`Tag`组件                    | String                      | tagType |
| timeFormat   | 格式化日期                                                   |                             |         |

- RowButton属性

  表格数据行操作按钮，支持`el-button`所有属性

| 属性     | 说明                                                         | 类型                 | 默认值  |
| -------- | ------------------------------------------------------------ | -------------------- | ------- |
| show     | 是否显示该按钮                                               | Boolean              | true    |
| type     | 按钮类型`primary / success / warning / danger / info / text` | String               | text    |
| color    | 按钮文字颜色，仅`type=text`的时候有效。可选`primary / success / warning / danger / default` | String               | default |
| size     | 按钮尺寸                                                     | String               | mini    |
| ifRender | 动态控制是否显示，需要返回true和false。返回true显示该按钮。如果配置了`show`属性那么它的优先级高于该属性。也就是说`show=false`的时候不会执行该函数 | Function(row, index) | -       |
| text     | 按钮文字                                                     | String               | -       |
| click    | 点击事件                                                     | Function(row, index) | -       |

- ActionAttr属性

  操作列属性配置，如果`rowButtons`数组长度是0，那么不显示该列

| 属性         | 说明                                             | 类型   | 默认值 |
| ------------ | ------------------------------------------------ | ------ | ------ |
| label        | 列说明                                           | String | 操作   |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | center |

- DropdownAttr属性

  支持`el-dropdown`所有属性

| 属性 | 说明     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| text | 按钮文字 | String | 更多   |

## Slot

| 名称  | 说明                   |
| ----- | ---------------------- |
| header-`${column.prop}` | 自定义列头内容，`${column.prop}`列为字段名称。没有回调参数   |
| colunm-`${column.prop}` | 自定义列字段内容，`${column.prop}`列为字段名称。返回row和index参数 |
| footer | 表格底部（和分页区平行）自定义内容 |

## Events

支持element官方table所有的事件

| 事件名称             | 说明                     | 回调参数 |
| :------------------- | :----------------------- | :------- |
| handlerSizeChange    | pageSize 改变时会触发    | 每页条数 |
| handlerCurrentChange | currentPage 改变时会触发 | 当前页   |
| handleColumnConfig   | 点击列配置回调           | -        |
| handleRefresh        | 点击刷新按钮             | -        |
| handelSaveColumns    | 保存自定义列回调         | columns  |



## Example

::: demo 
```html
<template>
  <div>
    <s-table
      :source-data="tableData"
      :columns.sync="columns"
      :total="total"
      :pageSize="10"
      :rowBtnLimit="rowBtnLimit"
      :actionAttr="actionAttr"
      :rowButtons="rowButtons"
      :page-request="listQuery"
      showColumnConfig
      :loading="loading"
      @sort-change="doSort"
      @handelSaveColumns="doSaveColumns"
      @handlerCurrentChange="doChangePage"
      @handlerSizeChange="doSizeChange"
    >
      <template v-slot:header-pageviews><el-tag>阅读量</el-tag></template>

      <template v-slot:colunm-author="scope">
        <el-tag>{{ scope.row.author }}</el-tag>
      </template>
    </s-table>
  </div>
</template>
<script>
export default {
  name: 'TableExample1',
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      rowBtnLimit: 2,
      actionAttr: {
        width: '180px'
      },
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
 
  methods: {
    /**
     * 点击排序回调
     */
    doSort(column) {
      console.log(column);
    },
    /**
     * 改变页面回调
     */
    doChangePage(page) {
      console.log('===========> ', page);
    },
    doSizeChange(v) {
      console.log('--------------> ', v);
    },
    doSaveColumns(list) {
      console.log('+++++++++++++++>', list);
    },
    /**
     * 加载列表数据
     */
    listQuery() {
      //request({
    //    url: '/table/dataList',
    //    method: 'post'
   //   }).then(res => {
    //    console.log(res);
    //    this.tableData = res.list;
    //    this.total = res.total;
     // });
    }
  },
     created() {
    //this.listQuery();
      setTimeout(() => {
          const res = {
  "total": 100,
  "list": [
    {
      "id": 1,
      "timestamp": 1408049795876,
      "author": "石艳",
      "reviewer": "汪静",
      "title": "采无构物相成还影对酸",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 45.36,
      "importance": 2,
      "type": "EU",
      "status": 3,
      "display_time": "1985-04-25",
      "pageviews": 1157,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 2,
      "timestamp": 63215017374,
      "author": "魏超",
      "reviewer": "范洋",
      "title": "却音全改况叫建发联克你产级却",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 26.62,
      "importance": 3,
      "type": "US",
      "status": 3,
      "display_time": "1971-11-04",
      "pageviews": 1381,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 3,
      "timestamp": 1363456387474,
      "author": "阎桂英",
      "reviewer": "汤敏",
      "title": "来花亲易属长特信铁改料队西称物置压马力术反走示飞如包片见外",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 66.16,
      "importance": 2,
      "type": "CN",
      "status": 2,
      "display_time": "2000-12-02",
      "pageviews": 4677,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 4,
      "timestamp": 83512818120,
      "author": "石勇",
      "reviewer": "邱洋",
      "title": "外县听如气党解当",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 7.72,
      "importance": 1,
      "type": "JP",
      "status": 2,
      "display_time": "1979-03-04",
      "pageviews": 2582,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 5,
      "timestamp": 863675990406,
      "author": "黄丽",
      "reviewer": "康勇",
      "title": "内美便么民组西把圆过或整参如其质",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 59.54,
      "importance": 2,
      "type": "JP",
      "status": 3,
      "display_time": "2008-11-08",
      "pageviews": 1872,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 6,
      "timestamp": 1398390853911,
      "author": "唐刚",
      "reviewer": "白芳",
      "title": "算多过石图始她何际现内",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 73.49,
      "importance": 2,
      "type": "JP",
      "status": 3,
      "display_time": "2005-07-19",
      "pageviews": 1515,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 7,
      "timestamp": 473915352904,
      "author": "苏艳",
      "reviewer": "郑杰",
      "title": "十国根战斯步路七与打小总所",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 37.86,
      "importance": 2,
      "type": "US",
      "status": 1,
      "display_time": "1994-09-09",
      "pageviews": 4554,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 8,
      "timestamp": 928834038327,
      "author": "汤强",
      "reviewer": "谭娜",
      "title": "果物中例报提起光响重更例指安却山委几和",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 73.44,
      "importance": 2,
      "type": "US",
      "status": 1,
      "display_time": "1970-07-09",
      "pageviews": 3898,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 9,
      "timestamp": 1093502912207,
      "author": "罗桂英",
      "reviewer": "尹涛",
      "title": "整新难确力查计方心",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 27.16,
      "importance": 1,
      "type": "US",
      "status": 1,
      "display_time": "1987-10-26",
      "pageviews": 4970,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    },
    {
      "id": 10,
      "timestamp": 489565585524,
      "author": "邹军",
      "reviewer": "杨丽",
      "title": "位育现声到方府力化把转从常想规团",
      "content_short": "mock data",
      "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
      "forecast": 10.99,
      "importance": 2,
      "type": "EU",
      "status": 1,
      "display_time": "1978-10-23",
      "pageviews": 3121,
      "image_uri": "http://dummyimage.com/200x100/50B347/FFF.png&text=IMG"
    }
  ]
}
            this.tableData = res.list;
        this.total = res.total;
      }, 2000)
  },
};
</script>
```
:::
