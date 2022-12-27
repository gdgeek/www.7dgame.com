<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <medical-screen />

    <!-- 系统子幕图-->

    <!-- 联系我们板块 -->
    <relation :is-blue="isBlue" />
    <!-- 合作伙伴板块 -->
    <partner :is-blue="isBlue" />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import MedicalScreen from '@/components/Medical/MedicalScreen.vue'
import Relation from '@/components/SandTable/Relation.vue'
import Partner from '@/components/SandTable/Partner.vue'
export default {
  name: 'Medical',
  components: {
    MedicalScreen,
    Relation,
    Partner
  },
  data() {
    return {
      // isBlue -- underline color props
      isBlue: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
</style>
