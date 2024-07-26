## 验证码

提供获取图片验证码，并提供验证入口。你可以通过`/create-captcha`或者`/refresh-captcha`来创建或者刷新验证码，其实他们两个没有区别执行的都是一样的函数

::: tip 提示

如果需要，可以设置`/create-captcha,/refresh-captcha`这两个url不需要授权访问

:::

### 依赖

```xml
<dependency>
    <groupId>org.seedltd</groupId>
    <artifactId>seedltd-captcha-starter</artifactId>
</dependency>
```

### 属性

| **字段**                        | **说明**                                | **默认值**   | **可选值**                                  |
| ------------------------------- | --------------------------------------- | ------------ | ------------------------------------------- |
| seedltd.captcha.enabled         | 是否启用验证码                          | true         |                                             |
| seedltd.captcha.width           | 验证码宽度                              | 120          |                                             |
| seedltd.captcha.height          | 验证码高度                              | 40           |                                             |
| seedltd.captcha.length          | 验证码字数，`mode=ARITHMETIC`该属性无效 | 4            |                                             |
| seedltd.captcha.mode            | 验证码模式                              | `GIF`        | `cn.seedltd.captcha.properties.CaptchaMode` |
| seedltd.captcha.type            | 验证码内容类型                          | 2            | `cn.seedltd.captcha.properties.CharType`    |
| seedltd.captcha.store           | 验证码存储类型                          | memory       | `redis, memory`                             |
| seedltd.captcha.expired         | 验证码过期时间，单位秒                  | 120          |                                             |
| seedltd.captcha.initialCapacity | StoreMode.memory 的时候初始化容器大小   | 528          |                                             |
| seedltd.captcha.maximumSize     | StoreMode.memory 的时候容器最大存储容量 | 10240        |                                             |
| seedltd.captcha.keyParameter    | 获取验证码时候的唯一key值               | `captchaKay` |                                             |

### 验证

```java
@Autowired
private CaptchaStoreService captchaStoreService;

// 验证用户输入的验证码是否正确
captchaStoreService.verifyCaptcha(key, captcha)

// 删除验证码
captchaStoreService.deleteCaptcha(key)
```
### API

#### 获取验证码

- Method：`GET`

- URL：`/create-captcha,/refresh-captcha`

- Parameter

  | **类型** | **字段**                         | **说明**                                   | **默认值** | **可选值**                                          | 是否必填 |
  | -------- | -------------------------------- | ------------------------------------------ | ---------- | --------------------------------------------------- | -------- |
  | String   | `[seedltd.captcha.keyParameter]` | 获取验证码的唯一标识，可以通过配置文件设置 | -          | -                                                   | 是       |
  | Integer  | charType                         | 验证码内容类型                             | 全局配置   | 参考：`cn.seedltd.captcha.properties.CharType`类    | 否       |
  | Integer  | width                            | 验证码宽度                                 | 全局配置   | -                                                   | 否       |
  | Integer  | height                           | 验证码高度                                 | 全局配置   | -                                                   | 否       |
  | Integer  | length                           | 验证码字数，`mode=ARITHMETIC`该属性无效    | 全局配置   | -                                                   | 否       |
  | String   | mode                             | 验证码模式                                 | 全局配置   | 参考：`cn.seedltd.captcha.properties.CaptchaMode`类 | 否       |
