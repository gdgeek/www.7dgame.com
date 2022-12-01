import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultSettings from '@/settings.js'

const { word } = defaultSettings
Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'
import Empty from '@/layout/empty'
import Structure from '@/layout/structure'
import Web from '@/layout/site'
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home/index',
    component: Layout,

    children: [
      {
        path: 'editor',
        name: 'Editor',
        meta: { title: '编辑器' },
        redirect: '/editor/index',
        component: Empty,
        children: [
          {
            meta: { title: '编辑器' },
            path: 'index',
            name: 'EditorIndex',
            component: () => import('@/views/editor/index')
          }
        ]
      },
      {
        meta: { title: '个人中心' },
        path: 'home',
        name: 'Home',
        redirect: '/home/index',
        component: Structure,
        children: [
          {
            meta: { title: '首页' },
            path: 'index',
            name: 'HomeIndex',
            component: () => import('@/views/home/index')
          },
          {
            meta: { title: '正文' },
            path: 'document',
            name: 'HomeDocument',
            component: () => import('@/views/home/document')
          },
          {
            meta: { title: '分类' },
            path: 'category',
            name: 'HomeCategory',
            component: () => import('@/views/home/category')
          },
          {
            meta: { title: '支付中心' },
            path: 'pay',
            name: 'SettingsPay',
            component: () => import('@/views/settings/pay')
          },
          {
            meta: { title: '创作历程' },
            path: 'creator',
            name: 'SettingsCreator',
            component: () => import('@/views/home/creator')
          }
        ]
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: { title: '设置' },
        redirect: '/settings/account',
        component: Empty,
        children: [
          {
            path: 'account',
            name: 'SettingsAccount',
            meta: { title: '账号设置' },
            component: () => import('@/views/settings/account')
          },
          {
            meta: { title: '个人资料' },
            path: 'edit',
            name: 'SettingsEdit',
            component: () => import('@/views/settings/edit')
          },
          {
            meta: { title: '用户展示' },
            path: 'people',
            name: 'SettingsPeople',
            component: () => import('@/views/settings/people')
          }
        ]
      },
      {
        path: 'space',
        name: 'Space',
        meta: { title: '空间场景' },
        redirect: '/space/index',
        component: Empty,
        children: [
          {
            meta: { title: '列表' },
            path: 'index',
            name: 'SpaceIndex',
            component: () => import('@/views/space/index')
          },
          {
            path: 'upload',
            name: 'SpaceUpload',
            meta: { title: '场景上传' },
            component: () => import('@/views/space/upload')
          },

          {
            path: 'view',
            name: 'SpaceView',
            meta: { title: '场景处理' },
            component: () => import('@/views/space/view')
          }
        ]
      },
      {
        path: 'polygen',
        name: 'Polygen',
        meta: { title: '模型资源' },
        redirect: '/polygen/index',
        component: Empty,
        children: [
          {
            meta: { title: '列表' },
            path: 'index',
            name: 'PolygenIndex',
            component: () => import('@/views/polygen/index')
          },
          {
            path: 'upload',
            name: 'PolygenUpload',
            meta: { title: '模型上传' },
            component: () => import('@/views/polygen/upload')
          },
          {
            path: 'upload-advanced',
            name: 'PolygenUploadAdvanced',
            meta: { title: '模型上传(高级)' },
            component: () => import('@/views/polygen/upload-advanced')
          },
          {
            path: 'view',
            name: 'PolygenView',
            meta: { title: '模型处理' },
            component: () => import('@/views/polygen/view')
          }
        ]
      },
      {
        path: 'picture',
        name: 'Picture',
        meta: { title: '图片资源' },
        redirect: '/picture/index',
        component: Empty,
        children: [
          {
            meta: { title: '列表' },
            path: 'index',
            name: 'PictureIndex',
            component: () => import('@/views/picture/index')
          },
          {
            path: 'upload',
            name: 'PictureUpload',
            meta: { title: '图片上传' },
            component: () => import('@/views/picture/upload')
          },
          {
            path: 'view',
            name: 'PictureView',
            meta: { title: '图片处理' },
            component: () => import('@/views/picture/view')
          }
        ]
      },
      {
        path: 'video',
        name: 'Video',
        meta: { title: '视频资源' },
        redirect: '/video/index',
        component: Empty,
        children: [
          {
            meta: { title: '列表' },
            path: 'index',
            name: 'VideoIndex',
            component: () => import('@/views/video/index')
          },
          {
            path: 'upload',
            name: 'VideoUpload',
            meta: { title: '视频上传' },
            component: () => import('@/views/video/upload')
          },
          {
            path: 'view',
            name: 'VideoView',
            meta: { title: '视频处理' },
            component: () => import('@/views/video/view')
          }
        ]
      },

      {
        path: 'verse',
        name: 'Verse',
        meta: { title: word.projectList },
        redirect: '/verse/index',
        component: Empty,
        children: [
          {
            path: 'index',
            name: 'VerseIndex',
            meta: { title: '列表' },
            component: () => import('@/views/verse/index')
          },
          {
            path: 'open',
            name: 'VerseOpen',
            meta: { title: '开放列表' },
            component: () => import('@/views/verse/open')
          },
          {
            path: 'share',
            name: 'VerseShare',
            meta: { title: '共享列表' },
            component: () => import('@/views/verse/share')
          },
          {
            path: 'view',
            name: 'VerseView',
            meta: { title: word.project },
            component: () => import('@/views/verse/view')
          },
          {
            path: 'editor',
            name: 'VerseEditor',
            meta: { title: '编辑' },
            component: () => import('@/views/verse/editor')
          },
          {
            path: 'meta/editor',
            name: 'VerseMetaEditor',
            meta: { title: word.entity },
            component: () => import('@/views/verse/meta/editor')
          },
          {
            path: 'code',
            name: 'VerseCode',
            meta: { title: '逻辑' },
            component: () => import('@/views/verse/code')
          },
          {
            path: 'cyber',
            name: 'VerseCyber',
            meta: { title: '逻辑' },
            component: () => import('@/views/verse/cyber')
          }
        ]
      },

      {
        path: 'discovery',
        name: 'Discovery',
        meta: { title: '探索' },
        redirect: '/discovery/news',
        component: Empty,
        children: [
          {
            path: 'news',
            name: 'DiscoveryNews',
            meta: { title: '站内新闻' },
            component: () => import('@/views/discovery/news')
          },
          {
            path: 'download',
            name: 'DiscoveryDownload',
            meta: { title: '下载页面' },
            component: () => import('@/views/discovery/download')
          },
          {
            path: 'document',
            name: 'DiscoveryDocument',
            meta: { title: '相关文档' },
            component: () => import('@/views/discovery/document')
          },
          {
            path: 'example',
            name: 'DiscoveryExample',
            meta: { title: '案例展示' },
            component: () => import('@/views/discovery/example')
          }
        ]
      },
      {
        path: 'community',
        name: 'Community',
        meta: { title: '交流' },
        redirect: '/community/index',
        component: Empty,
        children: [
          {
            path: 'index',
            name: 'CommunityIndex',
            meta: { title: '列表' },
            component: () => import('@/views/community/index')
          },
          {
            path: 'post',
            name: 'CommunityPost',
            meta: { title: '帖子' },
            component: () => import('@/views/community/post')
          }
        ]
      },
      {
        path: 'trades',
        name: 'Trades',
        meta: { title: '付款' },
        redirect: '/trades/pay',
        component: Empty,
        children: [
          {
            path: 'pay',
            name: 'TradesPay',
            meta: { title: '帖子' },
            component: () => import('@/views/trades/pay')
          }
        ]
      },
      {
        path: 'manager',
        name: 'Manager',
        meta: { title: '管理' },
        redirect: '/manager/user',
        component: Empty,
        children: [
          {
            path: 'user',
            name: 'ManagerUser',
            meta: { title: '用户管理' },
            component: () => import('@/views/manager/user')
          }
        ]
      }
    ]
  },

  {
    path: '/setup',
    component: Web,
    hidden: true,
    redirect: '/setup/index',
    children: [
      {
        path: 'index',
        meta: { title: '初始化设置' },
        name: 'SetupIndex',
        component: () => import('@/views/setup/index')
      }
    ]
  },
  {
    path: '/site',
    component: Web,
    hidden: true,
    redirect: '/site/index',
    children: [
      {
        path: 'index',
        meta: { title: '登陆' },
        name: 'SiteIndex',
        component: () => import('@/views/site/index')
      },
      {
        path: 'wechat-signup',
        meta: { title: '微信注册/绑定' },
        name: 'SiteSignup',
        component: () => import('@/views/site/wechat-signup')
      },
      {
        path: 'logout',
        meta: { title: '登出' },
        name: 'LogOut',
        component: () => import('@/views/site/logout')
      },
      {
        path: '/site/binded-email',
        meta: { title: '绑定email' },
        name: 'BindedEmail',
        component: () => import('@/views/site/binded-email')
      }
    ]
  },

  {
    path: '/web',
    component: Web,
    hidden: true,
    redirect: '/web/index',

    children: [
      {
        meta: { title: '网站首页' },
        path: 'index',
        name: 'WebIndex',

        component: () => import('@/views/web/index')
        // component: () => import('@/views/portal/index')
      },

      {
        meta: { title: '相关下载' },
        path: 'download',
        name: 'WebDownload',

        component: () => import('@/views/web/download')
        // component: () => import('@/views/portal/index')
      },

      {
        meta: { title: '案例展示' },
        path: 'example',
        name: 'WebExample',

        component: () => import('@/views/web/example')
        // component: () => import('@/views/portal/index')
      },

      {
        meta: { title: '商业合作' },
        path: 'business',
        name: 'WebBusiness',

        component: () => import('@/views/web/business')
        // component: () => import('@/views/portal/index')
      },

      {
        meta: { title: '相关文档' },
        path: 'document',
        name: 'WebDocument',

        component: () => import('@/views/web/document')
        // component: () => import('@/views/portal/index')
      },

      {
        meta: { title: '沙盘制作' },
        path: 'sandTable',
        name: 'WebSandTable',

        component: () => import('@/views/web/sandtable')
        // component: () => import('@/views/portal/index')
      },
      {
        meta: { title: '教育合作' },
        path: 'education',
        name: 'WebEducation',

        component: () => import('@/views/web/education')
        // component: () => import('@/views/portal/index')
      }
    ]
  },
  {
    path: '/test/file',
    component: () => import('@/views/test/file'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
