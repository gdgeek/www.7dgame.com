<template>
  <div class="verse-index">
    <mr-p-p-verse-page @loaded="loaded" :has-create="false" />
  </div>
</template>

<script>
import MrPPVersePage from '@/components/MrPP/MrPPVersePage.vue'

import { getVersesWithShare } from '@/api/v1/verse'
// import { getVersesOpen } from '@/api/v1/verse-open'
export default {
  name: 'VerseShare',
  components: {
    MrPPVersePage
  },
  methods: {
    loaded(data, result) {
      getVersesWithShare(data.sorted, data.searched, data.current)
        .then(response => {
          const pagination = {
            current: parseInt(response.headers['x-pagination-current-page']),
            count: parseInt(response.headers['x-pagination-page-count']),
            size: parseInt(response.headers['x-pagination-per-page']),
            total: parseInt(response.headers['x-pagination-total-count'])
          }
          const items = response.data

          result({ data: items, pagination: pagination })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-content-label {
  width: 60px;
}
.icon {
  width: 10px;
}
</style>
