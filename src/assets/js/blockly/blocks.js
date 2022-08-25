
import { EntityRegister } from '@/assets/js/blockly/custom/entity'
import { DataRegister } from '@/assets/js/blockly/custom/data'
import { TriggerRegister } from '@/assets/js/blockly/custom/trigger'
import { ExecuteRegister } from '@/assets/js/blockly/custom/execute'



function AddBlocks(root) {
  TriggerRegister(root)
  EntityRegister(root)
  DataRegister(root)
  ExecuteRegister(root)
}

export { AddBlocks }
