<template>
    <div class="approve">
        <aui-flexbox orient="vertical"
                     :gutter="0">
            <aui-flexbox-item>
                <aui-expansion :hideOnBlur="false"
                               v-model="expansion"
                               tip="全部">
                    <aui-flexbox>
                        <aui-flexbox-item :span="1/5"></aui-flexbox-item>
                        <aui-flexbox-item :span="3/5">
                            <aui-button-tab v-model="changeHeadType">
                                <aui-button-tab-item>待我审批</aui-button-tab-item>
                                <aui-button-tab-item>我申请的</aui-button-tab-item>
                            </aui-button-tab>
                        </aui-flexbox-item>
                        <aui-flexbox-item>
                        </aui-flexbox-item>
                    </aui-flexbox>
                    <div slot="content"
                         class="checkerBox">
                        <aui-checker v-model="checkerType"
                                     default-item-class="checker-item"
                                     selected-item-class="checker-item-selected">
                            <aui-checker-item :value="index"
                                              v-for="(item, index) in checkerList"
                                              :key="index">{{item.value}}</aui-checker-item>
                        </aui-checker>
                    </div>
                </aui-expansion>
            </aui-flexbox-item>

            <aui-flexbox-item>
                <aui-tab active-color="#33C2CF"
                         bar-active-color="#FFFFFF">
                    <aui-tab-item selected
                                  @item-click="changeType=1">
                        全部
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=2"
                                  v-if="changeHeadType==0">
                        审批中
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=2"
                                  v-if="changeHeadType==1">
                        草稿
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=3">
                        同意
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=4">
                        不同意
                    </aui-tab-item>
                </aui-tab>
            </aui-flexbox-item>
            <aui-flexbox-item>

            </aui-flexbox-item>
            <aui-flexbox-item>
                <aui-scroller lock-x
                              scrollbar-y
                              use-pullup
                              use-pulldown
                              @pullup-loading="loadMore"
                              @pulldown-loading="refresh"
                              v-model="status"
                              ref="scroller"
                              height="580px">
                    <div class="box2">
                        <aui-panel v-for="(item,index) in expenseAccountList"
                                   :key="index"
                                   :list="item"
                                   type="5">
                            <div slot="header"
                                 class="head-info">
                                <img src="static/images/me_sel.png" />
                                <span>张丹峰 A2018</span>
                                <span>审批中</span>
                            </div>
                        </aui-panel>
                    </div>
                    <!-- <div slot="pullup"
                         class="xs-plugin-pullup-container xs-plugin-pullup-up"
                         style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                        <span v-show="status.pullupStatus === 'default'"></span>
                        <span class="pullup-arrow"
                              v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'"
                              :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
                        <span v-show="status.pullupStatus === 'loading'"></span>
                    </div> -->
                </aui-scroller>
            </aui-flexbox-item>
        </aui-flexbox>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                changeType: '',
                changeHeadType: 0,
                expansion: false,
                checkerType:0,
                expenseAccountList: [[{
                    src: 'static/images/msg-center/notice.png',
                    title: '通知公告',
                    desc: '[人力],关于五一放假通知',
                    url: '/home/detailPage',
                    meta: {
                        date: '20分钟前',
                    }
                }], [{
                    src: 'static/images/msg-center/backlog.png',
                    title: '待办',
                    desc: '[人力],关于五一放假通知',
                    url: {
                        path: '/component/radio',
                        replace: false
                    },
                    meta: {
                        date: '20分钟前',

                    }
                }], [{
                    src: 'static/images/msg-center/email.png',
                    title: '张丹峰-A2048',
                    desc: '[人力]关于五一放假通知',
                    url: {
                        path: '/component/radio',
                        replace: false
                    },
                    meta: {
                        date: '20分钟前',

                    }
                }], [{
                    src: 'static/images/msg-center/approval.png',
                    title: '审批',
                    desc: '[人力],关于五一放假通知',
                    url: {
                        path: '/component/radio',
                        replace: false
                    },
                    meta: {
                        date: '20分钟前',

                    }
                }], [{
                    src: 'static/images/msg-center/attence.png',
                    title: '考勤',
                    desc: '[人力],关于五一放假通知',
                    url: {
                        path: '/component/radio',
                        replace: false
                    },
                    meta: {
                        date: '20分钟前',

                    }
                }]],

                n: 10,
                n1: 10,
                pullupEnabled: true,
                status: {
                    pullupStatus: 'default',
                },
                checkerList:[{'value':'全部'},{'value':'请假'},{'value':'出差'},{'value':'报销'},{'value':'借款'},{'value':'还款'},{'value':'研发'},{'value':'项目'},]
            }
        },
        watch: {
            changeType(){
                this.queryList()
            },
            changeHeadType(){
                this.queryList()
            },
            checkerType(){
                this.queryList()
            }
        },
        mounted () {
            this.changeType = 1;
            this.changeHeadType = 0;
            this.$store.state.headTitle = '审批';
            this.$store.state.headBack = true
            this.$store.state.headAdd = false
            this.$store.state.headBackLink = '/home/workbench'
            this.$store.state.showDownMenu = false
        },
        methods: {
            queryList(){
                console.log("状态一："+this.changeHeadType+"///   状态二："+this.changeType+"///   状态三："+this.checkerType)
            },
            goReimburse(){
                this.$router.push("/home/detailPage")
            },
            loadMore () {
                console.log("loadMore start")
                setTimeout(() => {
                    setTimeout(() => {
                        this.expenseAccountList = this.expenseAccountList.concat(this.expenseAccountList)
                        this.$refs.scroller.donePullup()
                        console.log("loadMore over")
                    }, 10)
                }, 2000)
            },
            refresh () {
                console.log("refresh start")
                setTimeout(() => {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.scroller.donePulldown()
                            this.pullupEnabled && this.$refs.scroller.enablePullup()
                            console.log("refresh over")
                        }, 10)
                    })
                }, 2000)
            },

        }
    }
</script>

<style lang="less" scoped>
.box2-wrap {
  //   overflow: hidden;
  background-color: #fafafa;
}

.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}

.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}

.head-info img {
  width: 24px;
  height: 24px;
  margin-right: 13px;
  vertical-align: middle;
}

.head-info span {
  display: inline-block;
  font-size: 12px;
  color: #808080;
}

.head-info span:nth-of-type(2) {
  float: right;
}
.checkerBox {
  height: 190px;
  width: 100%;
  vertical-align: middle;
  display: table-cell;
}
.checker-item {
  font-family: SourceHanSansCN-Normal;
  font-size: 17px;
  width: 25%;
  border: 1px solid #e6e6e6;
  text-align: center;
  margin-left: 25px;
  margin-top: 20px;
  height: 40px;
  background: #e6e6e6;
  border-radius: 10px;
  line-height: 40px;
  color: #808080;
}
.checker-item-selected {
  border: 1px solid #33c3cf;
  background: #33c3cf;
  color: #ffffff;
}
</style>
<style>
.approve .aui-panel {
  margin-top: 15px;
}

.approve .aui-panel:before {
  border-top: 0;
}

.approve .aui-panel:after {
  border-bottom: 0;
}

.approve .aui-panel__hd:after {
  left: 0;
}

.approve .aui-media-box__info {
  position: absolute;
  right: 18px;
  top: 20px;
  height: 12px;
  font-size: 12px;
  text-align: right;
}

.approve .aui-media-box__info__meta {
  width: 0;
  padding-right: 0;
}

.approve .aui-media-box__info__meta:nth-of-type(2) {
  width: 50px;
  color: #808080;
}

.approve .aui-media-box__desc {
  color: #808080;
}

.approve .aui-media-box__title {
  font-size: 18px;
  color: #444444;
}

.approve .aui-media-box_appmsg .aui-media-box__hd {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.approve .aui-media-box:before {
  left: 75px;
  border-top: 1px solid #e6e6e6;
}

.approve .aui-media-box__info__meta_extra {
  padding-left: 0;
}

.approve .aui-button-tab__info__meta_extra {
  padding-left: 0;
}
.approve .aui-expansion-mask {
  opacity: 0;
}
</style>
