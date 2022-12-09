import Blockly from 'blockly'
import DataType from './type'
import Helper from '../helper'
const data = {
  name: 'polygen_entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '模型 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Polygen',
          options: function () {
            const polygens = root.$store.state.blockly.data.polygens
            let opt = [['none', '']]
            polygens.forEach(poly => {
              // alert(poly.name)
              opt.push([poly.name, poly.uuid])
            })
            return opt
          }
        }
      ],
      output: 'Polygen',
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
    // alert(index)
    const lua = function (block) {
      var dropdown_polygen = block.getFieldValue('Polygen')
      //alert(dropdown_polygen);
      // TODO: Assemble Lua into code variable.
      // var code =
      // TODO: Change ORDER_NONE to the correct strength.
      return [Helper.handler(index, dropdown_polygen), Blockly.Lua.ORDER_NONE]
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
