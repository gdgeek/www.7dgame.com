function install(editor, options) {
  const map = new Map()
  options.forEach(value => {
    map.set(value.output.name, value)
  })
  let removeNode = -1
  editor.on('noderemove', async component => {
    if (editor.silent) {
      return true
    }
    if (map.has(component.name)) {
      removeNode = component.id
      setTimeout(() => {
        removeNode = -1
      })
    }

    return true
  })

  editor.on('nodecreate', async component => {
    if (editor.silent) {
      return true
    }
    if (map.has(component.name)) {
      setTimeout(() => {
        const option = map.get(component.name)
        const input = editor.nodes.find(n => n.name === option.input.name)
        if (input !== null) {
          editor.connect(
            component.outputs.get(option.output.socket),
            input.inputs.get(option.input.socket)
          )
        }
      })
    }

    return true
  })

  editor.on('connectionremove', connection => {
    if (editor.silent) {
      return true
    }

    if (map.has(connection.output.node.name)) {
      if (connection.output.node.id !== removeNode) {
        return false
      }
    }
    return true
  })
}
export default {
  name: 'rete-always-connection',
  install: install
}
