## 缓存

- 实现内存缓存，redis 缓存以及将内存作为以及缓存 redis 作为二级缓存的多级缓存实现。通过 redis 的 pub/sub 来清空各个主机中的内存缓存

- 如果是 redis 或者多级缓存支持每个缓存空间自定义失效时间，如果没设置则使用默认的全局失效时间。规则`缓存空间名称#时间和单位`，使用`#`分割，前半段是缓存空间名称，后半段是时间和单位，最后一位必须是时间单位，支持：`d:天，h:小时，m:分钟，s:秒`

  ```java
  // 示例：这个示例标识这个缓存空间的失效时间的12天。
  @CacheConfig(cacheNames = "SysUser#12d")
  ```

### 依赖

```xml
<dependency>
    <groupId>org.seedltd</groupId>
    <artifactId>seedltd-cache-starter</artifactId>
</dependency>
```

如果需要使用 redis 作为缓存那么你需要引入它

```xml
<dependency>
    <groupId>org.seedltd</groupId>
    <artifactId>seedltd-redis-starter</artifactId>
</dependency>
```

### 属性

| **字段**                              | **说明**                                                     | **默认值** | **可选值**                    |
| ------------------------------------- | ------------------------------------------------------------ | ---------- | ----------------------------- |
| seedltd.cache.enabled                 | 是否启用 redis 配置                                          | true       | -                             |
| seedltd.cache.cacheNullValues         | 是否存储空值，默认 true，防止缓存穿透                        | true       | -                             |
| seedltd.cache.type                    | 缓存类型，redis: redis 缓存，memory：内存缓存，multiple：多级缓存，先读 memory 在读 redis。默认：multiple | `multiple` | `multiple`、`redis`、`memory` |
| seedltd.cache.defaultExpiration       | 全局过期时间，单位：分钟，0 不过期。默认 7 天                | 10080      | -                             |
| seedltd.cache.cachePrefix             | 缓存 key 的前缀                                              | `cache`    | -                             |
| seedltd.cache.memory.expireAfterWrite | 写入后过期时间，单位分钟。多级缓存下默认是 30 分钟，内存缓存设置该值无效，使用`{@link CacheConfigProperties#getDefaultExpiration()} }`。如果使用多级缓存这个值不能超过自定义的值。 | 30         | -                             |
| seedltd.cache.memory.initialCapacity  | 初始化缓存大小                                               | 256        | -                             |
| seedltd.cache.memory.maximumSize      | 最大缓存对象个数，超过此数量时之前放入的缓存将失效           | 10240      | -                             |
| seedltd.cache.dbClear                 | 是否开启缓存延迟双删，memory模式下无效                       | true       | -                             |
| seedltd.cache.delayTime               | 延迟删除时间，单位毫秒。                                     | 1000       | -                             |

### 手动删除缓存

注意：如果有自定义失效时间那么在获取缓存空间的时候需要把`#1h`这个东西去掉

```java
@Autowired
private CacheManager cacheManager

// 删除一个key
cacheManager.getCache("@CacheConfig 的 cacheNames 名称，例如：SysUser").evict("数据key");
```
