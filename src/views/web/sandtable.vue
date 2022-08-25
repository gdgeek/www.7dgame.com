<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <sand-screen />
    <!-- 震撼沙盘板块 -->
    <solution />
    <!-- 第三人称视角板块 -->
    <thirdman />
    <!-- 关于我们板块 -->
    <about />

    <!-- 介绍板块 -->
    <introduce />
    <!-- 开发流程板块 -->
    <flow />
    <!-- 联系我们板块 -->
    <relation />
    <!-- 合作伙伴板块 -->
    <partner />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import SandScreen from '@/components/SandTable/SandScreen'
import Solution from '@/components/SandTable/Solution'
import Thirdman from '@/components/SandTable/Thirdman'
import About from '@/components/SandTable/About'
import Introduce from '@/components/SandTable/Introduce'
import Flow from '@/components/SandTable/Flow'
import Relation from '@/components/SandTable/Relation'
import Partner from '@/components/SandTable/Partner'
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
    Partner
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
@import '~@/styles/sandtable.scss';

</style>
