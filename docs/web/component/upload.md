# Upload 文件上传


## Attribute

| 属性   | 说明                                       | 类型    | 默认值 |
| ------ | ------------------------------------------ | ------- | ------ |
| showRemove | 删除显示上传文件按钮。 | Boolean | true  |
| size | 单个文件大小，单位: kb。0不限制。默认：0 | Number | 0  |
| totalSize | 批量上传文件的总大小。会先校验单个文件，在校验总的文件。单位: kb。0不限制。默认：0。注意：如果是传入了`fileList`那么fileList的单个文件对象中必须包含size属性。因为传过来的文件对象获取不到文件大小。所有需要使用size标记这个文件的大小 | Number | 0  |
| fileList | 已上传的文件对象数组，对象需要包含`{name:'aaa.pdf',size: 200, url: ''}`如果有附加值也可以拓展。在删除文件的时候会返回原样对象 | array | [] |
| requireNumber | 必传文件个数校验（调用`submit`方法的时候校验，会包含已上传的文件个数）。0不限制，上传的时候不校验有没有选择图片。 |  |  |

## Methods

| 事件名          | 说明                                                         | 返回值       |
| --------------- | ------------------------------------------------------------ | ------------ |
| $submit         | 触发上传文件方法                                             | Promise 对象 |
| $setUploadFiles | 设置已上传的文件，本身会监听`fileList`属性，如果是json配置表单可能会监听不到`fileList`属性，这时候你可能需要用到这个方法。参数就是`fileList` |              |
| $clearFiles     | 清空已上传的文件列表（该方法不支持在 before-upload 中调用）  |              |

## Events

| 事件名        | 说明                                                         | 返回值           |
| ------------- | ------------------------------------------------------------ | ---------------- |
| before-remove | 删除文件回调，需要返回true或者false。true表示可以删除，false表示不能删除。不再支持原生`before-remove`属性 | (file, fileList) |

## Slot

| 名称   | 说明                                                   |
| ------ | ------------------------------------------------------ |


## Example

::: demo

```html
<template>
  <s-upload :file-list="fileList" :limit="2" :totalSize="600" :size="300" @before-remove="doDeleteFile" />
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      fileList: [
        {
          id: '11111111111',
          name: 'ddd.jpg',
          size: 200,
          url: 'https://element-plus.gitee.io/static/theme-index-blue.8fbb67d.png'
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    doDeleteFile(file, fileList) {
      console.log('file, fileList :>> ', file, fileList);
      return true;
    }
  }
};
</script>
<style lang="scss" scoped></style>
```

:::
