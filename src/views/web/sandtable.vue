<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <sand-screen />
    <!-- 震撼沙盘板块 -->
    <solution />
    <!-- 第三人称视角板块 -->
    <!-- <thirdman /> -->
    <!-- 介绍板块 -->
    <introduce />
    <!-- 关于我们板块 -->
    <about />

    <!-- 开发流程板块 -->
    <flow />
    <!-- 联系我们板块 -->
    <relation />
    <!-- 合作伙伴板块新通用组件 -->
    <exhibition-partner />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import SandScreen from '@/components/SandTable/SandScreen.vue'
import Solution from '@/components/SandTable/Solution.vue'
import Thirdman from '@/components/SandTable/Thirdman.vue'
import About from '@/components/SandTable/About.vue'
import Introduce from '@/components/SandTable/Introduce.vue'
import Flow from '@/components/SandTable/Flow.vue'
import Relation from '@/components/SandTable/Relation.vue'
import ExhibitionPartner from '@/components/Exhibition/ExhibitionPartner.vue'
export default {
  name: 'SandTable',
  components: {
    SandScreen,
    Solution,
    Thirdman,
    About,
    Introduce,
    Flow,
    Relation,
    ExhibitionPartner
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/sandtable.scss';
@import '~@/styles/responsive-style.scss';
</style>
