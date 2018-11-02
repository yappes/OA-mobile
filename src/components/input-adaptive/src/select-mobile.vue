<template>
  <aui-popup-picker :data='currentOptions' :display-format='format' v-model='currentValue'  @show="showPopup"
    :placeholder='placeholder' :disabled='disabled' :popup-style="popupStyle">
    <span slot="title" style="color: #444444; padding-right: 10px;">
      {{label}}
      <font v-if='required' style="color: red;font-weight: 700;">*</font>
    </span>
  </aui-popup-picker>
</template>

<script>
export default {
  props: {
    placeholder: String,
    disabled: Boolean,
    value: [Number, String],
    required: Boolean,
    label: String,
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      currentValue: this.getCurrentValue(),
      tempValue: null,
      emptyOption: {
        value: null,
        name: '',
      },
      popupStyle:{
        'z-index':601,
      },
    }
  },
  computed: {
    currentOptions() {
      if(this.options.length === 0) {
        return [[this.emptyOption]]
        // return [[]]
      }
      return [this.options]
    }
  },
  methods: {
    showPopup(){
      document.querySelector('.aui-popup-mask').style.zIndex=600;
    },
    format(value) {
      console.log('format value', value)
      if(JSON.stringify(value) ===  JSON.stringify([this.emptyOption])) {
        return value[0].name
      }
      let key = value[0]
      let maps = this.options.filter(option => {
        return String(option.value) === String(key)
      })
      if(maps.length === 0) {
        console.log(`select组件中无值-${value}-对应的选项`, value[0])
        // if(key.name) {
        //   console.log('gua', value[0].name)
        //   return value[0].name
        // }
        return value[0]
      }
      return maps[0].name
    },
    getCurrentValue() {
      if(!this.value) {
        return []
      }
      return [String(this.value)]
    }
  },
  watch: {
    value(val) {
      if(val === this.tempValue) {
        return
      }
      this.currentValue = this.getCurrentValue()
    },
    currentValue(val) {
      console.log('watch currentValue', val)
      if(!val || JSON.stringify(val) === '[]' ||  JSON.stringify(val) ===  JSON.stringify([this.emptyOption])) {
        this.tempValue = null
      }else {
        this.tempValue = val[0]
      }
      this.$emit('input', this.tempValue)
    }
  },
  mounted() {
    console.log('mounted', this.value)
  }
}
</script>

<style lang="less" scoped>
</style>

