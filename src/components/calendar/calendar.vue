<template>
  <div class="calendarBox" style="overflow: hidden">
    <div class="date">
      <span @click="chooseTime" class="yearMonth left">{{now_year}}年{{now_month}}月
        <span class="triangle-down"></span>
      </span>
      <span @click="moveToday" class="right jin">今</span>
    </div>
    <div class="content">
      <div class="week">
        <ul>
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div>
      <div class="calendar" @touchstart="moveStart" @touchend="moveEnd">
        <ul id="d2" v-if="mode === 'M'">
          <li v-for="(item,index) in list" :key='index' :class="{black:item.isNowMonth,gray:!item.isNowMonth,red:item.checked,today:item.old.isToday}" @click="checkMe(item.id-1)">
            <div style="font-size: 18px">{{item.num}}</div>
            <div style="font-size: 12px">{{item.old.old_str}}</div>
            <div v-html="renderFunction(item,now_year,now_month)"></div>
          </li>
        </ul>
        <ul id="d2" v-else>
          <li v-for="(item,index) in list" :key='index' :class="{black:true,gray:false,red:item.checked,today:item.old.isToday}" @click="checkMe(item.id-1)">
            <div style="font-size: 18px">{{item.num}}</div>
            <div style="font-size: 12px">{{item.old.old_str}}</div>
            <div v-html="renderFunction(item,now_year,now_month)"></div>
          </li>
        </ul>
      </div>
    </div>
    <div v-transfer-dom>
      <aui-popup v-model="showPopup">
        <aui-popup-header left-text="取消" right-text="确定" title="日期跳转" :show-bottom-border="false" @click-left="showPopup = false" @click-right="confirmHandler"></aui-popup-header>
        <aui-datetime-view v-model="selectTime"></aui-datetime-view>
      </aui-popup>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import calendar from "./calendar.js";
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiDatetimeView from "AUI/components/form-components/aui-datetime-view";
import { setTimeout } from 'timers';
export default {
  name: "calendar",
  components: { AuiPopupHeader, AuiDatetimeView },
  props: {
    renderFunction: {
      type: Function
    }
  },
  data() {
    return {
      selectTime: "",
      showPopup: false,
      list: [], //日历显示的数据
      oneMonthList: [], //暂存一个月的数据
      week: 1, //第几周
      check: "",
      checkDate:'',
      moveStartX: "", // 滑动开始的横坐标
      moveEndX: "", // 滑动结束的横坐标
      moveStartY: "", // 滑动开始的纵坐标
      moveEndY: "", // 滑动结束的纵坐标
      now_year: "", //当前年份
      now_month: "", //当前月份
      now_day: "", //当前日期
      mode: "M", //当前是显示一个月还是一个星期（默认月）
      maxHeight: "350px",
      minHeight: "50px"
    };
  },
  watch:{
    list(){
      for (const s of this.list) {
        s.checked = false;
        setTimeout(() => {
          if (s.formatedDate == this.checkDate) {
              s.checked = true;
              this.check = s.id - 1;
            }
        });
      }
    }
  },
  mounted() {
    let nstr = new Date(); //当天时间
    this.now_year = nstr.getFullYear(); //年份
    this.now_month = nstr.getMonth() + 1; //月份
    this.now_day = nstr.getDate(); //日期
    this.createCalendar(this.now_year, this.now_month);
    for (const item of this.list) {
      if (item.old.isToday) {
        item.checked = true;
        this.check = item.id-1;
        this.checkDate = `${this.now_year}-${this.now_month>9?this.now_month:'0'+this.now_month}-${this.now_day>9?this.now_day:'0'+this.now_day}`
      }
    } 
  },
  methods: {
    //      是否为闰年
    is_leap(year) {
      return year % 100 == 0
        ? year % 400 == 0 ? 1 : 0
        : year % 4 == 0 ? 1 : 0;
    },
    //      选择日期
    checkMe(id) {
      if(this.mode === "M"&& !this.oneMonthList[id].isNowMonth)return;
      for (let i of this.oneMonthList) {
        i.checked = false;
      }
      //        不是本月的
      if (!this.oneMonthList[id].isNowMonth) {
        let checkDay = this.oneMonthList[id].num;
        //          上个月的
        if (this.oneMonthList[id].month == "last") {
          this.chooseMonth("pre");
          this.createCalendar(this.now_year, this.now_month);
          for (let s of this.oneMonthList) {
            if (s.isNowMonth) {
              if (s.num == checkDay) {
                s.checked = true;
                this.now_day = s.num;
                this.check = s.id - 1;
                this.checkDate = `${this.now_year}-${this.now_month>9?this.now_month:'0'+this.now_month}-${this.now_day>9?this.now_day:'0'+this.now_day}`
              }
            }
          }
          if (this.check <= 6) {
            this.week = 1;
          } else if (this.check > 6 && this.check <= 13) {
            this.week = 2;
          } else if (this.check > 6 && this.check <= 20) {
            this.week = 3;
          } else if (this.check > 6 && this.check <= 27) {
            this.week = 4;
          } else if (this.check > 6 && this.check <= 34) {
            this.week = 5;
          } else if (this.check > 6 && this.check <= 41) {
            this.week = 6;
          }
          this.list = this.oneMonthList.slice(
            this.week * 7 - 7,
            this.week * 7 - 7 + 7
          );
          //              下个月的
        } else if (this.oneMonthList[id].month == "next") {
          this.chooseMonth("next");
          this.week = 1;
          this.createCalendar(this.now_year, this.now_month);
          this.list = this.oneMonthList.slice(
            this.week * 7 - 7,
            this.week * 7 - 7 + 7
          );
          for (let s of this.oneMonthList) {
            if (s.isNowMonth == true) {
              if (s.num == checkDay) {
                this.now_day = s.num;
                s.checked = true;
                this.check = s.id - 1;
                this.checkDate = this.checkDate = `${this.now_year}-${this.now_month>9?this.now_month:'0'+this.now_month}-${this.now_day>9?this.now_day:'0'+this.now_day}`
              }
            }
          }
        }
      } else {
        this.oneMonthList[id].checked = true;
        this.now_day = this.oneMonthList[id].num;
        this.check = id;
        this.checkDate = this.oneMonthList[id].formatedDate;
      }
      //        返回点击的时间
      let times =
        this.now_year +
        "-" +
        (this.now_month > 9 ? this.now_month : "0" + this.now_month) +
        "-" +
        (this.now_day > 9 ? this.now_day : "0" + this.now_day);
      this.$emit("checkTime", times);
    },
    //      创建一个月的日历
    createCalendar(year, month, day) {
      this.list = [];
      let nstr1 = new Date(year, month - 1, 1); //当月第一天
      let firstDay = nstr1.getDay(); //当月第一天是星期几
      let m_days = [
        31,
        28 + this.is_leap(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ]; //各月份的总天数
      let lastMonth = ""; //上个月
      let lastWeek = ""; //上个月的最后一天的星期数
      let lastDays = "";
      if (month == 1) {
        lastMonth = 11;
        lastWeek = new Date(year - 1, lastMonth, m_days[lastMonth]).getDay();
        lastDays = m_days[lastMonth] - lastWeek;
      } else {
        lastMonth = month - 1;
        lastWeek = new Date(
          year,
          lastMonth - 1,
          m_days[lastMonth - 1]
        ).getDay();
        lastDays = m_days[lastMonth - 1] - lastWeek;
      }
      let list = [];
      let s = 1;
      let id = 1;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          let idx = i * 7 + j; //单元格自然序列号
          let date_str = idx - firstDay + 1; //计算日期
          //前一个月的最后几天
          if (date_str <= 0) {
            //月份在1到12之间
            if (month > 1 && month <= 12) {
              this.list.push({
                id: id++,
                num: lastDays++,
                isNowMonth: false,
                month: "last",
                old: calendar.solar2lunar(year, month - 1, lastDays - 1),
                checked: false
              });
              //月份为1
            } else if (month == 1) {
              this.list.push({
                id: id++,
                num: lastDays++,
                isNowMonth: false,
                month: "last",
                old: calendar.solar2lunar(year - 1, 12, lastDays - 1),
                checked: false
              });
            }
            //下一个月的开始几天
          } else if (date_str > m_days[lastMonth]) {
            //月份在1到12之间
            if (month < 12 && month >= 1) {
              this.list.push({
                id: id++,
                num: s++,
                isNowMonth: false,
                month: "next",
                old: calendar.solar2lunar(year, month + 1, s - 1),
                checked: false
              });
              //月份为12
            } else if (month == 12) {
              this.list.push({
                id: id++,
                num: s++,
                isNowMonth: false,
                month: "next",
                old: calendar.solar2lunar(year + 1, 1, s - 1),
                checked: false
              });
            }
            //当前月份
          } else {
            this.list.push({
              id: id++,
              num: date_str,
              isNowMonth: true,
              month: "now",
              old: calendar.solar2lunar(year, month, date_str),
              checked: false
            });
          }
        }
      }
      this.oneMonthList = this.list;
      setTimeout(() => {
        for (const s of this.oneMonthList) {
          if (s.formatedDate == this.checkDate) {
            s.checked = true;
            this.check = s.id - 1;
          }
        }
      });
    },
    moveStart(e) {
      this.moveStartX = e.changedTouches[0].clientX;
      this.moveStartY = e.changedTouches[0].clientY;
    },
    moveEnd(e) {
      let self = this;
      this.moveEndX = e.changedTouches[0].clientX;
      this.moveEndY = e.changedTouches[0].clientY;
      //  下拉
      if (this.moveEndY - this.moveStartY > 40) {
        this.mode = "M";
        $("#d2").css("height", this.maxHeight);
        this.createCalendar(this.now_year, this.now_month);
        if (this.check != "") {
          this.list[this.check].checked = true;
        }
      }
      //   上拉
      if (this.moveStartY - this.moveEndY > 40) {
        this.mode = "W";
        $("#d2").css("height", this.minHeight);
        this.createdWeek(this.now_year, this.now_month);
        if (this.check != "") {
          this.list[this.check].checked = true;
        }
        this.oneMonthList = this.list;
        if (this.check <= 6) {
          this.week = 1;
        } else if (this.check > 6 && this.check <= 13) {
          this.week = 2;
        } else if (this.check > 6 && this.check <= 20) {
          this.week = 3;
        } else if (this.check > 6 && this.check <= 27) {
          this.week = 4;
        } else if (this.check > 6 && this.check <= 34) {
          this.week = 5;
        } else if (this.check > 6 && this.check <= 41) {
          this.week = 6;
        }
        this.list = this.oneMonthList.slice(
          this.week * 7 - 7,
          this.week * 7 - 7 + 7
        );
      }

      //下个月
      if (this.moveStartX - this.moveEndX > 60 && this.mode == "M") {
        $("#d2").css("opacity", 0);
        // this.check = "";
        //   月份为12月
        this.chooseMonth("next");
        this.AddClass("rightmove");
        this.createCalendar(this.now_year, this.now_month);

        //          上个月
      } else if (this.moveEndX - this.moveStartX > 60 && this.mode == "M") {
        $("#d2").css("opacity", 0);
        // this.check = "";
        this.AddClass("leftmove");

        //          月份为1月
        this.chooseMonth("pre");

        this.createCalendar(this.now_year, this.now_month);
      }

      //        周显示 （下一周）
      if (this.moveStartX - this.moveEndX > 60 && this.mode == "W") {
        for (let i of this.oneMonthList) {
          i.checked = false;
        }
        // this.check = "";
        if (this.week < 5) {
          this.week++;
          this.list = this.oneMonthList.slice(
            this.week * 7 - 7,
            this.week * 7 - 7 + 7
          );
        } else if (this.week == 5) {
          //            第六周里有下个月的1号或最后一个数这个月的最大日期
          let flag = 0;
          for (let u = 0; u < 7; u++) {
            if (
              this.oneMonthList.slice(28, 35)[u].num == 1 
            ) {
              flag = 2;
              break;
            }else if(this.oneMonthList.slice(35, 42)[u].num == 1 ){
              flag = 1;
              break;
            }
          }
          if(flag === 1){
            this.week = 1;
            this.chooseMonth("next");
          }else if(flag === 2){
            this.week = 2;
            this.chooseMonth("next");
          }else{
            this.week = 6;
          }
          this.createdWeek(this.now_year, this.now_month);
          this.oneMonthList = this.list;
          this.list = this.oneMonthList.slice(
            this.week * 7 - 7,
            this.week * 7 - 7 + 7
          );
        } else if (this.week == 6) {
          this.week = 1;
          this.chooseMonth("next");
          this.createdWeek(this.now_year, this.now_month, 1);
          this.oneMonthList = this.list;
          this.list = this.oneMonthList.slice(
            this.week * 7 - 7,
            this.week * 7 - 7 + 7
          );
        }
        //   月份为12月
        this.AddClass("rightmove");

        // 上一周
      } else if (this.moveEndX - this.moveStartX > 60 && this.mode == "W") {
        for (let i of this.oneMonthList) {
          i.checked = false;
        }
        // this.check = "";
        this.AddClass("leftmove");
        //          月份为1月
        if (this.week > 1) {
          this.week--;
        } else if (this.week == 1) {
          this.week = 6;
          this.chooseMonth("pre");
          this.createdWeek(this.now_year, this.now_month);
          for (let u = 0; u < 7; u++) {
            if (
              this.oneMonthList.slice(28, 35)[u].num == 1 
            ) {
              this.week = 4;
              break;
            }else if(this.oneMonthList.slice(35, 42)[u].num == 1 ){
              this.week = 5;
              break;
            }
          }
          this.list = this.oneMonthList.slice(
            this.week * 7 - 7,
            this.week * 7 - 7 + 7
          );
        }
        this.list = this.oneMonthList.slice(
          this.week * 7 - 7,
          this.week * 7 - 7 + 7
        );
      }
    },
    createdWeek(y, m, d) {
      this.createCalendar(y, m, d);
    },
    //      月份判断
    chooseMonth(time) {
      if (time == "next") {
        if (this.now_month == 12) {
          this.now_month = 1;
          this.now_year = this.now_year + 1;
        } else {
          this.now_month = this.now_month + 1;
        }
      } else if (time == "pre") {
        if (this.now_month == 1) {
          this.now_month = 12;
          this.now_year = this.now_year - 1;
        } else {
          this.now_month = this.now_month - 1;
        }
      }
    },
    //      添加类
    AddClass(classname) {
      $("#d2").removeClass("leftmove");
      $("#d2").removeClass("rightmove");
      setTimeout(function() {
        $("#d2").addClass(classname);
      }, 50);
    },
    //      点击‘今’
    moveToday() {
      let today = new Date();
      this.now_year = today.getFullYear(); //年份
      this.now_month = today.getMonth() + 1; //月份
      this.now_day = today.getDate(); //日期
      this.checkDate = `${this.now_year}-${this.now_month>9?this.now_month:'0'+this.now_month}-${this.now_day>9?this.now_day:'0'+this.now_day}`;
      this.$emit("checkTime", this.checkDate);
      if (this.mode == "M") {
        this.createCalendar(this.now_year, this.now_month);
        for (let s of this.oneMonthList) {
          s.checked = false;
          if (s.isNowMonth) {
            if (s.num == this.now_day) {
              s.checked = true;
              this.check = s.id - 1;
            }
          }
        }
        this.list = this.oneMonthList;
      } else if (this.mode == "W") {
        this.createCalendar(this.now_year, this.now_month);
        let day = this.now_day;
        let weeks = "";
        for (let i = 0; i < this.oneMonthList.length; i++) {
          this.oneMonthList[i].checked = false;
          if (this.oneMonthList[i].isNowMonth) {
            if (day == this.oneMonthList[i].num) {
              weeks = this.oneMonthList[i].id;
            }
          }
        }
        if (weeks <= 7) {
          this.week = 1;
        } else if (weeks > 7 && weeks <= 14) {
          this.week = 2;
        } else if (weeks > 14 && weeks <= 21) {
          this.week = 3;
        } else if (weeks > 21 && weeks <= 28) {
          this.week = 4;
        } else if (weeks > 28 && weeks <= 35) {
          this.week = 5;
        } else if (weeks > 35 && weeks <= 42) {
          this.week = 6;
        }
        this.oneMonthList[weeks - 1].checked = true;
        this.check = weeks - 1;
        this.list = this.oneMonthList.slice(
          this.week * 7 - 7,
          this.week * 7 - 7 + 7
        );
      }
    },
    //      选择时间
    chooseTime() {
      this.showPopup = true;
    },
    //      确定时间
    confirmHandler() {
      this.showPopup = false;
      if(this.selectTime){
        let time = this.selectTime.split("-");
        this.now_year = time[0];
        this.now_month = parseInt(time[1]);
        this.now_day = parseInt(time[2]);
      }else{
        let time = new Date()
        this.now_year = time.getFullYear();
        this.now_month = time.getMonth() + 1;
        this.now_day = time.getDate(); 
      }
      this.$emit("checkTime", this.selectTime);
      this.checkDate = `${this.now_year}-${this.now_month>9?this.now_month:'0'+this.now_month}-${this.now_day>9?this.now_day:'0'+this.now_day}`
      if (this.mode == "M") {
        this.createCalendar(this.now_year, this.now_month);
        for (let s of this.oneMonthList) {
          if (s.isNowMonth) {
            if (s.num == this.now_day) {
              s.checked = true;
              this.check = s.id - 1;
            }
          }
        }
      } else if (this.mode == "W") {
        this.createCalendar(this.now_year, this.now_month);
        let day = this.now_day;
        let weeks = "";
        for (let i = 0; i < this.oneMonthList.length; i++) {
          this.oneMonthList[i].checked = false;
          if (this.oneMonthList[i].isNowMonth) {
            if (day == this.oneMonthList[i].num) {
              weeks = this.oneMonthList[i].id;
            }
          }
        }
        if (weeks <= 7) {
          this.week = 1;
        } else if (weeks > 7 && weeks <= 14) {
          this.week = 2;
        } else if (weeks > 14 && weeks <= 21) {
          this.week = 3;
        } else if (weeks > 21 && weeks <= 28) {
          this.week = 4;
        } else if (weeks > 28 && weeks <= 35) {
          this.week = 5;
        } else if (weeks > 35 && weeks <= 42) {
          this.week = 6;
        }
        this.oneMonthList[weeks - 1].checked = true;
        this.check = weeks - 1;
        this.list = this.oneMonthList.slice(
          this.week * 7 - 7,
          this.week * 7 - 7 + 7
        );
      }
    }
  }
  // components: {
  //   Popup,
  //   DatetimeView
  // // }
};
</script>
<style>
.event {
  position: absolute;
  content: "";
  top: -0.5rem;
  left: 50%;
  margin-left: -0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: #000;
}
.date {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: deepskyblue;
  color: #fff;
  padding: 0 3%;
  box-sizing: border-box;
}
.date:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  position: relative;
}
.triangle-down {
  position: absolute;
  right: -20px;
  top: 18px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-top: 6px solid #fff;
}
.right {
  float: right;
}
.date span.jin {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  text-align: center;
  margin-top: 8px;
}
.date span.jin:active {
  border-color: rgba(255, 255, 255, 0.6);
  color: rgba(255, 255, 255, 0.6);
}
.yearMonth:active .triangle-down {
  border-top-color: rgba(255, 255, 255, 0.6);
}
.content {
  background: mintcream;
}
.week ul {
  transition: all 1s ease;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  height: 25px;
}
.week li {
  flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 13%;
  text-align: center;
  border: 2px solid transparent;
}
.tables {
  font-size: 14px;
  color: #666;
  font-family: "微软雅黑";
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
}
.calendar ul {
  width: 100%;
  padding: 0;
  margin: 0.1rem 0;
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  list-style-type: none;
}
.calendar ul li {
  flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 14%;
  text-align: center;
  height: 43px;
  border: 0px solid transparent;
  border-radius: 50%;
}
#d2 {
  height: 350px;
  transition: height 0.5s ease;
}
.black {
  color: #333;
}
.gray {
  color: #ccc;
}
.red {
  /* border-color: springgreen !important; */
  background: springgreen !important;
}
.today {
  background: deepskyblue;
  color: #fff;
}
@keyframes moveRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes moveLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.rightmove {
  animation: moveRight 1s both;
  -moz-animation: moveRight 1s both; /* Firefox */
  -webkit-animation: moveRight 1s both; /* Safari 和 Chrome */
  -o-animation: moveRight 1s both;
}
.leftmove {
  animation: moveLeft 1s both;
  -moz-animation: moveLeft 1s both; /* Firefox */
  -webkit-animation: moveLeft 1s both; /* Safari 和 Chrome */
  -o-animation: moveLeft 1s both;
}

.close {
  float: left;
  padding: 10px;
  color: #828282;
}
.sure {
  float: right;
  padding: 10px;
  color: #ff9900;
}
</style>