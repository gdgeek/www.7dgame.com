import Blockly from 'blockly'
import DataType from './type'
import Helper from '../helper'

const data = {
  name: 'video_entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '视频 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Video',
          options: function () {
            const videos = root.$store.state.blockly.data.videos
            let opt = [['none', '']]
            videos.forEach(poly => {
              opt.push([poly.name, poly.uuid])
            })
            return opt
          }
        }
      ],
      output: 'Video',
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
  getLua(index) {
    const lua = function (block) {
      var dropdown = block.getFieldValue('Video')
      //alert(dropdown_video);
      // TODO: Assemble Lua into code variable.
      //var code =
      //  "CS.MrPP.Lua.Handler('" + index + "', '" + dropdown_video + "')"
      // TODO: Change ORDER_NONE to the correct strength.
      return [Helper.handler(index, dropdown), Blockly.Lua.ORDER_NONE]
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
