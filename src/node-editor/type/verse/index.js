import { MetaSocket } from '@/node-editor/sockets/sockets'

var VerseType = {
  title: 'Verse',
  root: true,
  controls: [
    {
      type: 'uuid',
      key: 'uuid'
    },
    {
      type: 'verse-name',
      key: 'verse',
      readonly: true,
      ignore: true
    },
    {
      type: 'space',
      key: 'space'
    }
  ],

  inputs: [
    {
      key: 'metas',
      title: 'Meta',
      socket: MetaSocket,
      multiConns: true
    }
  ]
}
export default VerseType
