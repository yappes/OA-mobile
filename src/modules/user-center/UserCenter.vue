<template>
  <div class="user-center">
    <!-- <div class="user-info">
      <h1>陈明A6774</h1>
      <p>高级工程师</p>
      <p>北京赞同科技发展有限公司</p>
      <img src="static/images/user-center/user.png">
      <a>添加工作状态
        <span></span>
      </a>
    </div> -->
    <aui-group>
      <aui-cell title="头像" is-link @click.native='actionSheetShow=true'>
        <img width="40" style="display:block;margin-right:14px;" :src="realHeadPhoto" />
      </aui-cell>
    </aui-group>

    <aui-group>
      <aui-cell title="姓名" >
        {{userName}}
      </aui-cell>
    </aui-group>

    <aui-group>
      <aui-cell :title="userInfo.email.label" is-link @click.native='clickCell(userInfo.email)'>
        {{userInfo.email.value}}
      </aui-cell>
      <aui-cell :title="userInfo.mobile.label" is-link @click.native='clickCell(userInfo.mobile)'>
        {{userInfo.mobile.value}}
      </aui-cell>
      <aui-cell :title="userInfo.sex.label" is-link @click.native='clickCell(userInfo.sex)'>
        {{sex}}
      </aui-cell>
      <aui-cell :title="userInfo.entName.label" >
        {{userInfo.entName.value}}
      </aui-cell>
      <aui-cell is-link @click.native='clickCell(userInfo.userDesc)' >
        <!-- {{userInfo.userDesc.value}} -->
        <p slot='title' class='desc-title'>{{userInfo.userDesc.label}}</p>
        <p slot='default' class='desc-value'>{{userInfo.userDesc.value}}</p>
      </aui-cell>
    </aui-group>

    <aui-group>
      <aui-cell title="修改密码" is-link @click.native='passwordPopupShow=true'>
      </aui-cell>
    </aui-group>

  <user-center-popup v-model='popupShow' :data='editCell' :detailData='detailData' @refresh='loadingData'></user-center-popup>
  <password-popup v-model='passwordPopupShow'></password-popup>
  <aui-actionsheet v-model="actionSheetShow" :menus="actionSheetMenu" @click-menu="clickActionSheetMenu"  show-cancel ></aui-actionsheet>

  </div>
</template>

<script>
import loginUser from "paas-web-utils/services/login-user";
import {userService} from "paas-web-utils/services";
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import deptSelection from '@/components/dept-selection/dept-selection'
import UserCenterPopup from './user-center-popup'
import passwordPopup from './password-popup'
export default {
  components: {
    AuiPopupHeader,
    deptSelection,
    UserCenterPopup,
    passwordPopup
  },
  data() {
    return {
      popupShow: false,
      actionSheetShow: false,
      passwordPopupShow: false,
      userId: null,
      editCell: null,
      detailData: null,
      headPhoto: null,
      userName: '默认姓名',
      userInfo: {
        email: {
          prop: 'email',
          label: "邮箱地址",
          value: null,
          type: 'input',
          rules: [{
            type: 'custom',
            test: /.+@.+\..+/,
            message: '邮箱格式错误'
          }]
        },
        mobile: {
          prop: 'mobile',
          label: "手机号",
          value: null,
          type: 'input',
          rules: [{
            type: 'custom',
            test: /^1[34578]\d{9}$/,
            message: '手机号码格式错误'
          }]
        },
        sex: {
          prop: 'sex',
          label: "性别",
          value: null,
          type: 'radio',
          options: [{
            value: 1,
            label: '男',
          }, {
            value: 2,
            label: '女',
          }],
          rules: [{
            required: true,
            message: '选项不能为空'
          }]
        },
        entName: {
          prop: 'entName',
          label: "部门",
          value: null,
          type: 'deptSelection',
          rules: [{
            required: true,
            message: '部门不能为空'
          }]
        },
        userDesc: {
          prop: 'userDesc',
          label: '描述',
          value: null,
          type: 'textarea',
        }
      },
      actionSheetMenu: [{
        type: 'primary',
        label: '拍照',
        value: 'captureImage'
      }, {
        type: 'primary',
        label: '从相册中选取',
        value: 'chooseImage'
      }]
    }
  },
  computed: {
    sex() {
      if(!this.userInfo.sex.value) {
        return null
      }
      let map = {
        '1': '男',
        '2': '女',
      }
      return map[this.userInfo.sex.value]
    },
    realHeadPhoto() {
      if(!this.headPhoto) {
        return 'static/images/user-center/user.png'
      }
      //TODO:添加实际头像
      console.log('用户头像', this.headPhoto)
      return 'static/images/user-center/user.png'
    }
  },
  methods: {
    loadingData() {
      userService.findDetail().then(data => {
        console.log('detail data',  data)
        this.userId = data.id
        this.detailData = data
        this.userInfo.email.value = data.email
        this.userInfo.mobile.value = data.mobile
        this.userInfo.sex.value = data.sex
        this.userInfo.entName.value = data.entName
        this.userInfo.userDesc.value = data.userDesc
        this.userName = data.realName
        this.headPhoto = data.headPhoto
      })
    },
    userDetail({
        userId,
        userCode,
    }) {
      return userService.userDetail({
        userId,
        extCode: null,
        accountId: null,
        userCode,
      })
    },
    clickCell(item) {
      this.editCell = item
      this.popupShow = true
    },
    changePassword() {
      this.popupShow = true
    },
    handlerImage(key) {
      console.log(key)
      AgreeSDK.image[key]({
        success: (path) => {
          console.log(path)
          this.message = path;
          this.picture = path;
        },
        fail: (e) => {
          this.message = e.message;
        }
      })
    },
    clickActionSheetMenu(menuKey, menuItem) {
      this.handlerImage(menuKey)
    }
  },
  mounted() {
    this.$store.state.headTitle = "我的";
    this.$store.state.headBack = false;
    this.$store.state.headAdd = false;
    this.$store.state.showDownMenu = true;
    this.loadingData()
  }
};
</script>

<style scoped>
.user-center {
  width: 100%;
  overflow: hidden;
}
.user-info {
  width: 90%;
  margin: 22px auto;
  border-radius: 8px;
  position: relative;
  background: white;
  border: 1px solid #f6f6f6;
  box-shadow: 2px 2px 1px #f6f6f6;
}
.user-info h1 {
  padding-left: 18px;
  margin-top: 24px;
  font-weight: normal;
  font-size: 24px;
  color: #444444;
}
.user-info p {
  padding-left: 18px;
  color: #808080;
}
.user-info p:first-child {
  font-size: 10px;
}
.user-info p:nth-child(3) {
  font-size: 15px;
  margin-top: 40px;
  margin-bottom: 6px;
}
.user-info img {
  position: absolute;
  right: 18px;
  top: 18px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user-info a {
  display: block;
  padding-left: 18px;
  border-top: 1px solid #f6f6f6;
  color: #cacaca;
  line-height: 40px;
  font-size: 12px;
}
.user-info a span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  width: 22px;
  height: 22px;
  background: url("../../../static/images/user-center/edit.png") 100% 100%/100%
    100%;
}

.user-center .aui-cell:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  color: #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  margin-left: 10%;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
.user-center .aui-cell:last-child:after {
  border-bottom: 0;
}
</style>
<style>
.user-center .aui-cells:before {
  border-top: 0;
}
.user-center .aui-cells:after {
  border-bottom: 0;
}
.user-center .aui-cell:before {
  border-top: 0;
}
.desc-title {
  min-width: 50px;
  /* margin-right: 10px; */
}
.desc-value {
  text-align: left; 
}
</style>
