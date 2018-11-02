<template>
    <div class='home'>
        <aui-header></aui-header>
        <aui-header v-show="this.$store.state.showHead"
                    :showBack="false"
                    style="z-index:99;height: 45px;position:absolute;left:0;top:0;width: 100%;"
                    class='header'>
            <div style="height: 30px;width: 30px;"
                 slot="overwrite-left"
                 v-show="this.$store.state.headBack"
                 @click="toHeadBack">
                <img v-bind:src="this.$store.state.headLeftImg"
                     style="height: 100%;width: 100%;margin-top: -8px">
            </div>
            <span>{{$store.state.headTitle}}</span>
            <div slot="right"
                 style="height: 30px;width: 30px;"
                 v-show="this.$store.state.headAdd"
                 @click="toHeadAdd">
                <img v-bind:src="this.$store.state.headRightImg"
                     style="height: 100%;width: 100%;margin-top: -8px"></div>
        </aui-header>
        <router-view></router-view>

        <div v-transfer-dom>
            <aui-dialog v-model="this.$store.state.showDialog">
                <div class="panelStyle">
                <aui-panel :list="this.$store.state.dialogList"
                           type="5"></aui-panel>
                </div>
                <aui-button @click.native="doShowToast" style="width: 100%;color: #808080;">确定</aui-button>
            </aui-dialog>
        </div>
        <aui-tabbar v-show="this.$store.state.showDownMenu"
                    v-model="selectedTabbar">
            <aui-tabbar-item link="/home/msgCenter">
                <img slot="icon"
                     src="static/images/tabbar/msg-center.png"/>
                <img slot="icon-active"
                     src="static/images/tabbar/msg-center-sel.png"/>
                <span slot="label">消息</span>
            </aui-tabbar-item>
            <aui-tabbar-item link="/home/workbench">
                <img slot="icon"
                     src="static/images/tabbar/workbench.png"/>
                <img slot="icon-active"
                     src="static/images/tabbar/workbench-sel.png"/>
                <span slot="label">工作台</span>
            </aui-tabbar-item>
            <aui-tabbar-item link="/home/workbench"
                             @item-click="newIssue">
                <img slot="icon"
                     src="static/images/tabbar/new-issue.png"/>
            </aui-tabbar-item>
            <aui-tabbar-item link="/home/contacts">
                <img slot="icon"
                     src="static/images/tabbar/contacts.png"/>
                <img slot="icon-active"
                     src="static/images/tabbar/contacts-sel.png"/>
                <span slot="label">通讯录</span>
            </aui-tabbar-item>
            <aui-tabbar-item link="/home/userCenter">
                <img slot="icon"
                     src="static/images/tabbar/user-center.png"/>
                <img slot="icon-active"
                     src="static/images/tabbar/user-center-sel.png"/>
                <span slot="label">我的</span>
            </aui-tabbar-item>
        </aui-tabbar>
        <aui-popup v-model="show">
            <div class="popup-info">
                <div v-for="(item,index) in popList"
                     :key="index"
                     @click="popInfo(item.path)">
                    <img :src="item.imgUrl">
                    <p>{{item.label}}</p>
                </div>
                <span class="closeDot"
                      @click="closePop"></span>
            </div>
        </aui-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                title: '',
                showHead: false,
                selectedTabbar: 1,
                popList: [
                    {
                        path: '/home/workbench',
                        label: '请假',
                        imgUrl: 'static/images/new-issue/leave.png'
                    },
                    {
                        path: '/home/workbench',
                        label: '出差',
                        imgUrl: 'static/images/new-issue/business-trip.png'
                    },
                    {
                        path: '/home/reimbursement',
                        label: '报销',
                        imgUrl: 'static/images/new-issue/reimburse.png'
                    },
                    {
                        path: '/home/loanIssue',
                        label: '借款',
                        imgUrl: 'static/images/new-issue/loan.png'
                    },
                    {
                        path: '/home/repayIssue',
                        label: '还款',
                        imgUrl: 'static/images/new-issue/repayment.png'
                    }
                ]
            };
        },
        computed: {
            selectedTabbarItem: function () {
                return this.$store.state.selectedTabbarItem
            }
        },
        watch: {
            selectedTabbarItem: function (newVal, oldVal) {
                this.selectedTabbar = newVal;
            },
            selectedTabbar: function (newVal, oldVal) {
                this.$store.commit("setSelectedTabbarItem", newVal)
            },

        },
        methods: {
            doShowToast(){
                this.$router.push(this.$store.state.dialogLink);
                this.$store.state.showDialog = false;
            },
            newIssue() {
                this.show = true;
            },
            closePop() {
                this.show = false;
            },
            popInfo(path) {
                this.show = false;
                this.$router.push(path);
            },
            toHeadBack() {
                this.$router.push(this.$store.state.headBackLink);
            },
            toHeadAdd() {
                this.$router.push(this.$store.state.headAddLink);
            }
        },
        mounted() {
            this.selectedTabbar = this.selectedTabbarItem;
        },
        created() {
            this.$store.dispatch("userData/getAllUserList");
        }
    };
</script>
<style scoped>
    .home {
        width: 100%;
        height: auto;
        /*margin-top: 45px;*/
        padding-bottom: 12px;
        overflow: hidden;
        /* background: #fafafa; */
    }

    .dialog-div {
        width: 100%;
    }

    .popup-info {
        width: 100%;
        height: 242px;
        background: #33c3cf;
        position: relative;
        border-top-left-radius: 200px 50px;
        border-top-right-radius: 200px 50px;
        font-size: 12px;
    }

    .popup-info > div {
        float: left;
        position: absolute;
        width: 40px;
        height: 66px;
        text-align: center;
        color: white;
    }

    .popup-info > div img {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        border-radius: 50%;
    }

    .popup-info > div:first-child {
        bottom: 100px;
        left: 25px;
    }

    .popup-info div:nth-of-type(5) {
        bottom: 100px;
        right: 25px;
    }

    .popup-info > div:nth-child(2) {
        bottom: 110px;
        left: 95px;
    }

    .popup-info > div:nth-child(4) {
        bottom: 110px;
        right: 95px;
    }

    .popup-info > div:nth-child(3) {
        bottom: 120px;
        left: 50%;
        margin-left: -20px;
    }

    .closeDot {
        position: absolute;
        display: block;
        color: white;
        width: 28px;
        height: 28px;
        bottom: 12px;
        left: 50%;
        margin-left: -14px;
        background: url('../../static/images/new-issue/close.png') 100% 100%/100% 100%;
    }
</style>
<style>
    .home .aui-tabbar .aui-tabbar__item:nth-of-type(3) .aui-tabbar__icon {
        width: 34px;
        height: 34px;
        margin-top: 5px;
    }

    .home .aui-popup-dialog {
        border-top-left-radius: 200px 50px;
        border-top-right-radius: 200px 50px;
    }
    .aui-dialog.aui-dialog {
        width: 60%;
        border-radius: 10px;
    }
    .panelStyle .aui-media-box_appmsg .aui-media-box__hd {
        width: 35px;
        height: 35px;
    }
    .panelStyle .aui-media-box__thumb{
        margin-left: 25px;
    }
    .panelStyle .aui-media-box_text .aui-media-box__title {
        margin-bottom: 8px;
        margin-left: -39px;
    }
    .panelStyle .aui-media-box__desc {
        color: #808080;
        font-size: 12px;
        margin-left: 20px;
        margin-top: -7px;
    }
    .header {
      background-color: #33c3cf;
    }
</style>

