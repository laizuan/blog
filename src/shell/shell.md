## 1. 服务器部署脚本

- tomcat 版本

```shell
#/bin/bash
appname=cms-8600
name=cms
pid=`ps -ef | grep 'cms-8600' | grep -v grep | awk '{print $2}'`
count=30
n=0
if [ ! -n $count ];then
    count=10
fi

while [[ $n  -lt  $count ]]
do
    let "n++"
        kill -0 $pid
    if [ $? -ne 0 ]
    then
        echo "program not exist"
        break
    else
        echo "send kill -15 to $pid"
	kill -15 $pid
        sleep 2
    fi
    if [[ $n  -eq $count ]]
    then
	echo "kill -9 $pid"
        # after 10s , try to send kill -9
	kill -9 $pid
    fi
done
find /home/project/server/back -name $name.* -type f -mtime +7 -exec rm -f {} \
cp -af /home/tomcat/$appname/webapps/$name.war /home/project/server/back/$name.`date +%m-%d_%H:%M`.war
rm -rf /home/tomcat/$appname/webapps/*
rm -rf /home/tomcat/$appname/logs/*
rm -rf /home/logs/$name/*
cp -af /home/project/push/$name.war /home/tomcat/$appname/webapps
sh /home/tomcat/$appname/bin/startup.sh

```

- jar 版本

```shell
#!/bin/bash
appname=cms-api.jar
name=cms-api
pid=`ps -ef | grep "cms-api.jar" | grep -v "cgroup" | grep -v "grep" | awk '{print $2}'`
count=30
n=0
if [ ! -n $count ];then
    count=30
fi

while [[ $n  -lt  $count ]]
do
    let "n++"
        kill -0 $pid
    if [ $? -ne 0 ]
    then
        echo "program not exist"
        break
    else
        echo "send kill -15 to $pid"
	kill -15 $pid
        sleep 2
    fi
    if [[ $n  -eq $count ]]
    then
	echo "kill -9 $pid"
        # after 10s , try to send kill -9
	kill -9 $pid
    fi
done
echo "start $appname in ............"
find /home/project/service/back -name $name.* -type f -mtime +7 -exec rm -f { } \;
cp -af /home/project/service/running/$name/$name.jar /home/project/service/back/$name.`date +%m-%d_%H:%M`.jar
rm -rf /home/logs/$name/**
rm -rf /home/project/service/running/$name/**
cp -af /home/project/push/$name.jar /home/project/service/running/$name/$name.jar
source /etc/profile
nohup java -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/logs/$name/java_heapdump.hprof -XX:-UseLargePages -Djava.ext.dirs=/home/jdk/jdk1.8.0_191/jre/lib/ext:/home/jdk/jdk1.8.0_191/lib/ext -Xloggc:/home/logs/$name/gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -jar /home/project/service/running/$name/$name.jar --server.max-http-header-size=524288 --spring.profiles.active=prod --spring.cloud.nacos.config.server-addr=nacos.1-dian.cn:80 --yidian.nacos.addr=nacos.1-dian.cn >> /dev/null 2>&1 &
echo "start $name done .........."
```

## 2. Tomcat 配置

- 日志配置

```txt
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

handlers = 1catalina.org.apache.juli.AsyncFileHandler, 2localhost.org.apache.juli.AsyncFileHandler, 3manager.org.apache.juli.AsyncFileHandler, 4host-manager.org.apache.juli.AsyncFileHandler, java.util.logging.ConsoleHandler

.handlers = 1catalina.org.apache.juli.AsyncFileHandler, java.util.logging.ConsoleHandler

############################################################
# Handler specific properties.
# Describes specific configuration info for Handlers.
############################################################

# tomcat 日志关闭。全部由项目配置

1catalina.org.apache.juli.AsyncFileHandler.level = OFF
1catalina.org.apache.juli.AsyncFileHandler.directory = /home/logs/ctms
1catalina.org.apache.juli.AsyncFileHandler.prefix = ctms-8300.
1catalina.org.apache.juli.AsyncFileHandler.maxDays = 5
1catalina.org.apache.juli.AsyncFileHandler.encoding = UTF-8


java.util.logging.ConsoleHandler.level = OFF
java.util.logging.ConsoleHandler.formatter = org.apache.juli.OneLineFormatter
java.util.logging.ConsoleHandler.encoding = UTF-8


# For example, set the org.apache.catalina.util.LifecycleBase logger to log
# each component that extends LifecycleBase changing state:
#org.apache.catalina.util.LifecycleBase.level = FINE

# To see debug messages in TldLocationsCache, uncomment the following line:
#org.apache.jasper.compiler.TldLocationsCache.level = FINE

# To see debug messages for HTTP/2 handling, uncomment the following line:
#org.apache.coyote.http2.level = FINE

# To see debug messages for WebSocket handling, uncomment the following line:
#org.apache.tomcat.websocket.level = FINE
```

- server.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<!-- Note:  A "Server" is not itself a "Container", so you may not
     define subcomponents such as "Valves" at this level.
     Documentation at /docs/config/server.html
 -->
<Server port="-1" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />

  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />


  <GlobalNamingResources>

    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>


  <Service name="Catalina">

	<Executor 	name="tomcatThreadPool"
				namePrefix="catalina-exec-"
				maxThreads="1000"
				minSpareThreads="100"
				prestartminSpareThreads="true"
	/>

	<!--
			maxPostSize参数形式处理的最大长度，如果没有指定，该属性被设置为2097152（2兆字节）。上传提交的时候可以用的
            acceptCount请求的最大队列长度，当队列满时收到的任何请求将被拒绝
            acceptorThreadCount 用于接受连接的线程的数量
            disableUploadTimeout 禁用上传超时。
            maxConnections 服务器接受并处理的最大连接数
            SSLEnabled 在连接器上使用此属性来启用SSL加密传输
			keepAliveTimeout 此连接器在关闭连接之前等待另一个HTTP请求的毫秒数。默认值是使用为connectionTimeout属性设置的值 。使用值-1表示没有（即无限）超时
     -->
    <Connector	port="8300"
				protocol="org.apache.coyote.http11.Http11AprProtocol"
				connectionTimeout="20000"
				redirectPort="8443"
				executor="tomcatThreadPool"
				enableLookups="false"
				acceptCount="1500"
				maxPostSize="10485760"
				disableUploadTimeout="true"
				URIEncoding="utf-8"
				keepAliveTimeout ="6000"
	/>


    <Engine name="Catalina" defaultHost="localhost">

      <Realm className="org.apache.catalina.realm.LockOutRealm">

        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>

      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="false">

<!--
     <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
-->
      </Host>
    </Engine>
  </Service>
</Server>
```

- catalina.sh 添加配置

```shell
appname=app
jhome=/home/jdk/jdk1.8.0_191
export JAVA_HOME=$jhome
export JRE_HOME=$jhome/jre
export CATALINA_OPTS="-server -Xms512m -Xmx512m -Xmn268m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/logs/$appname/java_heapdump.hprof -XX:-UseLargePages -Djava.ext.dirs=$jhome/jre/lib/ext:$jhome/lib/ext -Xloggc:/home/logs/$appname/gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -Djava.awt.headless=true -Dfile.encoding=UTF-8 -Duser.timezone=GMT+8 -Djava.net.preferIPv4Stack=true -Djava.library.path=/usr/local/apr/lib -Dspring.profiles.active=test"
```
