<template>
  <div>
    <mr-p-p-upload
      dir="advanced"
      :advanced="true"
      :file-type="fileType"
      @saveResource="savePolygen"
    >
      <div>选择模型（.stl文件），并上传</div>
    </mr-p-p-upload>
  </div>
</template>

<script>
import MrPPUpload from '@/components/MrPP/MrPPUpload/advanced.vue'

import { postPolygen } from '@/api/resources'
export default {
  name: 'PolygenUploadAdvanced',
  components: {
    MrPPUpload
  },
  data: function () {
    return {
      fileType: '.stl'
    }
  },
  methods: {
    async savePolygen(name, file_id, callback) {
      const self = this
      const response = await postPolygen({ name, file_id })
      callback()
      self.$router.push({
        path: '/polygen/view',
        query: { id: response.data.id }
      })
    }
  }
}
</script>
