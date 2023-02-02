<template>
  <!-- 展馆 -->
  <section>
    <el-row :gutter="40" style="padding: 5% 10%">
      <!-- content部分 -->
      <el-col :span="24">
        <div align="left" style="padding: 30px 0">
          <div class="exhibition-title-h1 p-title-m">开始部署一个场景</div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" align="left">
        <section class="icon-box">
          <img src="/media/icon/ex-icon1.png" />
          <div class="icon-title-h3">对展馆场景空间扫描</div>
          <p class="icon-content">
            我们有多种设备和扫描方案，根据客户的需要选择。
          </p>
        </section>
      </el-col>
      <!-- 视频位置 -->
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" align="left">
        <section class="icon-box">
          <img src="/media/icon/ex-icon2.png" />
          <div class="icon-title-h3">在平台进行相关编辑</div>
          <p class="icon-content">自主研发的可视化编辑平台，一站式录入和编辑</p>
        </section>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" align="left">
        <section class="icon-box">
          <img src="/media/icon/ex-icon3.png" />
          <div class="icon-title-h3">使用设备查看效果</div>
          <p class="icon-content">
            拥有多设备协同专利，可使用眼镜、手机和Pad进行查看
          </p>
        </section>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'ExhibitionBody',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/responsive-style.scss';
// @import '~@/styles/sandtable.scss';

.exhibition-title-h1 {
  font-size: 32px;
  font-weight: 400;
  color: #222222;
  margin-bottom: 40px;
}
.icon-box {
  margin-bottom: 40px;
  width: 80%;
}
.icon-title-h3 {
  padding: 20px 0 0;
  font-size: 22px;
  font-weight: 400;
}
.icon-content {
  font-size: 14px;
  font-weight: lighter;
  line-height: 24px;
  color: #444444;
}
</style>
