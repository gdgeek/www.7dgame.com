<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <education-screen />

    <!-- 应用场景 -->
    <education-solution />

    <!-- 产品中心 -->
    <education-cloud />

    <!-- 创新协同体验 -->
    <education-deploy />

    <!-- 系统子幕图-->
    <education-subscreen />

    <!-- 联系我们 -->
    <medical-relation />
    <!-- 合作伙伴板块新通用组件 -->
    <exhibition-partner />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'

import EducationScreen from '@/components/Education/EducationScreen.vue'
import EducationCloud from '@/components/Education/EducationCloud.vue'
import EducationSolution from '@/components/Education/EducationSolution.vue'
import EducationDeploy from '@/components/Education/EducationDeploy.vue'
import EducationSubscreen from '@/components/Education/EducationSubscreen.vue'
import MedicalRelation from '@/components/Medical/MedicalRelation.vue'
import ExhibitionPartner from '@/components/Exhibition/ExhibitionPartner.vue'
export default {
  name: 'Education',
  components: {
    EducationScreen,
    EducationCloud,
    EducationSolution,
    EducationDeploy,
    EducationSubscreen,
    MedicalRelation,
    ExhibitionPartner
  },
  data() {
    return {
      // isBlack -- title color props
      isBlack: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/sandtable.scss';
@import '~@/styles/responsive-style.scss';
</style>
