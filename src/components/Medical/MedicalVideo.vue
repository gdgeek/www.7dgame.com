<template>
  <!-- 产品中心 -->
  <section class="section-box font-text">
    <el-row :gutter="30" class="p-pc-pfr">
      <!-- content部分 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" align="left">
        <div class="title-box">
          <h2 class="medical-title-h3 p-title-m">医疗核心应用场景</h2>
          <div class="medical-title-small">
            <!-- 具有数字沙盘、实现AR实景展示、网站增强现实3D效果呈现、AR产品互动营销等AR营销方式 -->
            私有部署方案，可实现AR实景展示、多设备数字可视化协同
          </div>
          <h5>
            元宇宙实景编程平台（MrPP.com），
            是一个让任何人都可以轻松创建AR场景的创作平台，支持可视化编程，三方视角（观众视角），空间场景定位等有趣的功能。给用户提供强大的编辑能力，让用户可以随时随地创造有趣的AR协同场景。
            <br />
            <br />
            在传统医疗场景，我们提供平台的私有部署方案，医生可以上传CT模型，在MR/AR设备中展示和查看。可广泛用于医疗可视化教学、手术培训、机理模型多层分析，帮助医护工作者和患者借助元宇宙的手段更好的展开工作。
          </h5>
        </div>
      </el-col>
      <!-- 视频位置 -->
      <el-col align="center" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <!-- <div class="medical-video-box">
          <landscape-video :vdsrc="videoSrc" />
        </div> -->
        <a
          href="https://www.bilibili.com/video/BV1DR4y1s7nV/?spm_id_from=333.999.0.0"
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
  font-weight: 400;
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
  font-weight: 400;
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
