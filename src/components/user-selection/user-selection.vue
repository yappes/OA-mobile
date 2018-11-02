<template>
  <div>
    <aui-input text-align="right"  ref='userSelection' :readonly='true' unselectable="on" :disabled="disabled" :show-clear="false" :placeholder="placeholder" v-model="inputValue" @focus="focusHandle">
      <span slot="label" style="color: #444444;padding-right: 10px;">{{column.label}}
        <font v-if="column.isRequired" style="color: red;font-weight: 700;">*</font>
      </span>
      <aui-icon v-if="inputValue&&!disabled" slot="right" type="clear" @click.native="clear"></aui-icon>
    </aui-input>
    <div v-transfer-dom>
      <aui-popup v-model="showPopup" height="100%" :hide-on-blur='false' :show-mask="false" :popup-style="popupStyle" class='popup-dialog' @hide='hideMasker'>
        <div class="popup">
          <aui-popup-header left-text="取消" right-text="确定" :title="column.label" :show-bottom-border="false" @click-left="cancle" @click-right="confirmHandler"></aui-popup-header>
          <aui-search :autoFixed="false" v-model="queryName" placeholder="按姓名搜索" cancel-text="取消" @change="searchUser">
          </aui-search>
          <aui-group>
            <div slot='title' style='margin-top: -20px'></div>
            <dept-selection ref="dept" :column='{label:"部门筛选"}' placeholder='按部门搜索' @changeMaskIndex='changeMaskIndex' @deptSelect="deptSelect" :disabled='loading' :value="queryDept" :userSelection="true"></dept-selection>
          </aui-group>
          <aui-load-more v-if='loading' tip='数据加载中...'></aui-load-more>
          <div v-show='!loading'>
            <aui-scroller :height='dataHeight' ref="scroller" lock-x :scrollbar-y='true' v-model="scrllerStatus" :use-pulldown='false' use-pullup :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" @pulldown-loading="reFresh" @pullup-loading="nextPage">
              <aui-group>
                <div slot='title' style='margin-top: -20px'></div>
                <aui-checklist class="checllist" v-if='userList.length' :options="userList" v-model="userSelect" :max="multiple?0:1" @change="handleSelectionChange"></aui-checklist>
                <aui-load-more v-else :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></aui-load-more>
              </aui-group>
            </aui-scroller>
          </div>
        </div>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiIcon from "AUI/components/view-components/aui-icon";
import DeptSelection from "../dept-selection/dept-selection";
export default {
  name: "userSelection",
  components: { AuiPopupHeader, DeptSelection, AuiIcon },
  props: {
    column: {},
    value: {},
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    itemProp:String
  },
  data() {
    return {
      loading: false,
      showPopup: false,
      queryName: "",
      queryDept: "",
      page: 0,
      userList: [],
      userSelect: [],
      currentValue: this.value,
      inputValue: undefined,
      multipleSelection: [],
      allUserMap: undefined,
      scrllerStatus: {
        pullupStatus: "default",
        pulldownStatus: "default"
      },
      pulldownConfig: {
        content: "",
        height: 60,
        autoRefresh: false,
        downContent: "刷新",
        upContent: "",
        loadingContent: "刷新中...",
        clsPrefix: "xs-plugin-pulldown-"
      },
      pullupConfig: {
        content: "",
        pullUpHeight: 100,
        height: 40,
        autoRefresh: false,
        downContent: "下一页",
        upContent: "",
        loadingContent: "正在前往下一页...",
        clsPrefix: "xs-plugin-pullup-"
      },
      errors:{},
      popupStyle: {
        "z-index": 600
      },
      dataHeight:'0',
    };
  },
  watch: {
    'column.hidden':function(){
      valid.inputValue = getValidators(this.column);
    },
    pageUserList(list) {
      if(list.length>0){
          this.$refs.scroller.enablePullup()
      }else{
          this.$refs.scroller.disablePullup()
      }
      this.userList = [];
      for (const data of list) {
        this.userList.push({
          key: data.id,
          value: data.realName,
          inlineDesc: `手机号 : ${data.mobile}\n创建时间 : ${this.format(
            data.createTime
          )}`
        });
      }
      this.loading = false;
    },
    value(val) {
      if (val === this.currentValue) return;
      this.currentValue = val;
      this.dataEcho(val);
    },
    allUserList(list) {
      this.allUserMap = {};
      for (const data of list) {
        this.allUserMap[data.id] = data;
      }
      this.dataEcho(this.value);
    },
    inputValue(value) {
      if (!value) {
        this.currentValue = "";
        this.userSelect = [];
      }
    },
    refeshStatus(val) {
      if (val === "default") {
        this.scrllerStatus.pulldownStatus = "val";
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          });
        });
      }
    }
  },
  mounted() {
    this.dataHeight = window.innerHeight - 135 + 'px';
    this.dataEcho(this.value);
    this.$nextTick(() => {
      if (this.page == this.pageNum - 1) {
        this.$refs.scroller.disablePullup();
      }
    })
  },
  methods: {
    hideMasker(){
      document.querySelector('.aui-popup-mask').style.zIndex = - 1;
    },
    dataEcho(val) {
      if(!this.allUserMap){
        this.allUserMap = {};
        for (const data of this.allUserList) {
          this.allUserMap[data.id] = data;
        }
      }
      let values = this.strToArray(val);
      let inputValue = [];
      for (const value of values) {
        if (
          !value ||
          value == null ||
          value == "null" ||
          value == "undefined" ||
          value == ""
        )
          continue;
        let user = this.allUserMap[value];
        if (user) {
          inputValue.push(user.realName);
        } else {
          inputValue.push(value);
        }
      }
      if (this.multiple) {
        let str = "";
        for (const value of inputValue) {
          if (str) {
            str = str + "," + value;
          } else {
            str = value;
          }
        }
        this.inputValue = str;
        this.column.triggerShowValueChanage(inputValue.join(","));
      } else {
        this.inputValue = Number(inputValue[0])?'':inputValue[0];
        if (this.column) {
          this.column.triggerShowValueChanage(this.inputValue);
        }
      }
    },
    focusHandle() {
      this.$refs.userSelection.blur();
      if (!this.userList.length) {
        this.loading = true;
      }
      this.userSelect = this.strToArray(this.currentValue);
      this.showPopup = true;
    },
    changeMaskIndex(index){
      // this.popupStyle={
      //   'z-index':index
      // }
      document.querySelector('.aui-popup-mask').style.zIndex = this.popupStyle['z-index'] - 1;
    },
    confirmHandler() {
      this.showPopup = false;
      this.selectionHandlerMutiple();
    },
    cancle() {
      this.showPopup = false;
    },
    clear() {
      this.inputValue = "";
      this.currentValue = "";
      this.multipleSelection = [];
      this.handleInput();
    },
    selectionHandlerMutiple() {
      let inputValue = [];
      let selectedIds = [];
      let multipleSelection = this.multipleSelection;
      // 多选情况下 可以选择某部门下的所有用户
      if (this.multiple && multipleSelection.length === 0) {
        multipleSelection = this.userData;
      }
      if (multipleSelection && multipleSelection.length) {
        multipleSelection.forEach(item => {
          inputValue.push(this.allUserMap[item].realName);
          selectedIds.push(this.allUserMap[item].id);
        });
      }
      if (this.multiple) {
        let str = "";
        for (const value of inputValue) {
          if (str) {
            str = str + "," + value;
          } else {
            str = value;
          }
        }
        this.inputValue = str;
        if (selectedIds.length > 0) {
          this.currentValue = `,${selectedIds.join(",")},`;
        } else {
          this.currentValue = "";
        }
        console.log('this.inputValue', this.inputValue)
        let val = Array.isArray(val) ? this.inputValue : this.inputValue.split(',')
        this.column.triggerShowValueChanage(val.join(","));
      } else {
        this.inputValue = inputValue[0];
        this.currentValue = selectedIds[0];
        if (this.column) {
          this.column.triggerShowValueChanage(this.inputValue);
        }
      }
      this.dialogVisible = false;
      this.handleInput();
    },
    handleInput() {
      this.$emit("input", this.currentValue);
    },
    searchUser() {
      this.page = 0;
      if(this.queryName){
        this.$store.dispatch(
          "userData/changePageAllUserListByName",
          this.queryName
        );
      }else{
        this.$store.dispatch("userData/getAllUserList");
      }
      this.$store.dispatch("userData/changePageUserList", this.page);
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        });
      });
      setTimeout(() => {
        if (this.page == this.pageNum - 1) {
          this.$refs.scroller.disablePullup();
        } else {
          this.$refs.scroller.enablePullup();
        }
      }, 50);
    },
    deptSelect(orgCode) {
      this.queryDept = orgCode;
      this.page = 0;
      if(orgCode){
        this.$store.dispatch("userData/changePageAllUserListByOrg", orgCode);
      }else{
        this.$store.dispatch("userData/getAllUserList");
      }
      this.$store.dispatch("userData/changePageUserList", this.page);
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        });
      });
      setTimeout(() => {
        if (this.page == this.pageNum - 1) {
          this.$refs.scroller.disablePullup();
        } else {
          this.$refs.scroller.enablePullup();
        }
      }, 50);
    },
    reFresh() {
      this.page = 0;
      this.queryName = "";
      this.queryDept = "";
      this.$store.dispatch("userData/getAllUserList");
      if (this.page == this.pageNum - 1) {
        this.$refs.scroller.disablePullup();
      }else{
        this.$refs.scroller.enablePullup();
      }
    },
    nextPage() {
      this.page += 1;
      this.$store.dispatch("userData/changePageUserList", this.page);
      if (this.page == this.pageNum - 1) {
        this.$refs.scroller.disablePullup();
      }
      setTimeout(() => {
        this.scrllerStatus = {
          pullupStatus: "default",
          pulldownStatus: "default"
        };
      }, 200);
    },
    format(val) {
      let time = new Date(val);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      return `${year}-${month > 9 ? month : "0" + month}-${
        day > 9 ? day : "0" + day
      } ${hour > 9 ? hour : "0" + hour}:${minute > 9 ? minute : "0" + minute}`;
    },
    handleSelectionChange(value, label) {
      this.multipleSelection = value;
    },
    strToArray(str) {
      if (!str || str === null || str === "") return [];
      str = String(str);
      if (str.charAt(0) === ",") {
        str = str.substr(1);
      }
      if (str.charAt(str.length - 1) === ",") {
        str = str.substr(0, str.length - 1);
      }
      return str.split(",");
    },
  },
  computed: {
    allUserList() {
      return this.$store.getters["userData/allUserList"];
    },
    pageNum() {
      return this.$store.getters["userData/pageNum"];
    },
    pageUserList() {
      return this.$store.getters["userData/pageUserList"];
    },
    refeshStatus() {
      return this.$store.getters["userData/status"];
    }
  },
  created() {
    this.$store.dispatch("userData/getAllUserList");
  }
};
</script>

<style lang="less">
.popup {
  width: 100%;
  height: auto
}
.popup-dialog{
  overflow: hidden !important;
}
.checllist {
  .aui-label-desc {
    font-size: 12px;
    color: #666;
    white-space: pre;
  }
}
</style>