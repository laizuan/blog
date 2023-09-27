# OM 业务 API

[toc]

## 1.仓库

### 1.1 仓库详情

**请求方式**

GET

**请求参数**

| 参数 | 名称        | 备注                |
| ---- | ----------- | ------------------- |
| id   | 仓库主键 ID | 必填，不可以为 null |

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 仓库主键 ID      |                        |
| code         | 仓库编码         |                        |
| name         | 仓库名称         |                        |
| ledgerNo     | 账册号           |                        |
| type         | 仓库类型         |                        |
| address      | 仓库地址         |                        |
| disabled     | 禁用状态         |                        |
| disabledEnum | 禁用状态描述     | true：禁用 false：启用 |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**请求参数示例**

| 参数 | 请求值          | 备注                |
| ---- | --------------- | ------------------- |
| id   | 440358434911109 | 必填，不可以为 null |

**返回结果示例**

```json
{
  "id": "440358434911109",
  "code": "PLA",
  "name": "普洛斯一期",
  "ledgerNo": "123456789015",
  "type": 1,
  "address": "深圳市盐田区永安北三街盐田港普洛斯物流园出口监管仓一期",
  "disabled": false,
  "disabledEnum": {
    "value": false,
    "desc": "启用",
    "tagType": "success"
  }
}
```

### 1.2 仓库列表

**请求方式**

GET

**请求参数**

| 参数      | 名称       | 备注                                                                  |
| --------- | ---------- | --------------------------------------------------------------------- |
| satellite | 卫星仓状态 | 非必填，true：卫星仓 false：监管仓，可为 null，为 null 时查询所有仓库 |

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 仓库主键 ID      |                        |
| code         | 仓库编码         |                        |
| name         | 仓库名称         |                        |
| disabled     | 禁用状态         |                        |
| disabledEnum | 禁用状态描述     | true：禁用 false：启用 |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**请求参数示例**

| 参数      | 请求值 | 备注                                                                  |
| --------- | ------ | --------------------------------------------------------------------- |
| satellite | true   | 非必填，true：卫星仓 false：监管仓，可为 null，为 null 时查询所有仓库 |

**返回结果示例**

```json
[
  {
    "id": "440363851400069",
    "name": "广州白云仓",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "440364835566469",
    "name": "福州晋安仓",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  }
]
```

### 1.3 缓存说明

创建缓存，在第一次查询仓库详情时，对返回的结果进行缓存。

清除缓存，OM 系统中对仓库信息进行编辑更新成功后，监听其事件**`whe-upd`**进行清除缓存。

## 2.供应商

### 2.1 供应商详情

**请求方式**

GET

**请求参数**

| 参数 | 名称      | 备注                |
| ---- | --------- | ------------------- |
| id   | 供应商 ID | 必填，不可以为 null |

**返回结果**

| 字段          | 名称             | 备注                                                      |
| ------------- | ---------------- | --------------------------------------------------------- |
| id            | 供应商 ID        |                                                           |
| code          | 供应商编码       |                                                           |
| name          | 供应商名称       |                                                           |
| type          | 供应商类型       | 1：船公司 2：运输公司 3：装卸公司 4：报关公司 5：仓储公司 |
| contactPerson | 联系人           |                                                           |
| contactPhone  | 联系电话         |                                                           |
| disabled      | 禁用状态         | true：禁用 false：启用                                    |
| disabledEnum  | 禁用状态描述     |                                                           |
| - value       | 禁用状态值       |                                                           |
| - desc        | 禁用状态值描述   |                                                           |
| - tagType     | 前端页面显示 tag |                                                           |

**请求参数示例**

| 参数 | 请求值          | 备注                |
| ---- | --------------- | ------------------- |
| id   | 440412326409093 | 必填，不可以为 null |

**返回结果示例**

```json
{
  "id": "440412326409093",
  "code": "XFWL",
  "name": "祥丰物流",
  "type": 2,
  "contactPerson": "夏天祥",
  "contactPhone": "0755-22321183",
  "disabled": false,
  "disabledEnum": {
    "value": false,
    "desc": "启用",
    "tagType": "success"
  }
}
```

### 2.2 供应商列表

**请求方式**

GET

**请求参数**

| 参数 | 名称       | 备注                                                                           |
| ---- | ---------- | ------------------------------------------------------------------------------ |
| type | 供应商类型 | 必填，不可以为 null，1：船公司 2：运输公司 3：装卸公司 4：报关公司 5：仓储公司 |

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 供应商 ID        |                        |
| code         | 供应商编码       |                        |
| name         | 供应商名称       |                        |
| disabled     | 禁用状态         | true：禁用 false：启用 |
| disabledEnum | 禁用状态描述     |                        |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |
|              |                  |                        |

**请求参数示例**

| 参数 | 请求值 | 备注                                                                           |
| ---- | ------ | ------------------------------------------------------------------------------ |
| type | 1      | 必填，不可以为 null，1：船公司 2：运输公司 3：装卸公司 4：报关公司 5：仓储公司 |

**返回结果示例**

```json
[
  {
    "id": "440413140575109",
    "code": "MAEU",
    "name": "马士基海运",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "440413257552773",
    "code": "ONEY",
    "name": "海洋网联船务",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  }
]
```

### 2.3 缓存说明

创建缓存，在第一次查询供应商详情时，对返回的结果进行缓存。

清除缓存，OM 系统中对供应商信息进行编辑更新成功后，监听其事件**`supp-clear`**进行清除缓存。

## 3.运输路线

**请求方式**

GET

**请求参数**

| 参数 | 名称        | 备注                |
| ---- | ----------- | ------------------- |
| id   | 运输路线 ID | 必填，不可以为 null |

**返回结果**

| 字段             | 名称             | 备注                   |
| ---------------- | ---------------- | ---------------------- |
| id               | 运输路线 ID      |                        |
| sourceLocationId | 源位置 ID        |                        |
| targetLocationId | 目标位置 ID      |                        |
| routeName        | 路线名称         |                        |
| disabled         | 禁用状态         | true：禁用 false：启用 |
| disabledEnum     | 禁用状态描述     |                        |
| - value          | 禁用状态值       |                        |
| - desc           | 禁用状态值描述   |                        |
| - tagType        | 前端页面显示 tag |                        |

**请求参数示例**

| 参数 | 请求值          | 备注                |
| ---- | --------------- | ------------------- |
| id   | 440376742708101 | 必填，不可以为 null |

**返回结果示例**

```json
{
  "id": "440376742708101",
  "sourceLocationId": "440376652780421",
  "targetLocationId": "440376673493893",
  "routeName": "盐田 - 盐田码头",
  "disabled": false,
  "disabledEnum": {
    "value": false,
    "desc": "启用",
    "tagType": "success"
  }
}
```

### 3.2 运输路线列表

**请求方式**

GET

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 运输路线 ID      |                        |
| routeName    | 路线名称         |                        |
| disabled     | 禁用状态         | true：禁用 false：启用 |
| disabledEnum | 禁用状态描述     |                        |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**返回结果示例**

```json
[
  {
    "id": "440376742708101",
    "routeName": "盐田 - 盐田码头",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "440376767206277",
    "routeName": "蛇口 - 蛇口码头",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "440376798315397",
    "routeName": "盐田 - 蛇口码头",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "440376818226053",
    "routeName": "蛇口 - 盐田码头",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "446083688117125",
    "routeName": "蛇口 - 皇岗口岸",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  }
]
```

### 3.3 缓存说明

创建缓存，在第一次查询运输路线详情时，对返回的结果进行缓存。

清除缓存，OM 系统中对运输路线信息进行编辑更新成功后，监听其事件**`tasp-route-clear`**进行清除缓存。

## 4.货代

### 4.1 货代详情

**请求方式**

GET

**请求参数**

| 参数 | 名称    | 备注                |
| ---- | ------- | ------------------- |
| id   | 货代 ID | 必填，不可以为 null |

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 货代 ID          |                        |
| code         | 货代编码         |                        |
| name         | 货代名称         |                        |
| abbreviation | 货代简称         |                        |
| disabled     | 禁用状态         | true：禁用 false：启用 |
| disabledEnum | 禁用状态描述     |                        |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**请求参数示例**

| 参数 | 请求值          | 备注                |
| ---- | --------------- | ------------------- |
| id   | 440366521914245 | 必填，不可以为 null |

**返回结果示例**

```json
{
  "id": "440366521914245",
  "code": "KN",
  "name": "德迅（中国）货运代理有限公司",
  "abbreviation": "德迅",
  "disabled": false,
  "disabledEnum": {
    "value": false,
    "desc": "启用",
    "tagType": "success"
  }
}
```

### 4.2 货代列表

**请求方式**

GET

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 货代 ID          |                        |
| abbreviation | 货代简称         |                        |
| disabled     | 禁用状态         | true：禁用 false：启用 |
| disabledEnum | 禁用状态描述     |                        |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**返回结果示例**

```json
[
  {
    "id": "440366521914245",
    "abbreviation": "德迅",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "440367196406661",
    "abbreviation": "马士基",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  }
]
```

### 4.3 缓存说明

创建缓存，在第一次查询货代详情时，对返回的结果进行缓存。

清除缓存，OM 系统中对货代信息进行编辑更新成功后，监听其事件**`forw-upd`**进行清除缓存。

## 5.付款方

### 5.1 付款方详情

**请求方式**

GET

**请求参数**

| 参数 | 名称      | 备注                |
| ---- | --------- | ------------------- |
| id   | 付款方 ID | 必填，不可以为 null |

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 付款方 ID        |                        |
| code         | 付款方编码       |                        |
| name         | 付款方名称       |                        |
| disabled     | 禁用状态         | true：禁用 false：启用 |
| disabledEnum | 禁用状态描述     |                        |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**请求参数示例**

| 参数 | 请求值          | 备注                |
| ---- | --------------- | ------------------- |
| id   | 441165742478213 | 必填，不可以为 null |

**返回结果示例**

```json
{
  "id": "441165742478213",
  "code": "KNSZ",
  "name": "德迅深圳",
  "disabled": false,
  "disabledEnum": {
    "value": false,
    "desc": "启用",
    "tagType": "success"
  }
}
```

### 5.2 付款方列表

**请求方式**

GET

**请求参数**

| 参数      | 名称    | 备注                                                                        |
| --------- | ------- | --------------------------------------------------------------------------- |
| forwarder | 货代 ID | 可以为 null，为 null 时查询所有的付款方，不为 null 时查询指定货代下的付款方 |

**返回结果**

| 字段         | 名称             | 备注                   |
| ------------ | ---------------- | ---------------------- |
| id           | 付款方 ID        |                        |
| code         | 付款方编码       |                        |
| name         | 付款方名称       |                        |
| disabled     | 禁用状态         | true：禁用 false：启用 |
| disabledEnum | 禁用状态描述     |                        |
| - value      | 禁用状态值       |                        |
| - desc       | 禁用状态值描述   |                        |
| - tagType    | 前端页面显示 tag |                        |

**请求参数示例**

| 参数      | 请求值 | 备注                                                                        |
| --------- | ------ | --------------------------------------------------------------------------- |
| forwarder | null   | 可以为 null，为 null 时查询所有的付款方，不为 null 时查询指定货代下的付款方 |

**返回结果示例**

```json
[
  {
    "id": "441165742478213",
    "code": "KNSZ",
    "name": "德迅深圳",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "441165841101701",
    "code": "KNHK",
    "name": "德迅香港",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "441165912802181",
    "code": "KNGZ",
    "name": "德迅广州",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "463004718064517",
    "code": "KNZS",
    "name": "德迅中山",
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  }
]
```

### 5.3 缓存说明

创建缓存，在第一次查询付款方详情时，对返回的结果进行缓存。

清除缓存，OM 系统中对付款方信息进行编辑更新成功后，监听其事件**`pay-upd`**进行清除缓存。

## 6.收货方

### 6.1 收货方详情

**请求方式**

GET

**请求参数**

| 参数 | 名称      | 备注                |
| ---- | --------- | ------------------- |
| id   | 收货方 ID | 必填，不可以为 null |

**返回结果**

| 字段                             | 名称             | 备注                        |
| -------------------------------- | ---------------- | --------------------------- |
| id                               | 收货方 ID        |                             |
| code                             | 收货方编码       |                             |
| name                             | 收货方名称       |                             |
| type                             | 收货方类型       | 0：散货 1：标准货 2：普通货 |
| disabled                         | 禁用状态         | true：禁用 false：启用      |
| disabledEnum                     | 禁用状态描述     |                             |
| - value                          | 禁用状态值       |                             |
| - desc                           | 禁用状态值描述   |                             |
| - tagType                        | 前端页面显示 tag |                             |
| weighRatio                       | 称重比例         | 使用正整数表示              |
| grossWeightDifference            | 毛重差异         | 使用正整数表示              |
| customsDeclarationAfterReceiving | 收货后报关       | true：是 false：否          |

**请求参数示例**

| 参数 | 请求值          | 备注                |
| ---- | --------------- | ------------------- |
| id   | 441165742478213 | 必填，不可以为 null |

**返回结果示例**

```json
{
  "id": "441166221738885",
  "code": "KN-SEX",
  "name": "KN-SEX",
  "type": 0,
  "disabled": false,
  "disabledEnum": {
    "value": false,
    "desc": "启用",
    "tagType": "success"
  },
  "weighRatio": 0,
  "grossWeightDifference": 0,
  "customsDeclarationAfterReceiving": false
}
```

### 6.2 收货方列表

**请求参数**

| 参数      | 名称    | 备注                                                                        |
| --------- | ------- | --------------------------------------------------------------------------- |
| forwarder | 货代 ID | 可以为 null，为 null 时查询所有的收货方，不为 null 时查询指定货代下的收货方 |

**返回结果**

| 字段         | 名称             | 备注                        |
| ------------ | ---------------- | --------------------------- |
| id           | 收货方 ID        |                             |
| code         | 收货方编码       |                             |
| name         | 收货方名称       |                             |
| type         | 收货方类型       | 0：散货 1：标准货 2：普通货 |
| disabled     | 禁用状态         | true：禁用 false：启用      |
| disabledEnum | 禁用状态描述     |                             |
| - value      | 禁用状态值       |                             |
| - desc       | 禁用状态值描述   |                             |
| - tagType    | 前端页面显示 tag |                             |

**请求参数示例**

| 参数      | 请求值 | 备注                                                                        |
| --------- | ------ | --------------------------------------------------------------------------- |
| forwarder | null   | 可以为 null，为 null 时查询所有的收货方，不为 null 时查询指定货代下的收货方 |

**返回结果示例**

```json
[
  {
    "id": "441166221738885",
    "code": "KN-SEX",
    "name": "KN-SEX",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "441166298321797",
    "code": "KN-CAN",
    "name": "KN-CAN",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "441166361371525",
    "code": "KN-HKG",
    "name": "KN-HKG",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "441166534316933",
    "code": "KN-ADEO",
    "name": "KN-ADEO",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "441166620676997",
    "code": "KN-ACCO",
    "name": "KN-ACCO",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "455947563246469",
    "code": "MSJ-TEST",
    "name": "测试1",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  },
  {
    "id": "463424341255045",
    "code": "KN-FCL",
    "name": "KN-FCL",
    "type": 0,
    "disabled": false,
    "disabledEnum": {
      "value": false,
      "desc": "启用",
      "tagType": "success"
    }
  }
]
```

### 6.3 缓存说明

创建缓存，在第一次查询收货方详情时，对返回的结果进行缓存。

清除缓存，OM 系统中对收货方信息进行编辑更新成功后，监听其事件**`cnee-upd`**进行清除缓存。
