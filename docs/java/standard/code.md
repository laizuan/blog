<script setup>
import Preview from '../../components/Preview.vue'
</script>

## 阿里巴巴 Java 开发手册

遵循阿里巴巴 Java 开发手册标记为【强制】的代码风格。<Preview url="/images/java/java-alibaba-1.7.0.pdf" text="在线阅读"/>

## 领域模型

### 各层命名规约

#### Service/DAO 层方法命名规约
- 获取单个对象的方法用 get 做前缀。
- 获取多个对象的方法用 list 做前缀，复数结尾，如：`listObjects`。
- 获取统计值的方法用 count 做前缀。
- 插入的方法用 save/insert 做前缀。
- 删除的方法用 remove/delete 做前缀。
- 修改的方法用 update 做前缀。

#### 领域模型命名规约
- 数据对象：xxxDO，xxx 即为数据表名。
- 数据传输对象：xxxDTO，xxx 为业务领域相关的名称，一般作用于`RPC`调用或者是接口调用。 
- 展示对象：xxxVO，xxx 一般为网页名称，一般作用于返回调用端数据。
- 前端表单数据提交对象：xxxForm，xxx 一般为业务领域相关的名称。用户前端用户表单提交数据接收
- 前端列表查询条件对象：xxxSearchForm，一般用户列表查询用户填写的查询条件对象
- POJO 是 DO/DTO/BO/VO 的统称，禁止命名成 xxxPOJO。

