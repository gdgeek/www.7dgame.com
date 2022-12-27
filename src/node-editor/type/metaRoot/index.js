import { EntitySocket, AddonSocket } from '@/node-editor/sockets/sockets'

console.log(EntitySocket)
// import { MetaSocket } from '@/node-editor/sockets/sockets'
var MetaRootType = {
  title: 'MetaRoot',
  root: true,
  controls: [
    {
      type: 'uuid',
      key: 'uuid'
    },
    {
      type: 'button',
      label: '逻辑',
      title: '进入编辑',
      key: 'cyber',
      callback: function (root) {
        root.$router.push({
          path: '/meta/cyber',
          query: root.$route.query
        })
      },
      ignore: true
    },
    {
      type: 'button',
      label: '场景',
      title: '进入编辑',
      key: 'scene',
      callback: function (root) {
        root.$router.push({
          path: '/verse/scene',
          query: root.$route.query
        })
      },
      ignore: true
    }
  ],
  inputs: [
    {
      key: 'entities',
      title: '实体',
      socket: EntitySocket,
      multiConns: true
    },
    {
      key: 'addons',
      title: '插件',
      socket: AddonSocket,
      multiConns: true
    }
  ]
}
export default MetaRootType
