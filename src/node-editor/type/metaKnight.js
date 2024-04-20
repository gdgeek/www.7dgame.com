import { MetaKnightSocket } from '@/node-editor/sockets/sockets'

var MetaKnightType = {
  title: 'MetaKnight',
  controls: [
    {
      type: 'uuid',
      key: 'uuid'
    },
    {
      type: 'num',
      key: 'id',
      hidden: true,
      readonly: true
    },
    {
      type: 'string',
      key: 'title',
      title: '标题',
      readonly: false
    },

    {
      type: 'model',
      title: '元数据',
      key: 'meta_id',
      hidden: false,
      readonly: true
    },
    {
      type: 'transform',
      key: 'transform',
      readonly: false
    }
  ],
  inputs: null,
  outputs: [
    {
      key: 'out',
      title: 'MetaKnight',
      socket: MetaKnightSocket,
      multiConns: false
    }
  ]
}
export default MetaKnightType
