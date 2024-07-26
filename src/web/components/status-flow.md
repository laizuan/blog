---
title: StatusFlow
meta:
  - name: description
    content: 状态流转
---

# StatusFlow

状态流转

::: tip 提示

节点状态小于 0 的时候不会显示，因为小于 0 的节点我们将其默认是失败的节点。

- **最佳实践比如：支付成功和失败，在理论上值会显示一个节点，成功的时候显示成功节点，失败的时候隐藏成功节点显示失败节点。那么你需要设置他们两个值正负相等（10， -10）详见 Demo。**

只有当 `current-code` 代码和它相等的时候会显示小于 0 的节点，并且会覆盖掉小于 0 的正整数节点。

:::

## 使用

:::demo

```vue
<template>
  <div class="status-demo">
    <n-card title="状态流">
      <n-status-flow :data="statusList1" :currentCode="currentCode"></n-status-flow>
    </n-card>
    <n-card>
      <template #title>
        <n-tip
          text="不平铺的"
          content="建议节点超过两行的时候不要使用‘tiled’属性"
          color="#f90"
          icon-placement="right"
        />
      </template>
      <n-status-flow
        :data="statusList1"
        :tiled="false"
        :currentCode="currentStatusCode"
      ></n-status-flow>
    </n-card>
    <n-card title="有失败状态的">
      <n-status-flow :data="statusList2" :currentCode="currentCode2"></n-status-flow>
    </n-card>
    <n-card title="全部完成">
      <n-status-flow :data="statusList3" :currentCode="currentCode3"></n-status-flow>
    </n-card>
  </div>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      return {
        statusList1: [
          {
            code: 5,
            desc: '已下单',
            time: 1627874560000,
            remark: '',
          },
          {
            code: 10,
            desc: '已支付',
            time: 1627887739583,
            remark: '',
          },
          {
            code: -10,
            desc: '支付失败',
            time: 1627887739583,
            remark: '客户取消支付',
          },
          {
            code: 15,
            desc: '已发货',
            time: null,
            remark: '',
          },
          {
            code: 20,
            desc: '已派送',
            time: null,
            remark: '',
          },
          {
            code: 25,
            desc: '已签收',
            time: null,
            remark: '',
          },
        ],
        statusList2: [
          {
            code: 5,
            desc: '已下单',
            time: 1627874560000,
            remark: '',
          },
          {
            code: 10,
            desc: '已支付',
            time: 1627887739583,
            remark: '',
          },
          {
            code: -10,
            desc: '支付失败',
            time: 1627887739583,
            remark: '客户取消支付',
          },
          {
            code: 15,
            desc: '已发货',
            time: null,
            remark: '',
          },
          {
            code: 20,
            desc: '已派送',
            time: null,
            remark: '',
          },
          {
            code: 25,
            desc: '已签收',
            time: null,
            remark: '',
          },
        ],
        statusList3: [
          {
            code: 5,
            desc: '已下单',
            time: 1627874560000,
            remark: '',
          },
          {
            code: 10,
            desc: '已支付',
            time: 1627887739583,
            remark: '',
          },
          {
            code: -10,
            desc: '支付失败',
            time: 1627887739583,
            remark: '客户取消支付',
          },
          {
            code: 15,
            desc: '已发货',
            time: 1627898542000,
            remark: '',
          },
          {
            code: 20,
            desc: '已派送',
            time: 1627952339000,
            remark: '',
          },
          {
            code: 25,
            desc: '已签收',
            time: 1628053322000,
            remark: '',
          },
        ],
        currentCode: 10,
        currentCode2: -10,
        currentCode3: 25,
      };
    },
  };
</script>
```

:::

## Props

| Name         | Description  | Type                | Options | Default |
| ------------ | ------------ | ------------------- | ------- | ------- |
| data         | 状态节点集合 | `array<StatusFlow>` | -       | -       |
| current-code | 当前高亮节点 | number              | -       | -       |
| tiled        | 是否平铺节点 | boolean             | -       | true    |

### StatusFlow

| Name | Description | Type | Options | Default |
| --- | --- | --- | --- | --- |
| code | 节点代码。如果 `current-code` 和当前代码相等，则表示节点到达该节点。节点会标记成深绿色 | number | - | - |
| desc | 节点描述 | string | - | - |
| time | 节点产生时间(时间戳)。节点时间不是空的时候则当前节点表示已经产生，会标记成浅绿色。 | number | - | - |
| remark | 节点说明。如果节点状态小于 0 的时候显示 | string | - | - |
