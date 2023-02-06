<template>
  <!-- 展馆 -->
  <section>
    <el-row :gutter="40" style="padding: 5% 10%">
      <el-col :span="24">
        <div align="center" style="padding: 30px 5%">
          <div class="exhibition-title-h3 p-title-m">亲自体验元宇宙展馆</div>
          <p class="exhibition-content-small p-title-ss">
            世界的维度正在发生变化。我们引领场馆的的数字可视化，利用元宇宙数字孪生，快速搭建场景
            实现任何类型的空间数字化——展馆、办公室和酒店及商场。用技术赋能空间交互，实现前所未有的价值。
          </p>
        </div>
      </el-col>
      <!-- picture部分 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="center">
        <div>
          <img
            src="/media/bg/exhibition1.jpg"
            style="width: 100%; border-radius: 5px"
          />
        </div>
        <div class="img-title p-title-s">满足不同的场所</div>
      </el-col>
      <br />
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="center">
        <div>
          <img
            src="/media/bg/exhibition2.jpg"
            style="width: 100%; border-radius: 5px"
          />
        </div>
        <div class="img-title p-title-s">场景扫描定位</div>
      </el-col>
      <br />
      <!-- 视频位置 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="center">
        <div>
          <img
            src="/media/bg/exhibition3.jpg"
            style="width: 100%; border-radius: 5px"
          />
        </div>
        <div class="img-title p-title-s">个性化展馆布置</div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'ExhibitionPicture',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/publicity-position.scss';
@import '~@/styles/responsive-style.scss';
.title-box {
  max-width: 800px;
}
.img-box {
  width: 100%;
  border-radius: 25px;
}
.img-title {
  padding: 20px 0 40px;
  font-size: 22px;
  color: #222222;
  font-weight: 400;
}
.exhibition-title-h3 {
  padding: 20px;
  font-size: 36px;
  font-weight: 400;
  color: #222222;
}

.exhibition-content-small {
  color: #444444;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  max-width: 1100px;
}
</style>
