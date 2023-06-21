# Hooks

内置常用函数。如果以下不能满足开发，请查看[Vue hooks 库](https://vueuse.org/guide/)或者[高性能的 JavaScript 实用工具库](https://www.lodashjs.com/)这两个优秀的开源函数库，这两个库已经能满足绝大多数业务场景，你可以优先使用它们。

## 表单录入页面操作 userOpForm

```ts
/**
 * 表单操作
 * @param idKey 表单实体对象主键名称
 * @param options 可选项配置
 */
export declare const useOpForm: <T>(
  idKey: string | undefined,
  options: {
    formRef?: Ref<FormExpose> | undefined
    getUrl?: string | undefined
    addUrl?: string | undefined
    updateUrl?: string | undefined
    updateBeforCb?: ((isValid: boolean, invalidFields: Array<StringObject>) => boolean) | undefined
    addBeforCb?: ((isValid: boolean, invalidFields: Array<StringObject>) => boolean) | undefined
    updateAfterCb?: ((res: unknown, done: () => void) => void) | undefined
    addAfterCb?: ((res: unknown, done: () => void) => void) | undefined
    validateConfirmWarningCb?: ((errors: ValidateError[]) => void) | undefined
  }
) => {
  form: Ref<T>
  submit: (
    done: () => void,
    isValid: boolean,
    invalidFields: Array<StringObject>,
    urlProcess?: ((url: string) => string) | undefined
  ) => void
  loadForm: (
    parmas?:
      | (HttpRequestConfig &
          AxiosRequestConfig<any> & {
            urlProcess?: ((url: string) => string) | undefined
          })
      | undefined
  ) => Promise<T>
}
```

### 参数

| Name    | Description                | Type   | Options | Default |
| :------ | :------------------------- | :----- | :------ | :------ |
| T       | 表单数据对象               | -      | -       | -       |
| idKey   | 获取数据时候的主键字段名称 | string | -       | id      |
| options | 配置项                     | Object | -       | -       |

#### Options

| Name                     | Description                                                                                                                                                             | Type                                                                 | Options | Default |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- | :------ | :------ |
| getUrl                   | 获取数据详情后端接口地址                                                                                                                                                | string                                                               | -       | -       |
| addUrl                   | 新增数据后端接口地址                                                                                                                                                    | string                                                               | -       | -       |
| updateUrl                | 修改数据后端接口地址                                                                                                                                                    | string                                                               | -       | -       |
| addBeforCb               | 新增数据前置回调，如果返回`false`则不再继续新增。`isValid:表单数据是否校验通过，invalidFields:表单校验失败的字段集合`                                                   | `(isValid: boolean, invalidFields: Array<StringObject>) => boolean)` | -       | -       |
| updateBeforCb            | 修改数据前置回调，如果返回`false`则不再继续修改。`isValid:表单数据是否校验通过，invalidFields:表单校验失败的字段集合`                                                   | `(isValid: boolean, invalidFields: Array<StringObject>) => boolean)` | -       | -       |
| addAfterCb               | 新增数据成功后的回调。`res：后端返回结果，done：关闭loading函数`                                                                                                        | (res: unknown, done: () => void) => void                             | -       | -       |
| updateAfterCb            | 修改数据成功后的回调。`res：后端返回结果，done：关闭loading函数`                                                                                                        | (res: unknown, done: () => void) => void                             | -       | -       |
| formRef                  | form 表单 ref 对象                                                                                                                                                      | `Ref<FormExpose>`                                                    | -       | -       |
| validateConfirmWarningCb | 当服务端返回 400 状态并且返回值包含 errors 结构的时候。首先会判断是警告异常还是危险异常，警告异常用户点确认后会回调这个函数。如果是危险异常则不会有回调。返回示例如下： | `(errors: ValidateError[]) => void`                                  | -       | -       |

```json
{
  "status": "400",
  "msg": "无效请求",
  "errors": {
    "success": false,
    "danger": true, // 是danger还是warning异常。只要errors的type有一个是danger该值为true
    "errors": [
      {
        "field": "roleIdList", // 表单字段名称，如果是集合roleIdList[0].name，如果是对象roleIdList.name
        "message": "请选择所在部门", // 错误内容
        "type": "danger" //取值：danger或者warning。warning表示不是致命的错误，用户确认错误后可以继续操作。danger则必须修复错误后才能后续操作
      }
    ]
  }
}
```

### 返回值

| Name     | Description                                                                                                                             | Type                                                                                                               | Options    | Default |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :--------- | :------ |
| form     | 表单数据对象                                                                                                                            | Object                                                                                                             | -          | -       |
| submit   | 提交数据函数。`done：关闭loading函数，isValid:表单数据是否校验通过，invalidFields:表单校验失败的字段集合`，`urlProcess`请求后端路径处理 | `(done: () => void, isValid: boolean, invalidFields: Array<StringObject>, urlProcess?: ((url: string) => string) ` | undefined) |         |
| loadForm | 加载数据对象函数。`parmas：请求数据参数`                                                                                                | `(parmas: HttpRequestConfig) => Promise<UnwrapRef<T>>`                                                             | -          | -       |

## 列表查询 useOpQuery

```ts
/**
 * 列表操作
 * @param urls 路径
 * @param options 额外配置
 * @returns
 */
export declare const useOpQuery: <T extends BaseSearchForm, R>(
  urls: {
    list: string
    delete?: string
  },
  options?: {
    pageSize?: number
    params?: StringObject
    listProp?: 'list'
    totalProp?: 'totalCount'
  }
) => {
  tableFormRef: ShallowRef<TableFormExpose<R>>
  queryForm: Ref<T>
  load: () => void
  doReset: () => void
  doQuery: () => void
  doSizeChange: (size: number) => void
  doCurrentChange: (start: number) => void
  total: ShallowRef<number>
  loading: Ref<boolean>
  currentRow: Ref<R>
  currentRows: Ref<R[]>
  doSelectRow: (val: R) => void
  doSelectRows: (val: R[]) => void
  data: Ref<R[]>
  doDelete: (
    requestConfig: HttpRequestConfig & {
      urlProcess?: ((url: string) => string) | undefined
    },
    options?: {
      message?: string
      dialogOptions?: StringObject
    }
  ) => Promise<any>
}
```

### 参数

| Name          | Description      | Type                     | Options | Default |
| :------------ | :--------------- | :----------------------- | :------ | :------ |
| T             | 查询表单数据对象 | `extends BaseSearchForm` | -       | -       |
| R             | 列表数据对象     | Object                   | -       | -       |
| `urls.list`   | 列表接口路径     | string                   | -       | -       |
| `urls.delete` | 删除数据接口路径 | string                   | -       | -       |

#### Options

| Name     | Description                                                   | Type         | Options | Default |
| :------- | :------------------------------------------------------------ | :----------- | :------ | :------ |
| pageSize | 每页显示的条数                                                | number       | -       | 20      |
| params   | 请求后端接口数据的额外参数，会和表单数据对象(`queryForm`)合并 | StringObject | -       | -       |

### 返回值

| Name            | Description                                      | Type                                                                                          | Options | Default |
| :-------------- | :----------------------------------------------- | :-------------------------------------------------------------------------------------------- | :------ | :------ |
| queryForm       | 列表查询条件表单数据对象                         | Object                                                                                        | -       | -       |
| load            | 加载数据函数                                     | `() => void`                                                                                  | -       | -       |
| doReset         | 重置表单数据函数                                 | `() => void`                                                                                  | -       | -       |
| doSizeChange    | 改变每页显示条数函数。参数：改变后的每页显示条数 | `(size: number) => void`                                                                      | -       | -       |
| doCurrentChange | 改变页数函数。参数：页码                         | `(start: number) => void`                                                                     | -       | -       |
| total           | 总条数                                           | number                                                                                        | -       | -       |
| loading         | 是否显示加载中                                   | boolean                                                                                       | -       | -       |
| currentRow      | 选择行的数据                                     | R                                                                                             | -       | -       |
| currentRows     | 多行选中数据                                     | `R[]`                                                                                         | -       | -       |
| doSelectRow     | 选择行函数                                       | `(val: R) => void`                                                                            | -       | -       |
| doSelectRows    | 多选行函数                                       | `(val: R[]) =>void`                                                                           | -       | -       |
| data            | 列表数据                                         | `R[]`                                                                                         | -       | -       |
| doDelete        | 删除数据函数                                     | `(requestConfig: HttpRequestConfig & {urlProcess?: ((url: string) => string) \| undefined } ` | -       | -       |

## 自定义列操作 useOpColumns

```ts
/**
 * 动态列配置维护
 * @param options 参数配置
 * @returns
 */
export declare const useOpColumns: (options?: {
  listUrl?: string
  saveUrl?: string
  listMethod?: RequestMethods
  requestConfig?: HttpRequestConfig
  cache: boolean
  key?: Ref<string> | string
}) => {
  columns: Ref<TableColumns>
  fetchListColumns: (requestParams: HttpRequestConfig) => void
  doSaveColumns: (columnList: TableColumns<any>, done: Fn) => void
}
```

### 参数

可以全局配置以下参数，[请参考](./started.md#默认配置)

| Name                    | Description          | Type                     | Options | Default |
| :---------------------- | :------------------- | :----------------------- | :------ | :------ |
| `options.listUrl`       | 查询表单数据对象     | `extends BaseSearchForm` | -       | -       |
| `options.saveUrl`       | 列表数据对象         | Object                   | -       | -       |
| `options.saveMethod`    | 列表接口路径         | string                   | -       | -       |
| `options.listMethod`    | 删除数据接口路径     | string                   | -       | -       |
| `options.params`        | 请求自定义列数据参数 | Object                   | -       | -       |
| `options.requestConfig` | axios 配置           | Object                   | -       | -       |
| `options.cache`         | 是否缓存结果         | boolean                  | -       | true    |
| `options.key`           | 缓存结果 key         | string                   | -       | -       |

### 返回值

| Name        | Description                                                                        | Type                                                      | Options | Default |
| :---------- | :--------------------------------------------------------------------------------- | :-------------------------------------------------------- | :------ | :------ |
| columns     | 列配置数据                                                                         | `Array<TableColumn>`                                      | -       | -       |
| listColumns | 获取列配置函数                                                                     | `() => void`                                              | -       | -       |
| saveColumns | 保存用户自定义列配置。`done：关闭loading标志函数，columns：用户修改后的列配置数据` | `(columns: Array<TableColumn>, done: () => void) => void` | -       | -       |

## 获取后台字典数据 useOpDict

```ts
/**
 * 字典数据操作
 * @param params 请求参数
 * @param options 配置项
 */
export declare const useOpDict: <T = any>(
  params: StringObject,
  options?: DictConfig & {
    key?: string
  }
) => {
  loadDictData: () => Promise<T[]>
  dictData: Ref<T[]>
}
```

### 参数

| Name    | Description  | Type   | Options | Default |
| :------ | :----------- | :----- | :------ | :------ |
| T       | 字典数据对象 | any    | -       | -       |
| params  | 请求后端参数 | Object | -       | -       |
| options | 额外配置     | Object | -       | -       |

#### Options

可以全局配置以下参数，[请参考](./started.md#DictConfig)

| Name         | Description                                                  | Type                          | Options    | Default        |
| :----------- | :----------------------------------------------------------- | :---------------------------- | :--------- | :------------- |
| url          | 请求路径                                                     | string                        | -          | -              |
| method       | 请求方法                                                     | string                        | `post,get` | 'get'          |
| cache        | 是否开启缓存                                                 | boolean                       | -          | true           |
| cache-key    | 缓存的键，这里相当于是数据表的名称。具体的数据键值由参数组成 | string                        | -          | `_dict_`       |
| storage-type | 缓存类型                                                     | `sessionStorage,localStorage` | -          | `localStorage` |
| expires      | 过期时间，默认单位：天                                       | number                        | -          | 7              |
| key          | 缓存在表中的 key 名称。默认使用参数拼接                      | string                        | -          | -              |

### 返回值

| Name         | Description      | Type                           | Options | Default |
| :----------- | :--------------- | :----------------------------- | :------ | :------ |
| dictData     | 字典数据         | `Ref<MaybeArray<T>>`           | -       | -       |
| loadDictData | 获取字典数据函数 | `() => Promise<MaybeArray<T>>` | -       | -       |

## 表单校验规则

```tsx
/**
 *非空效验
 */
export declare const ruleRequired: (
  required?: boolean,
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 * 长度显示，min：最小长度，max：最大长度，trigger：触发校验的事件，blur 或者 change，默认为blur
 */
export declare const ruleLimit: (
  min?: number,
  max?: number,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 * 最大长度输入限制.max：最大长度
 */
export declare const ruleMaxLength: (
  max: number,
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule
export declare const ruleMinLength: (
  min: number,
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 * 数字范围校验
 */
export declare const ruleRange: (
  min: number,
  max: number,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 * 数字最大值
 */
export declare const ruleMax: (
  max: number | string,
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 * 数字最大值
 */
export declare const ruleMin: (
  min: number | string,
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 *邮箱效验规则
 */
export declare const ruleEmail: (message?: string, trigger?: ValidateTrigger) => FormItemRule
export declare const ruleEmailAll: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 *正整数效验规则
 */
export declare const ruleInteger: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 *正整数或者负整数效验规则 InternalRuleItem
 */
export declare const ruleNumber: (message?: string, trigger?: ValidateTrigger) => FormItemRule
export declare const ruleFloat: (
  precision: number,
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 *移动电话效验规则
 */
export declare const ruleMobile: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 * 手机号或座机号效验规则
 */
export declare const rulePhone: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 *只允许输入中文
 */
export declare const ruleChinese: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 *只能输入英文
 */
export declare const ruleEnglish: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 *只能输入英文和数字，并且英文开头
 */
export declare const ruleEnglishAndNumber: (
  message?: string,
  trigger?: ValidateTrigger
) => FormItemRule

/**
 * url 匹配
 */
export declare const ruleUrl: (message?: string, trigger?: ValidateTrigger) => FormItemRule

/**
 * 正则
 */
export declare const rulePattern: (
  pattern: RegExp | string,
  message: string,
  trigger?: ValidateTrigger
) => FormItemRule
```

## Http 请求

```js
export declare type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete'>;
export interface HttpResoponse extends AxiosResponse {
    config: HttpRequestConfig;
}
export interface HttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: HttpRequestConfig) => void;
    beforeResponseCallback?: (response: HttpResoponse) => void;
}
declare const request: <T>(method: RequestMethods, url: string, axiosConfig?: HttpRequestConfig) => Promise<T>;
declare const post: <T>(url: string, config?: HttpRequestConfig) => Promise<T>;
declare const get: <T>(url: string, config?: HttpRequestConfig) => Promise<T>;
export { post, get, request };
```

## Date 日期操作

```js
import dayjs from 'dayjs';
export declare const formatTime: (t: dayjs.ConfigType, f?: string) => string; // 默认格式化成 YYYY-MM-DD HH:mm:ss
export declare function formatToDate(date: dayjs.ConfigType, format?: string): string; // 默认格式化成 YYYY-MM-DD
export declare const dateUtil: typeof dayjs; // 导出dayjs示例，方便操作
```

## 弹窗消息

```js
declare const successMessage: (message: string) => any; // 成功消息
declare const warnMessage: (message: string) => any; // 警告消息
declare const errorMessage: (message: string) => any; // 失败消息
declare const confirmMessage: (message: string, title?: string, options?: ElMessageBoxOptions) => Promise<import("element-plus").MessageBoxData>;  // 弹窗确认
declare const alertMessage: (message: string, title: string | undefined, options: ElMessageBoxOptions) => Promise<import("element-plus").MessageBoxData>; // 弹窗提示
```

## 本地存储

支持过期时间和表存储的缓存

```js
/**
 * 设置表存储数据
 * @param {string} tableName 表名
 * @param {string} rowKey 行主键
 * @param {StringObject|string|number|boolean,MaybeArray<any>} initialValue 需要存储的内容
 * @param {string} options.storageType 存储到 sessionStorage 还是 存储到 localStorage。默认：sessionStorage
 * @param {number} options.expires  过期时间，单位：天。默认不过期
 */
export declare const setTableStorage: (tableName: string, rowKey: string, initialValue: StringObject | string | number | boolean | MaybeArray<any>, options?: StorageOption) => void;

/**
 * 获取表中的数据
 * @param tableName 表名
 * @param rowKey 行数据主键
 * @param storageType 存储类型
 * @returns 行数据
 */
export declare const getTableStorage: <T = any>(tableName: string, rowKey: string, storageType?: StorageType) => T;

/**
 * 删除表中行的数据
 * @param tableName 表名
 * @param rowKey 行数据主键
 * @param storageType 存储类型
 * @returns 是否删除成功
 */
export declare const deleteTableRowStorage: (tableName: string, rowKey: string, storageType?: StorageType) => boolean;

/**
 * 清空表中已过期的数据
 * @param tableName 表名
 * @param storageType 存储类型
 */
export declare const deleteAllExpires: <T = any>(tableName: string, storageType?: StorageType) => void;

/**
 * 清空表数据
 * @param tableName 表名
 */
export declare const clearTableStorage: (tableName: string) => void;

/**
 * 获取到缓存值。如果缓存过期则删除缓存，返回null
 * @param key 键
 */
export declare const getStorage: <T = any>(key: string, storage?: StorageType) => T;

/**
 * 设置缓存
 * @param key 键
 * @param initialValue 缓存值
 * @param options 配置项
 */
export declare const setStorage: (key: string, initialValue: string | boolean | number | StringObject | MaybeArray<any>, options?: StorageOption) => void;

/**
 * 删除缓存
 * @param key 键
 */
export declare const clearStorage: (key: string) => void;
```

## 表单回车

```ts
declare const useFormElementEvent: (
  selectors: string | Ref,
  enterEvent?: ((e: Event) => void | null) | undefined,
  done?: () => void
) => {
  findNextElement: (index: number) => MaybeElement | undefined | null
  resetEnterNextEvent: () => void
  inputEnterEvent: (e: Event) => void
}
declare const useEnterNextFocus: (
  selectors: string | Ref,
  done?: () => void
) => {
  findNextElement: (index: number) => MaybeElement | undefined | null
  resetEnterNextEvent: () => void
  inputEnterEvent: (e: Event) => void
}
```

## 其它

```ts
/**
 * 定义表单字段，提供TS提示
 * @param fileds
 */
export declare function defineFormFields<T = any>(fileds: Array<FormField<T>>): Array<FormField<T>>
/**
 *  定义带分组表单字段，提供TS提示
 * @param fileds
 */
export declare function defineFormGropuFileds<T = ExternalParam>(
  fileds: FormGroup<T>[]
): FormGroup<T>[]
/**
 *  定义表单操作栏按钮，提供TS提示
 * @param fileds
 */
export declare function defineFormActions(action: FormAction): FormAction
/**
 * 定义表格列，提供TS提示
 * @param columns
 */
export declare function defineTableColumns<T = ExternalParam>(
  columns: TableColumns<T>
): TableColumns<T>
/**
 * 定义表格操作列按钮，提供TS提示
 * @param columns
 */
export declare function defineTableActions<T = ExternalParam, C = ExternalParam>(
  actions: TableActions<T, C>
): TableActions<T, C>
/**
 * 定义详情组件属性配置，提供TS提示
 * @param descriptions
 */
export declare function defineDescription<T = ExternalParam>(
  descriptions: NDescription<T>[]
): NDescription<T>[]
/**
 * 定义列表查询组件Ref，并提供导出方法提示
 */
export declare const defineTableFormMethod: () => Ref<TableFormExpose>
/**
 * 定义表单组件Ref，并提供导出方法提示
 */
export declare const defineFormMethod: () => Ref<FormExpose>
/**
 * 定义表格组件Ref，并提供导出方法提示
 */
export declare const defineTableMethod: () => Ref<TableExpose>
/**
 * 清空列表页路由缓存，它会保留查询条件。
 * 实际上它只是重新执行了doQuery()方法而已
 * <p>
 * 需要注意的是：列表页必须使用了{@linkcode useOpQuery}
 * @param routerName 需要清空缓存的路由名称
 */
export declare const clearKeepAlive: (routerName: string) => void
```
