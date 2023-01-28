<template>
  <!-- 产品中心 -->
  <section class="section-box">
    <el-row :gutter="30" class="p-pc-pfr">
      <!-- content部分 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" align="left">
        <div class="title-box">
          <div class="medical-title-h3 p-title-m">核心应用场景</div>
          <div class="medical-title-small">
            <!-- 具有数字沙盘、实现AR实景展示、网站增强现实3D效果呈现、AR产品互动营销等AR营销方式 -->
            可实现AR实景展示、多设备数字可视化协同
          </div>
          <p class="medical-content-small p-title-ss">
            MrPP是一款面向未来元宇宙数字生态的AR元宇宙实景平台。拥有第三方视角、空间场景定位等多项专利。给用户提供强大的编辑能力，一站式实现用户所需的可视化处理。
          </p>
          <p class="medical-content-small p-title-ss">
            在传统医疗场景，医疗数据与人分离。我们通过实景沙盘再现，可广泛用于医疗可视化教学、手术培训、机理模型多层分析，帮助用户发挥数据的最大化价值。
          </p>
        </div>
      </el-col>
      <!-- 视频位置 -->
      <el-col align="center" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <!-- <div class="medical-video-box">
          <landscape-video :vdsrc="videoSrc" />
        </div> -->
        <a
          href="https://space.bilibili.com/20959246/channel/seriesdetail?sid=352585"
          target="_blank"
        >
          <div class="medical-video-box">
            <img
              src="/media/bg/medical-play.jpg"
              style="width: 100%; border-radius: 5px"
            />
          </div>
        </a>
      </el-col>
    </el-row>
    <br />
    <br />
  </section>
</template>

<script>
// import LandscapeVideo from './LandscapeVideo.vue'
export default {
  name: 'MedicalVideo',
  // components: { LandscapeVideo },
  data() {
    return {
      // videoSrc:
      //   'http://1251022382.vod2.myqcloud.com/3ebf9041vodtransgzp1251022382/6487c9fd5285890809258783935/v.f30.mp4'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
@import '~@/styles/publicity-position.scss';
.section-box {
  padding: 8% 20px 6%;
}
.title-box {
  margin: 2% 0 2% 4%;
  max-width: 530px;
}

.medical-title-h3 {
  font-size: 32px;
  font-weight: 600;
  color: #00cccc;
}
.medical-title-small {
  color: #5a5a5b;
  // color: #929292;
  font-weight: lighter;
  padding: 10px 0 10px;
  font-size: 16px;
}
.medical-content-small {
  color: #444850;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
}
.videobox {
  background-color: rgb(190, 232, 235);
  height: 400px;
}
.medical-video-box {
  padding-top: 2%;
  width: 90%;
}
</style>
