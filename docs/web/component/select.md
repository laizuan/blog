# Select 组件

增强组件，支持从后台字典表获取下拉数据。并且可以根据多维度下拉搜索。优化数据大的时候卡顿问题。**注意：该组件依赖`fush.js`并且版本必须是`3.6.1`**

- 依赖
```sh
"fuse.js": "3.6.1"
```

## Attribute

支持原生所有属性和以下属性

| 属性         | 说明                                                         | 类型                      | 默认值             |
| ------------ | ------------------------------------------------------------ | ------------------------- | ------------------ |
| labelName    | label字段名称                                                | String                    | desc               |
| valueName    | value字段值，不能重复。                                      | String                    | value              |
| displayField | 下拉选项显示的label字段数组，按数组顺序显示。                | Array                     | ['value', 'desc']  |
| searchKeys   | 可搜索字段                                                   | Array                     | ['value', 'desc']  |
| value        | 绑定值                                                       | boolean / string / number | -                  |
| defaultValue | 默认值                                                       | string / number           | -                  |
| options      | 静态下拉数据项                                               | Array                     | -                  |
| clearable    | 是否可以清空选项                                             | boolean                   | true               |
| filterable   | 是否可搜索                                                   | boolean                   | true               |
| styles       | class 样式                                                   | String                    | -                  |
| maxRow       | 最大渲染行数，如果数据量太多会导致页面卡顿                   | Number                    | 50                 |
| onlyLabel    | 只显示 label，为false的时候会显示`displayField`数组中的内容  | Boolean                   | false              |
| url          | 请求下拉数据的后端接口地址                                   | String                    | /sysDict/getByType |
| params       | 请求后端接口参数                                             | Object                    | -                  |
| method       | 请求后端接口方式类型。`get || post`                          | String                    | get                |
| noCache      | 不缓存结果请求接口数据缓存                                   | Boolean                   | false              |
| cacheType    | 缓存类型， session，local。仅在`noCache=false`的时候有效     | String                    | session            |
| cachePrefix  | 缓存前缀，缓存数据表的形式缓存，这个值就相当于一张表的`表名`，`params`参数对象的值通过`_`拼接成表中的行数据`key` | String                    | `_dict_`           |
| cacheExpires | 缓存过期时间，默认：0不过期                                  | Number                    | 0                  |

## Events

| 事件名 | 说明                       | 返回值                   |
| ------ | -------------------------- | ------------------------ |
| change | 用户选择后数据后的回调函数 | (目前选中的值，下拉数据) |

## Slot

| 名称   | 说明                      |
| ------ | ------------------------- |
| option | 自定义下拉项显示内容。    |
| prefix | Select 组件头部内容       |
| append | Select 组件后面追加的内容 |

## Example

::: demo 演示二需要请求接口，所有文档示例无效
```html
<template>
  <div>
    <el-form label-width="100px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="常规">
            <s-select v-model="select1" :options="options"></s-select>
            {{ select1 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="远程加载数据">
            <s-select
              v-model="select3"
              labelName="label"
              valueName="val"
              url="/sysDict/getListByType"
              method="post"
              @change="doChange"
              :params="{ type: 'mf_pack' }"
              :displayField="['val', 'label', 'value2']"
              :searchKeys="['val', 'value2']"
            ></s-select>
            {{ select3 }}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="带插槽的">
            <s-select v-model="select2" :options="options">
              <template v-slot:option="scope">{{ scope }}</template>
              <template v-slot:prefix>prefix</template>
              <template v-slot:append>append-{{ select2 }}</template>
            </s-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      select2: null,
      select1: null,
      select3: 'JP',
      options2: [],
      options: [
        { desc: '纸箱板', value: 'CT', value2: '', value3: 'S', value4: '' },
        { desc: '托盘', value: 'PE', value2: '', value3: '', value4: '' },
        { desc: '包', value: 'PK', value2: '', value3: '', value4: '' },
        { desc: '薄膜包装', value: 'FP', value2: '', value3: 'D', value4: '' },
        { desc: '散装', value: 'BU', value2: '', value3: 'W', value4: '' },
        { desc: '筐', value: 'BK', value2: '', value3: 'A', value4: '' },
        { desc: '编织袋', value: 'WG', value2: '', value3: '', value4: '' },
        { desc: '捆扎', value: 'BE', value2: '', value3: '', value4: '' }
      ]
    };
  },
  created() {
    setTimeout(() => {
      this.select3 = 'KR';
    }, 1000);
  },
  methods: {
    doChange(i, v) {
      console.log(i, '====', v);
    }
  }
};
</script>
```
:::
