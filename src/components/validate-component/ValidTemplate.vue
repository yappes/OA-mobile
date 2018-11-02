<template>
  <div :class="{error:errors[property] && errors[property][0]}"
       class="error-box">
    <slot></slot>
    <transition name="aui-zoom-in-top">
      <span class="error-text"
            v-if="errors[property] && errors[property][0]">
        {{errors[property][0].errorMsg}}
      </span>
    </transition>
  </div>
</template>
<script>
  import { ValidatorManager } from "ab-manager-validator";
export default {
  name: 'ValidTemplate',
      mixins: [ValidatorManager],

  // props: ["property", 'validators'],
  props: ["property"],
    // validators: {
    //   currentValue: [
    //     "required",
    //     {
    //       test: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/g,
    //       errorMsg: "请输入正确的手机号类型"
    //     }
    //   ]
    // },
  computed: {
    //得到错误提示信息
    errors() {
      let validation;
      let parent = this.$parent;
      do {
        if (parent.$validation) {
        parent.$validate()
        validation = parent.$validation;
        }
      } while (!validation && (parent = parent.$parent));
      return validation;
    }
  }
};
</script>
<style scoped>
.error {
  box-shadow: 0 0 0 1px #e74a41;
}

.error-text {
  font-size: 14px;
  color: #e74a41;
  display: block;
  position: absolute;
  left: 0;
  top: 120%;
  margin-top: -7px;
  font-size: 12px;
  z-index: 1;
}

.error-box {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  width: 100%;
}

.aui-text-input input {
  width: 300px;
}
</style>