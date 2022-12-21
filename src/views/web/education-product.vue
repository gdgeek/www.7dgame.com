<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <section class="portal-main-background">
      <div align="center">
        <div class="education-pc-title">产品中心，选择合适的方案</div>
        <p class="education-gray-title">根据您的使用场景，做出最佳选择</p>
      </div>
      <el-row class="product-box">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card class="product-card" shadow="hover">
            <div style="width: 100%; height: 200px" align="center">
              <p class="portal-main-title">高级版</p>
              <p style="color: #808896; font-size: 18px">提升教育交互体验</p>
            </div>
            <div class="product-price-content">
              <h3>高级功能及特属资源</h3>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card class="product-card" shadow="hover">
            <div style="width: 100%; height: 200px" align="center">
              <p class="portal-main-title">私有部署</p>
              <p style="color: #808896; font-size: 18px">满足企业定制化要求</p>
            </div>
            <div class="product-price-content">
              <h3>深度功能定制及专家服务</h3>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <section class="portal-body-background">
      <br />
      <div align="center">
        <div class="education-pc-title">产品说明</div>
      </div>
      <el-row class="product-box">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" align="left">
          <el-card class="product-card product-explain-height" shadow="hover">
            <div class="education-sub-title">示例与体验</div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" align="left">
          <el-card class="product-card product-explain-height" shadow="hover">
            <div class="education-sub-title">部署与教程</div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" align="left">
          <el-card class="product-card product-explain-height" shadow="hover">
            <div class="education-sub-title">后期服务</div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- 系统子幕图-->
    <education-subscreen />

    <div />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'

import EducationSubscreen from '@/components/Education/EducationSubscreen.vue'
export default {
  name: 'EducationProduct',
  components: {
    EducationSubscreen
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
.portal-main-background {
  position: relative;
  width: 100%;
  min-height: 800px;
  padding-top: 160px;
  background: url('/media/bg/ep-bg.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  // background-size: 100%;
  // border-bottom: 1px solid #e1e6f9;
}
.product-box {
  padding: 60px 12% 130px;
  // background-color: rgb(204, 204, 204);
}
.product-card {
  padding: 20px;
  margin: 20px;
  max-width: 460px;
  border-radius: 14px;
}
.product-price-content {
  padding: 10px 30px;
  width: 100%;
  height: 460px;
  background-color: #f9faff;
  border-radius: 14px;
}
.product-explain-height {
  height: 300px;
  background-color: #f2f5fb;
}
.portal-body-background {
  padding-top: 100px;
  width: 100%;
  background-color: #f8fafa;
}
.education-pc-title {
  margin-bottom: 2%;
  font-size: 50px;
  font-weight: 600;
  color: #32373f;
}
.portal-main-title {
  font-weight: 600;
  font-size: 28px;
  color: #32373f;
}
.education-gray-title {
  font-size: 24px;
  color: #8d95a6;
}
.education-sub-title {
  font-weight: 600;
  font-size: 20px;
  color: #32373f;
}
</style>
