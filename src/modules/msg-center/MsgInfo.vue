<template>
    <div class="msg-info">
        <aui-panel :list="msgList"
                   type="5"></aui-panel>
    </div>
</template>

<script>
    export default {
        name: "msgInfo",
        data() {
            return {
                pageName: "个人信息",
                queryMsgName: '',
                onFetching: false,
                msgList: [{
                    src: 'static/images/msg-center/notice.png',
                    title: '通知公告',
                    desc: '各位同事：2017年中秋节和国庆节在即，为方便大家及早做好相关安排，根据国务院办公厅通知精神及公司的福利政策，现将中秋节和国庆节的放假安排通知如下：1、放假时间：10月1日 (星期日) —10月8日(星期日)，共8天。2、上班时间：10月9日 (星期一)  正式上班。9月30日（星期六）  上班。预祝大家节日愉快。谢谢。',
                    meta: {
                        date: '20分钟前',
                    }
                },  {
                    src: 'static/images/msg-center/notice.png',
                    title: '通知公告',
                    desc: '[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知[人力],关于五一放假通知',
                    meta: {
                        date: '2018-06-25',
                    }
                }],
            }
        },

        methods: {
            changeMsgData(){
            },
        },
        mounted(){
            if(this.$route.params.msgType==1){
                this.$store.state.headTitle='通知公告';
            }else if(this.$route.params.msgType==2){
                this.$store.state.headTitle='待办';
            }else if(this.$route.params.msgType==3){
                this.$store.state.headTitle='[人力]';
            }else if(this.$route.params.msgType==4){
                this.$store.state.headTitle='审批';
            }else if(this.$route.params.msgType==5){
                this.$store.state.headTitle='考勤';
            }
            this.$store.state.headBack=true
            this.$store.state.headLeftImg='static/images/back.png'
            this.$store.state.headBackLink='/home/msgCenter/'
            this.$store.state.headAdd=false
            this.$store.state.showDownMenu=false
        },

    }
</script>
<style>
.msg-info {
  background: #fafafa;
}
.msg-info .aui-search-bar {
  background: #f5f5f5;
}
.msg-info .aui-search-bar__form {
  height: 30px;
}
.msg-info .aui-search-bar__label {
  top: 2px;
  bottom: 2px;
}
.msg-info .aui-panel {
  margin-top: 0;
}
.msg-info .aui-panel:before {
  border-top: 0;
}
.msg-info .aui-panel__hd {
  padding: 0;
}
.msg-info .aui-panel__hd:after {
  border-bottom: none;
}
.msg-info .aui-panel:after {
  left: 75px;
}
.msg-info .aui-media-box {
  height: auto;
  background: #fafafa 100%;
}

.msg-info .aui-media-box__info {
  height: 20px;
  font-size: 14px;
  background: #e6e6e6;
  border-radius: 8px;
  padding: 5px;
  width: 80px;
  margin-left: 42%;
}
.msg-info .aui-media-box__info__meta {
  width: 0;
  padding-right: 0;
}
.msg-info .aui-media-box__info__meta:nth-of-type(2) {
  width: 100%;
  color: #808080;
  text-align: center;
  line-height: 20px;
}

.msg-info .aui-media-box__title {
  font-size: 14px;
  margin-left: 50px;
  position: absolute;
  margin-top: 10px;
  top: 0;
}
.msg-info .aui-media-box_appmsg .aui-media-box__hd {
  width: 40px;
  height: 40px;
  margin-right: 20px;
  margin-top: 20px;
  position: absolute;
  top: 0;
}
.msg-info .aui-media-box__hd {
  align-items: flex-start;
  text-align: right;
}
.msg-info .aui-media-box__desc {
  background: #ffffff;
  height: 100%;
  width: 80%;
  margin-top: 20px;
  margin-left: 50px;
  font-size: 14px;
}
.msg-info .aui-media-box__thumb {
  margin-top: -8px;
  border-radius: 100px;
}
.msg-info .aui-media-box:before {
  left: 75px;
  border-top: 0px solid #e6e6e6;
}
</style>