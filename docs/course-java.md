# Java 后端教程
## 1、代码生成
代码生成函数名：`CodeGenerateUtils`，改好配置后运行main方法。
::: warning 警告 <Badge text="强制" type="error"/> 
所有代码**按需生成**，不允许将用不上的代码生成出来，违者追究责任。生成完代码后请将所有生成的类进行格式化、优化导包、安装规范删除实体中不需要的字段
:::
- 属性配置
<img :src="$withBase('/img/generate_01.png')" alt="属性配置1"/>
<img :src="$withBase('/img/generate_02.png')" alt="属性配置2"/>

- 配置菜单  
假如我生成了`company_user`这个表的前端代码，那么新建一个菜单如下：
<img :src="$withBase('/img/generate_03.png')" alt="菜单配置"/>
1. 路由名称使用中横线隔开
2. 组件地址值得是列表组件所在的相对路径 views目录开始
3. 如果生成代码的时候勾选了自定义列，则需要配置菜单的自定义列
4. 添加按钮权限。请看[权限规范](./normative-java.md#_3、权限)

## 2、子系统间接口调用
每个子系统之间调用有feign组件协调，关于包名请看[RPC规范](./normative-java.md#_7、rpc-相关)  
<img :src="$withBase('/img/rpc_01.png')" alt="rpc_01"/>
需要注意的是`@PostMapping`默认的请求头是`application/json`，所以提供方需要添加`@RequestBody`注解才能获取到参数  
<s>如果需要form表单提交需要在类注解上添加`configuration = FeignFormEncoderConfig.class`属性，这是时候`@PostMapping`会以form的形式请求接口，提供方也就不需要`@RequestBody`注解就能获取到参数  </s>
```java
@FeignClient(name = SystemConst.UPMS_APPLICATION_NAME, fallbackFactory = UserServiceFallbackFactory.class,
    decode404 = true, configuration = FeignFormEncoderConfig.class)
```


## 3、枚举字段返回json格式
添加` @JSONField(serializeUsing = EnumSerializer.class)`注解即可，注意需要序列化的枚举必须实现`BaseEnum.java`
```java
  /**
     * 启用状态(1启用 0禁用 2注销)
     */
    @JSONField(serializeUsing = EnumSerializer.class)
    private UserEnableStatus enableStatus;
```

## 4、json序列化成枚举字段
添加` @JSONField(deserializeUsing = EnumDeserializer.class)`注解即可，注意需要反序列化的枚举必须实现`BaseEnum.java`
```java
    /**
     * 启用状态(1启用 0禁用 2注销)
     */
    @NotNull(message = "启用状态不能为空")
    @JSONField(deserializeUsing = EnumDeserializer.class)
    private UserEnableStatus enableStatus;
```

## 5、动态枚举
添加注解`@DynamicEnum`，一般会搭配本章节第7小结使用
`type` 字典表里面的key
```java
    /**
     * 启用状态(1启用 0禁用 2注销)
     */
    @DynamicEnum(type = "enable_status", basicType = BasicType.user)
    private int enableStatus
```

## 6、用户主键序列化成用户对象
添加注解` @JSONField(serializeUsing = ParseUserSerializer.class)`会将用户的主键序列化成json格式的用户数据，前提是必须实现`BaseParseUserService`的接口，并且能被spring注册
```java 
    /**
     * 修改人主键
     */
    @JSONField(serializeUsing = ParseUserSerializer.class)
    private Long updateUserId;
```
返回值格式：
```json
{
    "updateUserId": {
        "desc": "张三",
        "value": "123456789"
    }
}
```

## 7、将枚举转换成value对应的类型
前端传枚举对象 {"value":"1", "desc":"启用"} ，后端将value解析成对应类型字段。一般用于动态枚举，前端回传枚举对象使用
```java Form对象
    /**
     * 企业类型(1,舱单供应商，2.报关行供应商，3舱单和报关行供应商,4 普通货代)
     */
    @JSONField(deserializeUsing = JsonDeserializer.class)
    private Integer companyType;
```

```java VO 对象

    /**
     * 企业类型(1,舱单供应商，2.报关行供应商，3舱单和报关行供应商,4 普通货代)
     */
    @DynamicEnum(type = "company_type")
    private Integer companyType;
```

## 7、 前端枚举tag类型
状态对应的tag类型后后端配置（只限制于静态枚举）可选值：primary/success/info/warning/danger/volcano/orange/gold/yellow/lime/blue/purple/magenta  
例如：
<img :src="$withBase('/img/list_01.png')" alt="菜单列表"/>
Java 静态枚举配置则是
```java 
public enum UserEnableStatus implements BaseTagEnum<Integer> {
    enable(1, "启用", "success"),
    cancelled(2, "注销", "warning"),
    disabled(0, "禁用", "danger");


    private final int value;
    private final String desc;
    /**
     * 前端 tag 类型
     */
    private final String tagType;
```
需要继承`BaseTagEnum`并且设置对应的tag类型

## 8、文件上传
懿点网文件存储在阿里云服务器。每个项目配置一个文件桶，请开发人员上传文件的时候设置好文件夹
- 添加依赖
```xml
  <dependency>
    <groupId>cn.dian1</groupId>
    <artifactId>oss-spring-boot-starter</artifactId>
  </dependency>          
```
- 属性  

| 属性 | 类型 | 说明 |
|---|---|---|
| yidian\.oss\.way                    | enum   | 上传类型。mq：使用消息队列上传，synchronous：同步上传               |
| yidian\.oss\.mode                   | enum   | 上传到哪个供应商，默认ali。ali：阿里云，tencent：腾讯云（未实现）  |
| yidian\.oss\.ali\.endpoint          | String | Endpoint以杭州为例，其它Region请按实际情况填写。   |
| yidian\.oss\.ali\.accessKeyId       | String | RAM账号 |
| yidian\.oss\.ali\.accessKeySecret   | String | 账号秘钥   |
| yidian\.oss\.ali\.defaultBucketName | String | 当前项目定义的通，yidian开头，链接项目代码用户中横杠“\-”隔开，例如：yidian\-cms|


- 最佳使用  
定义项目文件存储的文件夹
```java
/**
 * @author laizuan
 * @since 2020年01月07日 15:50
 */
public enum UploadFolder {
    license("license");
    private final String value;
    UploadFolder(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

```
上传下载
```java
@Autowired
private UploadFileProvider uploadFileProvider;

// 注意，如果配置的是mq队列上传，上传附件的时候只能用此方法，
// 这个方法会返回上传后的文件地址目录地址，并且在定义的文件夹后面添加当前的日期：2020-03-01
String fileKey = uploadFileProvider.upload(new UploadFileDTO(byte[], UploadFolder.license.getValue(), "存储文件名"));
// fileKye = license/2020-03-01/存储文件名
// 这个fileKey即下载时候用到的key
// UploadFileDTO 对象上传图片（jpg,jpeg,webp,png,gif）的时候会进行压缩。详情请看imgCompression该属性

// 下载， 下载的时候会在阿里云上再次压缩，减少网络传输。
uploadFileProvider.downLoad(fileKey, imgCompression);
// imgCompression 图片的绝对质量，将原图质量压缩至imgCompression%，
// 如果原图质量小于指定参数值，则按照原图质量重新进行压缩。
// 例如，如果原图质量是95%，添加imgCompression = 90参数会得到质量90％的图片。
// 如果原图质量是80%，添加imgCompression = 90只能得到质量80%的图片。如果小于0不做处理
```

下载java代码
```java

    /**
     * 下载阿里云存储文件
     *
     * @param fileKey 文件存储key
     * @param bucketName 桶名称，如果为空下载当前项目配置的通
     * @param response
     */
    @GetMapping(value = "/downAttachment")
    public void downAttachment(String fileKey, String bucketName, HttpServletResponse response) {
        Assert.notNull(fileKey, "fileKey not be null");
        String ext = fileKey.substring(fileKey.lastIndexOf('.') + 1);
        response.setCharacterEncoding("utf-8");
        response.setHeader("Content-Disposition", String.format("inline;fileName=%s.%s", UUID.randomUUID().toString(), ext));
        response.setContentType("text/html; charset=UTF-8");
        UpmsBucket ossBucketConst = EnumUtils.getEnumByKey(UpmsBucket.class, bucketName);
        if (ossBucketConst == null) {
            throw new BusinessInvalidException("未设置有效的bucket name");
        }
        String ext = fileKey.substring(fileKey.lastIndexOf('.') + 1, fileKey.length());
        if (ext.equalsIgnoreCase("jpeg") || ext.equalsIgnoreCase("jpg") || ext.equalsIgnoreCase("png")) {
            response.setContentType("image/".concat(ext));
        } else if (ext.equalsIgnoreCase("pdf")) {
            response.setContentType("application/pdf");
        } else {
            response.setContentType("application/x-download");
        }

        byte[] bytes = null;
        if (StringUtils.isBlank(bucketName)) {
            bytes = uploadFileProvider.downLoad(fileKey, 50);
        } else {
            bytes = uploadFileProvider.downLoad(fileKey, bucketName, 50);
        }
      
      
        try(OutputStream out = response.getOutputStream()) {
            out.write(bytes);
            out.flush();
        } catch (Exception e) {
            log.error("输出文件失败：" + e.getMessage(), e);
             throw new FileUploadException("下载文件出错");
        } 
    }
```

## 9、日志
每个子系统测试和生产环境日志统一收集到日志中心，由日志中心统一搜索查看日志。服务器不在分配权限查看系统日志。
- 日志打印规范  
1. **如果打印日志有参数必须使用占位符** 
正例  
> log.info("姓名：{}，年龄：{}", name, age);  

反例 
> log.info("姓名："+name+"， 年龄：" + age);

2. 异常日志
::: warning
不同的业务异常请抛出相对的业务异常子类。请勿抛出Exception
:::
正例：  
```java {6}
    public Long add(@RequestBody @Valid SysDeptForm form) {
           String deptCode = form.getDeptCode();
           final Long companyId = getCompanyId();
           SysDept pojo = sysDeptService.findByDeptCode(deptCode, companyId);
           if (pojo != null) {
               throw new BusinessInvalidException(String.format("部门代码【%s】已存在，请重新输入", deptCode));
           } else {
               pojo = new SysDept();
           }
           BeanUtils.copyProperties(form, pojo);
           pojo.setCompanyId(companyId);
           sysDeptService.save(pojo);
           return pojo.getDeptId();
       }
```
```java {5}
        try {
            // todo
            ....
        } catch (BusinessInvalidException e) {
            log.error("保存部门异常：" + e.getMessage(), e);
        } 
```
反例：  
```java {5,6}
        try {
            // todo
            ....
        } catch (BusinessInvalidException e) {
            e.printStackTrace();
            log.error(e.getMessage());
        } 
```

- 将日志输出到日志中心  
添加Maven 依赖
```maven
        <dependency>
            <groupId>cn.dian1</groupId>
            <artifactId>elasticsearch-spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>cn.dian1</groupId>
            <artifactId>log-spring-boot-starter</artifactId>
        </dependency>
```
1. 注解方式 
::: warning
请在有必要的接口才记录日志，比如：修改重要数据，删除数据，查询接口请不要添加注解 
:::
 ```java
@Log(type = LogType.SYSTEM, description = "修改部门信息")
```
 属性：
> type: SYSTEM系统日志 or INTERFACE_REQUEST接口日志  
> description：方法描述

2. 工具类方式  
::: warning
请删除没有必要的日志输出
:::
字符串格式化规则请参考：java.long.String.format();
```java
     LogUtils.info(log, "姓名：%s，年龄：%s", name, age);
     LogUtils.info(log, "打印日志测试");
     LogUtils.error(log, "保存部门异常: %s", e, e.getMessage());
     LogUtils.error(log, "保存部门异常", e);
```

## 10、工具类
::: warning
各个子系统请勿随意定义工具类
:::
- [Hutool](https://www.hutool.cn/docs)工具类，引用模块如下  
1. [hutool-core：核心，包括Bean操作、日期、各种Util等](https://www.hutool.cn/docs/#/core/%E5%85%8B%E9%9A%86/%E6%94%AF%E6%8C%81%E6%B3%9B%E5%9E%8B%E7%9A%84%E5%85%8B%E9%9A%86%E6%8E%A5%E5%8F%A3%E5%92%8C%E5%85%8B%E9%9A%86%E7%B1%BB)
2. [hutool-crypto：加解密模块](https://www.hutool.cn/docs/#/crypto/%E6%A6%82%E8%BF%B0)
3. [hutool-extra：扩展模块，对第三方封装（模板引擎、邮件、Servlet、二维码、Emoji、FTP、分词等）](https://www.hutool.cn/docs/#/extra/%E6%A6%82%E8%BF%B0)

- apache 工具类
1. [参考文档](https://www.cnblogs.com/nhdlb/p/14070643.html)
