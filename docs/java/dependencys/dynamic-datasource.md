## 多数据源

通过`@DB`注解来动态第切换数据库数据源。没有标记注解默认走主数据源查询，主数据源通过`spring.datasource`配置。其它的数据源通过下面的属性来配置

::: warning 提示

同一个事务中不建议调用多个数据源修改数据，会有数据一致性问题。查询不受影响

:::

### 依赖

```xml
 <dependency>
   <groupId>com.leaderrun</groupId>
   <artifactId>leaderrun-dynamic-datasource-starter</artifactId>
 </dependency>
```

### 属性

| **字段**              | **说明**                                                                             | **默认值** | **可选值** |
| --------------------- | ------------------------------------------------------------------------------------ | ---------- | ---------- |
| leaderrun.dds.enabled | 是否启用多数据源                                                                     | true       |            |
| leaderrun.dds.targets | 键值对数据源配置，`@DB`的 value 就是这里的`Key`。value 和`spring.datasource`保持一致 | -          |            |
