import Blockly from 'blockly'
import DataType from './type'

import Helper from '../helper'
const data = {
  name: 'picture_entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '图片 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Picture',
          options: function () {
            const pictures = root.$store.state.blockly.data.pictures
            let opt = [['none', '']]
            pictures.forEach(poly => {
              // alert(poly.name)
              opt.push([poly.name, poly.uuid])
            })
            return opt
          }
        }
      ],
      output: 'Picture',
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
      var dropdown = block.getFieldValue('Picture')
      //alert(dropdown_picture);
      // TODO: Assemble Lua into code variable.

      // var code =
      //  "CS.MrPP.Lua.Handler('" + index + "', '" + dropdown_picture + "')"
      // TODO: Change ORDER_NONE to the correct strength.
      // return [code, Blockly.Lua.ORDER_NONE]

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
