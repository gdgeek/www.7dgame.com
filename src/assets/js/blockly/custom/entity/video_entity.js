import Blockly from 'blockly'
import DataType from './type'
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
              // alert(poly.name)
              opt.push([poly.name, poly.uuid])
            })
            return opt
          }
        }
      ],
      output: 'Entity',
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
      var dropdown_video = block.getFieldValue('Video')
      //alert(dropdown_video);
      // TODO: Assemble Lua into code variable.
      var code = 'CS.MrPP.Lua.Handler("video", "' + dropdown_video + '")'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Lua.ORDER_NONE]
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
