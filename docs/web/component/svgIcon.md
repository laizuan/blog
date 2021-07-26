# SVGICON 图标

[组件出处](https://panjiachen.gitee.io/vue-element-admin-site/zh/feature/component/svg-icon.html)

在 [iconfont.cn](http://iconfont.cn/) 上选择并生成自己的业务图标库，再进行使用。或者其它 svg 图标网站，下载完成之后将下载好的 .svg 文件放入 `@/icons/svg` 文件夹下之后就会自动导入

## Attribute

| 属性      | 说明                   | 类型   | 默认值 |
| --------- | ---------------------- | ------ | ------ |
| iconClass | svg 文件名称。支持外链 | String | -      |
| className | 图标样式类名           | String | -      |

## 改变颜色

```
svg-icon` 默认会读取其父级的 color `fill: currentColor;
```

你可以改变父级的`color`或者直接改变`fill`的颜色即可。

> 如果你遇到图标颜色不对，可以参照本[issue](https://github.com/PanJiaChen/vue-element-admin/issues/330)进行修改

## 使用外链

支持使用外链的形式引入 `svg`。例如：

```
<svg-icon icon-class="https://xxxx.svg />
```

## 大小

如果你是从 [iconfont](https://www.iconfont.cn/)下载的图标，记得使用如 Sketch 等工具规范一下图标的大小问题，不然可能会造成项目中的图标大小尺寸不统一的问题。

## Example

```html
<!-- icon-class 为 icon 的名字; class-name 为 icon 自定义 class-->
<svg-icon icon-class="password"  class-name='custom-class' />
```

