## MessageQueue 消息监控

监听 MQ 消息消费失败或者发送消息失败，可以通过管理页面重试消费或者重发消息。理论上支持所有 MQ，但只在`RocketMQ`场景测试过。

**前提条件必须使用`@MessageQueueListener`方式来消费消息**

::: warning 提示

- 重试消费和重发消息不能保证一定是成功的。如果重试之后没有多出一条相同的异常数据则表示消费成功了。数据可能会延迟，可以登上几秒后在查询列表数据
- 重试消费的时候需要注意重复消费问题，如果使用了`idempotentConsumer`来保证消息幂等和顺序消费，需要注意是否幂等消费拦截。如果是需要清空缓存中的幂等 Key
  :::

### 依赖

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>business-mq-monit</artifactId>
    </dependency>
```

### 属性

| **字段**                  | **说明**         | **默认值** | **可选值** |
| ------------------------- | ---------------- | ---------- | ---------- |
| leaderrun.mqmonit.enabled | 是否启用多数据源 | true       |            |

### Sql

```sql
CREATE TABLE `sys_mq_fail`  (
  `id` bigint NOT NULL COMMENT '主键',
  `custom_message_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '自定义主键',
  `tags` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息标签',
  `topic` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '主题',
  `message_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息ID',
  `message_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'MQ生成的ID',
  `message_create_time` datetime NULL DEFAULT NULL COMMENT '消息创建时间',
  `headers` json NULL COMMENT '消息头',
  `payload` longblob NULL COMMENT '消息体',
  `ex_content` longblob NULL COMMENT '异常内容',
  `fail_flag` bit(1) NOT NULL COMMENT 'true消费端异常，false生成端异常',
  `retry` smallint NOT NULL COMMENT '手工重试次数',
  `last_retry_status` bit(1) NOT NULL COMMENT '最后一次重试状态，true成功，false失败',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
```

### 控制器参考代码

```java

/**
 *
 *MQ生产者或者消费者异常记录控制器
 * @author laizuan
 * @version 1.0
 * @since 2023/11/30
 */
@RestController
@RequiredArgsConstructor
@RequestMapping(GlobalConst.VERSION_1 + "/mq")
public class SysMqFailController extends BaseController<SysMqFailService> {

    /**
     * 获取MQ生产者或者消费者异常记录详情
     *
     * @param id MQ生产者或者消费者异常记录主键
     * @return MQ生产者或者消费者异常记录
     */
    @GetMapping(value = "/{id}/get")
    @PreAuthorize("hasAuthority('sys:mq:dtl')")
    public SysMqFailVO get(@PathVariable @HashId Long id) {
        return baseService.findById(id);
    }

    /**
     * 删除MQ生产者或者消费者异常记录
     *
     * @param id MQ生产者或者消费者异常记录主键
     * @return 删除状态。true表示修改成功，false表示修改失败
     */
    @GetMapping(value = "/{id}/delete")
    @PreAuthorize("hasAuthority('sys:mq:dtl')")
    public boolean delete(@PathVariable @HashId Long id) {
        return baseService.delete(id);
    }

    /**
     * 重新发送mq消息
     * @param id 消息主键
     */
    @PostMapping("/{id}/retry")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('sys:mq:retry')")
    public void retry(@PathVariable @HashId Long id) throws Exception {
        baseService.retry(id);
    }

    /**
     * MQ生产者或者消费者异常记录列表
     *
     * @param query 查询条件
     * @return MQ生产者或者消费者异常记录列表集合
     */
    @PostMapping(value = "/page")
    @PreAuthorize("hasAuthority('sys:mq:dtl')")
    public BasePage<SysMqFailVO> page(@RequestBody SysMqFailListCmdQry query) {
        return baseService.page(query);
    }
}
```

### 前端代码

[可视化参考代码](https://github.com/LeaderrunTeam/cm-web/tree/dev/src/views/sys/mq)
