import { CONDITION_TYPE } from "paas-web-utils/rules/enum";
import dateAdaptive from './date-adaptive'
import weekSelection from '@/components/week-selection/week-selection'
import dateRange from './date-range'
import selectMobile from './select-mobile'
import selectMobileMultiple from './select-mobile-multiple'
import radioMobile from './radio-mobile'
import deptSelection from '../../dept-selection/dept-selection'
import userSelection from '../../user-selection/user-selection'
import dataSelection from '../../data-selection/data-selection'
import validTemplate from '@/components/validate-component/ValidTemplate'
import AsyncValidator from '@/common/async-validator'

// import { getValidators } from "@/common/validators.js";
// import { ValidatorManager } from "ab-manager-validator";

// import RelatedInput from "./related-input";
import FileUpload from "./file-upload";
import ImageUpload from "./image-upload";
import BatchUpload from "./batch-upload";
import MobileAddress from "@/components/address/address";
import Money from "@/components/money/money";
// let errMsg = ''
export default {
  name: "PuiInputAdaptive",
  componentName: "PuiInputAdaptive",
  components: {
    dateAdaptive,
    weekSelection,
    selectMobile,
    selectMobileMultiple,
    deptSelection,
    validTemplate,
    userSelection,
    dataSelection,
    radioMobile,
    dateRange,
    MobileAddress,
    Money
  },
  // mixins: [ValidatorManager],
  // validators: valid,
  // components: { RelatedInput, FileUpload, ImageUpload, BatchUpload },
  props: {
    // column: {},
    column: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {},
    conditionType: {},
    batch: Boolean,
    itemProp: String,
  },
  computed: {
    condition() {
      if (this.conditionType) {
        for (const key in CONDITION_TYPE) {
          if (CONDITION_TYPE.hasOwnProperty(key)) {
            const element = CONDITION_TYPE[key];
            if (this.conditionType == element.value) {
              return element.type || "";
            }
          }
        }
      }
      return "";
    },
    itemType() {
      let itemType = this.column.type.val;
      let condition = this.condition;
      if (this.batch) {
        switch (itemType) {
          case "checkbox":
          case "radio":
          case "radioGroup":
          case "checkboxGroup":
          case "select":
            itemType = "select";
            break;
          case "textArea":
          case "input":
            itemType = "input";
            break;
          case 'file':
          case 'image':
            itemType = "batchUpload";
            break;
        }
      }
      return `${itemType}${condition}`;
    }
  },
  watch: {
    value(val) {
      // 改变内容重写显示数据
      if(this.column.isDict){
        let values = String(val).split(",");
        let showValues = [];
          for (const value of values) {
            let dist = this.column.datasource.loadVal(value);
            if(dist){
              showValues.push(dist.then(function(dictObj){
                return dictObj.dictName
              }))
            }
          }
          Promise.all(showValues).then((values) => {
            this.column.triggerShowValueChanage(values.join(","))
          });
      }
      if (this.currentValue !== val) {
        this.currentValue = val;
        // 内容改变
        this.changeEmit();
      }
    },
    column() {
      if (this.$dictWatchFn) {
        this.$dictWatchFn();
        delete this.$dictWatchFn;
      }
      this.initDictWatch();
    }
  },
  data() {
    return {
      options: [],
      currentValue: this.value,
      errMsg: '',
    };
  },
  created() {
    this.initDictWatch();
  },
  methods: {
    validate() {
      let data = {
        column: this.currentValue
      }
      let rule = {
        column: this.column.rules,
      }
      //隐藏字段不校验
      //返回true
      if(this.column.hidden) {
        this.errMsg = ''
        return Promise.resolve(true)
      }
      if(!this.column.rules.length) {
        this.errMsg = ''
        return Promise.resolve(true)
      }
      let validator = new AsyncValidator(data, rule)
      //then为校验成功,返回true
      //catch为校验失败,返回Error对象
      return validator.validate().then(() => {
        this.errMsg = ''
        return Promise.resolve(true)
      }).catch(errors => {
        let errMsg = errors.map(error => {
          return error.message
        }).join(',')
        this.errMsg = errMsg
        let errString = `${this.itemProp}/${errMsg}`
        let err = new Error(errString)
        return Promise.reject(err)
      })
    },
    inputEmit(val) {
      if (val instanceof Array) {
        val = val.join(",");
      }
      // this.validate()
      this.$emit("input", val);
    },
    changeEmit() {
      this.validate()
      this.$emit("change", this.currentValue);
      console.log(`【${this.column.label}】数据改变: `, this.currentValue, this);
    },
    initDictWatch() {
      // 字典字段
      if (this.column.isDict) {
        this.$dictWatchFn = this.$watch("column.datasource.reload", val => {
          if (val) {
            this.dictLoading();
            this.$set(this.column.datasource, "reload", false);
          }
        });
        this.dictLoading();
      }
    },
    dictLoading() {
      this.column.datasource.loading().then(res => {
        this.options.splice(0, this.options.length);
        (res || []).forEach(element => {
          this.$set(this.options, this.options.length, element);
        });
      });
    },
  },
  render(h) {
    let dynamic = <span />;
    let append = h(false);
    let config = {
      props: {
        value: this.currentValue,
        placeholder: this.column.placeholder,
        disabled: this.column.readonly,
        required: this.column.isRequired,
        itemProp: this.itemProp,
        column: this.column,
        label: this.column.label,
      },
      on: {
        input: this.inputEmit
      },
    };
    if (this.column.componentRender) {
      return this.column.componentRender(h, config);
    }
    if(this.column.hidden) {
      return (dynamic)
    }
    // console.log('input adapt', this.itemType)
    switch (this.itemType) {
      case "textArea":
      append = (
        <template slot="label">
          <span style="color: #444444; margin-right: 10px">{this.column.label}</span>
          {this.column.isRequired ? <font style="color: red;font-weight: 700;margin-left:5px">*</font>: ''}
        </template>
        )
        dynamic = <aui-textarea {...config} placeholder-align='right'>{append}</aui-textarea>;
        break;
        case "money":
        dynamic = <Money {...config}/>;
        break;
      case "file":
        config.props['action'] = this.column.datasource.action;
        config.props['accept'] = this.column.datasource.accept;
        config.props['multiple'] = this.column.datasource.multiple;
        dynamic = (<FileUpload {...config} column={this.column} ref='valid'></FileUpload>);
        break;
      case "image":
        config.props['action'] = this.column.datasource.action;
        config.props['accept'] = this.column.datasource.accept;
        config.props['multiple'] = this.column.datasource.multiple;
        dynamic = (<ImageUpload {...config} column={this.column} ref='valid'></ImageUpload>);
        break;
      case "batchUpload":
        config.props['datasource'] = this.column.datasource;
        config.props['title'] = this.column.label;
        config.props['type'] = this.column.type.val;
        dynamic = <BatchUpload {...config} column={this.column} ref='valid'>{this.column.label}</BatchUpload>
        break;
      case "radio":
      case "radioGroup":
        config.props.popupStyle = this.column.popupStyle
        if(this.column.customOptions) {
          let optionsradioGroup = this.column.customOptions
          dynamic = (
            <radio-mobile {...config} options={optionsradioGroup}></radio-mobile>
          );
        }else if(this.column.datasource.loading) {
          let optionsradioGroup = this.options.map(option => {
            return {
              value: option.value,
              name: option.label,
            }
          })
          // console.log('optionsradioGroup', optionsradioGroup)
          dynamic = (
            <radio-mobile {...config} options={optionsradioGroup}></radio-mobile>
          );
        } else {
          dynamic = <aui-input {...config} ref='valid'/>
        }
      break;
      case "checkbox":
        // dynamic = <aui-input {...config} ref='valid'/>;
        // break;
      case "checkboxGroup":
        config.props.value = this.currentValue ? this.currentValue.split(",") : [];
        if(this.column.datasource.loading) {
          let optionscheckboxGroup = this.options.map(option => {
            return {
              value: option.value,
              name: option.label,
            }
          })
          dynamic = (
            <select-mobile-multiple {...config} options={optionscheckboxGroup}></select-mobile-multiple>
          )
        } else {
          dynamic = <aui-input {...config} />
        }
      break;
      case "month":
      case "year-month":
        // dynamic = <aui-date-picker {...config} type="month" value-format="timestamp" />;
        dynamic = (
          <date-adaptive {...config} format='YYYY-MM' ref='valid'/>
        );
        break;
      case "year":
        // dynamic = <aui-date-picker {...config} type="year" value-format="timestamp" />;
        dynamic = <date-adaptive {...config} format='YYYY' ref='valid'/>
        break;
      case "week":
        // dynamic = <aui-date-picker {...config} type="week" value-format="timestamp" />;
        dynamic = <week-selection {...config} ref='valid'/>        
        break;
      case "time":
        // dynamic = <aui-time-select {...config} />;
        dynamic = <date-adaptive {...config} format='HH:mm' ref='valid'/>;
        break;
      case "monthDay":
        dynamic = (
          // <aui-date-picker
          //   {...config}
          //   format="MM-dd"
          //   value-format="timestamp"
          // />
          <date-adaptive {...config} format='MM-DD' ref='valid'/>
        );
        break;
      case "date":
        dynamic = (
          <date-adaptive {...config} format='YYYY-MM-DD' ref='valid'/>
        );
        break;
      case "datetime":
        dynamic = (
          <date-adaptive {...config} format='YYYY-MM-DD HH:mm' ref='valid'/>
        );
        break;
      //TODO:时间范围选择
      case "datetimeSelect":
        config.props.value = this.currentValue ? this.currentValue.split(",") : [];
        dynamic = (
          <date-range {...config} format='YYYY-MM-DD'/>
        );
        break;
      case "datetimeRegion":
        let list = [{
          name: '今天',
          value: 1,
        },{
          name: '昨天',
          value: 2,
        },{
          name: '明天',
          value: 3,
        },{
          name: '本周',
          value: 4,
        },{
          name: '上周',
          value: 5,
        },{
          name: '本月',
          value: 6,
        },{
          name: '上月',
          value: 7,
        },{
          name: '本年',
          value: 8,
        },{
          name: '上年',
          value: 9,
        }]
        dynamic = (
          <select-mobile {...config} options={options} ref='valid'>
          </select-mobile>
        );
        break;
      case "color":
        let colors = ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff']
        dynamic = <aui-color-picker {...config}  colors={colors} ref='valid'/>;
        break;
      case "select":
        let optionsselect = this.options.map(option => {
          return {
            value: option.value,
            name: option.label
          }
        })
        if(!this.column.isMultiple) {
          dynamic = (
            <select-mobile {...config} options={optionsselect} ref='valid'></select-mobile>
          )
        }else {
          config.props.value = this.currentValue ? this.currentValue.split(",") : [];
          dynamic = (
            <select-mobile-multiple {...config} options={optionsselect} ref='valid'></select-mobile-multiple>
          )
        }
        break;
      case "dataFkSelect":
      case "dataSelect":
        dynamic = (
          <data-selection
            {...config}
            column={this.column}
            multiple={this.column.isMultiple}
          />
        );
        break;
      case "userSelect":
        dynamic = (
          <user-selection {...config} column={this.column} multiple={this.column.isMultiple} ref='valid'/>
        );
        break;
      case "deptSelect":
        dynamic = <dept-selection {...config} column={this.column} hidden={this.column.hidden} itemProp={this.itemProp} ref='valid'/>;
        break;
      case "address":
        dynamic = <mobile-address {...config} column={this.column} hidden={this.column.hidden} itemProp={this.itemProp} ref='valid'/>;
        break;
      case "input":
        let inputConfig = {
          props: {
            value: this.currentValue,
            placeholder: this.column.placeholder,
            disabled: this.column.readonly,
          },
          on: {
            input: this.inputEmit
          },
        }
        append = (
          <template slot="label">
            <span style="color: #444444">{this.column.label}</span>
            {this.column.isRequired ? <font style="color: red;font-weight: 700;margin-left:5px">*</font>: ''}
          </template>
        )
        dynamic = (<aui-input {...inputConfig} placeholder-align='right' text-align='right'>
          {append}
          <template slot="right">{this.column.unit}</template>
        </aui-input>);

        break;
      case "relatedInput":
      default:
        dynamic = (<aui-input {...config}>
          {append}
        </aui-input>);
        break;
    }
    // return dynamic
    let readonlyBackgroundColor = this.column.readonly ? '#eef1f6' : 'white'
    // let readonlyFontColor = this.column.readonly ? 'rgb(68, 68, 68)' : '#bbb'
    return (
      <div style={{"min-height": '45px','background-color':readonlyBackgroundColor}}>
        {dynamic}
        <div style={{'font-size':'10px','color':'red','margin-left':'15px'}}>{this.errMsg}</div>
      </div>
    )
  }
};
