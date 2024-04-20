<template>

  <div class="verse-scene">
    <knight-setup-dialog
      @selected="select"
      @cancel="cancel"
      ref="knightSetup"
    />
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

import KnightSetupDialog from '@/components/MrPP/KnightSetupDialog.vue'
import { AbilityEditable } from '@/ability/ability'
import { mapMutations } from 'vuex'
import { putVerse } from '@/api/v1/verse'
import { getVerse } from '@/api/e1/verse'
export default {
  name: 'VerseScene',
  components: {
    KnightSetupDialog
  },
  data() {
    const src = path.join(
      'three.js/editor',
      'verse-editor.html' + qs.stringify({ id: this.$route.query.id }, true)
    )

    return {
      isInit: false,
      src
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
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
    async select(data) {
      
      this.postMessage({
        action: 'add-module',
        data: data
      })
    },
    cancel() { 
      alert("cancel")
    },
    postMessage(data) { 
      data.verify = 'mrpp.com';
      const iframe = document.getElementById('editor')
      iframe.contentWindow.postMessage(data, '*')
    },
    saveable(verse) {
      if (verse === null) {
        return false
      }
      return this.$can('editable', new AbilityEditable(verse.editable))
    },
    addModule() { 

      this.$refs.knightSetup.open()
      this.$message({
              type: 'info',
              message: '添加模块'
            })
    },
    async handleMessage(e) {
      const self = this
      if (e.data.from === 'mrpp-editor') {
        alert(e.data.action)
        switch (e.data.action) {
          case 'add-module':
            self.addModule();
           
           break
          case 'save-verse':
            self.saveVerse(e.data.data)

            break
          case 'ready':
            if (self.isInit == false) {
              self.isInit = true
              const verse = await getVerse(this.id)
             
              const data = {
                action: 'load',
                id: this.id,
                data: verse.data,
                saveable: this.saveable(verse.data)
              }
              console.error(data)
              self.postMessage(data)
            }
            break
        }
      }
    },
    async saveVerse(verse) {
      if (!this.saveable(JSON.parse(verse))) {
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
      /*
      const verse = await getVerse(this.id)
      const data = {
        action: 'reload',
        data: verse.data
      }
      this.postMessage(data)*/
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
