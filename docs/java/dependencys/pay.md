# 支付模块

[TOC]

## 依赖

```xml
<dependency>
    <groupId>org.seedltd</groupId>
    <artifactId>seedltd-pay-starter</artifactId>
</dependency>
```

## 微信支付

针对微信支付 v3 版本的接口

### 配置

```yaml
seedltd:
  wx:
    pay:
      configs:
        - appId: wx6xxxxxxcf07
          mchId: 161xxxxxx534
          notifyUrl:
          keyPath: classpath:wechar/apiclient_cert.p12
          privateKeyPath: classpath:wechar/apiclient_key.pem
          privateCertPath: classpath:wechar/apiclient_cert.pem
          apiV3Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 属性

| 类型           | 名称                   | 说明                         | 默认值 | 版本 |
| -------------- | ---------------------- | ---------------------------- | ------ | ---- |
| boolean        | seedltd.wx.pay.enabled | 是否开启微信支付             | true   |      |
| `List<Config>` | seedltd.wx.pay.configs | 微信支付配置列表，支持多商户 |        |      |

#### Config

| 类型   | 名称                        | 说明                                                                 | 默认值 | 版本 |
| ------ | --------------------------- | -------------------------------------------------------------------- | ------ | ---- |
| String | appId                       | 公众号 appid.                                                        |        |      |
| String | subAppId                    | 服务商模式下的子商户公众账号 ID.                                     |        |      |
| String | mchId                       | 商户号.                                                              |        |      |
| String | mchKey                      | 商户密钥.                                                            |        |      |
| String | entPayKey                   | 企业支付密钥.                                                        |        |      |
| String | subMchId                    | 服务商模式下的子商户号.                                              |        |      |
| String | notifyUrl                   | 微信支付异步回掉地址，通知 url 必须为直接可访问的 url，不能携带参数. |        |      |
| String | keyPath                     | p12 证书文件的绝对路径或者以 classpath:开头的类路径.                 |        |      |
| String | privateKeyPath              | apiclient_key.pem 证书文件的绝对路径或者以 classpath:开头的类路径.   |        |      |
| String | privateCertPath             | apiclient_cert.pem 证书文件的绝对路径或者以 classpath:开头的类路径.  |        |      |
| String | apiV3Key                    | apiV3 秘钥值.                                                        |        |      |
| String | serviceId                   | 微信支付分 serviceId                                                 |        |      |
| String | payScoreNotifyUrl           | 微信支付分回调地址                                                   |        |      |
| String | payScorePermissionNotifyUrl | 微信支付分授权回调地址                                               |        |      |

### 示例

如果是多商户的时候，先调用`switchoverTo`在调具体方法。 `this.weCharPayService.switchoverTo(mchid)....`

```java
private final WeCharPayService weCharPayService;

 // 查询
WxPayOrderQueryV3Request wxPayOrderQueryV3Request = new WxPayOrderQueryV3Request();
wxPayOrderQueryV3Request.setOutTradeNo(outTradeNo);
WxPayOrderQueryV3Result wxPayOrderQueryV3Result = this.weCharPayService.queryOrderV3(wxPayOrderQueryV3Request);

// 关闭订单
weCharPayService.closeOrderV3(outTradeNo);

// 退款
WxPayRefundV3Request wxPayRefundV3Request = new WxPayRefundV3Request();
wxPayRefundV3Request.setOutTradeNo(refundOrder.getOutTradeNo());
wxPayRefundV3Request.setOutRefundNo(refundOrder.getOutRefundNo());
wxPayRefundV3Request.setReason(refundOrder.getReason());
wxPayRefundV3Request.setNotifyUrl(getNotifyUrl(false));

WxPayRefundV3Request.Amount amount = new WxPayRefundV3Request.Amount();
if (isDev()) {
    amount.setTotal(1);
} else {
    amount.setTotal(BaseWxPayRequest.yuanToFen(refundOrder.getTotal().toString()));
}
amount.setRefund(BaseWxPayRequest.yuanToFen(refundOrder.getRefund().toString()));
amount.setCurrency("CNY");
wxPayRefundV3Request.setAmount(amount);
WxPayRefundV3Result wxPayRefundV3Result = this.weCharPayService.refundV3(wxPayRefundV3Request);

// 创建订单
WxPayUnifiedOrderV3Request wxPayUnifiedOrderV3Request = new WxPayUnifiedOrderV3Request();

wxPayUnifiedOrderV3Request.setDescription(payOrder.getDescription());
wxPayUnifiedOrderV3Request.setOutTradeNo(payOrder.getOutTradeNo());
wxPayUnifiedOrderV3Request.setAttach(payOrder.getAttach());
wxPayUnifiedOrderV3Request.setNotifyUrl(getNotifyUrl(true));

if (payOrder.getTimeExpire() == null) {
    wxPayUnifiedOrderV3Request
        .setTimeExpire(DateUtil.format(DateUtils.addMinutes(new Date(), 30), "yyyy-MM-dd'T'HH:mm:ss+'08:00'"));
} else {
    wxPayUnifiedOrderV3Request
        .setTimeExpire(DateUtil.format(payOrder.getTimeExpire(), "yyyy-MM-dd'T'HH:mm:ss+'08:00'"));
}

WxPayUnifiedOrderV3Request.Amount amount = new WxPayUnifiedOrderV3Request.Amount();

if (isDev()) {
    amount.setTotal(1);
} else {
    amount.setTotal(BaseWxPayRequest.yuanToFen(payOrder.getAmount().toString()));
}
wxPayUnifiedOrderV3Request.setAmount(amount);

WxPayUnifiedOrderV3Request.Payer payer = new WxPayUnifiedOrderV3Request.Payer();
payer.setOpenid(payOrder.getOpenid());

wxPayUnifiedOrderV3Request.setPayer(payer);

WxPayUnifiedOrderV3Request.SceneInfo sceneInfo = new WxPayUnifiedOrderV3Request.SceneInfo();
sceneInfo.setPayerClientIp(payOrder.getClientIp());
wxPayUnifiedOrderV3Request.setSceneInfo(sceneInfo);
WxPayUnifiedOrderV3Result.JsapiResult jsapiResult =
    weCharPayService.createOrderV3(TradeTypeEnum.JSAPI, wxPayUnifiedOrderV3Request);
```

## 支付宝支付

TODO

## 银联支付

TODO
