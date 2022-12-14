<template>
  <div class="verse-index">
    <resource-dialog
      @selected="spaceSelect"
      @cancel="spaceCallback(null)"
      @getDatas="getSpaces"
      message="选择相应空间"
      ref="spaceDialog"
    />
    <resource-dialog
      @selected="knightSelect"
      @cancel="knightCallback(null)"
      @getDatas="getKnights"
      message="选择相应骑士"
      ref="knightDialog"
    />
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="verse !== null" slot="header" class="clearfix">
            {{ word.project }}{{ verseName }}
            {{ this.$store.state.resource.onKnight }}
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
import { getKnights } from '@/api/v1/knight'
import { getSpaces } from '@/api/v1/space'
import { AbilityWorks, AbilityShare } from '@/ability/ability'
import ReteVerse from '@/components/Rete/ReteVerse.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getVerse } from '@/api/v1/verse'
import ResourceDialog from '@/components/MrPP/MrPPResourceDialog.vue'
export default {
  name: 'VerseEditor',
  components: {
    ReteVerse,
    ResourceDialog
  },
  data() {
    return {
      verse: null,
      loading: true,
      spaceDialog: false
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
  watch: {
    '$store.state.space.onSpace': function () {
      if (this.$store.state.space.onSpace !== null) {
        this.$refs.spaceDialog.open()
      }
    },
    '$store.state.knight.onKnight': function () {
      if (this.$store.state.knight.onKnight !== null) {
        this.$refs.knightDialog.open()
      }
    }
  },

  async created() {
    try {
      await this.init()
    } catch (e) {
      alert(e.message)
    }
    this.loading = false
  },

  methods: {
    ...mapMutations('verse', ['setVerseId', 'setVerseData']),
    ...mapActions('verse', {
      saveVerse: 'saveVerse'
    }),
    ...mapMutations([
      'spaceSelect',
      'spaceCallback',
      'knightSelect',
      'knightCallback'
    ]),
    async init() {
      const self = this

      self.setVerseId(this.id)
      const response = await getVerse(this.id)
      self.setVerseData(response.data)
      self.verse = response.data
      if (self.verse.data !== null) {
        const data = await self.$refs.rete.setup(self.verse.data)
        /*
        response.data.metas.forEach(meta => {
          if (
            !data.children.metas.find(item => item.parameters.id === meta.id)
          ) {
            self.$refs.rete.addMeta(meta)
          }
        })
        */
        self.loading = false
      } else {
        const data = await self.$refs.rete.create({
          name: self.verse.name,
          id: self.verse.id
        })
        await self.saveVerse(JSON.stringify(data))
        self.loading = false
      }
    },

    getSpaces(data, callback) {
      getSpaces(data.sorted, data.searched, data.current).then(response =>
        callback(response)
      )
    },
    getKnights(data, callback) {
      getKnights(data.sorted, data.searched, data.current).then(response => {
        console.error(response)
        callback(response)
      })
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
