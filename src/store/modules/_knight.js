const state = {
  onKnight: null
}

const mutations = {
  knightCallback(state, callback) {
    state.onKnight = callback
  },
  knightSelect(state, data) {
    if (state.onKnight !== null) {
      state.onKnight(data)
    }
  }
}

export default {
  state,
  mutations
}
