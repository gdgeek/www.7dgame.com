import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
import MetaPlugin from '@/node-editor/plugins/meta'
import { Component } from '@/node-editor/components/Component'
import { Meta, Verse } from '@/node-editor/type/verseEditor'
import { Build } from '@/node-editor/factory'

let editor_ = null
let engine_ = null
export const arrange = function() {
  editor_.trigger('arrange', editor_.nodes)
}
let outMeta_ = 0
export const addMeta = function(meta) {
  const component = editor_.getComponent('Meta')
  component.createNode({ meta }).then(node => {
    node.position = [-300 + outMeta_ * 50, -150 + outMeta_ * 50]
    editor_.addNode(node)
    outMeta_++
  })
}
export const save = function() {
  editor_.trigger('process', { status: 'save' })
}

export const create = function(verse) {
  const data = {
    type: 'Verse',
    parameters: { verse },
    children: {
      metas: []
    }
  }
  return setup(data)
}
export const setup = function(data) {
  return new Promise((resolve, reject) => {
    Build(editor_, data).then(node => {
      editor_.view.resize()
      setTimeout(arrange, 100)
      resolve(data)
    })
  })
}
export const initVerse = async function({ container, verseId, root }) {
  const types = [Meta, Verse]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin)
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'Verse', max: 1, min: 1 }])
  editor_.use(MetaPlugin, { verseId })
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
        await engine_.process(editor_.toJSON(), null, function(data) {
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
