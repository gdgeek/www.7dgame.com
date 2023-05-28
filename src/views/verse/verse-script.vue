<template>
  <div class="verse-script">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="script && verse" slot="header" class="clearfix">
            {{ verse.name }} / {{ script.title }} / 【脚本】

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
          <blockly-script
            v-if="script !== null && verse !== null"
            ref="blockly"
            :blockly="script.blockly"
            :resource="resource"
            :id="id"
            @submit="submit"
          />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BlocklyScript from '@/components/Script.vue'
import { mapMutations } from 'vuex'
import { getVerseScript, putVerseScript } from '@/api/v1/verse-script'

import { AbilityEditable } from '@/ability/ability'

import { getVerse } from '@/api/v1/verse'
export default {
  name: 'VerseScript',

  components: {
    BlocklyScript
  },
  data() {
    return {
      loading: false,
      script: null,
      verse: null,
      metas: new Map()
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    resource() {
      const inputs = []

      this.verse.metas.forEach(meta => {
        meta.event_node.inputs.forEach(input => {
          inputs.push({
            title: this.metas.get(meta.id) + ':' + input.title,
            index: meta.uuid,
            uuid: input.uuid
          })
        })
      }) /**/
      return {
        events: inputs
      }
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
          path: '.',
          meta: { title: '脚本编辑' }
        }
      ]
    })
    const response = await getVerseScript(this.id)

    this.script = response.data
    this.loading = false

    const verseResponse = await getVerse(this.script.verse_id)

    this.verse = verseResponse.data
    console.log(this.verse.data)
    const data = JSON.parse(this.verse.data)
    data.children.metas.forEach(meta => {
      this.metas.set(meta.parameters.id, meta.parameters.title)
    })

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
          path: '/verse/view?id=' + this.verse.id,
          meta: { title: '【' + this.verse.name + '】' }
        },
        {
          path: '/verse/rete-verse?id=' + this.verse.id,
          meta: { title: '宇宙编辑' }
        },
        {
          path: '.',
          meta: { title: '【' + this.script.title + '】' + '脚本编辑' }
        }
      ]
    })
  },

  beforeDestroy() {
    if (this.saveable) {
      this.save()
    }
  },
  methods: {
    ...mapMutations('breadcrumb', ['setBreadcrumbs']),
    save() {
      this.$refs.blockly.save()
    },
    async submit(id, blockly, code, end) {
      const response = await putVerseScript(id, {
        script: code,
        blockly: blockly
      })
      this.script = response.data

      end()
    }
  }
}
</script>
