<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    :close-on-click-modal="false"
  >
    <el-card class="box-card" style="text-align: center">
      <qrcode-vue :value="value" :size="size" level="H" />
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import environment from '@/environment.js'
import 'element-ui/lib/theme-chalk/display.css'

import { getVerse } from '@/api/v1/verse'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'MrPPQRCodeVerse',
  components: {
    QrcodeVue
  },
  data() {
    return {
      dialogVisible: false,
      value: 'https://mrpp.com',
      size: 400,
      verse: null
    }
  },
  'document.body.clientwidth': {
    message: function () {}
  },
  computed: {
    dialogTitle() {
      if (this.verse) {
        return '请用设备扫描二维码，进入【' + this.verse.name + '】。'
      }
      return '请用设备扫描二维码，进入场景。'
    }
  },
  mounted() {
    const self = this
    self.$nextTick(function () {
      this.$on('open', self.open)
    })
    self.onresize()
    window.addEventListener('resize', self.onresize, false)
  },
  destroyed() {
    window.removeEventListener('resize', self.onresize)
  },
  methods: {
    onresize() {
      this.size = Math.min(500, window.innerWidth * 0.8 - 80)
    },
    async open(id) {
      const data = { projectId: id, veri: 'MrPP.com' }
      this.value = JSON.stringify(data)
      this.dialogVisible = true
      const r = await getVerse(id)
      this.verse = r.data
    }
  }
}
</script>
