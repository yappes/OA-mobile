<template>
  <div v-transfer-dom>
    <aui-popup v-model="popupShow" height="100%" v-if='popupShow'>
      <aui-popup-header left-text="取消" right-text="完成" :title="title" 
        :show-bottom-border="false" @click-left="cancel" @click-right="submit">
      </aui-popup-header>
      <aui-group>
        <aui-input v-if='currentData.type==="input"' :placeholder='title' v-model='model'></aui-input>
        <aui-textarea v-else-if='currentData.type==="textarea"' :placeholder='title' v-model='model' clearable :rows='3' :cols='50'></aui-textarea>
        <aui-radio v-else-if='currentData.type==="radio"' :placeholder='title' v-model='model' :options='options'></aui-radio>
      </aui-group>
    </aui-popup>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import deptSelection from '@/components/dept-selection/dept-selection'
import AsyncValidator from '@/common/async-validator'
import {userService} from "paas-web-utils/services";

export default {
  components: {
    AuiPopupHeader,
  },
  props: {
    value: false,
    data: {
      type: Object,
      default: () => {
        return {
          label: "默认",
          value: null,
          type: 'input',
        }
      }
    },
    detailData: Object,
  },
  data() {
    return {
      currentData: this.data,
      model: this.data ? this.data.value : null
    }
  },
  watch: {
    popupShow(val) {
      if(val) {
        this.currentData = this.data
        this.model = this.data ? this.data.value : null
      }
    }
  },
  computed: {
    popupShow: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    title() {
      if(this.currentData && this.currentData.label) {
        return '修改' + this.currentData.label
      }
      return '修改'
    },
    options() {
      if(this.currentData.type === 'radio') {
        return this.currentData.options.map(item => {
          return {
            key: item.value,
            value: item.label
          }
        })
      }
    }
  },
  methods: {
    cancel() {
      this.popupShow = false
    },
    submit() {
      this.validate().then(() => {
        // console.log('校验成功_3')
        let prop = this.currentData.prop
        // console.log('submit', this.currentData)
        let param = JSON.parse(JSON.stringify(this.detailData))
        param[prop] = this.model
        // console.log(param)
        userService.editUser(param).then(data => {
          // console.log('修改成功', data)
          this.popupShow = false
          this.$emit('refresh')
        })
      }).catch((err) => {
        // console.log('校验失败_3', err)
        this.$aui.toast.show({
          type: "warn",
          text: err
        });
      })
    },
    //校验填写数据
    validate() {
      let rules = this.currentData.rules
      let data = {
        valid: this.model
      }
      let rule = {
        valid: null
      }
      if(!rules || rules.length === 0) {
        // console.log('不需要验证')
        return Promise.resolve()
      }
      let res = [] 
      rules.forEach(ruleItem => {
        if(ruleItem.type === 'custom') {
          let reg = ruleItem.test
          let message = ruleItem.message
          let func = (rule, value, callback) => {
            let formatValue = String(value)
            let result = formatValue.match(reg) !== null
            if (result) {
              // console.log('校验成功_1')
              callback();
            } else {
              // console.log('校验失败_1', message)
              callback(new Error(message))
            }
          }
          res.push({
            validator: func,
          })
        } else if(ruleItem.required !== false) {
          res.push(ruleItem)
        }
      })
      rule.valid = res
      // console.log('验证 rule', rule)
      let validator = new AsyncValidator(data, rule)
      return validator.validate().then(() => {
        // console.log('校验成功_2')
        return Promise.resolve()
      }).catch(errs => {
        let errMsg = errs.map(item => {
          return item.message
        }).join(' ')
        // console.log('校验失败_2', errMsg)
        return Promise.reject(errMsg)
      })
    }
  }

}
</script>

