<template>
  <div class="login">
    <img src="static/images/login/logo.png" />
    <aui-input placeholder="请输入登录账号" v-model="username"></aui-input>
    <aui-input placeholder="登录密码" :type="inputType" :show-clear="false" v-model="userpsw">
      <img slot="right" :src="isPsw?'static/images/login/psw-open.png':'static/images/login/psw-close.png'" @click="inputType=='password'?inputType='text':inputType='password',isPsw=!isPsw" />
    </aui-input>
    <aui-button type="primary" @click="getLogin" :loading="loadbtn" :disabled="username!==''&&userpsw!==''?false:true" :text="loginText"></aui-button>
    <p>版权所有 ©️ 赞同科技 SINCE 1993</p>
    <div v-transfer-dom>
      <aui-popup v-model="dialogVisible" height="100%">
        <aui-grid :cols="4">
          <aui-grid-item v-for="app in appList" :key="app.appKey" @click.native="settingEntApp(app)">
            <template v-if="app.logo">
              <img slot="icon" :src="app.logo">
            </template>
            <template v-else>
              <img slot="icon" src="@/assets/app-logo.png">
            </template>
            <span slot="label">{{app.name}}</span>
          </aui-grid-item>
        </aui-grid>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import axios from "paas-web-utils/common/http";
import axiosConf from "../config.js";

export default {
  data() {
    return {
      isPsw: true,
      loadbtn: false,
      dialogVisible: false,
      loginText: "登录",
      appList: [],
      inputType: "password",
      username: "mamingyang@aos",
      userpsw: "123456"
    };
  },
  methods: {
    getEntApp() {
      axios.getEntApp().then(res => {
        this.appList = res;
        if (res.length === 1) {
          this.settingEntApp(res[0])
        } else {
          this.$nextTick(() => {
            this.dialogVisible = true;
          });
        }
      })
    },
    settingEntApp(app) {
      window.sessionStorage.setItem('paas:cloud:platform:appKey', app.appKey)
      axiosConf.reload();
      this.dialogVisible = false;
      this.$router.push("/home/workbench");
    },
    getLogin() {
      let vm = this;
      vm.loadbtn = true;
      vm.loginText = "登录中";
      // vm.$router.push("/home/workbench") //展示屏蔽接口
      let username = this.username.split("@");
      axios.login({
          entAccount: username[1],
          username: username[0],
          password: this.userpsw
        }).then(
          res => {
            vm.loadbtn = false;
            vm.loginText = "登录";
            this.getEntApp();
          },
          error => {
            vm.loadbtn = false;
            vm.loginText = "登录";
            let message = "用户名或密码错误";
            if (error.data && error.data.error_description) {
              message = error.data.error_description;
            } else if (error.data && error.data.message) {
              message = error.data.message;
            }
            vm.$aui.toast.show({
              text: message,
              type: "warn"
            });
          }
        );
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.login > img {
  display: block;
  width: 50%;
  margin: 76px auto;
}

.login p {
  width: 200px;
  text-align: center;
  font-size: 10px;
  position: fixed;
  bottom: 35px;
  left: 50%;
  margin-left: -100px;
}
</style>
<style>
.login .aui-cell {
  margin: 8px 32px;
}

.login .aui-cell:before {
  border-top: 0;
  border-bottom: 1px solid #dcdcdc;
  bottom: 0;
  top: inherit;
  right: 15px;
}

.login button {
  width: 80%;
  margin-top: 44px;
}

.login .aui-icon-clear {
  height: 24px;
  color: rgba(0, 0, 0, 0);
  background: url("../../static/images/login/delete.png") 100% 100%/24px 24px
    no-repeat;
}

.login .aui-cell__ft img {
  width: 24px;
  height: 24px;
}

.login .aui-btn_loading.aui-btn_primary {
  background: #33c3cf;
}

.login .aui-btn_loading.aui-btn_primary,
.aui-btn_loading.aui-btn_warn {
  color: #ffffff;
}

.pui-app-list___item__text {
  vertical-align: middle;
  width: 100vh;
  height: 146px;
  text-align: center;
  white-space: nowrap;
  font-weight: bold;
  font-size: 25px;
  position: relative;
  display: table-cell !important;
  line-height: 1;
  background-color: #00bcd4;
  color: rgba(255, 255, 255, 0.87);
}

.pui-app-list___item-thumbnail {
  width: 100vh;
  height: 146px;
}
</style>


