const state = {
  data: null
}

const mutations = {
  clear(state) {
    state.data = null
  },
  setData(state, data) {
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
