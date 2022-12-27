import Type from './type'
import Blockly from 'blockly'
import VideoEntity from './video_entity'
import VideoOption from './video_option'
import PlayVideoCallback from './play_video_callback'

const VideoCategory = {
  kind: 'category',
  name: '视频',
  colour: Type.colour,
  contents: [
    VideoEntity.toolbox,
    VideoOption.toolbox,
    PlayVideoCallback.toolbox
  ]
}
function RegisterData(data, parameters) {
  Blockly.Blocks[data.title] = data.getBlock(parameters)
  Blockly.Lua[data.title] = data.getLua(parameters)
}
function VideoRegister(parameters) {
  RegisterData(VideoEntity, parameters)
  RegisterData(VideoOption, parameters)
  RegisterData(PlayVideoCallback, parameters)
}
export { VideoCategory, VideoRegister }
