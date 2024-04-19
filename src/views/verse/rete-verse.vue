<template>
  <div>
    <knight-data-dialog ref="knightData" @submit="knightDataSubmit" />
    <knight-setup-dialog
      @selected="knightSelect"
      @cancel="clearKnight()"
      ref="knightSetup"
    />
    <space-dialog
      @selected="spaceSelect"
      @cancel="clearSpace()"
      ref="spaceDialog"
    />
    <event-dialog
      :node="event.node"
      :uuid="event.uuid"
      @postEvent="postEvent"
      ref="dialog"
    ></event-dialog>
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="verse" slot="header" class="clearfix">
            【宇宙】{{ verse.name }}

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
              <el-button v-else type="primary" size="mini" @click="arrange()">
                <font-awesome-icon icon="project-diagram" />
                整理
              </el-button>
            </el-button-group>
          </div>
          <div class="rete" ref="rete" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import editor from '@/node-editor/verse'
import manager from '@/assets/js/event-manager'
import { putVerse } from '@/api/v1/verse'

import { mapMutations } from 'vuex'
import { getVerse } from '@/api/v1/verse'
var randomWords = require('random-words')
import { v4 as uuidv4 } from 'uuid'
import SpaceDialog from '@/components/MrPP/SpaceDialog.vue'
import KnightDataDialog from '@/components/MrPP/KnightDataDialog.vue'
import KnightSetupDialog from '@/components/MrPP/KnightSetupDialog.vue'

import { AbilityEditable } from '@/ability/ability'

import EventDialog from '@/components/Rete/EventDialog.vue'
import { getMeta } from '@/api/v1/meta'
async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, time)
  })
}
export default {
  components: {
    EventDialog,
    KnightSetupDialog,
    SpaceDialog,
    KnightDataDialog
  },

  data() {
    return {
      banKnight: [],
      loading: false,
      knight: { callback: null },
      space: { callback: null },
      id: parseInt(this.$route.query.id),
      verse: null,
      event: {
        node: null,
        meta_id: -1,
        uuid: null
      }
    }
  },

  async mounted() {
    editor.initVerse({
      container: this.$refs.rete,
      verse_id: this.id,
      root: this
    })

    const response = await getVerse(this.id, 'metas, metaKnights,share')

    this.verse = response.data
    if (this.verse.data == null) {
      this.verse.data = JSON.stringify({
        type: 'Verse',
        parameters: {
          uuid: uuidv4(),
          space: {
            id: -1,
            occlusion: false
          }
        },
        children: {
          metas: []
        }
      })
    }

    const data = JSON.parse(this.verse.data)
    console.error(data)
    if (!data.children.metas) {
      data.children.metas = []
    }
    data.children.metas = this.supplyMetas(
      data.children.metas,
      this.verse.metas,
      item => {
        return {
          type: 'Meta',
          parameters: {
            uuid: item.uuid,
            id: item.id,
            title: randomWords(),
            transform: {
              position: { x: 0, y: 0, z: 0 },
              rotate: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            }
          }
        }
      }
      // this.verse.metaKnights
    )
    if (!data.children.metaKnights) {
      data.children.metaKnights = []
    }
    data.children.metaKnights = this.supplyMetas(
      data.children.metaKnights,
      this.verse.metaKnights,
      item => {
        return {
          type: 'MetaKnight',
          parameters: {
            uuid: item.uuid,
            id: item.id,
            knight: item.knight_id,
            title: randomWords(),
            transform: {
              position: { x: 0, y: 0, z: 0 },
              rotate: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            }
          }
        }
      }
    )
    //初始化数据
    await editor.setup(data)
    await this.slots(data)
    await this.arrange()

    if (!this.saveable) {
      editor.ban()
    }
  },

  created() {
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
          path: '/verse/view?id=' + this.id,
          meta: { title: '【宇宙】' }
        },
        {
          path: '.',
          meta: { title: '宇宙编辑' }
        }
      ]
    })
  },
  destroyed() {
    this.setBreadcrumbs({
      list: []
    })
  },
  computed: {
    saveable() {
      if (this.verse === null) {
        return false
      }
      return this.$can('editable', new AbilityEditable(this.verse.editable))
    }
  },
  methods: {
    ...mapMutations('breadcrumb', ['setBreadcrumbs']),
    knightDataSubmit(data) {
      console.error(data)
    },
    knightForm({ id, schema }) {
      console.error(id)

      this.$refs.knightData.open(id, JSON.parse(schema))
    },
    createMetaKnight() {
      this.$refs.knightSetup.open()
    },
    supplyMetas(children, nodes, creater) {
      const ret = children.filter(function (item) {
        if (item) {
          if (
            nodes.find(m => {
              return m.id === item.parameters.id
            })
          ) {
            return true
          }
        }

        return false
      })

      const supply = nodes.filter(function (item) {
        if (
          item &&
          children.find(m => {
            return m && m.parameters.id == item.id
          })
        ) {
          return false
        }
        return true
      })
      supply.forEach(item => {
        ret.push(creater(item))
      })

      return ret
    },
    clearSpace() {
      this.space.callback = null
    },
    openSpace({ value, callback }) {
      if (this.saveable) {
        this.space.callback = callback
        if (this.space.callback) {
          this.$refs.spaceDialog.open(value, this.id)
        }
      }
    },
    spaceSelect(data) {
      if (this.space.callback !== null) {
        this.space.callback(data)
      }
    },
    setupKnight(data) {
      if (this.saveable) {
        this.$refs.knightSetup.open(data)
      }
    },

    async _updateKnightMetaEvent(data, knight_id) {
      const response = await getMeta(knight_id)
      if (response.data.events) {
        const events = JSON.parse(response.data.events)

        if (events) {
          events.inputs.forEach(item => {
            item.uuid = uuidv4()
          })
          events.outputs.forEach(item => {
            item.uuid = uuidv4()
          })
          await editor.loadEvent(data.uuid, data.event_node, {
            inputs: events.inputs,
            outputs: events.outputs
          })

          data.event_node = await manager.rebuild(
            data.event_node,
            events.inputs,
            events.outputs
          )
        }
      }
    },
    clearKnight() {
      this.knight.callback = null
    },
    async knightSelect(data) {
      const node = await editor.addMetaKnight({
        knight: data.id
      })
    },
    _setVerseName(name) {
      this.verse.name = name
    },
    _addMeta(meta) {
      this.verse.metas.push(meta)
    },
    _deleteMeta(meta_id) {
      const index = this.verse.metas.findIndex(item => {
        if (item.id === meta_id) {
          return true
        }
        return false
      })
      if (index !== -1) {
        this.verse.metas.splice(index, 1)
      }
    },
    async _doMetaEvent(id) {
      if (this.saveable) {
        const meta = this.verse.metas.find(item => {
          if (item.id === id) {
            return true
          }
          return false
        })

        if (meta) {
          this.event.node = meta.event_node
          this.event.uuid = meta.uuid
          this.$refs.dialog.open()
        }
      }
    },

    async postEvent({ uuid, node, inputs, outputs }) {
      if (this.saveable) {
        await editor.loadEvent(uuid, node, {
          inputs,
          outputs
        })
        this.node = await manager.rebuild(node, inputs, outputs)
      }
      this.$refs.dialog.close()
    },

    async save() {
      const self = this
      const verse_id = this.id

      if (self.saveable) {
        const list = await editor.saveEvent()

        const response = await getVerse(this.id, 'metas, metaKnights,share')

        this.verse = response.data
        await manager.saveLinked(this.verse, list)

        await editor.removeLinked()
        const data = await editor.save()
        await putVerse(verse_id, {
          data
        })
        await this.arrange()
      }
    },

    async arrange() {
      await editor.removeLinked()
      await editor.arrange()
      await sleep(300)
      const data = await manager.loadLinked(this.verse)

      for (let i = 0; i < data.length; ++i) {
        const item = data[i]
        await editor.addLinked(item)
      }
    },

    async slots(data) {
      for (let i = 0; i < data.children.metas.length; ++i) {
        const node = data.children.metas[i]

        const meta = this.verse.metas.find(item => {
          if (item.id === node.parameters.id) {
            return true
          }
          return false
        })

        if (meta) {
          await editor.addEventNode(meta.event_node, node.parameters.uuid)
        }
      }

      for (let i = 0; i < data.children.metaKnights.length; ++i) {
        const node = data.children.metaKnights[i]

        const metaKnight = this.verse.metaKnights.find(item => {
          if (item.id === node.parameters.id) {
            return true
          }
          return false
        })

        if (metaKnight) {
          await editor.addEventNode(metaKnight.event_node, node.parameters.uuid)
        }
      }
    }
  },

  beforeDestroy() {
    if (this.saveable) {
      this.save()
    }
  }
}
</script>

<style slang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/*
#rete {
  width: 100%;
  height: 1000px;
}
*/

.rete {
  max-width: 100%;
  min-height: calc(73vh);
  max-height: calc(73vh);

  border-style: solid;
  border-width: 1px;
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
