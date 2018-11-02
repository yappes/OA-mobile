<template>
  <div>
    <aui-input ref='radio' v-model="showValue" @focus='showPopup' :readonly='true' unselectable="on" :disabled='disabled' :placeholder='placeholder' 
      :show-clear='false' placeholder-align='right' text-align='right'>
      <span slot="label" style="color: #444444; padding-right: 10px;">
        {{label}}
        <font v-if='required' style="color: red;font-weight: 700;">*</font>
      </span>
      <span slot='right' :class='{arrow: !disabled}'></span>
    </aui-input>
    <div v-transfer-dom >
      <!-- <aui-masker :fullscreen='true' :opacity='0.3' > -->
        <aui-popup :show-mask='true' v-model="popupShow" height='50%' @show="showMasker" @hide='hideMasker' :popup-style="popupStyle">
          <aui-popup-header left-text="取消" right-text="确定" title="请选择" 
            :show-bottom-border="false" @click-left="cancel" @click-right="submit">
          </aui-popup-header>
            <aui-group gutter="0">
              <aui-radio label-position="left" :options="currentOptions" v-model="radioValue">
              </aui-radio>
            </aui-group>
        </aui-popup>
      <!-- </aui-masker> -->
      <!-- <aui-popup v-model="popupShow" height='50%' @show="showPopup1" :popup-style="popupStyle" class='radio-popup-mask'>
        <aui-popup-header left-text="取消" right-text="确定" title="请选择" 
          :show-bottom-border="false" @click-left="cancel" @click-right="submit">
        </aui-popup-header>
          <aui-group gutter="0">
            <aui-radio label-position="left" :options="currentOptions" v-model="radioValue">
            </aui-radio>
          </aui-group>
      </aui-popup> -->
    </div>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiMasker from "AUI/components/view-components/aui-masker";
export default {
  components: {
    AuiPopupHeader,
    AuiMasker,
  },
  props: {
    disabled: Boolean,
    placeholder: String,
    value: [String, Number],
    options: Array,
    label:String,
    required: Boolean,
    popupStyle: {
      type: Object,
      default: () => {
        return {
          'z-index': 601,
          'z-index-show': 600
        }
      }
    }
  },
  data() {
    return {
      hideOnBlur: false,
      popupShow: false,
      //数组
      currentValue: this.value,
      radioValue: null,
      tempValue: null,
      //输入框显示内容
      showValue: this.inputString(this.value),
      // popupStyle:{
      //   'z-index':601,
      // },
    }
  },
  computed: {
    currentOptions() {
      return this.options.map(option => {
        return {
          key: option.value,
          value: option.name,
        }
      })
    }
  },
  methods: {
    showMasker(){
      document.querySelector('.aui-popup-mask').style.zIndex = this.popupStyle['z-index'] - 1;
    },
    hideMasker() {
      document.querySelector('.aui-popup-mask').style.zIndex = -1;
    },
    closePopup() {
      this.popupShow = false
      this.radioValue = null
    },
    showPopup() {
      this.$refs.radio.blur();
      if(!this.currentValue) {
        this.radioValue = null
      } else {
        this.radioValue = this.currentValue
      }
      this.popupShow = true
    },
    cancel() {
      this.closePopup()
    },
    submit() {
      this.currentValue = this.radioValue
      this.closePopup()
    },
    inputString(value) {
      // console.log('this.currentOptions', this.currentOptions)
      if(!value || !this.currentOptions) {
        return null
      }
      let showValue = null
      this.currentOptions.forEach(option => {
        if(String(option.key) === String(value)) {
          showValue = option.value
        }
      })
      if(showValue === null) {
        showValue = value
        console.log(`${this.label}的值${value}没有对应的显示值`)
      }
      return showValue
    }
  },
  watch: {
    value(val) {
      if(val === this.tempValue) {
        return
      }
      this.currentValue = val
    },
    currentValue(val) {
      // console.log('------------------')
      this.tempValue = val
      this.$emit('input', this.tempValue)
      this.showValue = this.inputString(val)
    },
    currentOptions(val) {
      // console.log('currentOptions', val) 
      this.showValue = this.inputString(this.currentValue)
    },
    // popupShow(val) {
    //   let maskDOM = document.querySelector('.aui-popup-mask')
    //   if(val) {
    //     // console.log(maskDOM, maskDOM.style["z-index"])
    //     document.querySelector('.aui-popup-mask').style.zIndex = 600
    //     console.log(document.querySelector('.aui-popup-mask'))
    //   }
    // }
  },

}
</script>
<style lang="less" scoped>
  .arrow {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: relative !important;
    top: -2px !important;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    margin-left: 5px;
    right: 2px;  
  }
  .radio {
    background-color: #fff;
  }
  .my-masker {
    position: fixed;
  }
</style>


