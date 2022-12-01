const state = {
  data: {
    actions: [],
    polygens: [],
    pictures: [],
    videos: [],
    texts: [],
    entities: []
  }
}

const mutations = {
  clear(state) {
    state.actions = []
    state.polygens = []
    state.pictures = []
    state.videos = []
  },
  addMetaData(state, data) {
    if (data === null) {
      return
    }
    console.error(data)

    if (
      typeof data.parameters !== 'undefined' &&
      typeof data.parameters.action !== 'undefined'
    ) {
      state.data.actions.push({
        uuid: data.parameters.uuid,
        name: data.parameters.action,
        parameter: data.parameters.parameter
      })
    }

    switch (data.type) {
      case 'Polygen':
        state.data.polygens.push({
          uuid: data.parameters.uuid,
          name: data.parameters.name
        })
        break
      case 'Entity':
        state.data.entities.push({
          uuid: data.parameters.uuid,
          name: data.parameters.name
        })
        break
      case 'Video':
        state.data.videos.push({
          uuid: data.parameters.uuid,
          name: data.parameters.name
        })
        break
      case 'Picture':
        state.data.pictures.push({
          uuid: data.parameters.uuid,
          name: data.parameters.name
        })
        break
      case 'Text':
        state.data.texts.push({
          uuid: data.parameters.uuid,
          name: data.parameters.name
        })
        break
    }
    if (typeof data.children !== 'undefined') {
      const keys = Object.keys(data.children)
      keys.forEach(key => {
        data.children[key].forEach(item => {
          mutations.addMetaData(state, item)
        })
      })
    }
  },
  addMeta(state, data) {
    mutations.addMetaData(state, data)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
