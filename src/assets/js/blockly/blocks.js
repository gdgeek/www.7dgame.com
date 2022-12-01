import { EntityRegister } from '@/assets/js/blockly/custom/entity'
import { DataRegister } from '@/assets/js/blockly/custom/data'
import { TriggerRegister } from '@/assets/js/blockly/custom/trigger'
import { ExecuteRegister } from '@/assets/js/blockly/custom/execute'

function AddBlocks(root, index) {
  TriggerRegister(root, index)
  EntityRegister(root, index)
  DataRegister(root, index)
  ExecuteRegister(root, index)
}

export { AddBlocks }
