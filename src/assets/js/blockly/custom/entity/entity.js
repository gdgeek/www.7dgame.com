import Blockly from 'blockly'
import DataType from './type'
const data = {
  name: 'entity'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: data.name,
      message0: '实体 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Entity',
          options: function () {
            const entity = resource.entity
            let opt = [['none', '']]
            entity.forEach(ent => {
              opt.push([ent.name, ent.uuid])
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
      var dropdown_entity = block.getFieldValue('Entity')

      // TODO: Assemble Lua into code variable.
      var code =
        'CS.MrPP.Lua.Handler("' + index + '", "' + dropdown_entity + '")'
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
