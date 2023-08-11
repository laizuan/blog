## 消息队列

引入依赖后拥有 `SpringCloud Stream` 和 `SpringCloud Bus`能力

### 依赖

```xml
  <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-mq-starter</artifactId>
  </dependency>
```

### MessageQueue 消息队列

每个系统统一使用一个`Topic`来发送，如果需要区分消息类型使用`Tags`来区分。默认的系统`Topic`为`系统代码-out-0`

### 属性配置

| 字段名称                                        | 说明                                                          | 默认值                                        |
| ----------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------- |
| `leaderrun.mq.auto-registry`                    | 是否开启扫描注解自动注册。关闭之后`@MessageQueueListener`无效 | true                                          |
| `leaderrun.mq.auto-create-producer`             | 是否自动创建默认的发送者。                                    | true                                          |
| `leaderrun.mq.open-send-completion-interceptor` | 是否开启发送消息失败拦截                                      | true                                          |
| `leaderrun.mq.producer.name`                    | 默认发送的主题名称                                            | `${spring.application.name}`                  |
| `leaderrun.mq.producer.group`                   | 默认发送主题的生产者组别名称                                  | `${spring.application.name} + "-" + "group"}` |
| `leaderrun.mq.producer.messageQueueSelector`    | 发送到那个队列算法 bean 名称                                  | `orderlyMessageQueueSelector`                 |

### 注解配置 <Badge type="tip" text="^2.2.3" />

框架版本从`2.2.3`开始，可以使用注解的方式类配置消息队列。

:::warning

注意一个消费者不能即用配置文件方式配置又使用了注解方式配置

:::

`@MessageQueueListener`可以用在类上或者是方法上面

| 字段名称                         | 说明                                                                                                                                                                    | 默认值       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| consumerGroup                    | 相同角色的消费者需要具有完全相同的订阅和 consumerGroup 才能正确实现负载平衡。并且需要是唯一的。如果不配置默认：`${spring.application.name} + "-" + beanName + "-group"` |              |
| topic                            | 订阅的主题                                                                                                                                                              |              |
| subscription                     | 订阅的消息多个 TAG 可以使用`\|\|`隔开。支持 Tag 和 SQL 混搭。例如：`  sql:(clientId = 'leaderrun' and (TAGS is not null and TAGS = 'recpt'))`                           |              |
| messageModel                     | 消费模式                                                                                                                                                                | `CLUSTERING` |
| errorHandlerBeanName             | 当该消息消费时出现异常的回调方法 bean 的名称，如果不配置使用全局的拦截器                                                                                                |              |
| `push.orderly`                   | 控制消费模式，您可以选择并发或有序接收消息。<br/>如果你的消息需要控制消费顺序，请设置成 true，否则设置成 false 提高消费速度                                             | false        |
| `push.maxReconsumeTimes`         | 一个消息如果消费失败的话，最多重新消费多少次才投递到死信队列. 默认 1 次                                                                                                 | 1            |
| `push.delayLevelWhenNextConsume` | 消息消费重试策略。<br />-1，不重试，直接放入 DLQ<br/>0 ，由 broker 控制频率<br/>>0，客户端控制重试频率                                                                  | -1           |

如果是用在类上需要继承`MessageEventListener`并实现`onMessage`接口。**注意：如果使用在类上整个类只能有一个方法，除了类构造器**

```java
  @Bean
  @MessageQueueListener(
      topic = Constant.SYSTEM_CODE_OM,
      subscription = "cust-in-sub",
      push = @Push(orderly = true))
  public Consumer<Message<CustomsDTO>> factorySubmitOrder() {
    return idempotentConsumer(
        message -> {
         ...
        },
        "");
  }
```

### 生产者

- 配置

  以用户中心为例

  ```yaml
  spring:
    application:
      name: upm
    cloud:
      stream:
        rocketmq:
          bindings:
            upm-out-0:
              producer:
                producer: ${spring.application.name}-group
                messageQueueSelector: orderlyMessageQueueSelector
        bindings:
          upm-out-0:
            destination: ${spring.application.name}
            group: ${spring.application.name}-group
  ```

- 使用示例

  `sendDefaultTopic`方法可以发送到默认的主题，即：`系统代码-out-0`。如果要发送其它主题可以使用`send`方法

  - 顺序消息

    消息有序，指的是一类消息消费时，能按照发送的顺序来消费。例如：一个订单产生了三条消息分别是订单创建、订单付款、订单完成。消费时要按照这个顺序消费才能有意义。否则有可能会先消费订单完成在消费订单付款

    如果要发送顺序消息，需要传`id`参数

    **一般情况下设计到状态流转的数据都需要顺序消费**

  ```java
  @Autowired
  private MessageQueueTemplate messageQueueTemplate;

  messageQueueTemplate.sendDefaultTopic("rule", "om"); // 发送tags为rule的消息，消息内容为om
  ```

参数含义：

    ```java
      /**
       * 发送消息
       *
       * @param bindingName 需要发送到的topic
       * @param tags tag
       * @param data 需要发送的数据
       * @param id 顺序消费时候数据唯一ID，相同的ID才能实现顺序消费
       * @param level 延迟消息，配置延迟等级
       * @param outputContentType 输出的消息类型，默认json
       * @param headers 配置请求头
       * @return 是否发送成功
       * @param <T> 数据类型
       */
    ```

### 消费者

- 配置

  ```yaml
  spring:
    cloud:
      stream:
        function:
          definition: apiRule;userAuth #定义消费者方法,多个使用分号隔开
        rocketmq:
          bindings:
            apiRule-in-0: # -in-0 是固定的，前缀是消费者方法
              consumer:
                subscription: rule #定义tags名称，如果要消费多个消费者用 || 隔开
                push:
                  orderly: true #消费者顺序消费，不需要顺序消费的切记去调，提高消费速度
                  delayLevelWhenNextConsume: -1 # 处理消息抛出异常重试策略。默认会重试16次后进入死信队列。可以设置成-1，异常不重试直接进入死信
            userAuth-in-0:
              consumer:
                subscription: userAuth
                messageModel: BROADCASTING # 定义为广播类型，默认是集群消费。广播类型的时候组下面的所有消费者都可以拿到消息
        bindings:
          apiRule-in-0:
            destination: upm #消费的主题
            group: ${spring.application.name}-apiRule # 应用名称 + 消费者方法
            consumer:
  	          max-attempts: 1 #消费异常时不重复消费。这是Spring的重试机制，非MQ重试。如果不设置它会重试3次
          userAuth-in-0:
            destination: upm
            group: ${spring.application.name}-userAuth
  ```

- 使用示例

  消费者的方法名称必须和上面配置保持一致。并且需要能被`Spring IOC`托管

  ```yaml
    @Bean
    public Consumer<Message<String>> apiRule() {
      return msg -> {
        String systemCode = msg.getPayload(); # 获取消息体
        log.info("apiRule -> {}", systemCode);
      };
    }

    @Bean
    public Consumer<Message<String>> userAuth() {
      return msg -> {
        String userId = msg.getPayload();
        log.info("userId -> {}", userId);
      };
    }
  ```

- **幂等消费处理**

  RocketMq 并不能保证消息幂等，可以使用`BaseConsumer#idempotentConsumer()`来处理。必须要在配置文件中配置`delayLevelWhenNextConsume=-1`否则没有什么意义。具体可以查看`idempotentConsumer`方法描述

  `idempotentConsumer`它已经处理了顺序消费问题，通过分布式锁来实现。**前提是你使用了`MessageQueueTemplate`来发送顺序消息**。

  ```java
  @Component
  public class CustomsConsumer extends BaseConsumer {
    private final LogWrapper log = LogWrapper.getLogger(this.getClass());


    public CustomsConsumer(RedisService redisService) {
      super(redisService);
    }

    @Bean
    public Consumer<Message<CustomsCmd>> factorySubmitOrder() {
      return idempotentConsumer(
          message -> {
           .....
          },
          "处理工厂提交的报关数据消息");
    }
  }
  ```

## Bus 消息总线

一般用于服务集群所有节点通知，比如通知集群中所有节点清空缓存在

以用户中心字典数据更新为例：在页面更新字典数据之后通知所有节点清空缓存

如果你的服务是单机应用可以直接使用`ApplicationEvent`而不需要使用更加笨重的`RemoteApplicationEvent`

- 定义事件

注意继承的是`RemoteApplicationEvent`，它和`ApplicationEvent`是区别是前者用于集群内部通知，后者用户服务内部通知通常用于程序解耦等

```java

/**
 * 字典变更通知
 *
 * @author laizuan
 * @version 1.0
 * @since 2023/2/28 23:25
 */
@Getter
public class DictEvent extends RemoteApplicationEvent {
    /**
     * 变革的字典类型
     */
    private  String dictType;

    /**
     * true表示字典类型变更，false表示字典数据变更
     */
    private  boolean isTypeChange;

    /**
     * 是否删除数据，true：删除数据、false：更新数据
     */
    private  boolean isDelete;

    /**
     * {@link #isTypeChange 为false的时候有值}
     */
    private  String dataValue;

    public DictEvent(){}

    public DictEvent(Object source, String originService, Destination destination, String dictType,
        boolean isTypeChange, boolean isDelete, String dataValue) {
        super(source, originService, destination);
        this.dictType = dictType;
        this.isTypeChange = isTypeChange;
        this.isDelete = isDelete;
        this.dataValue = dataValue;
    }
}
```

- 定义消息生产者

```java

/**
 *
 * 字典数据更新后通知集群节点清空服务
 *
 * @author laizuan
 * @version 1.0
 * @since 2023/2/28 23:22
 */
@Component
@RequiredArgsConstructor
public class DictProducer {
    private final AbstractBusProducer busProducer;

    public void dictChangeMessage(String dictType, boolean isTypeChange, boolean isDelete, String dataValue) {
        busProducer.publishEvent(new DictEvent(this, busProducer.getBusId(),
            busProducer.selfDestinationService(), dictType, isTypeChange, isDelete, dataValue));
    }
}
```

- 定义消费者

```java

/**
 *
 * 监听字典更新时间，清空缓存
 *
 * @author laizuan
 * @version 1.0
 * @since 2023/2/21 11:16
 */
@Component
@RequiredArgsConstructor
public class DictChangeConsumer  {
    private final LogWrapper log = LogWrapper.getLogger(this.getClass());
    private final DynamicEnumServiceImpl dynamicEnumService;

    private void clearCache(String dictType, boolean typeChange, boolean delete, String dataValue) {
        if (StringUtils.hasText(dataValue)) {
            dynamicEnumService.clearByType(dictType, dataValue);
        } else if (typeChange && delete) {
            dynamicEnumService.clearByAll();
        }
        if (typeChange) {
            dynamicEnumService.clearByType(dictType);
        }
    }

    @EventListener
    public void execute(DictEvent message) {
        log.info("[execute][收到 Dict 刷新消息]");
        clearCache(message.getDictType(), message.isTypeChange(), message.isDelete(), message.getDataValue());
    }
}
```

- 使用

```java

@Service
@RequiredArgsConstructor
public class SysDictServiceImpl implements SysDictService {
    private final DictProducer dictProducer;

  public void updateDict() {
      dictProducer.dictChangeMessage()
  }
}
```
