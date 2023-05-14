<template>
  <div class="verse-script">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            / 【cyber】

            <el-button-group style="float: right">
              <el-button
                v-if="saveable"
                type="primary"
                size="mini"
                @click="save()"
              >
                <font-awesome-icon icon="save" />
                保存
              </el-button>
            </el-button-group>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getVerseScript } from '@/api/v1/verse-script'

import { AbilityEditable } from '@/ability/ability'
var qs = require('querystringify')
var path = require('path')
export default {
  name: 'VerseScript',
  data() {
    return {
      loading: false,
      script: null
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    verse() {
      return this.script.verse
    },
    saveable() {
      if (this.script === null) {
        return false
      }

      return this.$can('editable', new AbilityEditable(this.verse.editable))
    }
  },
  destroyed() {
    this.setBreadcrumbs({ list: [] })
  },
  async created() {
    const response = await getVerseScript(this.id, 'verse')
    this.script = response.data
    this.loading = false
    console.error(this.script)
  },

  beforeDestroy() {
    if (this.saveable) {
      this.save()
    }
  },
  methods: {
    ...mapMutations('breadcrumb', ['setBreadcrumbs']),
    save() {
      //   this.$refs.blockly.save()
    }
  }
}
</script>
