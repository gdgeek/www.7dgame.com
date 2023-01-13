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
    <!-- 预留 -->

    <div style="height: 710px; background-color: #222222" />
    <!-- 联系我们 -->
    <medical-relation />
    <!-- 合作伙伴板块新通用组件 -->
    <div style="height: 600px; background-color: #f0f0f0">合作伙伴重构中</div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import ExhibitionScreen from '@/components/Exhibition/ExhibitionScreen.vue'
import ExhibitionPicture from '@/components/Exhibition/ExhibitionPicture.vue'
import ExhibitionVideo from '@/components/Exhibition/ExhibitionVideo.vue'
import ExhibitionBody from '@/components/Exhibition/ExhibitionBody.vue'
import MedicalRelation from '@/components/Medical/MedicalRelation.vue'

export default {
  name: 'Exhibition',
  components: {
    ExhibitionScreen,
    ExhibitionPicture,
    ExhibitionVideo,
    ExhibitionBody,
    MedicalRelation
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
</style>
