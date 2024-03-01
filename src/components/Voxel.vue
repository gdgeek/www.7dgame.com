<template>
  <div height="300px">
    <iframe
      id="editor"
      :src="src"
      class="content"
      height="300px"
      width="100%"
    />
  </div>
</template>

<script>
var qs = require('querystringify')
var path = require('path')

export default {
  name: 'Voxel',
  data() {
    const src = path.join(
      'voxel',
      'voxel.html' + qs.stringify({ url: this.file.url }, true)
    )
    return {
      src
    }
  },
  props: {
    file: {
      type: Object,
      require: true
    }
  },
  computed: {},
  destroyed() {},
  created() {
    window.addEventListener('message', this.handleMessage)
    console.error(this.file.url)
  },

  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    async handleMessage(e) {
      if (e.data.from == '7dgame-voxel' && e.data.action == 'save') {
        this.$emit('save', e.data.info)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 318px;
  border-style: solid;
  border-width: 1px;
}
</style>
