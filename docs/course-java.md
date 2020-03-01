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
如果需要form表单提交需要在类注解上添加`configuration = FeignFormEncoderConfig.class`属性，这是时候`@PostMapping`会以form的形式请求接口，提供方也就不需要`@RequestBody`注解就能获取到参数  
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
添加注解`@DynamicEnum`  
`type` 字典表里面的key  
`basicType` 字典类型，user用户私有字典数据，system公用的系统字典数据
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

## 7、前端状态动态tag样式
状态对应的tag类型后后端配置（只限制于静态枚举）  
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