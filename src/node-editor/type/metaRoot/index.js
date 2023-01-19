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
      label: '赛博',
      title: '逻辑编辑',
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
      label: '内容',
      title: '内容编辑',
      key: 'scene',
      callback: function (root) {
        root.$router.push({
          path: '/meta/scene',
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
