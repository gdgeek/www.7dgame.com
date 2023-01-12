<template>
  <!-- 展馆 -->
  <section>
    <el-row :gutter="40" style="padding: 5% 10%">
      <el-col :span="24">
        <div align="center" style="padding: 30px 5%">
          <div class="exhibition-title-h3 p-title-m">亲自体验元宇宙展馆</div>
          <p class="exhibition-content-small p-title-ss">
            世界的维度正在发生变化。我们引领场馆的的数字可视化，利用元宇宙数字孪生，快速搭建场景
            实现任何类型的空间数字化——展馆、办公室和酒店到工厂和商店。整个物业生命周期的行业正在实现前所未有的价值。
          </p>
        </div>
      </el-col>
      <!-- picture部分 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="center">
        <div style="width: 100%; height: 260px; background-color: #c0b6b7">
          场景图
        </div>
        <p>内容阐述</p>
      </el-col>
      <br />
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="center">
        <div style="width: 100%; height: 260px; background-color: #c0b6b7">
          场景图
        </div>
        <p>内容阐述</p>
      </el-col>
      <br />
      <!-- 视频位置 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="center">
        <div style="width: 100%; height: 260px; background-color: #c0b6b7">
          场景图
        </div>
        <p>内容阐述</p>
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
@import '~@/styles/responsive-style.scss';
// @import '~@/styles/sandtable.scss';
.title-box {
  max-width: 800px;
}

.exhibition-title-h3 {
  font-size: 32px;
  font-weight: 600;
  color: #222222;
}
.exhibition-title-small {
  color: #5a5a5b;
  // color: #929292;
  font-weight: lighter;
  padding: 10px 0 10px;
  font-size: 16px;
}
.exhibition-content-small {
  color: #444444;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
}
.picturebox {
  background-color: rgb(190, 232, 235);
  height: 400px;
}
.exhibition-picture-box {
  padding-top: 2%;
  width: 90%;
}
</style>
