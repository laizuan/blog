# 常见问题

## 格式化代码 eslint 校验异常： Delete `␍`eslint(prettier/prettier) 错误的解决方案

windows 下和 linux 下的文本文件的换行符不一致导致。运行以下命令解决：

```shell
git config --global core.autocrlf false
```

**注意：git 全局配置之后，你需要重新拉取代码。**
