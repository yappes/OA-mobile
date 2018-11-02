<template>
    <div>
        <aui-input text-align="right" ref='weekSelection' :readonly='true' unselectable="on" :disabled="disabled" :show-clear="false"  :placeholder="placeholder" v-model="inputValue" @focus="focusHandle">
            <span slot="label" style="color: #444444;padding-right: 10px;">{{column.label}}
                <font v-if="column.isRequired" style="color: red;font-weight: 700;">*</font>
            </span>
            <aui-icon v-if="inputValue&&!disabled" slot="right" type="clear" @click.native="clear"></aui-icon>
            <!-- <aui-icon v-if="errors.inputValue&&errors.inputValue.length" slot="right" type="warn" @click.native="showPositionValue = true"></aui-icon> -->
        </aui-input>
        <div v-transfer-dom>
            <aui-popup v-model="showPopup" height="60%">
                <div>
                    <aui-popup-header left-text="取消" :title="column.label" :show-bottom-border="false" @click-left="cancle"></aui-popup-header>
                    <aui-inline-calendar class='calendar' ref="week" v-model="week" :render-function='weekSelectFn' @change='dateSelect'></aui-inline-calendar>
                </div>
            </aui-popup>
        </div>
    </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiIcon from "AUI/components/view-components/aui-icon";
export default {
  name: "WeekSelection",
  components: { AuiPopupHeader, AuiIcon },
  props: {
    column: {},
    value: {},
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    itemProp: String
  },
  data() {
    return {
      week: "",
      inputValue: '',
      currenValue: this.value,
      weekSelectFn: () => "",
      showPopup: false
    };
  },
  watch: {
    value(val) {
      if (val === this.currentValue) return;
      this.currentValue = val;
    }
  },
  mounted(){
      this.currentValue = this.value;
      if(this.currentValue){
        this.inputValue = this.getWeek(this.currentValue);
        this.switchViewToMonth(this.currentValue);
      }
  },
  methods: {
    focusHandle(){
      this.$refs.weekSelection.blur();
      this.showPopup=true
    },
    dateSelect(val) {
      let month = this.$refs.week.getDates();
      let flag = false,
        i = -1;
      for (const week of month) {
        i++;
        for (const date of week) {
          if (date.formatedDate === val) {
            flag = true;
            this.changeWeekSelectFn(new Date(date.formatedDate).getFullYear(),new Date(date.formatedDate).getMonth(),i);
            break;
          }
        }
        if (flag) {
          this.changeInputValue(week[1].formatedDate);
          break;
        }
      }
    },
    changeWeekSelectFn(year,month,i) {
      this.weekSelectFn = (line, index, data) => {
        return line === i && data.year === year && data.month === month
          ? '<div style="font-size:12px;text-align:center;margin:-30px 0 0 0;background-color:#f2f6fc;"><span style="display:inline-block;width:30px;height:30px;"></span></div>'
          : '<div style="font-size:12px;text-align:center;margin:-30px 0 0 0"><span style="display:inline-block;width:30px;height:30px;"></span></div>';
      };
    },
    changeInputValue(monday) {
      this.inputValue = this.getWeek(monday);
      this.currenValue = new Date(monday).getTime();
      this.$emit("input", this.currenValue);
      this.showPopup = false;
    },
    getWeek(monday) {
      let date1 = new Date(monday);
      let year = date1.getFullYear();
      let date2 = new Date(year, 0, 1);
      let d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
      let week = Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
      return `${year}年第${week}周`
    },
    clear() {
      this.inputValue = "";
      this.changeWeekSelectFn();
    },
    cancle() {
      this.showPopup = false;
    },
    switchViewToMonth(date){
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth() + 1;
        let day = new Date(date).getDate();
        this.$refs.week.switchViewToMonth(year,month);
        this.dateSelect(`${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}`);
    },
  }
};
</script>
<style lang="less" scoped>
.popup {
  width: 100%;
  height: 50%;
}
</style>

