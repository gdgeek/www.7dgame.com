import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'

import UUIDPlugin from '@/node-editor/plugins/uuid'
import { EventSocket } from '@/node-editor/sockets/sockets'
import RandomStringPlugin from '@/node-editor/plugins/randomString'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
import BanPlugin from '@/node-editor/plugins/ban'
import KnightPlugin from '@/node-editor/plugins/knight'
import MetaPlugin from '@/node-editor/plugins/meta'
import AlwaysConnectionPlugin from '@/node-editor/plugins/alwaysConnection'
import { Component } from '@/node-editor/components/Component'
import { Meta, Verse, Knight } from '@/node-editor/type/verseEditor'
import { Build } from '@/node-editor/factory'

let editor_ = null
let engine_ = null
const arrange = function () {
  editor_.trigger('arrange', editor_.nodes)
}
let outMeta_ = 0
const addMeta = function (meta) {
  const component = editor_.getComponent('Meta')
  component.createNode({ meta }).then(node => {
    node.position = [-300 + outMeta_ * 50, -150 + outMeta_ * 50]
    editor_.addNode(node)
    outMeta_++
  })
}
const saveEvent = async function () {
  const list = editor_.nodes.filter(node => {
    if (node.name.toLowerCase() === 'meta') {
      return true
    }
    return false
  })
  let ret = []
  list.forEach(node => {
    let nd = {
      node: node.data.uuid,
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
          co.node = n.data.uuid
          co.uuid = item.input
        })
      }
      if (nd.linked.length !== 0) {
        ret.push(nd)
      }
    })
  })
  return ret
}
const save = async function () {
  await engine_.abort()
  let ret = null
  await engine_.process(editor_.toJSON(), null, function (data) {
    ret = data
  })
  return ret
}
/*
const create = async function (verse) {
  const data = {
    type: 'Verse',
    parameters: { verse },
    children: {
      metas: []
    }
  }

  await setup(data)
  return await save()
}*/
const setup = async function (data) {
  await Build(editor_, data)
  setTimeout(() => {
    arrange()
    editor_.view.resize()
    AreaPlugin.zoomAt(editor_)
  }, 250)
}
const loadEvent = async function (id, oldValue, newValue) {
  const node = getNodeByID({ id })
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
const getNodeByUUID = function ({ uuid }) {
  const node = editor_.nodes.find(item => {
    if (item.data && item.data.uuid === uuid) {
      return true
    }
    return false
  })
  return node
}

const getNodeByID = function ({ id }) {
  const node = editor_.nodes.find(item => {
    if (item.data.id && item.data.id === id) {
      return true
    }
    return false
  })
  return node
}
const removeLinked = async function () {
  const list = []
  editor_.nodes.forEach(node => {
    const connections = node.getConnections()
    connections.forEach(connection => {
      if (
        connection.input.socket.name.toLowerCase() == 'event' &&
        connection.input.node.id == node.id
      ) {
        list.push(connection)
      }
    })
  })
  list.forEach(item => {
    editor_.removeConnection(item)
  })
}
const addLinked = async function ({ node, linked }) {
  const n = getNodeByUUID({ uuid: node })
  if (n) {
    linked.forEach(item => {
      const output = n.outputs.get(item.uuid)

      item.connections.forEach(c => {
        const node2 = getNodeByUUID({ uuid: c.node })
        const input = node2.inputs.get(c.uuid)
        editor_.connect(output, input)
      })
    })
  }
}
const addEvent = async function (uuid, event) {
  const node = editor_.nodes.find(n => {
    if (n.name.toLowerCase() === 'meta' && n.data.uuid === uuid) {
      return true
    }
    return false
  })

  if (node) {
    const data = JSON.parse(event.data)
    data.output.forEach(o => {
      node.addOutput(
        new Rete.Output(o.uuid, '[' + o.title + ']', EventSocket, 'multiConns')
      )
    })
    data.input.forEach(i => {
      node.addInput(
        new Rete.Input(i.uuid, '[' + i.title + ']', EventSocket, 'multiConns')
      )
    })
    editor_.selectNode(node)
    editor_.selected.clear()
  }
}
const ban = function () {
  editor_.use(BanPlugin)
}
const initVerse = async function ({ container, verseId, root }) {
  const types = [Meta, Verse, Knight]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin, { nodeItems: { Clone: false } })
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'Verse', max: 1, min: 1 }])
  //alert(root)
  editor_.use(MetaPlugin, { verseId, root })
  editor_.use(KnightPlugin, { verseId, root })

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
        await root.save()
      }
    }
  })

  editor_.trigger('process', { status: 'init' })
}
export default {
  ban,
  initVerse,
  setup,
  // create,
  arrange,
  save,
  saveEvent,
  addEvent,
  addLinked,
  removeLinked,
  loadEvent,
  addMeta
}
