## Redis

```java
@Autowired
private RedisService redisService;
```

### 属性

| **字段**                          | **说明**                     | **默认值** | **可选值** |
| --------------------------------- | ---------------------------- | ---------- | ---------- |
| seedltd.redis.enabled             | 是否启用 redis               | true       | -          |
| seedltd.redis.defaultCacheNullVal | 是否缓存null值，防止缓存穿透 | false      | -          |

### 依赖

```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-json</artifactId>
  </dependency>
```
