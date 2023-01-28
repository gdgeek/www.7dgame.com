<template>
  <div class="background-screen-border">
    <!-- 展馆主屏幕 -->
    <exhibition-screen />
    <!-- 图片场景介绍 -->
    <exhibition-picture />
    <!-- 视频案例 -->
    <exhibition-video />
    <!-- 实施步骤 -->
    <exhibition-body />
    <!-- 技术服务 -->
    <exhibition-list />
    <!-- 联系我们 -->
    <medical-relation :is-black="isBlack" />
    <!-- 合作伙伴板块新通用组件 -->
    <exhibition-partner />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import ExhibitionScreen from '@/components/Exhibition/ExhibitionScreen.vue'
import ExhibitionPicture from '@/components/Exhibition/ExhibitionPicture.vue'
import ExhibitionVideo from '@/components/Exhibition/ExhibitionVideo.vue'
import ExhibitionBody from '@/components/Exhibition/ExhibitionBody.vue'
import MedicalRelation from '@/components/Medical/MedicalRelation.vue'
import ExhibitionList from '@/components/Exhibition/ExhibitionList.vue'
import ExhibitionPartner from '@/components/Exhibition/ExhibitionPartner.vue'

export default {
  name: 'Exhibition',
  components: {
    ExhibitionScreen,
    ExhibitionPicture,
    ExhibitionVideo,
    ExhibitionBody,
    MedicalRelation,
    ExhibitionList,
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
@import '~@/styles/responsive-style.scss';
</style>
