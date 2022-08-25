<template>
  <el-form hidden :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" :label="'UUID'">
      <el-input v-model="value" :readonly="true" />
    </el-form-item>
  </el-form>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],
  // {"type":"MetaRoot","id":1,"parameters":{"name":{"name":"if","id":168},"transform":{"position":{"x":0,"y":0,"z":0},"rotate":{"x":0,"y":0,"z":0},"scale":{"x":1,"y":1,"z":1}},"active":true},"children":{"entities":[{"type":"Polygen","id":2,"parameters":{"uuid":"001dcb90-871e-4515-8e65-e9e1bcf1ee8f","name":"is","transform":{"position":{"x":0,"y":0,"z":0},"rotate":{"x":0,"y":0,"z":0},"scale":{"x":1,"y":1,"z":1}},"active":true,"polygen":35},"children":{"entities":[],"components":[]}},{"type":"Entity","id":3,"parameters":{"name":"clay","transform":{"position":{"x":0,"y":0,"z":0},"rotate":{"x":0,"y":0,"z":0},"scale":{"x":1,"y":1,"z":1}},"active":true},"children":{"entities":[],"components":[]}}],"addons":[]}}
  data() {
    return {
      value: uuidv4()
    }
  },

  mounted() {
    const value = this.getData(this.data.key)
    if (typeof value !== 'undefined') {
      this.value = value
    }
    this.refresh()
  },
  methods: {
    refresh() {
      // alert(this.value)
      if (this.data) { this.putData(this.data.key, this.value) }
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>

