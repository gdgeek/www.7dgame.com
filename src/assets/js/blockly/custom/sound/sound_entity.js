import Blockly from 'blockly'
import DataType from './type'
const data = {
  name: 'sound_entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '音频 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Sound',
          options: function () {
            const sounds = root.$store.state.blockly.data.sounds
            let opt = [['none', '']]
            sounds.forEach(poly => {
              opt.push([poly.name, poly.uuid])
            })
            return opt
          }
        }
      ],
      output: 'Sound',
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
      var dropdown_sound = block.getFieldValue('Sound')
      //alert(dropdown_video);
      // TODO: Assemble Lua into code variable.
      var code =
        'CS.MrPP.Lua.Handler("' + index + '", "' + dropdown_sound + '")'
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
