# 代码相关

## 运行项目

```sh
 yarn run dev
```

## 构建

```sh
// 构建测试环境
yarn run build:test

// 构建正式环境
yarn run build
```

## 分析构建文件体积

```sh
yarn run preview -- --report
```

## 代码校验&修复

```sh
 // 手动校验代码能修复的会自动修复，不能修复的需要手动修改
 yarn run lint -- --fix

 // prettier 格式化修复
 yarn run lint:prettier -- --fix

 // css 修复
 yarn run lint:stylelint -- --fix
```

## svg 文件瘦身

```sh
 yarn run svgo
```
