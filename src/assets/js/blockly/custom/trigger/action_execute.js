import Blockly from 'blockly'
import EventType from './type'

import Helper from '../helper'
const data = {
  name: 'action_execute'
}
const block = {
  title: data.name,
  type: EventType.name,
  colour: EventType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: 'block_type',
      message0: '动作 %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Action',
          options: function () {
            const action = resource.action
            let opt = [['none', '']]
            action.forEach(({ name, uuid }) => {
              opt.push([name, uuid])
            })
            return opt
          }
        },
        {
          type: 'input_value',
          name: 'content',
          check: 'Task'
        }
      ],
      inputsInline: true,
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
      var generator = Blockly.Lua

      var statements_content = generator.valueToCode(
        block,
        'content',
        Blockly.Lua.ORDER_NONE
      )

      var dropdown_option = block.getFieldValue('Action')
      var execute = '  _G.task.execute(' + statements_content + ')\n'
      var code =
        "meta['@" + dropdown_option + "'] = function(parameter) \n  " +
        execute +
        'end\n'

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
