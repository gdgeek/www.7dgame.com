<template>
  <mr-p-p-site>
    <div class="module-head font-text">
      <h1 class="module-welcome">欢迎!</h1>
      <h4>准备好出发了么？</h4>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane name="login" label="账户密码登录">
          <mr-p-p-login>账户密码登录</mr-p-p-login>
        </el-tab-pane>
        <el-tab-pane
          v-if="env.canRegister()"
          name="qrcode"
          label="微信扫码（登陆/注册）"
        >
          <mr-p-p-qrcode :active="qrcode">微信扫码进入</mr-p-p-qrcode>
        </el-tab-pane>
      </el-tabs>
    </div>
  </mr-p-p-site>
</template>

<script>
import '@/assets/font/font.css'
import environment from '@/environment.js'
// @ is an alias to /src
import MrPPSite from '@/components/MrPP/MrPPSite'
import MrPPLogin from '@/components/MrPP/MrPPLogin'
import MrPPQrcode from '@/components/MrPP/MrPPQrcode'
export default {
  name: 'ModuleIndex',
  components: {
    MrPPSite,
    MrPPLogin,
    MrPPQrcode
  },
  data() {
    return {
      activeName: 'login'
    }
  },
  computed: {
    env() {
      return environment
    },
    qrcode() {
      return this.activeName === 'qrcode'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.module-head {
  padding: 10px 10px 10px 10px;
  max-width: 100%;
}

.module-title {
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  text-align: center;
  color: #666;
}

.module-welcome {
  margin-top: 0px;
  font-size: 36px;
  color: #666;
}

.module-text {
  font-size: 20px;
  font-weight: lighter;
  color: #666;
}

.module-link {
  margin-top: 10px;
}
.module-link a {
  color: rgb(28, 160, 212);
  font-size: 16px;
  line-height: 22px;
}

.module-body {
  padding-top: 14px;
  height: 100%;
  max-width: 100%;
  padding: 10px 10px 20px 10px;
}

.module-hint {
  font-size: 14px;
  font-weight: lighter;
  color: #666;
  font-weight: bold;
}

.module-qrcode {
  margin-top: 2px;
  padding: 6px;
  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(213, 216, 216);
}
</style>
