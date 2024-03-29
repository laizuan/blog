# seedltd-common-core

[[TOC]]

## Maven 依赖

```xml
<dependency>
  <groupId>org.seedltd</groupId>
  <artifactId>seedltd-common-core</artifactId>
</dependency>
```

## FAQ

### 配置`seedltd.*`属性配置无效

这个属性是配置到`application-base.yml`启动项目的时候请确保`base`是优先加载的，这样你定义的属性才能覆盖掉底层的配置文件。

例如：

```yaml
spring:
  profiles:
    active: dev
    group:
      dev: base,development
```

请不要在`application.yml`中覆盖`application-base.yml`内置配置，因为前者的优先级更高，导致后者会覆盖掉前者。最好的处理方式是在`development`中配置达到覆盖的目的

## 内置模块

| 名称                          | 说明         | 默认值 | 版本 |
| ----------------------------- | ------------ | ------ | ---- |
| [seedltd.xss](#XSS)           | xss 过滤配置 |        |      |
| [seedltd.logging](#日志)      | 日志配置     |        |      |
| [seedltd.datasource](#数据源) | 数据源配置   |        |      |

## 数据源

可以使用`spring.datasource`配置来覆盖掉默认配置，它和系统的`seedltd.datasource`的属性是互斥的。前提条件是你引用了`base`配置文件

### 属性说明

| 类型    | 名称                                 | 说明                                                    | 默认值                             | 版本 |
| ------- | ------------------------------------ | ------------------------------------------------------- | ---------------------------------- | ---- |
| Boolean | seedltd.datasource.enabled           | 是否启用数据源。如果不需要使用数据库操作请设置成`false` | true                               |      |
| String  | seedltd.datasource.host              | 数据库 IP 地址                                          | 127.0.0.1                          |      |
| String  | seedltd.datasource.port              | 端口号                                                  | 3306                               |      |
| String  | seedltd.datasource.database-name     | 数据库名称                                              |                                    |      |
| String  | seedltd.datasource.username          | 数据库用户名                                            | root                               |      |
| String  | seedltd.datasource.password          | 数据库密码                                              | root                               |      |
| String  | seedltd.datasource.driver-class-name | 数据库驱动                                              | com.mysql.cj.jdbc.Driver           |      |
| String  | seedltd.datasource.type              | 数据源                                                  | com.zaxxer.hikari.HikariDataSource |      |

## 日志

系统内置 `logback-spring.xml` 配置， 可以通过`seedltd.log.config-file-path`来指定你的日志配置文件。

### 属性说明

| 类型    | 名称                         | 说明                                                             | 默认值                                | 版本 |
| ------- | ---------------------------- | ---------------------------------------------------------------- | ------------------------------------- | ---- |
| String  | seedltd.log.config-file-path | 指定日志配置文件，如果不想使用内置的配置文件可以通过这个值来重置 | classpath:log/base-logback-spring.xml |      |
| String  | seedltd.log.base-path        | 日志文件存放地址基础路径                                         | `./logs`                              |      |
| String  | seedltd.log.max-size         | 日志文件最大字节数，超过备份当前日志文件，再重启一个新的日志文件 | 100MB                                 |      |
| Integer | seedltd.log.max-history      | 日志最大保留多少天                                               | 15                                    |      |

### Sql 日志

#### 第一步：添加 Maven 依赖

```xml
<dependency>
  <groupId>p6spy</groupId>
  <artifactId>p6spy</artifactId>
</dependency>
```

#### 第二步：配置数据库连接

```yaml
seedltd.datasource.driver-class-name=com.p6spy.engine.spy.P6SpyDriver
```

完成。**注意：这个插件对数据库性能有影响，不建议用在生产环境**

## XSS

- 说明

防止脚本注入攻击

- 属性

| 类型           | 名称                    | 说明                                                                                  | 默认值            | 版本 |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------- | ----------------- | ---- |
| boolean        | seedltd.xss.enabled     | 是否开启 xss 脚本过滤                                                                 | false             |      |
| `List<String>` | seedltd.xss.urlPatterns | 需要拦截的接口地址，支持`*`号匹配。如果开启之后没有配置该属性那么将会拦截处理所有请求 |                   |      |
| `List<String>` | seedltd.xss.whiteUrl    | 白名单地址，如果有项目名需要加上                                                      |                   |      |
| Integer        | seedltd.xss.order       | 过滤执行优先级                                                                        | Integer.MAX_VALUE |      |

## 系列化和反序列化

基于自身业务定义了一些通用的注解来简化开发

### 时间

系统所有时间类型都会转成时间戳，可以使用`@JsonFormat`来格式化你的时间

`LocalDateTime` 反序列化支持字符串格式：

```txt
秒和毫秒时间戳
yyyy-MM-dd
yyyy-MM-dd HH
yyyy-MM-dd HH:mm
yyyy-MM-dd HH:mm:ss
yyyy-MM-dd HH:mm:ss.SSS
yyyy-MM-dd HH:mm:ss.SSSSSS
yyyyMMdd
yyyyMMddHHmmss
yyyyMMddHHmmssSSS
yyyy-MM-dd'T'HH:mm:ss'Z'
yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
yyyy-MM-dd'T'HH:mm:ss+0800
yyyy-MM-dd'T'HH:mm:ss+08:00
yyyy-MM-dd'T'HH:mm:ss.SSS+08:00
```

### `@HashId` Long 类型值混淆

可以将 Long 类型的值混淆成字符串，从而加固值的安全性。一般用于防止暴力攻击或者随机猜测风险。比如数据库主键，返回前端是明文容易猜测到下一个 ID 值。

从`2.1.0`版本之后所有数据库主键都需要包含该注解，其它 Long 类型需要混淆也使用。内部会自动的系列化成混淆的字符串返回和自动反序列化前端传值成`Long`值。

注解可以填加载字段和方法或者参数中。

- 注意事项

  - 数值不能超过`9007199254740992L`

  - 暂时不支持接收`application/json`(`JSON数组`)参数反序列化。如下代码，你将得到字符串转 Long 的异常。

    ```java
      @PostMapping("/t/1")
      public void t(@RequestBody @HashId List<Long> ids) {
        ids.forEach(s -> logger.info("-------{}", s));
      }
    ```

    推荐做法，使用` application/x-www-form-urlencoded`form 表单的形式来提交数据

    ```java
      @PostMapping("/t/2")
      public void t2(@RequestParam("ids") @HashId List<Long> ids) {
        ids.forEach(s -> logger.info("-------{}", s));
      }
    ```

### `@DynamicEnum` 动态枚举注解

动态数据转换成枚举 json 字符串，需要转换的值类型尽量避免使用基本数据类型，防止 null 的时候序列化异常。注意：需要实现`DynamicEnumService`接口，该接口接收 3 个参数：

| 类型       | 名称           | 说明                                                                                                                                                                                               | 默认值 | 版本 |
| ---------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| String     | type           | DynamicEnum.type 类型，可以是数据字典类型                                                                                                                                                          |        |      |
| `String[]` | attached       | DynamicEnum.attached, 附加值，原路返回的值                                                                                                                                                         |        |      |
| String     | localData      | 本地数据集合。value:desc 格式，多个使用英文逗号隔开。当{@link #type()}是空的时候，会使用该属性的值做解析，value 表示当前字段的值。示例：`1:启用,0:禁用`。**注意顺序，必须是 value 在前 desc 在后** |        |      |
| String     | writeFieldName | 系列化字段名称，默认字段名称后面加上 Enum                                                                                                                                                          |        |      |

示例：

```java
public class Test {
    @DynamicEnum(type = "enable_status")
    private Long enableStatus;
}
```

结果：

```json
{
  "enableStatus": 1,
  "enableStatusEnum": {
    "value": 1,
    "desc": "启用"
  }
}
```

### `@ArrayStrTransfer`字符串和数组互转

字符串序列化成数组，数组反序列换成字符串

- 属性

| 类型    | 名称       | 说明                         | 版本 |
| ------- | ---------- | ---------------------------- | ---- |
| String  | separator  | 分隔符，默认：`,`            |      |
| String  | prefix     | 前缀内容，默认：`""`         |      |
| String  | suffix     | 后缀内容，默认：`""`         |      |
| Boolean | ignoreNull | 是否忽略空元素，默认：`true` |      |

示例：

```java
public class Test {
    @ArrayStrTransfer
    private String productName;
}
```

结果：

```json
{
    "productName": [
        "手机",
        "电脑"
    ],
    ....
}
```

反序列化

```java
@ToString
public class Test {
    @ArrayStrTransfer
    private String productName;
}

{
    "productName": [
        "手机",
        "电脑"
    ],
    ....
}
```

结果：

```txt
sout -> Test(productName=手机,电脑)
```

### `@IntBooleanTransfer` int 和 Boolean 互转

int 0 或者 1 序列化成 false 和 true，boolean true 或者 false 反序列化成 1 和 0。int 不是 0 或者 1 的时候序列化成 false。反序列化的时候如果值是空对象或者不是 Int 类型，或者不是 1 或 0，反序列化为空 Boolean 对象

### `@Sensitive` 值脱敏

对敏感数据脱敏

- 属性

| 类型          | 名称           | 说明                                                                                                                                                                                                    | 版本 |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| SensitiveType | value          | 脱敏类型。Sensitive.SensitiveType：CHINESE_NAME:中文名称，ID_CARD：身份证号，FIXED_PHONE：座机号，手机号：MOBILE_PHONE，地址：ADDRESS，电子邮件：EMAIL，银行卡：BANK_CARD，公司开户银行联号：CNAPS_CODE |      |
| String        | writeFieldName | 序列化输出字段名称。默认当前字段名称                                                                                                                                                                    |      |

示例：

```java
public class Test {
    @Sensitive(value = Sensitive.SensitiveType.MOBILE_PHONE)
    private String mobile;

   @Sensitive(value = Sensitive.SensitiveType.MOBILE_PHONE, writeFieldName="phone")
    private String mobile2;
}
```

结果:

```json
{
  "mobile": "13******41",
  "phone": "13******41"
}
```

### `@ToUserName` 用户主键转用户枚举对象

当我们只有用户主键却想要获取用户的名称可以使用这个注解，它会返回你需要的用户名称。想用这个注解你必须要实现`BaseParseUserService`接口，否则你会得到一个`NullPointerException`，我们建议你在这个接口返回的时候加上缓存，提高运行效率。我们在内存中做了缓存击穿，保证了两分钟内不存在的用户不会调用接口，但是有可能会造成两分钟的用户信息空洞。针对这个情况请设置：`seedltd.json.cache.enabled=false`

| 类型   | 名称  | 说明                                           | 版本 |
| ------ | ----- | ---------------------------------------------- | ---- |
| String | value | 序列化输出字段名称。默认当前字段名称加上`Name` |      |

示例：

```java
public class Test {
    @ToUserName
    private Long updateUserBy;

    @ToUserName("createBy")
    private Long createUserBy;
}
```

结果：

```json
{
  "updateUserBy": "100000",
  "updateUserByName": "管理员",
  "createUserBy": "100000",
  "createBy": "管理员"
}
```

### `@JsonStrToField` json 字符串转用户字段

将 json 指定的字段值转成 java 实体字段的值，例如：把`{value: 1, desc: '启用'}`中的 value 值赋值给`private Long field`，你可以在这个实体字段中加上`@JsonStrToField`。最终`filed`的值将变成`1`

| 类型     | 名称        | 说明                                                                                                                                                    | 版本 |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| String   | sourceField | 指定 json 中转换字段名称，默认`value`                                                                                                                   |      |
| boolean  | valid       | 是否校验枚举是否有效。默认：true                                                                                                                        |      |
| String   | type        | 字典类型                                                                                                                                                |      |
| String   | localData   | 本地数据集合。value:desc 格式，多个使用英文逗号隔开。当{@link #type()}是空的时候，会使用该属性的值做解析，value 表示当前字段的值。例如：`1:启用,0:禁用` |      |
| String[] | attached    | 附加值，原路返回的值。                                                                                                                                  |      |
| boolean  | thrError    | `valid`为`true`的时候校验失败是否抛出异常，true 抛出异常，false 置空                                                                                    |      |

请求参数：

```json
{
  "enabled": {
    "value": "1",
    "desc": "启用"
  }
}
```

转换结果：

```java
public class Test {
    @JsonStrToFiled
    private Long enabled;

    @Override
    public String toString() {
        return "Test{" +
            "enabled=" + enabled +
            '}';
}
// 输出
Test{enabled=1}
```

### 静态枚举

只要枚举实现`BaseEnum`接口，我们将会自动把枚举类型转换成枚举字符串。如果需要实现前端`tag`样式需要实现`BaseTagEnum#getTagType()`方法，返回前端的`tag`样式，例如`success，danger,warning ...`。示例：

```java
public class Test {
    private EnableStatus enableStatus;
}

public enum EnableStatus implements BaseEnum<Integer> {
    // @formatter:off
    ENABLE(1, "启用"),
    DISABLE(0, "禁用");
    // @formatter on
    private final Integer value;
    private final String desc;
}
// or BaseTagEnum
public enum EnableStatus implements BaseTagEnum<Integer> {
    // @formatter:off
    ENABLE(1, "启用", "success"),
    DISABLE(0, "禁用", "danger");
    // @formatter on
    private final Integer value;
    private final String desc;
    private final String tagType;
}
```

你将得到这样的字符串

```json
{
   "enableStatus": {
        "value": 1,
        "desc": "启用"
    }
}

// or BaseTagEnum

{
   "enableStatus": {
        "value": 1,
        "desc": "启用",
        "tagType": "success"
    }
}
```

## 参数校验

入参校验全部通过注解来处理。伪代码如下：

```java
public class Order{

    @NotNull(message = "订单主键不能为空", group = {Save.class}) // group视情况而定
    private Long id;
}

@RestController
@AllArgsConstructor
@RequestMapping
public class OrderController {

    @PostMapping
    public void createOrder(@RequestBody @Validated({Save.calss}) OrderSaveCmd cmd) {

    }


    @GetMapping
    public void getOrder(@RequestBody @Validated @NotNull( "订单主键不能为空") @Min(value = 100, message = "ID 不能小于100") Long id) {

    }
}
```

### `@DictCheck` 校验参数值在字典中是否有效

支持的数据类型为：`CharSequence`、`Short`、`Byte`、`Integer`。需要实现`DynamicEnumService`接口

| 类型       | 名称    | 说明                           | 版本 |
| ---------- | ------- | ------------------------------ | ---- |
| String     | message | 错误消息                       |      |
| String     | type    | 字典类型                       |      |
| `String[]` | values  | 自定义值。和 type 只能必选其一 |      |

### `@UserValid` 校验用户是否有效

需要实现`UserValidService`接口

| 类型   | 名称    | 说明                                                               | 版本 |
| ------ | ------- | ------------------------------------------------------------------ | ---- |
| String | message | 错误消息                                                           |      |
| String | type    | 用户状态。ENABLED:有效的，DISABLED:禁用，ALL:不限制。默认：ENABLED |      |

## Mybatis

对`MyBatisPlus`做了一些增强

### 数据权限

目前只针对列表页做了数据权限处理。

#### 实现原理

用户和部门多对多的关系，角色和用户多对多的关系。角色有数据权限范围字段，取值：`1：全部数据权限 5：自定数据权限 10：本部门数据权限 15: 仅本人数据权限`。设置用户的角色的时候可以知道用户的最大数据权限是什么，通过拿到最大的数据权限去找到部门下的用户从而得到相对于的数据列表。

#### 使用

- 首先搜索条件对象需要继承`DataScopeSearchForm`
- `openDataScope`设置成`true`，`false`不会执行数据权限过滤
- 设置`scopeName`限制范围的字段名称，默认是`create_by`
- 设置别名`alias`，例如：`t`。单表可以不设置

### Mapper 拓展方法

- updateAllById

  根据主键更新全部字段，排除`createTime`和`createBy`

- checkExists

  检查数据是否存在

- insertBatch
  批量插入数据

- updateByIdAndVersion
  乐观锁更新数据

```java
updateByIdAndVersion(
                    CustomsOrder.builder()
                        .customsId(customsId)
                        .declareBy(employee.getId())
                        .version(version) // 必须设置当前版本
                        .declareAssignStatus(true)
                        .declareAssignTime(LocalDateTime.now())
                        .orderStatus(null) // 这种方式设置空值无效。需要使用updateByVersion方法
                        .build())
```

- updateByVersion
  乐观锁更新数据

```java
 updateByVersion(CustomsOrder.builder()
              .declareAssignStatus(false) //这是可以的
              .declareBy(null) //无效，不能设置字段为null
              .version(customsOrder.getVersion()) //必须要包含这个字段，否则会变成普通更新
              .build(),
          Wrappers. lambdaUpdate()
               // 如果要置空字段值可以这种方式设置，在实体对象设置null无效
              .set(CustomsOrder::getDeclareBy, null)
              .set(CustomsOrder::getDeclareAssignTime, null)
              .set(CustomsOrder::getDeclareBy, null)
              .set(CustomsOrder::getVersion, customsOrder.getVersion()) //这种方式设置乐观锁版本号也是无效的，会被当做普通更新
              .eq(CustomsOrder::getCustomsId, customsId))
```

### 类型处理器

Mybatis 自定义的类型处理器， 处理 XML 中模糊查询类型的参数。

#### 左模糊处理器

```xml
...
and name like #{name,typeHandler=leftLike}
...
```

#### 右模糊处理器

```xml
...
and name like #{name,typeHandler=rightLike}
...
```

#### 全模糊处理器

```xml
...
and name like #{name,typeHandler=fullLike}
...
```

#### 开始日期处理器

```xml
...
and time >= #{startTime, typeHandler=startTime}
...
to:
and time >= 2021-09-03 00:00:01
```

#### 结束日期处理器

```xml
...
and time <![CDATA[<=]]> #{startTime, typeHandler=endTime}
...
to:
and time >= 2021-09-03 23:59:59
```

### 修改增强器 `ProUpdate`

简化数据库修改、删除、新增操作。如果业务层继承了`BaseServiceImpl`可以直接使用`u()`方法操作。或者使用`SqlUtils.u()`也可以使用原始类型`ProQuery.Builder`

示例：

```java
@Override
public Long add(SysDictTypeForm form) {
    return u().save(form, new SysDictType()).getId();
}

@Override
public boolean update(SysDictTypeForm form) {
   return u().updateById(form, form.getId());
}
```

在调用`updateById`的时候可以传入回调函数进行前置处理。返回 true 则继续更新，返回 false 不会触发更新数据库

```java
@Override
public boolean update(SysDictTypeForm form) {
    ProUpdate.Cb<SysDictType> cb = new ProUpdate.Cb<>() {
        @Override
        public boolean before(SysDictType pojo) {
            if (!pojo.getEnabled().equals(form.getEnabled())) {
                sysDictService.clearCache(pojo.getDictType());
            }
            return true;
        }
    };
    return u(cb).updateById(form, form.getId());
}
```

### 自动注入

**创建人和修改人字段必须是 Long 类型，创建时间和修改时间必须是 LocalDateTime 类型否则注入失败**

- 通过继承`BaseEntity`方式

  在修改或者新增的时候自动注入`创建人`、`创建时间`、`修改人`、`修改时间`

- 使用注解方式

  在需要注入的字段添加注解，需要设置 `@TableField`的`fill`自动填充策略。如果没有获取到登入人信息`(SecurityUserUtils.getLoginUser() == null)`则不会注入当前登入人主键

  `@CreatedBy`：注入当前登录人主键

  `@CreatedDate`：注入当前时间

  `@LastModifiedBy`：注入当前登录人主键

  `@LastModifiedDate`：注入当前时间

  `@ColumnDefault`: 在插入的时候自动注入值，字段类型是`Integer\Double\Float\Byte\Short\String\Boolean\Long\BigDecimal`的时候才能注入成功

### 查询增强器`ProQuery`

简化数据库查询操作。如果业务层继承了`BaseServiceImpl`可以直接使用`q()`方法操作。或者使用`SqlUtils.q()`也可以使用原始类型`ProQuery.Builder`

示例：

```java
/**
 * 字典类型列表搜索条件
 *
 * @author laizuan
 * @since 2021/05/24
 */
@Getter
@Setter
public class SysDictTypeSearchForm extends BaseSearchForm {
    /**
     * 字典类型名称
     */
    @Like(likeType = LikeType.right)
    private String typeName;

    /**
     * 字典类型代码
     */
    @SqlSegment
    private String typeCode;

    @OrderBy(sort = 1)
    private Integer sortNo;

    @OrderBy
    private Date createTime;
}

 @Override
public BasePage<SysDictTypeVO> page(SysDictTypeSearchForm searchForm) {
   return ProQuery.Builder(baseMapper)
          .searchForm(searchForm)
          .build()
          .selectPage(searchForm.getStart(), searchForm.getSize(), SysDictTypeVO.class);

    ...
    // or

    return q(searchForm).selectPage(searchForm.getStart(), searchForm.getSize(), SysDictTypeVO.class);
}

// 查询一条数据
@Override
public SysDictTypeVO findById(Long id) {
   return q().selectById(id, SysDictTypeVO.class);
}
```

#### 注解

查询专用，需要设置`ProQuery.builder()#searchForm`参数

##### @Alias 表别名

##### @BetweenEnd `between 结束条件`

|    属性    |  类型  | 必须指定 | 默认值 | 描述                                                  |
| :--------: | :----: | :------: | :----: | ----------------------------------------------------- |
| startFiled | String |    是    |        | between 开始字段名称，找不到会抛出异常                |
|   value    | String |    否    |   “”   | 指定数据库字段名称， 默认会将字段名称驼峰转下划线拼接 |

##### @BetweenStart `between开始条件`。它可以和`@BetweenEnd` 配合出现，理论上两者可以只出现一个，只需要设置好对应的`field`字段即可

|   属性   |  类型  | 必须指定 | 默认值 | 描述                                                  |
| :------: | :----: | :------: | :----: | ----------------------------------------------------- |
| endField | String |    是    |        | between 结束字段名称，找不到会抛出异常                |
|  value   | String |    否    |   “”   | 指定数据库字段名称， 默认会将字段名称驼峰转下划线拼接 |

##### @EndTime `结束时间，默认加上value 23:59:59，仅在java日期来下有效`

|    属性     |  类型  | 必须指定 |  默认值  | 描述                                                  |
| :---------: | :----: | :------: | :------: | ----------------------------------------------------- |
| suffixValue | String |    否    | 23:59:59 | 年月日后面拼接的时分秒，                              |
|    value    | String |    否    |    “”    | 指定数据库字段名称， 默认会将字段名称驼峰转下划线拼接 |

##### @StartTime `开始时间，默认加上value 00:00:01，仅在java日期来下有效`

|    属性     |  类型  | 必须指定 |  默认值  | 描述                                                  |
| :---------: | :----: | :------: | :------: | ----------------------------------------------------- |
| suffixValue | String |    否    | 00:00:01 | 年月日后面拼接的时分秒，                              |
|    value    | String |    否    |    “”    | 指定数据库字段名称， 默认会将字段名称驼峰转下划线拼接 |

##### @GroupBy `分组`

| 属性 | 类型  | 必须指定 |     默认值      | 描述           |
| :--: | :---: | :------: | :-------------: | -------------- |
| sort | short |    否    | Short.MAX_VALUE | 数字越小越靠前 |

##### @OrderBy`排序`，这个注解是在`com.baomidou.mybatisplus.annotation`包下。如果设置了`BaseSearchForm#sortList`那个它的优先级最高

|  属性  |  类型   | 必须指定 |     默认值      | 描述           |
| :----: | :-----: | :------: | :-------------: | -------------- |
|  sort  |  short  |    否    | Short.MAX_VALUE | 数字越小越靠前 |
| isDesc | boolean |    否    |      true       | 是否倒序查询   |

##### @Like `模糊查询`

|   属性   |   类型   | 必须指定 | 默认值 | 描述                                                  |
| :------: | :------: | :------: | :----: | ----------------------------------------------------- |
| likeType | LikeType |    是    |        | 模糊类型。`full, left, right`                         |
|  value   |  String  |    否    |   “”   | 指定数据库字段名称， 默认会将字段名称驼峰转下划线拼接 |

##### @SqlSegment `条件构`

|    属性    |  类型   | 必须指定 |   默认值   | 描述                                                                                                           |
| :--------: | :-----: | :------: | :--------: | -------------------------------------------------------------------------------------------------------------- |
| sqlKeyword | Segment |    是    | Segment.EQ | 条件类型。`NOT, IN, NOT_IN,EQ,NE: <>, GT: >, GE: >= , LT: <, LE: <=, IS_NULL, IS_NOT_NULL, EXISTS, NOT_EXISTS` |
|   value    | String  |    否    |     “”     | 指定数据库字段名称， 默认会将字段名称驼峰转下划线拼接                                                          |

## UUID 生成器

### 示例：

```java
@Autowired
private IdGenerator idGenerator;


IdGenerator.nextId();
IdGenerator.nextUuid();
IdGenerator.nextNanoId();
```

## 工具类

所有的工具类都已将源码上传到 maven 仓库。使用工具类的时候可以点开方法查看详细的注释信息

### Pdf

pdf 工具类

- `Pdf.builderMergerPdf()`：多个 pdf 合并成一个 pdf
- `Pdf.builderImageToPdf()`：多图转 pdf
- `Pdf.builderHtmlToPdf()`：html 生成 pdf
- `Pdf.builderMarkerPdf()`：给 PDF 添加水印

### SecurityUserUtils

获取当前登入信息，如果没有登入会抛出 401 错误码

### Assert

断言工具类，继承了`org.apache.commons.lang3.Validate`的所有断言方法。

### JsonUtils

Json 序列化和反序列化工具

### TreeUtil

树形数据结构工具类，会将 list 数据转成数据结构数据

### WebUtils

继承了`org.springframework.web.util.WebUtils`所有方法。主要封装了请求和响应操作的方法。比如输出流，设置下载或者预览请求头，请求参数拼接等。

### ImageUtils

图片工具类，主要有压缩、裁剪、水印等功能

### BeanUtils

Bean 对象拷贝工具类。继承了`org.springframework.beans.BeanUtils`所有方法。

**涉及到对象拷贝请统一使用该工具类**

### DateUtils

日期相关工具类

### EnumUtils

枚举相关工具类，继承了`org.apache.commons.lang3.EnumUtils`所有方法。主要有通过`value`值获取到枚举常量

### ResourceUtils

资源工具类，基础了`org.springframework.util.ResourceUtils`所有方法。主要用户获取项目下的文件等操作

### SpringContextUtils

Spring 容器工具类，主要提供了获取容器中 bean 对象方法

## 日志审计

实现`AuditDiff`类并重写`diff`方法，比较两个对象的值，将更改的值记录并输出字符串。建议对象重写 `ToString` 方法，或者使用`@ToString`注解

- 支持嵌套对象，如果嵌套对象没有实现`AuditDiff`那么会使用`equals`来判断是否相等，如果不相等，那么会输出两个对象的所有数据
- 集合只支持集合长度是否相等，如果相等那么会判断他们之间相同下标的值是否相同，有一个不相同都会输出整个集合数据。所以建议自己循环比较拿到结果后在做处理，灵活性会比较高

- **代码生成器已经支持生成审计代码段**

示例如下：

```java
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OutbdCustomsOrder implements BaseEntityVersion, AuditDiff<OutbdCustomsOrder>

    /**
     * 出库单号
     */
    private String outbdNo;

    /**
     * 集装箱号
     */
    private String containerNo;

    /**
     * 运输方式
     */
    private Byte transportCode;


    /** 创建时间 */
    private LocalDateTime createTime;


    private Test t;
    private List<Test> ts;

    @Getter
    @Setter
    @ToString
    private static class Test implements AuditDiff<Test> {
        public Test(String field1, String field2, LocalDateTime localDateTime) {
            this.field1 = field1;
            this.field2 = field2;
            this.localDateTime = localDateTime;
        }

        private String field1;
        private String field2;
        private LocalDateTime localDateTime;

        @Override
        public AuditDiffResult<Test> diff(Test obj) {
            return new AuditDiffBuilder<>(this, obj, ToStringStyle.DEFAULT_STYLE)
                    .append("字段1", this.field1, obj.field1)
                    .append("字段2", this.field2, obj.field2)
                    .append("时间", this.localDateTime, obj.localDateTime)
                    .build();
        }
    }


    @Override
    public AuditDiffResult<OutbdCustomsOrder> diff(OutbdCustomsOrder obj) {
        return new AuditDiffBuilder<>(this, obj, ToStringStyle.DEFAULT_STYLE)
                .append("出库单号", this.outbdNo, obj.outbdNo)
                .append("运输方式", this.transportCode, obj.transportCode)
                .append("集装箱号", this.containerNo, obj.containerNo)
                .append("创建时间", this.createTime, obj.createTime)
                .append("测试", this.ts, obj.ts)
                .build();
    }

  public static void main(String[] args) {
        OutbdCustomsOrder v1 = new OutbdCustomsOrder();
        v1.setOrderNo("null");
        v1.setOutbdNo("OUT00001");
        v1.setContainerNo("C00000");
        v1.setCreateTime(LocalDateTime.now().minusMonths(1));
        v1.setT(new Test("A", "B", LocalDateTime.now()));
        v1.setTs(List.of(v1.getT()));

        OutbdCustomsOrder v2 = new OutbdCustomsOrder();
        v2.setOrderNo("AAA1");
        v2.setOutbdNo("OUT00001");
        v2.setTransportCode("2");
        v2.setCreateTime(LocalDateTime.now());
        v2.setT(new Test("A", "c", LocalDateTime.now().minusMonths(1)));
        v2.setTs(List.of(v2.getT()));
        AuditDiffResult<OutbdCustomsOrder> diff = v1.diff(v2);
        System.out.println(diff.toString());
    }
}
```

运行 `Main` 方法输出：

```txt
运输方式[] -> [2]，
集装箱号[C00000] -> []，
创建时间[2023-09-21T16:55:26.737133900] -> [2023-10-21T16:55:26.738134100]，
测试集合[[OutbdCustomsOrder.Test(field1=A, field2=B, localDateTime=2023-10-21T16:55:26.738134100)]] -> [[OutbdCustomsOrder.Test(field1=A, field2=c, localDateTime=2023-09-21T16:55:26.738134100)]]，
测试对象.字段2[B] -> [c]，
测试对象.时间[2023-10-21T16:55:26.738134100] -> [2023-09-21T16:55:26.738134100]，
```

## 接口校验

一般情况下接口使用`hibernate validation`校验参数已经满足多少场景。但是如果我们需要提醒用户有某些风险，用户确认风险即可以继续处理业务这时候前者就无法实现了。

我们可以通过`@PreValidation`注解来实现这个功能

## 注解属性

|      属性      |  类型   | 必须指定 | 默认值 | 描述     |
| :------------: | :-----: | :------: | :----: | -------- |
|    enabled     | boolean |    是    |  true  | 是否启用 |
| validateMethod | String  |    是    |   -    | 验证方法 |

### 使用

可以参考`CMS`系统`CustomsDeclareController#invt`

:::warning 注意

- `validateMethod` 方法必须是在接口类中，并且是 `public` 修饰的
- 校验方法的参数必须和接口参数保持类型一致和顺序一致

:::

```java
    @PreValidation(validateMethod = "testPreValidate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void test(Long id, String type) {
      ...正常处理你的业务请求
    }

    public LogicResultVO testPreValidate(Long id, String type) {
      ... 这里处理你的校验逻辑
    }
```
