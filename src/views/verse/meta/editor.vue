<template>
  <div class="verse-index">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="meta !== null" slot="header" class="clearfix">
            <router-link :to="'/verse/editor?id=' + meta.verse.id">
              <el-link :underline="false">
                {{ word.project }}{{ meta.verse.name }}
              </el-link>
            </router-link>
            / {{ word.entity }}{{ title }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()">
                <font-awesome-icon icon="project-diagram" />
                整理
              </el-button>
              <el-button type="primary" size="mini" @click="editor()">
                <font-awesome-icon icon="edit" />
                编辑器（测试）
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
          <rete-meta ref="rete" class="rete" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ReteMeta from '@/components/Rete/ReteMeta.vue'

import { AbilityWorks, AbilityShare } from '@/ability/ability'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getMeta } from '@/api/v1/meta'
import { postPolygens, getPictures, getVideos } from '@/api/resources'
export default {
  name: 'MetaEditor',
  components: {
    ReteMeta
  },
  data() {
    return {
      meta: null,
      loading: true
    }
  },
  computed: {
    ...mapState({
      word: state => state.settings.word,
      metaName: state => state.meta.data.name,
      reteId: state => state.meta.data.reteId,
      pictureList: state => state.resource.pictureList,
      videoList: state => state.resource.videoList,
      polygenList: state => state.resource.polygenList
    }),
    id() {
      return parseInt(this.$route.query.id)
    },
    title() {
      return this.$route.query.title
    },
    canSave() {
      const self = this

      if (self.meta === null) {
        return false
      }
      console.error(self.meta)

      return (
        self.$can('update', new AbilityWorks(self.meta.author_id)) ||
        self.$can('share', new AbilityShare(self.meta.share))
      )
    }
  },
  destroyed() {
    this.clear()
  },

  beforeDestroy() {
    if (this.canSave) {
      this.save()
    }
  },
  created() {
    const self = this
    postPolygens().then(response => {
      console.log(response.data)
      self.setPolygenList(response.data)
      console.log(self.polygenList)
    })

    getPictures().then(response => {
      console.log(response.data)
      self.setPictureList(response.data)
    })

    getVideos().then(response => {
      console.log(response.data)
      self.setVideoList(response.data)
      console.log(self.videoList)
    })

    self.setMetaId(this.id)

    getMeta(this.id).then(response => {
      self.meta = response.data

      this.setData({
        redirect: null,
        path: '/verse/editor?id=' + this.meta.verse.id,
        meta: { title: '编辑-' + this.meta.verse.name }
      })
      self.setMetaData(self.meta)
      if (self.meta.data !== null) {
        self.setup(self.meta.data).then(data => {
          self.loading = false
        })
      } else {
        self.create({ name: self.meta.name, id: self.meta.id }).then(data => {
          self.saveMeta(JSON.stringify(data)).then(response => {
            self.loading = false
          })
        })
      }
    })
  },
  methods: {
    ...mapMutations('meta', ['setMetaId', 'setMetaData']),

    ...mapMutations('breadcrumb', ['setData', 'clear']),
    ...mapActions('meta', {
      saveMeta: 'saveMeta'
    }),
    ...mapMutations(['setPolygenList', 'setPictureList', 'setVideoList']),

    setup(data) {
      return this.$refs.rete.setup(data)
    },
    create(meta) {
      return this.$refs.rete.create(meta)
    },
    editor() {
      window.open('/three.js/editor/editor.html?id=' + this.id, '_blank')
    },
    arrange() {
      this.$refs.rete.arrange() // .$emit('arrange')
    },
    save() {
      this.$refs.rete.save() // .$emit('arrange')
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
