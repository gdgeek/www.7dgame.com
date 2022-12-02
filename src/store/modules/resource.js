const state = {
  onResource: null,
  type: null
}

const mutations = {
  resourceSetup(state, { callback, type } = { callback: null, type: null }) {
    state.onResource = callback
    state.type = type
  },
  resourceSelect(state, data) {
    if (state.onResource !== null) {
      state.onResource(data)
    }
  }
}

export default {
  state,
  mutations
}
