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
      readonly: true
    },
    {
      type: 'button',
      key: 'code',
      title: '进入编辑',
      label: '逻辑',
      style: 'primary',
      callback: function(root) {
        root.$router.push({
          path: '/verse/code',
          query: { id: root.$store.state.verse.data.id }
        })
      },
      readonly: true
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
