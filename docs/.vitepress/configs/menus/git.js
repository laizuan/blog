export const createGitNav = () => {
  return {
    text: 'Git',
    link: '/git/',
    items: [
      {
        text: '规范',
        link: '/java/standard/idea'
      },
      {
        text: '依赖',
        link: '/java/dependencys/basic-core'
      },
      {
        text: '常见问题',
        link: '/java/faq/coding'
      }
    ]
  }
}
export const createGitMenu = () => {
  return [
    {
      text: '依赖',
      items: [
        {
          text: '核心库',
          link: '/java/dependencys/basic-core'
        },
        {
          text: '缓存',
          link: '/java/dependencys/cache'
        },
        {
          text: '日志',
          link: '/java/dependencys/log'
        },
        {
          text: '邮件',
          link: '/java/dependencys/mail'
        },
        {
          text: '文件管理',
          link: '/java/dependencys/oss'
        },
        {
          text: '支付',
          link: '/java/dependencys/pay'
        },
        {
          text: 'Redis',
          link: '/java/dependencys/redis'
        },
        {
          text: '权限',
          link: '/java/dependencys/spring-security'
        },
        {
          text: '验证码',
          link: '/java/dependencys/captcha'
        },
        {
          text: 'Elasticsearch',
          link: '/java/dependencys/elasticsearch'
        }
      ]
    },
    {
      text: '规范',
      items: [
        {
          text: 'Idea 相关',
          link: '/java/standard/idea'
        },
        {
          text: '编码相关',
          link: '/java/standard/code'
        }
      ]
    },
    {
      text: 'FAQ',
      items: [
        {
          text: '编码相关',
          link: '/java/faq/coding'
        },
        {
          text: '程序安装',
          link: '/java/faq/install'
        }
      ]
    }
  ]
}
