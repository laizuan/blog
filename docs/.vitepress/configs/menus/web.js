export const createWebNav = () => {
  return {
    text: '前端',
    link: '/web/components/started',
    items: [
      {
        text: '规范',
        link: '/web/standard/lint'
      },
      {
        text: '组件',
        link: '/web/components/started'
      },
      {
        text: '常见问题',
        link: '/web/faq/component'
      }
    ]
  }
}

export const createWebMenu = () => {
  return [
    {
      text: '规范',
      items: [
        {
          text: '前端工程项目规范',
          link: '/web/standard/lint'
        },
        {
          text: '命名规范',
          link: '/web/standard/name'
        },
        {
          text: '前端工程手脚架',
          link: '/web/standard/cli'
        }
      ]
    },
    {
      text: '组件',
      items: [
        {
          text: '快速上手',
          link: '/web/components/started'
        },
        {
          text: '主题',
          link: '/web/components/theme'
        },
        {
          text: '国际化',
          link: '/web/components/i18n'
        },
        {
          text: 'Hooks 内置函数',
          link: '/web/components/hooks'
        },
        {
          text: 'Wrap 容器',
          link: '/web/components/wrap'
        },
        {
          text: 'Icon 图标',
          link: '/web/components/icon'
        },
        {
          text: 'Button 按钮',
          link: '/web/components/button'
        },
        {
          text: 'Lazy 懒加载',
          link: '/web/components/lazy'
        },
        {
          text: 'Tag 标签',
          link: '/web/components/tag'
        },
        {
          text: 'Card 块',
          link: '/web/components/card'
        },
        {
          text: 'Tip 提示',
          link: '/web/components/tip'
        },
        {
          text: 'Lov 弹出选择输入框',
          link: '/web/components/lov'
        },
        {
          text: 'Input 输入框',
          link: '/web/components/input'
        },
        {
          text: 'Autocomplete 自动补全输入框',
          link: '/web/components/autocomplete'
        },
        {
          text: 'Select 选择器',
          link: '/web/components/select'
        },
        {
          text: 'TreeSelect 树选择器',
          link: '/web/components/tree-select'
        },
        {
          text: 'Radio 单选',
          link: '/web/components/radio'
        },
        {
          text: 'Checkbox 多选',
          link: '/web/components/checkbox'
        },
        {
          text: 'Dialog 弹窗',
          link: '/web/components/dialog'
        },
        {
          text: 'Dialog 弹窗表单',
          link: '/web/components/dialog-form'
        },
        {
          text: 'Form 表单',
          link: '/web/components/form'
        },
        {
          text: 'Table 表格',
          link: '/web/components/table'
        },
        {
          text: 'TableForm 表格表单',
          link: '/web/components/table-form'
        },
        {
          text: 'Descriptions 详情',
          link: '/web/components/description'
        },
        {
          text: 'DatePrick 日期选择器',
          link: '/web/components/date-prick'
        },
        {
          text: 'StatusFlow 状态流转',
          link: '/web/components/status-flow'
        },
        {
          text: 'CountTo 数字动画组件',
          link: '/web/components/count-to'
        },
        {
          text: 'DragVerify 滑动验证',
          link: '/web/components/drag-verify'
        },
        {
          text: 'RelativeTime 相对时间',
          link: '/web/components/relative-time'
        },
        {
          text: 'Tinymce 富文本',
          link: '/web/components/tinymce'
        }
      ]
    },
    {
      text: 'ElementPlus',
      items: [
        {
          text: '指南',
          link: '/web/element-plus/index'
        },
        {
          text: 'Select V2 虚拟列表选择器',
          link: '/web/element-plus/select-v2'
        },
        {
          text: 'MessageBox 消息弹框',
          link: '/web/element-plus/message-box'
        }
      ]
    },
    {
      text: 'FAQ',
      items: [
        {
          text: '组件',
          link: '/web/faq/component'
        },
        {
          text: '编码',
          link: '/web/faq/code'
        }
      ]
    }
  ]
}
