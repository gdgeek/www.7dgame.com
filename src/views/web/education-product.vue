<template>
  <div class="background-screen-border">
    <!-- 巨幕板块 -->
    <section class="portal-main-background">
      <div align="center">
        <div class="portal-h1-title title-ph-l">产品中心，选择合适的方案</div>
        <p class="education-gray-title title-ph-s">
          根据您的使用场景，做出最佳选择
        </p>
      </div>
      <el-row class="product-box" :gutter="30">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          class="product-col"
        >
          <el-card
            class="product-card"
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div style="width: 100%; height: 200px" align="center">
              <p class="portal-h3-title title-ph-m">高级版</p>
              <p class="portal-p-title">提升教育交互体验</p>
            </div>
            <div class="product-price-content">
              <h3>高级功能及特属资源</h3>
            </div>
          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          class="product-col"
        >
          <el-card
            class="product-card"
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div style="width: 100%; height: 200px" align="center">
              <p class="portal-h3-title title-ph-m">私有部署</p>
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
        <div class="portal-h1-title title-ph-l">产品说明</div>
      </div>
      <el-row class="product-box" :gutter="30">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="8"
          align="left"
          class="product-col"
        >
          <el-card class="product-card product-explain-height" shadow="hover">
            <div class="education-sub-title">示例与体验</div>
          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="8"
          align="left"
          class="product-col"
        >
          <el-card class="product-card product-explain-height" shadow="hover">
            <div class="education-sub-title">部署与教程</div>
          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="8"
          align="left"
          class="product-col"
        >
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
  padding-top: 10%;
  background: url('/media/bg/ep-bg.jpg') no-repeat;
  background-position: center;
  background-size: cover;
}
.product-box {
  padding: 60px 12% 100px;
}
.product-col {
  padding-bottom: 30px;
}
.product-card {
  max-width: 460px;
  border-radius: 14px;
  margin: 0 auto;
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
.portal-h1-title {
  margin-bottom: 2%;
  font-size: 50px;
  font-weight: 600;
  color: #32373f;
}
.portal-h3-title {
  font-weight: 600;
  font-size: 28px;
  color: #32373f;
}
.portal-p-title {
  color: #808896;
  font-size: 18px;
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
