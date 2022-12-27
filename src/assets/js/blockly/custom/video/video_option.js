import DataType from './type'

import Blockly from 'blockly'
const data = {
  name: 'video_option'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(parameters) {
    const json = {
      type: 'block_type',
      message0: '执行操作 %1 视频 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'option',
          options: [
            ['播放', 'Play'],
            ['暂停', 'Pause'],
            ['停止', 'Stop']
          ]
        },
        {
          type: 'input_value',
          name: 'video',
          check: 'Video'
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
      var option = block.getFieldValue('option')
      var value_video = Blockly.Lua.valueToCode(
        block,
        'video',
        Blockly.Lua.ORDER_NONE
      )
      // TODO: Assemble Lua into code variable.
      var code =
        'CS.MrPP.Lua.LuaExecuter.VideoControl(' +
        value_video +
        ',' +
        JSON.stringify(option) +
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
