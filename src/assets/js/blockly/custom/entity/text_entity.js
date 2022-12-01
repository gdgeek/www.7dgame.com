import Blockly from 'blockly'
import DataType from './type'
const data = {
  name: 'text_entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '文本 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Text',
          options: function () {
            const texts = root.$store.state.blockly.data.texts
            let opt = [['none', '']]
            texts.forEach(text => {
              // alert(poly.name)
              opt.push([text.name, text.uuid])
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
  getLua(index) {
    const lua = function (block) {
      var dropdown_text = block.getFieldValue('Text')
      //alert(dropdown_picture);
      // TODO: Assemble Lua into code variable.
      var code = 'CS.MrPP.Lua.Handler("' + index + '", "' + dropdown_text + '")'
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
