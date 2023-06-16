import { MetaSocket } from '@/node-editor/sockets/sockets'

import env from '@/environment.js'

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
if (env.canStory()) {
  VerseType.controls.push({
    type: 'story',
    key: 'story'
  })
}

export default VerseType
