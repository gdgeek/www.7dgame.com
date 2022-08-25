import Blockly from 'blockly'
import DataType from './type'
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
      var dropdown_polygen = block.getFieldValue('Polygen')
      //alert(dropdown_polygen);
      // TODO: Assemble Lua into code variable.
      var code = 'CS.MrPP.Lua.Handler("polygen", "' + dropdown_polygen + '")'
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
