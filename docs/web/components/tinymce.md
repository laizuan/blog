---
title: Tinymce
meta:
  - name: description
    content: Tinymce 富文本
---

# Tinymce

tinymce 富文本组件

## 全局配置

如果官网下载的包放在/projectName/public/resources。则不需要配置。

::: tip 注意

该组件是基于 Tinymce*6.1.2*开发的。官网下载的目录可以放到服务器通过 CND 引入或者放到项目的 public/resources。**不能随意更改下载的目录结构否则会导致加载资源 404**

:::

```json
 tinymce: {
  // js所在目录
  tinymceJsUrl: '/resources/tinymce/tinymce.min.js'
 }
```

## 使用

::: demo

```vue
<template>
  <NTinymce v-model="value" ref="tt" :fileMaxSize="50240" lang="en" :upload="handleChange" :disabled="false"
    @change="doChange" width="100%" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const value = ref('<h1>测试1</h1>')
const tt = ref()

const handleChange = (file, progress) => new Promise((resolve, reject) => {
  resolve('https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png')
})



const doChange = (v) => {
  // console.log('v :>> ', v)
}
</script>
```

:::

## Props

| Name          | Description                                                  | Type                                                         | Options      | Default                                                      |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| options       | tinymce 的配置项                                             | `EditorOptions`                                              | -            | {}                                                           |
| toolbar       | 工具栏集合                                                   | `string[]`                                                   | -            | `fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample hr bullist numlist link preview anchor pagebreak insertdatetime media forecolor backcolor fullscreen` |
| plugins       | 插件集合                                                     | `string[]`                                                   | -            | `advlist anchor autolink code codesample directionality fullscreen hr insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus template textpattern visualblocks visualchars wordcount` |
| modelValue    | v-model 内容                                                 | string                                                       | -            | -                                                            |
| lang          | 多语言。需要注意的时候国际化文件名称需要按照该值命名         | string                                                       | `zh-Hans|en` | `zh-Hans`                                                    |
| height        | 高度                                                         | string/number                                                | -            | 400                                                          |
| width         | 宽度                                                         | string/number                                                | -            | auto                                                         |
| disabled      | 是否禁用                                                     | boolean                                                      | -            | false                                                        |
| fileMaxSize   | 上传文件单文件最大能上传多少 KB。0 不限制                    | number                                                       | -            | 0                                                            |
| upload        | blobInfo:用户选择的文件。progress：上传进度函数。方法需要回一个`Promise`对象，**resolve**：接收一个图片地址，**reject**：上传失败相应，接收`{ message: 'xxx上传失败', remove: true }`对象。其中remove表示是否删除文件。 | `(blobInfo: BlobInfo, progress: ProgressFn) => Promise<string>` | -            | -                                                            |
| accept        | 接收上传文件的类型                                           | string                                                       | -            | `image/*,.pdf,video/*,audio/*,.doc,.docx,.xls,.xlsx`         |
| minHeight     | 富文本最小高度                                               | number                                                       | -            | 600                                                          |
| toolbarSticky | 工具栏是否自吸顶                                             | boolean                                                      | -            | true                                                         |

