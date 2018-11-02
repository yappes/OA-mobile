<template>
  <div class="reim-detail">

    <aui-panel :list="list"
               type="1">
    </aui-panel>
    <div class="detail-info">
      <div class="base-info">
        <p v-for="(item,index) in baseList"
           :key="index">
          <span>{{item.label}}</span>{{item.info}}</p>
      </div>
      <div class="detail-index"
           v-for="(item,index) in detailList"
           :key="index">
        <h4>报销明细（{{index+1}}）</h4>
        <p v-for="(items,index) in item"
           :key="index">
          <span>{{items.label}}</span>{{items.info}}</p>
      </div>
    </div>
    <aui-step v-model="step2"
              gutter="20px">
      <h3>报销-审批进度</h3>
      <aui-step-item v-for="(item,index) in stepList"
                     :key="index"
                     :title="item.label"
                     :description="item.time">
      </aui-step-item>
    </aui-step>

    <aui-button type="primary"
                class="agree-button">同意</aui-button>
    <aui-button>驳回</aui-button>

  </div>
</template>

<script>
export default {
data(){
    return{
        list: [{
        src: 'static/images/pic.png',
        title: '张三丰 A2048',
        desc: '待我审批',
      }],
      footer: {
        title: '2017-7-21',
      },
      baseList:[
          {"label":"审批列表","info":"BX20170721-001"},
          {"label":"所在部门","info":"移动金融事业部"},
          {"label":"个人银行账号","info":"6222020902006289901"},
          {"label":"预算名称","info":"赞同aos移动运营管理平台"},
          {"label":"预算总额","info":"1000.00元"},
          {"label":"可报销金额","info":"600.00元"},
      ],
      detailList:[[{"label":"审批列表","info":"BX20170721-001"},
          {"label":"所在部门","info":"移动金融事业部"},
          {"label":"个人银行账号","info":"6222020902006289901"},
          {"label":"预算名称","info":"赞同aos移动运营管理平台"},
          {"label":"预算总额","info":"1000.00元"},
          {"label":"可报销金额","info":"600.00元"}]],
      stepList:[{"label":"张一峰","time":""},{"label":"张丹峰","time":"2小时前处理"},{"label":"张三峰","time":"等待4小时"}],
      step2:1
    }
},
    mounted(){
        this.$store.state.headTitle='报销详情'
        this.$store.state.headBack=true
        this.$store.state.headAdd=false
        this.$store.state.headBackLink='/home/expenseAccount'
        this.$store.state.showDownMenu=false
    },

}
</script>

<style scoped>
.reim-detail {
  width: 100%;
  margin-top: 4px;
  background: #fafafa;
}
.detail-info {
  width: 100%;
  background: white;
}
.base-info {
  padding-top: 8px;
}
.base-info,
.detail-index p {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  color: #444444;
}
.base-info > p span,
.detail-index > p span {
  display: inline-block;
  width: 84px;
  margin-right: 11px;
  color: #808080;
}
.detail-index h4 {
  font-weight: normal;
  font-size: 12px;
  margin-top: 28px;
  padding-left: 15px;
  margin-bottom: 16px;
  color: #444444;
}
</style>
<style>
.reim-detail .aui-panel:before {
  border-top: 0;
}
.reim-detail .aui-media-box__desc {
  color: #ff2d2d;
}
.reim-detail .aui-panel__ft {
  position: absolute;
  right: 0;
  top: 25%;
}
.reim-detail .aui-cell:before {
  border-top: 0;
}
.reim-detail .aui-panel:after {
  margin-left: 5%;
}
.reim-detail .aui-media-box__hd img {
  border-radius: 50%;
}
.reim-detail .aui-cell__bd {
  color: #808080;
}
.reim-detail .aui-panel__hd {
  padding: 0;
}
.reim-detail .aui-step {
  display: inherit;
  background: white;
  margin-top: 12px;
  padding-left: 26px;
  margin-bottom: 50px;
}
.reim-detail .aui-step h3 {
  padding-bottom: 10px;
  margin-left: -9px;
  padding-top: 18px;
}
.reim-detail .aui-step-item {
  height: 46px;
  display: block;
}
.reim-detail .aui-step-item-tail {
  width: 1px;
  height: 20px;
  left: 7.5px;
  top: 21px;
}
.reim-detail .aui-step-item-head .aui-step-item-head-inner {
  width: 15px;
  height: 15px;
}
.reim-detail .aui-step-item-icon {
  display: none;
}
.reim-detail .aui-step-item-main {
  width: 85%;
  height: 15px;
  line-height: 15px;
}
.reim-detail .aui-step-item-head-finish .aui-step-item-head-inner {
  border: none;
  background: #33c3cf;
}
.reim-detail .aui-step-item-tail-finish {
  background: #33c3cf;
}
.reim-detail .aui-step-item-head-wait .aui-step-item-head-inner {
  background: #d8d8d8;
  border: none;
}
.reim-detail .aui-step-item-head-process .aui-step-item-head-inner {
  background: url('../../../static/images/pic.png') 100% 100%/100% 100%;
  border: none;
}
.reim-detail .aui-step-item-description {
  float: right;
  font-size: 12px;
}
.reim-detail button.aui-btn,
input.aui-btn {
  float: left;
  width: 50%;
  border-radius: 0;
  position: fixed;
  bottom: 0;
  left: 50%;
}
.reim-detail .aui-btn + .aui-btn {
  margin-top: 0;
}
.reim-detail .aui-btn:after {
  border: 0;
}
.reim-detail .agree-button {
  left: 0 !important;
}
</style>
