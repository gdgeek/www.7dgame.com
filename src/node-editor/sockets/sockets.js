import Rete from 'rete'

var NumSocket = new Rete.Socket('Number')
var MetaSocket = new Rete.Socket('Meta')
var EntitySocket = new Rete.Socket('Entity')
var AddonSocket = new Rete.Socket('Addon')
var ComponentSocket = new Rete.Socket('Component')
var ButtonSocket = new Rete.Socket('Button')
var ActionSocket = new Rete.Socket('Action')

export {
  ButtonSocket,
  NumSocket,
  MetaSocket,
  EntitySocket,
  AddonSocket,
  ComponentSocket,
  ActionSocket
}

