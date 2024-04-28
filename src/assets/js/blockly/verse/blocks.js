import { SignalRegister } from '@/assets/js/blockly/custom/signal'
import { TaskRegister } from '../custom/task'
import { ParameterRegister } from '../custom/parameter'

function AddBlocks(parameters) {
  SignalRegister(parameters)
  TaskRegister(parameters)
  ParameterRegister(parameters)
  /*EntityRegister(parameters)
  PolygenRegister(parameters)
  DataRegister(parameters)
  TextRegister(parameters)
  PictureRegister(parameters)
  HelperRegister(parameters)
  VideoRegister(parameters)
  SoundRegister(parameters)
  EventRegister(parameters)*/
}

export { AddBlocks }
