# Linux 常用操作

本文仅在Centos7 以上系统操作实验，其它系统仅供参考。

### 性能优化

**仅供参考** 根据自己服务器的配置更改

1. 优化内核

   - vi /etc/sysctl.conf

   - ```shell
     #CTCDN系统优化参数
     #关闭ipv6
     net.ipv6.conf.all.disable_ipv6 = 1
     net.ipv6.conf.default.disable_ipv6 = 1
     # 避免放大攻击
     net.ipv4.icmp_echo_ignore_broadcasts = 1
     # 开启恶意icmp错误消息保护
     net.ipv4.icmp_ignore_bogus_error_responses = 1
     #关闭路由转发
     net.ipv4.ip_forward = 0
     net.ipv4.conf.all.send_redirects = 0
     net.ipv4.conf.default.send_redirects = 0
     #开启反向路径过滤
     net.ipv4.conf.all.rp_filter = 1
     net.ipv4.conf.default.rp_filter = 1
     #处理无源路由的包
     net.ipv4.conf.all.accept_source_route = 0
     net.ipv4.conf.default.accept_source_route = 0
     #关闭sysrq功能
     kernel.sysrq = 0
     #core文件名中添加pid作为扩展名
     kernel.core_uses_pid = 1
     # 开启SYN洪水攻击保护
     net.ipv4.tcp_syncookies = 1
     #修改消息队列长度
     kernel.msgmnb = 65536
     kernel.msgmax = 65536
     #设置最大内存共享段大小bytes
     kernel.shmmax = 68719476736
     kernel.shmall = 4294967296
     #timewait的数量，默认180000
     net.ipv4.tcp_max_tw_buckets = 6000
     net.ipv4.tcp_sack = 1
     net.ipv4.tcp_window_scaling = 1
     net.ipv4.tcp_rmem =4096 87380 4194304
     net.ipv4.tcp_wmem =4096 16384 4194304
     net.core.wmem_default = 8388608
     net.core.rmem_default = 8388608
     net.core.rmem_max = 16777216
     net.core.wmem_max = 16777216
     #每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目
     net.core.netdev_max_backlog = 262144
     #限制仅仅是为了防止简单的DoS 攻击
     net.ipv4.tcp_max_orphans = 3276800
     #未收到客户端确认信息的连接请求的最大值
     net.ipv4.tcp_max_syn_backlog = 262144
     net.ipv4.tcp_timestamps = 0
     #内核放弃建立连接之前发送SYNACK 包的数量
     net.ipv4.tcp_synack_retries = 1
     #内核放弃建立连接之前发送SYN 包的数量
     net.ipv4.tcp_syn_retries = 1
     #启用timewait 快速回收
     net.ipv4.tcp_tw_recycle = 1
     #开启重用。允许将TIME-WAIT sockets 重新用于新的TCP 连接
     net.ipv4.tcp_tw_reuse = 1
     net.ipv4.tcp_mem = 94500000 915000000 927000000
     net.ipv4.tcp_fin_timeout = 1
     #当keepalive 起用的时候，TCP 发送keepalive 消息的频度。缺省是2 小时
     net.ipv4.tcp_keepalive_time = 30
     #允许系统打开的端口范围
     net.ipv4.ip_local_port_range = 1024 65000
     #修改防火墙表大小，默认65536
     #net.netfilter.nf_conntrack_max=655350
     #net.netfilter.nf_conntrack_tcp_timeout_established=1200
     # 确保无人能修改路由表
     net.ipv4.conf.all.accept_redirects = 0
     net.ipv4.conf.default.accept_redirects = 0
     net.ipv4.conf.all.secure_redirects = 0
     net.ipv4.conf.default.secure_redirects = 0
     ```

   - sysctl -p 

2. 修改最大文件打开数

   ```shell
   vi /etc/security/limits.conf
   ```

   ```shell
   * soft nofile 1024000
   * hard nofile 1024000
   hive - nofile 1024000
   hive - nproc 1024000
   ```

3. 同步时间

   - ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
   - yum -y install ntp
   - /usr/sbin/ntpdate cn.pool.ntp.org
   - echo "* 4 * * * /usr/sbin/ntpdate cn.pool.ntp.org > /dev/null 2>&1" >> /var/spool/cron/root
   - systemctl restart crond.service

### 显示全路径

- vim vim /etc/profile
- 最后一行加入 export PS1='[\u@\h $PWD]\$ '
- source /etc/profile

### 防火墙
- 查看状态 `systemctl status firewalld`
- 开启防火墙 `systemctl start firewalld`
- 关闭 `systemctl stop firewalld`
- 开放特定端口  
	`firewall-cmd --zone=public --add-port=6379/tcp --permanent`
	`firewall-cmd --reload`

### 查看进程程序

- ps -aux |grep -v grep|grep 【进程ID】

### 查看当前占用CPU或内存最多的n个进程

[引用博客](https://www.cnblogs.com/zhanmeiliang/p/5999300.html)

一、可以使用以下命令查使用内存最多的K个进程

方法1：

```
ps -aux | sort -k4nr | head -K
```

如果是10个进程，K=10，如果是最高的三个，K=3

**说明：**ps -aux中（a指代all——所有的进程，u指代userid——执行该进程的用户id，x指代显示所有程序，不以终端机来区分）

​    ps -aux的输出格式如下：

```
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0  19352  1308 ?        Ss   Jul29   0:00 /sbin/init
root         2  0.0  0.0      0     0 ?        S    Jul29   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S    Jul29   0:11 [migration/0]
```

   sort -k4nr中（k代表从第几个位置开始，后面的数字4即是其开始位置，结束位置如果没有，则默认到最后；n指代numberic sort，根据其数值排序；r指代reverse，这里是指反向比较结果，输出时默认从小到大，反向后从大到小。）。本例中，可以看到%MEM在第4个位置，根据%MEM的数值进行由大到小的排序。

   head -K（K指代行数，即输出前几位的结果）

   |为管道符号，将查询出的结果导到下面的命令中进行下一步的操作。

方法2：top （然后按下M，注意大写）

二、可以使用下面命令查使用CPU最多的K个进程

方法1：

```
ps -aux | sort -k3nr | head -K
```

方法2：top （然后按下P，注意大写）

### 查看端口占用

- netstat -tunlp | grep 3306

  - netstat 各子命令的含义

    ```shell
    -t (tcp) 仅显示tcp相关选项
    -u (udp) 仅显示udp相关选项
    -n 拒绝显示别名，能显示数字的全部转化为数字
    -l 仅列出在Listen(监听)的服务状态
    -p 显示建立相关链接的程序名
    ```

### 服务器之间通讯

#### 服务器免密连接

~/.ssh权限设置为700
~/.ssh/authorized_keys的权限设置为600
这是linux的安全要求，如果权限不对，自动登录将不会生效
完毕之后，退出服务器的登录，再使用ssh登录，你就会发现服务器不会再向你询问密码了.

- 连接服务器
```shell
cd ~/.ssh
ssh-keygen -t rsa
scp id_rsa.pub root@192.168.1.99:~/.ssh

scp id_rsa.pub root@172.18.106.242:~/.ssh
```
- 目标服务器
```shell
cd ~/.ssh
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

#### 执行远程服务器上的 shell 脚本

```shell
ssh root@192.168.1.99 "/shell/shell.sh"
```

#### 两台服务器之间传文件夹
```shell
scp -r /home/project/** root@192.168.1.99:/home/project
scp /home/project/push/upms.war root@172.18.146.249:/home/project/push/
```