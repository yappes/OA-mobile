<template>
  <div class='batch-table'>
    <aui-group>
      <aui-cell :title='batchView.title' is-link @click='openBatch'></aui-cell>
    </aui-group>
    <div v-transfer-dom>
      <aui-popup v-model="showPopup" height="100%">
        <div>
          <aui-popup-header class="popup-header" left-text="关闭" right-text="保存" :title="batchView.title" :show-bottom-border="false" @click-left="cancle" @click-right="save" style='font-size:18px;background-color:#33c3cf'></aui-popup-header>
          <div v-for="(data,index) in formModel" :key="index">
            <!-- <aui-cell :title="index+1" class="title">
              <span slot="default" v-if="showBtn">
                <aui-button plain style="border-radius:99px;" mini :disabled="deleteStatus" @click.native="deleteData(index)" type="warn">删除</aui-button>
              </span>
            </aui-cell> -->
            <aui-group>
              <aui-group-title slot="title" style='font-size:12px;padding-left:15px;color:#828282;'>{{batchView.title+'('+(index+1)+')'}}
                <span style="float:right;"><aui-icon type="cancel" v-if="!deleteStatus" @click.native="deleteData(index)"></aui-icon></span>
              </aui-group-title>
              <div v-for="column in columns" :key="column.$id">
                <form-column ref='formColumn' class='formColumn' :batch-rows="batchRows" :row-index="index" :column-id="column.$id"></form-column>
              </div>
            </aui-group>
          </div>
          <aui-button @click="insertData" :disabled="insertStatus" class='add'>新增</aui-button>
          <!-- <aui-button class="button" :disabled="insertStatus" plain type="primary" @click.native="insertData">+</aui-button> -->
        </div>
      </aui-popup>
    </div>
  </div>
</template>

<script>
import { setImmediate } from "timers";
import inputAdaptive from "@/components/input-adaptive/src/input-adaptive";
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiGroupTitle from "AUI/components/view-components/aui-group-title";
import AuiIcon from "AUI/components/view-components/aui-icon";
export default {
  name: "BatchTable",
  props: {
    batchView: {
      type: Object
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      errors: {},
      showPopup:false,
      formModel: this.batchView.formModel,
      batchRows: this.batchView.batchRows,
    };
  },
  watch: {
    columns() {
      console.log("this.columns", this.columns);
    }
  },
  computed: {
    columns() {
      return this.batchView.columns.filter(function(column) {
        return !column.hidden;
      });
    },
    insertStatus() {
      if (!this.batchView.maxLen) return false;
      return this.batchRows.length >= this.batchView.maxLen;
    },
    deleteStatus() {
      return this.batchRows.length <= this.batchView.minLen;
    }
  },
  // mounted() {
  //   console.log("this.batchView", this.batchView);
  // },
  methods: {
    insertData() {
      let error = this.batchView.insertData();
      if (error instanceof Error) {
        this.$aui.toast.show({
          text: error.message
        });
      }
    },
    deleteData(index) {
      let error = this.batchView.deleteData([index]);
      if (error instanceof Error) {
        this.$aui.toast.show({
          text: error.message
        });
      }
    },
    openBatch(){
      this.showPopup = true;
    },
    cancle(){
      this.showPopup = false;
    },
    save(){
      this.validate().then(data =>{
        this.showPopup = false;
      })
    },
    validate() {
      let promises = [];
      let formColumns =  this.$refs.formColumn
      if(!formColumns) {
        return Promise.resolve(true)
      }
      formColumns.forEach(column => {
        promises.push(column.$children[0].validate());
      });
      return Promise.all(promises).then(
        function() {
          return Promise.resolve(true);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  components: {
    AuiPopupHeader,
    AuiGroupTitle,
    AuiIcon,
    FormColumn: {
      components: {
        inputAdaptive
      },
      props: {
        batchRows: {},
        rowIndex: {},
        columnId: {}
      },
      computed: {
        batchRow() {
          return this.batchRows[this.rowIndex];
        },
        formModel() {
          return this.batchRow.formModel;
        },
        column() {
          return this.batchRow.columnMap[this.columnId];
        },
        itemProp() {
          return `formModel.${this.rowIndex}.${this.column.valKey}`;
        },
        hidden() {
          return this.column.hidden;
        },
        inputValue: {
          get() {
            return this.formModel[this.column.valKey];
          },
          set(value) {
            this.$set(this.formModel, this.column.valKey, value);
          }
        }
      },
      methods: {
        handleValueChanage() {
          this.column.triggerChange(this.formModel);
        },
        format(formModel, column) {
          if (column.type.format) {
            return (
              column.type.format(formModel[column.valKey]) ||
              formModel[column.showValKey]
            );
          }
          let showVal = formModel[column.showValKey];
          if (showVal === null || showVal === "null") showVal = undefined;
          let val = formModel[column.valKey];
          if (val === null || val === "null") val = undefined;
          return showVal || val;
        }
      },
      render(h) {
        if (this.batchRow.status === "is-remove") {
          return <span>{this.format(this.formModel, this.column)}</span>;
        }
        let adaptiveConfig = {
          props: {
            value: this.inputValue,
            itemProp: this.itemProp
          },
          on: {
            input: value => {
              this.inputValue = value;
            },
            change: this.handleValueChanage
          }
        };
        return (
          <input-adaptive column={this.column} {...adaptiveConfig} batch />
        );
      }
    }
  }
};
</script>

<style lang='less' scoped>
.title {
  background: aliceblue;
}
.popup {
  width: 100%;
  height: 100%;
}
.button {
  width: 90%;
  margin: 10px 5%;
}
.batch-table /deep/ .agree-aui-label:before {
    display: inline-block;
    content: "";
    width: 3px;
    height: 14px;
    background-color: #5ae884;
    margin-right: 10px;
    vertical-align: middle;
}
.formColumn{
  &::before {
    content: " ";
    position: absolute;
    // height: 1px;
    width:100%;
    border-bottom: 1px solid #d9d9d9;
    color: #d9d9d9;
    transform-origin: 0 0;
    transform: scaleY(.5);
    left: 15px;
  }
}
.add{
  margin-top: 10px;
  border-radius: 0px;
  &::after {
    border: 0px !important;
  }
}
.popup-header {
    /deep/ .aui-popup-header-left {
        color:white
    }
    /deep/ .aui-popup-header-title {
        color:white
    }
    /deep/ .aui-popup-header-right {
        color:white
    }
}
</style>
