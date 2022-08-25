/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */
import { postMeta, deleteMeta } from '@/api/v1/meta'
var randomWords = require('random-words')
function install(editor, options) {
  editor.on('noderemove', component => {
   
    if (component.name !== 'Meta' || editor.silent) {
      return true
    }
    const data = component.data['meta']
    if (data !== null && data.id !== -1) {
      deleteMeta(data.id).then(() => {
        console.log('delete ok')
      })
    } else {
      return false
    }
    return true
  })

  editor.on('nodecreate', component => {
    if (component.name !== 'Meta' || editor.silent) {
      return true
    }

    const meta = component.controls.get('meta')
    if (typeof component.data['meta'] === 'undefined' || component.data['meta'] === null) {
      component.data['meta'] = { name: '初始化...', id: -1 }
      postMeta({
        verse_id: options.verseId,
        name: randomWords()
      }).then(response => {
        if (meta !== null) {
          const data = response.data
          meta.setValue({ name: data.name, id: data.id })
        }
      })
    }

    return true
  })
}
export default {
  name: 'rete-meta',
  install: install
}
