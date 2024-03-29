# docker

## Ubuntu

- 卸载老旧版本 Docker

```sh
apt-get remove docker docker-engine docker.io
```

- 安装最新的版本

```sh
curl -sSL https://get.docker.com/ | sh
```

- 启动并添加开机自启动

```sh
systemctl start docker
systemctl enable docker
```

- 检查是否安装成功

```sh
docker version
```

### Docker-compose

[docker compose 官方仓库](https://github.com/docker/compose/releases)

- 获取 Docker compose

```sh
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.16.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

- 授权

```sh
chmod +x /usr/local/bin/docker-compose
```

- 查看是否安装成功

```sh
docker-compose -v
```

- 卸载 docker compose

```sh
rm /usr/local/bin/docker-compose
```

## 安装 Centos

- [docker](https://so.csdn.net/so/search?q=docker&spm=1001.2101.3001.7020)要求 Centos 系统的内核版本高于 3.10，查看内核版本

  ```sh
  uname -a
  ```

- 删除旧版本的 docker

  ```sh
  yum  remove docker docker-common  docker-selinux docker-engine
  ```

- 设置镜像源

  ```sh
  wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
  ```

- 查看仓库中所有的 docker 版本

  ```sh
  yum  list  docker-ce  --showduplicates |  sort -r
  ```

- yum 源安装 docker

  ```sh
  # 指定版本安装
  yum  install  -y --setopt=obsoletes=0  docker-ce-20.10.9-3.el7
  ```

- 启动 docker

  ```sh
  systemctl start docker
  ```

- 添加 docker 国内阿里云镜像地址

  可以在[阿里云容器镜像服务](https://cr.console.aliyun.com/cn-qingdao/instances/mirrors) -> 镜像工具 --> 镜像加速器 中开通

  ```sh
  cat > /etc/docker/daemon.json << EOF
  {
    "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"],
    "log-opts": {
       "max-size": "10m",
       "max-file": "3"
    }
  }
  EOF
  ```

- 重启 docker

```sh
systemctl daemon-reload

systemctl restart docker
```

- 查看是否设置成功

  ```sh
  docker info
  ```

## docker-compose 安装

[官方安装教程](https://docs.docker.com/compose/install/linux/)

## 常用命令

- 重启 docker：`sudo systemctl restart docker`
- 启动 docker：`sudo systemctl start docker`
- 停止 Docker： `systemctl stop docker`
- 设置开机启动 docker
  - `systemctl enable docker`
  - `usermod -aG docker root`
- 进入容器运行命令：docker exec -it
- 使用 on - failure 策略时，指定 Docker 将尝试重新启动容器的最大次数。默认情况下，Docker 将尝试永远重新启动容器。
  - `docker run --restart=on-failure:10 【容器id】`
  - 如果创建时未指定 --restart=always ,可通过 update 命令 `docker update --restart=on-failure:10 【容器id】`
- 启动镜像 `docker start 【容器id】`
- 停止镜像 `docker stop 【容器id】`
- 重启容器 `docker restart 【容器id】` -t：关闭容器的限时，如果超时未能关闭则用 kill 强制关闭，默认值 10s，这个时间用于容器的自己保存状态
- 容器重命名 `docker rename 原容器名 新容器名`
- 查看已有镜像 `docker images`
- 强制删除镜像 `docker rmi –f 镜像名称`
- 查看 docker 占用磁盘空间 `docker system df`
  - 查看个容器占用情况 `docker system df -v`
- 将容器做成镜像 `docker commit 容器id/容器名称 镜像名称:tag版本`

- 进入后台运行的容器 `docker exec -it 容器名称 bash`
