import { MetaSocket } from '@/node-editor/sockets/sockets'

// import { MetaSocket } from '@/node-editor/sockets/sockets'
var MetaType = {
  title: 'Meta',
  controls: [
    {
      type: 'uuid',
      key: 'uuid'
    },
    {
      type: 'meta',
      key: 'meta',
      readonly: true
    },
    {
      type: 'transform',
      key: 'transform',
      readonly: false
    },
    {
      type: 'bool',
      key: 'active',
      title: '激活',
      readonly: false
    }
  ],
  inputs: null,
  outputs: [
    {
      key: 'out',
      title: 'Meta',
      socket: MetaSocket,
      multiConns: false
    }
  ]
}
export default MetaType
