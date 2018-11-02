<template>
  <div class="msg-center">
    <aui-header :showBack='false' class='message-header'>
      <div slot='default'>消息</div>
      <div slot='right' class='message-header-slot' @click='showAddMessage=true'>
        <img src='@/assets/more.png' class='message-header-img'>
      </div>
    </aui-header>
    <!-- <my-expansion v-model='selectType' v-if='!showPopup' @disabled-pullup='disabledPullup'></my-expansion> -->
    <aui-search :autoFixed="false"
                v-model="queryInput"
                placeholder="搜索"
                cancel-text="取消"
                @change="queryChange"
                @submit='submit'>
    </aui-search>
    <aui-tab class='type-tab'>
      <aui-tab-item :selected='selectType === "notify"' v-if='noreadNum(notifyAll)>0' :badge-label="noreadNum(notifyAll)" @click.native='changeSelectType("notify")'>通知</aui-tab-item>
      <aui-tab-item :selected='selectType === "notify"' v-else @click.native='changeSelectType("notify")'>通知</aui-tab-item>
      <aui-tab-item :selected='selectType === "announcement"' v-if='noreadNum(announcementAll)>0' :badge-label="noreadNum(announcementAll)" @click.native='changeSelectType("announcement")'>公告</aui-tab-item>
      <aui-tab-item :selected='selectType === "announcement"' v-else @click.native='changeSelectType("announcement")'>公告</aui-tab-item>
      <aui-tab-item :selected='selectType === "tip"' v-if='noreadNum(tipAll)>0' :badge-label="noreadNum(tipAll)" @click.native='changeSelectType("tip")'>提醒</aui-tab-item>
      <aui-tab-item :selected='selectType === "tip"' v-else  @click.native='changeSelectType("tip")'>提醒</aui-tab-item>
      <aui-tab-item :selected='selectType === "letter"' v-if='noreadNum(letterAll)>0' :badge-label="noreadNum(letterAll)" @click.native='changeSelectType("letter")'>私信</aui-tab-item>
      <aui-tab-item :selected='selectType === "letter"' v-else @click.native='changeSelectType("letter")'>私信</aui-tab-item>
    </aui-tab>
    <aui-load-more v-if='loading' tip='正在加载'></aui-load-more>
    <aui-scroller  class='scroller'
      v-else
      ref="scroller"
      lock-x
      scrollbarY
      :use-pullup="true"
      :use-pulldown="true"
      :pulldown-config="scroller.pulldownConfig"
      :pullup-config="scroller.pullupConfig"
      @pullup-loading="loadMore"
      @pulldown-loading="refresh"
      v-model="scroller.status"
      :height='dataHeight'
    >
      <aui-swipeout ref="swipeout">
        <template v-if='showData && showData.length > 0'>
          <aui-swipeout-item v-for='(item, index) in showData' :key='item.type + item.id' :auto-close-on-button-click='false' ref='swipeoutItem' class='swipeoutItem'>
            <my-list-item slot='content' :item-data='item' @click='detailDialog(item)' />
            <div slot="right-menu">
              <aui-swipeout-button v-if='item.status==="NOREAD"' @click.native="readItem(item, index)" type="primary">标记已读</aui-swipeout-button>
              <aui-swipeout-button @click.native="deleteItem(item, index)" type="warn">删除</aui-swipeout-button>
            </div>
          </aui-swipeout-item>
        </template>
        <aui-load-more v-else :show-loading="false" tip='暂无数据' background-color='#F4F4F4' class='load-more'></aui-load-more>
      </aui-swipeout>
    </aui-scroller>
    <aui-actionsheet v-model="showAddMessage" :menus="addMessageMenu" @click-menu="addMessage" show-cancel cancel-text='取消'></aui-actionsheet>
    <div v-transfer-dom>
      <aui-popup height="100%" v-model='popupData.show' :hide-on-blur='false'>
        <msg-detail-popup v-if='popupData.type==="detail"&&popupData.show' :detail-data='detailData'  @close-popup='popupData.show=false'/>
        <add-letter-popup v-else-if='popupData.type==="letter"&&popupData.show' @reload='loadAll' @close-popup='popupData.show=false'></add-letter-popup>
        <add-notify-popup v-else-if='(popupData.type==="notify" || popupData.type==="announcement")&&popupData.show' :type='addType' @reload='loadAll' @close-popup='popupData.show=false'></add-notify-popup>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import {noteService, tipService, letterService} from "paas-web-utils/services/index";
import MsgDetailPopup from './msg-detail-popup'
import {dateFormat} from '../../../aui-m/components/utils.js';
import MyExpansion from './expansion'
import MyListItem from './list-item'
import { setTimeout } from 'timers';
import AddLetterPopup from './add-letter-popup'
import AddNotifyPopup from './add-notify-popup'
export default {
  name: "msgInfo",
  components: {
    MsgDetailPopup,
    // MyExpansion,
    MyListItem,
    AddLetterPopup,
    AddNotifyPopup,
  },
  data() {
    return {
      dataHeight: '0',
      queryInput: '',
      queryMsg: '',
      scroller: {
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
        //上划功能配置
        pullupConfig: {
          content: "加载更多",
          pullUpHeight: 50,
          height: 50,
          autoRefresh: false,
          downContent: "释放加载",
          upContent: "加载更多",
          loadingContent: "Loading...",
          clsPrefix: "xs-plugin-pullup-"
        },
        //滚动状态双绑量
        //default, disabled, loading
        status: {
          pullupStatus: "default",
          pulldownStatus: "default"
        }
      },
      loading: true,
      pageName: "个人信息",
      descLength: 15,
      notifyAll: [],
      announcementAll: [],
      tipAll: [],
      letterAll: [],
      pageSize: 3,
      pageNow: 1,
      detailData: {},
      showPopup: false,
      showAddMessage: false,
      image: {
        announcement: `static/images/msg-center/notice.png`,
        notify: `static/images/msg-center/notice.png`,
        tip: `static/images/msg-center/backlog.png`,
        letter: `static/images/msg-center/email.png`
      },
      selectType: 'notify',
      expansionTitle: '全部',
      expansionCtrl: false,
      tags: [{
        type: 'announcement',
        tagName: '公告',
      },{
        type: 'notify',
        tagName: '通知',
      },{
        type: 'tip',
        tagName: '提醒',
      },{
        type: 'letter',
        tagName: '私信',
      },],
      allUserList: [],
      addMessageMenu: [{
        label: '新增通知',
        value: 'notify',
        type: 'primary',
      }, {
        label: '新增公告',
        value: 'announcement',
        type: 'primary',
      }, {
        label: '新增提醒',
        value: 'tip',
        type: 'primary',
      }, {
        label: '新增私信',
        value: 'letter',
        type: 'primary',
      }],
      addType: '',
      showAddNotify: false,
      showAddLetter: false,
      popupData: {
        show: false,
        type: undefined,
      }
    };
  },

  methods: {
    //点击键盘确认后才触发
    submit() {
      this.queryMsg = this.queryInput
      this.pageNow = 1
    },
    //搜索框input时触发
    queryChange() {
      // this.pageNow = 1
    },
    //弃用
    selectTag(item) {
      if(!item) {
        this.selectType = undefined
        this.expansionTitle = '全部'
      }else {
        this.selectType = item.type
        this.expansionTitle = item.tagName 
      }
      this.expansionCtrl = false
    },
    //上拉加载更多,页数+1，手动设置延迟1s
    loadMore() {
      setTimeout(() => {
        this.pageNow += 1
        this.scroller.status.pullupStatus = "default";
      }, 1000);
    },
    //下拉刷新数据，重新加载数据
    //页码置1在loadAll中完成
    refresh() {
      this.loadAll().then(() => {
        this.scroller.status.pulldownStatus = "default"
      })
    },
    //获取所有通知数据,已读和未读
    loadNotifyAll() {
      return noteService
        .findRecieveAll({
          type: "NOTIFY",
          status: '',
        })
        .then(data => {
          let result = data.map(item => {
            return {
              id: item.id,
              type: 'notify',
              agreeMessageId: item.agreeMessageId,
              readTime: item.readTime,
              title: item.agreeMessage.subject,
              createTime: item.agreeMessage.createTime,
              createTime_: dateFormat(item.agreeMessage.createTime), 
              content: item.agreeMessage.content,
              status: item.status,
              attachment: item.agreeMessage.attachment,
            }
          })
          this.notifyAll = result;
        });
    },
    //获取所有公告数据,已读和未读
    loadAnnouncementAll() {
      return noteService
        .findRecieveAll({
          type: "ANNOUNCEMENT",
          status: '',
        })
        .then(data => {
          let result = data.map(item => {
            return {
              id: item.id,
              type: 'announcement',
              agreeMessageId: item.agreeMessageId,
              readTime: item.readTime,
              title: item.agreeMessage.subject,
              createTime: item.agreeMessage.createTime,
              createTime_: dateFormat(item.agreeMessage.createTime), 
              content: item.agreeMessage.content,
              status: item.status,
              attachment: item.agreeMessage.attachment,
            }
          })
          this.announcementAll = result;
        });
    },
    //获取所有提醒数据
    loadTipAll() {
      return tipService.findAll().then(data => {
        let result = data.map(item => {
          item.type = 'tip'
          return item
        })
        this.tipAll = result;
      });
    },
    //获取所有私信数据
    loadLetterAll() {
      return letterService.findAll({}).then(data => {
        let result = data.map(item => {
          return {
            type: 'letter',
            id: item.id,
            title: this.findUserName(item.sender).realName,
            auth: item.sender,
            auth_: this.findUserName(item.sender).realName,
            createTime: item.createTime,
            createTime_: dateFormat(item.createTime), 
            content: item.content,
            status: item.status,
            attachment: item.attachment,
          }
        })
        this.letterAll = result;
      });
    },
    //获取4种所有的数据
    loadAll() {
      let promises = [
        this.loadNotifyAll(),
        this.loadAnnouncementAll(),
        this.loadTipAll(),
        this.loadLetterAll()
      ];
      return Promise.all(promises);
    },
    //设置弹窗的开关和类型 detail notify announcement tip letter
    openPopup(type) {
      this.popupData.type = type
      this.popupData.show = true
    },
    //显示详情弹窗
    detailDialog(item) {
      this.detailData = item
      this.openPopup('detail')
      if(item.status === 'NOREAD') {
        this.setRead(item.id).then(data => {
          if(data) {
            item.status = 'READ'
          }else {
            console.log(item, '设置已读 失败')
          }
        })
      }
    },
    //scroller上拉禁用，当前页小于总页数时才能用
    disabledPullup() {
      if(this.pageNow >= this.totalPage) {
        this.$nextTick(() => {
          this.scroller.status.pullupStatus = 'disabled'
        })
      }else {
        this.$nextTick(() => {
          this.scroller.status.pullupStatus = 'enabled'
        })
      }
    },
    //通过用户id找到用户姓名
    findUserName(id) {
      let r =  this.allUserList.find(item => {
        return item.id === Number(id)
      })
      return r
    },
    //未读的条数
    noreadNum(datas) {
      let num = datas.filter(item => {
        return item.status === 'NOREAD'
      }).length
      return String(num)
    },
    //改变消息类型
    changeSelectType(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      })
    },
    //点击左滑按钮设置已读
    readItem(item, index) {
      let id = item.id
      this.setRead(id).then(data => {
        if(data) {
          this.$refs.swipeoutItem[index].close()
          item.status = 'READ'
        }else {
          console.log(item, '设置已读失败')
        }
      })
    },
    //TODO:左滑删除按钮删除消息
    deleteItem(item, index) {
      console.log('删除', item)
      this.$refs.swipeoutItem[index].close()
    },
    //设置已读接口封装
    setRead(id) {
      let map = {
        notify: noteService.read,
        announcement: noteService.read,
        tip: tipService.read,
        letter: letterService.read,
      }
      let type = this.selectType
      return map[type]({
        id,
      }).then(data => data)
    },
    //点击actionsheet新增消息
    addMessage(key, item) {
      let map = {
        letter: 'showAddLetter',
        notify: 'showAddNotify',
        announcement: 'showAddNotify',
      }
      let addTypeMap = {
        notify: 'notify',
        announcement: 'announcement',
      }
      if(map[key]) {
        this.addType = addTypeMap[key]
        this.openPopup(key)
      }
    }
  },
  computed: {
    //实际显示的消息，用搜索框数据进行过滤
    showNotify() {
      return this.notifyAll.filter(item => {
        return item.title.includes(this.queryMsg) || item.content.includes(this.queryMsg)
      })
    },
    showAnnouncement() {
      return this.announcementAll.filter(item => {
        return item.title.includes(this.queryMsg) || item.content.includes(this.queryMsg)
      })
    },
    showTip() {
      return this.tipAll.filter(item => {
        return item.title.includes(this.queryMsg) || item.content.includes(this.queryMsg)
      })
    },
    showLetter() {
      return this.letterAll.filter(item => {
        return item.title.includes(this.queryMsg) || item.content.includes(this.queryMsg)
      })
    },
    //将4种类型的数据合并,按照创建时间降序排序
    dataAll() {
      let datas = []
      switch(this.selectType) {
        case 'all': 
          datas = [
            ...this.showNotify,
            ...this.showAnnouncement,
            ...this.showTip,
            ...this.showLetter
          ];
        break;
        case 'notify':
          datas = this.showNotify
        break;
        case 'announcement':
          datas = this.showAnnouncement
        break;
        case 'tip':
          datas = this.showTip
        break;
        case 'letter':
          datas = this.showLetter
        break;
      }
      //按照创建时间进行降序排列
      datas.sort((a, b) => {
        let start = a.createTime ? Number(a.createTime) : 0
        let end = b.createTime ? Number(b.createTime) : 0
        return end - start
      })
      //转换类型后当前页码应置1
      this.pageNow = 1
      return datas
    },
    //实际显示的数据，按照页码对panelDataAll进行截取
    showData() {
      let baseData = this.dataAll
      let dataNum = this.pageSize *  this.pageNow
      if(this.totalRecord <= dataNum) {
        return baseData
      }
      return baseData.slice(0, dataNum)
    },
    //所有数据dataAll条数
    totalRecord() {
      return this.dataAll.length
    },
    //总页数
    totalPage() {
      return Math.ceil(this.totalRecord / this.pageSize)
    },
    //vuex获得用户信息
    allUserListPromise() {
      return this.$store.getters["userData/userPromise"];
    },
  },
  watch: {
    //达到最大页数后不能再上拉翻页
    pageNow(val) {
      this.disabledPullup()
    },
    totalPage(val) {
      this.disabledPullup()
    },
    selectType() {
      this.disabledPullup()
    }
  },
  mounted() {
    this.$store.state.headTitle = "消息";
    this.$store.state.headBack = false;
    this.$store.state.headAdd = false;
    this.$store.state.showDownMenu = true;
    this.dataHeight = window.innerHeight - 190 + 'px';
    this.allUserListPromise.then(data => {
      this.allUserList = data
      this.loadAll().then(() => {
        this.loading = false
        this.$nextTick(() => {
          this.disabledPullup()
        })
      })
    })
  }
};
</script>
<style lang='less'>
  .message-header {
    background-color: #33c3cf;
    color: white;
    position: fixed;
    width: 100%;
    z-index: 100;
    top: 0;
    .message-header-slot {
      height: 30px;
      width: 30px;
      .message-header-img {
        height: 100%;
        width: 100%;
        margin-top: -5px
      }
    }
  }
.msg-center .aui-search-bar {
  background: #f5f5f5;
}
.msg-center .aui-search-bar__form {
  height: 30px;
}
.msg-center .aui-search-bar__label {
  top: 2px;
  bottom: 2px;
}
.msg-center .aui-panel {
  margin-top: 0;
}
.msg-center .aui-panel:before {
  border-top: 0;
}
.msg-center .aui-panel__hd {
  padding: 0;
}
.msg-center .aui-panel__hd:after {
  border-bottom: none;
}
.msg-center .aui-panel:after {
  left: 75px;
}
.msg-center .aui-media-box__info {
  position: absolute;
  right: 18px;
  top: 5px;
  height: 12px;
  font-size: 12px;
  text-align: right;
}
.msg-center .aui-media-box__info__meta {
  width: 0;
  padding-right: 0;
}
.msg-center .aui-media-box__info__meta:nth-of-type(2) {
  width: 200px;
}

.msg-center .aui-media-box__title {
  font-size: 18px;
}
.msg-center .aui-media-box_appmsg .aui-media-box__hd {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
.msg-center .aui-media-box:before {
  left: 75px;
  border-top: 1px solid #e6e6e6;
}
.load-more {
    margin-top: 1em; 
    .aui-loadmore__tips {
      background-color: #F4F4F4;
    }
}
.swipeoutItem+.swipeoutItem{
  margin-top: 8px;
}

</style>
