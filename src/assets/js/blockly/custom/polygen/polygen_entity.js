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
  getBlockJson({ resource }) {
    const json = {
      type: data.name,
      message0: '模型 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Polygen',
          options: function () {
            const polygen = resource.polygen
            let opt = [['none', '']]
            polygen.forEach(poly => {
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
  getBlock: function (parameters) {
    const data = {
      init: function () {
        const json = block.getBlockJson(parameters)
        this.jsonInit(json)
      }
    }
    return data
  },
  getLua({ index }) {
    const lua = function (block) {
      var dropdown_polygen = block.getFieldValue('Polygen')
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
