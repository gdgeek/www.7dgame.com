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
      type: 'meta-name',
      key: 'name',
      title: '名称',
      readonly: false
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
