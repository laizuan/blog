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
| `seedltd.elastic.enabled`            | 是否启用组件                                               | true                     | -          |
| `seedltd.elastic.uris`               | elastic集群地址，只支持`https`并且需要加上各个节点的端口号 | `https://localhost:9200` | -          |
| `seedltd.elastic.username`           | elastic登入用户名                                          | -                        | -          |
| `seedltd.elastic.password`           | elastic登入密码                                            | -                        | -          |
| `seedltd.elastic.connection-timeout` | 链接超时时间                                               | 3秒                      | -          |
| `seedltd.elastic.read-timeout`       | 读取数据超时时间                                           | 6秒                      | -          |
| `seedltd.elastic.ca`                 | https ca证书路径                                           | -                        | -          |


### Elastic 相关说明
[官网文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
[Elasticsearch 检索性能优化实战指南](https://mp.weixin.qq.com/s/tNrK8KtbSKI8cyTczO73lw)

#### IndexSetting
[Index setting 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html)
- 如果对数据写入实时查询要求不高可以设置`refreshInterval`属性，针对实时查询要求高低调整该值。要求不高的甚至可以设置成1分钟及以上
- 副本数不是越多越好，虽然它能提高查询效率。但是会影响你的修改和更新，并且会增加磁盘的压力。建议使用默认（一个副本）即可
- 如果预先知道排序字段，可以提前指定。本质是通过降低写入速度间接提升检索速度。
- 主分片的设置需要结合：集群数据节点规模、全部数据量和日增数据量等综合维度给出值，一般建议：设置为数据节点的1-3倍。
- 分片不宜过小、过碎。有很多小分片可能会导致大量的网络调用和线程开销，这会严重影响搜索性能。单个分片大小建议在30G左右

#### Mapping
[Mapping 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-params.html)
- 不需要排序和范围查询的字段尽量使用keyword替代一些long或者int之类
- doc_values：如果您确定不需要对字段进行排序或聚合，则可以禁用doc值以节省磁盘空间
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

    /**
     *
     * Mapping 属性解释
     *
     *     <p>enabled：设置 false，仅作存储不支持搜索和聚合分析（数据保存在_source中 用于type为object）</p>
     *     <p>index：是否倒排索引；设置 false，无法被搜索，但依然支持aggs，sort，并出现在_source中</p>
     *     <p>norms：用于算分，是否存储归一化相关参数，如果字段仅用于过滤和聚合分析，可关闭</p>
     *     <p>doc_values：是否启用 doc_values，用于排序和聚合分析。不需要排序和聚合的统一设置成FALSE</p>
     *     <p>field_data：若要对text类型启用排序和聚合分析，field data需要设置成true</p>
     *     <p>store：默认false不存储，数据默认存储在_source，若true，额外空间再存储该字段</p>
     *     <p>coerce：默认 true 开启，是否开启自动数据类型转换功能，比如 字符串转数字、浮点转整型。true 代表可以转换，false 代表不可以转换。  </p>
     *     <p>multifields：多字段特性</p>
     *     <p>dynamic：true/false/strict 控制mapping的自动更新 字段的自动新增</p>
     *     <p>date_detection：默认true，是否自动识别日期类型</p>
     */
    @Test
    void createIndex() {
                Map<String, Property> typeMapping = Maps.newHashMap();
        typeMapping.put("createTime", Property.of(p -> p.date(date -> date)));
        typeMapping.put("customsId", new Property(new KeywordProperty.Builder().docValues(false).index(false).build()));
        typeMapping.put("orderNo", new Property(new KeywordProperty.Builder().docValues(false).build()));
        typeMapping.put("customerCode", new Property(new KeywordProperty.Builder().docValues(false).build()));
        typeMapping.put("createBy", new Property(new KeywordProperty.Builder().docValues(false).build()));
        typeMapping.put("bookingNo",
            new Property(new TextProperty.Builder().searchAnalyzer("comma").analyzer("comma").build()));
        typeMapping.put("consignerName",
            new Property(new TextProperty.Builder().analyzer("ik_smart").build()));
        typeMapping.put("goodsName",
            new Property(new TextProperty.Builder().analyzer("ik_smart").build()));
        typeMapping.put("orderStatus", new Property(new IntegerNumberProperty.Builder().build()));
        typeMapping.put("totalPrice", new Property(new FloatNumberProperty.Builder().build()));


        // 只保存customsId字段值，其它字段只查询
        SourceField sourceField = SourceField.of(fn -> fn.includes(List.of("customsId")));


        elasticsearchTemplate.createIndex(INDEX_NAME, TypeMapping.of(tm -> tm.properties(typeMapping).source(sourceField)),
            IndexSettings.of(is -> is
                // 创建一个逗号分词器
                .analysis(a -> a.analyzer("comma", Analyzer.of(analyzer -> analyzer.pattern(p -> p.pattern(",")))))
                    // 设置3个分片，每个分片大小建议在20G-50G
                    .numberOfShards("3")
                    // sorting机制通过写入的时候指定了某一个或者多个字段的排序方式，会极大提升检索的性能。
                    .sort(s -> s.field(List.of("createTime")).order(SegmentSortOrder.Desc))
                    // 数据写入刷新频率，设置3秒刷新一次
                    .refreshInterval(Time.of(t -> t.time("3s")))));
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

	// 这个方式适合固定的查询条件，如果查询条件是动态的可能渲染出来会JSON格式错误导致查询出错。
	// [mustache渲染引擎语法](https://mustache.github.io/)
 	@Test
    void addSearchTemplate() {
        String content = """
            {
             {{#queryForm}}
              "query": {
                "bool": {
                  "must": [
                  {{#searchText}}
                    {
                      "multi_match": {
                        "fields": [
                          "bookingNo",
                          "consignerName",
                          "goodsName",
                          "orderNo"
                        ],
                        "query": "{{searchText}}"
                      }
                    },
                   {{/searchText}}
                    {
                      "bool": {
                        "must": [
                        {{#beginTime}}
                            {{#endTime}}
                              {
                                "range": {
                                  "createTime": {
                                    "gte": "{{beginTime}}",
                                    "lte": "{{endTime}}"
                                  }
                                }
                              },
                           {{/endTime}}
                        {{/beginTime}}
                        {{#customerCode}}
                          {
                            "term": {
                              "customerCode": {
                                "value": "{{customerCode}}"
                              }
                            }
                          },
                        {{/customerCode}}
                        {{#orderStatus}}
                          {
                            "range": {
                              "orderStatus": {
                                "gte": {{orderStatus}}
                              }
                            }
                          },
                         {{/orderStatus}}
                         {{#createBy}}
                          {
                            "terms": {
                              "createBy": [
                               {{createBy}}
                              ]
                            }
                          }
                        {{/createBy}}
                        ]
                      }
                    }
                  ]
                }
              },
              {{/queryForm}}
              "from": {{start}},
              "size": {{size}},
              "sort": [
                {
                  "createTime": "desc"
                }
              ]
            }
            """;

        elasticsearchTemplate.addOrUpdateSearchTemplate(TEMPLATE_NAME, content);
    }

    @Test
    void findSearchTemplateByName() {
        StoredScript searchTemplateByName = elasticsearchTemplate.findSearchTemplateByName(TEMPLATE_NAME);
        System.out.println(searchTemplateByName.toString());
    }

    @Test
    void searchByTemplate() {
        ElasticPage<CustomsOrder> page = new ElasticPage<>();
        page.setStart(1);
        page.setSize(6);

        Map<String, Object> map = Maps.newHashMap();
        map.put("searchText", "5465-3243-207.012");
        map.put("beginTime",
            DateUtil.beginOfDay(DateUtil.offsetMonth(new Date(), -6)).toString(DatePattern.UTC_SIMPLE_MS_FORMAT));
        map.put("endTime", DateUtil.endOfDay(new Date()).toString(DatePattern.UTC_SIMPLE_MS_FORMAT));
        map.put("orderStatus", 1);
        map.put("customerCode", "KD");
        // 数组渲染会导致JSON格式错误，所有改成后端构造字符串传值
        map.put("createBy", StringUtils.join(Lists.newArrayList(1,2,3,4), ","));
        System.out.println(JsonUtils.toJsonString(map));

        Map<String, JsonData> params = Maps.newHashMap();
        params.put("start", JsonData.of(0));
        params.put("size", JsonData.of(10));
        params.put("queryForm", JsonData.of(map));

        System.out.println(JsonUtils.toJsonString(params));

        ElasticPage<CustomsOrder> search =
            elasticsearchTemplate.searchTemplate(INDEX_NAME, TEMPLATE_NAME, page, params, CustomsOrder.class);
        System.out.println(JsonUtils.toJsonString(search));
    }
```
