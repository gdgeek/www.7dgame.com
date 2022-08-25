<template>
  <div class="background-screen-border">
    <giant />
    <cards />
    <businessList />
    <contact />
    <Partner />
  </div>
</template>

<script>
import Giant from '@/components/Web/Giant'
import Cards from '@/components/Web/Cards'
import BusinessList from '@/components/Web/BusinessList'
import Contact from '@/components/Web/Contact'
import Partner from '@/components/Web/Partner'
import Cooperation from '@/components/Web/Cooperation'

import Carousel from '@/components/Web/Carousel'

export default {
  name: 'WebIndex',
  components: {
    Giant,
    Cards,
    BusinessList,
    Contact,
    Partner,
    Cooperation,

    Carousel
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
</style>
