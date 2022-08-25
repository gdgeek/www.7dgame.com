import Blockly from 'blockly'

import TriggerType from './type'

const data = {
  name: 'action_trigger'
}
const block = {
  title: data.name,
  type: TriggerType.name,
  colour: TriggerType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '动作 %1 %2 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'Action',
          options: function () {
            const actions = root.$store.state.blockly.data.actions
            let opt = [['none', '']]
            actions.forEach(act => {
              opt.push([act.name, act.uuid])
            })
            return opt
          }
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_statement',
          name: 'content'
        }
      ],
      colour: TriggerType.colour,
      tooltip: '',
      helpUrl: ''
    }
    return json
  },
  getBlock(root) {
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
      var dropdown_option = block.getFieldValue('Action')
      var statements_content = Blockly.Lua.statementToCode(block, 'content')
      // TODO: Assemble Lua into code variable.
      var code = '..'

      var code =
        "self.handling['" +
        dropdown_option +
        "'] = function(self, parameter, target) \n\
  print('" +
        dropdown_option +
        "')\n" +
        statements_content +
        'end\n'

      return code
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}

export default block
