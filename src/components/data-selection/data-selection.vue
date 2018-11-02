<template>
  <div class="data-selection">
    <aui-input text-align="right" ref="dataSelection" property="inputValue" :readonly='true' unselectable="on" :disabled="disabled" :show-clear="false" :placeholder="placeholder" v-model="inputValue" @click.native="handleFocus">
      <span slot="label" style="color: #444444; padding-right: 10px;">
        {{column.label}}
        <font v-if="column.isRequired" style="color: red;font-weight: 700;">*</font>
      </span>
      <aui-icon v-if="inputValue" slot="right" type="clear" @click.native.stop="handleClear"></aui-icon>
    </aui-input>

    <div v-transfer-dom>
      <aui-popup v-model="isShowPop" :popup-style="popupStyle" height="100%">
        <div class="popup">
          <aui-popup-header left-text="取消" :right-text="multiple ? '确定' : ''" :show-bottom-border="false" @click-left="handleCancelSelect" @click-right="handleConfirmSelect"></aui-popup-header>
          <aui-search :autoFixed="false" v-model="fuzzyQueryVal" placeholder="搜索" cancel-text="取消" @submit="handleFuzzyQuery"></aui-search>
          <aui-scroller ref="scroller" lock-x v-model="scrllerStatus" use-pulldown use-pullup :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" @pulldown-loading="handleRefresh" @pullup-loading="handleNextPage">
             <aui-checklist
              ref="checklist"
              :options="pageDataList"
              :max="maxNum"
              v-model="selectedList"
              label-position="left"
              @change="handleChangeSelect">
            </aui-checklist>
          </aui-scroller>
         
        </div>
        <div v-transfer-dom>
          <aui-loading :show="datasource.reload" text="加载中..."></aui-loading>
        </div>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiIcon from "AUI/components/view-components/aui-icon";
import { businessService } from "paas-web-utils/services";
export default {
  name: "DataSelection",

  components: {
    AuiPopupHeader,
    AuiIcon
  },

  props: {
    column: {},
    value: {},
    placeholder: String,

    // 是否禁止输入
    disabled: {
      type: Boolean,
      default: true
    },

    // 是否多选
    multiple: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isShowPop: false,
      allDataList: [], // 所有可选数据集合
      pageDataList: [], // 分页可选数据集合
      selectedList: null, // 当前选中数据集合
      fuzzyQueryVal: '',
      inputValue: undefined, // 输入框数据
      currentValue: this.value,
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
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: "下一页",
        upContent: "",
        loadingContent: "正在前往下一页...",
        clsPrefix: "xs-plugin-pullup-"
      },
      totalPage: 1,
      datasource: {},
      showValKey: '', // 外键显示值
      popupStyle:{
        'z-index':1000
      }
    }
  },

  computed: {
    maxNum() {
      return this.multiple ? 9999 : 1;
    }
  },

  watch: {
    value(val) {
      if (val === this.currentValue) return;
      this.currentValue = val;
      this.dataEcho(val);
    },

    inputValue(value) {
      if (!value) {
        this.currentValue = '';
        this.selectedList = [];
        this.$emit("input", this.currentValue);
      }
    },

    'datasource.reload': function(val) {
      //监听reload并刷新列表
      if (val) {
        setTimeout(() => {
          console.log(`reload viewId（${this.datasource.viewId}）`, this['_uid']);
          this.queryPageBusiness();
        });
      }
    },
  },

  mounted() {
    this.dataEcho(this.value);
  },

  methods: {
    dataEcho(val) {
      let values = undefined;
      let inputValue = [];
      if(val){
        values = this.strToArray(val);
      }else{
        if (this.multiple) {
          this.inputValue = inputValue;
          this.column.triggerShowValueChanage(this.inputValue.join(","));
        } else {
          this.inputValue = inputValue[0];
          this.column.triggerShowValueChanage(this.inputValue);
        }
        return;
      }
      businessService.findAllByViewIdAndRecordIds({
        viewId: this.column.datasource.viewId,
        recordIds: values
      }).then(res => {
        this.column.dataShowColumn().then(column => {
          res.forEach(item => {
            inputValue.push(item[column.showValKey] || item[column.valKey]);
          });
          if (this.multiple) {
            this.inputValue = inputValue;
            this.column.triggerShowValueChanage(this.inputValue.join(","));
          } else {
            this.inputValue = inputValue[0];
            this.column.triggerShowValueChanage(this.inputValue);
          }
        });
      });
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

    // 打开列表
    handleFocus() {
      this.$refs.dataSelection.blur();
      this.isShowPop = true;
      this.column.foreignKeyView().then(view => {
        view.mobileListTitle && this.$set(this, 'showValKey', view.mobileListTitle.showValKey);
        this.$set(this, "datasource", view.datasource);
        this.$set(this.datasource, "reload", true);
      });
    },

    // 请求列表数据
    queryPageBusiness() {
      businessService.pageBusiness(this.datasource).then(
        res => {
          res.record && res.record.forEach(item => {
            let newRecord = {
              key: item.ID,
              value: item[this.showValKey]
            }
            this.pageDataList.push(newRecord);
          })

          this.$set(this, 'totalPage', res.totalPage);
          this.$set(this.datasource, 'reload', false);
        },
        () => {
          this.$set(this.datasource, 'reload', false);
        }
      );
    },

    // 单选-改变选择项
    handleChangeSelect(value, label) {
      if(this.isShowPop && !this.multiple) {
        this.inputValue = label[0];
        this.currentValue = this.selectedList[0];
        this.handleInput();
      }
    },

    // 多选-确定选择
    handleConfirmSelect() {
      if(this.multiple) {
        let selectList = this.$refs.checklist.getFullValue(),
            selectLabel = '';

        if(selectList.length) {
          selectList.forEach(col => selectLabel += col.label + ',');
          this.inputValue = selectLabel.substring(0, selectLabel.length -1);
          this.currentValue = this.selectedList.join(',');
        } else {
          this.inputValue = '';
          this.currentValue = '';
        }
        this.handleInput();
      }
    },

    // 确定选择
    handleInput() {
      this.$emit("input", this.currentValue);
      this.handleCancelSelect();
    },

    // 取消选择
    handleCancelSelect() {
      this.isShowPop = false;
      this.$set(this.datasource, 'currentPage', 1);
      this.$set(this.datasource, 'fuzzyQueryVal', '');
      this.$set(this, 'fuzzyQueryVal', '');
      this.$set(this, 'pageDataList', []);
    },

    // 清除数据
    handleClear() {
      this.inputValue = '';
      this.selectedList = [];
    },

    // 刷新数据
    handleRefresh() {
      this.$set(this, 'pageDataList', []);
      this.$set(this.datasource, 'currentPage', 1);
      this.$set(this.datasource, 'reload', true);
      setTimeout(() => {
        this.$refs.scroller.donePulldown();
      }, 1000);
    },

    // 加载下一页
    handleNextPage() {
      if (this.datasource.currentPage >= this.totalPage) {
        this.datasource.currentPage = this.totalPage;
      } else {
        this.datasource.currentPage += 1;
        this.$set(this.datasource, 'reload', true);
      }
      setTimeout(() => {
        this.scrllerStatus = {
          pullupStatus: "default",
          pulldownStatus: "default"
        };
        this.$refs.scroller.donePullup();
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          });
        });
      }, 200);
    },

    // 搜索
    handleFuzzyQuery() {
      this.$set(this, 'pageDataList', []);
      this.$set(this.datasource, 'currentPage', 1);
      this.$set(this.datasource, 'fuzzyQueryVal', this.fuzzyQueryVal);
      this.$set(this.datasource, 'reload', true);
    }
  }
};
</script>

<style lang="less">
  .data-selection {
    position: relative;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      transform-origin: 0 0;
      transform: scaleY(.5);
      left: 15px;
    }
    .popup {
      width: 100%;
      height: 100%;
    }
  }
</style>