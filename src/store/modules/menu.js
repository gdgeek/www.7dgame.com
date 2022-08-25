import defaultSettings from '@/settings.js'

import environment from '@/environment.js'
const { word } = defaultSettings

const state = {
  data: [
    {
      label: '个人中心',
      url: '/home/index',
      icon: 'id-badge',
      items: [
        {
          label: '我的主页',
          url: '/home/index',
          icon: 'home'
        }
      ]
    },
    {
      label: word.projectEnitiy,
      url: '/verse/',
      icon: 'adjust',
      items: [
        {
          label: word.projectList,
          url: '/verse/index',
          icon: 'list'
        },
        {
          label: '开放（系统推荐）',
          url: '/verse/open',
          icon: 'list'
        },
        {
          label: '协作（朋友分享）',
          url: '/verse/share',
          icon: 'list'
        }
      ]
    },
    {
      label: '资源管理',
      url: '/resource/',
      icon: 'cubes',
      items: [
        {
          label: '模型管理',
          url: '/polygen/',
          icon: 'cube',
          items: [
            {
              label: '模型列表',
              url: '/polygen/index',
              icon: 'list'
            },
            {
              label: '模型上传',
              url: '/polygen/upload',
              icon: 'upload'
            },
            {
              label: '模型上传(高级)',
              hidden: !environment.local,
              url: '/polygen/upload-advanced',
              icon: 'upload'
            }
          ]
        },
        {
          label: '图片管理',
          url: '/picture/',
          icon: 'file-image',
          items: [
            {
              label: '图片列表',
              url: '/picture/index',
              icon: 'list'
            },
            {
              label: '图片上传',
              url: '/picture/upload',
              icon: 'upload'
            }
          ]
        },
        {
          label: '视频管理',
          url: '/video/',
          icon: 'file-video',
          items: [
            {
              label: '视频列表',
              url: '/video/index',
              icon: 'list'
            },
            {
              label: '视频上传',
              url: '/video/upload',
              icon: 'upload'
            }
          ]
        }
      ]
    },

    {
      label: '探索',
      url: '/discovery/',
      icon: 'compass',
      hidden: environment.local,
      items: [
        /*
        {
          label: '新闻',
          url: '/discovery/news',
          icon: 'newspaper'
        },
        {
          label: '下载',
          url: '/discovery/download',
          icon: 'download'
        },*/
        {
          label: '文档',
          url: '/discovery/document',
          icon: 'book'
        }
        /*,
        {
          label: '案例',
          url: '/discovery/example',
          icon: 'star-half-alt'
        }*/
      ]
    },
    /*
    {
      label: '充值',
      url: '/trades/',
      icon: 'dollar-sign',
      hidden: environment.local,
      items: [
        {
          label: '付款',
          url: '/trades/pay',
          icon: 'dollar-sign'
        }
      ]
    },*/
    {
      hidden: environment.local,
      label: '交流',
      url: '/community/index',
      icon: 'address-card'
    },

    {
      hidden: !environment.local,
      label: '管理',
      url: '/manager/user',
      icon: 'address-card'
    },

    {
      label: '退出登录',
      url: '/site/logout',
      icon: 'reply'
    }
  ]
}

export default {
  state
}
