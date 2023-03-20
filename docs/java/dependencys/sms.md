# 短信

发送手机短信组件，目前集成了阿里云和腾讯云短信

### 依赖

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-sms-starter</artifactId>
    </dependency>
```

如果是使用阿里云需要加入

```xml
    <dependency>
      <groupId>com.aliyun</groupId>
      <artifactId>dysmsapi20170525</artifactId>
    </dependency>
```

腾讯云

```xml
    <dependency>
      <groupId>com.tencentcloudapi</groupId>
      <artifactId>tencentcloud-sdk-java-sms</artifactId>
    </dependency>
```

## 配置

| 属性名称                      | 类型    | 说明                                                         | 默认值                  | 版本 |
| ----------------------------- | ------- | ------------------------------------------------------------ | ----------------------- | ---- |
| leaderrun.sms.enabled         | boolean | 是否启用组件                                                 | true                    |      |
| leaderrun.sms.type            | Enum    | 短信提供商，ALIYUN：阿里云，TENCENT：腾讯云                  | ALIYUN                  |      |
| leaderrun.sms.endpoint        | String  | 配置节点，不填写使用默认阿里云 `dysmsapi.aliyuncs.com` ，腾讯云 sms.tencentcloudapi.com | `dysmsapi.aliyuncs.com` |      |
| leaderrun.sms.accessKeyId     | String  | 供应商提供的秘钥ID                                           | -                       |      |
| leaderrun.sms.accessKeySecret | String  | 供应商提供的秘钥密码                                         | -                       |      |
| leaderrun.sms.signName        | String  | 短信开头签名，比如：【立航】xxxxx，那么填写立航。在供应商后台申请 | -                       |      |
| leaderrun.sms.sdkAppId        | String  | 短信应用ID (腾讯专属)                                        | -                       |      |

## 范例

```java
private final SmsTemplate<SendSmsResponseBody> smsTemplate; // 阿里云示例
private final SmsTemplate<SendStatus[]> smsTemplate; // 腾讯云示例


// 以阿里云为例
SmsResult<SendSmsResponseBody> send = smsTemplate.send(mobile, "templateId", Map.of("code", smsCode));

if (send.isSuccess()) {
    captchaStoreService.deleteCaptcha(mobile);
    stringRedisTemplate.opsForValue().set(key, smsCode, 30, TimeUnit.MINUTES);
    return true;
}
```

