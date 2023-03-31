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

​ 参数含义：

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
            userAuth-in-0:
              consumer:
                subscription: userAuth
                messageModel: BROADCASTING # 定义为广播类型，默认是集群消费。广播类型的时候组下面的所有消费者都可以拿到消息
        bindings:
          apiRule-in-0:
            destination: upm #消费的主题
            group: ${spring.application.name}-apiRule # 应用名称 + 消费者方法
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
