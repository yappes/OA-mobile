import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/activity/Login'
import Home from '@/activity/Home'
//tabbar路由
import MsgCenter from '@/modules/msg-center/MsgCenter' //消息中心
import Workbench from '@/modules/workbench/Workbench' //工作台
import NewIssue from '@/modules/new-issue/NewIssue' //新建
import Contacts from '@/modules/contacts/Contacts' //通讯录
import UserCenter from '@/modules/user-center/UserCenter' //我的

//工作台中二级菜单
import FillHours from '@/modules/workbench/FillHours' //报工
import ExpenseAccount from '@/modules/workbench/ExpenseAccount' //报销
import LoanInfo from '@/modules/workbench/LoanInfo' //借款
import Repayments from '@/modules/workbench/Repayments' //还款

//消息详情
import MsgInfo from '@/modules/msg-center/MsgInfo' //消息详情

//审批

import Approve from '@/modules/workbench/Approve' //还款
//报销功能模块
import Reimbursement from '@/modules/new-issue/Reimbursement'
import ReimDetail from '@/modules/workbench/ReimDetail'

//借款功能模块
import LoanIssue from '@/modules/new-issue/LoanIssue'
import LoanDetail from '@/modules/workbench/LoanDetail'
//还款功能模块
import RepayIssue from '@/modules/new-issue/RepayIssue'
import RepayDetail from '@/modules/workbench/RepayDetail'

import schedule from "@/modules/calendar/schedule.vue"
import test from '@/modules/workbench/test'

import business from "@/modules/business/index.js";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: "/home/workbench"
    },
    {
      path: '/login',
      name: "login",
      component: Login
    },
    business,
    {
      path: '/home',
      name: "home",
      component: Home,
      children: [{
          path: 'msgCenter',
          name: "msgCenter",
          component: MsgCenter
        }, {
          path: 'workbench',
          name: "workbench",
          component: Workbench
        }, {
          path: 'newIssue',
          name: "newIssue",
          component: NewIssue
        }, {
          path: 'contacts',
          name: "contacts",
          component: Contacts
        }, {
          path: 'userCenter',
          name: "userCenter",
          component: UserCenter
        }, {
          path: 'fillHours',
          name: "fillHours",
          component: FillHours
        }, {
          path: 'expenseAccount',
          name: "expenseAccount",
          component: ExpenseAccount
        }, {
          path: 'loanInfo',
          name: "loanInfo",
          component: LoanInfo
        }, {
          path: 'repayments',
          name: "repayments",
          component: Repayments
        }, {
          path: 'reimbursement',
          name: "reimbursement",
          component: Reimbursement
        },
        {
          path: 'reimDetail',
          name: "reimDetail",
          component: ReimDetail
        },
        {
          path: 'loanDetail',
          name: "loanDetail",
          component: LoanDetail
        },
        {
          path: 'repayDetail',
          name: "repayDetail",
          component: RepayDetail
        },
        {
          path: 'loanIssue',
          name: "loanIssue",
          component: LoanIssue
        },
        {
          path: 'repayIssue',
          name: "repayIssue",
          component: RepayIssue
        },
        {
          path: 'approve',
          name: "approve",
          component: Approve
        },
        {
          path: 'msgInfo/:msgType',
          name: "msgInfo",
          component: MsgInfo
        },
        {
          path:"calendar",
          name:"calendar",
          component:schedule
        }, {
          path: 'test',
          name: 'test',
          component: test,
        }
      ]
    },

  ]
});