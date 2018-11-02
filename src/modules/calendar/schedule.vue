<template>
  <div class="calendar">
    <calendar @checkTime='dayChange' :render-function="buildSlotFn"></calendar>
    <aui-box gap="10px 10px">
      <aui-button :gradients="['#1D62F0', '#19D5FD']" @click.native="addEvent">添加日程</aui-button>
      <aui-group title="日程列表" v-if="eventList.length">
        <aui-cell v-for="event in eventList" :key="event.id" :title="event.eventTitle" :inline-desc="event.startDate+' - ' +event.endDate" @click.native="toEventDetail(event)"></aui-cell>
        <!-- <aui-swipeout class="aui-1px-tb">
                    <aui-swipeout-item transition-mode="follow" v-for="event in eventList" :key="event.id">
                        <div slot="right-menu">
                            <aui-swipeout-button type="primary" @click.native="editEvent(event)">编辑</aui-swipeout-button>
                            <aui-swipeout-button type="warn" @click.native="deleteEvent(event)">删除</aui-swipeout-button>
                        </div>
                        <div slot="content">
                            <aui-cell :title="event.eventTitle" :inline-desc="event.startDate+' - ' +event.endDate" @click.native="toEventDetail(event)"></aui-cell>
                        </div>
                    </aui-swipeout-item>
                </aui-swipeout>-->
      </aui-group>
    </aui-box>

    <aui-popup v-model="addEventStatus">
      <div class="popup2">
        <aui-popup-header left-text="取消" right-text="确定" title="日程新增" :show-bottom-border="false" @click-left="addEventStatus = false" @click-right="confirmHandler"></aui-popup-header>
        <aui-group>
          <aui-datetime v-model="eventStartDate" title="开始时间" placeholder="请选择开始时间" required format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></aui-datetime>
          <aui-datetime v-model="eventEndDate" title="结束时间" placeholder="请选择结束时间" required format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></aui-datetime>
          <aui-input title="标题" v-model="eventTitle" placeholder="请输入标题"></aui-input>
          <aui-textarea title='备注' v-model='eventContent' autosize name="description" placeholder="请输入备注"></aui-textarea>
        </aui-group>
      </div>
    </aui-popup>

    <aui-popup v-model="detailPopupstatus">
      <div class="popup2">
        <aui-popup-header left-text="返回" title="日程详情" :show-bottom-border="false" @click-left="detailPopupstatus = false"></aui-popup-header>
        <aui-group>
          <aui-datetime v-model="eventStartDate" readonly title="开始时间" placeholder="请选择开始时间" required format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></aui-datetime>
          <aui-datetime v-model="eventEndDate" readonly title="结束时间" placeholder="请选择结束时间" required format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></aui-datetime>
          <aui-input title="标题" readonly v-model="eventTitle" placeholder="请输入标题"></aui-input>
          <aui-textarea title='备注' readonly v-model='eventContent' autosize name="description" placeholder="请输入备注"></aui-textarea>
        </aui-group>
        <aui-box gap="10px 10px">
          <aui-button type="primary" @click.native="editEventInDetail">编辑</aui-button>
          <aui-button type="warn" @click.native="deleteEvent">删除</aui-button>
        </aui-box>
      </div>
    </aui-popup>

    <div v-transfer-dom>
      <aui-confirm class='confirm' v-model="deleteConfirm" @confirm="onConfirmDelete">
        <p class="content" style="text-align:center;">要删除此活动吗？</p>
      </aui-confirm>
    </div>
  </div>
</template>
<script>
import AuiBox from "AUI/components/layout-components/aui-box";
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiConfirm from "AUI/components/action-components/aui-confirm";
import Calendar from "@/components/calendar/calendar.vue";
export default {
  name: "Schedule",
  components: { AuiBox, AuiPopupHeader, AuiConfirm, Calendar },
  data() {
    return {
      value: this.formatDate(new Date()), //选中的日期
      addEventStatus: false, //日程新增弹框
      detailPopupstatus: false, //日程详情弹框
      eventStartDate: "", //日程开始日期
      eventEndDate: "", //日程结束日期
      eventData: {}, //为空时表示新增，不为空时是详情和编辑的日程数据
      eventTitle: "", //日程标题
      eventContent: "", //日程备注
      deleteConfirm: false, //确认删除弹框
      buildSlotFn: (item, year, month) => {
        //有日程的时间上方会显示一个红点
        let flag = false;
        if (item.isNowMonth) {
          item.formatedDate = `${year}-${month > 9 ? month : "0" + month}-${
            item.num > 9 ? item.num : "0" + item.num
          }`;
        } else {
          if (item.month === "last") {
            if (month == 1) {
              item.formatedDate = `${year - 1}-${12}-${
                item.num > 9 ? item.num : "0" + item.num
              }`;
            } else {
              item.formatedDate = `${year}-${
                month - 1 > 9 ? month - 1 : "0" + (month - 1)
              }-${item.num > 9 ? item.num : "0" + item.num}`;
            }
          } else {
            if (month == 12) {
              item.formatedDate = `${year + 1}-${1}-${
                item.num > 9 ? item.num : "0" + item.num
              }`;
            } else {
              item.formatedDate = `${year}-${
                month + 1 > 9 ? month + 1 : "0" + (month + 1)
              }-${item.num > 9 ? item.num : "0" + item.num}`;
            }
          }
        }
        for (const event of this.allEventList) {
          if (event.date === item.formatedDate) {
            flag = true;
            break;
          }
        }
        return flag
          ? '<div style="font-size:12px;text-align:center;margin: -46px;padding-left:26px"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>'
          : '<div style="height:19px;"></div>';
      }
    };
  },
  methods: {
    //选中日期改变
    dayChange(day) {
      this.value = day;
      this.$store.dispatch("eventData/changeEventList", day);
    },
    //确认新增日程
    confirmHandler() {
      this.addEventStatus = false;
    },
    //跳转置详情
    toEventDetail(event) {
      this.eventData = event;
      this.eventStartDate = event.date + " " + event.startDate;
      this.eventEndDate = event.date + " " + event.endDate;
      this.eventTitle = event.eventTitle;
      this.eventContent = event.eventContent;
      this.detailPopupstatus = true;
    },
    //新增
    addEvent() {
      this.eventData = {};
      this.eventStartDate = this.value + " " + this.getDefaultTime().startTime;
      this.eventEndDate = this.value + " " + this.getDefaultTime().endTime;
      this.eventTitle = null;
      this.eventContent = null;
      this.addEventStatus = true;
    },
    //编辑
    editEvent(event) {
      this.eventData = event;
      this.eventStartDate = event.date + " " + event.startDate;
      this.eventEndDate = event.date + " " + event.endDate;
      this.eventTitle = event.eventTitle;
      this.eventContent = event.eventContent;
      this.addEventStatus = true;
    },
    //删除
    deleteEvent(event) {
      if (event.id) {
        this.eventData = event;
      }
      this.deleteConfirm = true;
    },
    //详情中编辑
    editEventInDetail() {
      this.detailPopupstatus = false;
      this.addEventStatus = true;
    },
    //确认删除
    onConfirmDelete() {
      //console.log("this.event.id", this.eventData,this.eventData.id);
      this.addEventStatus = false;
      this.detailPopupstatus = false;
    },
    formatDate(val) {
      let time = new Date(val);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return `${year}-${month > 9 ? month : "0" + month}-${
        day > 9 ? day : "0" + day
      }`;
    },
    getDefaultTime() {
      let time = new Date();
      let hour = time.getHours();
      let minute = time.getMinutes();
      return {
        startTime: `${hour > 9 ? hour : "0" + hour}:${
          minute > 9 ? minute : "0" + minute
        }`,
        endTime: `${hour + 1 > 9 ? hour + 1 : "0" + (hour + 1)}:${
          minute > 9 ? minute : "0" + minute
        }`
      };
    }
  },
  mounted() {
    this.$store.state.headTitle = "日程管理";
    this.$store.state.headBack = true;
    this.$store.state.headBackLink = "/home/workbench";
    this.$store.state.showDownMenu = false;
    this.$store.dispatch("eventData/changeEventList", this.value);
  },
  created() {
    this.$store.dispatch("eventData/getAllUserList"); //获取全部日程数据
  },
  computed: {
    eventList() {
      return this.$store.getters["eventData/eventList"]; //选中日期的日程数据
    },
    allEventList() {
      return this.$store.getters["eventData/allEventList"]; //获取全部日程数据
    }
  }
};
</script>
<style lang='less' scoped>
.popup2 {
  padding-bottom: 15px;
  height: 400px;
}
.calendar {
  .aui-popup-dialog {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
.confirm {
  .content {
    padding: 20px 0 10px 0;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
  }
  .aui-dialog {
    width: 80%;
    border-radius: 3px;
  }
  .aui-confirm__ft {
    position: relative;
    line-height: 48px;
    font-size: 16px;
    display: flex;
  }
  .aui-confirm__ft:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d5d5d6;
    color: #d5d5d6;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .aui-confirm__btn {
    display: block;
    flex: 1;
    color: #d5d5d6;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
  }
  .aui-confirm__btn:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #d5d5d6;
    color: #d5d5d6;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }
  .aui-confirm__btn_default {
    color: #353535;
  }
  .aui-confirm__btn_primary {
    color: #0bb20c;
  }
}
</style>
