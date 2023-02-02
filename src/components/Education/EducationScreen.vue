<template>
  <!-- 巨幕板块 -->
  <section>
    <!-- demo展示板块 视频 3D等 -->
    <demo-screen-show />
    <el-row>
      <!-- 手机显示 -->
      <el-col :span="24" class="hidden-md-and-up">
        <div class="background-box-image">
          <div class="education-phone-box font-title" align="left">
            <p style=" font-size: 30px; color: #32373f；word-wrap:break-word ;">
              {{ infoTitle2 }}
            </p>
            <p>
              <a
                ref="telPhone"
                :href="'tel' + ':' + infoTel"
                style="border-bottom: 2px solid #1e82e8; color: #e361a1"
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
        <div class="background-box-image font-title">
          <div class="education-pc-box" align="left">
            <div class="education-pc-title">{{ infoTitle }}</div>
            <div class="education-pc-title">{{ infoTitle2 }}</div>
            <h1
              class="font-text"
              style="font-weight: lighter; margin-top: 8%; color: #32373f"
            >
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
import '@/assets/font/font.css'
import DemoScreenShow from '@/components/MrPP/MrPPDemo/DemoScreenShow.vue'

export default {
  name: 'EducationScreen',
  components: {
    DemoScreenShow
  },

  data() {
    return {
      infoTitle: '为您私有部署',
      infoTitle2: '元宇宙数字化教育方案',
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
  background: url('/media/bg/education.jpg') center no-repeat;
  background-size: cover;
  background-size: 100%;
}

.education-phone-box {
  margin-left: 3%;
  padding-top: 10px;
}
.education-pc-box {
  margin-left: 10%;
}
.education-pc-title {
  margin-bottom: 2%;
  font-size: 46px;
  color: #32373f;
}
</style>
