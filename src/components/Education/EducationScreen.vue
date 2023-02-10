<template>
  <!-- 巨幕板块 -->
  <section>
    <!-- demo展示板块 视频 3D等 -->
    <demo-screen-show />
    <publick-screen
      :info-tel="infoTel"
      :info-title="infoTitle"
      :info-title2="infoTitle2"
      :title-color="titleColor"
      :title-position="titlePosition"
      :bg-url="bgUrl"
    />
  </section>
</template>

<script>
import DemoScreenShow from '@/components/MrPP/MrPPDemo/DemoScreenShow.vue'
import PublickScreen from '@/components/WebPublick/PublickScreen.vue'
export default {
  name: 'EducationScreen',
  components: {
    DemoScreenShow,
    PublickScreen
  },
  data() {
    return {
      infoTel: 15000159790,
      infoTitle: '为您私有部署',
      infoTitle2: '元宇宙数字化教育方案',
      titleColor: '#1d1d1f',
      titlePosition: 'left',
      bgUrl: '/media/bg/education.jpg'
    }
  }
}
</script>

<style lang="scss" scoped></style>
