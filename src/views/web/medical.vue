<template>
  <div class="background-screen-border">
    <!-- 医疗巨幕板块 -->
    <medical-screen />
    <!-- 视频应用白底色 -->
    <medical-video />
    <!-- 产品应用灰底色 -->
    <div style="height: 600px; background-color: #f0f0f0">
      product application
    </div>

    <!-- 系统子幕图绿底色-->
    <div style="height: 600px">sub screen</div>
    <!-- 联系我们板块白底色 -->
    <!-- <relation :is-blue="isBlue" /> -->
    <!-- 合作伙伴板块新通用组件 -->
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import MedicalScreen from '@/components/Medical/MedicalScreen.vue'
import MedicalVideo from '@/components/Medical/MedicalVideo.vue'
// import Relation from '@/components/SandTable/Relation.vue'
// import Partner from '@/components/SandTable/Partner.vue'
export default {
  name: 'Medical',
  components: {
    MedicalScreen,
    MedicalVideo
    // Relation,
    // Partner
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
@import '~@/styles/responsive-style.scss';
</style>
