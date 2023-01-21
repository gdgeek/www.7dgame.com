<template>
  <div>
    <resource-dialog
      @selected="selectResources"
      @cancel="openResources()"
      @getDatas="resources"
      ref="dialog"
      :message="resourceMessage"
    />
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="meta !== null" slot="header" class="clearfix">
            <router-link :to="'/verse/rete-verse?id=' + meta.verse.id">
              <el-link :underline="false">
                【宇宙】{{ meta.verse.name }} {{ meta.share }}
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

          <div v-show="visible" id="rete" ref="rete" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import editor from '@/node-editor/meta'
import { getMeta, putMeta } from '@/api/v1/meta'
import { getResources } from '@/api/resources'
import ResourceDialog from '@/components/MrPP/MrPPResourceDialog.vue'
import { AbilityWorks, AbilityShare } from '@/ability/ability'

export default {
  components: {
    ResourceDialog
  },
  data() {
    return {
      resource: {
        callback: null,
        type: null
      },
      loading: false,
      id: parseInt(this.$route.query.id),
      visible: true,
      meta: null
    }
  },
  computed: {
    resourceMessage() {
      switch (this.resource.type) {
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
    title() {
      return this.$route.query.title
    },
    canSave() {
      const self = this

      if (self.meta === null) {
        return false
      }
      return (
        self.$can('update', new AbilityWorks(self.meta.author_id)) ||
        self.$can('share', new AbilityShare(self.meta.share))
      )
    }
  },

  async mounted() {
    editor.initMeta({
      container: this.$refs.rete,
      root: this
    })
    const response = await getMeta(this.id, 'verse,share')
    this.meta = response.data
    //alert(JSON.stringify(this.meta))
    if (this.meta.data !== null) {
      await editor.setup(JSON.parse(this.meta.data))
    } else {
      await editor.create({
        name: this.meta.name,
        id: this.meta.id
      })
      await this.save()
    }
    this.loading = false
    if (!this.canSave) {
      editor.ban()
    }
  },
  beforeDestroy() {
    if (this.canSave) {
      this.save()
    }
  },
  methods: {
    openResources({ callback, type } = { callback: null, type: null }) {
      if (this.canSave) {
        this.resource.callback = callback
        this.resource.type = type

        if (callback !== null) {
          this.$refs.dialog.open()
        }
      }
    },
    selectResources(data) {
      if (this.resource.callback !== null) {
        this.resource.callback(data)
      }
    },

    resources(data, callback) {
      getResources(
        this.resource.type,
        data.sorted,
        data.searched,
        data.current
      ).then(response => callback(response))
    },
    async save() {
      if (this.canSave) {
        const data = await editor.save()
        await putMeta(this.id, {
          data
        })
      }
    },
    async arrange() {
      await editor.arrange()
    }
  }
}
</script>

<style lang="scss" scoped>
#rete {
  width: 100%;
  height: 1000px;
}

.node .control input,
.node .input-control input {
  width: 140px;
}

select,
input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>
