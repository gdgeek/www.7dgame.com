<template>
  <div>
    <event-dialog
      :target="target"
      @postEvent="postEvent"
      ref="dialog"
    ></event-dialog>
    <div v-show="visible" id="rete" ref="rete" />
  </div>
</template>

<script>
import {
  initVerse,
  setup,
  create,
  arrange,
  save,
  eventSave,
  addEvent,
  addLinked,
  removeLinked,
  loadEvent
} from '@/node-editor/verse'
import { putVerse } from '@/api/v1/verse'
import {
  getMetaEventByMetaId,
  putMetaEvent,
  postMetaEvent
} from '@/api/v1/meta-event'

getVerseEventByVerseId

import {
  getVerseEventByVerseId,
  putVerseEvent,
  postVerseEvent
} from '@/api/v1/verse-event'
import EventDialog from './EventDialog.vue'
export default {
  components: {
    EventDialog
  },
  props: {
    verseId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      visible: true,
      target: null,
      // data: null,
      linked: null,
      map: new Map()
    }
  },

  mounted() {
    const self = this
    this.$nextTick(function () {
      this.$on('onEvent', self.onEvent)
    })
    initVerse({ container: self.$refs.rete, verseId: self.verseId, root: self })
  },
  methods: {
    //getVerseEvent
    async getVerseEvent(verseId) {
      let event = null
      try {
        const response = await getVerseEventByVerseId(verseId)

        if (response.data.length == 0) {
          const response = await postVerseEvent({
            verse_id: verseId,
            data: JSON.stringify({})
          })
          event = response.data
        } else {
          event = response.data[0]
        } /**/
      } catch (e) {
        console.error(e)
      }
      return event
    },
    async getMetaEvent(metaId) {
      let event = null
      try {
        const response = await getMetaEventByMetaId(metaId)
        // alert()
        if (response.data.length == 0) {
          const response = await postMetaEvent({
            meta_id: metaId,
            data: JSON.stringify({ input: [], output: [] })
          })
          event = response.data
        } else {
          event = response.data[0]
        }
      } catch (e) {
        console.error(e)
      }
      //alert(JSON.stringify(event))
      return event
    },
    async postEvent({ input, output }) {
      const self = this
      if (this.target) {
        const response = await putMetaEvent(this.target.id, {
          data: JSON.stringify({ input, output })
        })
        const data = response.data
        if (self.map.has(data.meta_id)) {
          const item = self.map.get(data.meta_id)

          loadEvent(data.meta_id, JSON.parse(item.data), {
            input,
            output
          })
          self.map.set(data.meta_id, data)
        }
      }

      self.$refs.dialog.close()
    },

    async doEvent(id) {
      const self = this
      if (self.map.has(id)) {
        self.target = self.map.get(id)
      } else {
        self.target = await self.getMetaEvent(id)
        self.map.set(id, self.target)
      }

      self.$refs.dialog.open()
    },
    onEvent({ id }) {
      this.doEvent(id)
    },
    async save() {
      const self = this

      const list = await eventSave()
      if (!self.linked) {
        self.linked = await self.getVerseEvent(self.verseId)
      }
      await putVerseEvent(self.linked.id, { data: JSON.stringify(list) })

      await removeLinked()
      //unlink
      const data = await save()
      await putVerse(self.verseId, {
        data
      })

      await self.addLinked()
      //link
    },
    async create(verse) {
      return await create(verse)
    },
    async arrange() {
      await removeLinked()
      arrange()
      await this.addLinked()
    },
    async setup(json) {
      const data = JSON.parse(json)
      const ret = await setup(data)
      this.checkMetas(data)
      this.setSlots(data)

      return ret
    },
    async addLinked() {
      const self = this
      self.linked = await self.getVerseEvent(self.verseId)
      const linked = JSON.parse(self.linked.data)

      linked.forEach(async item => {
        await addLinked(item)
      })
    },
    async setSlots(data) {
      const self = this
      for (let i = 0; i < data.children.metas.length; ++i) {
        const item = data.children.metas[i]
        if (item.type.toLowerCase() == 'meta') {
          const event = await self.getMetaEvent(item.parameters.id)
          self.map.set(item.parameters.id, event)

          await addEvent(item.parameters.uuid, event)

          this.$nextTick(function () {
            arrange()
          })
        }
      }
      await self.addLinked()
      /* self.linked = await self.getVerseEvent(self.verseId)
      const linked = JSON.parse(self.linked.data)

      linked.forEach(async item => {
        await addLinked(item)
      })
*/
      /*
      self.map.forEach(async (value, key) => {
        if (value.links != '') {
          const links = JSON.parse(value.links)
          if (
            typeof links.type != 'undefined' &&
            links.type.toLowerCase() === 'meta'
          ) {
            await addLinks(links)
          }
        }
      })*/
    },
    checkMetas(data) {
      data.children.metas.forEach(async item => {
        //alert(JSON.stringify(item.type))
      })
      //check
    }
    /* addMeta(meta) {
      return addMeta({ name: meta.name, id: meta.id })
    }*/
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
