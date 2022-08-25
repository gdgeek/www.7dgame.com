<template>
  <div>
    <div class="document-index">
      <el-card class="box-card-component" style="margin: 18px 18px 0">
        <div slot="header" class="box-card-header">
          <h3>{{ title }}:</h3>
          {{ declared }}
        </div>
        <div style="position: relative">
          <div class="progress-item">
            <span>解析文件</span>
            <el-progress :percentage="md5.percentage" />
          </div>
          <div class="progress-item">
            <span>上传文件</span>
            <el-progress :percentage="upload.percentage" />
          </div>
          <div class="progress-item">
            <span>保存信息</span>
            <el-progress :percentage="save.percentage" />
          </div>
          <el-divider />
          <el-button
            type="primary"
            :disabled="isdisabled"
            @click="selectFile()"
          >
            <slot>11</slot>
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { postFile } from '@/api/files'
import { mapState } from 'vuex'

export default {
  name: 'MrPPUpload',
  props: {
    fileType: {
      type: String,
      default: '*'
    },
    advanced: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      store: state => state.config.store
    })
  },
  data: function() {
    return {
      title: '选择文件',
      declared: '请选择对应格式的文件进行上传操作',
      md5: { percentage: 0, status: '' },
      upload: { percentage: 0, status: '' },
      save: { percentage: 0, status: '' },
      isdisabled: false
    }
  },

  methods: {
    step(type) {
      const self = this
      switch (type) {
        case 'ready':
          self.title = '选择文件'
          self.declared = '请选择对应格式的文件进行上传操作'
          break
        case 'md5':
          self.title = '文件预处理'
          self.declared = '通过计算得到文件的 md5 编码'
          break
        case 'upload':
          self.title = '文件上传中'
          self.declared = '文件正在发送至服务器'
          break
        case 'succeed':
          self.title = '文件上传成功'
          self.declared = '文件已经被发送到服务器'
          break
        case 'failed':
          self.title = '文件上传失败'
          self.declared = '上传文件过程中遇到错误'
          break
      }
    },
    progress(p) {
      const ret = {}
      p = p > 1 ? 1 : p
      ret.percentage = Math.round(p * 100)
      if (p === 1) {
        ret.status = 'success'
      } else {
        ret.status = ''
      }
      return ret
    },

    saveFile(md5, extension, file, handler) {
      const self = this
      const data = {
        size: file.size,
        type: file.type,
        filename: file.name,
        md5,
        key: md5 + extension,
        url: self.store.fileUrl(md5, extension, handler)
      }
      self.step('succeed')

      self.upload = self.progress(1)
      postFile(data)
        .then(response => {
          self.save = self.progress(0.5)
          console.error(response)
          self.$emit('saveResource', data.filename, response.data.id, () => {
            self.save = self.progress(1)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    async selectFile() {
      const self = this
      const store = self.store
      const file = await store.fileOpen(self.fileType)
      self.step('md5')
      self.isdisabled = !self.isdisabled
      const md5 = await store.fileMD5(file, function(p) {
        self.md5 = self.progress(p)
      })
      const handler = await store.fileHandler()

      const ret = await store.fileHas(md5, file.extension, handler)

      if (ret !== null) {
        self.saveFile(ret.md5, ret.extension, file, handler)
      } else {
        const r = await store.fileUpload(
          md5,
          file.extension,
          file,
          function(p) {
            self.upload = self.progress(p)
          },
          handler
        )
        self.saveFile(md5, file.extension, file, handler)
      }
    }
  }
}
</script>

<style scoped></style>
