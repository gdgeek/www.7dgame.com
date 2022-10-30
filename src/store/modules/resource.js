const state = {
  polygenList: null,
  videoList: null,
  pictureList: null,
  onSpace: null,
  onPicture: null
}

const mutations = {
  spaceCallback(state, callback) {
    state.onSpace = callback
  },
  spaceSelect(state, data) {
    if (state.onSpace !== null) {
      state.onSpace(data)
    }
  },

  setPolygenList(state, list) {
    state.polygenList = []
    list.forEach(item => {
      state.polygenList.push({
        name: item.name,
        id: item.id,
        image: item.image ? item.image.url : null
      })
    })
  },
  setVideoList(state, list) {
    state.videoList = []
    list.forEach(item => {
      state.videoList.push({
        name: item.name,
        id: item.id,
        image: item.image ? item.image.url : null
      })
    })
  },
  setPictureList(state, list) {
    state.pictureList = []
    list.forEach(item => {
      state.pictureList.push({
        name: item.name,
        id: item.id,
        image: item.image ? item.image.url : null
      })
    })
  }
}

export default {
  state,
  mutations
}
