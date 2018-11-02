<template>
  <div class="loan-issue">
    <aui-group>
      <aui-popup-picker v-for="(item,index) in labelFirst"
                        :key="index"
                        v-model="item.value"
                        :title="item.name"
                        :data="item.labelList"
                        placeholder="请选择">
      </aui-popup-picker>
    </aui-group>
    <p class="reiMoneyInfo">预算总额：¥1,000.00，剩余报销额：¥800.00</p>
    <aui-group>
      <aui-input title="借款金额"
                 placeholder="输入金额"
                 text-align="right">
      </aui-input>
      <aui-popup-picker v-model="selType"
                        title="借款类型"
                        :data="[['个人借款','押金借款']]"
                        placeholder="请选择">
      </aui-popup-picker>
      <aui-popup-picker v-model="selGlobal"
                        title="费用目标"
                        :data="[['项目费用','团建费用']]"
                        placeholder="请选择">
      </aui-popup-picker>
    </aui-group>
    <aui-group>
      <aui-cell title="照片">
        <img slot="default"
             src="static/images/new-issue/camera.png" />
      </aui-cell>
    </aui-group>
    <aui-group>
      <aui-textarea title="借款事由"
                    placeholder="请输入报销事由"></aui-textarea>
    </aui-group>
    <div class="foot-btn">
      <aui-button type="primary"
                  @click="submitList">提交
      </aui-button>
      <aui-button @click="submitList">保存草稿</aui-button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      nameList:[['部门费用预算','销售费用预算','项目费用预算','售前费用预算']],
      selType:[],
      selGlobal:[],
      labelFirst:[{"name":"预算分类","value":[],"labelList":[['应用项目预算','研发项目预算','其他项目预算']]},
      {"name":"预算类型","value":[],"labelList":[['部门年度费用预算','其他项目预算']]},
      {"name":"预算名称","value":[],"labelList":[['xx项目']]},
      {"name":"支持形式","value":[],"labelList":[['对私转账','领取现金','支票']]}],
    };
  },
  mounted() {
    this.$store.state.headTitle = '借款申请';
    this.$store.state.headBack = true;
    this.$store.state.headAdd = false;
    this.$store.state.headBackLink = '/home/workbench';
    this.$store.state.showDownMenu = false;
  },

  methods: {
    submitList(){
      /*   this.$aui.toast.show({
       type: "text",
       text: '发票号不能为空',
       })*/
        this.$aui.loading.show({
            text: "正在提交中"
        })
        setTimeout(() => {
            this.$aui.loading.hide()
            let dialogList = [{
                src: 'static/images/success.png',
                title: "提交成功",
                desc: '确认后返回消息列表',
            }];
            this.$store.state.dialogList = dialogList;
            this.$store.state.dialogLink = '/home/msgCenter';
            this.$store.state.showDialog = true;
            this.$store.commit("setSelectedTabbarItem", 0);
        }, 2000)
    }
  }
};
</script>

<style scoped>
  .foot-btn {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    display: flex;
    height: 42px;
  }

  .foot-btn button {
    border-radius: 0;
    flex: 1;
  }
.loan-issue {
  width: 100%;
  height: 120%;
  padding-bottom: 55px;
  background: #fafafa;
}
.loan-issue img {
  width: 24px;
  height: 24px;
}
.reiMoneyInfo {
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  color: #c8c8c8;
  letter-spacing: 0;
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.label-list {
  margin-bottom: 26px;
}
.label-list > h4 {
  margin-left: 15px;
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 8px;
}
</style>
<style>
.label-list .aui-group:first-of-type .aui-cells {
  margin-top: 0;
}
.loan-issue .aui-cells {
  margin-top: 15px;
}
.loan-issue .aui-cells:before {
  border-top: 0;
}
.loan-issue .aui-cells:after {
  border-bottom: 0;
}
.loan-issue .aui-btn:after {
  border: none;
}
.loan-issue .aui-btn + .aui-btn {
  margin-top: 0;
}
.loan-issue .aui-btn:after {
  border: none;
}
</style>
