import Type from './type'
import Blockly from 'blockly'
import PolygenEntity from './polygen_entity'
import PictureEntity from './picture_entity'
import VideoEntity from './video_entity'
import TextEntity from './text_entity'
import Entity from './entity'

const EntityCategory = {
  kind: 'category',
  name: '实体',
  colour: Type.colour,
  contents: [
    Entity.toolbox,
    PolygenEntity.toolbox,
    PictureEntity.toolbox,
    VideoEntity.toolbox,
    TextEntity.toolbox
  ]
}
function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function EntityRegister(root, index) {
  RegisterData(root, index, Entity)
  RegisterData(root, index, PolygenEntity)
  RegisterData(root, index, PictureEntity)
  RegisterData(root, index, VideoEntity)
  RegisterData(root, index, TextEntity)
}
export { EntityCategory, EntityRegister }
