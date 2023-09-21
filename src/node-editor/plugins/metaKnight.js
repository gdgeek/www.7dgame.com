/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */
import { postMetaKnight, deleteMetaKnight } from '@/api/v1/meta-knight'

import { v4 as uuidv4 } from 'uuid'
function install(editor, options) {
  editor.on('noderemove', component => {
    if (component.name !== 'MetaKnight' || editor.silent) {
      return true
    }
    const id = component.data['id']

    if (id > 0) {
      if (options.root.saveable) {
        deleteMetaKnight(id)
          .then(() => {
            console.log('delete ok' + id)
          })
          .catch(() => {
            console.log('delete error' + id)
          })
      }
    } else {
      return false
    }
    return true
  })

  editor.on('nodecreate', component => {
    if (component.name !== 'MetaKnight') {
      return true
    }
    let id = component.data['id']

    if (options.root.saveable) {
      if (typeof id === 'undefined') {
        const uuid = uuidv4()
        const data = {
          verse_id: options.root.id,
          uuid,
          knight_id: component.data['knight']
        }
        postMetaKnight(data).then(response => {
          const data = response.data
          id = data.id
          component.controls.get('id').setValue(id)
          component.controls.get('uuid').setValue(uuid)
          options.root._updateKnightMetaEvent(data, component.data['knight'])
          setTimeout(() => {
            component.controls.get('knight').$emit('setId', id)
          })
        })
      } else {
        setTimeout(() => {
          component.controls.get('knight').$emit('setId', id)
        })
      }
    }
    return true
  })
}
export default {
  name: 'rete-knight-meta',
  install: install
}
