## 间隔重试组件

重试组件主要运用在在最大程度保证业务执行成功。多用于推送数据给第三方等场景

它主要原理是使用`RocketMQ`的延时消息来实现，配合`Redis`存储需要处理的数据。并且它能保证同一个业务数据能顺序执行

默认情况下如果第一次尝试处理业务失败，则会最多重试6次，剩下六次重试的频率为：30s、1m、5m、10m、30m、1h

### Maven 依赖

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-retry-starter</artifactId>
    </dependency>
```

### 属性

| **字段** | **说明** | **默认值** | **可选值** |
| -------- | -------- | ---------- | ---------- |
| -        | -        | -          | -          |

### 使用

#### 新增一条任务

新增的任务会马上执行，如果执行返回`false`会进入重试阶段

:::warning 注意

如果自定义消息头的时候Key需要是`CMQ_`开头，否则重试的时候将拿不到自定义头的数据。推荐通过`intervalRetryTemplate.getHeaderKey('xxxx')`来获取符合条件的`Key`

:::

```java
		private final IntervalRetryTemplate intervalRetryTemplate;


        Map<String, Object> headers = Maps.newHashMapWithExpectedSize(1);
        headers.put("CMQ_CUSTOMS_CODE", customerCode);

        intervalRetryTemplate.addPushTask(GlobalConstant.MQ_PUSH_BOOKING_TAG, asnNo, "我是一个数据", headers);
```

#### 消费

:::warning 警告

不管使用哪种方式实现需要注意几点：

- 执行业务逻辑的时候自行处理并记录好异常，建议只返回`true`或`false`。如果直接抛出异常可能导致同一订单不会进行顺序重试

- 如果重试达到阈值就不会在执行，框架会打印如下日志。并且数据只会保留7天，可以通过`dataId`在`Redis`中找到

  ```txt
  log.error(
          "&&&& 重试超过 {} 次没有成功。不再进行重试。MessageId: {}, DataId: {},  data: {}",
          retryCount,
          msgId,
          dataId,
          data);
  ```

:::

第一种通过`@MessageQueueListener`注解来实现 **(推荐使用这种方式来处理)**

```java
   @Bean
   @MessageQueueListener(topic = "edi", subscription = GlobalConstant.MQ_PUSH_BOOKING_TAG,
           push = @MessageQueueListener.Push(orderly = false)// 这里必须设置成false)
   public Consumer<Message<String>> onNotifyFlexport() {
       return message -> {
           intervalRetryTemplate.onStreamMessagePush(data -> {
               try {
                  // 执行你的业务逻辑
                  // 执行成功返回true则不会进行重试
                  // 如果返回false框架会自动判断是否需要进入重试。如果没有达到重试阈值会进入重试
               } catch (Throwable e) {
                  // 建议自行处理异常，尽可能的返回false而不是异常。否则可能导致同一订单不会进行顺序重试
                  log.error("MessageId: %s, 推送 %s Booking 回执异常：%s".formatted("msgId", "customerCode", e.getMessage()), e);
                  return false;
               }
           }).apply(message);
       };
```


第二种通过继承`AbstractMessageListenerConcurrently`来实现

:::warning 注意

`AbstractMessageListenerConcurrently`或者`Message`的泛型类型只能是`String`，他代表的是创建任务时候传入值的关联ID

:::

```java
@Component
public class PushBookingReceiptTaskConsumer extends AbstractMessageListenerConcurrently<String> {
    private final Map<String, PublishReceiptService> publishReceiptServiceMap;
    private final IntervalRetryTemplate intervalRetryTemplate;


    @Override
    public boolean onMessage(MessageExt msgs, ConsumeConcurrentlyContext context, String dataId) {
        String customerCode = msgs.getProperty("CMQ_CUSTOMS_CODE");
        PublishReceiptService publishReceiptService = publishReceiptServiceMap.get(customerCode);
        if (publishReceiptService == null) {
            return true;
        }
        String msgId = msgs.getMsgId();

        return intervalRetryTemplate
                .onNativeMessagePush(data -> {   // 这里的data就是创建任务时的传入的值
                    try {
                        if (publishReceiptService.publishBookingReceipt(data)) {
                            return true;
                        }
                    } catch (Throwable e) {
                        log.error(
                                "MessageId: %s, 推送 %s Booking 回执异常：%s".formatted(msgId, customerCode, e.getMessage()),
                                e);
                    }
                    return true;
                })
                .apply(msgs, id);
    }
}
```


### 依赖

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-mq-starter</artifactId>
      <scope>compile</scope>
    </dependency>

    <dependency>
      <groupId>org.redisson</groupId>
      <artifactId>redisson</artifactId>
      <scope>compile</scope>
    </dependency>
```
