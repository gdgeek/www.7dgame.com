import Blockly from 'blockly'
import DataType from './type'
const data = {
  name: 'entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '实体 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Entity',
          options: function () {
            const entities = root.$store.state.blockly.data.entities
            let opt = [['none', '']]
            entities.forEach(entity => {
              // alert(poly.name)
              opt.push([entity.name, entity.uuid])
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
      var dropdown_entity = block.getFieldValue('Entity')
      //alert(dropdown_entity);
      // TODO: Assemble Lua into code variable.
      var code = 'CS.MrPP.Lua.Handler("entity", "' + dropdown_entity + '")'
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
