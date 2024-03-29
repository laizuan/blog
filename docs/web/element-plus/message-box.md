---
title: Message Box
lang: zh-CN
---

# Message Box

消息弹窗增强

## API

### Options

| Name              | Description        | Type                                          | Default |
| ----------------- | ------------------ | --------------------------------------------- | ------- |
| showExtraButton   | 是否显示拓展按钮   | `boolean`                                     | false   |
| extraButtonText   | 拓展按钮文案       | `string`                                      | -       |
| extraButtonClass  | 自定义拓展按钮样式 | `string`                                      | -       |
| extraButtonType   | 自定义拓展按钮类型 | `default/primary/success/warning/info/danger` | -       |
| cancelButtonType  | 自定义取消按钮类型 | `default/primary/success/warning/info/danger` | -       |
| confirmButtonType | 自定义确定按钮类型 | `default/primary/success/warning/info/danger` | -       |

## Changelog

### 2023-09-05 `2.3.11-stable.2`

#### Feature

- 新增确定按钮和取消按钮类型属性

### 2023-09-05 `2.3.11-stable.1`

#### Feature

- 新增拓展按钮选项
