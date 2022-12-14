import { EntityRegister } from '@/assets/js/blockly/custom/entity'
import { DataRegister } from '@/assets/js/blockly/custom/data'
import { TriggerRegister } from '@/assets/js/blockly/custom/trigger'
import { ExecuteRegister } from '@/assets/js/blockly/custom/execute'
import { PolygenRegister } from '@/assets/js/blockly/custom/polygen'
import { PictureRegister } from '@/assets/js/blockly/custom/picture'
import { VideoRegister } from '@/assets/js/blockly/custom/video'
import { SoundRegister } from '@/assets/js/blockly/custom/sound'

function AddBlocks(parameters) {
  TriggerRegister(parameters)
  EntityRegister(parameters)
  PolygenRegister(parameters)
  DataRegister(parameters)
  ExecuteRegister(parameters)
  PictureRegister(parameters)
  VideoRegister(parameters)
  SoundRegister(parameters)
}

export { AddBlocks }
