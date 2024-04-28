import Type from './type'
import Blockly from 'blockly'
import BooleanParameter from './boolean_parameter'
import NumberParameter from './number_parameter'
import StringParameter from './string_parameter'
import Parameters from './parameters'
import SystemParameter from './system_parameter'
import PlayerParameter from './player_parameter'
import RectangleParameter from './rectangle_parameter'
const ParameterCategory = {
  kind: 'category',
  name: '参数',
  colour: Type.colour,
  contents: [
    BooleanParameter.toolbox,
    NumberParameter.toolbox,
    StringParameter.toolbox,
    Parameters.toolbox,
    SystemParameter.toolbox,
    PlayerParameter.toolbox,
    RectangleParameter.toolbox
  ]
}

function RegisterData(data, parameters) {
  Blockly.Blocks[data.title] = data.getBlock(parameters)
  Blockly.Lua[data.title] = data.getLua(parameters)
}
function ParameterRegister(parameters) {
  RegisterData(BooleanParameter, parameters)
  RegisterData(NumberParameter, parameters)
  RegisterData(StringParameter, parameters)
  RegisterData(Parameters, parameters)
  RegisterData(SystemParameter, parameters)
  RegisterData(PlayerParameter, parameters)
  RegisterData(RectangleParameter, parameters)

}
export {
  ParameterCategory,
  ParameterRegister
}
