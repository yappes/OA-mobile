<template>
  <div v-transfer-dom>
    <aui-popup v-model="popupShow" height="100%" v-if='popupShow'>
      <aui-popup-header left-text="取消" right-text="完成" title="修改密码" 
        :show-bottom-border="false" @click-left="cancel" @click-right="submit">
      </aui-popup-header>
      <aui-group>
        <aui-input placeholder='请输入旧密码' type='password' v-model='oldPassword' ></aui-input>
      </aui-group>
      <aui-group>
        <aui-input  placeholder='请输入新密码' type='password' v-model='newPassword_1'></aui-input>
        <aui-input  placeholder='请重新输入新密码' type='password' v-model='newPassword_2'></aui-input>
      </aui-group>
    </aui-popup>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AsyncValidator from '@/common/async-validator'
import {userService} from "paas-web-utils/services";

export default {
  components: {
    AuiPopupHeader,
  },
  props: {
    value: false,
  },
  data() {
    return {
      oldPassword: null,
      newPassword_1: null,
      newPassword_2: null,
    }
  },
  watch: {
    // popupShow(val) {
    //   if(val) {
    //     this.currentData = JSON.parse(JSON.stringify(this.data))
    //   }
    // }
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
  },
  methods: {
    clear() {
      this.oldPassword = null
      this.newPassword_1 = null
      this.newPassword_2 = null
    },
    cancel() {
      this.clear()
      this.popupShow = false
    },
    submit() {
      this.validate().then(() => {
        console.log('校验成功_3')
        userService.changePassWord({
          oldPwd: this.oldPassword,
          newPwd: this.newPassword_1,
        }).then(data => {
          console.log('密码修改成功', data)
          this.submit()
          this.popupShow = false
        })
      }).catch((err) => {
        console.log('校验失败_3', err)
        this.$aui.toast.show({
          type: "warn",
          text: err
        });
      })
    },
    //校验填写数据
    validate() {
      //TODO:添加密码校验
      let notEmpty = this.oldPassword && this.newPassword_1 && this.newPassword_2 
      let same = this.newPassword_1 === this.newPassword_2
      if(!notEmpty) {
        return Promise.reject('输入不能为空')
      }
      if(!same) {
        return Promise.reject('两次输入新密码应相同')
      }
      return Promise.resolve()
    }
  }

}
</script>

