import Blockly from 'blockly'
import EventType from './type'

import Helper from '../helper'
const data = {
  name: 'output_signal'
}
const block = {
  title: data.name,
  type: EventType.name,
  colour: EventType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: 'block_type',
      message0: '触发信号 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Output',
          options: function () {
            const output = resource.events.inputs
            let opt = [['none', '']]
            output.forEach(({ title, index, uuid }) => {
              opt.push([title, index + ':' + uuid])
            })
            return opt
          }
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: EventType.colour,
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
      var output_event = block.getFieldValue('Output')

      // TODO: Assemble Lua into code variable.
      var code =
        "_G.helper.trigger_signal('" + output_event + "')\n"

      return code
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
/*
<value name="boom">
<shadow  type="vector3_data">
<value name="X">
<shadow type="math_number">
<field name="NUM">20</field>
</shadow></value><value name="Y">
<shadow type="math_number">
<field name="NUM">0</field></shadow></value>
<value name="Z"><shadow type="math_number">
<field name="NUM">0</field></shadow></value>
</shadow></value>
 */
export default block
