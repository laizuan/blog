# docker 
#### 安装
- yum源安装docker
  - yum install docker-io –y

#### 常用命令

- 重启docker：`sudo systemctl restart docker`
- 启动docker：`sudo systemctl start docker`
- 停止Docker： `systemctl stop docker`
- 设置开机启动docker
  - `systemctl enable docker`
  - `usermod -aG docker root`
- 进入容器运行命令：docker exec -it 
- 使用on - failure策略时，指定Docker将尝试重新启动容器的最大次数。默认情况下，Docker将尝试永远重新启动容器。
  - `docker run --restart=on-failure:10 【容器id】`
  - 如果创建时未指定 --restart=always ,可通过update 命令 `docker update  --restart=on-failure:10 【容器id】`
- 启动镜像 `docker start 【容器id】`
- 停止镜像 `docker stop 【容器id】`
- 重启容器 `docker restart 【容器id】` -t：关闭容器的限时，如果超时未能关闭则用kill强制关闭，默认值10s，这个时间用于容器的自己保存状态
- 容器重命名 `docker rename 原容器名 新容器名`
- 查看已有镜像 `docker images`
- 强制删除镜像 `docker rmi –f 镜像名称`
- 查看docker占用磁盘空间 `docker system df`
  - 查看个容器占用情况 `docker system df -v`
- 将容器做成镜像 `docker commit 容器id/容器名称 镜像名称:tag版本`

- 进入后台运行的容器 `docker exec -it 容器名称 bash`
