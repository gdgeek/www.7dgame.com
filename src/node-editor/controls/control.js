import Rete from 'rete'

import ActionControl from './actionControl.vue'
import VueNumControl from './numControl.vue'
import MetaControl from './metaControl.vue'
import TransformControl from './transformControl.vue'
import StringControl from './stringControl.vue'
import TitleControl from './titleControl.vue'
import SelectControl from './selectControl.vue'
import MetaNameControl from './metaNameControl.vue'
import BoolControl from './boolControl.vue'
import PolygenControl from './polygenControl.vue'
import VideoControl from './videoControl.vue'
import PictureControl from './pictureControl.vue'
import Vector2Control from './vector2Control.vue'
import Vector3Control from './vector3Control.vue'
import IconsControl from './iconsControl.vue'
import VerseNameControl from './verseNameControl.vue'
import UUIDControl from './uuidControl.vue'
import CodeControl from './codeControl.vue'
import ButtonControl from './buttonControl.vue'
import SpaceControl from './spaceControl.vue'
import PolygenResetControl from './polygenResetControl.vue'

export class Control extends Rete.Control {
  constructor(emitter, { data, root, node }) {
    super(data.key)

    //data.type)
    switch (data.type) {
      case 'select':
        this.component = SelectControl
        break
      case 'meta':
        this.component = MetaControl
        break
      case 'action':
        this.component = ActionControl
        break
      case 'num':
        this.component = VueNumControl
        break
      case 'transform':
        this.component = TransformControl
        break
      case 'string':
        this.component = StringControl
        break
      case 'title':
        this.component = TitleControl
        break
      case 'meta-name':
        this.component = MetaNameControl
        break
      case 'polygen-reset':
        this.component = PolygenResetControl
        break
      case 'bool':
        this.component = BoolControl
        break
      case 'polygen':
        this.component = PolygenControl
        break
      case 'video':
        this.component = VideoControl
        break
      case 'space':
        this.component = SpaceControl
        break
      case 'picture':
        this.component = PictureControl
        break
      case 'vector3':
        this.component = Vector3Control
        break
      case 'vector2':
        this.component = Vector2Control
        break
      case 'icons':
        this.component = IconsControl
        break
      case 'verse-name':
        this.component = VerseNameControl
        break
      case 'uuid':
        this.component = UUIDControl
        break
      case 'code':
        this.component = CodeControl
        break
      case 'button':
        this.component = ButtonControl
        break
      default:
        this.component = VueNumControl
    }

    this.props = {
      emitter,
      data,
      root,
      node
    }
  }

  setValue(val) {
    this.vueContext.value = val
    this.vueContext.refresh()
  }
  $emit(action, value) {
    //console.error(this.vueContext.$emit)
    this.vueContext.$emit(action, value)
    // alert(action)
  }
}
