<template>
    <div class="loan-info">
        <aui-flexbox orient="vertical">
            <aui-flexbox-item>
                <aui-tab active-color="#33C2CF"
                         bar-active-color="#FFFFFF">
                    <aui-tab-item selected
                                  @item-click="changeType=1">
                        全部
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=2">
                        草稿
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=3">
                        未完成
                    </aui-tab-item>
                    <aui-tab-item @item-click="changeType=4">
                        已完成
                    </aui-tab-item>
                </aui-tab>
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
                        <aui-swipeout>
                            <aui-swipeout-item transition-mode="follow"
                                               v-for="(item,index) in expenseAccountList"
                                               :key="index"
                                               :disabled="disabled"
                            >
                                <div slot="content"
                                     class="demo-content aui-1px-t">
                                    <aui-panel
                                            :list="item"
                                            type="5">
                                        <div slot="header"
                                             class="head-info">
                                            <img src="static/images/tabbar/user-center-sel.png"/>
                                            <span>张丹峰 A2018</span>
                                            <span>审批中</span>
                                        </div>
                                    </aui-panel>
                                </div>
                                <div slot="right-menu">
                                    <aui-swipeout-button @click.native="onButtonClick(index)"
                                                         type="warn">删除
                                    </aui-swipeout-button>
                                </div>
                            </aui-swipeout-item>

                        </aui-swipeout>
                    </div>
                </aui-scroller>
            </aui-flexbox-item>
        </aui-flexbox>
        <aui-toast v-model="showSuccess">删除成功</aui-toast>
        <aui-actionsheet v-model="showdel" :menus="menuDel" @click-menu="clickDel" @click-menu-delete="onDelete"
                         show-cancel></aui-actionsheet>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                changeType: '',
                disabled: false,
                showdel: false,
                showSuccess: false,
                delInfoId: '',
                menuDel: {
                    'title.noop': ' 确定删除？',
                    delete: '<span style="color:red">删除</span>'
                },
                expenseAccountList: [[{
                    src: 'static/images/msg-center/notice.png',
                    title: '通知公告',
                    desc: '[人力],关于五一放假通知',
                    url: '/home/loanDetail',
                    meta: {
                        date: '20分钟前',
                    }
                }], [{
                    src: 'static/images/msg-center/backlog.png',
                    title: '待办',
                    desc: '[人力],关于五一放假通知',
                    url: {
                        path: '/home/loanDetail',
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
                        path: '/home/loanDetail',
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
                        path: '/home/loanDetail',
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
                        path: '/home/loanDetail',
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
                }
            }
        },
        watch: {
            changeType(){
                this.disabled = true
                if (this.changeType == 1) {
                    console.log("全部")
                } else if (this.changeType == 2) {
                    this.disabled = false
                    console.log("草稿")
                } else if (this.changeType == 3) {
                    console.log("未完成")
                } else if (this.changeType == 4) {
                    console.log("已完成")
                }
            }
        },
        mounted () {
            this.changeType = 1;
            this.$store.state.headTitle = '我的借款'
            this.$store.state.headBack = true
            this.$store.state.headAdd = false
            this.$store.state.headBackLink = '/home/workbench'
            this.$store.state.showDownMenu = false
        },
        methods: {
            clickDel(key){
                if(key=='delete'){
                    console.log("删除" + this.delInfoId)
                }
            },
            onDelete() {
                this.showSuccess = true
            },
            onButtonClick(index) {
                this.delInfoId = index
                this.showdel = true;
            },
            goReimburse(){
                this.$router.push("/home/loanDetail")
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

    .head-info span:nth-of-type(2) {
        float: right;
    }
</style>
<style>
    .loan-info .aui-panel {
        margin-top: 15px;
    }

    .loan-info .aui-panel:before {
        border-top: 0;
    }

    .loan-info .aui-panel:after {
        border-bottom: 0;
    }

    .loan-info .aui-panel__hd:after {
        left: 0;
    }

    .loan-info .aui-media-box__info {
        position: absolute;
        right: 18px;
        top: 20px;
        height: 12px;
        font-size: 12px;
        text-align: right;
    }

    .loan-info .aui-media-box__info__meta {
        width: 0;
        padding-right: 0;
    }

    .loan-info .aui-media-box__info__meta:nth-of-type(2) {
        width: 50px;
    }

    .loan-info .aui-media-box:before {
        left: 75px;
        border-top: 1px solid #e6e6e6;
    }

    .loan-info .aui-media-box__info__meta_extra {
        padding-left: 0;
    }
</style>
