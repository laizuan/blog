# 业务字典

```xml
    <dependency>
      <groupId>com.leaderrun</groupId>
      <artifactId>business-dict</artifactId>
    </dependency>
```

## 建表语句

- 类型表

```sql
CREATE TABLE `sys_dict_type`  (
  `dict_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型代码',
  `create_by` bigint NOT NULL COMMENT '创建人',
  `create_time` datetime(6) NOT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '最后一次修改时间',
  `update_time` datetime(6) NULL DEFAULT NULL COMMENT '最后一次修改时间',
  `dict_desc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型描述',
  `disabled` tinyint NOT NULL COMMENT '启用状态(0启用 1禁用)',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `sort_no` smallint NOT NULL COMMENT '排序',
  INDEX `idx_dictType`(`dict_type` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;
```

- 数据表

```sql
CREATE TABLE `sys_dict_data`  (
  `id` bigint NOT NULL COMMENT '主键',
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '显示名称',
  `disabled` tinyint NOT NULL COMMENT '启用状态(0启用 1禁用)',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `sort_no` smallint NOT NULL COMMENT '排序',
  `tag_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '前端状态类型',
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典值',
  `value2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典值2',
  `value3` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典值3',
  `value4` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典值4',
  `value5` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典值5',
  `dict_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型',
  `disabled_select` bit(1) NOT NULL COMMENT '前端是否禁用不可选',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_dictType_sortNo`(`dict_type` ASC, `sort_no` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;
```

## 控制器层

该组件没有集成控制层，参考示例代码：

```java
package com.leaderrun.upm.controller.sys;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.leaderrun.base.model.BasePage;
import com.leaderrun.business.dict.command.SysDictDataCmd;
import com.leaderrun.business.dict.command.SysDictTypeCmd;
import com.leaderrun.business.dict.command.query.SysDictListCmdQry;
import com.leaderrun.business.dict.service.SysDictService;
import com.leaderrun.business.dict.vo.SysDictDataVO;
import com.leaderrun.business.dict.vo.SysDictTypeVO;
import com.leaderrun.core.base.BaseController;
import com.leaderrun.upm.constants.GlobalConstant;

import lombok.RequiredArgsConstructor;

/**
 *
 * 字典类型控制器
 *
 * @author laizuan
 * @version 1.0
 * @since 2023/02/15
 */
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('sys:dict:all')")
@RequestMapping(GlobalConstant.VERSION_1 + "/dict")
public class SysDictController extends BaseController<SysDictService> {

    /**
     * 新增
     *
     * @param cmd 字典类型表单数据
     * @return 字典类型主键
     */
    @PostMapping(value = "/type/create")
    public boolean create(@RequestBody @Validated SysDictTypeCmd cmd) {
        return baseService.createDictType(cmd);
    }

    /**
     * 获取详情
     *
     * @param dictType 字典类型主键
     * @return 字典类型
     */
    @GetMapping(value = "/type/{dictType}/get")
    public SysDictTypeVO get(@PathVariable String dictType) {
        return baseService.findDictTypeById(dictType);
    }

    /**
     * 修改
     *
     * @param cmd 字典类型表单数据
     * @return 修改状态。true标识修改成功，false标识修改失败
     */
    @PostMapping(value = "/type/update")
    public boolean update(@RequestBody @Validated SysDictTypeCmd cmd) {
        return baseService.updateDictType(cmd);
    }

    /**
     * 删除
     *
     * @param dictType 字典类型
     * @return 删除状态。true标识修改成功，false标识修改失败
     */
    @GetMapping(value = "/type/{dictType}/delete")
    public boolean delete(@PathVariable String dictType) {
        return baseService.deleteDictType(dictType);
    }

    /**
     * 字典类型列表
     *
     * @param query 查询条件
     * @return 字典类型列表集合
     */
    @PostMapping(value = "/type/list")
    public BasePage<SysDictTypeVO> page(@RequestBody SysDictListCmdQry query) {
        return baseService.listDictTypePage(query);
    }

    /**
     * 字典数据列表
     *
     * @param query 查询条件
     * @return 字典类型列表集合
     */
    @PostMapping(value = "/data/list")
    public BasePage<SysDictDataVO> pageDictData(@RequestBody SysDictListCmdQry query) {
        return baseService.listDictDataPage(query);
    }

    /**
     * 新增字典数据
     *
     * @param cmd 字典数据表单数据
     * @return 是否创建成功
     */
    @PostMapping(value = "/data/create")
    public boolean create(@RequestBody @Validated SysDictDataCmd cmd) {
        return baseService.createDictData(cmd);
    }

    /**
     * 获取字典数据详情
     *
     * @param id 字典数据主键
     * @return 字典数据类型
     */
    @GetMapping(value = "/data/{id}/get")
    public SysDictDataVO get(@PathVariable Long id) {
        return baseService.findDictDataById(id);
    }

    /**
     * 修改字典数据
     *
     * @param cmd 字典类型表单数据
     * @return 修改状态。true标识修改成功，false标识修改失败
     */
    @PostMapping(value = "/data/update")
    public boolean update(@RequestBody @Validated SysDictDataCmd cmd) {
        return baseService.updateDictData(cmd);
    }

    /**
     * 删除字典数据
     *
     * @param id 字典数据主键
     * @return 删除状态。true标识修改成功，false标识修改失败
     */
    @GetMapping(value = "/data/{id}/delete")
    public boolean delete(@PathVariable Long id) {
        return baseService.deleteDictData(id);
    }
}
```
