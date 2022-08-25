import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'tween_execute'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0:
        '实体 %1 经过 %2 移动到 %3 %4',
      args0: [
        {
          type: 'input_value',
          name: 'entity',
          check: 'Entity'
        },
        {
          type: 'field_number',
          name: 'time',
          value: 0.3,
          min: 0,
          max: 1000
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_value',
          name: 'transform',
          check: 'Transform'
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
      var value_entity = Blockly.Lua.valueToCode(
        block,
        'entity',
        Blockly.Lua.ORDER_ATOMIC
      )
      var number_time = block.getFieldValue('time')
      var value_transform = Blockly.Lua.valueToCode(
        block,
        'transform',
        Blockly.Lua.ORDER_ATOMIC
      )
      // TODO: Assemble Lua into code variable.
      var code =
        'CS.MrPP.Lua.LuaExecuter.Tween(' +
        value_entity +
        ', ' +
        number_time +
        ', ' +
        value_transform +
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
