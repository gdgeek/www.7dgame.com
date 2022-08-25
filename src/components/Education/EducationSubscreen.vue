<template>
  <!-- 子幕图 -->
  <section class="background-box">
    <el-row>
      <!-- 手机显示 -->
      <el-col :span="24" class="hidden-md-and-up">
        <div class="background-box-image">
          <div class="section-title" align="left">
            <h3 style="font-weight:lighter">{{ infoTel }}</h3>
            <small style="font-weight:lighter">{{ infoTitle }}</small>
          </div>
        </div>
      </el-col>
      <!-- PC显示 -->
      <el-col :span="24" class="hidden-sm-and-down">
        <div class="background-box-image">
          <div class="section-title " align="left">
            <h1 style="font-weight:lighter">{{ infoTel }}</h1>
            <p style="font-weight:lighter">{{ infoTitle }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>

</template>

<script>
export default {
  name: 'EducationSubscreen',

  data() {
    return {
      infoTel: '从用户视角出发，用行动创造未来',
      infoTitle: '根据项目实际需求悉心设计，助力更多的用户数字化升级。'
    }
  },
  methods: {

  }
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
  max-height: 250px;
  background: url('/media/bg/cloudbgc3.jpg') center no-repeat;
  background-size: cover;
  // background-size: 100%;
}
</style>
