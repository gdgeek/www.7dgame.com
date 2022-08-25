import Type from './type'
import Blockly from 'blockly'

import ActionTrigger from './action_trigger'
import DestroyTrigger from './destroy_trigger'
import InitTrigger from './init_trigger'
import UpdateTrigger from './update_trigger'


const TriggerCategory = {
  kind: 'category',
  name: '触发',
  colour: Type.colour,
  contents: [
    ActionTrigger.toolbox,
    DestroyTrigger.toolbox,
    InitTrigger.toolbox,
    UpdateTrigger.toolbox
  ]
}



function RegisterData(root, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(root)
}
function TriggerRegister(root) {
  RegisterData(root, ActionTrigger)
  RegisterData(root, DestroyTrigger)
  RegisterData(root, InitTrigger)
  RegisterData(root, UpdateTrigger)
}
export { TriggerCategory, TriggerRegister }
