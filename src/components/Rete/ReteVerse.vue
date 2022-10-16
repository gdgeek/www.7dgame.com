<template>
  <div v-show="visible" id="rete" ref="rete" />
</template>

<script>
import {
  initVerse,
  setup,
  create,
  arrange,
  save,
  addMeta
} from '@/node-editor/verse'

export default {
  props: {
    verseId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      visible: true
    }
  },

  mounted() {
    const self = this
    initVerse({ container: self.$refs.rete, verseId: self.verseId, root: self })
  },
  methods: {
    save() {
      save()
    },
    create(verse) {
      return create(verse)
    },
    arrange() {
      arrange()
    },
    setup(data) {
      return setup(JSON.parse(data))
    },
    addMeta(meta) {
      return addMeta({ name: meta.name, id: meta.id })
    }
  }
}
</script>

<style slang="scss" scoped>
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
