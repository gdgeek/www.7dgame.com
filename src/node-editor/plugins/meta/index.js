/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */
import { postMeta, deleteMeta } from '@/api/v1/meta'

import { v4 as uuidv4 } from 'uuid'
function install(editor, options) {
  editor.on('noderemove', async component => {
    if (component.name !== 'Meta' || editor.silent) {
      return true
    }
    const id = component.data['id']

    if (id !== -1) {
      try {
        await deleteMeta(id)
        console.log('delete ok' + id)
      } catch (e) {
        console.error(e)
      }
    } else {
      return false
    }
    return true
  })
  editor.on('nodecreate', async component => {
    if (component.name !== 'Meta' || editor.silent) {
      return true
    }

    if (typeof component.data['meta'] !== 'undefined') {
      component.data['id'] = component.data['meta'].id
      component.data['title'] = component.data['meta'].name
    }

    let id = component.data['id']

    if (typeof id === 'undefined') {
      const uuid = uuidv4()
      const response = await postMeta({
        verse_id: options.verseId,
        uuid: uuid
      })
      const data = response.data
      id = data.id
      component.controls.get('id').setValue(id)
      // alert(uuid)
      component.controls.get('uuid').setValue(uuid)
    }
    setTimeout(() => {
      component.controls.get('title').$emit('setId', id)
      component.controls.get('event').$emit('setId', id)
    })

    return true
  })
}
export default {
  name: 'rete-meta',
  install: install
}
