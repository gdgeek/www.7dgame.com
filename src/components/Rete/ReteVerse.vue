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
  addMeta,
  getMeta,
  addEvent,
  addLinks,
  loadEvent
} from '@/node-editor/verse'
import { putVerse } from '@/api/v1/verse'
import {
  getMetaEventByMetaId,
  putMetaEvent,
  postMetaEvent
} from '@/api/v1/meta-event'
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
      data: null,
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
    async getEvent(id) {
      let event = null
      try {
        const response = await getMetaEventByMetaId(id)

        if (response.data.length == 0) {
          const response = await postMetaEvent({
            meta_id: id,
            slots: JSON.stringify({ input: [], output: [] }),
            links: JSON.stringify({})
          })
          event = response.data
        } else {
          event = response.data[0]
        }
      } catch (e) {
        console.error(e)
      }
      return event
    },
    async postEvent({ input, output }) {
      const self = this
      if (this.target) {
        const response = await putMetaEvent(this.target.id, {
          slots: JSON.stringify({ input, output })
        })
        const data = response.data
        if (self.map.has(data.meta_id)) {
          const item = self.map.get(data.meta_id)
          loadEvent(data.meta_id, JSON.parse(item.slots), {
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
        self.target = await self.getEvent(id)
        self.map.set(id, self.target)
      }

      self.$refs.dialog.open()
    },
    onEvent({ id }) {
      this.doEvent(id)
    },
    async save() {
      const self = this
      const data = await save()
      await putVerse(self.verseId, {
        data
      })
      const list = await eventSave()
      list.forEach(async links => {
        if (self.map.has(links.id)) {
          const event = self.map.get(links.id)
          await putMetaEvent(event.id, { links: JSON.stringify(links) })
        }
        //alert(JSON.stringify(links))
      })
    },
    async create(verse) {
      return await create(verse)
    },
    arrange() {
      arrange()
    },
    async setup(data) {
      this.data = JSON.parse(data)
      const ret = await setup(this.data)
      this.checkMetas(this.data)
      this.setSlots(this.data)

      return ret
    },

    async setSlots(data) {
      const self = this
      for (let i = 0; i < data.children.metas.length; ++i) {
        const item = data.children.metas[i]
        if (item.type.toLowerCase() == 'meta') {
          const event = await self.getEvent(item.parameters.id)
          self.map.set(item.parameters.id, event)

          await addEvent(item.parameters.id, event)

          this.$nextTick(function () {
            arrange()
          })
        }
      }
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
      })
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
