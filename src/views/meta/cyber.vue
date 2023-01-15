<template>
  <div class="verse-code">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <router-link :to="'/meta/editor?id=' + id + '&title=' + title">
              <el-link v-if="meta" :underline="false">
                【元：{{ title }}】{{ canSave }}
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

          <coding
            v-if="meta !== null"
            :meta="meta"
            ref="blockly"
            :cyber="cyber"
            :id="id"
            :index="meta.uuid"
          />
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
import { AbilityWorks, AbilityShare } from '@/ability/ability'
var qs = require('querystringify')
var path = require('path')
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

      return (
        self.$can('update', new AbilityWorks(self.meta.author_id)) ||
        self.$can('share', new AbilityShare(self.meta.share))
      )
    }
  },
  destroyed() {
    this.setBreadcrumbs({ list: [] })
  },
  async created() {
    const self = this
    const response = await getMeta(this.id, 'cyber,event,share')
    self.meta = response.data
    this.setBreadcrumbs({
      list: [
        {
          path: '/',
          meta: { title: '元宇宙实景编程平台' }
        },
        {
          path: path.join(
            '/meta/editor/',
            qs.stringify({ id: self.id, title: self.title }, true)
          ),
          meta: { title: '【元:' + self.title + '】' }
        },
        {
          path: path.join(
            '.',
            qs.stringify({ id: self.id, title: self.title }, true)
          ),
          meta: { title: '【赛博】' }
        }
      ]
    })
    if (self.meta.cyber === null) {
      if (this.canSave) {
        const response = await postCyber({ meta_id: self.meta.id })
        self.cyber = response.data
      }
    } else {
      self.cyber = self.meta.cyber
    }
  },

  beforeDestroy() {
    if (this.canSave) {
      this.save()
    }
  },
  methods: {
    ...mapMutations('breadcrumb', ['setBreadcrumbs']),
    save() {
      this.$refs.blockly.save()
    }
  }
}
</script>
