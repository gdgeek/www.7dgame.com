<template>
  <div class="verse-code">
    <el-container>

      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <router-link :to="'/verse/editor?id='+id">
              <el-link v-if="verse" :underline="false"> {{ word.project }}{{ verse.name }}</el-link>
            </router-link>
            / 【逻辑】

            <el-button-group style="float: right">
              <el-button v-if="canSave" type="primary" size="mini" @click="save()"><font-awesome-icon icon="save" />  保存 </el-button>
            </el-button-group>
          </div>

          <blockly v-if="cybers !== null" ref="blockly" :cybers="cybers" />

        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Blockly from '@/components/Blockly.vue'

import { mapMutations, mapState } from 'vuex'
import { getVerse } from '@/api/v1/verse'
import { postVerseCyber } from '@/api/v1/verse-cyber'

import { AbilityWorks } from '@/ability/ability'
export default {
  name: 'VerseCode',
  components: {
    Blockly
  },
  data() {
    return {
      loading: false,
      verse: null,
      cybers: null
    }
  },
  computed: {

    ...mapState({
      word: state => state.settings.word
    }),
    id() {
      return parseInt(this.$route.query.id)
    },
    canSave() {
      const self = this
      if (self.verse === null) {
        return false
      }
      return self.$can('update', new AbilityWorks(self.verse.author_id))
    }
  },
  destroyed() {
    this.clear()
  },
  created() {
    const self = this

    getVerse(this.id, 'verseCybers,metas').then(response => {
      self.verse = response.data

      this.setData({ redirect: null, path: '/verse/editor?id=' + this.verse.id, meta: { title: '编辑-' + this.verse.name }})
      console.log(self.verse)
      if (self.verse.verseCybers.length === 0) {
        postVerseCyber({ verse_id: self.verse.id }).then(response => {
          self.cybers = [response.data]
        })
      } else {
        self.cybers = self.verse.verseCybers
      }
      if (typeof response.data.metas !== 'undefined') {
        response.data.metas.forEach(meta => {
          self.addMeta(meta)
        })
      }
    })
  },

  beforeDestroy() {
    if (this.canSave) { this.save() }
  },
  methods: {

    ...mapMutations('breadcrumb', [
      'setData',
      'clear'
    ]),
    ...mapMutations('blockly', [
      'addMeta'
    ]),
    save() {
      this.$refs.blockly.save()
    }
  }
}
</script>
