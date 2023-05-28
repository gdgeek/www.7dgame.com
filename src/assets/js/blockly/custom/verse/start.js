import Blockly from 'blockly'

import EventType from './type'

const data = {
  name: 'start'
}
const block = {
  title: data.name,
  type: EventType.name,
  colour: EventType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: data.name,
      message0: '入口 %1',
      args0: [
        {
          type: 'input_statement',
          name: 'content'
        }
      ],
      colour: EventType.colour,
      tooltip: '',
      helpUrl: ''
    }
    return json
  },
  getBlock(parameters) {
    const data = {
      init: function () {
        const json = block.getBlockJson(parameters)
        this.jsonInit(json)
      }
    }
    return data
  },
  getLua(parameters) {
    const lua = function (block) {
      var statements_content = Blockly.Lua.statementToCode(block, 'content')
      // TODO: Assemble Lua into code variable.
      var code = '..'

      var code =
        "meta['$main'] = function(parameter) \n" + statements_content + 'end\n'

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
