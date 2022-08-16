# 软件安装

以下安装全部基于 Centos7.7 版本

## 1. 安装 jdk1.8u_191

1. 创建目录

   - mkdir /home/jdk && /home/jdk

   - 下载 jdk [csdn](https://download.csdn.net/download/sinat_32364425/11264080)

2. 解压

   - tar -zxvf jdk-8u191-linux-x64.tar.gz

3. 配置环境变量

   - vim /etc/profile

     ```shell
     JAVA_HOME=/home/jdk/jdk1.8.0_191
     CLASSPATH=$JAVA_HOME/lib/
     PATH=$PATH:$JAVA_HOME/bin
     export PATH JAVA_HOME CLASSPATH
     ```

4. 执行命令，使配置文件生效

   - source /etc/profile

5. 验证 `java -version`

## 2. 配置 maven

```shell
# 创建目录
cd home && mkdir maven repo && cd maven

#1. 下载
wget http://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz

# 2. 解压
tar -zxvf apache-maven-3.6.3-bin.tar.gz

# 3. 配置环境变量
vim /etc/profile
## 在文件中添加
    :$PATH:$MAVEN_HOME/bin
    export MAVEN_HOME=/home/maven/apache-maven-3.6.3
## 生效
source /etc/profile

## 验证
mvn -v
```

## 3. 安装 docker

- yum 源安装 docker `yum install docker-io –y`

### 3.1. 镜像加速

1. 编辑 daemon.json 文件，添加加速配置

   ```shell
   vim /etc/docker/daemon.json
   ## 加入下面的镜像地址
   "registry-mirrors": ["https://registry.docker-cn.com","https://kxv08zer.mirror.aliyuncs.com"]
   ```

2. 刷新配置 `systemctl daemon-reload`

3. 重启 docker `systemctl restart docker`

4. 国内镜像地址

   ```txt
   # docker官网中国区镜像
   https://registry.docker-cn.com
   
   # 网易163 docker镜像 未使用,请自行判断
   http://hub-mirror.c.163.com
   
   # USTC镜像加速
   https://docker.mirrors.ustc.edu.cn
   
   # daocloud镜像 需注册
   http://{your_id}.m.daocloud.io
   
   # alicloud 注册后有自己的加速地址
   https://{your_id}.mirror.aliyuncs.com
   ```

## 4. elasticsearch7.6.2

author: laizuan
date: 2020-03-24

### 4.1 elasticsearch7.6.2 安装 `单机版`

[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/docker.html)

- 拉取 docker 镜像

```docker
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.6.2

docker pull docker.elastic.co/kibana/kibana:7.6.2
```

- 创建文件夹

```shell
cd /mnt
mkdir elasticsearch
cd elasticsearch
mkdir data logs plugins
# 分配权限
chmod -R 775 elasticsearch
```

- 拷贝配置文件到宿主机，[配置文件讲解](https://www.elastic.co/guide/en/elasticsearch/reference/current/heap-size.html)

```shell
docker run -d --name elasticsearch7.6 --privileged=true docker.elastic.co/elasticsearch/elasticsearch:7.6.2
docker cp elasticsearch7.6:/usr/share/elasticsearch/config /mnt/elasticsearch/config
docker rm -f elasticsearch7.6
```

- 安装中文分词器插件，注意版本需要个 es 一致

```shell
cd /mnt/elasticsearch/plugins
mkdir analysis-ik && cd analysis-ik
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.6.2/elasticsearch-analysis-ik-7.6.2.zip
```

- docker 启动，这里使用宿主机的配置文件，所以 docker 启动是不需要配置堆内存大小。discovery.type=single-node 标识单节点启动，集群不需要

```docker
docker run -p 9200:9200 -d --name es7 --privileged=true -e "discovery.type=single-node" -v /mnt/elasticsearch/data:/usr/share/elasticsearch/data -v /mnt/elasticsearch/config:/usr/share/elasticsearch/config -v /mnt/elasticsearch/logs:/usr/share/elasticsearch/logs -v /mnt/elasticsearch/plugins:/usr/share/elasticsearch/plugins docker.elastic.co/elasticsearch/elasticsearch:7.6.2
```

- 开启防火墙

```shell
firewall-cmd --permanent --add-port=9200/tcp && \
firewall-cmd --permanent --add-port=9300/tcp && \
firewall-cmd --reload
```

- 查看是否启动成功

```shell
curl http://192.168.1.39:9200
```

- 出现以下内容说明启动成功

```json
{
  "name": "1cc4da5bece1",
  "cluster_name": "docker-cluster",
  "cluster_uuid": "M3wMeLaQQ02p-sH1bJJoPw",
  "version": {
    "number": "7.6.1",
    "build_flavor": "default",
    "build_type": "docker",
    "build_hash": "aa751e09be0a5072e8570670309b1f12348f023b",
    "build_date": "2020-02-29T00:15:25.529771Z",
    "build_snapshot": false,
    "lucene_version": "8.4.0",
    "minimum_wire_compatibility_version": "6.8.0",
    "minimum_index_compatibility_version": "6.0.0-beta1"
  },
  "tagline": "You Know, for Search"
}
```

## 5. 安装 kibana7.6.2

- 新建目录

```shell
cd /home
mkdir kibana && cd kibana
```

- 开启防火墙

```shell
firewall-cmd --permanent --add-port=9250/tcp && \
firewall-cmd --reload
```

- 启动容器

```shell
docker run -d --name kibana  -p 9250:5601 docker.elastic.co/kibana/kibana:7.6.2
docker cp kibana:/usr/share/kibana/config /home/kibana/config
docker rm -f kibana
```

- 修改 kiban 配置文件
  [官方配置文档](https://www.elastic.co/guide/en/kibana/current/settings.html)

- 启动容器

```shell
docker run -d --name kibana --privileged=true -v /home/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml -p 9250:5601 docker.elastic.co/kibana/kibana:7.6.2
```

## 6. Tomcat ARP 配置

[Tomcat9 下载地址](https://tomcat.apache.org/download-90.cgi)

```shell
yum install -y apr-devel openssl-devel
cd tomcat/bin
tar -zxvf tomcat-native.tar.gz
cd tomcat-native-1.2.24-src/native/
./configure --with-apr=/usr/bin/apr-1-config --with-java-home=/home/jdk/jdk1.8.0_191 --with-ssl=yes
make && make install
```

## 7. Nginx

#### 7.1 安装

```shell
# 安装到home目录下面
cd /home

# 安装nginx依赖环境
yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel

#下载nginx
wget http://nginx.org/download/nginx-1.20.2.tar.gz

# 解压
tar -zxf nginx-1.20.2.tar.gz && cd nginx-1.20.2

# 编译
./configure --prefix=/home/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_gzip_static_module --with-cc-opt=-O3 --with-file-aio --with-threads --with-http_realip_module --with-http_v2_module --with-stream --with-stream_ssl_module --with-http_sub_module --with-ipv6 --with-http_mp4_module --with-openssl-opt=enable

# 安装
make install

# 删除安装包
cd .. && rm -rf nginx-1.20.2
```

- 设置开机启动 nginx

  - 创建启动文件

    vim /usr/lib/systemd/system/nginx.service

    ```shell
    [Unit]
    Description=Nginx proxy
    After=network.target remote-fs.target nss-lookup.target
    [Service]
    Type=forking
    ExecStart=/home/nginx/sbin/nginx
    ExecReload=/home/nginx/sbin/nginx -s reload
    ExecStop=/home/nginx/sbin/nginx -s quit
    PrivateTmp=true
    KillSignal=SIGQUIT
    TimeoutStopSec=5
    KillMode=mixed
    [Install]
    WantedBy=multi-user.target
    ```

  - 刷新配置

    - systemctl daemon-reload

  - 常用命令

    ```shell
    # 设置开机自启动
    systemctl enable nginx.service
    
    #停止开机自启动
    systemctl disable nginx.service
    
    # 查看nginx状态
    systemctl status nginx.service
    
    # 重启
    systemctl reload nginx
    
    # 启动
    systemctl start nginx
    
    #停止
    systemctl stop nginx
    ```

- 卸载 nginx

  ```shell
  #停止
  systemctl stop nginx
  
  # 删除 yum 源
  yum remove nginx
  
  # 删除Nginx相关文件
  # 查看Nginx相关文件，删除掉nginx的文件即可
  find / -name nginx*
  # 删除安装目录：
  rm -rf /home/nginx
  ```

#### 7.2 配置

```shell
worker_processes 8;
#Nginx最大打开文件数
worker_rlimit_nofile 65535;
# events事件主要用来确定Nginx使用哪种算法
events {
  use epoll;
  worker_connections 65535;
}

http {
	#关闭请求成功日志
	access_log off;

	include    mime.types;

	default_type application/octet-stream;

	#开启高效文件传输模式
	sendfile    on;

	#必须在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量
	tcp_nopush on;

	#==================     主要目的是保护服务器资源，CPU，内存，控制连接数，因为建立连接也是需要消耗资源的。      ==================#

	#客户端连接保持会话超时时间，超过这个时间，服务器断开这个链接
	keepalive_timeout 65;

	#也是防止网络阻塞，不过要包涵在keepalived参数才有效。
	tcp_nodelay on;

	#客户端请求头部的缓冲区大小
	client_header_buffer_size 4k;

	#这个将为打开文件指定缓存，默认是没有启用的
	open_file_cache max=102400 inactive=20s;

	#这个是指多长时间检查一次缓存的有效信息。
	open_file_cache_valid 30s;

	#open_file_cache指令中的inactive 参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive 时间内一次没被使用，它将被移除。
	open_file_cache_min_uses 1;

	#设置请求头的超时时间。我们也可以把这个设置低些，如果超过这个时间没有发送任何数据，nginx将返回request time out的错误。
	client_header_timeout 15;

	#设置请求体的超时时间。我们也可以把这个设置低些，超过这个时间没有发送任何数据，和上面一样的错误提示。
	client_body_timeout 15;

	#告诉nginx关闭不响应的客户端连接。这将会释放那个客户端所占有的内存空间。
	reset_timedout_connection on;

	#响应客户端超时时间，这个超时时间仅限于两个活动之间的时间，如果超过这个时间，客户端没有任何活动，nginx关闭连接。
	send_timeout 15;

	#隐藏Nginx版本信息
	server_tokens off;

	#上传文件大小限制。
	client_max_body_size 10m;

	#================================  fastcgi 调优,代理的相关参数设置   ================================#

	#指定连接到后端FastCGI的超时时间。
	#fastcgi_connect_timeout 600;

	#向FastCGI传送请求的超时时间。
	#fastcgi_send_timeout 600;

	#指定接收FastCGI应答的超时时间。
	#fastcgi_read_timeout 600;

	#指定读取FastCGI应答第一部分需要用多大的缓冲区，默认的缓冲区大小为。fastcgi_buffers指令中的每块大小，可以将这个值设置更小。
	#fastcgi_buffer_size 64k;

	#指定本地需要用多少和多大的缓冲区来缓冲FastCGI的应答请求
	#fastcgi_buffers 4 64k;

	#建议设置为fastcgi_buffers的两倍，繁忙时候的buffer
	#fastcgi_busy_buffers_size 128k;

	#在写入fastcgi_temp_path时将用多大的数据块，默认值是fastcgi_buffers的两倍，该数值设置小时若负载上来时可能报502BadGateway。
	#fastcgi_temp_file_write_size 128k;

	#缓存临时目录。
	#fastcgi_temp_path /home/nginx/nginx_tmp;

	#这个指令指定是否传递4xx和5xx错误信息到客户端，或者允许nginx使用error_page处理错误信息。注：静态文件不存在会返回404页面
	#fastcgi_intercept_errors on;

	#fastcgi_cache缓存目录，可以设置目录层级，比如1:2会生成16*256个子目录，
	#cache_fastcgi是这个缓存空间的名字，cache是用多少内存（这样热门的内容nginx直接放内存，提高访问速度），inactive表示默认失效时间，如果缓存数据在失效时间内没有
	#被访问,将被删除，max_size表示最多用多少硬盘空间。
	#fastcgi_cache_path /home/nginx/fastcgi_cache levels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;


	proxy_connect_timeout   5;
    proxy_send_timeout      5;
    proxy_read_timeout      60;

    # 是否启用或者关闭 proxy_buffer,默认为 on
    proxy_buffering         on;

    # 设置缓存大小，默认4KB、8KB 保持与 proxy_buffers 指令中size变量相同或者更小
    proxy_buffer_size       16k;

    # proxy_buffer个数和Buffer大小（一般设置为内存页大小）
    proxy_buffers           4 64k;

    # 限制处于 BUSY 状态的 proxy_buffer 的总大小
    proxy_busy_buffers_size 128k;

    # 所有临时文件总体积大小，磁盘上的临时文件不能超过该配置
    proxy_max_temp_file_size 128m;

    # 配置同时写入临时文件的数据量的总大小
    proxy_temp_file_write_size 128k;

	# 文件路径，临时存放代理服务器的大体积响应数据
    proxy_temp_path /home/nginx/tmp-test;
    # 设置WEB缓存区名称为 cache_one ，内存缓存空间大小为100M，一天清理一次，硬盘缓存空间大小为10G
    proxy_cache_path /home/nginx/cache-test levels=1:2 keys_zone=cache_one:100m inactive=1d max_size=10g;

 #======================= 启用gzip压缩，提高用户访问速度  ==============================#

	#开启压缩功能
	gzip  			on;

	#设置允许压缩的页面最小字节数，页面字节数从header头的Content-Length中获取，默认值是0，不管页面多大都进行压缩，建议设置成大于1K，如果小与1K可能会越压越大。
	gzip_min_length 2k;

	#压缩缓冲区大小，表示申请4个单位为32K的内存作为压缩结果流缓存，默认值是申请与原始数据大小相同的内存空间来存储gzip压缩结果。
	gzip_buffers   4 32k;

	#压缩版本，用于设置识别HTTP协议版本，默认是1.1，目前大部分浏览器已经支持GZIP解压，使用默认即可。
	gzip_http_version 1.1;

	#压缩比例，用来指定GZIP压缩比，1压缩比最小，处理速度最快，9压缩比最大，传输速度快，但是处理慢，也比较消耗CPU资源。
	gzip_comp_level 6;

	#用来指定压缩的类型，‘text/html’类型总是会被压缩。默认值: gzip_types text/html (默认不对js/css文件进行压缩)
	gzip_types text/plain text/css application/javascript application/x-javascript application/json application/xml application/vnd.ms-fontobject application/x-font-ttf application/svg+xml application/x-icon;

	#varyheader支持，改选项可以让前端的缓存服务器缓存经过GZIP压缩的页面，例如用Squid缓存经过nginx压缩的数据。
	gzip_vary on;
	gzip_proxied any;
	gzip_static on;



	# 可有效防止XSS攻击
	add_header X-Frame-Options "SAMEORIGIN";
	add_header X-XSS-Protection "1; mode=block";
	add_header X-Content-Type-Options "nosniff";

	include xxx.conf;
}

```

## 8. Gitea (docker 版本)

- docker 启动脚本

```shell
docker run -d --privileged=true --restart=always --name=gitea -p 3022:22 -p 9300:3000 -v /home/gitea:/data gitea/gitea:latest
```

alter user 'root'@'%' identified with mysql_native_password by 'Z%oYiT$IX4cm'

## 9. Mysql8

#### 9.1(docker 版本)

##### 9.1.1 启动脚本

```shell
docker run --restart=always --privileged=true -d \
 -v /mnt/mysql/db/:/var/lib/mysql \
 -v /mnt/mysql/logs:/var/log/mysql \
 -v /mnt/mysql/conf.d:/etc/mysql/conf.d \
 -v /mnt/mysql/config/my.cnf:/etc/mysql/my.cnf \
 -v /etc/localtime:/etc/localtime \
 -e MYSQL_ROOT_PASSWORD="Z%oYiT$IX4cm" -p 3306:3306 --name mysql \
mysql:8.0.29
```

1. 如果设置 docker 设置密码不能登入试试不用输入密码直接回车

2. 如果上面一步不能操作成功请尝试下面操作
   1. 修改 my.cnf 文件，在`mysqld`增加`skip-grant-tables`
   2. 重启 MySQL，重复 1 的步骤

##### 9.1.2 重置密码

```sql
use mysql;
alter user 'root'@'localhost' IDENTIFIED BY '你的密码';
flush privileges;
```

##### 9.1.3 新建用户并授权

```sql
mysql> use mysql;
mysql> create user'test'@'%' identified by '你的密码';
mysql> create database nacos_config;
mysql> grant all privileges on nacos_config.* to 'test'@'%' with grant option; --用户授权
mysql> flush privileges;-- 刷新
```

创建用户并授 root 权限

```sql
CREATE USER 你的账号 IDENTIFIED BY '你的密码';
GRANT ALL PRIVILEGES ON *.* TO '你的账号'@'%';
FLUSH PRIVILEGES;
```

#### 9.2 安装版

- 卸载系统自带的 mariadb-lib(不卸载会冲突)

  - 查看 mariadb 版本

    - rpm -qa | grep mariadb

  - 卸载 mariadb
    - rpm -e mariadb-libs-5.5.56-2.el7.x86_64 --nodeps

- 重启机器

  - reboot

- 下载 mysql 安装包

  - wget https://11-1252792348.cos.ap-guangzhou.myqcloud.com/mysql-8.0.15-1.el7x64.zip

- 解压

  - unzip mysql-8.0.15-1.el7x64.zip

- 安装（按顺序）

  - rpm -ivh mysql-community-common-8.0.15-1.el7.x86_64.rpm

  - rpm -ivh mysql-community-libs-8.0.15-1.el7.x86_64.rpm --nodeps --force

  - rpm -ivh mysql-community-server-8.0.15-1.el7.x86_64.rpm

  - rpm -ivh mysql-community-client-8.0.15-1.el7.x86_64.rpm

- 启动

  - systemctl start mysqld.service

- 查看状态

  - systemctl status mysqld.service

- 停止 mysql

  - service mysqld stop

- 查看 mysql 的初始密码

  - grep "password" /var/log/mysqld.log

- 登录进 mysql

  - mysql -uroot -p

- 修改密码（必须包含：数字大小写字母特殊字符）

  - ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码';

- 开放数据库远程登录

  - use mysql;

  - create user 'root'@'%' identified by '你的密码';

  - grant all on _._ to 'root'@'%' with grant option;

  - flush privileges;

- 设置开机自动启动

  - systemctl enable mysqld

  - systemctl disable mysqld

  - 刷新
    - systemctl daemon-reload

## 10. RabbitMQ

#### docker 版本

- [官方镜像地址](https://registry.hub.docker.com/_/rabbitmq/)

```shell
# 拉取镜像
docker pull rabbitmq:3.8.9-management

# 创建挂载目录
cd /home && mkdir rabbitmq

# 启动
docker run -d --name rabbitmq  --privileged=true --restart=always --hostname rabbitmq -v /home/rabbitmq:/var/lib/rabbitmq -e RABBITMQ_DEFAULT_USER=rabbitadmin -e RABBITMQ_DEFAULT_PASS=rabbit123457 -e RABBITMQ_ERLANG_COOKIE='yidian-cookie' -p 5672:5672 -p 9900:15672 rabbitmq:3.8.9-management
```

- 地址：https://127.0.0.1:9900

- 账号：rabbitadmin
- 密码：rabbit123457

#### 安装版

- 安装依赖

  - rpm -ivh https://11-1252792348.cos.ap-guangzhou.myqcloud.com/openssl-libs-1.0.2k-16.el7.x86_64.rpm --force

  - rpm -ivh https://11-1252792348.cos.ap-guangzhou.myqcloud.com/erlang-21.3.6-1.el7.x86_64.rpm

- 关闭自动更新

  - yum install yum-plugin-versionlock

  - yum versionlock erlang

- RabbitMQ

  - 导入签名

    - rpm --import https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc

  - 安装

    - yum -y install https://dl.bintray.com/rabbitmq/all/rabbitmq-server/3.7.14/rabbitmq-server-3.7.14-1.el7.noarch.rpm

  - 启动

    - chkconfig rabbitmq-server on

    - service rabbitmq-server start

  - 导入默认配置

    - cp /usr/share/doc/rabbitmq-server-3.7.14/rabbitmq.config.example /etc/rabbitmq/rabbitmq.config

  - 开启管理后台

    - rabbitmq-plugins enable rabbitmq_management

  - 添加管理员用户

    - rabbitmqctl add_user rabbitadmin 密码

    - rabbitmqctl set_user_tags rabbitadmin administrator

    - rabbitmqctl set*permissions -p / rabbitadmin ".*" ".\_" ".\*"

  - 修改打开文件数量

    - mkdir /etc/systemd/system/rabbitmq-server.service.d/

    - vim /etc/systemd/system/rabbitmq-server.service.d/limits.conf

      - 添加保存以下内容

        - [Service]

        - LimitNOFILE=数量 如 65536

  - 重新加载配置

    - systemctl daemon-reload

    - service rabbitmq-server restart

## 11. redis

#### docker 版

- 镜像地址：[https://hub.docker.com/\_/redis](https://hub.docker.com/_/redis)

```shell
# 拉取镜像
docker pull redis:6.2.7

# 创建挂载目录
mkdir -p mnt/redis/{conf,data}

# 启动
docker run  -p 6379:6379 -v /mnt/redis/data:/data -v /mnt/redis/conf/redis.conf:/usr/local/etc/redis/redis.conf --restart=always --privileged=true --name redis -d redis:6.2.7 redis-server /usr/local/etc/redis/redis.conf
```

#### 安装版

- 下载 redis

  ```shell
  wget http://download.redis.io/releases/redis-5.0.4.tar.gz
  ```

- 解压

  ```shell
  tar xzf redis-5.0.4.tar.gz
  ```

- 进入安装目录

  ```shell
  cd redis-5.0.4
  ```

- 安装

  ```shell
  make
  make install
  ```

- 运行命令

  ```shell
  # 启动
  nohup src/redis-server redis.conf
  # 关闭
  src/redis-cli shutdown
  ```

- 开机启动

  - 创建服务 `vim /lib/systemd/system/redis.service`

    ```shell
    [Unit]
    Description=Redis
    After=network.target
    [Service]
    PIDFile=/var/run/redis_6379.pid
    ExecStart=/home/redis-5.0.4/src/redis-server /home/redis-5.0.4/redis.conf
    ExecReload=/bin/kill -s HUP $MAINPID
    ExecStop=/bin/kill -s QUIT $MAINPID
    PrivateTmp=true
    [Install]
    WantedBy=multi-user.target
    ```

  - 刷新配置

    ```shell
    systemctl daemon-reload
    ```

  - 设置 Redis 服务开机启动命令

    ```shell
    systemctl enable redis
    ```

  - 禁止开机启动

    ```shell
    systemctl disable redis
    ```

  - 查看状态

    ```shell
    systemctl status redis
    ```

  - Redis 服务命令

    ```shell
    systemctl start redis
    systemctl restart redis
    systemctl stop redis
    ```

## 12. Git

```shell
git yum remove git
```

- 安装编译 git 时需要的包

  ```shell
  yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel
  yum install -y gcc perl-ExtUtils-MakeMaker
  ```

  ```shell
  wget https://github.com/git/git/archive/refs/tags/v2.36.1.tar.gz
  mkdir /home/git
  mv v2.36.1.tar.gz /home/git
  cd /home/git
  tar -zxvf v2.36.1.tar.gz
  rm -f v2.36.1.tar.gz
  ```

- 编译安装

  ```shell
  make prefix=/home/git all
  make prefix=/home/git install
  ```

- 环境变量

  ```shell
  vim /etc/profile
  export GIT_HOME=/home/git
  :$PATH:GIT_HOME/bin
  ```

- 刷新环境变量

```shell
source /etc/profile
```

- 查看版本

```shell
git --version
```

## 13. Mongodb

```shell
cd /home
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.4.tgz
tar zxvf mongodb-linux-x86_64-4.0.4.tgz
mv mongodb-linux-x86_64-4.0.4 mongodb
cd /home/mongodb
touch mongodb.conf
mkdir db
mkdir log
cd log
touch mongodb.log
```

- 编辑配置文件

```shell
vim /home/mongodb/mongodb.conf
```

```shell
 port=27017
 dbpath= /home/mongodb/db
 logpath= /home/mongodb/log/mongodb.log
 logappend=true
 fork=true
 maxConns=100
 journal=true
 storageEngine=wiredTiger  #mmapv1、wiretiger、mongorocks
 bind_ip = 0.0.0.0
 auth=true
```

- 设置文件夹权限

  ```shell
  cd /home/mongodb
  chmod 777 db
  chmod 777 log
  ```

- 添加环境变量

  ```shell
  vim /etc/profile
  export MONGODB_HOME=/home/mongodb
  export PATH=$PATH:$MONGODB_HOME/bin
  ```

使环境变量立即生效

```shell
source /etc/profile
```

- 创建 mongodb 启动配置文件

```shell
vim /usr/lib/systemd/system/mongodb.service
```

内容：

```shell
[Unit]
Description=mongodb
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
RuntimeDirectory=mongodb
PIDFile=/home/mongodb/db/mongod.lock
ExecStart=/home/mongodb/bin/mongod --config /home/mongodb/mongodb.conf
ExecStop=/home/mongodb/bin/mongod --shutdown --config /home/mongodb/mongodb.conf
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

- 启动 mongodb 并加入开机启动

  ```shell
  systemctl daemon-reload
  systemctl start mongodb
  systemctl enable mongodb
  ```

- 创建管理员账号

  ```shell
  mongo --port 27017
  use admin
  db.createUser({user:"admin",pwd:"12345789",roles:[{role:"userAdminAnyDatabase",db: "admin"}]})
  db.auth('admin','12345789')
  db.createUser( { user: "yapi", pwd: "yapipwd", roles: [ { role: "readWrite", db: "yapidb" } ] } )
  ```

- 用户登陆

  ```shell
  mongo --port 27017 -u admin -p 12345789
  ```

## 14. Nodejs

```shell
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs
node -v
npm -v
```

## 15. Zabbix5.4 (Centos 8)

[官网地址](https://www.zabbix.com/cn) [安装教程](https://www.zabbix.com/cn/download?zabbix=5.4&os_distribution=red_hat_enterprise_linux&os_version=8&db=mysql&ws=nginx)

### 安装

1. 安装 zabbix5.4 的 rpm 源

   ```shell
   rpm -Uvh https://repo.zabbix.com/zabbix/5.4/rhel/8/x86_64/zabbix-release-5.4-1.el8.noarch.rpm
   dnf clean all
   ```

2. 安装软件包

   ```shell
   ## yum install zabbix-server-mysql zabbix-nginx-conf zabbix-web-mysql zabbix-sql-scripts zabbix-agent -y
   yum install zabbix-web-mysql zabbix-sql-scripts zabbix-agent -y
   ```

3. 创建数据库

   ```sql
   create database zabbix character set utf8 collate utf8_bin;
   create user 'zabbix'@'%' identified by 'password';
   grant all privileges on zabbix.* to 'zabbix'@'%';
   ```

4. 下载 SQL 语句到 Navcat 执行

   /usr/share/doc/zabbix-sql-scripts/mysql/create.sql.gz

   或者运行以下命令

   ```shell
   zcat /usr/share/doc/zabbix-sql-scripts/mysql/create.sql.gz | mysql -uzabbix -p zabbix
   ```

5. Zabbix server 配置数据库

   编辑配置文件 /etc/zabbix/zabbix_server.conf

   ```
   DBPassword=password
   DBHost=ip
   ```

6. 配置 zabbix 前端代理

   ```nginx
   server {
           listen          80;
           server_name     monitor.xxxxxx.com;
           root    /usr/share/zabbix;

           index   index.php;

           location = /favicon.ico {
                   log_not_found   off;
           }

           location / {
                   try_files       $uri $uri/ =404;
           }

           location /assets {
                   access_log      off;
                   expires         10d;
           }

           location ~ /\.ht {
                   deny            all;
           }

           location ~ /(api\/|conf[^\.]|include|locale|vendor) {
                   deny            all;
                   return          404;
           }

           location ~ [^/]\.php(/|$) {
                   fastcgi_pass    unix:/run/php-fpm/zabbix.sock;
                   fastcgi_split_path_info ^(.+\.php)(/.+)$;
                   fastcgi_index   index.php;

                   fastcgi_param   DOCUMENT_ROOT   /usr/share/zabbix;
                   fastcgi_param   SCRIPT_FILENAME /usr/share/zabbix$fastcgi_script_name;
                   fastcgi_param   PATH_TRANSLATED /usr/share/zabbix$fastcgi_script_name;

                   include fastcgi_params;
                   fastcgi_param   QUERY_STRING    $query_string;
                   fastcgi_param   REQUEST_METHOD  $request_method;
                   fastcgi_param   CONTENT_TYPE    $content_type;
                   fastcgi_param   CONTENT_LENGTH  $content_length;

                   fastcgi_intercept_errors        on;
                   fastcgi_ignore_client_abort     off;
                   fastcgi_connect_timeout         60;
                   fastcgi_send_timeout            180;
                   fastcgi_read_timeout            180;
                   fastcgi_buffer_size             128k;
                   fastcgi_buffers                 4 256k;
                   fastcgi_busy_buffers_size       256k;
                   fastcgi_temp_file_write_size    256k;
           }
   }
   ```

7. 启动程序

   ```shell
   systemctl restart zabbix-server zabbix-agent nginx php-fpm

   #设置开机启动
   systemctl enable zabbix-server zabbix-agent nginx php-fpm
   ```

8. 打开浏览器输入 zabbix 地址：http://monitor.xxxxxx.com

   如果出现 `52502#0: *60 connect() to unix:/run/php-fpm/zabbix.sock failed (13: Permission denied) while connecting to upstream,` 执行以下命令

   ```shell
   chmod 766 /run/php-fpm/zabbix.sock
   ```

   默认账号 `Admin`，密码：`zabbix`

9. 中文乱码

   [解决方案](https://blog.csdn.net/sehn_/article/details/107455885)

   [百度](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=zabbix5%20%E4%B8%AD%E6%96%87%E4%B9%B1%E7%A0%81&oq=zabbix%2520%25E4%25B8%25AD%25E6%2596%2587%25E4%25B9%25B1%25E7%25A0%2581&rsv_pq=d79003790003e5f0&rsv_t=9083VHHYaeNA9nttp%2FfU4lB9GyBDPcz%2BewaqNox%2BKYip3e5smwjL232xCvk&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=195&rsv_sug3=37&rsv_sug1=22&rsv_sug7=100&rsv_sug2=0&rsv_sug4=963)

### 卸载

```shell
rpm -qa | grep -i zabbix

yum remove zabbix-release-5.4-1.el8.noarch
yum remove zabbix-web-5.4.3-1.el8.noarch
yum remove zabbix-web-mysql-5.4.3-1.el8.noarch
yum remove zabbix-server-mysql-5.4.3-1.el8.x86_64
yum remove zabbix-agent-5.4.3-1.el8.x86_64
yum remove zabbix-web-deps-5.4.3-1.el8.noarch
yum remove zabbix-nginx-conf-5.4.3-1.el8.noarch
```

查询安装目录

```shell
find / -name zabbix
```
