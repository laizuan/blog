export const createArticleNav = () => {
  return {
    text: '文章',
    items: [
      {
        text: '后端相关文章',
        link: '/article/java/index'
      },
      {
        text: '前端相关文章',
        link: '/article/web/index'
      },
      {
        text: '数据库相关文章',
        link: '/article/database/index'
      },
      {
        text: '网络相关文章',
        link: '/article/network/index'
      },
      {
        text: 'Redis相关文章',
        link: '/article/redis/index'
      },
      {
        text: '面试相关文章',
        link: '/article/interview/index'
      },
      {
        text: '小技巧',
        link: '/article/tips/index'
      }
    ]
  }
}
export const createArticleMenu = () => {
  return [
    {
      text: '小技巧',
      items: [
        {
          text: 'Chrome 操作技巧',
          link: '/article/tips/chrome-opt-tip'
        }
      ]
    },
    {
      text: '后端相关文章',
      items: [
        {
          text: 'Springboot启动扩展点超详细总结',
          link: '/article/java/spring/Springboot启动扩展点超详细总结'
        }
      ]
    },
    {
      text: '前端',
      items: []
    },
    {
      text: '数据库',
      items: []
    },
    {
      text: '面试技巧',
      items: []
    }
  ]
}
