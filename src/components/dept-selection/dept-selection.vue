<template>
  <div>
    <aui-input ref='deptSelection' text-align="right" :disabled="disabled" :readonly='true' unselectable="on" :show-clear="false" :placeholder="placeholder" v-model="inputValue" @focus="focusHandle">
      <span slot="label" style="color: #444444;padding-right: 10px;">{{column.label}}
        <font v-if="column.isRequired" style="color: red;font-weight: 700;">*</font>
      </span>
      <aui-icon v-if="inputValue&&!disabled" slot="right" type="clear" @click.native="clear"></aui-icon>
      <!-- <aui-icon v-if="errors.inputValue&&errors.inputValue.length" slot="right" type="warn" @click.native="showPositionValue = true"></aui-icon> -->
    </aui-input>
    <div v-transfer-dom>
      <aui-popup v-model="showPicker" :popup-style="popupStyle" @show="showMasker" @hide="hideMasker">
        <aui-popup-header class='title' left-text="取消" right-text="确定" :title="department" :show-bottom-border="false" @click-left="cancle" @click-right="confirmHandler"></aui-popup-header>
        <aui-picker class="picker" :data='deptList' @change='onChange' :columns="max+1" v-model='selectedOptions' ref="picker"></aui-picker>
      </aui-popup>
    </div>
    <!-- <aui-toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="errors.inputValue&&errors.inputValue.length?errors.inputValue[0].errorMsg:''" position="middle"></aui-toast> -->
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiPicker from "AUI/components/form-components/aui-picker";
import AuiIcon from "AUI/components/view-components/aui-icon";
import __ORG_MANAGE__ from "paas-web-utils/rules/organization";
import { orgService } from "paas-web-utils/services/index";
export default {
  name: "DeptSelection",
  components: { AuiPopupHeader, AuiPicker, AuiIcon },
  props: {
    column: {},
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    userSelection: {
      type: Boolean,
      default: false
    },
    itemProp: String
  },
  data() {
    return {
      deptList: [],
      currentValue: this.value,
      inputValue: "",
      selectedOptions: [],
      popupStyle: {
        "z-index": 1000
      },
      showPicker: false,
      max: 0,
      errors: {},
      // showPositionValue: false,
      department:''
    };
  },
  watch: {
    "column.hidden": function() {
      valid.inputValue = getValidators(this.column);
    },
    value(val) {
      if (this.currentValue === val) return;
      this.currentValue = val;
      __ORG_MANAGE__.loadVal(val).then(data => {
        this.selectedOptions = data;
      });
      let showVals = __ORG_MANAGE__.loadSycnShowVal(this.currentValue) || [];
      this.inputValue = showVals.join(" / ");
    },
    showPicker(val){
      if(!this.userSelection)return;
      if(val){
        this.$emit('changeMaskIndex',499)
      }else{
        this.$emit('changeMaskIndex',700)
      }
    }
  },
  mounted() {
    __ORG_MANAGE__.loading().then(data => {
      if(this.currentValue){
        let showVals = __ORG_MANAGE__.loadSycnShowVal(this.currentValue) || [];
        this.inputValue = showVals.join(" / ");
      }
      let floorData = this.getMaxFloor(data);
      this.treeToArray(floorData.treeData);
      orgService.findOrgList().then(data => {
        for (const list of data.organzationList) {
          if (list.orgParentCode) {
            this.deptList.push({
              name: list.orgName,
              value: list.orgCode,
              parent: list.orgParentCode === "0" ? 0 : list.orgParentCode
            });
          }
        }
      });
    });
    this.currentValue = this.value;
    console.log("this.currentValue", this.currentValue);
    if (this.currentValue) {
      // 存在 则加载全路径
      __ORG_MANAGE__.loadVal(this.currentValue).then(data => {
        this.selectedOptions = data;
      });
    }
  },
  methods: {
    showMasker(){
      // document.querySelector('.aui-popup-mask').style.zIndex = this.popupStyle['z-index'] - 1;
      document.querySelector('.aui-popup-mask').style.zIndex = 601;
    },
    hideMasker(){
      document.querySelector('.aui-popup-mask').style.zIndex = -1;
    },
    focusHandle() {
      this.$refs.deptSelection.blur();
      this.department = this.getOrgShowVal(this.selectedOptions).orgShowVal;
      this.showPicker = true;
    },
    cancle() {
      this.showPicker = false;
    },
    confirmHandler() {
      this.handleChange(this.selectedOptions);
      this.showPicker = false;
    },
    clear() {
      this.inputValue = "";
      this.currentValue = '';
      this.handleChange([]);
    },
    handleChange(data) {
      let orgData = this.getOrgShowVal(data);
      this.currentValue = orgData.orgCode;
      let showVals = orgData.orgShowValList;
      this.inputValue = showVals.join(" / ");
      this.$emit("input", this.currentValue);
      this.$emit("deptSelect", this.currentValue);
    },
    onChange(value){
      this.department = this.getOrgShowVal(value).orgShowVal;
    },
    getOrgShowVal(value){
      let orgShowValList = [];
      let i = -1;
      for (const org of value) {
        if (!org || (org && org.indexOf("Child") != -1)) {
          break;
        }
        i++;
      }
      let orgCode = i != -1 ? value[i] : "";
      if(orgCode){
        orgShowValList = __ORG_MANAGE__.loadSycnShowVal(orgCode);
      }
      let orgShowVal = '';
      if(orgShowValList.length){
        orgShowVal = orgShowValList[orgShowValList.length-1];
      }
      return {
        orgShowValList:orgShowValList,
        orgShowVal:orgShowVal,
        orgCode:orgCode
      };
    },
    getMaxFloor(treeData) {
      let floor = 0;
      this.max = 0;
      let vm = this;
      function each(data, floor) {
        data.forEach(e => {
          e.floor = floor;
          if (floor > vm.max) {
            vm.max = floor;
          }
          if (e.children && e.children.length > 0) {
            each(e.children, floor + 1);
          }
        });
      }
      each(treeData, 1);
      return {
        max: this.max,
        treeData: treeData
      };
    },
    treeToArray(treeData) {
      let max = this.max;
      let vm = this;
      let noChildren = "";
      function each(data) {
        data.forEach(e => {
          for (let i = e.floor; i < max; i++) {
            let flag = true;
            let obj = {
              name: "",
              value: `Child${i}_${e.orgCode}`,
              parent: i === e.floor ? e.orgCode : `Child${i - 1}_${e.orgCode}`
            };
            vm.deptList.push(obj);
          }
          if (e.children && e.children.length > 0) {
            each(e.children);
          }
        });
      }
      each(treeData);
    },
  }
};
</script>
<style lang='less' scoped>
.picker /deep/ .scroller-component {
 word-break: keep-all
}
.picker /deep/ .scroller-item {
  font-size: 14px;
} 
.title /deep/ .aui-popup-header-title{
  font-size: 14px
}
/* .picker .scroller-component {
  display: block;
  position: relative;
  height: 350px;
  width: 100%;
}
.picker .scroller-mask {
  height: 100%;
  margin: 0 auto;
  z-index: 3;
  background-position: top, bottom;
  background-size: 100% 140px;
  background-repeat: no-repeat;
}
.picker .scroller-indicator {
  width: 100%;
  height: 70px;
  position: absolute;
  left: 0;
  top: 141px;
  z-index: 3;
  background-position: top, bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}*/
</style>