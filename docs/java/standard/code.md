<script setup>
import Preview from '../../components/Preview.vue'
</script>

## 环境准备

xxx 需要替换成真实的值。添加完环境变量之后记得重启电脑才能生效

- 固定自己的 IP 地址

- 添加环境变量

  1.  变量名称：NACOS_ADDR，变量值：http://discovery.leaderrun.com
  2.  变量名称：NACOS_PASSWORD，变量值：xxx
  3.  变量名称：NACOS_USERNAME，变量值：xxx

- 添加 hosts

```txt
xxx discovery.leaderrun.com
192.168.33.10 dev.leaderrun.org
自己主机固定IP地址 local.leaderrun.org
```

## 项目结构

请遵循一下项目结构规划，并注意文件名明门要求。如果项目中有划分小模块则应该在`dto、service、vo、command、mapper、controller`中加多一个小模块名称规划区分

以`用户中心`为例：

```bash

upm
├── upm-facade # 业务对象层，主要存放除数据库对象之外的其它业务对象(DTO、VO等)以及业务接口定义
│   ├── constants # 系统常量
│   ├── model # 业务传输对象
│   │   ├── command # 执行业务命令，比如新增数据、删除数据等。以Cmd结尾。如果有需要还可以进一步区分，比如XxxxAddCmd、XxxxUpdateCmd。
│   │   │   ├── query # 查询业务数据对象，以CmdQry结尾。如果有需要还可以进一步区分，比如XxxxGetCmdQry、XxxxListCmdQry
│   │   └── dto # 网络传输对象，http请求、服务之间数据交互。已DTO结尾
│   │   ├── enums # 枚举类型，以Enum结尾
│   │   ├── messaging # 消息队列传输对象。以MQ结尾
│   │   └── vo # 试图对象，以VO结尾
│   ├── service # 业务接口，请注意业务接口入参出参都不能包含数据库对象
├── upm-service # 具体业务实现层
│   ├── converter # 对象之间转换器
│   ├── core # 核心文件
│   │   ├── utils # 工具类
│   ├── entity # 数据库实体对象
│   ├── mapper # Mybatis Mapper 接口。以Mapper结尾
│   │   ├── xml # Mybatis xml 文件存放。文件名称必须是Mybatis Mapper 接口文件名
│   ├── mq # 消息队列和SpringEvent相关
│   │   ├── consumer # 服务之间交互接口文件，比如：openfeign的接口文件、MQ消费者
│   │   |   ├── dto # 接收数据对象定义，以DTO结尾。不要把系统交互结果对象定义在 facade 模块中
│   │   ├── event # Spring 事件对象。以Event结尾。
│   │   ├── producer # MQ消息生产者，包括SpringEvent生产者
│   ├── scheduler # 定时任务相关
│   ├── service # 对 facade 模块定义的接口实现
│   │   ├── impl # 业务实现
├── upm-web # 接口服务层
│   ├── controller # 控制器
│   │   ├── provider # 内部服务接口提供者
│   ├── core # 核心文件
│   │   ├── conf # 项目配置
```

## 阿里巴巴 Java 开发手册

遵循阿里巴巴 Java 开发手册标记为【强制】的代码风格。<Preview url="/images/java/java-alibaba-1.7.0.pdf" text="在线阅读"/>

## 领域模型

### 各层命名规约

#### Service/DAO 层方法命名规约

- 获取单个对象的方法用 get 做前缀。
- 获取多个对象的方法用 list 做前缀，复数结尾，如：`listObjects`。
- 获取统计值的方法用 count 做前缀。
- 插入的方法用 save/insert 做前缀。
- 删除的方法用 remove/delete 做前缀。
- 修改的方法用 update 做前缀。

#### 领域模型命名规约

- 数据对象：xxxDO，xxx 即为数据表名。
- 数据传输对象：xxxDTO，xxx 为业务领域相关的名称，一般作用于`RPC`调用或者是接口调用。
- 展示对象：xxxVO，xxx 一般为网页名称，一般作用于返回调用端数据。
- 前端表单数据提交对象：xxxForm，xxx 一般为业务领域相关的名称。用户前端用户表单提交数据接收
- 前端列表查询条件对象：xxxSearchForm，一般用户列表查询用户填写的查询条件对象
- POJO 是 DO/DTO/BO/VO 的统称，**禁止命名成 xxxPOJO**。

## 使用 Spring Event 对 **_聚合_** 业务解耦

在一个项目中进仓会有业务耦合的情况。拿常见的下单业务类解释，在下单业务逻辑中往往会包含`创建订单`、`扣减库存`等业务操作。通常在`OrderService`中会注入`StoreService`，然后调用库存方法来处理库存相关业务。这种情况就是业务耦合，我们在写代码的时候尽量避免这种情况的发送。可以通过`Spring Event`来对业务的解耦。

解耦改造伪代码示例：

```java
// 订单对象
public class Order {

}

public class DeductOrderStoreEvent extends ApplicationEvent {
   private final Order order;
   public DeductOrderStoreEvent(Object source, Order order) {
       super(source);
       this.order = order;
    }
}

// 订单业务层
public class OrderServiceImpl {
        @Autowired
        private OrderMapper orderMapper;

        @Autowired
        private LogMapper logMapper;

        @Autowired
        private ApplicationEventPublisher applicationEventPublisher;

    public void createOrder(Order order) {
        // 创建订单
        orderMapper.save(order);

        // 保存操作日志
        logMapper.save(...);

        // 发布扣减库存事件
        applicationEventPublisher.publishEvent(new DeductOrderStoreEvent(this, order));
    }
}

// 库存业务层
public class StoreServiceImpl implements ApplicationListener<DeductOrderStoreEvent> {

    public void deduct(Order order) {
        // ...
    }


	@Override
    public void onApplicationEvent(DeductOrderStoreEvent event) {
        this.deduct(event.getOrder());
    }
}
```

通过改造后，以后想要拆分库存和订单模块就会变得简单的多。当然上面的示例中还是有偶尔，那个就 Order 对象。其实我们可以把`Order`对象转换成`DeductOrderStoreEvent`对象，就可以实现完美解耦

在上面的示例中，举例了一个保存业务的操作。这里没有做解耦是因为他们是并存的关系（`这种关系只能是依赖日志的Mapper层，不能是日志的业务层`）。就像是`UML`中的`组合`和`聚合`的关系。举个更具体的例子，商品和商品属性，不应该把它拆分独立出来，他们是`组合关系`。我们讲的业务解耦是`聚合关系`。这一点需要区分开来

✍️✍️✍️ **好的代码`Service`层只会依赖`Mapper`层。不同业务之间相互依赖都应该引入对方的`Mapper`，否则都应该使用上述方案。**

## 对@Transactional 保持敬畏

很多时候我们写代码的时候设计到数据库操作直接在业务层方法上加上`@Transactional`然后一顿操作。很多时候这么做也没什么问题，但是如果这个方法比较耗时，这时候就危险了。

反例：

```java
public class Order {
    @Autowired
    private RestTemplate restTemplate;

    @Transactional(rollbackFor = Exception.class)
    public void createOrder(Order order) {
       	// 1：检查订单是否合法有效
        checkOrder(order);

        //:2：调用库存服务是否有剩余库存
        restTemplate.getForObject(url, order);

        //3：保存订单
        save(order);

        //4：记录日志
        save(log)
    }
}
```

在上面的例子中，第一步有复杂的校验，第二步通过`Http`调用了外部系统。这两步可能会导致这个事务太大，一个大事务轻则浪费数据库连接资源，重则拖垮整个服务。我们在写代码的时候需要格外注意**在开启事务之后做这种复杂计算或者调用外部资源操作**。如果有耗时操作最好的办法是使用编程式事务`TransactionTemplate`

正例：

```java
public class OrderService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TransactionTemplate transactionTemplate;

    public void createOrder(Order order) {
       	// 1：检查订单是否合法有效
        checkOrder(order);

        //:2：调用库存服务是否有剩余库存
        restTemplate.getForObject(url, order);

        transactionTemplate.executeWithoutResult(t -> {
             //3：保存订单
            save(order);

            //4：记录日志
            save(log)

            // 如果需要手动回滚事务
            t.setRollbackOnly();
        });
    }
}
```

### 事务的其它注意事项

- 如果我们只是单纯的查询一条数据，或者对`幻读`要求不高的查询完全可以不开启事务。如果要开启务必将事务设置成`只读`也就是`@Transactional(readOnly = true)`

- 对于`增删改`操作必须开启事务，并且需要设置回滚异常类型为`Exception`也就是`@Transactional(rollbackFor = Exception.class)`
- 不要去设置`@Transactional`中的`isolation`属性。把他交给数据库，除非你知道`RR`和`RC`这两种隔离级别的原理已经应用场景。
- 谨慎使用`@Transactional`中的`propagation`属性。默认值已经能满足我们大部分需求，如果使用`NESTED`/`REQUIRES_NEW`这两种事务传播类型，请先理解他们的原理已经副作用

## 数据一致性要警惕

在微服务中常常绕不开数据一致性，当然解决分布式事务的方法有很多，比如使用分布式事务中间件。引入分布式事务造成系统的复杂性大幅提高和可以用性和性能下降。

比如新增订单场景，在订单服务新增完成后调用库存服务，通常情况我们会在一个事务中去调用接口，把调用接口放在最后面，当接口发生异常可以回滚订单服务的数据。伪代码如下：

```java
public class Order {
    @Autowired
    private RestTemplate restTemplate;

    @Transactional(rollbackFor = Exception.class)
    public void createOrder(Order order) {
        //保存订单
        save(order);

        // 调用库存服务扣减库存
        restTemplate.getForObject(url, order);
    }
}
```

这段代码看似没问题，其实可能会造成数据不一致。因为`createOrder`方法执行完成之后才会执行`save order`提交事务方法，如果你在插入的时候 SQL 在数据库执行过程中发生异常，那么调库存服务的数据是不会回滚的。

其实这样的场景有很多。比如发送 MQ，保存数据失败但是 MQ 发送出去了。再比如用户注册发短信，没有注册成功短信发送出去了等等都会造成数据不一致。

**我们在开发过程中，如果有涉及多个系统之前数据交互的都需要注意数据一致性问题**

对于这个问题我们可以使用以下方法来**最大限度**的降低数据一致性问题，注意并不能完全解决。

```java
public class Order {
    @Autowired
    private RestTemplate restTemplate;

    @Transactional(rollbackFor = Exception.class)
    public void createOrder(Order order) {
        //保存订单
        save(order);

        TransactionSynchronizationManager.registerSynchronization(
              new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                   // 调用库存服务扣减库存
        			restTemplate.getForObject(url, order);
                }
        });
    }
}
```

我们可以通过监听事务提交完成后来做一些事情，需要注意的时候，如果调用库存服务失败是**不会回滚事务**的。这是你需要记录下日志人工排查，重新发送。

如果你使用了`ApplicationEvent`来解耦业务，也可以使用`@TransactionalEventListener`替代`@EventListener`，他支持`@EventListener`的所有功能以及`TransactionSynchronizationManager`的功能。不过你需要注意`fallbackExecution`的使用，默认是`false`即没有事务的时候该事件不执行
