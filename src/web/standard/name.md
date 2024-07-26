# 命名规范

## 命名法则

1. 驼峰命名法(小驼峰) **getUser**
2. 帕斯卡命名法(大驼峰) **GlobalHeader**
3. 短横线命名法 **user-center**
4. 下划线命名法 **MAX_LENGTH**

## 文件/文件夹命名

- 组件相关

  - 文件夹命名：**大写驼峰命名法**
  - Vue 文件名统一为`index.vue`

- 视图相关
  - 文件夹命名：**短横线命名法**

其余文件用**短横线命名法**。

## 变量命名

`小驼峰式命名方法`，命名前缀规范如下

| 前缀     | 含义                                               | 返回值                                                  |
| -------- | -------------------------------------------------- | ------------------------------------------------------- |
| `can`    | 判断是否可执行某个动作                             | 函数返回一个布尔值。true：可执行；false：不可执行。     |
| `has`    | 判断是否含有某个值                                 | 函数返回一个布尔值。true：含有此值；false：不含有此值。 |
| `is`     | 判断是否为某个值                                   | 函数返回一个布尔值。true：为某个值；false：不为某个值。 |
| `get`    | 获取某个值                                         | 函数返回一个非布尔值。                                  |
| `set`    | 设置某个值                                         | 无返回值、返回是否设置成功或者返回链式对象。            |
| `list`   | 获取一个列表数据                                   | 返回 array 数据集合                                     |
| `delete` | 删除某一个数据                                     | -                                                       |
| `update` | 修改某一个数据                                     | -                                                       |
| `add`    | 新增某一个数据                                     | -                                                       |
| `do`     | 用户点击动作事件                                   | -                                                       |
| `fetch`  | 网络请求                                           | -                                                       |
| `_`      | 内部方法，仅限于内部方法调用，方法复用提取命名前缀 | -                                                       |

```javascript
/** 是否可读 */
function canRead() {
  return true
}

/** 获取姓名 */
function getName() {
  _checkUser()
  return { name: '张三' }
}

/** 获取用户列表 */
function listUser() {
  return [{ name: '张三' }, { name: '李四' }]
}

/** 用户点击添加按钮 */
function doAdd() {
  _checkUser()
}

/** 添加用户前置处理 */
function _checkUser() {
 ....
}

/**
 * 获取用户信息
 * @param id - 用户唯一标识id
 */
function fetchUserInfo(id：string) {
	// ***
}
```

## 常量

`使用大写字母和下划线来组合命名，下划线用以分割单词。`

```javascript
const MAX_COUNT = 10
const URL = 'http://www.baidu.com'
```

## TS 类型接口 interface 和 type

`大写驼峰`

```typescript
interface PersonInfo {
  /**姓名 */
  name: string
  /**性别 '0':男; '1': 女; '2': 未知 */
  gender: '0' | '1' | '2'
  /**年龄 */
  age: 25
}
```
