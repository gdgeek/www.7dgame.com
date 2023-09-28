import Type from './type'
import Blockly from 'blockly'

import Event from './event.js'
import EventWithParameter from './event-with-parameter.js'
import Task from './task.js'
import TaskArray from './task-array.js'
import Start from './start.js'
import Anchor from './anchor.js'
import Rectangle from './rectangle.js'
import Message from './message.js'
import Sleep from '../helper/sleep.js'
import Execute from './execute.js'

const VerseCategory = {
  kind: 'category',
  name: '宇宙',
  colour: Type.colour,
  contents: [
    Event.toolbox,
    EventWithParameter.toolbox,
    Start.toolbox,
    Sleep.toolbox,
    Anchor.toolbox,
    Message.toolbox,
    Rectangle.toolbox,
    Task.toolbox,
    TaskArray.toolbox,
    Execute.toolbox
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
  RegisterData(Anchor, parameters)
  RegisterData(Message, parameters)
  RegisterData(Rectangle, parameters)
  RegisterData(Task, parameters)
  RegisterData(TaskArray, parameters)
  RegisterData(Execute, parameters)
}
export { VerseCategory, VerseRegister }
