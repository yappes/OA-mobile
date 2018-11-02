<template>
    <aui-address :title="column.label" v-model="selectedOptions" :list="addressData" :popup-style="popupStyle" @show="showPopup" @hide="handleChange" :placeholder="placeholder" :disabled='disabled'>
    </aui-address>
</template>
<script>
import Address from "paas-web-utils/rules/address";
import {ChinaAddressData} from 'AUI/components/utils';
import AuiAddress from "AUI/components/form-components/aui-address.js";
export default {
  name: "PuiAddress",
  components:{AuiAddress},
  props: {
    column:Object,
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
    //   options: [],
      addressData: ChinaAddressData,
      currentValue: this.value,
      props: {
        children: "children",
        label: "name",
        value: "value",
        disabled: "disabled"
      },
      selectedOptions: [],
      popupStyle:{
        'z-index':601,
      },
    };
  },
  watch: {
    value(val) {
      if (this.currentValue === val) return;
      this.currentValue = val;
      this.selectedOptions = val.split(',')
    }
  },
  mounted() {
    // Address.loading().then(data => {
    //   this.$set(this, "options", data);
    // });
    this.currentValue = this.value;
    console.log("this.currentValue", this.currentValue);
    if (this.currentValue) {
      // 存在 则加载全路径
      this.selectedOptions = this.currentValue.split(',')
    }
  },
  methods: {
    showPopup(){
      document.querySelector('.aui-popup-mask').style.zIndex=600;
    },
    handleChange: function() {
      if(!this.selectedOptions.length)return;
      this.$emit("input", this.selectedOptions.join(','));
    }
  }
};
</script>