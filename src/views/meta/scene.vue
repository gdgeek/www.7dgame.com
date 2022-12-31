<template>
  <div class="verse-scene">
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

import { mapMutations } from 'vuex'
import environment from '@/environment.js'
import { putMeta } from '@/api/v1/meta'
import { getMeta } from '@/api/e1/meta'

export default {
  name: 'VerseScene',
  data() {
    const src = path.join('three.js/editor', 'meta-editor.html')

    return {
      isInit: false,
      //  data: null,
      src
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    url() {
      const uri =
        environment.api +
        path.join(
          '/v1/verses/',
          this.id + qs.stringify({ expand: 'datas,resources,space' }, true)
        )
      return uri
    }
  },
  created() {
    const self = this

    this.setBreadcrumbs({
      list: [
        {
          path: '/',
          meta: { title: '元宇宙实景编程平台' }
        },
        {
          path: '//',
          meta: { title: '元编辑' }
        }
      ]
    })
  },
  mounted() {
    const self = this
    window.addEventListener('message', async e => {
      if (e.data.from === 'mrpp-editor') {
        switch (e.data.action) {
          case 'save-meta':
            self.saveMeta(e.data.meta)
            break
          case 'ready':
            if (self.isInit == false) {
              self.isInit = true
              const iframe = document.getElementById('editor')
              const r = await getMeta(this.id)
              const data = {
                verify: 'mrpp.com',
                action: 'load',
                data: r.data
              }
              iframe.contentWindow.postMessage(data, '*')
            }
            break
        }
      }
    })
  },
  methods: {
    ...mapMutations('breadcrumb', ['setBreadcrumbs']),
    async saveMeta(meta) {
      await putMeta(this.id, { data: meta })
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
      const r = await getMeta(this.id)
      const data = {
        verify: 'mrpp.com',
        action: 'reload',
        data: r.data
      }
      const iframe = document.getElementById('editor')
      iframe.contentWindow.postMessage(data, '*')
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
