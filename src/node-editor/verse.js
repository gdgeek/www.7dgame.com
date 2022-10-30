import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'

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
export const save = function () {
  editor_.trigger('process', { status: 'save' })
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
