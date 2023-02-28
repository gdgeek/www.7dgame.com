/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */
import { postMetaKnight, deleteMetaKnight } from '@/api/v1/meta-knight'
//var randomWords = require('random-words')
//let removeNope = -1

import { v4 as uuidv4 } from 'uuid'
function install(editor, options) {
  editor.on('noderemove', async component => {
    if (component.name !== 'Knight' || editor.silent) {
      return true
    }
    const id = component.data['id']

    if (id > 0) {
      try {
        if (options.root.saveable) {
          await deleteMetaKnight(id)
          console.log('delete ok' + id)
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      return false
    }
    return true
  })

  editor.on('nodecreate', async component => {
    if (component.name !== 'Knight' || editor.silent) {
      return true
    }
    const uuid = uuidv4()
    let id = component.data['id']

    if (typeof id === 'undefined' && options.root.saveable) {
      const response = await postMetaKnight({
        verse_id: options.root.id,
        uuid
      })
      const data = response.data
      id = data.id
      component.controls.get('id').setValue(id)
      component.controls.get('uuid').setValue(uuid)
    }
    setTimeout(() => {
      component.controls.get('knight').$emit('setId', id)
    })
    return true
  })
}
export default {
  name: 'rete-knight',
  install: install
}
