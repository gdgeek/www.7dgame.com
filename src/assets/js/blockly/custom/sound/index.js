import Type from './type'
import Blockly from 'blockly'
import SoundEntity from './sound_entity'
import PlaySound from './play_sound'

const SoundCategory = {
  kind: 'category',
  name: '音频',
  colour: Type.colour,
  contents: [SoundEntity.toolbox, PlaySound.toolbox]
}
function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function SoundRegister(root, index) {
  RegisterData(root, index, SoundEntity)
  RegisterData(root, index, PlaySound)
}
export { SoundCategory, SoundRegister }
