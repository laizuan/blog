## Elasticsearch

基于Elasticsearch8.x Java client 操作。**JDK >= 17**

### 依赖

```xml
<dependency>
  <groupId>org.seedltd</groupId>
  <artifactId>seedltd-elasticsearch-starter</artifactId>
</dependency>
```

### 属性

| **字段**                             | **说明**                                                   | **默认值**               | **可选值** |
| ------------------------------------ | ---------------------------------------------------------- | ------------------------ | ---------- |
| seedltd.elastic.enabled              | 是否启用组件                                               | true                     | -          |
| seedltd.elastic.uris                 | elastic集群地址，只支持`https`并且需要加上各个节点的端口号 | `https://localhost:9200` | -          |
| seedltd.elastic.username             | elastic登入用户名                                          | -                        | -          |
| seedltd.elastic.password             | elastic登入密码                                            | -                        | -          |
| `seedltd.elastic.connection-timeout` | 链接超时时间                                               | 3秒                      | -          |
| `seedltd.elastic.read-timeout`       | 读取数据超时时间                                           | 6秒                      | -          |
| seedltd.elastic.ca                   | https ca证书路径                                           | -                        | -          |

### 测试

`application.yml`

```yaml
seedltd:  
    elastic:
        uris:
          - https://192.168.1.11:9200
        username: elastic
        password: xxxxxxx
        ca: classpath:http_ca.crt
```



```java

    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Autowired
    IIdGenerator idGenerator;

    private final String INDEX_NAME = "customs_order";

    @Getter
    @Setter
    @ToString
    static class CustomsOrder extends BaseElasticsearch {
        private Date createTime;
        private Long customsId;
        private String orderNo;
        private Long createBy;
        private String bookingNo;
        private String consignerName;
        private String goodsName;
        private Integer orderStatus;
        private Double totalPrice;
        private String customerCode;

        @Override
        public String getDocumentId() {
            return this.customsId.toString();
        }
    }

    @Test
    void createIndex() {
        Map<String, Property> typeMapping = Maps.newHashMap();
        typeMapping.put("createTime", Property.of(p -> p.date(date -> date)));
        typeMapping.put("customsId", new Property(new KeywordProperty.Builder().index(false).store(true).build()));
        typeMapping.put("orderNo", new Property(new KeywordProperty.Builder().store(false).build()));
        typeMapping.put("customerCode", new Property(new KeywordProperty.Builder().store(false).build()));
        typeMapping.put("createBy", new Property(new LongNumberProperty.Builder().store(false).build()));
        typeMapping.put("bookingNo",
            new Property(new TextProperty.Builder().searchAnalyzer("comma").analyzer("comma").store(false).build()));
        typeMapping.put("consignerName",
            new Property(new TextProperty.Builder().analyzer("ik_smart").store(false).build()));
        typeMapping.put("goodsName",
            new Property(new TextProperty.Builder().analyzer("ik_smart").store(false).build()));
        typeMapping.put("orderStatus", new Property(new IntegerNumberProperty.Builder().store(false).build()));
        typeMapping.put("totalPrice", new Property(new HalfFloatNumberProperty.Builder().store(false).build()));
        elasticsearchTemplate.createIndex(INDEX_NAME, TypeMapping.of(tm -> tm.properties(typeMapping)),
            IndexSettings.of(is -> is
                // 创建一个逗号分词器
                .analysis(a -> a.analyzer("comma", Analyzer.of(analyzer -> analyzer.pattern(p -> p.pattern(",")))))
                .numberOfShards("3").refreshInterval(Time.of(t -> t.time("3s")))));
    }

    @Test
    void indexExists() {
        System.out.println(elasticsearchTemplate.indexExist(INDEX_NAME));
    }

    @Test
    void deleteIndex() {
        elasticsearchTemplate.deleteIndex(INDEX_NAME);
    }

    @Test
    void insertBatch() {
        CustomsOrder o1 = new CustomsOrder();
        o1.setCreateTime(DateUtil.parse("2022-07-29 23:17:53", "yyyy-MM-dd HH:mm:ss"));
        o1.setCustomsId(idGenerator.newLong());
        o1.setOrderNo("EI202208240001");
        o1.setCreateBy(1L);
        o1.setBookingNo("5437-2334-208.018");
        o1.setConsignerName("东莞XX运动用品有限公司");
        o1.setGoodsName("LED柔性灯,LED柔性灯");
        o1.setOrderStatus(1);
        o1.setTotalPrice(11787.52);
        o1.setCustomerCode("KJI");

        CustomsOrder o2 = new CustomsOrder();
        o2.setCreateTime(DateUtil.parse("2022-07-29 20:15:33", "yyyy-MM-dd HH:mm:ss"));
        o2.setCustomsId(idGenerator.newLong());
        o2.setOrderNo("EI202207290001");
        o2.setCreateBy(2L);
        o2.setBookingNo("OUDJ/PLK-N75036");
        o2.setConsignerName("深圳市XX越贸易有限公司");
        o2.setGoodsName("矿灯,充电架,矿灯,充电器,矿灯,充电架");
        o2.setOrderStatus(10);
        o2.setTotalPrice(22588.1);
        o2.setCustomerCode("KJU");

        CustomsOrder o3 = new CustomsOrder();
        o3.setCreateTime(DateUtil.parse("2022-07-29 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o3.setCustomsId(idGenerator.newLong());
        o3.setOrderNo("EI2207290002");
        o3.setCreateBy(3L);
        o3.setBookingNo("Z22070076B,22070076C,Z22070076D,22070076A");
        o3.setConsignerName("深圳市XX越贸易有限公司");
        o3.setGoodsName(
            "可视门铃配件-8型主机配件1,可视门铃配件-10型主机（铝本色）,可视门铃配件-10型主机(黑色）,可视门铃配件-V31分机配件,可视门铃配件-8型主机配件3,可视门铃配件8型主机配件4,,可视门铃配件-8型主机配件2");
        o3.setOrderStatus(5);
        o3.setTotalPrice(11214.09);
        o3.setCustomerCode("KJU");

        CustomsOrder o4 = new CustomsOrder();
        o4.setCreateTime(DateUtil.parse("2022-07-28 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o4.setCustomsId(idGenerator.newLong());
        o4.setOrderNo("EI202207290003");
        o4.setCreateBy(3L);
        o4.setBookingNo("KJDH/OPD-2207433");
        o4.setConsignerName("宁波XX进出口有限公司");
        o4.setGoodsName("六层空白刚性印刷电路板,四层空白刚性印刷电路板");
        o4.setOrderStatus(5);
        o4.setTotalPrice(32149.53);
        o4.setCustomerCode("KJI");

        CustomsOrder o5 = new CustomsOrder();
        o5.setCreateTime(DateUtil.parse("2022-07-27 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o5.setCustomsId(idGenerator.newLong());
        o5.setOrderNo("EI202207290004");
        o5.setCreateBy(2L);
        o5.setBookingNo("5564-7844-207.012");
        o5.setConsignerName("深圳市XX电子股份有限公司");
        o5.setGoodsName("木制展示架,保温灯");
        o5.setOrderStatus(10);
        o5.setTotalPrice(1839.2);
        o5.setCustomerCode("KJI");

        CustomsOrder o6 = new CustomsOrder();
        o6.setCreateTime(DateUtil.parse("2022-07-26 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o6.setCustomsId(idGenerator.newLong());
        o6.setOrderNo("EI202207290019");
        o6.setCreateBy(1L);
        o6.setBookingNo("OI00-2022,L4009");
        o6.setConsignerName("XX电子（吉安）有限公司");
        o6.setGoodsName("钢丝绳,紧固件");
        o6.setOrderStatus(1);
        o6.setTotalPrice(3927.5);
        o6.setCustomerCode("GLK");

        CustomsOrder o7 = new CustomsOrder();
        o7.setCreateTime(DateUtil.parse("2022-07-25 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o7.setCustomsId(idGenerator.newLong());
        o7.setOrderNo("EI202207290012");
        o7.setCreateBy(2L);
        o7.setBookingNo("FRD/OPP-2207-4332294");
        o7.setConsignerName("XX电子（吉安）有限公司");
        o7.setGoodsName("皮革配饰,飞机杯,情趣内衣,按摩器");
        o7.setOrderStatus(5);
        o7.setTotalPrice(43014.8);
        o7.setCustomerCode("DER");

        CustomsOrder o8 = new CustomsOrder();
        o8.setCreateTime(DateUtil.parse("2022-07-24 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o8.setCustomsId(idGenerator.newLong());
        o8.setOrderNo("EI202207290011");
        o8.setCreateBy(3L);
        o8.setBookingNo("333S22613D,333S22613E");
        o8.setConsignerName("湘潭市XXX电子商务有限公司");
        o8.setGoodsName("转接头,有线耳机,手机支架,无线充电器,无线耳机,三脚架,数据线");
        o8.setOrderStatus(10);
        o8.setTotalPrice(9673.4);
        o8.setCustomerCode("GLK");

        CustomsOrder o9 = new CustomsOrder();
        o9.setCreateTime(DateUtil.parse("2022-07-23 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o9.setCustomsId(idGenerator.newLong());
        o9.setOrderNo("EI202207290021");
        o9.setCreateBy(4L);
        o9.setBookingNo("2111-2315-207.060");
        o9.setConsignerName("汕头市潮阳区XXXX电子厂");
        o9.setGoodsName("执手锁,拉手,执手");
        o9.setOrderStatus(5);
        o9.setTotalPrice(25302.2);
        o9.setCustomerCode("KJI");

        CustomsOrder o = new CustomsOrder();
        o.setCreateTime(DateUtil.parse("2022-05-23 18:10:33", "yyyy-MM-dd HH:mm:ss"));
        o.setCustomsId(idGenerator.newLong());
        o.setOrderNo("EI202207290031");
        o.setCreateBy(5L);
        o.setBookingNo("9865-8888-207.045,9865-8888-207.047");
        o.setConsignerName("深圳市XXXX有限公司");
        o.setGoodsName("车载监视镜头6,车载监视镜头24,车载监视镜头40,车载监视镜头40");
        o.setOrderStatus(15);
        o.setTotalPrice(52214.4);
        o.setCustomerCode("YD");

        elasticsearchTemplate.insertBatch(INDEX_NAME, List.of(o, o1, o2, o3, o4, o5, o6, o7, o8, o9));

    }

    @Test
    void getByDocumentId() {
        CustomsOrder customsOrder = elasticsearchTemplate.findById(INDEX_NAME, "125755924971591", CustomsOrder.class);
        System.out.println(customsOrder);
    }

    @Test
    void searchDocument() {
        ElasticPage<CustomsOrder> page = new ElasticPage<>();
        page.setStart(1);
        page.setSize(6);

        String searchText = "SML22613D";
        
        // "bookingNo", "consignerName", "goodsName", "orderNo" 字段模糊匹配，需要注意的是orderNo和bookingNo的类型是keyword所以只能精确匹配
        Query multiMatch = Query.of(q1 -> q1.multiMatch(
            mm -> mm.query(searchText).fields(List.of("bookingNo", "consignerName", "goodsName", "orderNo"))));

        // and 时间范围查询
        Query createTimeRange = Query.of(q -> q.range(r -> r.field("createTime")
            .gte(JsonData.of(
                DateUtil.beginOfDay(DateUtil.offsetMonth(new Date(), -6)).toString(DatePattern.UTC_SIMPLE_MS_FORMAT)))

            .lte(JsonData.of(DateUtil.endOfDay(new Date()).toString(DatePattern.UTC_SIMPLE_MS_FORMAT)))));

        // 单个字段精确匹配
        Query customerCode = Query.of(q -> q.term(t -> t.field("customerCode").value("YD")));

        
        // and 订单状态大于等于1
        Query orderStatusRange = Query.of(q -> q.range(r -> r.field("orderStatus").gte(JsonData.of(1))));

        // and 时间范围查询
        Query createByTerms = Query.of(q -> q.terms(t -> t.field("createBy")
            .terms(v -> v.value(List.of(FieldValue.of(1), FieldValue.of(4), FieldValue.of(3), FieldValue.of(2))))));

        Query musts = Query.of(q -> q.bool(b -> b.must(createTimeRange, orderStatusRange, createByTerms)));

        Query query = Query.of(q -> q.bool(b -> b.must(multiMatch, musts)));

        // 创建时间降序排序
        SortOptions sortOptions =
            SortOptions.of(so -> so.field(FieldSort.of(fs -> fs.field("createTime").order(SortOrder.Desc))));

        System.out.println(query);
        System.out.println(sortOptions);

        ElasticPage<CustomsOrder> search = elasticsearchTemplate.search(INDEX_NAME, page, query, CustomsOrder.class,
            sortOptions, f -> f.source(SourceConfig.of(s -> s.filter(sf -> sf.includes("customsId")))));
        System.out.println(JsonUtils.toJsonString(search));
        System.out.println(search.getList().size());
    }

    @Test
    void updateById() {
        CustomsOrder customsOrder = new CustomsOrder();
        customsOrder.setBookingNo("SML22613D,SML22613E,SML22613F");
        customsOrder.setOrderStatus(1);
        customsOrder.setCustomsId(126018851872841L);
        elasticsearchTemplate.update(INDEX_NAME, customsOrder, CustomsOrder.class);
    }

```
