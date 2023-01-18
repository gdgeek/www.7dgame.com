function companies() {
  if (document.domain.toLowerCase().indexOf('u7gm.com') >= 0) {
    return [{ name: '上海游七网络科技有限公司', url: 'https://u7gm.com' }]
  }
  return [{ name: '上海不加班网络科技有限公司', url: 'https://bujiaban.com' }]
}

const cs = companies()
const state = {
  data: {
    title: '元宇宙实景编程平台',
    description: 'Metaverse Relity Programming Platform',
    companies: cs,
    version: '20230118.1',
    beian: '沪ICP备15039333号',
    logo: '/media/image/mrpp_.png'
  }
}

const mutations = {
  setData(state, data) {
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
