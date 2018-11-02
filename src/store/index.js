import Vue from 'vue'
import Vuex from 'vuex'
import userData from "./modules/userData"
import eventData from "./modules/eventData"
import detailListState from "./modules/detailListState"
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0,
        showHead: true, //是否展示头部
        headTitle: '*****', //头部标题
        headBack: true, //头部是否展示关闭
        headAdd: true, //头部是否展示右侧
        headBackLink: '/home/contacts', //头部关闭链接
        headAddLink: '/home/contacts', //头部右侧链接
        showDownMenu: false, //展示下方菜单
        headLeftImg: "static/images/closee.png", //左侧图片
        headRightImg: "static/images/add member.png", //右侧图片
        selectedTabbarItem: 1,
        showDialog:false,  //展示弹窗
        dialogList:[],//弹窗内数据
        dialogLink:'',//弹窗按钮链接
    },
    getters: {
        showHead: state => state.showHead,
        headTitle: state => state.headTitle,
        headBack: state => state.headBack,
        headAdd: state => state.headAdd,
        headBackLink: state => state.headBackLink,
        headAddLink: state => state.headAddLink,
        showDownMenu: state => state.showDownMenu,
        headLeftImg: state => state.headLeftImg,
        headRightImg: state => state.headRightImg,
        showDialog: state => state.showDialog,
        dialogList: state => state.dialogList,
        dialogLink: state => state.dialogLink,
        selectedTabbarItem: state => state.selectedTabbarItem,
        getCount: (state, getters) => {
            return state.count
        }
    },
    mutations: {
        showDialog(state, flag) {
            state.showDialog = flag;
        },
        dialogList(state, flag) {
            state.dialogList = flag;
        },
        dialogLink(state, flag) {
            state.dialogLink = flag;
        },
        setCount(state, num) {
            state.count = num;
        },
        showHead(state, flag) {
            state.showHead = flag;
        },
        headTitle(state, flag) {
            state.headTitle = flag;
        },
        headBack(state, flag) {
            state.headBack = flag;
        },
        headAdd(state, flag) {
            state.headAdd = flag;
        },
        headBackLink(state, flag) {
            state.headBackLink = flag;
        },
        headAddLink(state, flag) {
            state.headAddLink = flag;
        },
        showDownMenu(state, flag) {
            state.showDownMenu = flag;
        },
        headLeftImg(state, flag) {
            state.headLeftImg = flag;
        },
        headRightImg(state, flag) {
            state.headRightImg = flag;
        },
        setSelectedTabbarItem(state, value) {
            state.selectedTabbarItem = value
        }
    },
    modules:{
        userData,
        eventData,
        detailListState,
    }
})
export default store;