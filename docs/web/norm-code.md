# 代码相关

## 1、命名规范

-   路由名称全小写，多个英文单词之间使用中横线隔开
-   组件名称全小写，多个英文单词之间使用中横线隔开，使用频率比较高的可以定义成全局公共组件，使用频率低的，建议各个模块自行 import 进来，当成内部组件。需要注册全局组件在`components -> index.js`文件中配置，组件的对应的标签名是由 v-开头

## 2、列表页

#### 搜索条件

-   所有 input 框需要有清除功能
-   所有 select 需要有清除加搜索功能
-   查询按钮需要带查询图标已经按钮类型为 info
-   新增按钮全部右对齐类型为 primary 需要有加号图标
-   所有时间范围都需要有快捷键

#### 列表

-   表头全部居中
-   操作栏固定在右侧
-   操作栏全部使用文字描述
-   列内容如果全部长度一样的全部居中
-   列内容长度不一致的全部靠左
-   订单状态列需要使用 tag 标签，不同状态不同 tag。 [服务端实现](./course-java.md#_7、前端状态动态tag样式)

## 3、代码提交规范

项目配置了`commit-lint`，主要用于校验 git 提交信息规范和代码风格校验，如果校验没通过，则不会进行提交。需要开发者自行修改后再次进行提交

-   参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

    -   feat 增加新功能
    -   fix 修复问题/BUG
    -   style 代码风格相关无影响运行结果的
    -   perf 优化/性能提升
    -   refactor 重构
    -   revert 撤销修改
    -   test 测试相关
    -   docs 文档/注释
    -   chore 依赖更新/脚手架配置修改等
    -   workflow 工作流改进
    -   ci 持续集成
    -   mod 不确定分类的修改
    -   wip 开发中
    -   types 类型修改

-   示例：

```sh
git commit -m 'feat: add home page'
```

-   如何关闭

在`.husky/commit-msg`内注释以下代码即可

```sh
# npx --no-install commitlint --edit "$1"
```
