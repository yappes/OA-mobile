<template>
  <div>
  <!-- <div v-transfer-dom> -->
    <!-- <aui-popup v-model="popupShow" height="100%" v-if='popupShow' :hide-on-blur='false'> -->
      <aui-header :showBack='false' class='header'>
        <div slot='default'>新增私信</div>
        <div slot='left' @click='closePopup' class='slot'>
          取消
        </div>
        <div slot='right' class='slot' @click='showAllButtons=true'>
          <img src='@/assets/more.png' class='img'>
        </div>
      </aui-header>
      <aui-group gutter='10px'>
        <input-adaptive v-for='(column, key) in columns' :key='key' v-model='formModel[key]' :column='columns[key]' ref='formItem'></input-adaptive>
      </aui-group>
    <!-- </aui-popup> -->
    <aui-actionsheet v-model="showAllButtons" :menus="menus" @click-menu="handleButtonClick" show-cancel cancel-text='取消'></aui-actionsheet>
  </div>
</template>

<script>
import inputAdaptive from "@/components/input-adaptive/src/input-adaptive";
import FileUpload from "@/components/input-adaptive/src/file-upload";
import { HTTP_CONFIG } from "paas-web-utils/common/http.js";
import LoginUser from 'paas-web-utils/services/login-user'
// import letterService from './service/letter-service'
import {letterService} from "paas-web-utils/services/index";

export default {
  components: {
    inputAdaptive
  },
  props: {
    // value: Boolean,
  },
  data() {
    return {
      showAllButtons: false,
      menus: [{
        label: '提交',
        value: 'submit',
      }],
      columns: {
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
        toAddress: {
          placeholder: '请选择接收人',
          readonly: false,
          label: '接收人',
          isRequired: true,
          hidden: false,
          isMultiple: false,
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
        attachment: ''
      }
    }
  },
  computed: {
    // popupShow: {
    //   get() {
    //     return this.value
    //   },
    //   set(val) {
    //     this.$emit('input', val)
    //   }
    // }
  },
  methods: {
    handleButtonClick(key, item) {
      console.log('点击action sheet', key, item )
      if(key === 'submit') {
        this.validate().then(() => {
          console.log('校验成功', this.formModel)
          let data = {
            content: this.formModel.content,
            toAddress: String(this.formModel.toAddress),
            attachment: this.formModel.attachment,
          }
          letterService.addLetter(data).then(res => {
            console.log('新增私信成功', res)
            this.popupShow = false
            this.$emit('reload')
            this.closePopup()
          }).catch((err) => {
            if(err.status === 200) {
              this.popupShow = false
              this.$emit('reload')
              this.closePopup()
            }
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
        attachment: ''
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
    },
  },
  mounted() {
    console.log('letter mounted')
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

