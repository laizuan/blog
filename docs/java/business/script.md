# 动态脚本

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>business-script</artifactId>
    </dependency>
```

在线编辑代码实时生效的埋点脚本。

- 在线编辑后保存在数据库中并且热更新代码
- 项目启动时自动解析脚本并缓存脚本
- 支持集群，脚本更新后会通知集群重置缓存中的脚本代码

## 注意事项

- 所有的脚本本质和 Java 类一样，在启动的时候已经创建了这个脚本。所以它不是线程安全的，不应该去操作全局变量
- `params`是一个`JSON`的键值对，它会解析成`map`对象。在创建脚本对象的时候会通过构造器传入`map`
  参数。换句话说就是如果你配置了`params`那么你的脚本需要有`Map<String, Object>`的构造器
- 注意所有脚本代码的`import`都必须是全路径，不能有`*`号导入。
- 不需要在脚本头部写`package`包
- 注意传递的参数和脚本入参顺序必须保持一致

## 程序埋点

使用方法：`BuriedScript.execute(script, args)`

如果`java`使用在线热更新会非常麻烦，所以我们需要借助脚本的力量。在代码中打埋点，如果需求有变化可以快速的更改并生效

拿`cm`中的工厂提交之前校验代码为例，在前置和后置打入埋点。如果后续有新增新的校验规则可以在脚本中直接实现

```java
 @Override
@Transactional(readOnly = true)
public LogicResultVO validateOrder(CustomsCmd bo) {
    LogicResultVO execute=orderValidateStrategy.factorySubmitOrderValidate(bo);
    if(execute.isDanger()){
      return execute;
    }

    // 执行前置埋点代码代码 {@see com.leaderrun.cm.groovy.FactorySubmitValidatePostProcessor#before}
    boolean resume=
    BuriedScript.execute(ScriptConst.FactorySubmitValidatePostProcessor_Before,bo,execute);
    if(!resume){
      return execute;
    }

    IOrderConverter<CustomsCmd, CustomsOrderBridge> converter=
    orderConverterStrategy.converterFactorySubmitOrder(bo.getBusinessType());

    CustomsOrderBridge customsOrder=converter.converter(bo,null);
    orderValidateStrategy.factorySubmitOrderValidate(customsOrder,execute);

    List<Object> data=Lists.newArrayList();
    data.add(customsOrder);
    data.add(customsOrder.getCommodityList());
    data.add(customsOrder.getDocuList());
    data.add(customsOrder.getInvt());
    data.add(customsOrder.getDec());
    data.add(customsOrder.getHandbook());

    logicService.valid(execute,GlobalConst.LOGIC_USE_SUBMIT_ORDER,bo.getBusinessType(),data);

    // 执行后置埋点代码代码 {@see com.leaderrun.cm.groovy.FactorySubmitValidatePostProcessor#after}
    BuriedScript.execute(
    ScriptConst.FactorySubmitValidatePostProcessor_After,bo,customsOrder,execute);
    return execute;
}
```

脚本代码

**所有脚本代码都必须有详细的注释。包括实现的步骤**

```groovy
import com.leaderrun.cm.model.command.cust.factory.CustomsCmd
import com.leaderrun.cm.model.vo.sys.LogicResultVO
import com.leaderrun.cm.service.impl.cust.inbound.strategy.CustomsOrderBridge


/**
 * 工厂提交代码前会调用校验接口，该埋点用于校验的前置和后置处理
 */
class FactorySubmitValidatePostProcessor {

    /**
     * 工厂提交代码调用接口校验，在基础信息校验(HibernateValidation)完成后埋点代码。
     * @param bo 工厂提交的数据
     * @param result 校验结果
     * @return 如果返回true则继续执行后续的代码，否则直接返回{@code result}内容
     */
    boolean before(CustomsCmd bo, LogicResultVO result) {
        return true
    }

    /**
     * 工厂提交代码调用接口校验，在所有校验执行完成后执行后置埋点代码
     * @param bo 工厂提交的数据
     * @param customsOrder 转换后的数据
     * @param result 校验的结果
     */
    void after(CustomsCmd bo, CustomsOrderBridge customsOrder, LogicResultVO result) {

    }
}
```

## Curd

See `com.leaderrun.business.script.service.ScriptService.java`

## SQL

```sql
/*
 Navicat Premium Data Transfer

 Source Server         : devops.leaderrun.com
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : devops.leaderrun.com:3306
 Source Schema         : cm

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 05/08/2023 11:13:57
*/

SET NAMES utf8mb4;
SET
FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_script
-- ----------------------------
DROP TABLE IF EXISTS `t_script`;
CREATE TABLE `t_script`
(
    `id`             bigint                                                        NOT NULL COMMENT '主键',
    `code`           varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '唯一编码',
    `script_content` blob NULL COMMENT '脚本内容',
    `create_by`      bigint                                                        NOT NULL COMMENT '创建人',
    `create_time`    datetime(6) NOT NULL COMMENT '创建时间',
    `update_by`      bigint NULL DEFAULT NULL COMMENT '最后一次修改时间',
    `update_time`    datetime(6) NULL DEFAULT NULL COMMENT '最后一次修改时间',
    `disabled`       bit(1)                                                        NOT NULL COMMENT '启用状态(1启用 0禁用)',
    `remark`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '脚本描述',
    `md5`            varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '脚本MD5',
    `params`         blob NULL COMMENT '初始化类构成参数，会解析成Map<String, Object>对象',
    `title`          varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `idx_code`(`code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET
FOREIGN_KEY_CHECKS = 1;
```
