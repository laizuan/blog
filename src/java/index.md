# JAVA 相关

## 初始化环境

1. 配置hosts

    ```txt
    192.168.33.10 dev.leaderrun.org
    192.168.33.99 local.leaderrun.org - 这个改成自己本机静态IP
    ```

2. 配置电脑环境变量

    ```txt
    NACOS_USERNAME = dev
    NACOS_PASSWORD = 123456
    NACOS_ADDR = http://dev.leaderrun.org:8848
    ```

3. 安装NodeJs

    前后端都需要安装。安装最新LTS版本即可

4. 安装代码提交辅助工具

    ```sh
    npm install -g czg
    ```

    安装后提交代码的时候在根目录执行`sh commit`

5. 安装日志生成辅助工具

    ```sh
    npm install -g conventional-changelog
    ```

    mian分支提交代码的时候会通过该工具生成提交记录到CHANGELOG.md文件中