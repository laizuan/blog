# 动态管理 Quartz 定时任务

对`Quartz`封装，支持动态添加、删除、修改、停止、重启定时任务。支持创建 `Cron` 任务或者是一次性定时任务

## 依赖

```xml
<dependency>
    <groupId>com.leaderrun</groupId>
    <artifactId>leaderrun-schedule-starter</artifactId>
</dependency>
```

## 使用

继承`BaseJob`定时任务抽象类并实现`run`方法，它帮我们做了运行任务异常时日志输出。需要注意的是`AuditAssignJob`需要被`Spring`托管，否则创建`Job`的时候会得到一个错误。

你还可以继承`ConcurrentBaseJob`或者`PersistBaseJob`

- `ConcurrentBaseJob`: 禁止并发执行定时任务
- `PersistBaseJob`: 禁止并发执行定时任务并且可以修改 JobData，并且每次修改之后下一次任务都会获取到最新的 JobData

```java
@Component
public class AuditAssignJob extends BaseJob {

    @Override
    protected void run(JobExecutionContext context) {
        JobDataMap mergedJobDataMap = context.getMergedJobDataMap();
        String value = mergedJobDataMap.getString("key1");
        log.info("value: {}", value); //value: 12345ABC
    }
}
```

如果你继承的是`BaseJob`在集群部署的时候会造成重复执行的问题，需要加上注解 `@DisallowConcurrentExecution`，或者改用继承`ConcurrentBaseJob`类

## 测试类

```java

@ActiveProfiles("test")
@SpringBootTest
@Slf4j
public class JobTest {

    @Autowired
    private SysDictService sysDictService;

    @Test
    public void addJob() throws JsonProcessingException {
        String jsonStr = new ObjectMapper().writeValueAsString(Map.of("key1", "12345ABC"));
        SysJob sysJob = SysJob.builder().jobStatus(true).cronExpression("* * * * * ?")
                .parameter(jsonStr)
                .jobClassName("com.leaderrun.cm.scheduling.AuditAssignJob").build();
        System.out.println(sysDictService.addJob(sysJob));
    }

    @Test
    public void updateJob() {
        SysJob sysJob = sysDictService.findById(3L).orElseThrow(() -> new NoSuchElementException("未找到数据"));
        sysJob.setCronExpression("0/5 * * * * ?");
        sysDictService.updateJob(sysJob);
    }

    @Test
    public void pauseJob() {
        sysDictService.pauseJob(2L);
    }

    @Test
    public void resumeJob() {
        sysDictService.resumeJob(2L);
    }

    @Test
    public void deleteJob() {
        sysDictService.deleteJob(1L);
    }
}
```

## 配置

[官方配置文档说明](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/configuration/)

```yaml
spring:
  quartz:
    job-store-type: jdbc
    wait-for-jobs-to-complete-on-shutdown: true
    overwrite-existing-jobs: true
    startup-delay: 5s
    scheduler-name: cm-quartz-scheduler
    jdbc:
      initialize-schema: never
    properties:
      org:
        quartz:
          scheduler:
            instanceName: CM-Scheduler
            instanceId: AUTO
            instanceIdGenerator:
              class: com.leaderrun.schedule.core.UuidInstanceIdGenerator
            batchTriggerAcquisitionMaxCount: 2
            threadsInheritContextClassLoaderOfInitializer: true
          jobStore:
            isClustered: true
            clusterCheckinInterval: 15000
            maxMisfiresToHandleAtATime: 1
            txIsolationLevelSerializable: true
            acquireTriggersWithinLock: true
          threadPool:
            class: org.quartz.simpl.SimpleThreadPool
            threadCount: 8
            threadPriority: 5
            threadsInheritContextClassLoaderOfInitializingThread: true
```

## FAQ

- 创建任务得到`BeansException`异常

  请确保`jobClassName`能被`Spring`托管

## SQL

在数据库中执行以下 SQL 语句

```sql
DROP TABLE IF EXISTS sys_job;
CREATE TABLE `sys_job`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(6) NOT NULL COMMENT '创建时间',
  `cron_expression` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'cron表达式',
  `job_class_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务类名',
  `job_status` bit(1) NOT NULL COMMENT '任务状态，true运行，false停止',
  `parameter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '运行时参数',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `update_by` bigint NULL DEFAULT NULL COMMENT '最后一次修改时间',
  `update_time` datetime(6) NULL DEFAULT NULL COMMENT '最后一次修改时间',
  `policy` tinyint NULL DEFAULT NULL COMMENT '执行策略，0:框架默认执行策略、3:不触发立即执行、2：立即执行，然后按照Cron频率依次执行',
  `simple_schedule` bit(1) NOT NULL COMMENT '是否简单调度',
  `start_time` datetime NULL DEFAULT NULL COMMENT '简单调度开始执行时间。会在当前时间上加多5秒',
  `repeat_count` smallint NULL DEFAULT NULL COMMENT '简单调度执行次数',
  `interval_second` int NULL DEFAULT NULL COMMENT '简单调度间隔执行时间。单位秒',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_jobClassName`(`job_class_name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;
```

```sql
DROP TABLE IF EXISTS QRTZ_FIRED_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_PAUSED_TRIGGER_GRPS;
DROP TABLE IF EXISTS QRTZ_SCHEDULER_STATE;
DROP TABLE IF EXISTS QRTZ_LOCKS;
DROP TABLE IF EXISTS QRTZ_SIMPLE_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_SIMPROP_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_CRON_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_BLOB_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_JOB_DETAILS;
DROP TABLE IF EXISTS QRTZ_CALENDARS;

-- ----------------------------
-- 1、存储每一个已配置的 jobDetail 的详细信息
-- ----------------------------
create table QRTZ_JOB_DETAILS
(
    sched_name        varchar(120) not null comment '调度名称',
    job_name          varchar(200) not null comment '任务名称',
    job_group         varchar(200) not null comment '任务组名',
    description       varchar(250) null comment '相关介绍',
    job_class_name    varchar(250) not null comment '执行任务类名称',
    is_durable        varchar(1)   not null comment '是否持久化',
    is_nonconcurrent  varchar(1)   not null comment '是否并发',
    is_update_data    varchar(1)   not null comment '是否更新数据',
    requests_recovery varchar(1)   not null comment '是否接受恢复执行',
    job_data          blob null comment '存放持久化job对象',
    primary key (sched_name, job_name, job_group)
) engine = innodb comment = '任务详细信息表';

-- ----------------------------
-- 2、 存储已配置的 Trigger 的信息
-- ----------------------------
create table QRTZ_TRIGGERS
(
    sched_name     varchar(120) not null comment '调度名称',
    trigger_name   varchar(200) not null comment '触发器的名字',
    trigger_group  varchar(200) not null comment '触发器所属组的名字',
    job_name       varchar(200) not null comment 'qrtz_job_details表job_name的外键',
    job_group      varchar(200) not null comment 'qrtz_job_details表job_group的外键',
    description    varchar(250) null comment '相关介绍',
    next_fire_time bigint(13) null comment '上一次触发时间（毫秒）',
    prev_fire_time bigint(13) null comment '下一次触发时间（默认为-1表示不触发）',
    priority       integer null comment '优先级',
    trigger_state  varchar(16)  not null comment '触发器状态',
    trigger_type   varchar(8)   not null comment '触发器的类型',
    start_time     bigint(13) not null comment '开始时间',
    end_time       bigint(13) null comment '结束时间',
    calendar_name  varchar(200) null comment '日程表名称',
    misfire_instr  smallint(2) null comment '补偿执行的策略',
    job_data       blob null comment '存放持久化job对象',
    primary key (sched_name, trigger_name, trigger_group),
    foreign key (sched_name, job_name, job_group) references QRTZ_JOB_DETAILS (sched_name, job_name, job_group)
) engine = innodb comment = '触发器详细信息表';

-- ----------------------------
-- 3、 存储简单的 Trigger，包括重复次数，间隔，以及已触发的次数
-- ----------------------------
create table QRTZ_SIMPLE_TRIGGERS
(
    sched_name      varchar(120) not null comment '调度名称',
    trigger_name    varchar(200) not null comment 'qrtz_triggers表trigger_name的外键',
    trigger_group   varchar(200) not null comment 'qrtz_triggers表trigger_group的外键',
    repeat_count    bigint(7) not null comment '重复的次数统计',
    repeat_interval bigint(12) not null comment '重复的间隔时间',
    times_triggered bigint(10) not null comment '已经触发的次数',
    primary key (sched_name, trigger_name, trigger_group),
    foreign key (sched_name, trigger_name, trigger_group) references QRTZ_TRIGGERS (sched_name, trigger_name, trigger_group)
) engine = innodb comment = '简单触发器的信息表';

-- ----------------------------
-- 4、 存储 Cron Trigger，包括 Cron 表达式和时区信息
-- ----------------------------
create table QRTZ_CRON_TRIGGERS
(
    sched_name      varchar(120) not null comment '调度名称',
    trigger_name    varchar(200) not null comment 'qrtz_triggers表trigger_name的外键',
    trigger_group   varchar(200) not null comment 'qrtz_triggers表trigger_group的外键',
    cron_expression varchar(200) not null comment 'cron表达式',
    time_zone_id    varchar(80) comment '时区',
    primary key (sched_name, trigger_name, trigger_group),
    foreign key (sched_name, trigger_name, trigger_group) references QRTZ_TRIGGERS (sched_name, trigger_name, trigger_group)
) engine = innodb comment = 'Cron类型的触发器表';

-- ----------------------------
-- 5、 Trigger 作为 Blob 类型存储(用于 Quartz 用户用 JDBC 创建他们自己定制的 Trigger 类型，JobStore 并不知道如何存储实例的时候)
-- ----------------------------
create table QRTZ_BLOB_TRIGGERS
(
    sched_name    varchar(120) not null comment '调度名称',
    trigger_name  varchar(200) not null comment 'qrtz_triggers表trigger_name的外键',
    trigger_group varchar(200) not null comment 'qrtz_triggers表trigger_group的外键',
    blob_data     blob null comment '存放持久化Trigger对象',
    primary key (sched_name, trigger_name, trigger_group),
    foreign key (sched_name, trigger_name, trigger_group) references QRTZ_TRIGGERS (sched_name, trigger_name, trigger_group)
) engine = innodb comment = 'Blob类型的触发器表';

-- ----------------------------
-- 6、 以 Blob 类型存储存放日历信息， quartz可配置一个日历来指定一个时间范围
-- ----------------------------
create table QRTZ_CALENDARS
(
    sched_name    varchar(120) not null comment '调度名称',
    calendar_name varchar(200) not null comment '日历名称',
    calendar      blob         not null comment '存放持久化calendar对象',
    primary key (sched_name, calendar_name)
) engine = innodb comment = '日历信息表';

-- ----------------------------
-- 7、 存储已暂停的 Trigger 组的信息
-- ----------------------------
create table QRTZ_PAUSED_TRIGGER_GRPS
(
    sched_name    varchar(120) not null comment '调度名称',
    trigger_group varchar(200) not null comment 'qrtz_triggers表trigger_group的外键',
    primary key (sched_name, trigger_group)
) engine = innodb comment = '暂停的触发器表';

-- ----------------------------
-- 8、 存储与已触发的 Trigger 相关的状态信息，以及相联 Job 的执行信息
-- ----------------------------
create table QRTZ_FIRED_TRIGGERS
(
    sched_name        varchar(120) not null comment '调度名称',
    entry_id          varchar(95)  not null comment '调度器实例id',
    trigger_name      varchar(200) not null comment 'qrtz_triggers表trigger_name的外键',
    trigger_group     varchar(200) not null comment 'qrtz_triggers表trigger_group的外键',
    instance_name     varchar(200) not null comment '调度器实例名',
    fired_time        bigint(13) not null comment '触发的时间',
    sched_time        bigint(13) not null comment '定时器制定的时间',
    priority          integer      not null comment '优先级',
    state             varchar(16)  not null comment '状态',
    job_name          varchar(200) null comment '任务名称',
    job_group         varchar(200) null comment '任务组名',
    is_nonconcurrent  varchar(1) null comment '是否并发',
    requests_recovery varchar(1) null comment '是否接受恢复执行',
    primary key (sched_name, entry_id)
) engine = innodb comment = '已触发的触发器表';

-- ----------------------------
-- 9、 存储少量的有关 Scheduler 的状态信息，假如是用于集群中，可以看到其他的 Scheduler 实例
-- ----------------------------
create table QRTZ_SCHEDULER_STATE
(
    sched_name        varchar(120) not null comment '调度名称',
    instance_name     varchar(200) not null comment '实例名称',
    last_checkin_time bigint(13) not null comment '上次检查时间',
    checkin_interval  bigint(13) not null comment '检查间隔时间',
    primary key (sched_name, instance_name)
) engine = innodb comment = '调度器状态表';

-- ----------------------------
-- 10、 存储程序的悲观锁的信息(假如使用了悲观锁)
-- ----------------------------
create table QRTZ_LOCKS
(
    sched_name varchar(120) not null comment '调度名称',
    lock_name  varchar(40)  not null comment '悲观锁名称',
    primary key (sched_name, lock_name)
) engine = innodb comment = '存储的悲观锁信息表';

-- ----------------------------
-- 11、 Quartz集群实现同步机制的行锁表
-- ----------------------------
create table QRTZ_SIMPROP_TRIGGERS
(
    sched_name    varchar(120) not null comment '调度名称',
    trigger_name  varchar(200) not null comment 'qrtz_triggers表trigger_name的外键',
    trigger_group varchar(200) not null comment 'qrtz_triggers表trigger_group的外键',
    str_prop_1    varchar(512) null comment 'String类型的trigger的第一个参数',
    str_prop_2    varchar(512) null comment 'String类型的trigger的第二个参数',
    str_prop_3    varchar(512) null comment 'String类型的trigger的第三个参数',
    int_prop_1    int null comment 'int类型的trigger的第一个参数',
    int_prop_2    int null comment 'int类型的trigger的第二个参数',
    long_prop_1   bigint null comment 'long类型的trigger的第一个参数',
    long_prop_2   bigint null comment 'long类型的trigger的第二个参数',
    dec_prop_1    numeric(13, 4) null comment 'decimal类型的trigger的第一个参数',
    dec_prop_2    numeric(13, 4) null comment 'decimal类型的trigger的第二个参数',
    bool_prop_1   varchar(1) null comment 'Boolean类型的trigger的第一个参数',
    bool_prop_2   varchar(1) null comment 'Boolean类型的trigger的第二个参数',
    primary key (sched_name, trigger_name, trigger_group),
    foreign key (sched_name, trigger_name, trigger_group) references QRTZ_TRIGGERS (sched_name, trigger_name, trigger_group)
) engine = innodb comment = '同步机制的行锁表';

commit;
```
