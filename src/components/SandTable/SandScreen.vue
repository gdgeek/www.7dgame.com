<template>
  <!-- 巨幕板块 -->
  <section class="background-box">
    <el-row>
      <!-- 手机显示 -->
      <el-col :span="24" class="hidden-md-and-up">
        <div class="background-box-image font-title">
          <div class="section-title" align="center">
            <p style="font-size: 30px; color: #32373f；">
              {{ infoTitle }}
            </p>
            <h4>
              <a
                ref="telPhone"
                :href="'tel' + ':' + infoTel"
                style="border-bottom: 2px solid #1e82e8"
              >
                点击拨打
                <i class="el-icon-phone-outline" />
                {{ infoTel }}
              </a>
            </h4>
          </div>
        </div>
      </el-col>
      <!-- PC显示 -->
      <el-col :span="24" class="hidden-sm-and-down">
        <div class="background-box-image">
          <div align="center">
            <h1 class="exhibition-pc-title font-title">{{ infoTitle }}</h1>
            <h1
              class="font-text"
              style="font-weight: lighter; margin-top: 8%; color: #f5f4f3"
            >
              即刻拨打 {{ infoTel }}
            </h1>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'SandScreen',

  data() {
    return {
      infoTitle: '全息数字沙盘制作 震撼来袭',
      infoTel: 15000159790
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
@import '~@/styles/sandtable.scss';
.background-box-image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px 20px 20px;
  width: 100%;
  height: 30vw;
  max-height: 650px;
  background: url('/media/bg/sand-screen.jpg') center no-repeat;
  background-size: cover;
  // background-size: 100%;
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
