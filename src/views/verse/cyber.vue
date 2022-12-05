<template>
  <div class="verse-code">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <router-link
              :to="'/verse/meta/editor?id=' + id + '&title=' + title"
            >
              <el-link v-if="meta" :underline="false">
                【元：{{ title }}】
              </el-link>
            </router-link>
            / 【赛博】

            <el-button-group style="float: right">
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

          <coding v-if="cyber !== null" ref="blockly" :cyber="cyber" :id="id" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Coding from '@/components/Coding.vue'

import { mapMutations } from 'vuex'
import { getMeta } from '@/api/v1/meta'
import { postCyber } from '@/api/v1/cyber'

var qs = require('querystringify')
var path = require('path')
import { AbilityWorks } from '@/ability/ability'
export default {
  name: 'Cyber',
  components: {
    Coding
  },
  data() {
    return {
      loading: false,
      meta: null,
      cyber: null
    }
  },
  computed: {
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
      return self.$can('update', new AbilityWorks(self.meta.author_id))
    }
  },
  destroyed() {
    this.clear()
  },
  async created() {
    const self = this
    const response = await getMeta(this.id, 'cyber')
    self.meta = response.data
    this.setData({
      redirect: null,
      path: path.join(
        '/verse/meta/editor/',
        qs.stringify({ id: self.id, title: self.title }, true)
      ),
      meta: { title: '编辑-' + self.title }
    })
    //alert(JSON.stringify(meta.data))
    if (self.meta.cyber === null) {
      const response = await postCyber({ meta_id: self.meta.id })

      self.cyber = response.data
    } else {
      self.cyber = self.meta.cyber
    }
    self.addMetaData(JSON.parse(self.meta.data))
  },

  beforeDestroy() {
    if (this.canSave) {
      this.save()
    }
  },
  methods: {
    ...mapMutations('breadcrumb', ['setData', 'clear']),
    ...mapMutations('blockly', ['addMetaData']),
    save() {
      this.$refs.blockly.save()
    }
  }
}
</script>
