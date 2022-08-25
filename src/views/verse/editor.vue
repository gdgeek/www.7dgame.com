<template>
  <div class="verse-index">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="verse !== null" slot="header" class="clearfix">
            {{ word.project }}{{ verseName }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()">
                <font-awesome-icon icon="project-diagram" />
                整理
              </el-button>
              <el-button
                v-if="canSave"
                type="primary"
                size="mini"
                @click="save()"
              >
                <font-awesome-icon icon="save" />
                保存
              </el-button>
            </el-button-group>
          </div>
          <rete-verse ref="rete" class="rete" :verse-id="id" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { AbilityWorks, AbilityShare } from '@/ability/ability'
import ReteVerse from '@/components/Rete/ReteVerse.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getVerse } from '@/api/v1/verse'
export default {
  name: 'VerseEditor',
  components: {
    ReteVerse
  },
  data() {
    return {
      verse: null,
      loading: true
    }
  },

  computed: {
    ...mapState({
      word: state => state.settings.word,
      verseName: state => state.verse.data.name,
      reteId: state => state.verse.data.reteId
    }),
    id() {
      return parseInt(this.$route.query.id)
    },
    canSave() {
      const self = this

      if (self.verse === null) {
        return false
      }
      //AbilityShare
      return (
        self.$can('update', new AbilityWorks(self.verse.author_id)) ||
        self.$can('share', new AbilityShare(self.verse.share))
      )
    }
  },
  created() {
    const self = this

    // this.setData({ redirect: null, path: '/polygen/index', meta: { title: 'sdfsdf' }})
    self.setVerseId(this.id)
    getVerse(this.id).then(response => {
      console.error(response.data.share)
      self.setVerseData(response.data)
      self.verse = response.data

      if (self.verse.data !== null) {
        const json = JSON.parse(self.verse.data)
        if (!json.children && json.chieldren) {
          json.children = json.chieldren
          json.chieldren = undefined
          self.verse.data = JSON.stringify(json)
        }
        self.setup(self.verse.data).then(data => {
          response.data.metas.forEach(meta => {
            if (
              !json.children.metas.find(
                item => item.parameters.meta.id === meta.id
              )
            ) {
              self.addMeta(meta)
            }
          })

          self.loading = false
        })
      } else {
        self.create({ name: self.verse.name, id: self.verse.id }).then(data => {
          self.saveVerse(JSON.stringify(data)).then(response => {
            self.loading = false
          })
        })
      }
    })
  },
  methods: {
    ...mapMutations('verse', ['setVerseId', 'setVerseData']),
    ...mapActions('verse', {
      saveVerse: 'saveVerse'
    }),
    ...mapMutations(['setPolygenList', 'setPictureList', 'setVideoList']),
    addMeta(meta) {
      return this.$refs.rete.addMeta(meta)
    },
    create(verse) {
      return this.$refs.rete.create(verse)
    },
    setup(data) {
      return this.$refs.rete.setup(data)
    },

    save() {
      this.$refs.rete.save()
    },
    beforeDestroy() {
      if (this.canSave) {
        this.save()
      }
    },
    arrange() {
      this.$refs.rete.arrange() // .$emit('arrange')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}
.rete {
  max-width: 91vw;
  min-height: calc(73vh);
  max-height: calc(73vh);
}
#rete {
  border-style: solid;
  border-width: 1px;
}
</style>
