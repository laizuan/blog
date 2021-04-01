# 设计
## 1、命名
设计数据库有以下含义的必须使用一下字段名称命名      

| 数据库字段名称 | 数据库类型 | 是否可以为空 | Java类型 | 描述 |
| --- | --- | --- | --- | --- |
|  createTime   | datetime | 否 |   Date   | 创建时间 |
|  updateTime   | datetime | 是 |   Date   | 修改时间 |
|  createUserId   | bigint(20) | 否 |   Long   | 创建人主键 |
|  updateUserId   | bigint(20) | 是 |   Long   | 修改人主键 |
|  createUserName   | varchar(50) | 否 |   String   | 创建人姓名 |
|  updateUserName   | varchar(50) | 是 |   String   | 修改人姓名 |
|  enableStatus   | tinyint(1) | 否 |   enum   | 启禁用状态 |
|  orderStatus   | tinyint(2) | 否 |   enum   | 订单状态 |
| auditStatus   | tinyint(1) | 是 | enum | 审核状态 |
| sortNo | tinyint(4) | 否 | Integer | 排序 |
| remark | varchar(255) | 否 | String | 备注 |

注意        
* **枚举类型**如果需要入库那么一定必须实现`BaseEnum`或者`BaseTagEnum`类
* **主键** 数据库主键必须使用bigint(20)类型
* **orderStatus** 订单状态必须是数字型。每个状态数字必须不是连号。至少相隔5的差值。例如订单状态设置成：未提交(5)、已提交(10)、待审核(15)、已审核(20)
