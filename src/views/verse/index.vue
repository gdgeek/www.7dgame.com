<template>
  <div class="verse-index">
    <mr-p-p-verse-page @loaded="loaded" :created="true" />
  </div>
</template>

<script>
import MrPPVersePage from '@/components/MrPP/MrPPVersePage.vue'

import { getVerses } from '@/api/v1/verse'
export default {
  name: 'VerseIndex',
  components: {
    MrPPVersePage
  },

  methods: {
    loaded(data, result) {
      getVerses(data.sorted, data.searched, data.current)
        .then(response => {
          const pagination = {
            current: parseInt(response.headers['x-pagination-current-page']),
            count: parseInt(response.headers['x-pagination-page-count']),
            size: parseInt(response.headers['x-pagination-per-page']),
            total: parseInt(response.headers['x-pagination-total-count'])
          }
          console.error(response.data)
          result({ data: response.data, pagination: pagination })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
