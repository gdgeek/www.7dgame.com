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
  name: 'SandScreen',
  components: {
    PublickScreen
  },
  data() {
    return {
      infoTel: 15000159790,
      infoTitle: '',
      infoTitle2: '全息数字沙盘制作 震撼来袭',
      titleColor: '#f5f4f3',
      titlePosition: 'center',
      bgUrl: '/media/bg/sand-screen.jpg'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
