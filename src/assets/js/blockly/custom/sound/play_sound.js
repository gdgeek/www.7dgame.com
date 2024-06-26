import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'play_sound'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(parameters) {
    const json = {
      type: 'block_type',
      message0: '播放音频 %1',
      args0: [
        {
          type: 'input_value',
          name: 'sound',
          check: 'Sound'
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
      var sound = Blockly.Lua.valueToCode(
        block,
        'sound',
        Blockly.Lua.ORDER_NONE
      )


      return '_G.sound.play(' + sound + ')\n'

    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
