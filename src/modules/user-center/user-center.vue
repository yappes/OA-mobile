<template>
  <div class="user-center">
    <div class="user-info">
      <h1>陈明A6774</h1>
      <p>高级工程师</p>
      <p>北京赞同科技发展有限公司</p>
      <img src="static/images/user-center/user.png">
      <a>添加工作状态
        <span></span>
      </a>
    </div>
    <aui-group>
      <aui-cell :title="item.label" is-link v-for="(item,index) in userList" :key="index">
        <img slot="icon" width="20" style="display:block;margin-right:14px;" :src="item.imgUrl" />{{item.info}}
      </aui-cell>
    </aui-group>
    <aui-group>
      <aui-cell title="设置" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:14px;" src="static/images/user-center/set.png" />
      </aui-cell>
    </aui-group>
    <!-- <aui-button @click="test">测试接口</aui-button> -->
  </div>
</template>

<script>
// import ServicesNames from '@/common/services-manager/services-names.js'
// import {ServicesManager} from 'ab-manager-services'//通讯服务管理器
export default {
  data() {
    return {
      userList: [
        {
          label: "手机",
          imgUrl: "static/images/user-center/phone.png",
          info: "18518040722"
        },
        {
          label: "座机",
          imgUrl: "static/images/user-center/telephone.png",
          info: "0452-2828187"
        },
        {
          label: "邮箱",
          imgUrl: "static/images/user-center/email.png",
          info: "wlczzeq@163.com"
        },
        {
          label: "部门",
          imgUrl: "static/images/user-center/department.png",
          info: "研发部"
        }
      ]
    };
  },
  methods: {
    test() {
      let batchColumn = {
        yslb: 4,
        rq_list: [
          "2018-07-01",
          "2018-07-02",
          "2018-07-03",
          "2018-07-04",
          "2018-07-05",
          "2018-07-06",
          "2018-07-07",
          "2018-07-08"
        ]
      };

      // ServicesManager.getService(
      //   ServicesNames.YSSYFWINTERFACE,
      //   batchColumn
      // ).then(res => {
      //   console.log("YSSYFWINTERFACE", res);
      // });
    }
  },
  mounted() {
    this.$store.state.headTitle = "我的";
    this.$store.state.headBack = false;
    this.$store.state.headAdd = false;
    this.$store.state.showDownMenu = true;
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
</style>
