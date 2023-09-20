# Sftp & Ftp

操作`Sftp`和`Ftp`。支持多实例，支持每个实例独享一个线程池

## Maven 依赖

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-ssh-starter</artifactId>
    </dependency>
```

## 属性说明

| **字段**              | **类型**                      | **说明** | **默认值** | **可选值** |
| --------------------- | ----------------------------- | -------- | ---------- | ---------- |
| leaderrun.ssh.enabled | boolean                       | 是否启用 | true       | -          |
| leaderrun.ssh.sftp    | `Map<String, SftpProperties>` | 是否启用 | -          | -          |
| leaderrun.ssh.ftp     | `Map<String, FtpProperties>`  | 是否启用 | -          | -          |

### SftpProperties

| **字段**       | **类型** | **说明**                                     | **默认值** | **可选值** |
| -------------- | -------- | -------------------------------------------- | ---------- | ---------- |
| enabled        | boolean  | 是否启用                                     | true       | -          |
| host           | String   | 需要链接的主机                               | -          | -          |
| port           | int      | 链接端口号                                   | `22`       | -          |
| username       | String   | 用户名                                       | -          | -          |
| password       | String   | 密码                                         | -          | -          |
| connectTimeout | int      | 链接超时时间（毫秒）                         | `6000`     | -          |
| privateKey     | String   | 私钥内容。秘钥不为空的时候默认使用秘钥链接。 | -          | -          |
| passphrase     | String   | 私钥文件的密码，可以为 null                  | -          | -          |
| basePath       | String   | 操作的基础目录                               | -          | -          |
| pool           | SshPool  | 连接池配置                                   | -          | -          |

### FtpProperties

| **字段**           | **类型** | **说明**                 | **默认值** | **可选值**                  |
| ------------------ | -------- | ------------------------ | ---------- | --------------------------- |
| enabled            | boolean  | 是否启用                 | true       | -                           |
| host               | String   | 需要链接的主机           | -          | -                           |
| port               | int      | 链接端口号               | `21`       | -                           |
| username           | String   | 用户名                   | -          | -                           |
| password           | String   | 密码                     | -          | -                           |
| connectTimeout     | int      | 链接超时时间（毫秒）     | `6000`     | -                           |
| charset            | Charset  | 字符集                   | `UTF_8`    | -                           |
| systemKey          | String   | 设置服务器系统关键词     | -          | -                           |
| serverLanguageCode | String   | 设置服务器语言           | -          | -                           |
| ftpMode            | FtpMode  | Ftp 主动模式和被动模式   | -          | `Active:主动，Passive:被动` |
| basePath           | String   | 连接操作的基础目录池配置 | -          | -                           |
| pool               | SshPool  | 连接池配置               | -          | -                           |

### SshPool

[See](https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/BaseObjectPoolConfig.html)

## 示例

```java
// 操作SFTP
private final SftpTemplate sftpTemplate;

// 操作 FTP
private final FtpTemplate ftpTemplate;
```
