<template>
  <!-- 产品中心 -->
  <section class="section-box">
    <el-row :gutter="30" class="p-pc-pfr">
      <!-- content部分 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" align="left">
        <div class="title-box">
          <div class="medical-title-h3 p-title-m">核心应用场景</div>

          <p class="medical-content-small p-title-ss">
            MrPP是一款面向未来元宇宙数字生态的AR元宇宙实景平台。拥有第三方视角、空间场景定位等多项专利。给用户提供强大的编辑能力，一站式实现用户所需的可视化处理。
          </p>
          <p class="medical-content-small p-title-ss">
            在元宇宙实景交互这个过程中，它注重于人的感受场景的体验，带给人们多维度的视觉震撼感，让展馆极具吸引力与生命力，大大提升品牌的价值。
          </p>
          <div align="left" class="button-box">
            <div class="product-button">更多案例</div>
          </div>
        </div>
      </el-col>
      <!-- 视频位置 -->
      <el-col align="center" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="medical-video-box">
          <landscape-video :vdsrc="videoSrc" />
        </div>
      </el-col>
    </el-row>
    <br />
    <br />
  </section>
</template>

<script>
import LandscapeVideo from '@/components/Medical/LandscapeVideo.vue'
// import LandscapeVideo from './LandscapeVideo.vue'
export default {
  name: 'ExhibitionVideo',
  components: { LandscapeVideo },
  data() {
    return {
      videoSrc:
        'http://1251022382.vod2.myqcloud.com/3ebf9041vodtransgzp1251022382/6487c9fd5285890809258783935/v.f30.mp4'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
@import '~@/styles/publicity-position.scss';
.section-box {
  padding: 8% 20px 6%;
  background-color: #f5f4f3;
}
.title-box {
  margin: 2% 0 2% 4%;
  max-width: 530px;
}

.medical-title-h3 {
  font-size: 32px;
  font-weight: 600;
  color: #222222;
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
  height: 400px;
}
.medical-video-box {
  padding-top: 2%;
  width: 90%;
}
.button-box {
  padding: 35px 0 15px;
}
.product-button {
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  font-weight: 600;
  border-radius: 5px;
  color: #fff;
  width: 190px;
  height: 50px;
  background-color: #2a2324;
}
</style>
