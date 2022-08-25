<template>
  <!-- 介绍板块 -->
  <section class="sandtable-section">
    <div align="center">
      <h1 class="section-title-size section-title-dark">基于HoloLens2虚实混合数字沙盘绍</h1>
      <p class="section-subtitle-size">
        全方位覆盖用户展示需求，感知一体沉浸试体验
      </p>
      <p class="section-underline-style" />
    </div>

    <el-row>
      <el-col :span="24" class="hidden-md-and-up">
        <div align="center">
          <img src="/media/bg/2326.jpg" style="width: 100%">
        </div>
      </el-col>
      <el-col :span="24" class="hidden-sm-and-down">
        <div align="center">
          <img src="/media/bg/2325.jpg" style="width: 90%">
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'Introduce',

  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
@import '~@/styles/sandtable.scss';
</style>
