<template>
  <!-- 巨幕板块 -->
  <section>
    <!-- demo展示板块 视频 3D等 -->
    <demo-screen-show />
    <el-row>
      <!-- 手机显示 -->
      <el-col :span="24" class="hidden-md-and-up">
        <div class="background-box-image">
          <div class="section-title-dark" align="left">
            <p style="font-weight: lighter">{{ infoTitle }}</p>
            <p>
              <a
                ref="telPhone"
                :href="'tel' + ':' + infoTel"
                style="border-bottom: 2px solid #1e82e8"
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
          <div class="section-title-dark" align="left">
            <h3 style="font-weight: lighter">{{ infoTitle }}</h3>
            <h1 style="font-weight: lighter">即刻拨打 {{ infoTel }}</h1>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import DemoScreenShow from '@/components/MrPP/MrPPDemo/DemoScreenShow.vue'

export default {
  name: 'EducationScreen',
  components: {
    DemoScreenShow
  },

  data() {
    return {
      infoTitle: '元宇宙实景编程平台 创造未来教育',
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
  padding: 1px 3% 20px;
  width: 100%;
  height: 30vw;
  max-height: 650px;
  background-color: #c9eaf3;
  // background: url('/media/bg/edu1.jpg') center no-repeat;
  // background-size: cover;
  // background-size: 100%;
}
</style>
