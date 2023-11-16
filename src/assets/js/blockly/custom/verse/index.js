import Type from './type'
import Blockly from 'blockly'

import Event from './event.js'
import EventWithParameter from './event-with-parameter.js'
import Task from './task.js'
import TaskArray from './task-array.js'
import Start from './start.js'
import Anchor from './anchor.js'
import Rectangle from './rectangle.js'
import NumberParameter from './number_parameter.js'
import StringParameter from './string_parameter.js'
import Sleep from '../helper/sleep.js'
import Execute from './execute.js'
import Parameters from './parameters.js'
import Player from './player.js'

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
    NumberParameter.toolbox,
    StringParameter.toolbox,
    Rectangle.toolbox,
    Task.toolbox,
    TaskArray.toolbox,
    Execute.toolbox,
    Parameters.toolbox,
    Player.toolbox
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
  RegisterData(NumberParameter, parameters)
  RegisterData(StringParameter, parameters)
  RegisterData(Rectangle, parameters)
  RegisterData(Task, parameters)
  RegisterData(TaskArray, parameters)
  RegisterData(Execute, parameters)
  RegisterData(Parameters, parameters)
  RegisterData(Player, parameters)
}
export { VerseCategory, VerseRegister }
