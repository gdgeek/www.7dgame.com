<template>
  <div>

    <!-- AR/MR技术部署板块 -->
    <section class="sandtable-section">
      <br>
      <div align="center">
        <h1 class="section-title-size section-title-dark title-lighter">AR/MR技术部署</h1>
        <p class="section-subtitle-size">
          多种先进科技交互体验，精彩纷呈
        </p>
        <p class="section-underline-blue" />
      </div>
      <!-- 技术种类 -->
      <div class="deploy-flex-box">
        <div class="deploy-flex-son"><p>icon</p><div>多⼈多设备互动</div></div>
        <div class="deploy-flex-son"><p>icon</p><div>投屏实现</div></div>
        <div class="deploy-flex-son"><p>icon</p><div>同步操作</div></div>
        <div class="deploy-flex-son"><p>icon</p><div>第三⽅视⻆</div></div>
        <div class="deploy-flex-son"><p>icon</p><div>空间定位</div></div>
      </div>

    </section>

  </div>
</template>

<script>

export default {
  name: 'EducationDeploy',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
@import '~@/styles/sandtable.scss';
.deploy-flex-box{
  margin-top: 50px;
  padding: 0 5%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  min-height: 280px;
}
.deploy-flex-son{
  border-radius: 5%;
  width: 180px;
  height: 180px;
  background-color: #d3edf8;
  margin-bottom: 20px;
}
.deploy-flex-son:hover {
  background-color:#bcdcf8;
}
.deploy-flex-son p{
   border-radius: 50%;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  margin:20px auto 16px;
  text-align: center;
  color: red;
}

.deploy-flex-son div{
  text-align: center;
  color: #677990;
}
</style>
