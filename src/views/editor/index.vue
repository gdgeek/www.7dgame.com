<template>
  <div class="verse-index">
    <el-container>

      <el-main>
        <iframe id="editor" src="http://localhost:1111/editor/" class="content" height="100%" width="100%" />
      </el-main>
    </el-container>

  </div>
</template>

<script>

import { getMeta } from '@/api/v1/meta'
export default {
  name: 'VerseEditor',
  data() {
    return {
      editor: null,
      data: null
    }
  },
  computed: {

    id() {
      return parseInt(this.$route.query.id)
    }
  },
  created() {
    const self = this
    getMeta(this.id).then(response => {
      self.data = JSON.parse(response.data.data)

      if (this.editor !== null) {
        const data = { verify: 'mrpp.com', action: 'load', data: self.data }
        self.editor.contentWindow.postMessage(data, '*')
      }
    })
  },
  mounted() {
    const self = this
    window.addEventListener('message', e => {
      if (e.data && e.data.verify === 'mrpp.com') {
        self.postMessage(e.data)
      }
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

.content{
    height:calc(100vh - 140px);
		border-style:solid;
		border-width:1px;
	}

</style>
