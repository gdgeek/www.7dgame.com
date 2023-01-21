import cloud from '@/assets/js/file/tencent-cloud.js'
import server from '@/assets/js/file/server.js'
import serverAdvanced from '@/assets/js/file/server-advanced.js'

import env from '@/environment.js'
const state = {
  store: (() => {
    if (env.useCloud()) {
      return cloud
    } else {
      return server
    }
  })(),
  advanced: (() => {
    if (env.useCloud()) {
      return cloud
    } else {
      return serverAdvanced
    }
  })()
}

export default {
  namespaced: true,
  state
}
