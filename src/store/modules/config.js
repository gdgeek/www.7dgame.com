import cloud from '@/assets/js/file/tencent-cloud.js'
import server from '@/assets/js/file/server.js'
import serverAdvanced from '@/assets/js/file/server-advanced.js'

import environment from '@/environment.js'
const state = {
  store: (() => {
    if (environment.local) {
      return server
    } else {
      return cloud
    }
  })(),
  advanced: (() => {
    if (environment.local) {
      return serverAdvanced
    } else {
      return cloud
    }
  })()
}

export default {
  namespaced: true,
  state
}
