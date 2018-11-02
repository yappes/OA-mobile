<template>
  <div class="contacts">
    <aui-header v-if='turnToParent' :title='orgParentName' :showBack="true" :preventGoBack='true' @click-back='back' backText='返回上一级' style="z-index:99;height: 45px;width: 100%;background-color: white;position:fixed;margin-top:-3px">
    </aui-header>
    <aui-search :autoFixed="false"
                v-model="queryMsgName"
                placeholder="按姓名搜索"
                cancel-text="取消"
                @change="changeMsgData"
                v-if="!loading"
                :class='{"without-header":!turnToParent,"with-header":turnToParent}'>
    </aui-search>
    <aui-load-more style='padding-top:45px' v-if="loading" :show-loading="loading" tip="数据加载中，请稍候" background-color="#fbf9fe"></aui-load-more>
    <div v-show='!loading' class="scroller" :style='{"padding-top":turnToParent?"90px":"45px"}'>
      <aui-scroller

        ref="scroller"
        lock-x
        :scrollbar-y="true"
        :height='dataHeight'
        :use-pulldown="true"
        :pulldown-config="pulldownConfig"
        @pulldown-loading="refresh"
        v-model="status"
      >  
        <div>
          <aui-panel :list="msgList" @click-item='parentOrgClick'
                  type="3"></aui-panel>
        <aui-group style='margin-top:20px' v-if='userMsgList.length' title='部门所属人员'>
          <aui-cell v-for='user in userMsgList' :key='user.id' :title='user.realName+"-"+user.accountId' @click='showDetailPage(user)'>
            <div slot='inline-desc' v-if='!queryMsgName' class='inline-desc'>{{`手机号 : ${user.mobile}\n邮箱 : ${user.email}`}}</div>
            <div slot='inline-desc' v-else class='inline-desc'>{{`所属部门 : ${user.orgName||''}\n手机号 : ${user.mobile}\n邮箱 : ${user.email}`}}</div>
            <img slot="icon" width="50" style="display:block;margin-right:5px;" :src='getImgSrc(user)'>
          </aui-cell>
        </aui-group>
        </div>
      </aui-scroller>
    </div>
    <div v-transfer-dom>
      <aui-popup v-model="showDetail" height="100%">
        <div class="popup">
          <aui-popup-header class='header' title="名片信息" :show-bottom-border="false">
            <div style="height: 30px;width: 30px;" slot="left-text" @click="showDetail=false">
                <img src="@/assets/back.png" style="height: 100%;width: 100%;margin-top: 8px">
            </div>
          </aui-popup-header>
            <aui-group>
              <aui-cell :value='userDetailData.realName + "-" + userDetailData.accountId'>
                <img slot="icon" width="60" style="display:block;margin-right:5px;" :src='getImgSrc(userDetailData)'>
              </aui-cell>
            </aui-group>
            <aui-group label-width="5em">
              <aui-cell primary="content">
                <span slot="title" style='font-size:12px'>部门</span>
                <div slot='inline-desc' style='font-size:16px;color:black'>{{userDetailData.orgName}}</div>
              </aui-cell>
              <aui-cell primary="content">
                <span slot="title" style='font-size:12px'>手机号码</span>
                <div slot='inline-desc' style='font-size:16px;color:black'>{{userDetailData.mobile}}</div>
              </aui-cell>
              <aui-cell primary="content">
                <span slot="title" style='font-size:12px'>邮箱</span>
                <div slot='inline-desc' style='font-size:16px;color:black'>{{userDetailData.email}}</div>
              </aui-cell>
            </aui-group>
        </div>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import __ORG_MANAGE__ from "paas-web-utils/rules/organization";
import { userService } from "paas-web-utils/services/index";
import { HTTP_CONFIG } from "paas-web-utils/common/http.js";
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
// let allUserPromise = undefined;
export default {
  name: "msgInfo",
  components:{AuiPopupHeader},
  data() {
    return {
      pageName: "个人信息",
      queryMsgName: "",
      onFetching: false,
      allOrgData:[],//部门数据
      allUserData:[],//用户数据
      turnToParent:false,//是否显示‘返回上一级’按钮
      parentFloor:0,
      parentCode:undefined,//上一级的父级部门编码
      msgList:[],//显示的部门数据
      userMsgList:[],//显示的用户数据
      loading:false,
      old_queryMsg:undefined,
      showDetail:false,
      userDetailData:{},
      orgParentName:'',
      //下拉功能配置
      pulldownConfig: {
        content: "下拉刷新",
        height: 60,
        autoRefresh: false,
        downContent: "下拉刷新",
        upContent: "释放刷新",
        loadingContent: "Loading...",
        clsPrefix: "xs-plugin-pulldown-"
      },
      status: {
        pullupStatus: "disabled",
        pulldownStatus: "default"
      },
      dataHeight:'0'
    };
  },
  computed:{
    allUserPromise() {
      return this.$store.getters["userData/userPromise"];
    },
  },
  mounted() {
    this.dataHeight = document.querySelector('.contacts').offsetHeight-230+'px';
    this.$store.state.headTitle = "通讯录";
    this.$store.state.headBack = false;
    this.$store.state.headAdd = false;
    this.$store.state.showDownMenu = true;
    this.loading = true;
    // if (!allUserPromise) {
    //   this.loading = true;
      // allUserPromise = userService.findUserList({}).then(allUser => {
      //   this.getOrgData();
      //   this.allUserData = allUser;
      //   return allUser;
      // });
    // }else{
      this.allUserPromise.then(allUser=>{
        this.allUserData = allUser;
        this.getOrgData();
      })
    // }
  },
  methods: {
    showDetailPage(user){
      this.userDetailData = user;
      this.showDetail = true;
    },
    changeMsgData() {
      if(this.queryMsgName === this.old_queryMsg)return;
      this.old_queryMsg = this.queryMsgName;
      this.turnToParent = false;
      this.msgList = [];
      this.userMsgList = [];
      if(this.queryMsgName){
        for (const user of this.allUserData) {
          if(user.realName.indexOf(this.queryMsgName)!=-1){
            if(user.orgCode){
              __ORG_MANAGE__.findByCode(user.orgCode).then(data => {
                user.orgName = data?data.orgName:'';
                this.userMsgList.push(user);
              })
            }else{
              this.userMsgList.push(user);
            }
          }
        }
      }else{
        this.getOrgData();
      }
    },
    getOrgData(){
      __ORG_MANAGE__.loading().then(data => {

        //刷新成功后的参数设置
        this.msgList = [];
        this.userMsgList = [];
        this.turnToParent = false;
        this.loading = false;
        this.allOrgData = data;
        this.parentFloor = 0;
        this.parentCode = undefined;
        this.orgParentName = '';
        this.status.pulldownStatus = "default";

        for (const org of data) {
          let userNumber = this.getUserNumber(org.orgCode,1);
          this.msgList.push({
            src: "static/images/contacts/paper-file.png",
            title: userNumber?`${org.orgName}(${userNumber})`:org.orgName,
            key:org.id,
          })
        }
      })
    },
    parentOrgClick(item){
      let vm = this;
      function each(data, floor) {
        data.forEach(e => {
          e.floor = floor;
          if(e.id === item.key){
            vm.msgList = [];
            vm.changeUserList(e.orgCode);
            if(e.children && e.children.length > 0){
              for (const child of e.children) {
                let userNumber = vm.getUserNumber(child.orgCode,floor+1);
                vm.msgList.push({
                  src: "static/images/contacts/paper-file.png",
                  title: userNumber?`${child.orgName}(${userNumber})`:child.orgName,
                  key:child.id,
                  orgGrandParentCode:e.orgParentCode,
                  orgParentCode:e.orgCode,
                })
              }
            }
            vm.orgParentName = e.orgName;
            vm.parentCode = e.orgParentCode;
            vm.parentFloor = floor;
            vm.turnToParent = true;
          }else if (e.children && e.children.length > 0) {
            each(e.children, floor + 1);
          }
        });
      }
      each(this.allOrgData, 1);
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      })
    },
    changeUserList(orgCode){
      // allUserPromise.then(allUser => {
        this.userMsgList=[];
        for (const user of this.allUserData) {
          if(user.orgCode === orgCode){
            __ORG_MANAGE__.findByCode(user.orgCode).then(data => {
              user.orgName = data?data.orgName:'';
              this.userMsgList.push(user);
            })
          }
        }
      // })
    },
    back(){
      let vm = this;
      vm.msgList = [];
      function each(data, floor) {
        data.forEach(e => {
          e.floor = floor;
          if(floor == vm.parentFloor && e.orgParentCode == vm.parentCode){
            let userNumber = vm.getUserNumber(e.orgCode,floor);
            vm.msgList.push({
              src: "static/images/contacts/paper-file.png",
              title: userNumber?`${e.orgName}(${userNumber})`:e.orgName,
              key:e.id,
              orgGrandParentCode:vm.getParentcode(e.orgParentCode),
              orgParentCode:e.orgParentCode,
              
            })
            if(vm.parentFloor == 1){
              vm.turnToParent = false;
            }
          }else if (floor < vm.parentFloor && e.children && e.children.length > 0) {
            each(e.children, floor + 1);
          }
        });
      }
      each(vm.allOrgData, 1);
      vm.changeUserList(vm.msgList[0].orgParentCode);
      __ORG_MANAGE__.findByCode(vm.msgList[0].orgParentCode).then(data => {
        vm.orgParentName = data?data.orgName:'';;
      })
      vm.parentCode = vm.msgList[0].orgGrandParentCode;
      vm.parentFloor--;
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      })
    },
    getParentcode(orgParentCode){
      let res = '';
      function each(data, floor) {
        for (const e of data) {
          if(e.orgCode === orgParentCode){
            res = e.orgParentCode;
            break;
          }else if (e.children && e.children.length > 0) {
            each(e.children, floor + 1);
          }
        }
      }
      each(this.allOrgData, 1);
      return res;
    },
    getImgSrc(user){
      if(!user.headPhoto||typeof user != 'string'){
        return 'static/images/user-center/user.png';
      }
      let url = user.headPhoto;
      let subStr = HTTP_CONFIG.mapping.file;
      let length = subStr.length;
      let index = url.indexOf(subStr);
      if (index > -1) {
        return url.slice(length);
      }
      return url;
    },
    getUserNumber(orgCode,index){
      let num = 0;
      let str = ','+orgCode+',';
      function each(data, floor) {
        let flag = false;
        for (const e of data) {
          if(str.indexOf(','+e.orgParentCode+',')!=-1){
            str = str + e.orgCode + ',';
            if(floor === index)flag=true;
          }
          if (e.children && e.children.length > 0) {
            each(e.children, floor + 1);
          }
          if(flag)break;
        }
      }
      each(this.allOrgData, 1);
      // allUserPromise.then(allUser => {
        for (const user of this.allUserData) {
          if(str.indexOf(','+user.orgCode+',')!=-1){
            num++
          }
        }
      // })
      return num;
    },
    refresh() {
      this.queryMsgName = '';
      this.allUserPromise.then(allUser=>{
        this.allUserData = allUser;
        this.getOrgData();
      })
    },
  },
};
</script>
<style lang='less'>
.contacts {
    // margin-bottom: 50px;
    .aui-header-title{
      color:#444
    }
    .aui-header-left{
      .aui-header-back{
        padding-left: 0px;
      }
      .left-arrow{
        left:-12px;
        &::before{
          left:0px
        }
      }
    }
}
.contacts .aui-search-bar {
  background: #f5f5f5;
}
.contacts .aui-search-bar__form {
  height: 30px;
}
.contacts .aui-search-bar__label {
  top: 2px;
  bottom: 2px;
}
.contacts .aui-panel {
  margin-top: 0;
}
.contacts .aui-panel__hd {
  padding: 0;
}
.contacts .aui-cells:after {
  left: 75px;
}
.contacts .aui-panel:after {
  border: none;
}
.contacts .aui-media-box_small-appmsg img {
  width: 35px !important;
  height: 35px;
  margin-right: 25px !important;
}
.contacts .aui-cell:before {
  left: 75px;
  border-top: 1px solid #e6e6e6;
}
.inline-desc {
  font-size: 12px;
  color: #666;
  white-space: pre;
}
.header {
  /deep/ .aui-popup-header-left {
      color:white
  }
  /deep/ .aui-popup-header-title {
      color:white
  }
  /deep/ .aui-popup-header-right {
      width:32px
  }
}
.without-header {
  padding-top:0;
  margin-top: -1px;
  position: fixed !important;
  z-index:98
}
.with-header {
  padding-top:43px;
  margin-top: -1px;
  position: fixed !important;
  z-index:98
}
</style>
