<template>
  <div>
    <!-- 创新优势板块 -->
    <section class="sandtable-section">
      <br />
      <div align="center">
        <h1 class="section-title-size section-title-dark title-lighter">
          创新优势
        </h1>
        <p class="f-text-color">多种先进科技交互体验，精彩纷呈</p>
        <p class="section-underline-blue" />
      </div>
      <!-- 技术种类 -->
      <div class="deploy-flex-box">
        <div class="deploy-flex-son" align="center">
          <img src="/media/icon/education-cion1.png" class="deploy-img" />
          <div>多⼈多设备互动</div>
        </div>
        <div class="deploy-flex-son">
          <img src="/media/icon/education-cion2.png" class="deploy-img" />
          <div>投屏实现</div>
        </div>
        <div class="deploy-flex-son">
          <img src="/media/icon/education-cion3.png" class="deploy-img" />
          <div>同步操作</div>
        </div>
        <div class="deploy-flex-son">
          <img src="/media/icon/education-cion4.png" class="deploy-img" />
          <div>第三⽅视⻆</div>
        </div>
        <div class="deploy-flex-son">
          <img src="/media/icon/education-cion5.png" class="deploy-img" />
          <div>空间定位</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'EducationDeploy',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/screenstyle.scss';
@import '~@/styles/sandtable.scss';
.deploy-flex-box {
  margin-top: 50px;
  margin-bottom: 40px;
  padding: 0 5%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  min-height: 280px;
}
.deploy-flex-son {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  border-radius: 10px;
  width: 170px;
  height: 170px;
  background-color: #d3edf8;
  margin-bottom: 20px;
}
.deploy-img {
  padding: 24px 36px;
}
.deploy-flex-son:hover {
  background-color: #bcdcf8;
}
.deploy-flex-son p {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  margin: 20px auto 16px;
  text-align: center;
  color: red;
}

.deploy-flex-son div {
  text-align: center;
  color: #677990;
}
</style>
