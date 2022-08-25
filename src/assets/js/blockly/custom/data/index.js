import Type from './type'
import Blockly from 'blockly'

import Vector3Data from './vector3_data'
import TransformData from './transform_data'

const DataCategory = {
  kind: 'category',
  name: '数据',
  colour: Type.colour,
  contents: [Vector3Data.toolbox, TransformData.toolbox]
}

function RegisterData(root, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(root)
}
function DataRegister(root) {
  RegisterData(root, Vector3Data)
  RegisterData(root, TransformData)
}
export { DataCategory, DataRegister }
