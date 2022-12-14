import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'

import { EventSocket } from '@/node-editor/sockets/sockets'
import RandomStringPlugin from '@/node-editor/plugins/randomString'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
import KnightPlugin from '@/node-editor/plugins/knight'
import MetaPlugin from '@/node-editor/plugins/meta'
import AlwaysConnectionPlugin from '@/node-editor/plugins/alwaysConnection'
import { Component } from '@/node-editor/components/Component'
import { Meta, Verse, Knight } from '@/node-editor/type/verseEditor'
import { Build } from '@/node-editor/factory'

let editor_ = null
let engine_ = null
export const arrange = function () {
  editor_.trigger('arrange', editor_.nodes)
}
let outMeta_ = 0
export const addMeta = function (meta) {
  const component = editor_.getComponent('Meta')
  component.createNode({ meta }).then(node => {
    node.position = [-300 + outMeta_ * 50, -150 + outMeta_ * 50]
    editor_.addNode(node)
    outMeta_++
  })
}
export const eventSave = async function () {
  const list = editor_.nodes.filter(node => {
    if (node.name.toLowerCase() === 'meta') {
      return true
    }
    return false
  })
  let ret = []
  list.forEach(node => {
    let nd = {
      type: node.name,
      id: node.data.id,
      linked: []
    }
    node.outputs.forEach((output, key) => {
      if (
        output.socket.name.toLowerCase() === 'event' &&
        output.hasConnection()
      ) {
        let od = {}

        nd.linked.push(od)
        od.uuid = output.key
        od.connections = []
        const links = output.toJSON()
        links.connections.forEach(item => {
          let co = {}

          const n = editor_.nodes.find(node => {
            return node.id === item.node
          })

          od.connections.push(co)
          co.type = n.name
          co.id = n.data.id
          co.uuid = item.input
          // alert(JSON.stringify(item))
        })
      }
      if (nd.linked.length !== 0) {
        ret.push(nd)
      }
    })
  })
  return ret
}
export const save = async function () {
  await engine_.abort()
  let ret = null
  await engine_.process(editor_.toJSON(), null, function (data) {
    ret = data
  })
  return ret
}

export const create = async function (verse) {
  const data = {
    type: 'Verse',
    parameters: { verse },
    children: {
      metas: []
    }
  }
  return await setup(data)
}
export const setup = async function (data) {
  await Build(editor_, data)
  editor_.view.resize()
  setTimeout(arrange, 100)
  return data
}
export const loadEvent = async function (id, oldValue, newValue) {
  const node = getNode({ type: 'Meta', id })
  if (!node) {
    return
  }

  const oldSolts = oldValue

  const iRemove = oldSolts.input.filter(n1 => {
    const f = newValue.input.find(n2 => {
      return n2.uuid === n1.uuid
    })
    if (typeof f === 'undefined') {
      return true
    }
    return false
  })
  const iAdd = newValue.input.filter(n1 => {
    const f = oldSolts.input.find(n2 => {
      return n2.uuid === n1.uuid
    })
    if (typeof f === 'undefined') {
      return true
    }
    return false
  })

  iRemove.forEach(i => {
    const remove = node.inputs.get(i.uuid)
    if (remove) {
      remove.connections.forEach(conn => {
        editor_.removeConnection(conn)
      })
      node.removeInput(remove)
    }
  })
  iAdd.forEach(i => {
    node.addInput(
      new Rete.Input(i.uuid, '[' + i.title + ']', EventSocket, 'multiConns')
    )
  })

  const oRemove = oldSolts.output.filter(n1 => {
    const f = newValue.output.find(n2 => {
      return n2.uuid === n1.uuid
    })
    if (typeof f === 'undefined') {
      return true
    }
    return false
  })
  const oAdd = newValue.output.filter(n1 => {
    const f = oldSolts.output.find(n2 => {
      return n2.uuid === n1.uuid
    })
    if (typeof f === 'undefined') {
      return true
    }
    return false
  })

  oRemove.forEach(i => {
    const remove = node.outputs.get(i.uuid)

    if (remove) {
      remove.connections.forEach(conn => {
        editor_.removeConnection(conn)
      })
      node.removeOutput(remove)
    }
  })
  oAdd.forEach(i => {
    node.addOutput(
      new Rete.Output(i.uuid, '[' + i.title + ']', EventSocket, 'multiConns')
    )
  })
  editor_.selectNode(node)
  editor_.selected.clear()
}
const getNode = function ({ type, id }) {
  const node = editor_.nodes.find(item => {
    if (item.name.toLowerCase() === type.toLowerCase() && item.data.id === id) {
      return true
    }
    return false
  })
  return node
}
export const addLinks = async function ({ type, id, linked }) {
  const node = getNode({ type, id })
  if (node) {
    linked.forEach(item => {
      const output = node.outputs.get(item.uuid)

      item.connections.forEach(c => {
        const node2 = getNode(c)
        const input = node2.inputs.get(c.uuid)
        editor_.connect(output, input)
      })
    })
  }
}
export const addEvent = async function (id, event) {
  const node = editor_.nodes.find(n => {
    if (n.name.toLowerCase() === 'meta' && n.data.id === id) {
      return true
    }
    return false
  })

  if (node) {
    const slots = JSON.parse(event.slots)
    slots.output.forEach(o => {
      node.addOutput(
        new Rete.Output(o.uuid, '[' + o.title + ']', EventSocket, 'multiConns')
      )
    })
    slots.input.forEach(i => {
      node.addInput(
        new Rete.Input(i.uuid, '[' + i.title + ']', EventSocket, 'multiConns')
      )
    })
    editor_.selectNode(node)
    editor_.selected.clear()
  }
}
export const initVerse = async function ({ container, verseId, root }) {
  const types = [Meta, Verse, Knight]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin)
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'Verse', max: 1, min: 1 }])
  editor_.use(MetaPlugin, { verseId })
  editor_.use(KnightPlugin, { verseId })

  editor_.use(AlwaysConnectionPlugin, [
    {
      output: { name: 'Meta', socket: 'out' },
      input: { name: 'Verse', socket: 'metas' }
    },
    {
      output: { name: 'Knight', socket: 'out' },
      input: { name: 'Verse', socket: 'metas' }
    }
  ])
  editor_.use(RandomStringPlugin, [
    { component: 'Meta', target: 'title' },
    { component: 'Knight', target: 'title' }
  ])
  engine_ = new Rete.Engine('MrPP@0.1.0')

  types.forEach(type => {
    const component = new Component(type, root)
    editor_.register(component)
    engine_.register(component)
  })
  editor_.on('process', async e => {
    if (typeof e === 'object' && typeof e.status === 'string') {
      if (e.status === 'save') {
        await engine_.abort()
        console.error('editor_.toJSON()')
        console.error(editor_.toJSON())
        await engine_.process(editor_.toJSON(), null, function (data) {
          console.error(data)
          root.$store.dispatch('verse/saveVerse', data).then(response => {
            console.log(response)
          })
        })
      }
    }
  })

  editor_.view.resize()
  AreaPlugin.zoomAt(editor_)
  editor_.trigger('process', { status: 'init' })
}
