<template>
  <div>
    <resource-dialog
      @selected="knightSelect"
      @cancel="openKnight(null)"
      @getDatas="getKnights"
      message="选择相应骑士"
      ref="knightDialog"
    />
    <resource-dialog
      @selected="spaceSelect"
      @cancel="openSpace(null)"
      @getDatas="getSpaces"
      message="选择相应空间"
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
import editor from '@/node-editor/verse'
import { putVerse } from '@/api/v1/verse'
import {
  getMetaEventByMetaId,
  putMetaEvent,
  postMetaEvent
} from '@/api/v1/meta-event'

import { getVerse } from '@/api/v1/verse'
import { getKnights } from '@/api/v1/knight'
import { getSpaces } from '@/api/v1/space'
import ResourceDialog from '@/components/MrPP/MrPPResourceDialog.vue'
import { AbilityWorks, AbilityShare } from '@/ability/ability'
import {
  getVerseEventByVerseId,
  putVerseEvent,
  postVerseEvent
} from '@/api/v1/verse-event'
import EventDialog from './EventDialog.vue'

export default {
  components: {
    EventDialog,
    ResourceDialog
  },

  data() {
    return {
      loading: false,
      knight: { callback: null },
      space: { callback: null },
      id: parseInt(this.$route.query.id),
      verse: null,
      visible: true,
      event: {
        target: null,
        map: new Map()
      }
    }
  },

  async mounted() {
    editor.initVerse({
      container: this.$refs.rete,
      verseId: this.id,
      root: this
    })
    const response = await getVerse(this.id)

    this.verse = response.data

    let data = null

    if (this.verse.data !== null) {
      data = JSON.parse(this.verse.data)
      await editor.setup(data)
      await this.setSlots(data)
    } else {
      data = editor.create({
        name: this.verse.name,
        id: this.verse.id
      })
    }
    if (!this.canSave) {
      editor.ban()
    }
  },
  computed: {
    canSave() {
      if (this.verse === null) {
        return false
      }
      return (
        this.$can('update', new AbilityWorks(this.verse.author_id)) ||
        this.$can('share', new AbilityShare(this.verse.share))
      )
    }
  },
  methods: {
    getSpaces(data, callback) {
      getSpaces(data.sorted, data.searched, data.current).then(response =>
        callback(response)
      )
    },
    openSpace(callback) {
      if (this.canSave) {
        this.space.callback = callback
        if (this.space.callback) {
          this.$refs.spaceDialog.open()
        }
      }
    },
    spaceSelect(data) {
      if (this.space.callback !== null) {
        this.space.callback(data)
      }
    },

    getKnights(data, callback) {
      getKnights(data.sorted, data.searched, data.current).then(response => {
        console.error(response)
        callback(response)
      })
    },
    openKnight(callback) {
      if (this.canSave) {
        this.knight.callback = callback
        if (this.knight.callback) {
          this.$refs.knightDialog.open()
        }
      }
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
      if (this.canSave) {
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
          if (this.canSave) {
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
          if (this.canSave) {
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
      if (this.canSave && this.event.target) {
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
        if (self.canSave) {
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
    async create(data) {
      return await editor.create(data)
    },
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
    if (this.canSave) {
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
