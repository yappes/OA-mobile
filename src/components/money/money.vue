<template>
  <div>
    <aui-input class='money' text-align="right"  ref='userSelection' :disabled="disabled" :show-clear="false" :placeholder="placeholder" v-model="inputValue" @change='handleChange' @blur='showValue(inputValue)' @focus="handleFocus">
      <span slot="label" style="color: #444444;padding-right: 10px;">{{column.label}}
        <font v-if="column.isRequired" style="color: red;font-weight: 700;">*</font>
      </span>
      <template slot="right">{{column.unit}}</template>
    </aui-input>
  </div>
  <!-- <aui-input v-model='inputValue' @change='handleChange' @blur='showValue(inputValue)' @focus='handleFocus' :clearable='column.readonly' :disabled='disabled' :placeholder='placeholder'></aui-input> -->
</template>
<script>
import Address from "paas-web-utils/rules/address";
export default {
  name: "PuiMoney",
  props: {
    column:{},
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      inputValue:'',
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      if (this.currentValue === val) return;
      this.currentValue = val;
      this.showValue(this.currentValue)
    }
  },
  mounted() {
    this.currentValue = this.value;
    console.log("this.currentValue", this.currentValue);
    if (this.currentValue) {
      this.showValue(this.currentValue)
    }
  },
  methods: {
    showValue(value){
      let showValue = '';
      let len = this.column.columnData.decimalLen;
      if ((value&&String(value).match(/^(\-?)\d+(\.\d+)?$/g) !== null)||value===0) {
        if(len && len !== "0"){
          showValue = String(Number(value).toFixed(len));
        }else{
          showValue = String(value);
        }
        let arr = showValue.split('.')
        var re=/(\d)(\d{3}),/;
        arr[0] = arr[0] +','
        while(re.test(arr[0])){
          arr[0]=arr[0].replace(re,"$1,$2,");
        }
        arr[0] = arr[0].slice(0,arr[0].length-1);
        if(arr[1] && arr[1]!=="undefined" && arr[1]!=="null"){
          showValue=`${arr[0]}.${arr[1]}`
        }else{
          showValue=`${arr[0]}`
        }
      }else{
        showValue = value
      }
      this.inputValue = showValue;
    },
    handleFocus(){
      this.inputValue = this.inputValue.replace(/,/g,'');
    },
    handleChange: function(data) {
      console.log('data',data)
      if(data){
        this.currentValue = data.replace(/,/g,'');
      }else{
        this.currentValue = data;
      }
      this.$emit("input", this.currentValue);
    },
    clear() {
      this.inputValue = "";
      this.currentValue = "";
      this.handleChange();
    },
  }
};
</script>
<style lang='less' scoped>
* {
  box-sizing: border-box;
}
.money{
  /deep/
  .aui-cell__ft{
    margin-right: -5px;
    padding-left: 10px;
  }
}
</style>