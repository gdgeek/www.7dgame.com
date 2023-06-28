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
      hidden: false,
      readonly: true
    },
    {
      type: 'string',
      key: 'title',
      title: '标题',
      readonly: false
    },

    {
      type: 'knight',
      title: '骑士',
      key: 'knight',
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
