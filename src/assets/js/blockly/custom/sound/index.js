import Type from './type'
import Blockly from 'blockly'
import SoundEntity from './sound_entity'
import PlaySound from './play_sound'
import PlaySoundCallback from './play_sound_callback'

const SoundCategory = {
  kind: 'category',
  name: '音频',
  colour: Type.colour,
  contents: [SoundEntity.toolbox, PlaySound.toolbox, PlaySoundCallback.toolbox]
}
function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function SoundRegister(root, index) {
  RegisterData(root, index, SoundEntity)
  RegisterData(root, index, PlaySound)
  RegisterData(root, index, PlaySoundCallback)
}
export { SoundCategory, SoundRegister }
