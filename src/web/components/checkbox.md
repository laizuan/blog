---
title: Checkbox
meta:
  - name: description
    content: element-plus el-checkbox 增强
---

# Checkbox

[ElCheckbox](https://element-plus.gitee.io/zh-CN/component/checkbox.html) 增强

## 使用

### 基础用法

传入 data 数据将自动生成选项

:::demo

```vue
<template>
  <n-checkbox v-model="checkbox" :data="data" border />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const checkbox = ref(undefined);
      const data = ref([
        { value: 'Go', desc: 'go' },
        { value: 'JavaScript', desc: 'javascript' },
        { value: 'Python', desc: 'python' },
        { value: 'Dart', desc: 'dart' },
        { value: 'V', desc: 'v' },
      ]);

      return {
        checkbox,
        data,
      };
    },
  };
</script>
```

:::

### 禁用选项

将传入 data 数据中的某项设置为 `disabled: true` 即可

:::demo

```vue
<template>
  <n-checkbox v-model="checkbox1" :data="list" />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const checkbox1 = ref([]);
      const list = ref([
        { value: 'Go', desc: 'go', disabled: true },
        { value: 'JavaScript', desc: 'javascript' },
        { value: 'Python', desc: 'python' },
        { value: 'Dart', desc: 'dart' },
        { value: 'V', desc: 'v' },
      ]);

      return {
        checkbox1,
        list,
      };
    },
  };
</script>
```

:::

### 配置绑定数据键值

通过 config 配置数据键值。`value`- v-model 绑定的键值、`desc`-显示键值、`disabled`-控制不可选的键值、`name`-原生 name 的键值

:::demo

```vue
<template>
  <n-checkbox v-model="checkbox2" :data="data" :config="config" />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const checkbox2 = ref([]);
      const config = ref({ value: 'desc', desc: 'value' });
      const data = ref([
        { value: 'Go', desc: 'go' },
        { value: 'JavaScript', desc: 'javascript' },
        { value: 'Python', desc: 'python' },
        { value: 'Dart', desc: 'dart' },
        { value: 'V', desc: 'v' },
      ]);

      return {
        checkbox2,
        config,
        data,
      };
    },
  };
</script>
```

:::

### 按钮样式

使用 `n-checkbox-button` 显示按钮样式的多选框组

:::demo

```vue
<template>
  <n-checkbox-button v-model="checkboxbutton" :data="data" />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const checkboxbutton = ref([]);
      const data = ref([
        { value: 'Go', desc: 'go' },
        { value: 'JavaScript', desc: 'javascript' },
        { value: 'Python', desc: 'python' },
        { value: 'Dart', desc: 'dart' },
        { value: 'V', desc: 'v' },
      ]);

      return {
        checkboxbutton,
        data,
      };
    },
  };
</script>
```

:::

### Checkbox Props

| Name | Description | Type | Options | Default |
| :-- | :-- | :-- | :-- | :-- |
| v-model | 绑定值 | array | - | - |
| data | 绑定数据 | array | - | - |
| config | 配置绑定数据键值 | object | - | `{ value: 'value', desc: 'desc', disabled: 'disabled', name: 'name' }` |
| size | 尺寸 | string | medium / small / mini | - |
| disabled | 是否禁用 | boolean | - | false |
| min | 可被勾选的的最小数量 | number | - | - |
| max | 可被勾选的的最大数量 | number | - | - |
| text-color | 按钮形式激活时的文本颜色 | string | - | #ffffff |
| fill | 按钮形式激活时的填充色和边框色 | string | - | #409EFF |
| border | 是否显示边框 | boolean | - | false |
| remoteConfig | 远程加载配置，请参考下面`RemoteConfig` | object | - | - |

### RemoteConfig

| Name         | Description                                   | Type                  | Options                        | Default        |
| :----------- | :-------------------------------------------- | :-------------------- | :----------------------------- | :------------- |
| method       | 请求方法                                      | string                | `GET/POST`                     | `GET`          |
| params       | 请求参数                                      | `Record<string, any>` | -                              | -              |
| cache        | 是否缓存结果                                  | boolean               | -                              | `true`         |
| cache-key    | 本地缓存表名                                  | string                | -                              | `_dict_`       |
| storage-type | 缓存类型                                      | StorageType           | `sessionStorage/localStorage ` | `localStorage` |
| expires      | 缓存过期时间，单位：天                        | number                | -                              | `7`            |
| url          | 请求路径                                      | string                | -                              | -              |
| key          | 缓存本地数据表中的key值。默认使用参数的值拼接 | string                | -                              | -              |

### Checkbox Events

| Name   | Description            | Parameters      |
| ------ | ---------------------- | --------------- |
| change | 绑定值变化时触发的事件 | 选中的 label 值 |

## CheckboxButton

### CheckboxButton Props

| Name | Description | Type | Options | Default |
| :-- | :-- | :-- | :-- | :-- |
| v-model | 绑定值 | array | - | - |
| data | 绑定数据 | array | - | - |
| config | 配置绑定数据键值 | object | - | `{ value: 'value', desc: 'desc', disabled: 'disabled', name: 'name' }` |
| size | 尺寸 | string | medium / small / mini | - |
| disabled | 是否禁用 | boolean | - | false |
| min | 可被勾选的的最小数量 | number | - | - |
| max | 可被勾选的的最大数量 | number | - | - |
| text-color | 按钮形式激活时的文本颜色 | string | - | #ffffff |
| fill | 按钮形式激活时的填充色和边框色 | string | - | #409EFF |

### CheckboxButton Events

| Name   | Description            | Parameters      |
| ------ | ---------------------- | --------------- |
| change | 绑定值变化时触发的事件 | 选中的 label 值 |
