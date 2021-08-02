# StatusFlow 状态流

状态流程图。**节点状态小于0的时候不会显示，因为小于0的节点我们将其默认是失败的节点**。（最佳实践比如：支付成功和失败，在理论上只会显示一个节点，成功的时候显示成功节点，失败的时候隐藏成功节点显示失败节点。那么你需要设置他们两个值正负相等（10， -10）见Demo）。只有当`current-status-code`代码和它相等的时候会显示小于0的节点，并且会覆盖掉小于0的正整数节点。

## Attribute

| 属性   | 说明           | 类型    | 默认值 |
| ------ | -------------- | ------- | ------ |
| status-list  | 状态节点集合       | Array  | -      |
| current-status-code   | 当前状态节点代码 | `String/Number` | -   |

- 节点属性

  | 属性     | 说明                                                         | 类型            | 默认值 |
  | -------- | ------------------------------------------------------------ | --------------- | ------ |
  | flowCode | 节点代码。如果`current-status-code`和当前代码相等，则表示节点到达该节点。节点会标记成深绿色 | `String/Number` | -      |
  | flowDesc | 节点描述                                                     | String          | -      |
  | flowTime | 节点产生时间(时间戳)。节点时间不是空的时候则当前节点表示已经产生，会标记成浅绿色。 | Number          | null   |
  | remark   | 节点说明。如果节点状态小于0                                  | String          | null   |


## Example

::: demo

```html
<template>
  <div>
    <s-card title="状态流">
      <s-status-flow :status-list="statusList1" :current-status-code="currentStatusCode"></s-status-flow>
    </s-card>

    <s-card title="有失败状态的">
      <s-status-flow :status-list="statusList2" :current-status-code="currentStatusCode2"></s-status-flow>
    </s-card>

    <s-card title="全部完成">
      <s-status-flow :status-list="statusList3" :current-status-code="currentStatusCode3"></s-status-flow>
    </s-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusList1: [
        {
          flowCode: 5,
          flowDesc: '已下单',
          flowTime: 1627874560000,
          remark: ''
        },
        {
          flowCode: 10,
          flowDesc: '已支付',
          flowTime: 1627887739583,
          remark: ''
        },
        {
          flowCode: -10,
          flowDesc: '支付失败',
          flowTime: null,
          remark: null
        },
        {
          flowCode: 15,
          flowDesc: '已发货',
          flowTime: null,
          remark: ''
        },
        {
          flowCode: 20,
          flowDesc: '已派送',
          flowTime: null,
          remark: ''
        },
        {
          flowCode: 25,
          flowDesc: '已签收',
          flowTime: null,
          remark: ''
        }
      ],
      statusList2: [
        {
          flowCode: 5,
          flowDesc: '已下单',
          flowTime: 1627874560000,
          remark: ''
        },
        {
          flowCode: 10,
          flowDesc: '已支付',
          flowTime: 1627887739583,
          remark: ''
        },
        {
          flowCode: -10,
          flowDesc: '支付失败',
          flowTime: 1627887739583,
          remark: '客户取消支付'
        },
        {
          flowCode: 15,
          flowDesc: '已发货',
          flowTime: null,
          remark: ''
        },
        {
          flowCode: 20,
          flowDesc: '已派送',
          flowTime: null,
          remark: ''
        },
        {
          flowCode: 25,
          flowDesc: '已签收',
          flowTime: null,
          remark: ''
        }
      ],
      statusList3: [
        {
          flowCode: 5,
          flowDesc: '已下单',
          flowTime: 1627874560000,
          remark: ''
        },
        {
          flowCode: 10,
          flowDesc: '已支付',
          flowTime: 1627887739583,
          remark: ''
        },
        {
          flowCode: -10,
          flowDesc: '支付失败',
          flowTime: 1627887739583,
          remark: '客户取消支付'
        },
        {
          flowCode: 15,
          flowDesc: '已发货',
          flowTime: 1627898542000,
          remark: ''
        },
        {
          flowCode: 20,
          flowDesc: '已派送',
          flowTime: 1627952339000,
          remark: ''
        },
        {
          flowCode: 25,
          flowDesc: '已签收',
          flowTime: 1628053322000,
          remark: ''
        }
      ],
      currentStatusCode: 10,
      currentStatusCode2: -10,
      currentStatusCode3: 25
    };
  }
};
</script>
```

:::
