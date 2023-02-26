<template>
  <div>
    <knight-dialog
      @selected="knightSelect"
      @cancel="clearKnight()"
      ref="knightDialog"
    />

    <space-dialog
      @selected="spaceSelect"
      @cancel="clearSpace()"
      ref="spaceDialog"
    />
    <event-dialog
      :target="event.target"
      @postEvent="postEvent"
      ref="dialog"
    ></event-dialog>
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="verse" slot="header" class="clearfix">
            【宇宙】{{ verse.name }}

            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()">
                <font-awesome-icon icon="project-diagram" />
                整理
              </el-button>
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
          <div class="rete" ref="rete" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import editor from '@/node-editor/verse'
import { putVerse } from '@/api/v1/verse'
import {
  getMetaEventByMetaId,
  putMetaEvent,
  postMetaEvent
} from '@/api/v1/meta-event'
import { mapMutations } from 'vuex'
import { getVerse } from '@/api/v1/verse'

var randomWords = require('random-words')
import { v4 as uuidv4 } from 'uuid'
import SpaceDialog from '@/components/MrPP/SpaceDialog.vue'
import KnightDialog from '@/components/MrPP/KnightDialog.vue'
import { AbilityEditable } from '@/ability/ability'
import {
  getVerseEventByVerseId,
  putVerseEvent,
  postVerseEvent
} from '@/api/v1/verse-event'
import EventDialog from '@/components/Rete/EventDialog.vue'

export default {
  components: {
    EventDialog,

    SpaceDialog,
    KnightDialog
  },

  data() {
    return {
      loading: false,
      knight: { callback: null },
      space: { callback: null },
      id: parseInt(this.$route.query.id),
      verse: null,
      event: {
        target: null,
        map: new Map()
      }
    }
  },

  async mounted() {
    editor.initVerse({
      container: this.$refs.rete,
      verse_id: this.id,
      root: this
    })
    const response = await getVerse(this.id, 'metas,metaKnights,share')

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
    data.children.metas = this.supplyMetas(
      data.children.metas,
      this.verse.metas,
      this.verse.metaKnights
    )

    await editor.setup(data)
    await this.setSlots(data)
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
    supplyMetas(children, metas, metaKnights) {
      const mRet = children.filter(function (item) {
        if (
          metas.find(m => {
            return item.type === 'Meta' && m.id === item.parameters.id
          })
        ) {
          return true
        }
        return false
      })
      const kRet = children.filter(function (item) {
        if (
          metaKnights.find(m => {
            return item.type === 'Knight' && m.id === item.parameters.id
          })
        ) {
          return true
        }
        return false
      })
      const ret = [...mRet, ...kRet]
      const mSupply = metas.filter(function (item) {
        if (
          children.find(m => {
            return m.type === 'Meta' && m.parameters.id == item.id
          })
        ) {
          return false
        }
        return true
      })

      mSupply.forEach(item => {
        ret.push({
          type: 'Meta',
          parameters: {
            uuid: uuidv4(),
            id: item.id,
            title: randomWords(),
            transform: {
              position: { x: 0, y: 0, z: 0 },
              rotate: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            }
          }
        })
      })

      const kSupply = metaKnights.filter(function (item) {
        if (
          children.find(m => {
            return m.type === 'Knight' && m.parameters.id == item.id
          })
        ) {
          return false
        }
        return true
      })

      kSupply.forEach(item => {
        ret.push({
          type: 'Knight',
          parameters: {
            uuid: uuidv4(),
            id: item.id,
            title: randomWords(),
            transform: {
              position: { x: 0, y: 0, z: 0 },
              rotate: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            }
          }
        })
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
    openKnight({ value, callback }) {
      if (this.saveable) {
        this.knight.callback = callback
        if (this.knight.callback) {
          this.$refs.knightDialog.open(value, this.id)
        }
      }
    },

    clearKnight() {
      this.knight.callback = null
    },
    knightSelect(data) {
      if (this.knight.callback !== null) {
        this.knight.callback(data)
      }
    },
    _setVerseName(name) {
      this.verse.name = name
    },

    async _doEvent(id) {
      if (this.saveable) {
        if (this.event.map.has(id)) {
          this.event.target = this.event.map.get(id)
        } else {
          this.event.target = await this.getMetaEvent(id)
          this.event.map.set(id, this.event.target)
        }
        this.$refs.dialog.open()
      }
    },

    ///////////event
    async getVerseEvent(id) {
      try {
        const response = await getVerseEventByVerseId(id)
        if (response.data.length !== 0) {
          return response.data[0]
        } else {
          if (this.saveable) {
            const post = await postVerseEvent({
              verse_id: id,
              data: JSON.stringify({})
            })
            return post.data
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getMetaEvent(meta_id) {
      try {
        const response = await getMetaEventByMetaId(meta_id)

        if (response.data.length !== 0) {
          return response.data[0]
        } else {
          if (this.saveable) {
            const post = await postMetaEvent({
              meta_id,
              data: JSON.stringify({ input: [], output: [] })
            })
            return post.data
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    async postEvent({ input, output }) {
      if (this.saveable && this.event.target) {
        const response = await putMetaEvent(this.event.target.id, {
          data: JSON.stringify({ input, output })
        })
        const data = response.data
        if (this.event.map.has(data.meta_id)) {
          const item = this.event.map.get(data.meta_id)
          editor.loadEvent(data.meta_id, JSON.parse(item.data), {
            input,
            output
          })
          this.event.map.set(data.meta_id, data)
        }
      }
      this.$refs.dialog.close()
    },

    async save() {
      const self = this
      const verse_id = this.id
      return new Promise(async function (resolve, reject) {
        if (self.editable) {
          const list = await editor.saveEvent()

          const linked = await self.getVerseEvent(verse_id)
          await putVerseEvent(linked.id, { data: JSON.stringify(list) })
          await editor.removeLinked()
          const data = await editor.save()
          await putVerse(verse_id, {
            data
          })
          await self.addLinked()
        }
        resolve()
      })
    },
    /*async create(data) {
      return await editor.create(data)
    },*/
    async arrange() {
      await editor.removeLinked()
      editor.arrange()
      await this.addLinked()
    },
    async setup(json) {
      const data = JSON.parse(json)
      await editor.setup(data)
      this.checkMetas(data)
      this.setSlots(data)
      return data
    },
    async addLinked() {
      const linked = await this.getVerseEvent(this.id)
      if (linked && linked.data) {
        const parse = JSON.parse(linked.data)
        if (parse instanceof Array) {
          parse.forEach(async item => {
            await editor.addLinked(item)
          })
        }
      }
    },
    async setSlots(data) {
      for (let i = 0; i < data.children.metas.length; ++i) {
        const item = data.children.metas[i]
        if (item.type.toLowerCase() == 'meta') {
          const event = await this.getMetaEvent(item.parameters.id)
          if (event) {
            this.event.map.set(item.parameters.id, event)

            await editor.addEvent(item.parameters.uuid, event)

            this.$nextTick(function () {
              editor.arrange()
            })
          }
        }
      }
      await this.addLinked()
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
