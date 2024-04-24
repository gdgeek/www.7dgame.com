import Type from './type'
import Blockly from 'blockly'
import TweenTask from './tween.js'
const TaskCategory = {
  kind: 'category',
  name: '任务',
  colour: Type.colour,
  contents: [
    TweenTask.toolbox,
  ]
}

function RegisterData(data, parameters) {
  Blockly.Blocks[data.title] = data.getBlock(parameters)
  Blockly.Lua[data.title] = data.getLua(parameters)
}
function TaskRegister(parameters) {
  RegisterData(TweenTask, parameters)
}
export {
  TaskCategory,
  TaskRegister
}
