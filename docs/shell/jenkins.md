# Jenkins

如果提示反向代理配置错误，在**打开系统管理-->系统设置-->URL** ` Jenkins URL`：设置成当前访问的路径

- 配置 maven 和 jdk

![image-20201217110324811](/images/shell/image-20201217110249305.png)

- 插件

  - `Maven Integration` maven 项目必要插件
  - `Build Authorization Token Root Plugin` 远程触发构建插件
  - `Publish Over SSH` 推送到远程服务器插件

- 远程构建

  [相关博文](https://www.cnblogs.com/Rocky_/p/8297260.html)

  1. 安装插件 `Build Authorization Token Root Plugin` [插件地址](https://github.com/jenkinsci/build-token-root-plugin)
  2. 钩子地址：http://{{jenkins服务地址}}/buildByToken/build?job={{项目名称}}&token={{秘钥}}

- 权限分配

1. 安装插件 `role-strategy`

2. 配置

   ![image-20201218145047843](/images/shell/image-20201218145047843.png)

   3. 角色权限配置

   ![image-20201218145914422](/images/shell/image-20201218145914422.png)

- 推送远程服务器配置

系统管理 ---> 系统设置 ---> 下拉到底下 [Publish Over SSH](http://wiki.jenkins-ci.org/display/JENKINS/Publish+Over+SSH+Plugin)选项

![image-20201217110049544](/images/shell/image-20201217105713982.png)
