const state = {
  list: []
}

const mutations = {
  setBreadcrumbs(state, { list }) {
    //alert(list)
    state.list = list
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
