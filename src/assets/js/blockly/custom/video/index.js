import Type from './type'
import Blockly from 'blockly'
import VideoEntity from './video_entity'

const VideoCategory = {
  kind: 'category',
  name: '视频',
  colour: Type.colour,
  contents: [VideoEntity.toolbox]
}
function RegisterData(root, index, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(index)
}
function VideoRegister(root, index) {
  RegisterData(root, index, VideoEntity)
}
export { VideoCategory, VideoRegister }
