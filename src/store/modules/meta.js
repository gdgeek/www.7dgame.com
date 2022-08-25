
import { putMeta } from '@/api/v1/meta'

const state = {
  data: {
    name: null,
    verse: null,
    id: -1
  }
}

const mutations = {
  setMetaName(state, name) {
    state.data.name = name
  },
  setMetaId(state, id) {
    state.data.id = id
  },

  setMetaData(state, meta) {
    state.data.name = meta.name
    state.data.verse = meta.verse.name
    state.data.id = meta.id
  }
}
const actions = {

  saveMeta({ state }, data) {
    return new Promise((resolve, reject) => {
      putMeta(state.data.id, {
        data
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
