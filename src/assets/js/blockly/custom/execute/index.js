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
function RegisterData(root, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(root)
}
function ExecuteRegister(root) {
  RegisterData(root, BoomExecute)
  RegisterData(root, FunctionExecute)
  RegisterData(root, LineExecute)
  RegisterData(root, TweenExecute)
  RegisterData(root, VisualExecute)
  
  
}
export { ExecuteCategory, ExecuteRegister }
