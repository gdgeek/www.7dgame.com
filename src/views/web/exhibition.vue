<template>
  <div class="background-screen-border">
    <!-- 展馆主屏幕 -->
    <exhibition-screen />
    <!-- 展馆结构 -->
    <exhibition-body />

    <!-- 联系我们 -->
    <medical-relation />
    <!-- 合作伙伴板块新通用组件 -->
    <div style="height: 600px; background-color: #f0f0f0">合作伙伴重构中</div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import ExhibitionScreen from '@/components/Exhibition/ExhibitionScreen.vue'
import ExhibitionBody from '@/components/Exhibition/ExhibitionBody.vue'
import MedicalRelation from '@/components/Medical/MedicalRelation.vue'

export default {
  name: 'Exhibition',
  components: {
    ExhibitionScreen,
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
