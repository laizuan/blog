# 用户中心基础数据接口

获取用户相关信息和企业相关信息，在创建用户和创建企业的时候都会有相关的 MQ 事件发布，如果需要同步数据可以在接收到消息后调用接口获取详细的数据

## 依赖

```xml
 <dependency>
     <groupId>com.leaderrun</groupId>
     <artifactId>business-upm-api</artifactId>
 </dependency>
```

## API

**所有接口中的 default 默认方法都只是用来清空缓存使用**

- 用户相关接口
  有`@CacheEvict`表示这个接口有缓存，不过你不需要处理这些缓存过期，组件会自动处理缓存问题。更多内容可以查看`UserApiService`源码

```java
public interface UserApiService {

  /**
   * 获取用户信息
   *
   * @param userId 用户主键
   * @return 用户详细信息，包含企业名称和代码
   */
  @Cacheable(key = "#p0")
  @GetMapping("/{userId}")
  UserDTO get(@PathVariable("userId") Long userId);

  /**
   * 获取用户系统下的菜单
   *
   * @param userId 用户主键
   * @return 用户拥有的系统菜单权限
   */
  @GetMapping("/{userId}/menu")
  List<UserMenuDTO> menu(@PathVariable("userId") Long userId);

  /**
   * 获取用户角色集合
   *
   * @param userId 用户集合
   * @return 用户系统角色集合
   */
  @GetMapping("/{userId}/authority")
  List<UserAuthorityDTO> userAuthority(@PathVariable("userId") Long userId);

  /**
   * 获取用户拥有的有效部门数据
   *
   * @param userId 用户主键
   * @return 用户所在部门数据
   */
  @GetMapping("/{userId}/dept")
  List<DeptDTO> userDept(@PathVariable("userId") Long userId);

  /**
   * 获取部门下的用户主键集合
   *
   * @param deptId 部门主键
   * @return 部门用户主键集合
   */
  @GetMapping("/dept/{deptId}")
  Set<Long> deptUserIds(@PathVariable("deptId") Long deptId);

  /**
   * 获取用户所在部门，部门中所有的数据
   *
   * <h1>该方法有缓存，以下场景需要清空缓存</h1>
   *
   * <pre>
   *     1. 部门数据变更时候需要清空
   *     2. 企业下所有用户的部门变更后需要清空
   * </pre>
   *
   * @param userId 用户主键
   * @return 用户所在部门，部门中所有的数据
   */
  @GetMapping("/{userId}/dept/users")
  @Cacheable(key = "'dept:users:' + #p0")
  Set<Long> deptUserId(@PathVariable("userId") Long userId);

  @CacheEvict(key = "#p0")
  default void clearUserCache(Long userId) {}

  @CacheEvict(key = "'dept:users:' + #p0")
  default void clearUserDept(Long userId) {}
}
```

- 企业信息相关

```java
public interface EnterpriseApiService {

  /**
   * 获取企业详情数据
   *
   * <h1>该接口有缓存</h1>
   *
   * @param entId 企业主键
   * @return 企业详情数据
   */
  @GetMapping("/{entId}")
  @Cacheable(key = "#p0")
  EnterpriseDTO get(@PathVariable("entId") Long entId);

  @CacheEvict(key = "#p0")
  default void clearEntCache(Long entId) {}
}
```

## MQ事件

需要注意的是不管是用户或企业`新增、删除、修改`都只有一个事件，你可以收到事件后调用相关接口来获取，没有获取到则表示删除。在用户中心的设计中，不提供删除用户和企业功能，只有`启用、禁用`来标识

- 用户信息相关事件

  如果你要想接收到用户`创建、删除、修改`的消息只需要实现`UserApiMessageService`接口并且实现类能被`Spring`托管。然后再配置文件中新增

  ```yaml
  spring:
    cloud:
      stream:
        function:
          definition: user;deptClearUserCache
        rocketmq:
          bindings:
            user-in-0:
              consumer:
                enabled: ${leaderrun.bizupm.user-enabled:true}
                subscription: user
            deptClearUserCache-in-0:
              consumer:
                enabled: ${leaderrun.bizupm.user-enabled:true}
                subscription: deptClearUserCache
        bindings:
          user-in-0:
            destination: upm
            group: ${spring.application.name}-user
          deptClearUserCache-in-0:
            destination: upm
            group: ${spring.application.name}-dcuc
  ```

  你可以使用`leaderrun.bizupm.user-enabled=false`来禁用来自`MQ`的消息

- 企业信息相关事件

  实现`EnterpriseMessageService`接口既可以收到企业`修改、新增、删除`的事件。配置文件新增：

  ```yaml
  spring:
    cloud:
      stream:
        function:
          definition: ent
        rocketmq:
          bindings:
            ent-in-0:
              consumer:
                enabled: ${leaderrun.bizupm.ent-enabled:true}
                subscription: ent
        bindings:
          ent-in-0:
            destination: upm
            group: ${spring.application.name}-ent
  ```

  你可以使用`leaderrun.bizupm.ent-enabled=false`禁用`MQ`消息

​	
