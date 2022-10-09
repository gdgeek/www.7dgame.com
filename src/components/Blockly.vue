<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="逻辑编辑" name="blockly" />
      <el-tab-pane label="代码查看" name="script" />
    </el-tabs>
    <div
      v-show="activeName === 'blockly'"
      id="blocklyDiv"
      style="height: 600px; width: 100%"
    />
    <el-card v-if="activeName === 'script' && script !== ''" class="box-card">
      <div v-highlight>
        <pre>
          <code class="lua">{{ script }}</code>
        </pre>
      </div>
    </el-card>
  </div>
</template>

<script>
import Blockly from 'blockly'
import toolbox from '@/assets/js/blockly/toolbox'
import { AddBlocks } from '@/assets/js/blockly/blocks'
import { putVerseCyber } from '@/api/v1/verse-cyber'
import 'blockly/lua'

// import hljs from 'highlight.js/lib/common'
// import hljsVuePlugin from '@highlightjs/vue-plugin'
export default {
  name: 'Blockly',
  props: {
    cybers: {
      type: Array,
      require: true
    }
  },
  /* components: {
    highlightjs: hljsVuePlugin.component
  },*/
  data() {
    return {
      workspace: null,
      activeName: 'blockly',
      script: ''
    }
  },
  mounted() {
    const self = this
    AddBlocks(this)
    this.workspace = Blockly.inject('blocklyDiv', {
      media: 'resource/blockly/media/',
      toolbox: toolbox,
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      move: {
        scrollbars: {
          horizontal: false,
          vertical: true
        },
        drag: true,
        wheel: false
      },
      zoom: {
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        controls: true,
        wheel: true,
        pinch: true
      }
    })
    if (
      typeof self.cybers[0].data !== 'undefined' &&
      self.cybers[0].data !== null
    ) {
      self.load(self.cybers[0].data)
    }
    console.log(this.workspace)
  },
  methods: {
    load(data) {
      Blockly.serialization.workspaces.load(JSON.parse(data), this.workspace)
    },
    handleClick(tab, event) {
      if (this.activeName === 'script') {
        this.script = Blockly.Lua.workspaceToCode(this.workspace)
      }
      console.log(tab, event)
    },
    save() {
      const json = Blockly.serialization.workspaces.save(this.workspace)
      const script = Blockly.Lua.workspaceToCode(this.workspace)
      putVerseCyber(this.cybers[0].id, { data: JSON.stringify(json), script })
        .then(response => {
          this.$message({
            message: '代码保存成功',
            type: 'success'
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
