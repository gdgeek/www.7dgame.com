import Type from './type'
import Blockly from 'blockly'
import PictureEntity from './picture_entity'

const PictureCategory = {
  kind: 'category',
  name: '图片',
  colour: Type.colour,
  contents: [PictureEntity.toolbox]
}
function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function PictureRegister(root, index) {
  RegisterData(root, index, PictureEntity)
}
export { PictureCategory, PictureRegister }
