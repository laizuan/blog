# Git

## 分支规范

**不允许在`main/staging/dev`分支下进行提交代码**

- `mian` 分支

  用于发布正式环境的分支，发布成功后会将`mian`分支的代码标记一个`TAG`。该分支只能由`staging`分支合并过去。**不允许其它分支会方式提交代码到该分支中**

- `staging`分支

  用于发布测试环境的分支，该分支只能由`dev`分支合并过去。**不允许其它分支会方式提交代码到该分支中**。合并到`staging`分支的时候会自动构建镜像并且自动发布测试环境。

- `dev`分支

  用于发布本地环境分支，注意并不是在这个分支中做开发。只能由下面的分支合并到`dev`分支中。主要用来构建发布到本地的环境。如果你的项目还没有第一个正式环境的版本允许在该分支下开发，一旦发布第一个版本到正式环境后只能由功能分支合并过来

- `new/xx` 新功能分支（开发分支）

  如果系统中没有这个功能则创建`new/xx`分支，`xx`表示`git`仓库中的`issues`编号。所有的新需求功能需要在`git`仓库中创建一个需求`issues`并且需要尽量详细的描述该功能作用以及实现

- `enh/xx` 功能增强分支（开发分支）

  如果系统中已经有这个功能（需求变更或者添加新功能）则创建`enh/xx`分支，`xx`表示`git`仓库中的`issues`编号。所有的需求变更需要在`git`仓库中创建一个需求`issues`并且需要尽量详细的描述该功能以及变更影响范围

- `bug/xx` Bug 修复分支（开发分支）

  系统出现`BUG`的时候创建的分支，`xx`表示`git`仓库中的`issues`编号。需要详细记录`BUG`问题所在，以及重现步骤。

**分支演变**

```mermaid
graph LR

enh(增强分支enh/xx) --> dev(开发分支)
new(新需求分支new/xx) --> dev(开发分支)
bug(bug分支bug/xx) --> dev(开发分支)

dev(开发环境分支dev) --> staging(测试环境分支staging) --> main(正式环境分支main)
```

所有的**开发分支**不能相互合并。合并的时候使用`rebase`来操作，不要使用`merge`命令以保证分支的简洁性。

创建`PR`的时候需要在标题中描述清楚合并理由，并且需要关闭关联的`issues`编号。例如：`完成用户登录功能 close #1`，在合并完成的时候它会关闭`#1`的`issues`

## 提交规范

前后端项目 Git 提交规范，前后端提交代码谨遵以下提交规范。将来发布正式环境的时候会将`feat`和`fix`的提交日志作为发布公告给到公司，所以务必详细说明这次提交做了些什么事情

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `mod` 不确定分类的修改
  - `wip` 开发中
  - `types` 类型修改

- 示例

```bash
git commit -m 'feat(home): add home page'
```

`feat(home)`括号内表示`scope`，可以选择性增加。

```sh
git commit -m 'feat: add home page'
```

## Git 代码提交辅助工具

可以选择性安装，但项目提交**必须按照 Git 提交规范执行**

- 全局安装`czg`

```sh
pnpm add -g czg
```

检查是否安装成功

```sh
git czg -h
```

- 使用

  以前提交代码的时候使用`git commit -m ""`安装了 Git 辅助工具之后换成`git czg`然后根据提示填写

  前端可以使用命令提交

```sh
pnpm commit
```

后端提交命令

```sh
sh commit.sh
```

后端发布版本可以使用

```sh
sh version.sh
```

## 生成 Git 日志

根据上述`Git`提交规范生成作为发布产品的变更日志

- 全局安装`conventional-changelog-cli`
  运行命令从 `git metadata` 生成变更日志

```sh
pnpm add -g conventional-changelog-cli
```

- 前端生成日志

```sh
pnpm changelog
```

- 后端生成日志

```sh
sh changelog.sh
```
