<template>
  <!-- 巨幕板块 -->
  <section>
    <!-- 模型通用组件占位 -->
    <!-- <demo-screen-show /> -->
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
import PublickScreen from '@/components/WebPublick/PublickScreen.vue'
export default {
  name: 'MedicalScreen',
  components: {
    PublickScreen
  },
  data() {
    return {
      infoTel: 15000159790,
      infoTitle: '欢迎体验',
      infoTitle2: '元宇宙实景医疗',
      titleColor: '#32373f',
      titlePosition: 'left',
      bgUrl: '/media/bg/m2-screen.jpg'
    }
  }
}
</script>

<style lang="scss" scoped></style>
