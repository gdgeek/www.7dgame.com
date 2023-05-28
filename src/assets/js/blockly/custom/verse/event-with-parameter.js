import Blockly from 'blockly'
import EventType from './type'
const data = {
  name: 'event-with-parameter'
}
const block = {
  title: data.name,
  type: EventType.name,
  colour: EventType.colour,
  getBlockJson({ resource }) {
    const json = {
      type: 'block_type',
      message0: '用参数 %1 调用 %2',
      args0: [
        {
          type: 'input_value',
          name: 'Parameter'
        },
        {
          type: 'field_dropdown',
          name: 'Event',
          options: function () {
            const events = resource.events
            let opt = []
            events.forEach(item => {
              opt.push([item.title, JSON.stringify(item)])
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
      var event = JSON.parse(block.getFieldValue('Event'))
      var parameters = Blockly.Lua.valueToCode(
        block,
        'Parameter',
        Blockly.Lua.ORDER_ATOMIC
      )

      // TODO: Assemble Lua into code variable.
      var code =
        '_G.helper.verse_event("' +
        event.index +
        '", "' +
        event.uuid +
        '",' +
        parameters +
        ')\n'

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
