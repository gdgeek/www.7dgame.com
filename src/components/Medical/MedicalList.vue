<template>
  <!-- 医疗产品列 -->
  <div class="background-box font-text">
    <el-row class="row-box">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="background-img">
          <div
            class="portal-main-background portal-background-url1 p-positon-auto"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="background-text" align="left">
          <h2 class="font-text">快速分析了解您的需求!</h2>
          <p class="font-text" style="font-size: 16px; line-height: 24px">
            资深专业人员将对您的需求进行详细了解，发送我们的案例给您参考，为您的绝妙创意提供最适合的解决方案，并全程为项目的实现提供咨询。
          </p>
        </div>
        <div align="left" class="button-box">
          <div class="product-button" @click="goto('/web/list-product')">
            价格详情
          </div>
        </div>
      </el-col>
    </el-row>
    <br />
    <br />
    <el-row class="row-box">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        class="hidden-lg-and-up"
      >
        <div class="background-img">
          <div class="portal-background-url2 p-positon-auto" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="background-text" align="left">
          <h2 class="font-text">实景医疗AR产品部署</h2>
          <p style="font-size: 16px; line-height: 24px">
            我们将为您选择的产品方案进行展示和报价。满足客户的个性化需求。
            并就实景体验进行沟通和交流，我们将提供后续一系列合作、培训及部署。
          </p>
        </div>
        <div align="left" class="button-box">
          <div class="product-button" @click="goto('/web/list-product')">
            价格详情
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        class="hidden-md-and-down"
      >
        <div class="background-img">
          <div class="portal-background-url2 p-positon-auto" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '@/assets/font/font.css'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: 'MedicalList',

  data() {
    return {}
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/publicity-position.scss';
.background-box {
  padding: 5% 0 60px;
  background-color: #f7f6f9;
}
.row-box {
  padding: 0 30px;
}
.background-text {
  padding: 14% 20% 0 12%;
  // color: #040707;
  color: #32373f;
}
.background-img {
  position: relative;
  width: 100%;
  height: 50vw;
  max-height: 500px;
}
.portal-background-url1 {
  width: 80%;
  height: 80%;
  border: 0px solid;
  border-radius: 5px;
  background: url('/media/bg/m-list.jpg') center no-repeat;
  background-size: cover;
}
.portal-background-url2 {
  width: 80%;
  height: 80%;
  border-radius: 5px;
  background: url('/media/bg/m-list2.jpg') center no-repeat;
  background-size: cover;
}
.button-box {
  padding: 2% 12% 50px;
}
.product-button {
  font-size: 16px;
  line-height: 42px;
  text-align: center;
  font-weight: 400;
  border-radius: 5px;
  color: #fff;
  width: 130px;
  height: 42px;
  background-color: #00cccc;
}
.product-button:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
