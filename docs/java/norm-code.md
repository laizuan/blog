# 代码相关

## 1、注释

- 所有实体类字段名称必须要有多行注释 <Badge text="强制" type="error"/>
- 每个方法需要有多行注释，并且参数必须有中文注释 <Badge text="强制" type="error"/>
- 复杂函数方法内必须有逻辑单行注释 <Badge text="强制" type="error"/>
- 无用代码尽量删除

## 2、参数校验

目前有注解和工具类两种校验方式，实体校验使用注解，需要校验的少（两个内）推荐使用工具类校验 ::: warning 警告后端永远不要相信前端传输的参数值，所有提交参数必须通过校验才可以入库。 :::

- 工具类校验方式 <img :src="$withBase('/img/java_validate.png')" alt="validate"/>

- 使用注解

  1. 单个参数校验，在参数前面加上校验注解`@Validated`和规则注解`@NotNull`, 更多的规则注解请看下面面 <img :src="$withBase('/img/z_validate.png')" alt="validate"/>
  2. 实体校验在实体中配置校验规则，方法参数中添加`@Validated`即可 <img :src="$withBase('/img/st_validate.png')" alt="实体校验"/>

  ::: details 点击查看常用的校验规则

  ```java
    // 被注释的元素必须为 null
    @Null
    // 被注释的元素必须不为 null
    @NotNull
    // 被注释的元素必须为 true
    @AssertTrue
    // 被注释的元素必须为 false
    @AssertFalse
    // 被注释的元素必须是一个数字，其值必须大于等于指定的最小值
    @Min(value)
    // 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
    @Max(value)
    // 被注释的元素必须是一个数字，其值必须大于等于指定的最小值
    @DecimalMin(value)
    // 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
    @DecimalMax(value)
    //被注释的元素的大小必须在指定的范围内
    @Size(max=, min=)
    // 被注释的元素必须是一个数字，其值必须在可接受的范围内
    @Digits (integer, fraction)
    // 被注释的元素必须是一个过去的日期
    @Past
    // 被注释的元素必须是一个将来的日期
    @Future
    // 被注释的元素必须符合指定的正则表达式
    @Pattern(regex=,flag=)
    //验证字符串非null，且长度必须大于0
    @NotBlank
    // 被注释的元素必须是电子邮箱地址
    @Email
    // 被注释的字符串的大小必须在指定的范围内
    @Length(min=,max=)
    // 被注释的字符串的必须非空
    @NotEmpty
    // 被注释的元素必须在合适的范围内
    @Range(min=,max=,message=)
  ```

  :::

- List 集合获取校验失败项的下标只需要在消息中添加`${index}`即可。注意`${index}`是固定的，并且 index 是从**1**开始示例代码：

```java
public class Test {

   /**
    * 测试
    */
   @NotBlank(message = "第${index}项，字符串不能为空")
   @Length(message = "第${index}项，字符串长度不能超过9个字符", max = 9)
   private String str;

   // sout
   //第1项，字符串不能为空
```

## 3、权限

所有的敏感操作都必须要有权限控制，不能只在前端控制。敏感操作比如：新增、修改、删除等操作数据的动作。像查询这种一般不设置权限，但是**重要数据**必须加权限。

1. 权限命名规则：模块名称:模块对应的实体:动作

   例： 删除用户

   > `sys:user:delete` sys 大模块名称 user 子模块名称 delete 动作

2. 添加权限方式
   ```java
   @PreAuthorize("hasRole('admin")  是否拥有admin角色
   @PreAnyAuthorize("hasRole('admin','test")  是否拥有admin角色
   @PreAuthorize("hasAuthority('sys:user:delete")  是否有`sys:user:delete`权限
   @PreAuthorize("isAuthenticated()") 添加登录权限判断，登录才可以调用
   @PostAuthorize 方法调用之后，如果表达式的结果为false，则抛出异常
   @PreFilter 方法调用之前，过滤进入方法的输入值
   @PostFilter 方法调用之后，过滤方法的结果值
   ```

## 4、数据实体传递

不同的实体后缀作用域不同，切记不能混淆使用。每个模型类型应当遵循最小原则，用不上的字段请删除。

- 示例

  `SearchForm` 用来接受列表查询条件参数，里面只需要包含需要用的上的搜索条件字段即可 `Form` 接受前端数据操作实体，**不应该包含用户不可以修改的字段**。比如：创建人、创建时间、修改人、修改时间等...

- 命名规则解释
  1. 数据库实体 pojo 类只能和数据库打交道
  2. VO 实体，返回前端的视图实体类
  3. Form 实体，接收参数映射
  4. SearchForm 实体，接收列表查询参数

## 5、实体继承、实现

1. pojo 对象涉及到创建人、修改人、创建时间、修改时间的必须继承`BasePojo`类
2. SearchForm 实体继承`BaseSearchForm`类
3. 数据库自动转枚举需要实现`BaseEnum`
4. 前端列表需要标记的静态枚举实现`BaseTagEnum`
5. 带缓存的业务实现`BaseCacheService`
6. 自定义异常类继承`BaseException`
7. 业务接口与需要继承`IBaseService`,业务的实现类则实现`BaseServiceImpl`
8. Mapper 接口统一继承`IBaseMapper`

## 6、Maven 相关

::: warning Jar 包是整个项目最禁忌的地方，不允许开发者擅自改动 Maven Jar 管理工程。需要添加修改需要审批后由开发组长以上人员方可修改。 :::

1. 开发者不能私自添加 maven 依赖，所有添加的依赖都必须经过审批后方可添加
2. 所有添加的依赖必须在`yidian-service-parent`工程中统一管理版本号。
3. 不准私自升级或者降低 jar 的版本号。

## 7、RPC 相关

整个懿点网项目架构模块之间调用使用 feign 组件来实现。每个模块的功能放在一个接口中，不同模块的业务接口分开类实现。不能将所有的业务写在一个类里面

1. 被调用方在 web 模块下新建一个叫 provider，下面写对应的控制器
2. 调用方在 service 模块下新建一个叫 client 的包用来放置接口调用，client 包中新建一个 fallback 包用来放置接口调用异常降级处理工厂类。示例如下： <img :src="$withBase('/img/feign.png')" alt="feign 调用方目录结构示例图"/>
