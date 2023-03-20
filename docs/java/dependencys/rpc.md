# Rpc

服务之间接口调用。

## 规范

### 提供者

所有接口写到`xx-web > controller > provider`中。接口地址已`/api/xxx/rpc/v1/xxxx`规则，详细可以查看`用户中心（upm）`的示例

### 消费者

在`xxx-service > mq > consumer`定义`Rpc`调用接口，`fallbackFactory`熔断降级异常处理类和接口同级。如果需要自己实现降级则把降级类写到`xxx-service > service > impl`中。类名的前缀和接口定义保持一致。

比如：`AccountService`是接口定义，`AccountServiceFallbackFactory`熔断定义，`AccountServiceImpl`降级定义

### 依赖

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>leaderrun-rpc-starter</artifactId>
    </dependency>
```

## 消费者范例

在`xxx-service > mq > consumer`包中定义消费接口。`DTO`返回值定义到`xxx-service > mq > consumer > dto`中

```java
package com.leaderrun.oss.mq.consumer;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.leaderrun.base.consts.Constant;
import com.leaderrun.oss.model.command.LoginCmd;
import com.leaderrun.oss.mq.consumer.dto.LoginDTO;
// name: 需要调用的接口系统名称，在全局中以及定义了所有系统代码
// path: 定义基础路径
// fallbackFactory: 定义降级异常处理，远程调用如果提供者没有返回200的http状态码都会进入到这个类中
@FeignClient(name = Constant.SYSTEM_CODE_UPM, path = "/api/upm/rpc/v1" ,fallbackFactory = AccountServiceFallbackFactory.class)
public interface AccountService {

    // @RequestBody 表示发送json数据，不加表示发送表单数据
    @PostMapping( "/account/login")
    LoginDTO login(@RequestBody LoginCmd cmd);
}
```

在接口定义的同一层级中定义熔断异常处理

```java
package com.leaderrun.oss.mq.consumer;

import org.springframework.stereotype.Component;

import com.leaderrun.base.exception.RpcException;
import com.leaderrun.log.LogWrapper;
import com.leaderrun.rpc.core.AbstractFallbackFactory;

@Component
public class AccountServiceFallbackFactory extends AbstractFallbackFactory<AccountService> {
    private final LogWrapper log = LogWrapper.getLogger(this.getClass());
    
    @Override
    public AccountService doCreate(Throwable cause) {
        log.error( "RPC异常：" + cause.getMessage(), cause);
        // 这里不做降级直接把异常抛出
        throw  RpcException.builder(cause.getMessage(), cause);
        
       // 如果要做降级这里可以返回AccountService的实现类
        return AccountServiceImpl
    }
}
```

实现降级，出现异常的时候会调用降级的方法。

```java
package com.leaderrun.oss.service.impl;

import org.springframework.stereotype.Component;

import com.leaderrun.oss.model.command.LoginCmd;
import com.leaderrun.oss.mq.consumer.AccountService;
import com.leaderrun.oss.mq.consumer.dto.LoginDTO;

@Component
public class AccountServiceImpl implements AccountService {

    @Override
    public LoginDTO login(LoginCmd cmd) {
        // 这里去返回降级数据。
        return null;
    }
}
```

