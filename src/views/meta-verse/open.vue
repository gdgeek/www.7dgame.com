<template>
  <div class="verse-index">
    <mr-p-p-verse-page @loaded="loaded" :has-create="false" />
  </div>
</template>

<script>
import MrPPVersePage from '@/components/MrPP/MrPPVersePage.vue'

import { getVersesOpens } from '@/api/v1/verse-open'
export default {
  name: 'VerseOpen',
  components: {
    MrPPVersePage
  },
  methods: {
    async loaded(data, result) {
      try {
        const response = await getVersesOpens(
          data.sorted,
          data.searched,
          data.current
        )

        const pagination = {
          current: parseInt(response.headers['x-pagination-current-page']),
          count: parseInt(response.headers['x-pagination-page-count']),
          size: parseInt(response.headers['x-pagination-per-page']),
          total: parseInt(response.headers['x-pagination-total-count'])
        }
        const items = response.data

        result({ data: items, pagination: pagination })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
