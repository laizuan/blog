# JS 常用函数

常用函数已封装到`NPM`库中。**注意：本文未涉及到的函数请先在`lodash`官网查看有没有相关的函数方法。**

## Lodash

[lodash](https://www.lodashjs.com/docs)

- 安装依赖

```js
npm i --save lodash
```

- 使用

```js
const $_ = require('lodash');
$_.
```

## 快速开始

- 安装依赖

```js
npm i --save jstool@1.0.2
or
yarn add jstool@1.0.2
```

- 使用

```js
const {a,b,c} = require('jstool')
or
import {a,b,c} from 'jstool'
```

## 缓存相关

- 设置缓存**setStore**

```js
/**
 * 存储缓存
 * @param {String} key 缓存key
 * @param {*} content 需要存储的内容
 * @param {Number} expires 缓存过期时间，默认：0,不过期，单位：毫秒
 * @param {Boolean} isLocal 是否localStorage缓存，默认：false（sessionStorage）
 */
```

- 获取缓存**getStore**

```js
/**
 * 获取缓存
 * @param {String} key 缓存key
 * @param {Boolean} isLocal 是否localStorage缓存，默认：false（sessionStorage）
 */
```

- 删除缓存**removeStore**

```js
/**
 * 删除缓存
 * @param {String} key 缓存key
 * @param {Boolean} isLocal 是否localStorage缓存，默认：false（sessionStorage）
 */
```

- 设置`table`数据缓存**setTableData**

*同类数据应该放在同一张表(缓存)中*

```js
/**
 * 设置table数据缓存，同类数据应该放在同一张表中
 *
 * @param {String} tableName 表名
 * @param {String} rowKey 表数据的某一行的key
 * @param {*} content 需要存储的内容
 * @param {Number} expires 缓存过期时间，默认：0,不过期，单位：毫秒
 * @param {Boolean} isLocal 是否localStorage缓存，默认：false（sessionStorage）
 */
```

- 获取表格中的数据**getTableData**

```js
/**
 * 获取表格中的数据
 *
 * @param {String} tableName 表名
 * @param {String} rowKey 表数据的某一行的key
 * @param {Boolean} isLocal 是否localStorage缓存，默认：false（sessionStorage）
 */
```

## 字符串去空格`trim`

```js
/**
 * 去掉字符串所有空格
 * @param {String} str 字符串
 * @param {Boolean} all 是否去除全部空格。默认：false
 */
```

## 时间格式化成字符串`formatTime`

```js
/**
 * 时间格式化
 * @param {(string|number)} timestamp 时间戳
 * @param {string} formatStr 日期格式。默认：yyyy-MM-dd HH:mm:ss
 * @returns {string | null}
 */
```

## 检查数据是否为空`isNull`

```js
/**
 *
 * 检查是否为 NaN or null or undefined。
 * <p>如果是json对象。没有属性会返回true, `{} ===> true`</p>
 * <p>`[] ===> true`</p>
 * <p>空字符串返回true，`'' ===> true; ' ' ===> true;`</p>
 *
 * @param {(Object|string|number)} value 需要校验的值
 * @returns 是返回true
 */
```

