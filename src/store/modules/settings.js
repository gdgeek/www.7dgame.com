import defaultSettings from '@/settings.js'

const { showSettings, fixedHeader, sidebarLogo, word } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  word: word
}

const mutations = {
  changeSetting: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('changeSetting', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

