import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'play_sound_callback'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(parameters) {
    const json = {
      type: 'block_type',
      message0: '播放音频 %1 独占 %2 %3 回调 %4',
      args0: [
        {
          type: 'input_value',
          name: 'sound',
          check: 'Sound'
        },
        {
          type: 'field_checkbox',
          name: 'occupy',
          checked: true
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_statement',
          name: 'callback'
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
  getLua(parameters) {
    const lua = function (block) {
      var value_sound = Blockly.Lua.valueToCode(
        block,
        'sound',
        Blockly.Lua.ORDER_NONE
      )
      var statements_callback = Blockly.Lua.statementToCode(
        block,
        'callback',
        Blockly.Lua.ORDER_NONE
      )

      var checkbox_occupy = block.getFieldValue('occupy') === 'TRUE'
      //alert(statements_callback)
      // TODO: Assemble Lua into code variable.
      var code =
        'CS.MLua.Sound.Play(' +
        value_sound +
        ', ' +
        JSON.stringify(checkbox_occupy) +
        ', ' +
        JSON.stringify(statements_callback) +
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
