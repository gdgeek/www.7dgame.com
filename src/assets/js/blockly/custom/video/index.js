import Type from './type'
import Blockly from 'blockly'
import VideoEntity from './video_entity'

const VideoCategory = {
  kind: 'category',
  name: '视频',
  colour: Type.colour,
  contents: [VideoEntity.toolbox]
}
function RegisterData(data, parameters) {
  Blockly.Blocks[data.title] = data.getBlock(parameters)
  Blockly.Lua[data.title] = data.getLua(parameters)
}
function VideoRegister(parameters) {
  RegisterData(VideoEntity, parameters)
}
export { VideoCategory, VideoRegister }
