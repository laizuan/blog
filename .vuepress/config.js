module.exports = {
    host: '127.0.0.1',
    port: '3000',
    dest: 'html',
    ga: 'UA-85414008-1',
    // base: '/blog/',
    base: '/',
    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: '_blank',
            rel: 'noopener noreferrer'
        }
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: ' ',
            description: '懿点网在线文档'
        }
    },
    head: [['link', { rel: 'icon', href: `/favicon.ico` }]],
    themeConfig: {
        logo: '/img/logo-mini.jpg',
        editLinks: true,
        smoothScroll: true,
        search: true,
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                ariaLabel: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: require('./nav/zh'),
                sidebar: {
                    '/docs/java': [
                        {
                            title: '规范',
                            collapsable: false,
                            children: ['/docs/java/norm-code', '/docs/java/norm-idea']
                        },
                        {
                            title: '教程',
                            collapsable: false,
                            children: ['/docs/java/teach-code']
                        },
                        {
                            title: '常见问题',
                            collapsable: false,
                            children: ['/docs/java/feq']
                        }
                    ],
                    '/docs/web': [
                        {
                            title: '规范',
                            collapsable: false,
                            children: ['/docs/web/norm-code', '/docs/web/norm-style', '/docs/web/norm-idea']
                        },
                        {
                            title: '教程',
                            collapsable: false,
                            children: ['/docs/web/teach-code']
                        },
                        {
                            title: '常见问题',
                            collapsable: false,
                            children: ['/docs/web/feq']
                        }
                    ],
                    '/docs/database': [
                        {
                            title: '规范',
                            collapsable: false,
                            children: ['/docs/database/norm-design', '/docs/database/norm-sql']
                        },
                        {
                            title: '教程',
                            collapsable: false,
                            children: []
                        },
                        {
                            title: '常见问题',
                            collapsable: false,
                            children: ['/docs/database/feq']
                        }
                    ]
                }
            }
        }
    },
    plugins: ['@vuepress/active-header-links', '@vuepress/back-to-top', '@vuepress/plugin-medium-zoom']
};
