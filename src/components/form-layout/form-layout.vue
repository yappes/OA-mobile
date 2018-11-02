<template>
  <div>
    <aui-group :title='formView.title' gutter='10px'>
      <div :key="column.$id" v-for="column in columns" v-show="!column.hidden">
        <template v-if="!isDetail || isEdits[column.$id]">
          <from-adaptive ref="formColumn" class='formColumn' :form-model="formModel" :column="column"></from-adaptive>
        </template>
        <template v-else>
          <file-preview v-if="column.type.val === 'image' || column.type.val === 'file'" :label="column.label" :files="formModel[column.showValKey]"></file-preview>
          <aui-cell class='form' v-else :title='column.label+":"' value-align='right' :value='showValue(formModel, column)'></aui-cell>
        </template>
      </div>
    </aui-group>
  </div>
</template>
<script>
import FilePreview from "./file-preview.vue";
import inputAdaptive from "@/components/input-adaptive/src/input-adaptive";

export default {
  name: "FormLayout",
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    formView: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdits: {},
      columns: [],
      formModel: {}
    };
  },
  mounted() {
    // 将数据使用getter和setter方法设置到上下文中
    this.$set(this, "formModel", this.formView.formModel);
    this.$set(this, "columns", this.formView.columns);
    this.isEdit = !this.isDetail;
    // console.log(this.formView.title, "formModel", this.formModel);
    // console.log(this.formView.title, "formView", this.formView);
  },
  methods: {
    showValue(formModel, column) {
      // console.log(formModel, column);
      if (column.type.format) {
        if(column.columnData.colMark === "MONEY"){
          return (
            column.type.format(formModel[column.valKey],column.columnData.decimalLen) ||
            formModel[column.showValKey]
          );
        }else{
          return (
            column.type.format(formModel[column.valKey]) ||
            formModel[column.showValKey]
          );
        }
      }
      let showVal = formModel[column.showValKey];
      if (showVal === null || showVal === "null") showVal = undefined;
      let val = formModel[column.valKey];
      if (val === null || val === "null") val = undefined;
      return showVal || val;
    },
    validate() {
      let promises = [];
      this.$refs.formColumn.forEach(column => {
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
    FilePreview,
    FromAdaptive: {
      components: {
        inputAdaptive
      },
      name: "FromAdaptive",
      props: {
        formModel: {},
        column: {}
      },
      computed: {
        inputValue: {
          get() {
            if(this.column.columnData.columnCode === "C_USER_CODE" || this.column.columnData.columnCode === "U_USER_CODE"){
              return this.formModel[this.column.showValKey] || this.formModel[this.column.valKey];
            }
            return this.formModel[this.column.valKey];
          },
          set(value) {
            this.$set(this.formModel, this.column.valKey, value);
          }
        }
      },
      render(h) {
        let config = {
          props: {
            column: this.column,
            value: this.inputValue,
            itemProp: this.column.valKey
          },
          on: {
            input: value => {
              this.inputValue = value;
            },
            change: () => {
              this.column.triggerChange(this.formModel);
            }
          }
        };
        return <input-adaptive ref="" {...config} />;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.form {
  padding: 5px 15px;
  border-top: 1px dotted #d9d9d9;
}
.form /deep/ .aui-cell__ft.aui-cell-align-left {
  padding-left: 20px !important;
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
</style>
