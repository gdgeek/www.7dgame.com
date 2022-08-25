import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'line_execute'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '从 %1 连线到 %2',
      args0: [
        {
          type: 'input_value',
          name: 'from',
          check: 'Entity'
        },
        {
          type: 'input_value',
          name: 'to',
          check: 'Entity'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: DataType.colour,
      tooltip: '',
      helpUrl: ''
    }
    return json
  },
  getBlock: function (root) {
    const data = {
      init: function () {
        const json = block.getBlockJson(root)
        this.jsonInit(json)
      }
    }
    return data
  },
  getLua(root) {
    const lua = function (block) {
      var value_from = Blockly.Lua.valueToCode(
        block,
        'from',
        Blockly.Lua.ORDER_ATOMIC
      )
      var value_to = Blockly.Lua.valueToCode(
        block,
        'to',
        Blockly.Lua.ORDER_ATOMIC
      )
      // TODO: Assemble Lua into code variable.
      var code =
        'CS.MrPP.Lua.LuaExecuter.Lined(' + value_from + ', ' + value_to + ')\n'
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
