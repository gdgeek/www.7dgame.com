<template>
  <!-- 巨幕板块 -->
  <section class="font-text">
    <!-- 模型通用组件占位 -->
    <!-- <demo-screen-show /> -->
    <el-row>
      <!-- 手机显示 -->
      <el-col :span="24" class="hidden-md-and-up">
        <div class="background-box-image">
          <div class="education-phone-box font-title" align="left">
            <p style="font-size: 30px; color: #f5f4f3">
              {{ infoTitle2 }}
            </p>
            <p>
              <a
                ref="telPhone"
                :href="'tel' + ':' + infoTel"
                style="border-bottom: 2px solid #1e82e8; color: #f5f4f3"
              >
                点击拨打
                <i class="el-icon-phone-outline" />
                {{ infoTel }}
              </a>
            </p>
          </div>
        </div>
      </el-col>
      <!-- PC显示 -->
      <el-col :span="24" class="hidden-sm-and-down">
        <div class="background-box-image">
          <div class="exhibition-pc-box" align="left">
            <div class="exhibition-pc-title font-title">{{ infoTitle }}</div>
            <div class="exhibition-pc-title font-title">{{ infoTitle2 }}</div>
            <h1 style="font-weight: lighter; margin-top: 8%; color: #f5f4f3">
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
  name: 'ExhibitionScreen',
  components: {
    // DemoScreenShow
  },

  data() {
    return {
      infoTitle: '欢迎创建',
      infoTitle2: '元宇宙实景展馆',
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
  background: url('/media/bg/ex-screen.jpg') center no-repeat;
  background-size: cover;
  background-size: 100%;
}

.exhibition-phone-box {
  margin-left: 3%;
  padding-top: 10px;
}
.exhibition-pc-box {
  margin-left: 8%;
}
.exhibition-pc-title {
  margin-bottom: 2%;
  font-size: 46px;
  font-weight: 400;
  // color: #00cccc;
  color: #f5f4f3;
  // color: #32373f;
}
</style>
