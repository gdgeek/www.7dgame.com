/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.

import { getMeta } from '@/api/v1/meta'
function install(editor, options) {
  editor.on('noderemove', component => {
    alert(123)
    if (component.name !== 'MetaRoot') {
      return true
    }

    return true
  })

  editor.on('nodecreate', component => {
     alert(233)
    const name = component.controls.get('name')
    if (component.name !== 'MetaRoot') {
      return true
    }
    component.data['name'] = { name: '读取中...', readonly: true }
    getMeta(options.metaId).then(response => {
      console.log(response.data.name)
      name.setValue({
        name: response.data.name,
        readonly: false
      })
    })

    return true
  })
}
export default {
  name: 'rete-metaroot',
  install: install
}
 */
