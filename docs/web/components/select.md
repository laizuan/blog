---
title: Select
meta:
  - name: description
    content: element-plus select 增强
---

# Select

对 [ElSelect](https://element-plus.gitee.io/zh-CN/component/select.html)增强

## 使用

### 基础用法

传入 data 数据，自动生成选项

::: demo

```vue
<template>
  <n-select v-model="select" :data="data" :config="config" :only-label="true" @change="doChange" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const select = ref('')
    const config = ref({ desc: 'label' })
    const data = ref([
      { value: 'Go', label: 'go' },
      { value: 'JavaScript', label: 'javascript' },
      { value: 'Python', label: 'python' },
      { value: 'Dart', label: 'dart' },
      { value: 'V', label: 'v' }
    ])
    const doChange = (v) => {
      console.log('doChange ====> ', v)
    }
    return {
      select,
      doChange,
      data,
      config
    }
  }
}
</script>
```

:::

### 禁用选项

将传入 data 数据中的某项设置为 `disabled: true` 即可

::: demo

```vue
<template>
  <n-select v-model="select1" :data="list" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const select1 = ref('')
    const list = ref([
      { value: 'Go', desc: 'go', disabled: true },
      { value: 'JavaScript', desc: 'javascript' },
      { value: 'Python', desc: 'python' },
      { value: 'Dart', desc: 'dart' },
      { value: 'V', desc: 'v' }
    ])

    return {
      select1,
      list
    }
  }
}
</script>
```

:::

### 配置绑定数据键值

:::warning 注意

如果使用了 config 配置注意正确配置 `displayKey` 属性

:::

通过 config 配置数据键值。`value`- v-model 绑定的键值、`desc`-显示键值、`disabled`-控制不可选的键值、`children`-子分组的键值

::: demo

```vue
<template>
  <n-select v-model="select2" :data="data" :config="config" :displayKey="['value', 'label']" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const select2 = ref('')
    const config = ref({ value: 'label', desc: 'value' })
    const data = ref([
      { value: 'Go', label: 'go' },
      { value: 'JavaScript', label: 'javascript' },
      { value: 'Python', label: 'python' },
      { value: 'Dart', label: 'dart' },
      { value: 'V', label: 'v' }
    ])

    return {
      select2,
      config,
      data
    }
  }
}
</script>
```

:::

### 使用插槽

通过默认插槽可以自定义备选项

::: demo

```vue
<template>
  <n-select v-model="select5" :data="data" :config="config">
    <template #default="{ data }">
      <span>{{ data?.label }}</span>
      <span style="float:right">{{ data?.value }}</span>
    </template>
  </n-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const select5 = ref('')
    const config = ref({ value: 'label', desc: 'value' })
    const data = ref([
      { value: 'Go', label: 'go' },
      { value: 'JavaScript', label: 'javascript' },
      { value: 'Python', label: 'python' },
      { value: 'Dart', label: 'dart' },
      { value: 'V', label: 'v' }
    ])

    return {
      select5,
      config,
      data
    }
  }
}
</script>
```

:::

### 开启多选

当 `multiple` 为 `true` 时，启用多选。此时绑定的 model-value 为数组格式

::: demo

```vue
<template>
  <n-select v-model="select3" :data="data20" multiple />
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const select3 = ref([])
    const data20 = ref([
      { value: 'Go', desc: 'go' },
      { value: 'JavaScript', desc: 'javascript' },
      { value: 'Python', desc: 'python' },
      { value: 'Dart', desc: 'dart' },
      { value: 'V', desc: 'v' }
    ])

    return {
      select3,
      data20
    }
  }
}
</script>
```

:::

### 分组

通过 `data` 中的 `children` 字段配置可以轻松生成分组展示 (如果有多层分组，推荐使用 `TreeSelect`)

::: demo

```vue
<template>
  <n-select v-model="select4" :data="data1" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const select4 = ref('')
    const data1 = ref([
      {
        desc: '热门城市',
        children: [
          {
            value: 'Shanghai',
            desc: '上海'
          },
          {
            value: 'Beijing',
            desc: '北京'
          }
        ]
      },
      {
        desc: '城市名',
        children: [
          {
            value: 'Chengdu',
            desc: '成都'
          },
          {
            value: 'Shenzhen',
            desc: '深圳'
          },
          {
            value: 'Guangzhou',
            desc: '广州'
          },
          {
            value: 'Dalian',
            desc: '大连'
          }
        ]
      }
    ])

    return {
      select4,
      data1
    }
  }
}
</script>
```

:::

## Props

| Name         | Description                                                     | Type                           | Options | Default                                                                        |
| :----------- | :-------------------------------------------------------------- | :----------------------------- | :------ | :----------------------------------------------------------------------------- |
| v-model      | 绑定值                                                          | array\|number\|string\|boolean | -       | -                                                                              |
| data         | 绑定数据                                                        | array                          | -       | -                                                                              |
| config       | 配置绑定数据键值，如果是自定义`config`需要正确配置`display-key` | object                         | -       | `{ value: 'value', desc: 'desc', disabled: 'disabled', children: 'children' }` |
| only-label   | 是否只显示 label                                                | boolean                        | -       | false                                                                          |
| display-key  | 下拉选项需要显示的 key                                          | array                          | -       | `['value','desc']`                                                             |
| search-key   | 可搜索字段                                                      | array                          | -       | `['value','desc']`                                                             |
| clearable    | 是否可以清空选项                                                | boolean                        | -       | true                                                                           |
| placeholder  | 占位符                                                          | string                         | -       | 请选择                                                                         |
| to-str       | 是否将值转为 string 类型                                        | boolean                        | -       | false                                                                          |
| virtual      | 是否启用虚拟列表，下拉项超过 100 项的时候建议启用               | boolean                        | -       | false                                                                          |
| remoteConfig | 远程加载配置，请参考下面`RemoteConfig`                          | object                         | -       | -                                                                              |

**支持 [el-select](https://element-plus.gitee.io/zh-CN/component/select.html#select-%E5%B1%9E%E6%80%A7) 全部属性**

### RemoteConfig

| Name         | Description                                     | Type                  | Options                        | Default        |
| :----------- | :---------------------------------------------- | :-------------------- | :----------------------------- | :------------- |
| method       | 请求方法                                        | string                | `GET/POST`                     | `GET`          |
| params       | 请求参数                                        | `Record<string, any>` | -                              | -              |
| cache        | 是否缓存结果                                    | boolean               | -                              | `true`         |
| cache-key    | 本地缓存表名                                    | string                | -                              | `_dict_`       |
| storage-type | 缓存类型                                        | StorageType           | `sessionStorage/localStorage ` | `localStorage` |
| expires      | 缓存过期时间，单位：天                          | number                | -                              | `7`            |
| url          | 请求路径                                        | string                | -                              | -              |
| key          | 缓存本地数据表中的 key 值。默认使用参数的值拼接 | string                | -                              | -              |

## Events

| Name           | Description                                                     | Parameters                                                             |
| -------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| change         | 选中值发生变化时触发                                            | 第一个参数当前的选中值，第二个参数回调函数，调用函数后返回选择值的对象 |
| visible-change | 下拉框出现/隐藏时触发                                           | 出现则为 true，隐藏则为 false                                          |
| remove-tag     | 多选模式下移除 tag 时触发                                       | 移除的 tag 值                                                          |
| clear          | 可清空的单选模式下用户点击清空按钮时触发                        | —                                                                      |
| blur           | 当 input 失去焦点时触发                                         | (event: Event)                                                         |
| focus          | 当 input 获得焦点时触发                                         | (event: Event)                                                         |
| enter          | 当 input 按下回车键时触发，**注意：使用 ↑↓ 选择 item 回车无效** | select: select 下拉选择器的 ref 对象，element：select 内部 input 元素  |

## Slots

| Name | Description                   |
| ---- | ----------------------------- |
| -    | 自定插槽内容，参数为 { data } |
