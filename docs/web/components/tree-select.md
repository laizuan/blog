---
title: TreeSelect
meta:
  - name: description
    content: 当选项的层级多深时，使用树形选择器比普通选择器更适合
---

# TreeSelect

当选项的层级多深时，使用树形选择器比普通选择器更适合

## 使用

### 基础用法

传入 data 数据，生成树形结构 (格式同 Select 分组)

::: demo

```vue
<template>
  <n-tree-select v-model="select" :data="data" clearable />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select = ref('');
      const data = ref([
        {
          desc: '1',
          value: 1,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1' }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1' }],
            },
          ],
        },
      ]);

      return {
        select,
        data,
      };
    },
  };
</script>
```

:::

### 禁用可选项

将传入 data 数据中的某项设置为 `disabled: true` 即可

::: demo

```vue
<template>
  <n-tree-select v-model="select1" :data="data1" />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select1 = ref('');
      const data1 = ref([
        {
          desc: '1',
          value: 1,
          disabled: true,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              disabled: true,
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1', disabled: true }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1', disabled: true }],
            },
          ],
        },
      ]);

      return {
        select1,
        data1,
      };
    },
  };
</script>
```

:::

### 配置绑定数据键值

通过 config 配置数据键值。`value`- v-model 绑定的键值、`desc`-显示键值、`disabled`-控制不可选的键值、`children`-子节点的键值

::: demo

```vue
<template>
  <n-tree-select v-model="select2" :data="data20" :config="config" />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select2 = ref('');
      const config = ref({ value: 'desc', desc: 'value' });
      const data20 = ref([
        {
          desc: '1',
          value: 1,
          children: [
            {
              value: 11,
              label: '1-1',
              children: [{ value: 111, label: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          label: '2',
          children: [
            {
              value: 21,
              label: '2-1',
              children: [{ value: 211, label: '2-1-1' }],
            },
            {
              value: 22,
              label: '2-2',
              children: [{ value: 221, label: '2-2-1' }],
            },
          ],
        },
        {
          value: 3,
          label: '3',
          children: [
            {
              value: 31,
              label: '3-1',
              children: [{ value: 311, label: '3-1-1' }],
            },
            {
              value: 32,
              label: '3-2',
              children: [{ value: 321, label: '3-2-1' }],
            },
          ],
        },
      ]);

      return {
        select2,
        data20,
      };
    },
  };
</script>
```

:::

### 开启多选

当 `multiple` 为 `true` 时，启用多选。此时绑定的 model-value 为数组格式

::: demo

```vue
<template>
  <n-tree-select v-model="select3" :data="data" multiple clearable />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select3 = ref([]);
      const data = ref([
        {
          desc: '1',
          value: 1,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1' }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1' }],
            },
          ],
        },
      ]);

      return {
        select3,
        data,
      };
    },
  };
</script>
```

:::

### 多选控制不可选项目

同单选只需将传入 data 数据中的某项设置为 `disabled: true` 即可

::: demo

```vue
<template>
  <n-tree-select v-model="select4" :data="data1" multiple default-expand-all />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select4 = ref([]);
      const data1 = ref([
        {
          desc: '1',
          value: 1,
          disabled: true,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              disabled: true,
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1', disabled: true }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1', disabled: true }],
            },
          ],
        },
      ]);

      return {
        select4,
        data1,
      };
    },
  };
</script>
```

:::

### 多选父子节点互不关联

当 `check-strictly` 为 `true` 时，父子节点互不关联

::: demo

```vue
<template>
  <n-tree-select v-model="select5" :data="data" multiple check-strictly />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select5 = ref([]);
      const data = ref([
        {
          desc: '1',
          value: 1,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1' }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1' }],
            },
          ],
        },
      ]);

      return {
        select5,
        data,
      };
    },
  };
</script>
```

:::

### 只选取子节点

当 `only-select-leaf` 为 `true` 时，只会选取子节点的数据

::: demo

```vue
<template>
  <n-tree-select v-model="select6" :data="data" multiple only-select-leaf />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select6 = ref([]);
      const data = ref([
        {
          desc: '1',
          value: 1,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1' }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1' }],
            },
          ],
        },
      ]);

      return {
        select6,
        data,
      };
    },
  };
</script>
```

:::

### 自定义节点显示

通过 `default` 插槽可以定义内容。**注意：在单选模式下需要参考下面内容自定义 class 实现控制不可选项目样式**

::: demo

```vue
<template>
  <n-tree-select v-model="select7" :data="data1">
    <template #default="{ node, data, multiple }">
      <p :class="{ 'is-disabled': data.disabled && !multiple }" class="custom-tree-node">
        <span>{{ data.desc }}</span>
        <em>{{ data.value }}</em>
      </p>
    </template>
  </n-tree-select>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select7 = ref('');
      const data1 = ref([
        {
          desc: '1',
          value: 1,
          disabled: true,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              disabled: true,
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1', disabled: true }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1', disabled: true }],
            },
          ],
        },
      ]);

      return {
        select7,
        data1,
      };
    },
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  .custom-tree-node em {
    padding-right: 15px;
  }
</style>
```

:::

### 选择节点过滤

当 `filterable` 为 `true` 时，启用选择节点过滤。在选择框中输入文本，将过滤节点内容

::: demo

```vue
<template>
  <n-tree-select v-model="select8" :data="data" multiple filterable />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select8 = ref([]);
      const data = ref([
        {
          desc: '1',
          value: 1,
          children: [
            {
              value: 11,
              desc: '1-1',
              children: [{ value: 111, desc: '1-1-1' }],
            },
          ],
        },
        {
          value: 2,
          desc: '2',
          children: [
            {
              value: 21,
              desc: '2-1',
              children: [{ value: 211, desc: '2-1-1' }],
            },
            {
              value: 22,
              desc: '2-2',
              children: [{ value: 221, desc: '2-2-1' }],
            },
          ],
        },
        {
          value: 3,
          desc: '3',
          children: [
            {
              value: 31,
              desc: '3-1',
              children: [{ value: 311, desc: '3-1-1' }],
            },
            {
              value: 32,
              desc: '3-2',
              children: [{ value: 321, desc: '3-2-1' }],
            },
          ],
        },
      ]);

      return {
        select8,
        data,
      };
    },
  };
</script>
```

:::

### 懒加载

与 `ElTree` 一样，配置 `lazy` `load` 即可使用懒加载数据

::: demo

```vue
<template>
  <n-tree-select v-model="select9" :data="data2" :load="loadNode" lazy multiple filterable />
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const select9 = ref([]);
      const data2 = [];

      function loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([
            {
              desc: 'region',
              value: 'region',
              isLeaf: true,
            },
          ]);
        }
        if (node.level > 2) return resolve([]);

        setTimeout(() => {
          const data = [
            {
              desc: 'leaf-' + node.level,
              value: 'leaf-' + node.level,
              isLeaf: node.level <= 2,
            },
            {
              desc: 'zone-' + node.level,
              value: 'zone-' + node.level,
            },
          ];
          resolve(data);
        }, 500);
      }

      return {
        select9,
        data2,
        loadNode,
      };
    },
  };
</script>
```

:::

## Props

支持[ElTreeSelect](https://element-plus.org/zh-CN/component/tree-select.html)全部属性

| Name | Description | Type | Options | Default |
| :-- | :-- | :-- | :-- | :-- |
| v-model | 绑定值 | string / array | - | - |
| data | 绑定数据 | array | - | - |
| props | 配置绑定数据键值 | object | - | `{children: 'childrenList',       label: 'desc',       rootId: 'id',       disabled: 'disabled',      parentId: 'parentId', value: 'value'}` |
| `remote-config` | 远程加载数据配置。请参考下方`RemoteConfig` | object                                   | -       | -                                                            |
| `fetch-data`    | 自定义远程请求数据函数                     | `Function():Promise<Array<SelectTree>>>` | -       | -                                                            |
| line | 是否显示树的连接线 | boolean | - | true |

### SelectTree

```tsx
interface SelectTree<T = ExternalParam> {
  /**
   * 父节点主键
   */
  parentId: number

  /**
   * 主键
   */
  id: number

  /**
   * 显示名称
   */
  name: string

  childrenList: Array<T>
}
```



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

## Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除 tag 时触发 | 移除的 tag 值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | - |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |
| node-click | 节点被点击时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件 | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| check-change | 节点选中状态发生变化时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 |
| check | 当复选框被点击的时候触发 | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 |
| current-change | 当前选中节点变化时触发的事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 |
| node-expand | 节点被展开时触发的事件 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| node-collapse | 节点被关闭时触发的事件 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| node-drag-start | 节点开始拖拽时触发的事件 | 共两个参数，依次为：被拖拽节点对应的 Node、event |
| node-drag-enter | 拖拽进入其他节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event |
| node-drag-leave | 拖拽离开某个节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event |
| node-drag-over | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event |
| node-drag-end | 拖拽结束时（可能未成功）触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event |
| node-drop | 拖拽成功完成时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event |

## Slots

| Name | Description                                           |
| ---- | ----------------------------------------------------- |
| -    | 自定义树节点的内容，参数为 `{ node, data, multiple }` |
