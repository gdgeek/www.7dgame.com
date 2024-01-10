import Blockly from 'blockly'
import EventType from './type'
import Helper from '../helper'
import Argument from '../argument'
const data = {
  name: 'player_position'
}
const block = {
  title: data.name,
  type: EventType.name,
  colour: EventType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: 'block_type',
      message0: '玩家位置 %1',
      args0: [
        {
          type: 'input_value',
          name: 'Player',
          check: 'Number'
        }
      ],
      inputsInline: true,
      output: 'Parameter',
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
  getLua() {
    const lua = function (block) {
      var id = Blockly.Lua.valueToCode(
        block,
        'Player',
        Blockly.Lua.ORDER_ATOMIC
      )

      return [Argument.player(id), Blockly.Lua.ORDER_NONE]
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
