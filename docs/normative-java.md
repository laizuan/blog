# java 后端规范

## 1、注释
1. 所有实体类字段名称必须要有多行注释 <Badge text="强制" type="error"/> 
2. 每个方法需要有多行注释，并且参数必须有中文注释 <Badge text="强制" type="error"/> 
3. 复杂函数方法内必须有逻辑单行注释 <Badge text="强制" type="error"/> 
4. 无用代码尽量删除


## 2、参数校验
目前有注解和工具类两种校验方式，实体校验使用注解，需要校验的少（两个内）推荐使用工具类校验
::: warning 警告 
后端永远不要相信前端传输的参数值，所有提交参数必须通过校验才可以入库。
:::
* 工具类校验方式
<img :src="$withBase('/img/java_validate.png')" alt="validate"/>

* 使用注解 
    1. 单个参数校验，在参数前面加上校验注解`@Validated`和规则注解`@NotNull`, 更多的规则注解请看下面面
    <img :src="$withBase('/img/z_validate.png')" alt="validate"/>
    2. 实体校验
    在实体中配置校验规则，方法参数中添加`@Valid`即可
    <img :src="$withBase('/img/st_validate.png')" alt="实体校验"/>

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

## 3、权限
所有的敏感操作都必须要有权限控制，不能只在前端控制。敏感操作比如：新增、修改、删除等操作数据的动作。像查询这种一般不设置权限，但是**重要数据**必须加权限。

1. 权限命名规则：模块名称:模块对应的实体:动作

   例： 删除用户

    >`sys:user:delete`
    sys 大模块名称
    user 子模块名称
    delete 动作

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
* 示例     

    `SearchForm` 用来接受列表查询条件参数，里面只需要包含需要用的上的搜索条件字段即可     
    `Form` 接受前端数据操作实体，**不应该包含用户不可以修改的字段**。比如：创建人、创建时间、修改人、修改时间等...

* 命名规则解释      
    1. 数据库实体pojo类只能和数据库打交道
    2. VO实体，返回前端的视图实体类
    3. Form实体，接收参数映射
    4. SearchForm实体，接收列表查询参数

## 5、实体继承、实现
1. pojo对象涉及到创建人、修改人、创建时间、修改时间的必须继承`BasePojo`类
2. SearchForm实体继承`BaseSearchForm`类
3. 数据库自动转枚举需要实现`BaseEnum`
4. 前端列表需要标记的静态枚举实现`BaseTagEnum`
5. 带缓存的业务实现`BaseCacheService`
6. 自定义异常类继承`BaseException`
7. 业务接口与需要继承`IBaseService`,业务的实现类则实现`BaseServiceImpl`
8. Mapper 接口统一继承`IBaseMapper`

## 6、Maven 相关
::: warning
Jar包是整个项目最禁忌的地方，不允许开发者擅自改动Maven Jar管理工程。需要添加修改需要审批后由开发组长以上人员方可修改。
:::
1. 开发者不能私自添加maven依赖，所有添加的依赖都必须经过审批后方可添加
2. 所有添加的依赖必须在`yidian-service-parent`工程中统一管理版本号。
3. 不准私自升级或者降低jar的版本号。

##  7、RPC 相关
整个懿点网项目架构模块之间调用使用feign组件来实现。每个模块的功能放在一个接口中，不同模块的业务接口分开类实现。不能将所有的业务写在一个类里面
1. 被调用方
在web模块下新建一个叫provider，下面写对应的控制器
2. 调用方  
在service模块下新建一个叫client的包用来放置接口调用，client包中新建一个fallback包用来放置接口调用异常降级处理工厂类。示例如下：
<img :src="$withBase('/img/feign.png')" alt="feign 调用方目录结构示例图"/>

## 8、开发工具
开发工具统一使用IntelliJ IDEA，安装好后统一配置好自己的IDEA。需要配置如下：
* #### 代码格式化配置 <Badge text="强制" type="error"/>
1. 进入插件界面：File->Settings->Plugins，搜索 eclipse code formatter，如已有插件则不需安装，如没有，点击Search in repositories自动搜索线上插件。
2. 导入eclipse-codestyle.xml。File->Settings->Other Setting -> eclipse code formatter,选择Use the eclipse code formatter-> eclipse java formatter config file 选择 eclipse-codestyle.xml
3. 点ok完成
4. 资源下载 [EclipseFormatter 下载](https://github.com/krasa/EclipseCodeFormatter/releases) [Alibaba 规范模板下载](https://github.com/alibaba/p3c/blob/master/p3c-formatter/eclipse-codestyle.xml) [教程参考](https://www.jianshu.com/p/9befe7710176)  

* #### 插件 
1. `lombok` <Badge text="强制" type="error"/>
2. `GsonFormat`一键根据json文本生成java类
3. `Maven Helper`一键查看maven依赖，查看冲突的依赖，一键进行exclude依赖
4. `GenerateAllSetter`一键调用一个对象的所有set方法并且赋予默认值，在对象字段多的时候非常方便 <Badge text="强制" type="error"/>
5. `Translation`翻译
6. `CodeGlance`代码右侧小地图 <Badge text="强制" type="error"/>
7. `Key-Promoter-X`快捷键提示，熟悉之后可以关闭
8. `mybatisx`Mapper和xml快速跳转插件 <Badge text="强制" type="error"/>
9. `RestfulToolkit`通过接口地址快速定位接口所在的方法位置 <Badge text="强制" type="error"/>

* #### 配置
1. 忽略大小写开关 <Badge text="强制" type="error"/>  
IDEA默认是匹配大小写，此开关如果未关。你输入字符一定要符合大小写。比如你敲string是不会出现代码提示或智能补充。
但是，如果你开了这个开关，你无论输入String或者string都会出现代码提示或者智能补充！
<img :src="$withBase('/img/640.webp')" alt="忽略大小写开关"/>

2. 智能导包开关 <Badge text="强制" type="error"/>
如下图所示，将自动导入不明确的结构，智能优化包  
这两个选项勾上。那么有什么效果呢？  
你在代码中，只要敲list，就会出现提示，自动导入java.util.List这个类  
<img :src="$withBase('/img/641.webp')" alt="智能导包开关"/>

3. 悬浮提示开关  
打开这个开关后。只要把鼠标放在相应的类上，就会出现提示，如下图所示:
<img :src="$withBase('/img/642.jfif')" alt="悬浮提示开关"/>

4. 取消单行显示tabs的操作  
如下图所示，把该按钮去了:
<img :src="$withBase('/img/643.jfif')" alt="取消单行显示tabs的操作"/>
那么去掉后有什么效果呢？打开多个文件的时候，会换行显示，非常直观。大大提升效率！
<img :src="$withBase('/img/644.jfif')" alt="取消单行显示tabs的操作"/>

5. 项目文件编码
如下图所示进行设置:
<img :src="$withBase('/img/645.jfif')" alt="项目文件编码"/>

6. 设置行号显示 <Badge text="强制" type="error"/>  
这个的重要性就不用多说了，勾上后代码中，会显示行数!
<img :src="$withBase('/img/645.webp')" alt="设置行号显示"/>