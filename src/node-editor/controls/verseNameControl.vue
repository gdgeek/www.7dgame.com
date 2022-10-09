<template>
  <el-form :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" label="名称">
      <el-tag size="small" @click="changeVerseName()">{{ value.name }}</el-tag>
    </el-form-item>
  </el-form>
</template>

<script>
import { putVerse } from '@/api/v1/verse'
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],
  data() {
    return {
      value: {
        name: '名称',
        id: -1
      }
    }
  },
  computed: {
    word() {
      return this.root.$store.state.settings.word
    },
    verseName: {
      get() {
        return this.root.$store.state.verse.data.name
      },
      set(value) {
        this.root.$store.commit('verse/setVerseName', value)
        this.refresh()
      }
    }
  },
  mounted() {
    this.value.name = this.root.$store.state.verse.data.name
    this.value.id = this.root.$store.state.verse.data.id
    this.refresh()
  },

  methods: {
    changeVerseName() {
      const id = this.root.$store.state.verse.data.id
      const self = this
      this.$prompt('请输入新的名称', '修改' + this.word.project + '名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValue: self.value.name
      })
        .then(({ value }) => {
          putVerse(id, { name: value }).then(() => {
            self.value.name = value
            this.root.$store.commit('verse/setVerseName', value)
            this.$message({
              type: 'success',
              message: '新的名称是: ' + value
            })
            this.refresh()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    refresh() {
      if (this.data) {
        this.putData(this.data.key, this.value)
      }
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>
