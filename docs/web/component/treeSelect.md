# TreeSelect

下拉选择树。[源项目地址](https://github.com/ayiaq1/el-tree-select)

## Attribute

| 属性             | 说明                                                         | 类型                          | 默认值                                                       |
| :--------------- | :----------------------------------------------------------- | :---------------------------- | :----------------------------------------------------------- |
| value            | v-model,存储的是treeParams.data里面的id                      | `String` / `Array` / `Number` | `''`                                                         |
| styles           | el-select样式                                                | `Object`                      | {}                                                           |
| localSearch      | 是否开启本地搜索                                             | Boolean                       | true                                                         |
| selectClass      | 下拉框 挂类                                                  | `String`                      | -                                                            |
| popoverClass     | popover 挂类                                                 | `String`                      | -                                                            |
| disabled         | 是否禁用文本框                                               | `Boolean`                     | false                                                        |
| placement        | 弹出框位置                                                   | `String`                      | bottom                                                       |
| treeRenderFun    | 树渲染方法，具体参考el-tree Function(h, { node, data, store }) {} | `Function`                    | -                                                            |
| filterNodeMethod | 搜索过滤方法，具体参考el-tree Function(h, { value, data, node }) {} | `Function`                    | -                                                            |
| selectParams     | 文本框参数，几乎支持el-select所有的API。取消参数： 设定下拉框的弹出框隐藏： `:popper-append-to-body="false"`。 搜索从弹出框里面执行： `filterable="false"` | `Object`                      | Object默认参数：  是否可以清空选项： `clearable: true,`  是否禁用： `disabled: false,`  搜索框placeholder文字： `placeholder: '请选择',` |
| treeParams       | 下拉树参数，几乎支持`el-tree`所有的API。取消参数: `:show-checkbox="selectParams.multiple"` 使用下拉框参数multiple判断是否对树进行多选。取消对`el-tree`的人为传参show-checkbox `:node-key="propsValue"` 自动获取treeParams.props.value。 `:draggable="false"` 屏蔽拖动 | `Object`                      | 参考下方`treeParams `属性列表                                |

- selectParams`el-select`额外属性

| 属性        | 说明                  | 类型    | 默认值 |
| :---------- | :-------------------- | :------ | :----- |
| clearable   | 是否可以清空选项      | Boolean | true   |
| disabled    | 是否禁用              | Boolean | false  |
| placeholder | 搜索框placeholder文字 | String  | 请选择 |

- treeParams `el-tree`额外属性

| 属性               | 说明                                                         | 类型    | 默认值                                                       |
| :----------------- | :----------------------------------------------------------- | :------ | :----------------------------------------------------------- |
| clickParent        | 在有子级的情况下是否点击父级关闭弹出框,false 只能点击子级关闭弹出框 | Boolean | false                                                        |
| filterable         | 是否显示搜索框                                               | Boolean | false                                                        |
| leafOnly           | 是否只是叶子节点。*false: 只想要子节点，不需要父节点*        | Boolean | false                                                        |
| includeHalfChecked | 是否包含半选节点                                             | Boolean | false                                                        |
| data               | 下拉树的数据                                                 | Array   | []                                                           |
| props              | 下拉树的props                                                | Object  | `props: {` `children: 'children',` `label: 'name',` `value: 'id',` `disabled: 'disabled'` `}` |

## Events

| 事件名       | 说明                                                         | 返回值 |
| :----------- | :----------------------------------------------------------- | :----- |
| searchFun    | 对外抛出搜索方法。自行判断是走后台查询，还是前端过滤 前端过滤：`this.$refs.treeSelect.$refs.tree.filter(value);` 后台查询：`this.$refs.treeSelect.treeDataUpdateFun(data);`。如果配置`localSearch=true`自身会先做一次过滤。 | -      |
| node-click   | 点击节点，对外抛出 `data, node, vm` `data:` 当前点击的节点数据 `node:` 当前点击的node `vm:` 当前组件的vm | -      |
| check        | 点击复选框，对外抛出 `data, node, vm` `data:` 当前点击的节点数据 `node:` 当前点击的node `vm:` 当前组件的vm | -      |
| removeTag    | -                                                            | -      |
| input        | 下拉框清空，对外抛出``this.$emit('input', multiple ? [] : '');` | -      |
| select-clear | 下拉框清空，对外抛出``this.$emit('select-clear');`           | -      |

## Methods

| 方法名称          | 说明           | 参数   |
| :---------------- | :------------- | :----- |
| treeDataUpdateFun | 树列表更新数据 | Array  |
| filterFun         | 本地过滤方法   | String |

## Example

::: demo 有些文字显示`undefined`是文档插件的BUG，在实际应用中不存在这个问题

```html
<template>
<s-wrap>
  <s-tree-select
    popoverClass="test-class-wrap"
    v-model="values"
    :styles="styles"
    :selectParams="selectParams"
    :treeParams="treeParams"
    :filterNodeMethod="_filterFun"
    ref="treeSelect"
    :treeRenderFun="_renderFun"
    @searchFun="_searchFun"
  ></s-tree-select>    
</s-wrap>
</template>
<script>
export default {
  name: 'treeSelect',
  props: {
    params: Object,
    isSingle: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {},
  data() {
    return {
      styles: {
        width: '300px'
      },
      // 单选value为字符串，多选为数组
      values: [],
      selectParams: {
        clearable: true,
        placeholder: '请输入内容'
      },
      treeParams: {
        clickParent: true,
        filterable: true,
        // 只想要子节点，不需要父节点
        leafOnly: true,
        includeHalfChecked: false,
        'check-strictly': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'render-content': this._renderFun,
        data: [],
        props: {
          children: 'children',
          label: 'name',
          rootId: '0',
          disabled: 'disabled',
          parentId: 'parentId',
          value: 'id'
        }
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    // 手动更新树数据
    let data = []
    const { label, children, parentId, value, rootId } = this.treeParams.props
    for (let i = 0; i < 5; i++) {
      let rootNode = {
        [label]: `节点：${i}`,
        [parentId]: rootId,
        [value]: i,
        [children]: []
      }
      for (let a = 0; a < 5; a++) {
        let subId = `${rootNode[value]}_${a}`
        let subNode = {
          [label]: `子节点：${subId}`,
          [parentId]: rootNode[value],
          [value]: subId,
          [children]: []
        }
        for (let b = 0; b < 5; b++) {
          let endId = `${subId}_${b}`
          let endNode = {
            [label]: `末级节点：${endId}`,
            [parentId]: subNode[value],
            [value]: endId,
            [children]: []
          }
          subNode[children].push(endNode)
        }
        rootNode[children].push(subNode)
      }
      data.push(rootNode)
    }
    this.$nextTick(() => {
      this.$refs.treeSelect.treeDataUpdateFun(data)
    })
  },
  methods: {
    _filterFun(value, data, node) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 树点击
    _nodeClickFun(data, node, vm) {
      console.log('this _nodeClickFun', this.values, data, node)
    },
    // 树过滤
    _searchFun(value) {
      console.log(value, '<--_searchFun')
      // 自行判断 是走后台查询，还是前端过滤
      this.$refs.treeSelect.filterFun(value)
      // 后台查询
      // this.$refs.treeSelect.treeDataUpdateFun(treeData);
    },
    // 自定义render
    _renderFun(h, { node, data, store }) {
      const { props, clickParent } = this.treeParams
      return (
        <span
          class={[
            'custom-tree-node',
            !clickParent && data[props.children] && data[props.children].length ? 'disabled' : null
          ]}
        >
          <span>{node.label}</span>
        </span>
      )
    }
  }
}
</script>
<style lang="scss">
.disabled {
  cursor: no-drop;
}
.custom-tree-node {
  width: calc(100% - 40px);
}
</style>
```

:::
