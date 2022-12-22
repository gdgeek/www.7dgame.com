<template>
  <div class="meta-editor-index">
    <resource-dialog
      @selected="resourceSelect"
      @cancel="resourceSetup()"
      @getDatas="getResources"
      ref="dialog"
      :message="resourceMessage"
    />
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="meta !== null" slot="header" class="clearfix">
            <router-link :to="'/verse/editor?id=' + meta.verse.id">
              <el-link :underline="false">
                【宇宙】{{ meta.verse.name }}
              </el-link>
            </router-link>
            / 【元】{{ title }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()">
                <font-awesome-icon icon="project-diagram" />
                整理
              </el-button>
              <!--
              <el-button type="primary" size="mini" @click="editor()">
                <font-awesome-icon icon="edit" />
                编辑器（测试）
              </el-button>
              -->
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

import { getSpaces } from '@/api/v1/space'
import { AbilityWorks, AbilityShare } from '@/ability/ability'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getMeta } from '@/api/v1/meta'
import ResourceDialog from '@/components/MrPP/MrPPResourceDialog.vue'
import {
  getResources,
  postPolygens,
  getPictures,
  getVideos
} from '@/api/resources'
export default {
  //onResource
  name: 'MetaEditor',
  components: {
    ReteMeta,
    ResourceDialog
  },
  data() {
    return {
      meta: null,
      loading: true
    }
  },
  watch: {
    '$store.state.resource.onResource': function () {
      if (this.$store.state.resource.onResource !== null) {
        this.$refs.dialog.open()
      }
    }
  },
  computed: {
    resourceMessage() {
      switch (this.$store.state.resource.type) {
        case 'video':
          return '选择相应视频'
        case 'audio':
          return '选择相应音频'
        case 'polygen':
          return '选择相应模型'
        case 'picture':
          return '选择相应图片'
      }
      return '选择相应资源'
    },
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
      //console.error(self.meta)

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
  async created() {
    const self = this

    self.setMetaId(this.id)

    getMeta(this.id).then(response => {
      self.meta = response.data

      this.setData({
        redirect: null,
        path: '/verse/editor?id=' + this.meta.verse.id,
        meta: { title: '编辑：' + this.meta.verse.name + '' }
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
    ...mapMutations(['resourceSelect', 'resourceSetup']),
    ...mapMutations('meta', ['setMetaId', 'setMetaData']),

    ...mapMutations('breadcrumb', ['setData', 'clear']),
    ...mapActions('meta', {
      saveMeta: 'saveMeta'
    }),
    //...mapMutations(['setPolygenList', 'setPictureList', 'setVideoList']),

    setup(data) {
      return this.$refs.rete.setup(data)
    },
    create(meta) {
      return this.$refs.rete.create(meta)
    },
    getResources(data, callback) {
      getResources(
        this.$store.state.resource.type,
        data.sorted,
        data.searched,
        data.current
      ).then(response => callback(response))
    },
    /*
    editor() {
      window.open('/three.js/editor/editor.html?id=' + this.id, '_blank')
    },*/
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
