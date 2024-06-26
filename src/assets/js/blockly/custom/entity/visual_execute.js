import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'visual_execute'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson({}) {
    const json = {
      type: 'block_type',
      message0: '实体 %1 显示/隐藏 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'entity',
          check: ['Entity', 'Polygen', 'Picture', 'Video', 'Text']
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_value',
          name: 'bool',
          check: 'Boolean'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: DataType.colour,
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
  getLua({}) {
    const lua = function (block) {
      var value_entity = Blockly.Lua.valueToCode(
        block,
        'entity',
        Blockly.Lua.ORDER_NONE
      )
      var value_bool = Blockly.Lua.valueToCode(
        block,
        'bool',
        Blockly.Lua.ORDER_ATOMIC
      )
      // TODO: Assemble Lua into code variable.
      var code =
        '_G.point.set_visual(' + value_entity + ', ' + value_bool + ')\n'
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
