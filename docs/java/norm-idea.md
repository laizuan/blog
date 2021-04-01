# 开发工具相关

开发工具统一使用IntelliJ IDEA，安装好后统一配置好自己的IDEA。需要配置如下：
* #### 代码格式化配置 <Badge text="强制" type="error"/>
1. 进入插件界面：File->Settings->Plugins，搜索 eclipse code formatter，如已有插件则不需安装，如没有，点击Search in repositories自动搜索线上插件。
2. 导入eclipse-codestyle.xml。File->Settings->Other Setting -> eclipse code formatter,选择Use the eclipse code formatter-> eclipse java formatter config file 选择 eclipse-codestyle.xml
3. 点ok完成
4. 资源下载 [EclipseFormatter 下载](https://github.com/krasa/EclipseCodeFormatter/releases) [Alibaba 规范模板下载](https://github.com/alibaba/p3c/blob/master/p3c-formatter/eclipse-codestyle.xml) [教程参考](https://www.jianshu.com/p/9befe7710176)  

* #### 插件 
1. `lombok` <Badge text="强制" type="error"/>
2. `GsonFormat`一键根据json文本生成java类
3. `Maven Helper`一键查看maven依赖，查看冲突的依赖，一键进行exclude依赖
4. `GenerateAllSetter`一键调用一个对象的所有set方法并且赋予默认值，在对象字段多的时候非常方便 <Badge text="强制" type="error"/>
5. `Translation`翻译
6. `CodeGlance`代码右侧小地图 <Badge text="强制" type="error"/>
7. `Key-Promoter-X`快捷键提示，熟悉之后可以关闭
8. `mybatisx`Mapper和xml快速跳转插件 <Badge text="强制" type="error"/>
9. `RestfulToolkit`通过接口地址快速定位接口所在的方法位置 <Badge text="强制" type="error"/>

* #### 配置
1. 忽略大小写开关 <Badge text="强制" type="error"/>  
IDEA默认是匹配大小写，此开关如果未关。你输入字符一定要符合大小写。比如你敲string是不会出现代码提示或智能补充。
但是，如果你开了这个开关，你无论输入String或者string都会出现代码提示或者智能补充！
<img :src="$withBase('/img/640.webp')" alt="忽略大小写开关"/>

2. 智能导包开关 <Badge text="强制" type="error"/>
如下图所示，将自动导入不明确的结构，智能优化包  
这两个选项勾上。那么有什么效果呢？  
你在代码中，只要敲list，就会出现提示，自动导入java.util.List这个类  
<img :src="$withBase('/img/641.webp')" alt="智能导包开关"/>

3. 悬浮提示开关  
打开这个开关后。只要把鼠标放在相应的类上，就会出现提示，如下图所示:
<img :src="$withBase('/img/642.jfif')" alt="悬浮提示开关"/>

4. 取消单行显示tabs的操作  
如下图所示，把该按钮去了:
<img :src="$withBase('/img/643.jfif')" alt="取消单行显示tabs的操作"/>
那么去掉后有什么效果呢？打开多个文件的时候，会换行显示，非常直观。大大提升效率！
<img :src="$withBase('/img/644.jfif')" alt="取消单行显示tabs的操作"/>

5. 项目文件编码
如下图所示进行设置:
<img :src="$withBase('/img/645.jfif')" alt="项目文件编码"/>

6. 设置行号显示 <Badge text="强制" type="error"/>  
这个的重要性就不用多说了，勾上后代码中，会显示行数!
<img :src="$withBase('/img/645.webp')" alt="设置行号显示"/>
