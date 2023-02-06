<template>
  <!-- 产品中心 -->
  <section class="section-box">
    <el-row :gutter="30">
      <el-col :span="22" :offset="2">
        <div class="reletion-title-small font-text">以用户为中心</div>
        <div :class="[isBlack ? 'reletion-title-black' : 'reletion-title-h1']">
          <div class="p-title-m font-text">欢迎联系我们</div>
        </div>
        <!-- <div class="reletion-title-h1 p-title-m">欢迎联系我们</div> -->
      </el-col>
      <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10" :offset="2">
        <div class="reletion-title-h3 p-title-s font-text">公司简介</div>
        <div class="qfe_wrapper">
          <div
            style="
              line-height: 40px;
              letter-spacing: 3px;
              width: 90%;
              color: rgb(102, 102, 102);
            "
          >
            <div class="font-text">
              上海游七网络科技有限公司，作为国内制作元宇宙AR实景应用最早的高新科技企业，
              团队项目开发经验丰富，技术方案灵活多样。与未来数字化生态相融合，不断进取。
            </div>
          </div>
        </div>
      </el-col>
      <!-- 视频位置 -->
      <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10" :offset="2">
        <div class="reletion-title-h3 p-title-s font-text">联系方式</div>
        <div class="qfe_wrapper font-text">
          <div style="letter-spacing: 3px; line-height: 40px">
            <span style="color: rgb(102, 102, 102); font-size: 16px">
              <img
                src="/media/icon/relation-icon1.png"
                style="width: 20px; height: 20px"
              />
              上海市徐汇区虹漕路25-1号
            </span>
            <span style="font-size: 16px" />
          </div>
          <div style="letter-spacing: 3px; line-height: 40px">
            <span style="font-size: 16px">
              <span style="color: rgb(102, 102, 102)">
                <img
                  src="/media/icon/relation-icon2.png"
                  style="width: 18px; height: 18px"
                />
                15000159790
                <br />
              </span>
            </span>
          </div>
          <div style="letter-spacing: 3px; line-height: 40px">
            <span style="color: rgb(102, 102, 102)">
              <span style="font-size: 16px">
                <img
                  src="/media/icon/relation-icon3.png"
                  style="width: 20px; height: 20px"
                />
                dirui@bujiaban.com
              </span>
              <br />
            </span>
          </div>
          <br />
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import '@/assets/font/font.css'
export default {
  name: 'MedicalRelation',
  props: {
    isBlack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
.section-box {
  padding: 8% 4% 6%;
}

.reletion-title-h1 {
  font-size: 32px;
  font-weight: 400;
  color: #00cccc;
  margin-bottom: 65px;
}
.reletion-title-black {
  font-size: 32px;
  font-weight: 400;
  color: #222222;
  margin-bottom: 65px;
}
.reletion-title-h3 {
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: 400;
  color: #32373f;
}
.reletion-title-small {
  color: #2f2f2f;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: lighter;
}
.reletion-content {
  color: #5a5a5b;
  margin-bottom: 8px;
}

.qfe_wrapper {
  word-wrap: break-word;
  margin-bottom: 30px;
}
</style>
