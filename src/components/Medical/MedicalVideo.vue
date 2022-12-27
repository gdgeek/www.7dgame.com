<template>
  <!-- 产品中心 -->
  <section class="p-ph-top">
    <div class="title-box">
      <div class="medical-title-h1">应用场景</div>
      <p class="medical-title-small">了解元宇宙医疗应用场景,提供更多的帮助</p>
      <!-- <p>titlesmall</p> -->
    </div>
    <el-row :gutter="40">
      <!-- content部分 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" align="center">
        <div style="width: 100%; height: 600px; background-color: pink">
          left
        </div>
      </el-col>
      <!-- 视频位置 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" align="center">
        <div style="width: 100%; height: 600px; background-color: pink">
          right
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'MedicalVideo',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
@import '~@/styles/publicity-position.scss';
.title-box {
  padding: 6% 12%;
}
.medical-title-h1 {
  font-size: 32px;
  font-weight: 600;
  color: #00cccc;
  // color: #32373f;
}
.medical-title-small {
  color: #a4a4a4;
}
</style>
