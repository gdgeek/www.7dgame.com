const state = {
  data: {
    // actions:
    actions: [],
    polygens: [],
    pictures: [],
    videos: [],
    texts: [],
    sounds: [],
    entities: []
  }
}
function testAction(data) {
  if (
    typeof data.parameters !== 'undefined' &&
    typeof data.parameters.action !== 'undefined'
  ) {
    return {
      uuid: data.parameters.uuid,
      name: data.parameters.action,
      parameter: data.parameters.parameter
    }
  }
}

function testPoint(data, typeList) {
  let ret
  typeList.forEach(type => {
    if (data.type.toLowerCase() === type.toLowerCase()) {
      ret = {
        uuid: data.parameters.uuid,
        name: data.parameters.name
      }
    }
  })
  return ret
}

const mutations = {
  clear(state) {
    state.actions = []
    state.polygens = []
    state.pictures = []
    state.videos = []
    state.sounds = []
    state.texts = []
  },
  addMetaData(state, data) {
    if (data === null) {
      return
    }

    console.error(data)
    const action = testAction(data)
    if (action) {
      state.data.actions.push(action)
    }

    const entity = testPoint(data, ['polygen', 'entity', 'video', 'picture'])

    if (entity) {
      state.data.entities.push(entity)
    }

    const polygen = testPoint(data, ['polygen'])

    if (polygen) {
      state.data.polygens.push(polygen)
    }

    const video = testPoint(data, ['video'])

    if (video) {
      state.data.videos.push(video)
    }

    const picture = testPoint(data, ['picture'])

    if (picture) {
      state.data.pictures.push(picture)
    }
    const sound = testPoint(data, ['sound'])

    if (sound) {
      state.data.sounds.push(sound)
    }

    const text = testPoint(data, ['text'])

    if (text) {
      state.data.texts.push(text)
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
