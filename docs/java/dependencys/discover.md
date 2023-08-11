## 服务注册

支持服务延迟注册以及手动下线

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-discovery-starter</artifactId>
    </dependency>
```

### 属性

| 字段名称                                | 说明                                                         | 默认值 |
| --------------------------------------- | ------------------------------------------------------------ | ------ |
| `leaderrun.discovery.deferred-registry` | 是否延迟注册服务到注册中心。必须是`spring.cloud.discovery.registerEnabled`的时候才生效 | true   |
| `leaderrun.discovery.grayTags`          | 灰度标签，键值对模式                                         | -      |

### 手动下线

调用接口后会将当前服务从注册中心注销

- URI

  `/discovery/deregister-instance`

- METHOD

  `GET`
