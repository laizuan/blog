# 文件存储组件

支持本地，阿里云 oss，Minio 文件上传下载

[toc]

## Maven 依赖

```xml
<dependency>
  <groupId>org.seedltd</groupId>
  <artifactId>seedltd-oss-starter</artifactId>
</dependency>
```

## 属性说明

| 类型      | 名称                | 说明                                                       | 默认值 | 版本 |
| --------- | ------------------- | ---------------------------------------------------------- | ------ | ---- |
| StoreType | seedltd.oss.type    | 存储类型，`local：本地存储, minio：Minion, ali：阿里云oss` |        |      |
| String    | seedltd.oss.baseUrl | 文件上传的基础路径，`local`模式下必填                      |        |      |

## 示例

```yaml
seedltd:
  oss:
    base-url: D:\\project\\upload
```

```java

/**
 *
 * 上传文件夹配置
 *
 * @author laizuan
 * @version 1.0
 * @since 2021/7/26 17:17
 */
public enum FolderBucket implements Bucket {
    PROFILE("profile", "");

    private final String bucketName;
    private final String folder;

    FolderBucket(String bucketName, String folder) {
        this.bucketName = bucketName;
        this.folder = folder;
    }

    public static FolderBucket getByBuckName(String bucketName) {
        FolderBucket[] values = FolderBucket.values();
        for (FolderBucket value : values) {
            if (value.getBucketName().equals(bucketName)) {
                return value;
            }
        }
        return null;
    }

    @Override
    public String getBucketName() {
        return this.bucketName;
    }

    public String getFolder() {
        return this.folder;
    }

    public String getPath(String fileName) {
        return this.folder + "/" + fileName;
    }
}

private final IOssService ossService;

// 上传
String path = ossService.upload(FolderBucket.PROFILE, "1.pdf", bytes);
System.out.println(path); //  out --->  /2021/8/23/1.pdf

// 下载
System.out.println(ossService.download(FolderBucket.PROFILE, "/2021/7/26/1.pdf").length); //  out ---> 8570626

// 删除
System.out.println(ossService.delete(FolderBucket.PROFILE, "/2021/7/26/1.pdf"));  //  out ---> true


```
