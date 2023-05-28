import Type from './type'
import Blockly from 'blockly'

import Event from './event.js'
import EventWithParameter from './event-with-parameter.js'
import Start from './start.js'
import Sleep from '../helper/sleep.js'

const VerseCategory = {
  kind: 'category',
  name: '宇宙',
  colour: Type.colour,
  contents: [
    Event.toolbox,
    EventWithParameter.toolbox,
    Start.toolbox,
    Sleep.toolbox
  ]
}

function RegisterData(data, parameters) {
  Blockly.Blocks[data.title] = data.getBlock(parameters)
  Blockly.Lua[data.title] = data.getLua(parameters)
}
function VerseRegister(parameters) {
  RegisterData(Event, parameters)
  RegisterData(EventWithParameter, parameters)
  RegisterData(Start, parameters)
  RegisterData(Sleep, parameters)
}
export { VerseCategory, VerseRegister }
