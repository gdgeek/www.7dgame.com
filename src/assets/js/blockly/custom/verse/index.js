import Type from './type'
import Blockly from 'blockly'

//import Event from './event.js'
//import EventWithParameter from './event-with-parameter.js'
import Task from './task.js'
import TaskArray from './task_array.js'
import LoadLevel from './load_level.js'
import UnloadLevel from './unload_level.js'
import Anchor from './anchor.js'
import Rectangle from './rectangle.js'
import NumberParameter from './number_parameter.js'
import StringParameter from './string_parameter.js'
import Sleep from './sleep.js'
import Execute from './execute.js'
import Parameters from './parameters.js'
import SystemTask from './system_task.js'
import SystemParameter from './system_parameter.js'
import PlayerPosition from './player_position.js'

const VerseCategory = {
  kind: 'category',
  name: '宇宙',
  colour: Type.colour,
  contents: [
    LoadLevel.toolbox,
    UnloadLevel.toolbox,
    //Event.toolbox,
    //EventWithParameter.toolbox,
    //  Start.toolbox,
    Sleep.toolbox,
    Anchor.toolbox,
    NumberParameter.toolbox,
    StringParameter.toolbox,
    Rectangle.toolbox,
    Task.toolbox,
    TaskArray.toolbox,
    Execute.toolbox,
    Parameters.toolbox,
    SystemTask.toolbox,
    SystemParameter.toolbox,
    PlayerPosition.toolbox
  ]
}

function RegisterData(data, parameters) {
  Blockly.Blocks[data.title] = data.getBlock(parameters)
  Blockly.Lua[data.title] = data.getLua(parameters)
}
function VerseRegister(parameters) {
  RegisterData(LoadLevel, parameters)
  RegisterData(UnloadLevel, parameters)
  RegisterData(Sleep, parameters)
  RegisterData(Anchor, parameters)
  RegisterData(NumberParameter, parameters)
  RegisterData(StringParameter, parameters)
  RegisterData(Rectangle, parameters)
  RegisterData(Task, parameters)
  RegisterData(TaskArray, parameters)
  RegisterData(Execute, parameters)
  RegisterData(Parameters, parameters)
  RegisterData(SystemTask, parameters)
  RegisterData(SystemParameter, parameters)
  RegisterData(PlayerPosition, parameters)
}
export { VerseCategory, VerseRegister }
