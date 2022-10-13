<template>
  <div class="verse-index">
    <el-container>
      <el-main>
        <iframe
          id="editor"
          :src="src"
          class="content"
          height="100%"
          width="100%"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
var qs = require('querystringify')
import { getMeta } from '@/api/v1/meta'
var path = require('path')
export default {
  name: 'VerseEditor',
  data() {
    const src = path.join(
      'three.js/editor',
      'space-editor.html' + qs.stringify({ id: this.$route.query.id }, true)
    )

    return {
      editor: null,
      data: null,
      src
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  created() {
    const self = this
    /*getMeta(this.id).then(response => {
      self.data = JSON.parse(response.data.data)

      if (this.editor !== null) {
        const data = { verify: 'mrpp.com', action: 'load', data: self.data }
        self.editor.contentWindow.postMessage(data, '*')
      }
    })*/
  },
  mounted() {
    const self = this
    window.addEventListener('message', e => {
      //   alert(JSON.stringify(e.data))
      self.editor = document.getElementById('editor')
      self.editor.contentWindow.postMessage('hi data~', '*')
      /*if (e.data && e.data.verify === 'mrpp.com') {
        self.postMessage(e.data)
      }*/
    })
  },
  methods: {
    postMessage(data) {
      const self = this
      if (data.action === 'loaded') {
        self.editor = document.getElementById('editor')

        if (self.data !== null) {
          const data = { verify: 'mrpp.com', action: 'load', data: self.data }
          self.editor.contentWindow.postMessage(data, '*')
          self.data = null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 140px);
  border-style: solid;
  border-width: 1px;
}
</style>
