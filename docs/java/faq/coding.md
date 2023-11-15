# 常见问题

## Mapstruct 类型和名称都对但是没转换

举例

```java{2,4}
public class B {
  private String name;
  public boolean hasName() {
    return false;
  }
}

public class A {
  private String name;
}
```

上述的例子`B`转成`A`的时候`name`字段是不能转换成功的，`Mapstruct`在转换`name`的时候会先调用`hasName`方法，如果方法返回`true`者转换，否则会置空

:::warning
`Mapstruct`转换的实体 `has` 方法后面不能和属性名称一样，否则它会先调用 `has` 方法，在根据返回值来判断是转换还是置空
:::

[问题描述以及解决方案](https://stackoverflow.com/questions/42295252/force-mapstruct-not-to-call-has-methods)

## Validation 注解没有生效问题

- 检查方法名是否以`get || has || is`开头。下面的代码段就会导致`@AssertTrue`失效

```java

@AssertTrue(message = "xxxx")
public boolean name() {
  return name != null
}

```

- 检查在需要校验的实体前面是否使用了`@Valid` 或者 `@Validated`注解
- 校验注解中如果添加了 `group` 属性，在校验实体前面需要使用 `@Validated`注解并且需要加上 `group` 的属性
- 校验集合参数的实体。需要使用`@Validated`和`@Valid` 注解配合使用才能生效。如下方代码段

```java
public class A {
  ....
}

@Validated
public class Test {

  public void batchSave(@Valid List<A> a) {

  }

}
```

## 乐观锁更新数据失败

我们在使用乐观锁更新数据的时候框架会自动将 `version + 1` 作为更新语句条件，如果一个事务中多次更新数据，`version` 不变的情况下就会导致乐观锁更新失败问题。

示例：一次事务中有两次更新 `order` 表数据，都带上了 `version` 字段更新

```sql
// 第一次更新前查询了最新的版本号出来。版本号是8
select t.version from order t where t.id = 479639668122501

// 第一次更新，version变成了9
UPDATE order SET ..., version=9 WHERE id=479639668122501 AND version=8

// 忽略很多其它无关SQL
......


// 这里又做了一次更新，因为version还是旧的数据，也就是version=8。执行下面语句的时候就会导致更新失败，其实最新version应该是9不是8
UPDATE order SET ..., version=9 WHERE id=479639668122501 AND version=8
```

如果一次事务中多次更新数据，需要注意 `version` 是否最新的。如果有多次更新最好是更新前做一次查询获取最新的 `version`。当然你也可以自行 `version + 1`
