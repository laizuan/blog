# 常见问题收录
## 浏览器http跳转至https问题
### Chrome 浏览器
```text
1. 地址栏中输入 chrome://net-internals/#hsts
2. 在 Delete domain security policies 中输入项目的域名，并 Delete 删除
3. 可以在 Query domain 测试是否删除成功
```
### Firefox 浏览器

```text
1. 关闭所有已打开的页面
2. 清空历史记录和缓存
3. 地址栏输入 about:permissions
4. 搜索项目域名，并点击 Forget About This Site
```
