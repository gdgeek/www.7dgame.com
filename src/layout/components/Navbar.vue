<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="right-menu-item">
            <!-- {{ $store.state.user.data.nickname }} -->
            {{ nickname }}
          </div>
          <el-avatar :src="avatar" shape="square">
            <img src="@/assets/image/null.png" />
          </el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/home/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <router-link to="/settings/account">
            <el-dropdown-item>账号设置</el-dropdown-item>
          </router-link>

          <router-link to="/">
            <el-dropdown-item>帮助支持</el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout()">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'userData']),
    avatar() {
      if (typeof this.userData.avatar === 'undefined') {
        return ''
      }
      return this.userData.avatar.url
    },
    nickname() {
      if (
        typeof this.userData.nickname === 'undefined' ||
        this.userData.nickname === null
      ) {
        return this.userData.username
      }

      return this.userData.nickname
    }
  },
  created() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$router.push('/site/logout')
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/site?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
