<template>
  <!-- 巨幕板块 -->
  <section>
    <!-- 模型通用组件占位 -->
    <!-- <demo-screen-show /> -->
    <el-row>
      <!-- 手机显示 -->
      <el-col :span="24" class="hidden-md-and-up">
        <div class="background-box-image">修改中</div>
      </el-col>
      <!-- PC显示 -->
      <el-col :span="24" class="hidden-sm-and-down">
        <div class="background-box-image">
          <div class="medical-pc-box" align="left">
            <div class="medical-pc-title">{{ infoTitle }}</div>
            <div class="medical-pc-title">{{ infoTitle2 }}</div>
            <h1 style="font-weight: lighter; margin-top: 8%; color: #e361a1">
              即刻拨打
              {{ infoTel }}
            </h1>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
// import DemoScreenShow from '@/components/MrPP/MrPPDemo/DemoScreenShow.vue'

export default {
  name: 'MedicalScreen',
  components: {
    // DemoScreenShow
  },

  data() {
    return {
      infoTitle: 'AR医疗',
      infoTitle2: '元宇宙实景编程平台',
      infoTel: 15000159790
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
// @import '~@/styles/screenstyle.scss';
// @import '~@/styles/sandtable.scss';

.background-box-image {
  display: flex;
  align-items: center;
  padding: 1px 3% 20px;
  width: 100%;
  height: 30vw;
  max-height: 650px;
  // background-color: #c9eaf3;
  background: url('/media/bg/ep-bg.jpg') center no-repeat;
  background-size: cover;
  background-size: 100%;
}

.medical-phone-box {
  margin-left: 3%;
  padding-top: 10px;
}
.medical-pc-box {
  margin-left: 10%;
}
.medical-pc-title {
  margin-bottom: 2%;
  font-size: 52px;
  font-weight: 600;
  color: #32373f;
}
</style>
