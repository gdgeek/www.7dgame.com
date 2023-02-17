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

import { AbilityWorks, AbilityShare } from '@/ability/ability'
import { mapMutations } from 'vuex'
import environment from '@/environment.js'
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
      editor: null,
      data: null,
      src,
      _canSave: null
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
  mounted() {
    const self = this
    window.addEventListener('message', async e => {
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
              // console.error(r.data)

              this._canSave = this.canSave(r.data.author_id, r.data.share)
              const data = {
                verify: 'mrpp.com',
                action: 'load',
                id: this.id,
                data: r.data,
                canSave: this.canSave(r.data.author_id, r.data.share)
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
    canSave(id, share) {
      //const self = this

      /* if (self.meta === null) {
        return false
      }*/
      return (
        this.$can('update', new AbilityWorks(id)) ||
        this.$can('share', new AbilityShare(share))
      )
    },
    async saveVerse(verse) {
      if (!this._canSave) {
        this.$message({
          type: 'info',
          message: '没有保存权限!'
        })
        return
      }
      await putVerse(this.id, { data: verse }).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
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
