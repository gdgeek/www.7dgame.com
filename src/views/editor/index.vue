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
var path = require('path')

import { putVerse } from '@/api/v1/verse'
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
      if (e.data.from === 'space-loader') {
        if (e.data.action == 'save-verse') {
          self.saveVerse(e.data.verse)
        }
      }

      /*if (e.data && e.data.verify === 'mrpp.com') {
        self.postMessage(e.data)
      }*/
    })
  },
  methods: {
    async saveVerse(verse) {
      await putVerse(this.id, { data: verse })
      const iframe = document.getElementById('editor')
      iframe.contentWindow.location.reload(true)
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
