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

function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function TriggerRegister(root, index) {
  RegisterData(root, index, ActionTrigger)
  RegisterData(root, index, DestroyTrigger)
  RegisterData(root, index, InitTrigger)
  RegisterData(root, index, UpdateTrigger)
}
export { TriggerCategory, TriggerRegister }
