<template>
  <!-- 产品中心 -->
  <section class="section-box">
    <div class="reletion-title-small">以用户为中心</div>
    <div class="reletion-title-h1 p-title-m">欢迎联系我们</div>

    <el-row :gutter="20">
      <!-- content部分 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="reletion-title-h3 p-title-s">机构地址</div>
        <div class="reletion-content">icon 上海市...................</div>
        <br />
        <div class="reletion-content">icon 上海市...................</div>
        <br />
      </el-col>
      <!-- 视频位置 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="reletion-title-h3 p-title-s">联系方式</div>
        <div class="reletion-content">icon 电话...................</div>
        <br />
        <div class="reletion-content">icon 微信...................</div>
        <br />
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'MedicalRelation',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
.section-box {
  padding: 8% 8% 6%;
}

.reletion-title-h1 {
  font-size: 32px;
  font-weight: 600;
  color: #00cccc;
  margin-bottom: 65px;
}
.reletion-title-h3 {
  margin-bottom: 32px;
  font-size: 26px;
  font-weight: 600;
  color: #32373f;
}
.reletion-title-small {
  color: #2f2f2f;
  margin-bottom: 8px;
}
.reletion-content {
  color: #5a5a5b;
  margin-bottom: 8px;
}
</style>
