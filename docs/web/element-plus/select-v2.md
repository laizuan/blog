---
title: Select V2
lang: zh-CN
---

# Select V2 虚拟列表选择器

虚拟下拉选择器，[官方文档](https://element-plus.org/zh-CN/component/select-v2.html#selectv2-%E5%B1%9E%E6%80%A7)

## SelectV2 API

### Options

| Name     | Description                        | Type                | Default |
| -------- | ---------------------------------- | ------------------- | ------- |
| valueKey | 选中值属性名称,支持多级属性`a.b.c` | `string`            | `value` |
| props    | 自定义显示属性名称                 | `SelectOptionProps` | false   |

## SelectV2 Exposes

| 方法名     | 说明                                   | 参数 |
| ---------- | -------------------------------------- | ---- |
| focus      | 使选择器的输入框获取焦点               | -    |
| blur       | 使选择器的输入框失去焦点，并隐藏下拉框 | -    |
| toggleMenu | 显示或隐藏下拉列表                     | -    |

## Types

```ts
export type SelectOptionProps<T = any> = {
  // label 名称，支持多级数据 a.b.c
  label?: string | ((data: T) => string)
  // 是否禁用
  disabled?: string | ((data: T) => boolean)
  // 下拉选项显示的label字段名称，支持多级数据 a.b.c，默认：label
  dropdownLabel?: string | ((data: T) => string)
}
```

## Changelog

### 2023-5-30 `2.3.5-stable.1`

#### Feature

- 新增`Exposes`方法
- 新增 `props`属性，可以自定义下拉选项值
