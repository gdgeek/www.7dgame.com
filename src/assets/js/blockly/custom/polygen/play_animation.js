import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'play_animation'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(parameters) {
    const json = {
      type: 'block_type',
      message0: '播放模型动画 %1 %2',
      args0: [
        {
          type: 'field_input',
          name: 'animation',
          text: 'idle'
        },
        {
          type: 'input_value',
          name: 'polygen',
          check: 'Polygen'
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
      var text_animation = block.getFieldValue('animation')
      var value_polygen = Blockly.Lua.valueToCode(
        block,
        'polygen',
        Blockly.Lua.ORDER_NONE
      )
      // TODO: Assemble Lua into code variable.
      var code =
        '_G.polygen.play_animation(' +
        value_polygen +
        ',' +
        JSON.stringify(text_animation) +
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
