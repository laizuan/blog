---
title: Icon
meta:
  - name: description
    content: 图标组件
---

# Icon

Svg图标封装

## 配置

安装依赖。[插件仓库地址](https://github.com/anncwb/vite-plugin-svg-icons)
```ts
pnpm add -D vite-plugin-svg-icons
```

vite 配置

```tsx
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]'
  })
  return svgIconsPlugin
}
```

main.ts

```tex
// 引入插件
import 'virtual:svg-icons-register'
```

### 使用

将[阿里图标库](https://www.iconfont.cn/home/index)、[Arco图标库](https://arco.design/iconbox/libs)、[字节跳动图标库](https://iconpark.oceanengine.com/official)、[Bootstrap图标库](https://icons.getbootstrap.com/)下载的`svg`放到在`src/assets/icons`文件夹中

:::tip 

如果size和颜色不能正确显示的时候需要确定`svg`文件中的`fill/width/height`属性有没有去掉

:::

```vue
<n-icon name="setting" />
<n-icon name="setting" size="20px"/>
```

如果说你配置的文件夹`src/assets/icons`下有子级文件夹，比如说`src/assets/icons/menus`、`src/assets/icons/layouts`，那么在设置`NIcon`图标名称的时候`name`需要加上子级文件夹的名称用`-`隔开。

示例：

```vue
<n-icon name="layouts-setting" />
```



## Props

| Name  | Description      | Type            | Options | Default |
| ----- | ---------------- | --------------- | ------- | ------- |
| name  | 图标名称         | string          | -       | -       |
| size  | 图标大小         | `string|number` | -       | 14      |
| spin  | 是否启用旋转模式 | boolean         | -       | false   |
| color | 图标颜色         | string          | -       | -       |
