<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <education-screen />

    <!-- 应用场景 -->
    <education-solution />

    <!-- 产品中心 -->
    <education-cloud />

    <!-- 系统子幕图-->
    <education-subscreen />

    <!-- 创新协同体验 -->
    <education-deploy />

    <!-- 联系我们板块 -->
    <relation :is-blue="isBlue" />
    <!-- 合作伙伴板块 -->
    <partner :is-blue="isBlue" />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'

import EducationScreen from '@/components/Education/EducationScreen.vue'
import EducationCloud from '@/components/Education/EducationCloud.vue'
import EducationSolution from '@/components/Education/EducationSolution.vue'
import EducationDeploy from '@/components/Education/EducationDeploy.vue'
import EducationSubscreen from '@/components/Education/EducationSubscreen.vue'
import Relation from '@/components/SandTable/Relation.vue'
import Partner from '@/components/SandTable/Partner.vue'
export default {
  name: 'Education',
  components: {
    EducationScreen,
    EducationCloud,
    EducationSolution,
    EducationDeploy,
    EducationSubscreen,
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
@import '~@/styles/sandtable.scss';
</style>
