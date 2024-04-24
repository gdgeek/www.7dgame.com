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
                保存脚本
              </el-button>
            </el-button-group>
          </div>
          <blockly-script
            v-if="script !== null && verse !== null"
            ref="blockly"
            :blockly="script.workspace"
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
      titles: new Map()
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    },
    resource() {
      const inputs = []
      const nodes = []
      /*
      this.verse.metas.forEach(meta => {
        if (!meta.event_node) {
          return
        }
        nodes.push(meta.event_node)
        meta.event_node.inputs.forEach(input => {
          inputs.push({
            title: this.titles.get(meta.uuid) + ':' + input.title,
            index: meta.uuid,
            uuid: input.uuid
          })
        })
      })*/
      /*this.verse.modules.forEach(module => {
        if (!module.event_node) {
          return
        }
        nodes.push(module.event_node)
        module.event_node.inputs.forEach(input => {
          inputs.push({
            title: this.titles.get(module.uuid) + ':' + input.title,
            index: module.uuid,
            uuid: input.uuid
          })
        })
      })*/
      /*
      const anchors = JSON.parse(this.verse.data).children.anchors
      return {
        events: inputs,
        anchors
      }*/
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

    const verseResponse = await getVerse(
      this.script.verse_id,
      'metas, module,share'
    )

    this.verse = verseResponse.data
    console.log(this.verse.data)
    const data = JSON.parse(this.verse.data)
    /*data.children.metas.forEach(meta => {
      this.titles.set(meta.parameters.uuid, meta.parameters.title)
    })*/

    data.children.modules.forEach(module => {
      this.titles.set(module.parameters.uuid, module.parameters.title)
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
      console.error(blockly)
      const response = await putVerseScript(id, {
        script: code,
        workspace: blockly
      })
      this.script = response.data

      end()
    }
  }
}
</script>
