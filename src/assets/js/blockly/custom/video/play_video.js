import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'play_video'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(parameters) {
    const json = {
      type: 'block_type',
      message0: '播放视频 %1 独占 %2',
      args0: [
        {
          type: 'input_value',
          name: 'video',
          check: 'Video'
        },
        {
          type: 'field_checkbox',
          name: 'occupy',
          checked: true
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
      var value_video = Blockly.Lua.valueToCode(
        block,
        'video',
        Blockly.Lua.ORDER_NONE
      )
      var checkbox_occupy = block.getFieldValue('occupy') === 'TRUE'
      return (
        'CS.MLua.Video.Play(' +
        value_video +
        ', ' +
        JSON.stringify(checkbox_occupy) +
        ')\n'
      )
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
