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

import { AbilityEditable } from '@/ability/ability'
import { mapMutations } from 'vuex'
import env from '@/environment.js'
import { putMeta } from '@/api/v1/meta'
import { getMeta } from '@/api/e1/meta'

export default {
  name: 'VerseScene',
  data() {
    const src = path.join('three.js/editor', 'meta-editor.html')

    return {
      isInit: false,
      // meta: null,
      src
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },

    title() {
      return this.$route.query.title
    },
    /*url() {
      const uri =
        env.api +
        path.join(
          '/v1/verses/',
          this.id + qs.stringify({ expand: 'datas,resources,space' }, true)
        )
      return uri
    },*/
    saveable() {
      if (this.meta === null) {
        return false
      }
      return this.$can('editable', new AbilityEditable(this.meta.editable))
    }
  },
  destroyed() {
    this.setBreadcrumbs({ list: [] })
  },
  created() {
    this.setBreadcrumbs({
      list: [
        {
          path: '/',
          meta: { title: '元宇宙实景编程平台' }
        },
        {
          path: '/meta-verse/index',
          meta: { title: '元&宇宙' }
        },

        {
          path: '.',
          meta: { title: '场景编辑' }
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
              self.meta = r.data
              self.breadcrumb(self.meta)
              // alert(JSON.stringify(self.meta))
              const data = {
                verify: 'mrpp.com',
                action: 'load',
                data: self.meta,
                saveable: self.saveable
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
    breadcrumb(meta) {
      this.setBreadcrumbs({
        list: [
          {
            path: '/',
            meta: { title: '元宇宙实景编程平台' }
          },
          {
            path: '/meta-verse/index',
            meta: { title: '元&宇宙' }
          },
          {
            path: '/verse/view?id=' + meta.verse_id,
            meta: { title: '【宇宙】' }
          },
          {
            path: '/verse/rete-verse?id=' + meta.verse_id,
            meta: { title: '宇宙编辑' }
          },
          {
            path:
              '/meta/rete-meta?id=' +
              meta.id +
              '&title=' +
              encodeURIComponent(this.title),
            meta: { title: '元编辑' }
          },
          {
            path: '.',
            meta: { title: '内容编辑' }
          }
        ]
      })
    },

    async saveMeta(meta) {
      if (!this.saveable) {
        this.$message({
          type: 'info',
          message: '没有保存权限!'
        })
        return
      }

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
