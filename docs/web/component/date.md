# Date 日期选择器

除以下属性外支持Element DatePicker 日期选择器 的全部属性

## Attribute

| 属性              | 说明                                                         | 类型     | 默认值                   |
| ----------------- | ------------------------------------------------------------ | -------- | ------------------------ |
| placeholder       | 非范围选择时的占位内容                                       | string   | 请选择时间               |
| start-placeholder | 范围选择时开始日期的占位内容                                 | string   | 开始时间                 |
| end-placeholder   | 范围选择时结束日期的占位内容                                 | string   | 结束时间                 |
| showFast          | 是否显示快捷操作栏                                           | Boolean  | false                    |
| max               | 最大可选天数, 0表示最大可选到当天, -1 不限制，默认0          | Number   | 0                        |
| min               | 最小可选天数, 0表示不限制                                    | Number   | 0                        |
| type              | 显示类型                                                     | string   | daterange                |
| default-time      | 范围选择时选中日期所使用的当日内具体时刻                     | string[] | ['00:00:00', '23:59:59'] |
| defaultRange      | 默认范围时间，0 不默认。单位天。设置7表示当前时间之前的第7天到现在的时间段。v-model/value 是数组的情况下有效 | Number   | 0                        |

## Events

支持原生所有事件

## Slot

-

## Example

::: demo 样式是文档插件的BUG，在实际应用中不存在这个问题
```html
<template>
  <div>
    <el-form label-width="100px">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="常规">
            <s-date v-model="value1"></s-date>
            {{ value1 }}
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="带快捷键">
            <s-date v-model="value2" showFast></s-date>
            {{ value2 }}
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="默认7天">
            <s-date v-model="value3" :defaultRange="7"></s-date>
            {{ value3 }}
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label-width="200px" label="限制最大和最小选择范围">
            <s-date v-model="value4" showFast :max="7" :min="20"></s-date>
            {{ value4 }}
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
      value1: null,
      value2: [],
      value3: [],
      value4: []
    };
  }
};
</script>
```
:::
