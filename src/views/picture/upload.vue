<template>
  <div>
    <mr-p-p-upload :file-type="fileType" @saveResource="savePicture">
      <div>选择图片并上传</div>
    </mr-p-p-upload>
  </div>
</template>

<script>
import MrPPUpload from '@/components/MrPP/MrPPUpload'

import { postPicture } from '@/api/resources'
export default {
  name: 'PictureUpload',
  components: {
    MrPPUpload
  },
  data: function () {
    return {
      fileType: 'image/gif, image/jpeg, image/png'
    }
  },
  methods: {
    savePicture(name, file_id, callback) {
      const self = this

      postPicture({ name, file_id })
        .then(response => {
          self.$router.push({
            path: '/picture/view',
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
