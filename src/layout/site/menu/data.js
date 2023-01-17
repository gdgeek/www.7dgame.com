export const data = []

import env from '@/environment.js'
if (env.canWeb()) {
  data.concat([
    {
      path: '/web/index',
      name: 'Index',
      text: '网站首页'
    },
    {
      path: '/web/sandtable',
      name: 'SandTable',
      text: '数字沙盘制作'
    },
    {
      path: '/web/download',
      name: 'Download',
      text: '相关下载'
    }
  ])
}

export default { data }
