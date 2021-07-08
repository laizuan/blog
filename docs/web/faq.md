# 常见问题

## 格式化代码 eslint 校验异常： Delete `␍`eslint(prettier/prettier) 错误的解决方案

windows 下和 linux 下的文本文件的换行符不一致导致。运行以下命令解决：

```shell
git config --global core.autocrlf false
```

**注意：git 全局配置之后，你需要重新拉取代码。**



## 控制台出现 `[Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive. See`警告

> 原因是 Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；
>
> Passive Event Listeners：就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能。当属性passive的值为true的时候，代表该监听器内部不会调用preventDefault函数来阻止默认滑动行为，Chrome浏览器称这类型的监听器为被动（passive）监听器。目前Chrome主要利用该特性来优化页面的滑动性能，所以Passive Event Listeners特性当前仅支持mousewheel/touch相关事件。

解决方案

- 安装`yarn add default-passive-events`依赖
- 在`main.js`中添加`import 'default-passive-events';`



## 缓存

