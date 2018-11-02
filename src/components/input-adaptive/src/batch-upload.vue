<template>
  <div>
    <aui-button size="medium" @click="uploadDialogVisible = true">
      <slot></slot>
    </aui-button>
    <div v-transfer-dom>
      <aui-dialog v-model="uploadDialogVisible" class="dialog-demo">
        <div class="img-box">
          <component :is="uploadType" 
        :headers="headers"
        :action="datasource.action" 
        :accept="datasource.accept" 
        :multiple="datasource.multiple"
        :value="value"
        :column='column'
        @input="inputEmit"></component>
        </div>
        <div @click="uploadDialogVisible=false">
          <span class="aui-close"></span>
        </div>
      </aui-dialog>
    </div>
  </div>
</template>

<script>
import FileUpload from "./file-upload";
import ImageUpload from "./image-upload";
export default {
  name: "BatchUpload",
  components: { FileUpload, ImageUpload },
  props: {
    column: {},
    datasource: {},
    value: {},
    type: {
      tyep: String,
      default: "file"
    },
    title: {
      tyep: String,
      default: "文件上传"
    }
  },
  computed: {
    uploadType() {
      if (this.type === "image") {
        return "ImageUpload";
      } else {
        return "FileUpload";
      }
    },
    headers(){
      let headers = {}
      let jsonStr = window.sessionStorage.getItem('paas:cloud:platform:toekn')
      if (Boolean(jsonStr)) {
        let authToken = JSON.parse(jsonStr)
        headers['Authorization'] = `${authToken.token_type} ${authToken.access_token}`
      } 
      return headers
    }
  },
  data() {
    return {
      uploadDialogVisible: false
    };
  },
  methods:{
    inputEmit(value){
      this.$emit('input', value);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../aui-m/theme-default/components/common/close.less";
.dialog-demo /deep/ .aui-dialog {
    width:100% !important;
    border-radius: 8px;
    padding-bottom: 8px;
  }
.dialog-demo {
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow-y: auto;
    border-bottom: 1px solid #dadada;
  }
  .aui-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>

