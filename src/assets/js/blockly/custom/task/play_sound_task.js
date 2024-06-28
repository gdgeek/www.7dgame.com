import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'play_sound_task'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(parameters) {
    const json = {
      type: 'block_type',
      message0: '播放音频 %1 任务',
      args0: [
        {
          type: 'input_value',
          name: 'sound',
          check: 'Sound'
        }
      ],
      output: "Task",
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


      return '_G.sound.play_task(' + sound + ')\n'

    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block