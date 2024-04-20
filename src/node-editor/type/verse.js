import {
  MetaKnightSocket,
  MetaSocket,
  AnchorSocket
} from '@/node-editor/sockets/sockets'

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
      key: 'metaKnights',
      title: 'Module',
      socket: MetaKnightSocket,
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
