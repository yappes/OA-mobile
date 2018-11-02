import Vue from 'vue'
import aui from './aui-config/aui-m-config'
import axios from 'paas-web-utils/common/http';

const httpConf = {
  profile: process.env.NODE_ENV || 'development',
  development: 'http://139.198.3.73:8088/',
  production: 'http://139.198.3.73:8088/',
}

const confirmSessionnTimeout = function () {
  // confirmSessionnTimeout.status = true
  // let $aui = Vue.prototype.$aui;
  // return $aui.confirm.show(`会话超时，请重新登录.`, ' 提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'error'
  // }).then(() => {
  //   window.location.href = 'login.html'
  // }).finally(function () {
  //   confirmSessionnTimeout.status = false
  // })
}

const installAxios = function () {
  const appKey = window.sessionStorage.getItem('paas:cloud:platform:appKey')
  return {
    profile: httpConf.profile,
    baseURL: httpConf[httpConf.profile],
    mapping: {
      'platform': `rpcServer/afa4j/${appKey}/`, //业务服务
      'user': `rpcServer/user/${appKey}`, //当前用户
      'workflow': `workflow/`, //工作流
      'file': `zuul/file/`, //文件上传
      'message': `message/` // 消息
    },
    statusCode: {
      401: function (resp) {
        // 删除无效应用Key
        window.sessionStorage.removeItem('paas:cloud:platform:appKey')
        if (!confirmSessionnTimeout.status) {
          confirmSessionnTimeout()
        }
      },
      404: function (resp) {
        let $aui = Vue.$aui;
        console.error(`请求接口\`${resp.config.url}\`,不存在.`)
        $aui.toast.show({
          type: 'warn',
          // title: '错误',
          text: `服务接口不存在，F12查看详情请`
        });
      },
      500: function (resp) {
        console.log('resp', resp)
        let message = typeof resp.data === "object" ? resp.data.message : resp.message;
        console.log('message', message)
        let $aui = Vue.$aui;
        console.log('$aui', $aui)
        $aui.toast.show({
          type: 'warn',
          // title: '错误',
          text: message
        });
      }
    }
  }
}


//注册axios
Vue.use(axios, installAxios());


export default {
  loading() {
    return axios.getURL('platform://')
  },
  reload() {
    axios.reinstall(installAxios())
  },
  getToken() {
    return axios.getToken()
  }
}