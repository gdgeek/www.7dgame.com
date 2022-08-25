import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
import RandomStringPlugin from '@/node-editor/plugins/randomString'
import { Component } from './components/Component'

import { Build } from '@/node-editor/factory'
import {
  MetaRoot,
  Polygen,
  Picture,
  Video,
  Text,
  Entity,
  Transparent,
  Rotate,
  LockedScale,
  ImageTarget,
  Toolbar,
  Button,
  Action,
  Tooltip,
  Billboard,
  Moved
} from './type/metaEditor'

let editor_ = null
let engine_ = null
export const save = async function () {
  editor_.trigger('process', { status: 'save' })
}
export const arrange = function () {
  console.log(editor_.nodes.length)
  if (editor_.nodes.length > 0) {
    editor_.trigger('arrange', editor_.nodes)
  }
}
export const create = function (meta) {
  //alert(JSON.stringify(meta))

  const data = {
    type: 'MetaRoot',
    parameters: {
      name: meta,
      transform: {
        position: { x: 0, y: 0, z: 0 },
        rotate: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      active: true
    },
    children: {
      entities: [],
      addons: []
    }
  }
  return setup(data)
}
export const setup = function (data) {
  return new Promise((resolve, reject) => {
    Build(editor_, data)
      .then(node => {
        editor_.view.resize()
        setTimeout(arrange, 100)
        resolve(data)
        // console.error(data)
      })
      .catch(e => reject(e))
  })
}

export const initMeta = async function ({ container, root }) {
  const types = [
    MetaRoot,
    Entity,
    Polygen,
    Picture,
    Video,
    Text,
    Transparent,
    Rotate,
    LockedScale,
    ImageTarget,
    Toolbar,
    Button,
    Action,
    Tooltip,
    Billboard,
    Moved
  ]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.silent = true
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin, {
    delay: 100,
    allocate(component) {
      if (typeof component.type_.allocate !== 'undefined') {
        return component.type_.allocate
      }

      return []
    },
    rename(component) {
      console.log(component)
      return component.name
    }
  })
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'MetaRoot', max: 1, min: 1 }])
  editor_.use(RandomStringPlugin, [
    { component: 'Polygen', target: 'name' },
    { component: 'Video', target: 'name' },
    { component: 'Picture', target: 'name' },
    { component: 'Text', target: 'name' },
    { component: 'Text', target: 'text' },
    { component: 'Entity', target: 'name' },
    { component: 'Button', target: 'title' },
    { component: 'Button', target: 'action' },
    { component: 'Action', target: 'action' },
    { component: 'Tooltip', target: 'text' }
  ])

  engine_ = new Rete.Engine('MrPP@0.1.0')
  types.forEach(type => {
    const component = new Component(type, root)
    editor_.register(component)
    engine_.register(component)
  })
  // editor_.register(new AddComponent())

  editor_.on('process', async e => {
    if (typeof e === 'object' && typeof e.status === 'string') {
      if (e.status === 'save') {
        // alert(e.status)
        await engine_.abort()
        await engine_.process(editor_.toJSON(), null, function (data) {
          root.$store.dispatch('meta/saveMeta', data).then(response => {
            // alert(response)
          })
        })
      }
    }
  })

  editor_.view.resize()
  AreaPlugin.zoomAt(editor_)
  editor_.trigger('process', { status: 'init' })
  // editor_.trigger('save')

  // setTimeout(arrange, 100)
}
