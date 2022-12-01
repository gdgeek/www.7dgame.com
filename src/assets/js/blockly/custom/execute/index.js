import Type from './type'
import Blockly from 'blockly'
import BoomExecute from './boom_execute'
import FunctionExecute from './function_execute'
import LineExecute from './line_execute'
import TweenExecute from './tween_execute'
import VisualExecute from './visual_execute'

const ExecuteCategory = {
  kind: 'category',
  name: '可执行',
  colour: Type.colour,
  contents: [
    BoomExecute.toolbox,
    FunctionExecute.toolbox,
    LineExecute.toolbox,
    TweenExecute.toolbox,
    VisualExecute.toolbox
  ]
}
function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function ExecuteRegister(root, index) {
  RegisterData(root, index, BoomExecute)
  RegisterData(root, index, FunctionExecute)
  RegisterData(root, index, LineExecute)
  RegisterData(root, index, TweenExecute)
  RegisterData(root, index, VisualExecute)
}
export { ExecuteCategory, ExecuteRegister }
