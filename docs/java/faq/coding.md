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
