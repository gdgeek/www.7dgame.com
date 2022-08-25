<template>
  <div>
    <div v-show="visible" id="rete" ref="rete" />
  </div>
</template>

<script>
import { initMeta, save, setup, create, arrange } from '@/node-editor/meta'

export default {
  data() {
    return {
      visible: true
    }
  },

  mounted() {
    const self = this
    initMeta({
      container: self.$refs.rete,
      root: self
    })
  },
  methods: {
    save() {
      save()
    },
    arrange() {
      arrange()
    },
    create(meta) {
     
      return create(meta)
    },
    setup(data) {
      return setup(JSON.parse(data))
    }

  }
}
</script>

<style lang="scss" scoped>
#rete {
  width: 100%;
  height: 1000px;
}

.node .control input, .node .input-control input {
  width: 140px;
}

select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>
