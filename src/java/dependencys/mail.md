# 邮件模块

支持单服务器和多邮件服务器，单服务器配置只需要在配置文件中 `spring.mail`替换成 `seedltd.mail`即可。多服务器配置需要实现 `MailConfigService#getMailProperties()`方法。返回邮件配置列表。单服务和多服务可以组合使用，单服务为默认的邮件服务，如果没有配置请不要使用`switchoverToDefault()`方法。

可以使用 `seedltd.mail.enabled=false`来禁用邮件模块

[TOC]

## Maven 依赖

```xml
<dependency>
  <groupId>org.seedltd</groupId>
  <artifactId>seedltd-mail-starter</artifactId>
</dependency>
```

## 属性说明

属性配置请参考 `spring.mail` 源码文件地址：` org.springframework.boot.autoconfigure.mail.MailProperties`

## 示例

```java
private final MailService mailService;

// 随机一个邮件服务发送
mailService.switchoverToRandom().send(StringUtils.split(rbTo, ","), StringUtils.split(rbCc, ","),
                        "subject", "content");


// 使用默认的邮件服务发送，需要在配置文件配置
mailService.switchoverToDefault().send(StringUtils.split(rbTo, ","), StringUtils.split(rbCc, ","),
                        "subject", "content");

// 选择一个邮件服务发送，参数为发送的邮箱账号
mailService.switchoverTo(username).send(StringUtils.split(rbTo, ","), StringUtils.split(rbCc, ","),
                        "用户投递样本通知", content);
```
