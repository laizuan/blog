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

### Bus 消息总线

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
