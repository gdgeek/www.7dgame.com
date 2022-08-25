<template>
  <div>
    <el-form :inline="true" size="mini">
      <el-form-item :inline="true" class="el-form-item" label="重设">
        <el-button style="width:140px" type="primary" plain @click="click">
          <font-awesome-icon icon="redo" />
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData', 'node'],

  computed: {

  },
  created() {
    // console.error(this.node)
    // alert(this.node)
  },
  methods: {
    click() {
      alert(this.root)
      if (typeof this.data.callback !== 'undefined') {
        this.data.callback(this.root)
      }
    },
    refresh() {

    }
  }
}
</script>

