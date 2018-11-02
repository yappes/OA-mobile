<template>
  <div>
    <aui-group>
      <aui-input ref='dateRange' v-model="showValue" @focus='showPopup' :disabled='disabled' :placeholder='placeholder' :readonly='true' unselectable="on"
        :show-clear='false' placeholder-align='right' text-align='right'>
        <span slot="label" style="color: #444444; padding-right: 10px;">
          {{label}}
          <font v-if='required' style="color: red;font-weight: 700;">*</font>
        </span>
      </aui-input>
    </aui-group>
    <div v-transfer-dom>
      <aui-popup v-model="popupShow" height='50%' :hide-on-blur='false'>
        <aui-popup-header left-text="取消" right-text="确定" title="请选择时间范围" 
          :show-bottom-border="false" @click-left="cancel" @click-right="submit">
        </aui-popup-header>
          <aui-group gutter="0">
            <div class='half'>
              <p class='picker-title'>请选择开始时间</p>
              <aui-datetime-view v-model='startModel' :format='format' :min-year='1900' :max-year='2100'></aui-datetime-view>
            </div>
            <div class='half'>
              <p class='picker-title'>请选择结束时间</p>
              <aui-datetime-view v-model='endModel' :format='format' :min-year='1900' :max-year='2100'></aui-datetime-view>
            </div>
          </aui-group>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiDatetimeView from "AUI/components/form-components/aui-datetime-view";
export default {
  components: {
    AuiPopupHeader,
    AuiDatetimeView,
  },
  props: {
    disabled: Boolean,
    placeholder: String,
    value: Array,
    label: String,
    required: Boolean,
    format: String,
  },
  data() {
    return {
      popupShow: false,
      //数组
      tempValue: null,
      //输入框显示内容
      showValue: null,
      startValue: null,
      endValue: null,
      // startDate: "",
      // endDate: "",
      startModel: null,
      endModel: null,
    };
  },
  methods: {
    now() {
      let unix = new Date().getTime()
      return this.timeString(unix)
    },
    closePopup() {
      this.popupShow = false;
      this.startModel = null;
      this.endModel = null;
    },
    showPopup() {
      // if (!this.currentValue) {
      //   this.radioValue = null;
      // } else {
      //   this.radioValue = this.currentValue;
      // }
      this.$refs.dateRange.blur();
      this.startModel = this.startValue || this.now()
      this.endModel = this.endValue || this.now()
      this.popupShow = true;
    },
    cancel() {
      this.closePopup();
    },
    submit() {
      let startDate = this.timeStamp(this.startModel)
      let endDate = this.timeStamp(this.endModel)
      if(startDate > endDate) {
        console.log('开始时间不能大于结束时间')
        this.$aui.toast.show({
          text: '开始时间不能大于结束时间',
          type: 'warn'
        })
        return 
      }
      this.startValue = this.startModel
      this.endValue = this.endModel
      this.closePopup();
    },
    //字符串---> 时间戳
    timeStamp(dateTime) {
      if (!dateTime) {
        return null;
      }
      let dateString = dateTime.split(" ")[0];
      let timeString = dateTime.split(" ")[1];
      let date = dateString.split("-");
      let r_date = date.join("/");
      return new Date(r_date).getTime();
    },
    //时间戳--->显示字符串
    timeString(timeStamp) {
      if (!timeStamp) {
        return null;
      }
      let date = new Date(Number(timeStamp));
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    startEndValue() {
      let val = this.value
      if(!val || val.length === 0) {
        this.startValue = null
        this.endValue = null
      }
      if (val === this.tempValue) {
        return;
      }
      let startDate = val[0]
      let endDate = val[1]
      this.startValue = this.timeString(startDate)
      this.endValue = this.timeString(endDate)
      this.showValue = this.startValue + '至' + this.endValue
    }
  },
  watch: {
    value(val) {
      this.startEndValue()
    },
    startValue(val) {
      this.showValue = val + '至' + this.endValue
      let startDate = this.timeStamp(val)
      let endDate = this.timeStamp(this.endValue)
      this.tempValue = [startDate, endDate]
      this.$emit('input', this.tempValue)
    },
    endValue(val) {
      this.showValue = this.startValue + '至' + val
      let startDate = this.timeStamp(this.startValue)
      let endDate = this.timeStamp(val)
      this.tempValue = [startDate, endDate]
      this.$emit('input', this.tempValue)
    },
  },
  mounted() {
    this.startEndValue()
  }
};
</script>
<style>
  .half {
    width: 49%;
    float: left,
  }

  .picker-title { 
    text-align: center;
    padding: 5px 0;
  }
</style>


