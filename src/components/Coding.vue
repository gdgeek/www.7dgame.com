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
import { putCyber } from '@/api/v1/cyber'
import {
  putCyberScript,
  findCyberScript,
  postCyberScript
} from '@/api/v1/cyberScript'
import 'blockly/lua'

// import hljs from 'highlight.js/lib/common'
// import hljsVuePlugin from '@highlightjs/vue-plugin'
export default {
  name: 'Coding',
  props: {
    cyber: {
      type: Object,
      require: true
    },
    meta: {
      type: Object,
      require: true
    },
    id: {
      type: Number,
      require: true
    },
    index: {
      type: String,
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
    AddBlocks({
      index: self.index,
      resource: self.getResource(this.meta)
    })
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
    if (self.cyber.data) {
      self.load(self.cyber.data)
    }
    console.log(this.workspace) /**/
  },
  methods: {
    getResource(meta) {
      const data = JSON.parse(meta.data)
      const event = JSON.parse(meta.event.data)

      const ret = {
        action: [],
        polygen: [],
        picture: [],
        video: [],
        text: [],
        sound: [],
        entity: [],
        input: event.input,
        output: event.output
      }
      this.addMetaData(data, ret)
      return ret
    },
    addMetaData(data, ret) {
      const self = this
      const action = self.testAction(data)
      if (action) {
        ret.action.push(action)
      }

      const entity = self.testPoint(data, [
        'polygen',
        'entity',
        'video',
        'picture'
      ])

      if (entity) {
        ret.entity.push(entity)
      }

      const polygen = self.testPoint(data, ['polygen'])

      if (polygen) {
        ret.polygen.push(polygen)
      }

      const video = self.testPoint(data, ['video'])

      if (video) {
        ret.video.push(video)
      }

      const picture = self.testPoint(data, ['picture'])

      if (picture) {
        ret.picture.push(picture)
      }
      const sound = self.testPoint(data, ['sound'])

      if (sound) {
        ret.sound.push(sound)
      }

      const text = self.testPoint(data, ['text'])

      if (text) {
        ret.text.push(text)
      }

      if (typeof data.children !== 'undefined') {
        const keys = Object.keys(data.children)
        keys.forEach(key => {
          data.children[key].forEach(item => {
            self.addMetaData(item, ret)
          })
        })
      }
    },
    testAction(data) {
      if (
        typeof data.parameters !== 'undefined' &&
        typeof data.parameters.action !== 'undefined'
      ) {
        return {
          uuid: data.parameters.uuid,
          name: data.parameters.action,
          parameter: data.parameters.parameter
        }
      }
    },

    testPoint(data, typeList) {
      let ret
      typeList.forEach(type => {
        if (data.type.toLowerCase() === type.toLowerCase()) {
          ret = {
            uuid: data.parameters.uuid,
            name: data.parameters.name
          }
        }
      })
      return ret
    },
    load(data) {
      Blockly.serialization.workspaces.load(JSON.parse(data), this.workspace)
    },
    handleClick(tab, event) {
      if (this.activeName === 'script') {
        this.script =
          'local meta = {}\n\n' + Blockly.Lua.workspaceToCode(this.workspace)
      }
      console.log(tab, event)
    },
    async save() {
      const data = Blockly.serialization.workspaces.save(this.workspace)

      try {
        const response = await putCyber(this.cyber.id, {
          data: JSON.stringify(data)
        })
        if (response.data !== null) {
          const find = await findCyberScript(response.data.id, 'lua')
          const script =
            'local meta = {}\n\n' + Blockly.Lua.workspaceToCode(this.workspace)

          if (find.data !== null) {
            await putCyberScript(find.data.id, { script })
          } else {
            await postCyberScript({
              cyber_id: response.data.id,
              language: 'lua',
              script
            })
          }
        }

        this.$message({
          message: '代码保存成功',
          type: 'success'
        })

        // const scriptResponse = getCyberScript()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    }
  }
}
</script>
