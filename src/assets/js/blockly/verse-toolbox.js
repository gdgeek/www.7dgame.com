import Logic from '@/assets/js/blockly/logic'
import Loop from '@/assets/js/blockly/loop'
import Math from '@/assets/js/blockly/math'
import Texts from '@/assets/js/blockly/texts'
import List from '@/assets/js/blockly/list'
import Colour from '@/assets/js/blockly/colour'

import { EventCategory } from '@/assets/js/blockly/custom/event'
import { TextCategory } from '@/assets/js/blockly/custom/text'
import { EntityCategory } from '@/assets/js/blockly/custom/entity'
import { PolygenCategory } from '@/assets/js/blockly/custom/polygen'
import { DataCategory } from '@/assets/js/blockly/custom/data'
import { TriggerCategory } from '@/assets/js/blockly/custom/trigger'
import { ExecuteCategory } from '@/assets/js/blockly/custom/execute'
import { HelperCategory } from '@/assets/js/blockly/custom/helper/index'
import { PictureCategory } from '@/assets/js/blockly/custom/picture'
import { VideoCategory } from '@/assets/js/blockly/custom/video'
import { SoundCategory } from '@/assets/js/blockly/custom/sound'

const sep = {
  kind: 'sep'
}
const Variable = {
  kind: 'category',
  name: '变量',
  colour: '%{BKY_VARIABLES_HUE}',
  custom: 'VARIABLE'
}
const Procedure = {
  kind: 'category',
  name: '函数',
  colour: '%{BKY_PROCEDURES_HUE}',
  custom: 'PROCEDURE'
}

export default {
  kind: 'categoryToolbox',
  contents: [
    Logic,
    Loop,
    Math,
    Texts,
    List,
    Colour,

    sep,
    /* DataCategory,
    TriggerCategory,
    EventCategory,*/
    //ExecuteCategory,
    sep,
    sep,

    Variable,
    Procedure
  ]
}
