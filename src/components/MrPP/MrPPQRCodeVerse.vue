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
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'MrPPQRCodeVerse',
  components: {
    QrcodeVue
  },
  data() {
    return {
      dialogTitle: '请用设备扫描二维码，进入场景。',
      dialogVisible: false,
      value: 'https://mrpp.com',
      size: 400
    }
  },
  'document.body.clientwidth': {
    message: function () {}
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
    open(id) {
      const self = this
      const data = environment.local
        ? { projectId: id, api: environment.api, veri: 'MrPP.com' }
        : { projectId: id, veri: 'MrPP.com' }
      self.value = JSON.stringify(data)
      self.dialogVisible = true
    }
  }
}
</script>
