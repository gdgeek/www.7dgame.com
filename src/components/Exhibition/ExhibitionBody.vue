<template>
  <!-- 展馆 -->
  <section>
    <el-row :gutter="40" style="padding: 5% 10%">
      <!-- content部分 -->
      <el-col :span="24">
        <div align="left" style="padding: 30px 0">
          <div class="exhibition-title-h3 p-title-m">开始部署一个展馆</div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="left">
        <div style="width: 50%; height: 200px; background-color: pink">
          icon
        </div>
        <h4>suntitle</h4>
        <p>content</p>
      </el-col>
      <!-- 视频位置 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="left">
        <div style="width: 50%; height: 200px; background-color: pink">
          icon
        </div>
        <h4>suntitle</h4>
        <p>content</p>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" align="left">
        <div style="width: 50%; height: 200px; background-color: pink">
          icon
        </div>
        <h4>suntitle</h4>
        <p>content</p>
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
