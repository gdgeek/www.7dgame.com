import Blockly from 'blockly'
import EventType from './type'

import Helper from '../helper'
const data = {
  name: 'event'
}
const block = {
  title: data.name,
  type: EventType.name,
  colour: EventType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: 'block_type',
      message0: '调用 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Event',
          options: function () {
            const events = resource.events
            let opt = [['none', JSON.stringify({ index: '', uuid: '' })]]
            events.forEach(item => {
              opt.push([item.title, JSON.stringify(item)])
            })
            return opt
          }
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: EventType.colour,
      tooltip: '',
      helpUrl: ''
    }
    return json
  },
  getBlock: function (parameters) {
    const data = {
      init: function () {
        const json = block.getBlockJson(parameters)
        this.jsonInit(json)
      }
    }
    return data
  },
  getLua({ index }) {
    const lua = function (block) {
      var event = JSON.parse(block.getFieldValue('Event'))

      // TODO: Assemble Lua into code variable.
      var code =
        '_G.helper.call_event(' +
        Helper.input_event(event.index, event.uuid) +
        ')\n'

      return code
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
