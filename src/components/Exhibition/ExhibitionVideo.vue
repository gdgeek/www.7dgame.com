<template>
  <!-- 产品中心 -->
  <section class="section-box">
    <el-row :gutter="30" style="padding: 5% 10%">
      <!-- content部分 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" align="left">
        <div class="title-box">
          <div class="medical-title-h3 p-title-m">
            定制开发demo，20000元实景AR展馆体验
          </div>

          <p class="medical-content-small p-title-ss">
            提供您的绝妙创意，我们将分析您的需求，为您提供解决方案,如需现场进行演示和勘察，我们将派专家实地交流。
          </p>
          <p class="medical-content-small p-title-ss">
            我们将根据用户实际需要，为您选择的展馆案例提供Demo和报价。当开发完成验收后，您有任何疑问，我们将会派出专业人员进行协助，或实地提供技术指导。
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
  padding: 5% 20px 3%;
  background-color: #f5f4f3;
}
.title-box {
  margin: 2% 0;
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
  font-weight: lighter;
  font-size: 18px;
  line-height: 24px;
}
.videobox {
  height: 400px;
}
.medical-video-box {
  padding-top: 2%;
  width: 100%;
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
