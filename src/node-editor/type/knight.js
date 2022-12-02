import { MetaSocket } from '@/node-editor/sockets/sockets'

var KnightType = {
  title: 'Knight',
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
      type: 'knight',
      key: 'knight',
      title: '骑士',
      readonly: false,
      ignore: true
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
export default KnightType
