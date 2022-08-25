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
  addMetaData(state, name, data) {
    if (data === null) {
      return
    }
    if (typeof data.parameters.action !== 'undefined') {
      if (typeof data.parameters.action_parameter !== 'undefined') {
        state.data.actions.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.action,
          parameter: data.parameters.action_parameter
        })
      } else {
        state.data.actions.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.action
        })
      }
    }

    switch (data.type) {
      case 'Polygen':
        state.data.polygens.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.name
        })
        break
      case 'Entity':
        state.data.entities.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.name
        })
        break
      case 'Video':
        state.data.videos.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.name
        })
        break
      case 'Picture':
        state.data.pictures.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.name
        })
        break
      case 'Text':
        state.data.texts.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.name
        })
        break
    }
    if (typeof data.children !== 'undefined') {
      const keys = Object.keys(data.children)
      keys.forEach(key => {
        data.children[key].forEach(item => {
          mutations.addMetaData(state, name, item)
        })
      })
    }
  },
  addMeta(state, meta) {
    mutations.addMetaData(state, meta.name, JSON.parse(meta.data))
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
