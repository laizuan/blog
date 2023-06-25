## 日志

使用注解`@SysLog`记录操作日志，或者使用日志框架打印日志的时候会记录到存储库中。

前端提示异常的情况下可以使用前端输出的请求ID(`RequestId`)在日志文件中通过该ID查找对应的错误日志。它是一个简单的日志追踪，整一个请求链路都拥有相同的`RequestId`

### 依赖

如果你添加了`seedltd-common-core`则不需要额外引入

```xml
<dependency>
    <groupId>org.seedltd</groupId>
    <artifactId>seedltd-log-starter</artifactId>
</dependency>
```

### 属性

| **字段**            | **说明**                                                     | **默认值** | **可选值**                       |
| ------------------- | ------------------------------------------------------------ | ---------- | -------------------------------- |
| seedltd.log.enabled | 是否启用日志组件，禁用后不能持久化日志，仅能输出日志         | true       |                                  |
| seedltd.log.delay   | 间隔刷盘时间，单位：毫秒                                     | 1000       |                                  |
| seedltd.log.type    | 日志存储类型，db: 数据库保存，es：ElasticSearch，console：直接输出在控制台。 | `db`       | `db`、`console`、`elasticsearch` |

### 打印日志

```java
private final LogWrapper logger = LogWrapper.getLogger(getClass());

// 打印并且入库
logger.info(true, "xxxxxxxxx");

// 只打印
logger.info( "xxxxxxxxx");

// 异常
logger.error(true, "运行时错误：{}", e, e.getMessage());
```

### API

- `getById`根据 id 获取日志详情

```java
@Autowired
LogService logService;

Long id = 123456789L;
SysLog sysLog = logService.getById(id);
System.out.println(JsonUtils.toJsonString(sysLog));
```

- 获取列表

```java
/**
 * 查询列表
 *
 * @param start
 *            开始页
 * @param size
 *            每页显示条数
 * @param queryParam
 *            查询条件，参数key 必须是驼峰命名。注意：startTime表示 请求开始时间，endTime表示请求结束时间。这两个值是固定筛选时间条件key。值必须是Date对象或者时间戳。其它查询条件都是eq
 * @param queryColumn
 *            查询字段集合，必须驼峰命名，如果该值为空则默认查询除了请求参数和响应参数外的其它字段。
 * @return 分页对象
 */
```

```java
@Autowired
LogService logService;

@Test
public void listLog() {
    Map<String, Object> param = Maps.newHashMap("endTime",new Date());
    param.put("userName", "admin");
    Map<String, Object> listPage = logService.listPage(0, 20, param, null);
    System.out.println(JsonUtils.toJsonString(listPage));
}
```

- `addLog`新增一条日志

```java
@Autowired
LogService logService;

OptLog optLog = OptLog.getOptLog(request, "l");
optLog.setFinishTime(LocalDateTime.now());
logService.addLog(optLog);
```

### 入库Sql建表语句
```sql
CREATE TABLE IF NOT EXISTS `sys_log`(`id` bigint NOT NULL COMMENT '主键',
             `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求IP地址',
             `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '日志类型， l: 登入，o：普通日志，e：异常',
              `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作人',
              `description` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作描述',
              `uri` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求地址',
              `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求类型',
              `params` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求参数',
              `result` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '返回值',
              `exception` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '异常描述',
              `start_time` datetime(0) NOT NULL COMMENT '开始时间',
              `finish_time` datetime(0) NOT NULL COMMENT '完成时间',
              `ua` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '浏览器',
              PRIMARY KEY (`id`) USING BTREE,INDEX `idx_start_time`(`start_time`) USING BTREE)
              ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
```