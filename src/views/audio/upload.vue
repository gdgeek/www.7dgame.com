<template>
  <div>
    <mr-p-p-upload dir="audio" :file-type="fileType" @saveResource="saveVideo">
      <div>选择音频，并上传</div>
    </mr-p-p-upload>
  </div>
</template>

<script>
import MrPPUpload from '@/components/MrPP/MrPPUpload'

import { postVideo } from '@/api/resources'
export default {
  name: 'VideoUpload',
  components: {
    MrPPUpload
  },
  data: function () {
    return {
      fileType: 'video/mp4, video/ogg'
    }
  },
  methods: {
    saveVideo(name, file_id, callback) {
      const self = this
      postVideo({ name, file_id })
        .then(response => {
          console.log(response.data)

          self.$router.push({
            path: '/audio/view',
            query: { id: response.data.id }
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(callback)
    }
  }
}
</script>
