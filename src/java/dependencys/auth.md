# 权限

所有的权限校验都在网关中处理，验证通过后才会调用到子系统。如果网关鉴权失败则返回`403`状态码，如果没有登录会跳转到登录页面，AJax 请求则返回`401`的错误码

如果要在运行时获取当前登录用户的信息可以使用`SecurityUserUtils.getLoginUser()`来是现实。需要注意的是如果**当前用户没有登录则会抛出`401`的错误码**

## 依赖

```xml
  <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-security-starter</artifactId>
  </dependency>
```

## 接口鉴权

使用`@PreAuthorize`注解在方法上标注，或者在控制器类中标注。

如果不需要登录的接口可以使用`@IgnoreAuth`注解，可以标注在接口方法或者类上。如果是标注在控制器类上则表示该控制器的所有接口都不要登录鉴权。如果接口没有使用权限注解`@PreAuthorize`和`@IgnoreAuth`则表示只要登录了就可以访问

## 注意事项

- 目前支持`@PreAuthorize`，不支持其它`SpringSecurity`的权限注解。

- `El`表达式只支持`hasAuthority(String)`/`hasAnyAuthority(String[])`/`hasRole(String)`/`hasAnyRole(String[])`

- 如果控制器类上标注了`@IgnoreAuth`那么即便你的接口有主键权限`@PreAuthorize`也会被视为不需要登录。前者的优先权大于后者

- 由于是在网关鉴权，那么内部`PRC`调用服务的时候是不会走网关的，所有不被调用者的接口权限是不被校验的。举例： `upm`有一个`userInfo`接口，`userInfo`接口标注了`@PreAuthorize('user:info')`说明`userInfo`需要`user:info`权限。`cm` 调用 `upm`的`userInfo`接口的时候如果调用者没有`user:info`权限也能调用，这是网关鉴权时候的一个弊端。

- 需要添加依赖，应为`SecurityUserUtils.getLoginUser()`获取当前登录用户所在部门的所有用户主键的时候需要`RPC`调用用户中心的接口获取

  ```xml
          <dependency>
              <groupId>com.leaderrun</groupId>
              <artifactId>business-upm-api</artifactId>
          </dependency>
  ```

  
