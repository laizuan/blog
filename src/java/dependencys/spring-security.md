# seedltd-spring-security-starter

- 如果是单机模式建议使用`seedltd.security.cache.type=memory`模式，如果你是集群或者使用了`redis`那么我建议你使用`seedltd.security.cache.type=multilevel`。如果使用`seedltd.security.cache.type=redis`模式每个请求过来都会请求一次`redis`造成资源浪费。
- 在`multilevel`模式中，在进程中有一份缓存它的有效时间是`seedltd.security.cache.expiredTime`的四分之一。这样做的原因是防止内存中的数据比`redis`中的存活时间久。如果内存中没有数据会加载`redis`中的数据设置在内存中，并且重置`redis`的过期时间为`expiredTime`。当用户退出的时候会通过 redis 的发布订阅方式通知到集群中的各台机器清空内存中的授权缓存
- 登入成功后回调`LoginCallback#success(httpServletRequest, userId, accessToken)`接口。回传用户主键和当前登入的 token。

:::tip 提示

可以通过java spi实现对`SecurityPostProcessorHandle`接口补充或者拓展 `url` 权限控制和 `security` 配置

:::

## Maven 依赖

```xml
    <dependency>
      <groupId>org.seedltd</groupId>
      <artifactId>seedltd-spring-security-starter</artifactId>
    </dependency>
```

如果需要`redis`或者`multilevel`缓存，那么你还需要添加`redis`依赖

```xml
 	<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
```

## FAQ

## 属性配置

| 类型          | 名称                                    | 说明                                                         | 默认值       |
| ------------- | --------------------------------------- | ------------------------------------------------------------ | ------------ |
| `Set<String>` | seedltd.security.ignore                 | 不需要认证的路径                                             |              |
| Cache         | seedltd.security.cache                  | 缓存配置                                                     |              |
| String        | seedltd.security.alwaysRemember         | 是否开启记住我模式                                           | true         |
| String        | seedltd.security.rememberMeParameter    | 记住我字段名称                                               | `rememberMe` |
| String        | seedltd.security.rememberMeCookieDomain | 记住我cookie保存域                                           |              |
| int           | seedltd.security.tokenValidity          | 记住我模式允许指定令牌的有效时间(以天为单位)                 | 30           |
| boolean       | seedltd.security.captcha                | 是否开启验证码                                               | true         |
| int           | seedltd.security.retry                  | 开启验证码后登入重试几次后显示验证码，0表示开启后始终显示，默认登入3次失败即需要输入验证码。 | 3            |
| String        | seedltd.security.captchaKeyParameter    | 获取图片验证码时候的key参数名                                | `captchaKay` |

### Cache

| 类型   | 名称                                   | 说明                                                         | 默认值   |
| ------ | -------------------------------------- | ------------------------------------------------------------ | -------- |
| long   | seedltd.security.cache.expiredTime     | 过期时间，单位：秒 。如果开启多级缓存，那么一级缓存失效时间是该值的 1/4 | 7200     |
| String | seedltd.security.cache.prefix          | 缓存 KEY 前缀                                                | security |
| String | seedltd.security.cache.type            | 缓存类型。memory：内存缓存，redis：redis 缓存，multilevel：多层缓存，memory 定义一级缓存，redis 定义二级缓存 | memory   |
| int    | seedltd.security.cache.initialCapacity | 内存缓存初始化容器大小                                       | 10240    |
| long   | seedltd.security.cache.maximumSize     | 内存缓存最大缓存条数，达到该设置值开始淘汰不活跃的数据       | 10000    |

## API

### 验证码登入

输入账户密码和图片验证登入系统。

- Method：`POST`

- URL：`/auth/login`

- Parameter

  | **类型** | **字段**                                | **说明**                                           | **默认值** | **可选值** | 是否必填 |
  | -------- | --------------------------------------- | -------------------------------------------------- | ---------- | ---------- | -------- |
  | String   | username                                | 登入账户                                           | -          | -          | 是       |
  | String   | password                                | 登入密码                                           | -          | -          | 是       |
  | String   | captcha                                 | 图片验证码                                         | -          | -          | 否       |
  | String   | `[seedltd.captcha.captchaKeyParameter]` | 获取图片验证码时候的唯一标识，可以通过配置文件设置 | -          | -          | 否       |

登入成功样例：

- `access_token`登入令牌，后面的请求头中需要带上该令牌。`Authorization:Bearer 36566fac-8cb0-4f0c-9bee-33a5e7727965`

```json
{
    "msg": "登入成功",
    "data": {
        "access_token": "36566fac-8cb0-4f0c-9bee-33a5e7727965"
    },
    "status": "200"
}
```

登入失败样例：

- `showCaptcha`下一次重试登入是否需要验证码，0不需要，1需要
- `retry`登入失败重试次数

```json
{
    "msg": "用户名或密码错误",
    "data": {
        "retry": 1,
        "showCaptcha": 0
    },
    "status": "408"
}

{
    "msg": "验证码不能为空",
    "data": {
        "retry": 4,
        "showCaptcha": 1
    },
    "status": "405"
}

{
    "msg": "验证码错误",
    "data": {
        "retry": 5,
        "showCaptcha": 1
    },
    "status": "405"
}
```



### 手机短信登入

## 微信小程序登入

需要实现`WeCharUserDetailsService#loadUserByOpenId`接口。根据用户的`openid`返回用户的信息。

- [小程序登入官方文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)。登入流程请看[小程序登入流程](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)。
- 后端登入地址：`/auth/wx-mini-app/login`

### API

- Method：`POST`

- URL：`/auth/wx-mini-app/login`

- Parameter

  | **类型** | **字段** | **说明**       | **默认值** | **可选值** | 是否必填 |
  | -------- | -------- | -------------- | ---------- | ---------- | -------- |
  | String   | code     | 小程序登入code | -          | -          | 是       |

#### 属性配置

| 类型          | 名称                       | 说明       | 默认值 |
| ------------- | -------------------------- | ---------- | ------ |
| `Set<Config>` | seedltd.wx.miniapp.configs | 小程序配置 | -      |

Config

| 类型   | 名称   | 说明                    | 默认值 |
| ------ | ------ | ----------------------- | ------ |
| String | appid  | 设置微信小程序的 appid  | -      |
| String | secret | 设置微信小程序的 Secret | -      |

## 错误码

| 错误码 | 错误内容                 |
| ------ | ------------------------ |
| 401    | 登入过期                 |
| 403    | 没有权限访问该资源       |
| 405    | 登入失败次数超过设定阈值 |
| 406    | 验证码输入错误           |
| 407    | 微信登入认证失败         |
| 408    | 登入失败                 |

