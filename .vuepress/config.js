module.exports = {
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
                    '/docs/': getDocSidebar(true)
                }
            }
        }
    },
    plugins: ['@vuepress/active-header-links', '@vuepress/back-to-top']
};

function getDocSidebar(isZh) {
    return [
        {
            title: isZh ? '规范' : 'Normative',
            collapsable: false,
            children: ['', 'normative-java', 'normative-database', 'normative-web']
        },
        {
            title: isZh ? '教程' : 'Course',
            collapsable: false,
            children: ['course-java']
        }
    ];
}
