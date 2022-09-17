# Kubernetes 安装

## 安装要求

在开始之前，部署Kubernetes集群机器需要满足以下几个条件：

- 一台或多台机器，操作系统 CentOS7.x-86_x64
- 硬件配置：2GB或更多RAM，2个CPU或更多CPU，硬盘30GB或更多
- 可以访问外网，需要拉取镜像，如果服务器不能上网，需要提前下载镜像并导入节点
- 禁止swap分区

## 准备环境

| 角色   | IP           |
| ------ | ------------ |
| master | 192.168.1.12 |
| node1  | 192.168.1.15 |
| node2  | 192.168.1.14 |

### 关闭防火墙

```sh
systemctl stop firewalld
systemctl disable firewalld
```

### 关闭Selinux

**永久关闭**

```sh
sed -i 's/enforcing/disabled/' /etc/selinux/config 
```

**临时关闭**

```sh
setenforce 0 
```

### 关闭Swap

**临时关闭**

```sh
swapoff -a
```

**永久关闭**

```sh
vi /etc/fstab
```

注释掉下面行

`#/dev/mapper/centos-swap swap                    swap    defaults        0 0`

退出后重启系统

```sh
reboot
```

### 设置主机名

`k8s-master`是主机名

```sh
hostnamectl set-hostname k8s-master
```

### 添加hosts

在`master`添加`hosts`，**只需要在`Master`上添加即可**。注意下面内容修改成你的`ip`和`hostname`

```sh
cat >> /etc/hosts << EOF
192.168.1.12 k8s-master
192.168.1.15 k8s-node-01
192.168.1.14 k8s-node-02
EOF
```

### 转发 IPv4 并让 iptables 看到桥接流量

```shell
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 设置所需的 sysctl 参数，参数在重新启动后保持不变
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# 应用 sysctl 参数而不重新启动
sudo sysctl --system
```

## 安装Containerd容器

注意不能直接安装`Docker`。因为k8s.1.24以上的版本移出了`dockershim`代码，所有只需要安装`docker` 的`containerd`模块即可。

[官方教程](https://github.com/containerd/containerd/blob/c76559a6a965c6f606c4f6d1a68f38610961dfb1/docs/getting-started.md)

### 卸载旧版本

```sh
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 设置存储库

```sh
sudo yum install -y yum-utils
```

```sh
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 安装 Docker 引擎

```sh
 sudo yum install -y containerd.io
```

### 修改Containerd配置

- 生成默认配置文件并写入到 config.toml 中

  ```shell
  containerd config default | sudo tee /etc/containerd/config.toml
  ```

- 使用 `systemd` `cgroup` 驱动程序

  ```sh
  vi /etc/containerd/config.toml
  
  # 搜索SystemdCgroup关键字， 将SystemdCgroup改成true
  /SystemdCgroup
  
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
    ...
    [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
      SystemdCgroup = true
  ```

- 国内源替换 containerd 默认的 sand_box 镜像

  ```sh
  # 搜索sandbox_image关键字将值设置成registry.aliyuncs.com/google_containers/pause:3.8
  /sandbox_image
  
  
  [plugins]
    .....
    [plugins."io.containerd.grpc.v1.cri"]
    	...
  	sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.8"
  ```

- 配置镜像加速器地址

  然后再为镜像仓库配置一个加速器，需要在 cri 配置块下面的 `registry` 配置块下面进行配置 `registry.mirrors`**（注意缩进）**

  [ 镜像来源 registry-mirrors](https://github.com/muzi502/registry-mirrors)

  ```sh
  # 搜索 ".registry.mirrors 关键字
  /".registry.mirrors
  
  [plugins."io.containerd.grpc.v1.cri".registry]
    [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
    # 添加下面两个配置
      [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
        endpoint = ["https://ekxinbbh.mirror.aliyuncs.com"]
      [plugins."io.containerd.grpc.v1.cri".registry.mirrors."k8s.gcr.io"]
        endpoint = ["https://gcr.k8s.li"]
  ```

### 启动Containerd

```shell
systemctl daemon-reload
systemctl enable containerd --now
```

查看版本

```shell
ctr version
```

## 安装kubeadm/kubelet

### **配置 yum 源**

```shell
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

### 安装kubeadm、kubelet、kubectl

指定版本号安装

```sh
yum install -y kubelet-1.25.0 kubeadm-1.25.0 kubectl-1.25.0 --disableexcludes=kubernetes --nogpgcheck
```

或者直接安装最新版本

```sh
yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes --nogpgcheck
```

kubelet 设置开机启动

```sh
systemctl enable kubelet --now
```

## 部署Kubernetes主节点 

**这步骤只需要在Master节点上执行**

每次安装失败后，都需要执行 kubeadm reset 重置环境

### 生成 kubeadm.yaml 文件

首先导出 kubeadm 配置文件并修改

```sh
kubeadm config print init-defaults --kubeconfig ClusterConfiguration > kubeadm.yml
```

修改kubeadm.yml文件

```sh
vi kubeadm.yml
```

```sh 
apiVersion: kubeadm.k8s.io/v1beta3
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: abcdef.0123456789abcdef
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  ## 修改成主节点的ip地址
  advertiseAddress: 192.168.1.12
  bindPort: 6443
nodeRegistration:
  criSocket: unix:///var/run/containerd/containerd.sock
  imagePullPolicy: IfNotPresent
  ## 修改成上边设置主节点的主机名称
  name: k8s-master
  taints: null
---
apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controllerManager: {}
dns: {}
etcd:
  local:
    dataDir: /var/lib/etcd
## 更改成国内源
imageRepository: registry.aliyuncs.com/google_containers
kind: ClusterConfiguration
## 注意需要和安装的版本一一对应
kubernetesVersion: 1.25.0
networking:
  ## 新增该配置 固定为 192.168.0.0/16，用于后续网络插件。需要注意这里如果自定义了pod网段，需要在kube-flannel.yml中将Network的网段改成自定义网段。
  podSubnet: 192.168.0.0/16
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
scheduler: {}
```

### 拉取镜像

查看所需镜像列表

```sh
kubeadm config images list --config kubeadm.yml
```

控制台打印

```sh
registry.aliyuncs.com/google_containers/kube-apiserver:v1.25.0
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.25.0
registry.aliyuncs.com/google_containers/kube-scheduler:v1.25.0
registry.aliyuncs.com/google_containers/kube-proxy:v1.25.0
registry.aliyuncs.com/google_containers/pause:3.8
registry.aliyuncs.com/google_containers/etcd:3.5.4-0
registry.aliyuncs.com/google_containers/coredns:v1.9.3
```

拉取上边所有镜像

```sh
for i in `kubeadm config images list --config kubeadm.yml`;do ctr images pull $i;done
```

如果个别没拉取下来，使用单个拉取重试

```sh
ctr --debug images pull registry.aliyuncs.com/google_containers/pause:3.8
```

### 初始化主节点

```sh
kubeadm init --config=kubeadm.yml --upload-certs | tee kubeadm-init.log
```

安装成功后输出

```sh
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

*** 这句要记录下来，从节点加入集群的时候用到 ***
kubeadm join 192.168.1.12:6443 --token abcdef.0123456789abcdef \
        --discovery-token-ca-cert-hash sha256:d10f074cc12a9da0eaba8e5b6f4e5a9effa0745acbb8b2c20b453b81863cd28d 
```

### 配置 kubeconfig

```bash
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

配置好后查看一下 node 状态

```sh
kubectl get node
```

输出

```sh
[root@seedltd-centos7 k8s]# kubectl get node
NAME         STATUS     ROLES           AGE     VERSION
k8s-master   NotReady   control-plane   3m14s   v1.25.0
```

状态为 NotReady，因为此时还没有安装网络插件。

## 把 Node 加入Kubernetes 集群

在192.168.1.13/14（Node）执行。

向集群添加新节点，执行在kubeadm init输出的kubeadm join命令：

```sh
kubeadm join 192.168.1.12:6443 --token abcdef.0123456789abcdef \
        --discovery-token-ca-cert-hash sha256:d10f074cc12a9da0eaba8e5b6f4e5a9effa0745acbb8b2c20b453b81863cd28d 
```

默认token有效期为24小时，当过期之后，该token就不可用了。这时就需要重新创建token，操作如下：

```sh
kubeadm token create --print-join-command
```

## 部署CNI网络插件

如果不能翻墙，直接在[GitHub仓库](https://github.com/flannel-io/flannel/blob/master/Documentation/kube-flannel.yml)下载kube-fiannel.yml

- 如果k8s集群的时候没有自定义网段使用下方命令创建

    ```sh
    kubectl apply -f https://github.com/flannel-io/flannel/raw/master/Documentation/kube-flannel.yml
    ```

- 自定义了网段使用下面步骤

  下载`kube-flannel`
  
  ```sh
  wget https://github.com/flannel-io/flannel/raw/master/Documentation/kube-flannel.yml
  ```
  
  修改`kube-flannel.yml`
  
  ```sh
  vi kube-flannel.yml
  ```
  
  找到pod网段位置
  
  ```sh
  /"Network"
  
  修改成初始化`Master`集群时候配置的网段`192.168.0.0/16`
  ```

   创建flannel

    ```
    kubectl apply -f kube-flannel.yml
    ```

查看状态

```sh
kubectl get pods -n kube-flannel
```

输出`Running`表示成功

```sh
NAME                    READY   STATUS    RESTARTS   AGE
kube-flannel-ds-2vbcx   1/1     Running   0          3m54s
kube-flannel-ds-frlng   1/1     Running   0          3m54s
kube-flannel-ds-tslj6   1/1     Running   0          3m54s
```

卸载 flannel

```sh
kubectl delete -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

查看当前集群中pod的网段

```shell
kubectl get cm kubeadm-config -n kube-system -o yaml | grep -i podsub
```

## 测试kubernetes集群

在Kubernetes集群中创建一个pod，验证是否正常运行：

```sh
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get pod,svc
```

访问地址：http://192.168.1.12



