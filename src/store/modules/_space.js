const state = {
  onSpace: null
}

const mutations = {
  spaceCallback(state, callback) {
    state.onSpace = callback
  },
  spaceSelect(state, data) {
    if (state.onSpace !== null) {
      state.onSpace(data)
    }
  }
}

export default {
  state,
  mutations
}
