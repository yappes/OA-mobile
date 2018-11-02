<template>
  <div>
    <aui-group>
      <aui-input ref='radioMultiple' v-model="showValue" @focus='showPopup' :readonly='true' unselectable="on" :disabled='disabled' :placeholder='placeholder' :show-clear='false'
         placeholder-align='right' text-align='right'>
        <span slot="label" style="color: #444444; padding-right: 10px;">
          {{label}}
          <font v-if='required' style="color: red;font-weight: 700;">*</font>
        </span>
        <span slot='right' :class='{arrow: !disabled}'></span>
      </aui-input>
    </aui-group>
    <div v-transfer-dom>
      <aui-popup v-model="popupShow" height='50%' :hide-on-blur='false'>
        <aui-popup-header left-text="取消" right-text="确定" title="请选择" 
          :show-bottom-border="false" @click-left="cancel" @click-right="submit">
        </aui-popup-header>
          <aui-group gutter="0">
            <aui-checklist label-position="left" :options="currentOptions" v-model="checklistValue">
            </aui-checklist>
          </aui-group>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
export default {
  components: {
    AuiPopupHeader,
  },
  props: {
    disabled: Boolean,
    placeholder: String,
    value: [Array],
    options: Array,
    label:String,
    required: Boolean,
  },
  data() {
    return {
      popupShow: false,
      //数组
      currentValue: this.value,
      //多选框选择数组
      checklistValue: [],
      tempValue: null,
      //输入框显示内容
      showValue: this.inputString(this.value)
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
    closePopup() {
      this.popupShow = false
      this.checklistValue = []
    },
    showPopup() {
      this.$refs.radioMultiple.blur();
      if(!this.currentValue) {
        this.checklistValue = []
      } else {
        this.checklistValue = this.currentValue
      }
      this.popupShow = true
    },
    cancel() {
      this.closePopup()
    },
    submit() {
      this.currentValue = this.checklistValue
      this.closePopup()
    },
    inputString(value) {
      if(!value || !this.currentOptions) {
        return null
      }
      // console.log('innnn', )
      let r = []
      this.currentOptions.forEach(option => {
        if(value.indexOf(option.key) >= 0) {
          r.push(option.value)
        }
      })
      return r.join(',')
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
      this.tempValue = val
      this.$emit('input', this.tempValue)
      this.showValue = this.inputString(val)
    },
    currentOptions(val) {
      // console.log('--------', val)
      this.showValue = this.inputString(this.currentValue)
    }
  }

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
</style>
