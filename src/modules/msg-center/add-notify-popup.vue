<template>
  <div>
    <!-- <aui-popup v-model="popupShow" height="100%"  :style="{'z-index': zIndex}" :hide-on-blur='false'> -->
      <aui-header :showBack='false' class='header'>
        <div slot='default'>{{title}}</div>
        <div slot='left' @click='closePopup' class='slot'>
          取消
        </div>
        <div slot='right' class='slot' @click='showAllButtons=true'>
          <img src='@/assets/more.png' class='img'>
        </div>
      </aui-header>
      <aui-group gutter='10px'>
        <!-- <radio-mobile /> -->
        <input-adaptive v-for='(column, key) in columns' :key='key' v-model='formModel[key]' :column='columns[key]' ref='formItem'></input-adaptive>
      </aui-group>
    <!-- </aui-popup> -->
    <aui-actionsheet v-model="showAllButtons" :menus="menus" @click-menu="handleButtonClick" show-cancel cancel-text='取消'></aui-actionsheet>
  </div>
</template>

<script>
import inputAdaptive from "@/components/input-adaptive/src/input-adaptive";
import RadioMobile from "@/components/input-adaptive/src/radio-mobile";
import FileUpload from "@/components/input-adaptive/src/file-upload";
import { HTTP_CONFIG } from "paas-web-utils/common/http.js";
import LoginUser from 'paas-web-utils/services/login-user'
// import noteService from './service/note-service'
import {noteService} from "paas-web-utils/services/index";
import { setTimeout } from 'timers';
// import AuiPopupRadio from "AUI/components/form-components/aui-popup-radio";
export default {
  components: {
    inputAdaptive,
    RadioMobile,
  },
  props: {
    value: Boolean,
    type: {
      type: String,
      default: 'notify',
    },
  },
  data() {
    return {
      showAllButtons: false,
      menus: [{
        label: '提交',
        value: 'submit',
      }],
      columns: {
        subject: {
          placeholder: '请输入主题',
          readonly: false,
          label: '主题',
          isRequired: true,
          hidden: false,
          type: {
            val: 'input'
          },
          rules: [{
            required: true, message: '输入不能为空'
          }]
        },
        content: {
          placeholder: '请输入私信内容',
          readonly: false,
          label: '内容',
          isRequired: true,
          hidden: false,
          type: {
            val: 'textArea'
          },
          rules: [{
            required: true, message: '输入不能为空'
          }]
        },
        senderType: {
          placeholder: '请选择发送类型',
          readonly: false,
          label: '发送类型',
          isRequired: true,
          hidden: false,
          type: {
            val: 'radioGroup'
          },
          customOptions: [{
            value: 'ALL',
            name: '全部人员',
          }, {
            value: 'GROUP',
            name: '指定群发',
          }],
          rules: [{
            required: true, message: '输入不能为空'
          }],
          popupStyle: {
            'z-index': 600,
            'z-index-show': 601,
          }
        },
        toAddress: {
          placeholder: '请选择接收人',
          readonly: false,
          label: '接收人',
          isRequired: true,
          hidden: true,
          isMultiple: true,
          type: {
            val: 'userSelect'
          },
          rules: [{
            required: true, message: '输入不能为空'
          }],
          triggerShowValueChanage(val) {
            console.log('triggerShowValueChanage', val)
          }
        },
        attachment: {
          placeholder: '请选择附件',
          readonly: false,
          label: '附件',
          isRequired: false,
          hidden: false,
          $id: 'file',
          datasource: {
            action: '',
            title: '附件',
            multiple: true,
          },
          type: {
            val: 'file',
          },
          rules:[],
        }
      },
      formModel: {
        content: '',
        toAddress: '',
        attachment: '',
        subject: '',
        senderType: '',
        type: '',
      },
      zIndex: 501,
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
      let map = {
        notify: '新增通知',
        announcement: '新增公告',
      }
      return map[this.type]
    },
    submitType() {
      let map = {
        notify: 'NOTIFY',
        announcement: 'ANNOUNCEMENT',
      }
      return map[this.type]
    }
  },
  watch: {
    type(val) {
      let map = {
        notify: 'NOTIFY',
        announcement: 'ANNOUNCEMENT',
      }
      this.formModel.type = map[this.type]
    },
    'formModel.senderType'(val) {
      if(val !== 'GROUP') {
        this.columns.toAddress.hidden = true
      }else {
        this.columns.toAddress.hidden = false
      }
    }
  },
  methods: {
    handleButtonClick(key, item) {
      console.log('点击action sheet', key, item )
      if(key === 'submit') {
        this.validate().then(() => {
          console.log('校验成功', this.formModel)
          let toAddress = this.formModel.toAddress.split(',')
          toAddress = toAddress.slice(1, toAddress.length - 1)
          let data = {
            subject: this.formModel.subject,
            type: this.submitType,
            senderType: this.formModel.senderType,
            content: this.formModel.content,
            toAddress,
            attachment: this.formModel.attachment,
          }
          // setTimeout(() => {
          //   this.closePopup()
          //   this.$emit('reload')
          // }, 500)
            

          noteService.addNote(data).then(() => {
            this.closePopup()
            this.$emit('reload')
          }) 
        })
      }
    },
    closePopup() {
      this.$emit('close-popup')
    },
    clear() {
      this.formModel = {
        content: '',
        toAddress: '',
        attachment: '',
        subject: '',
        senderType: '',
        type: '',
      }
    },
    validate() {
      let promises = this.$refs.formItem.map(item => {
        return item.validate()
      })
      return Promise.all(promises).then(() => {
        return Promise.resolve()
      }).catch(() => {
        return Promise.reject()
      })
    },
    fileAction() {
      let fileUri = HTTP_CONFIG.mapping.file
      return LoginUser.get().then(data => {
        let entCode = data.entCode
        let action = `saveFile/${entCode}/file`
        return LoginUser.newUri(fileUri, action)
      }).then(data => {
        return data
      })
    }
  },
  mounted() {
    this.fileAction().then(data => {
      this.columns.attachment.datasource.action = data
    }).catch(err => {
      console.log('没有获得文件上传中心地址-->', this.columns.attachment.datasource.action)
    })
  }

}
</script>

<style lang="less" scoped>
  .header {
    background-color: #33c3cf;
    color: white;
    .slot {
      height: 30px;
      width: 30px;
      .img {
        height: 100%;
        width: 100%;
        margin-top: -5px
      }
    }
  }
</style>

