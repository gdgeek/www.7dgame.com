const state = {
  onSelect: null
}

const mutations = {
  setCallback(state, callback) {
    state.onSpace = callback
  },
  select(state, data) {
    if (state.onSpace !== null) {
      state.onSpace(data)
    }
  }
}

export default {
  state,
  mutations
}
