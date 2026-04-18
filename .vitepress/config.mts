import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  title: "赛博扫盲手册",
  description: "面向零基础读者，语言通俗易懂，以生活类比为主，循序渐进建立数字世界认知体系。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/preface' }
    ],

    sidebar: [
      {
        text: '📖 引导',
        items: [
          { text: '前言', link: '/preface' }
        ]
      },
      {
        text: '第一部分：基础认知',
        items: [
          { text: '第一章：计算机是什么？', link: '/ch1-what-is-computer' },
          { text: '第二章：硬件世界', link: '/ch2-hardware' },
          { text: '第三章：软件世界', link: '/ch3-software' }
        ]
      },
      {
        text: '第二部分：网络与数据',
        items: [
          { text: '第四章：网络世界', link: '/ch4-network' },
          { text: '第五章：数据与信息', link: '/ch5-data-info' },
          { text: '第六章：网络安全', link: '/ch6-security' }
        ]
      },
      {
        text: '第三部分：智能与生活',
        items: [
          { text: '第七章：人工智能', link: '/ch7-ai' },
          { text: '第八章：数字生活实用指南', link: '/ch8-digital-life' }
        ]
      },
      {
        text: '第四部分：进阶与未来',
        items: [
          { text: '第九章：编程与代码', link: '/ch9-coding' },
          { text: '第十章：未来已来', link: '/ch10-future' }
        ]
      },
      {
        text: '📎 补充',
        items: [
          { text: '附录', link: '/appendix' },
          { text: '后记', link: '/afterword' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/StarGazer114/pcbook_re' }
    ]
  }
})
