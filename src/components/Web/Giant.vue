<template>
  <div class="portal-main-background">
    <div class="content" align="right">
        <h3 class="text">混合现实编程平台 </h3>
        <h1 class="text">让每个人都可以快乐地创造世界</h1>
        <el-button @click="goto('/site/index')"  type="primary">登入平台</el-button>
        <el-button @click="goto('/web/download')" >相关下载</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Giant',

  data() {
    return {}
  },
  methods:{
    goto(path){
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.portal-main-background {
  width: 100%;
  height: 300px;
  background: url('/media/bg/hololens.jpg') center no-repeat;
  background-size: cover;
  // background-size: 100%;
}

.text{
  color:whitesmoke
}
.content{
  padding-right: 50px;
  padding-top: 50px;
  padding-left: 50px;
  float:right;
}
</style>
