// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'

import App from './App'

import './aui-config';
import router from './router' // 相对路径，路由文件
import store from './store'
import axiosConfig from './config'

import ConfirmPlugin from 'AUI/components/plugins/confirm'
Vue.use(ConfirmPlugin)
import $aui from './aui-config/aui-m-config'
Vue.use($aui)
// import { ServicesManager } from 'ab-manager-services' //通讯服务管理器
// import ServicesPlugin from '@/common/services-manager/services-plugin.js' // 每条服务的配置
// import ServicesError from './common/services-manager/services-error.js' // 定义统一错误处理信息的函数
// 在初始化的时候将plugin传入ServicesManager
// Vue.use(ServicesManager, {
//   plugin: ServicesPlugin,
//   errorHandle: ServicesError
// });

Vue.config.productionTip = false
//使用 agreeSDK
import AgreeSDK from "AgreeSDK";
Vue.use(AgreeSDK);

/// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    next()
  } else if (axiosConfig.getToken() === false) {
    next({
      name: 'login',
      replace: true
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.loading = true
    this.$aui.loading.show()
    axiosConfig.loading().then(() => {
      this.loading = false
      this.$nextTick(() => {
        this.$aui.loading.hide()
      })
    })
  },
  render(h) {
    if (!this.loading) {
      return h(App)
    }
    return h('div')
  }
})

AgreeSDK.push.open({
  url: "ws://192.168.187.205:50010/ws/broadcast",
  oid: "gxm",
  data: {

  },
  onOpen() {
    // alert("onOpen");
  },
  onMessage(message) {
    // alert("onMessage: " + message);
    AgreeSDK.notification.addBadgeNumber(10);
    // 发送本地消息
    let msg = AgreeSDK.notification.createMessage({
      title: "aos消息提示",
      content: message,
      data: {
        name: 'push',
        url: 'https://www.baidu.com'
      }
    });
    // 监听点击
    document.addEventListener("PushClick", function (e) {
      AgreeSDK.ui.toast("收到消息：" + JSON.stringify(e.data));
    }, false);

  },
  onClose() {
    alert("onClose");
  },
  onError() {
    alert("onError");
  }
});