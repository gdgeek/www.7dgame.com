<template>
  <div class="background-screen-border">
    <!-- demo展示板块 视频 3D等 -->
    <demo-three-screen />
    <!-- 巨幕板块 -->
    <education-screen />

    <!-- 私有云 -->
    <education-cloud />

    <!-- 应用场景 -->
    <education-solution />

    <!-- 技术部署 -->
    <education-deploy />

    <!-- 系统子幕图-->
    <education-subscreen />

    <!-- 系统设计和实施 -->
    <education-system />

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
import EducationSystem from '@/components/Education/EducationSystem.vue'
import Relation from '@/components/SandTable/Relation.vue'
import Partner from '@/components/SandTable/Partner.vue'
import DemoThreeScreen from '@/components/MrPP/MrPPDemo/DemoThreeScreen.vue'
export default {
  name: 'Education',
  components: {
    EducationScreen,
    EducationCloud,
    EducationSolution,
    EducationDeploy,
    EducationSubscreen,
    EducationSystem,
    Relation,
    Partner,
    DemoThreeScreen
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
