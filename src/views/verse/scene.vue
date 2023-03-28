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
import { putVerse } from '@/api/v1/verse'
import { getVerse } from '@/api/e1/verse'
export default {
  name: 'VerseScene',
  data() {
    const src = path.join(
      'three.js/editor',
      'verse-editor.html' + qs.stringify({ id: this.$route.query.id }, true)
    )

    return {
      isInit: false,
      //editor: null,
      //data: null,
      src,
      verse: null
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    saveable() {
      if (this.verse === null) {
        return false
      }
      alert('==')
      console.error(this.verse)
      return this.$can('editable', new AbilityEditable(this.verse.editable))
    }
  },
  destroyed() {
    this.setBreadcrumbs({ list: [] })
  },
  created() {
    window.addEventListener('message', this.handleMessage)
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
          path: '/verse/view?id=' + this.id,
          meta: { title: '【宇宙】' }
        },
        {
          path: '/verse/rete-verse?id=' + this.id,
          meta: { title: '宇宙编辑' }
        },
        {
          path: '.',
          meta: { title: '场景编辑' }
        }
      ]
    })
  },

  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    ...mapMutations('breadcrumb', ['setBreadcrumbs']),
    async handleMessage(e) {
      const self = this
      if (e.data.from === 'mrpp-editor') {
        switch (e.data.action) {
          case 'save-verse':
            self.saveVerse(e.data.verse)

            break
          case 'ready':
            if (self.isInit == false) {
              self.isInit = true
              const iframe = document.getElementById('editor')
              const r = await getVerse(this.id)
              self.verse = r.data

              alert(self.verse.editable)
              const data = {
                verify: 'mrpp.com',
                action: 'load',
                id: this.id,
                data: self.verse,
                saveable: this.saveable
              }
              iframe.contentWindow.postMessage(data, '*')
            }
            break
        }
      }
    },
    async saveVerse(verse) {
      if (!this.saveable) {
        this.$message({
          type: 'info',
          message: '没有保存权限!'
        })
        return
      }
      await putVerse(this.id, { data: verse }).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!!!'
        })
      })
      const r = await getVerse(this.id)
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
