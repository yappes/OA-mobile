<template>
  <div class='upload'>
    <div>
      <aui-cell>
        <span slot="title" style="color: #444444;padding-right: 10px;">{{column.label}}
          <font v-if="column.isRequired" style="color: red;font-weight: 700;">*</font>
        </span>
        <span slot="default">
          <aui-button v-if='!disabled' plain style="border-radius:99px;" mini type="primary">选择文件
            <input value='uploadFile' class="aui-uploader__input" :id="column.$id" type="file" :accept="uploadAccept" :multiple='multiple' @change="uploader" />
          </aui-button>
        </span>
        <span slot='inline-desc' style='font-size:5px'>{{uploadTip}}</span>
      </aui-cell>
      <aui-cell class='progress-cell' v-for='(file,index) in percent' :key='file.uid'>
        <span slot='title' class='upload-cell'>{{file.name}}</span>
        <span slot="default">
          <aui-icon type="clear" @click.native='uploadCanceled(index)'></aui-icon>
        </span>
        <aui-progress slot='inline-desc' :show-cancel="false" v-if='percent[index]&&percent[index].status==="uploading"' :percent="percent[index].percent"></aui-progress>
      </aui-cell>
      <aui-swiper :list="imageList" v-if='imageList.length' v-model="imageIndex" @index-change='onIndexChange'  @click.native='preview(imageIndex)'></aui-swiper>
      <!-- <aui-img v-for='(file,index) in fileList' :key='index' :src="file.sourceUrl" @click='preview(index)' class="ximg-demo" error-class="ximg-error" :offset="-100" container="#aui_view_box_body"></aui-img> -->
    </div>
    <div v-transfer-dom>
      <aui-previewer class='previewer' :list="previewList" ref="previewer" :options='options'>
        <template slot="button-after" v-if='!disabled'>
        <span class="previewer-delete-icon-box">
          <img src="@/assets/delete_icon.png" width="22" height="22" style='float:right;margin:11px' class="previewer-delete-icon" @click.prevent.stop="deleteFile()">
        </span>
      </template>
      </aui-previewer>
    </div>
  </div>
</template>
  
<script>
import { CONTENT_TYPE } from "paas-web-utils/rules/enum";
import { HTTP_CONFIG } from "paas-web-utils/common/http.js";
import AuiProgress from "AUI/components/view-components/aui-progress.js";
import AuiIcon from "AUI/components/view-components/aui-icon";
import AuiImg from "AUI/components/view-components/aui-img";
import AuiPreviewer from "AUI/components/action-components/aui-previewer";
export default {
  name: "ImageUpload",
  components: { AuiProgress, AuiIcon, AuiImg, AuiPreviewer },
  props: {
    column: {},
    multiple: Boolean,
    disabled: Boolean,
    action: String,
    accept: {
      type: String,
      default: ""
    },
    value: String
  },
  computed: {
    uploadTip() {
      if (!this.accept || this.accept === "*") return "可以上传所有类型文件";
      let accept = this.accept.toLowerCase();
      return `只能上传${accept.split(",").join("/")}文件`;
    },
    uploadAccept() {
      if (!this.accept) return CONTENT_TYPE["*"];
      let uploadAccept = [];
      let accept = this.accept.toLowerCase();
      for (const acceptKey of accept.split(",")) {
        if (CONTENT_TYPE[acceptKey]) {
          uploadAccept.push(CONTENT_TYPE[acceptKey]);
        }
      }
      if (uploadAccept.length === 0) {
        uploadAccept.push(CONTENT_TYPE["*"]);
      }
      return uploadAccept.join(",");
    },
    headers() {
      let headers = {};
      let jsonStr = window.sessionStorage.getItem("paas:cloud:platform:toekn");
      if (Boolean(jsonStr)) {
        let authToken = JSON.parse(jsonStr);
        headers["Authorization"] = `${authToken.token_type} ${
          authToken.access_token
        }`;
      }
      return headers;
    }
  },
  data() {
    return {
      fileList: [],
      currentValue: this.value,
      percent: [],
      xhr: [],
      previewList: [],
      imageList:[],
      imageIndex:0,
      options: {
        isClickableElement: function (el) {
          return /previewer-delete-icon/.test(el.className)
        }
      }
    };
  },
  watch: {
    value(value) {
      if (this.currentValue === value) return;
      this.handleFileList(value);
    }
  },
  mounted() {
    this.handleFileList(this.value);
  },
  methods: {
    formatUrl(url) {
      let subStr = HTTP_CONFIG.mapping.file;
      let length = subStr.length;
      let index = url.indexOf(subStr);
      if (index > -1) {
        return url.slice(length);
      }
      return url;
    },
    handleFileList(value) {
      let fileValues = [];
      if (typeof value === "string" && value !== "") {
        fileValues = JSON.parse(value) || [];
        fileValues.forEach(file => {
          file.url = this.formatUrl(file.url);
        });
      }
      for (const file of fileValues) {
        this.fileList.push({
          name: file.msg,
          url: this.formatUrl(file.url),
          sourceUrl: HTTP_CONFIG.mapping.file + file.url,
          status: "finished",
          response: file
        });
        this.previewList.push({
          src: HTTP_CONFIG.mapping.file + file.url
        });
        this.imageList.push({
          img: HTTP_CONFIG.mapping.file + file.url,
          url:'javascript:',
          title:file.msg
        })
      }
      // this.currentValue = value;
      this.currentValue = JSON.stringify(fileValues);
    },
    handleRemove(fileList) {
      let fileValues = [];
      for (const _file of fileList) {
        fileValues.push(_file.response);
      }
      if (fileValues.length === 0) {
        this.currentValue = undefined;
      } else {
        this.currentValue = JSON.stringify(fileValues);
      }
      this.$emit("input", this.currentValue);
      setTimeout(() => {
        this.$emit("change", this.currentValue);
      }, 50);
    },
    handleSuccess(fileList) {
      let fileValues = [];
      for (const _file of fileList) {
        if (_file.response) {
          _file.response.msg = _file.name;
          fileValues.push(_file.response);
        }
      }
      if (fileValues.length === 0) {
        this.currentValue = undefined;
      } else {
        this.currentValue = JSON.stringify(fileValues);
      }
      this.$emit("input", this.currentValue);
      this.$emit("change", this.currentValue);
    },
    uploader(value) {
      let vm = this;
      let files = document.getElementById(this.column.$id).files;
      for (const file of files) {
        let uid = new Date().getTime();
        this.percent.push({
          name: file.name,
          status: "uploading",
          percent: 0,
          uid: uid
        });
        var xhr = new XMLHttpRequest();
        this.xhr.push(xhr);
        xhr.open("POST", this.action, true);

        xhr.upload.addEventListener(
          "progress",
          function(event) {
            vm.uploadProgress(event, uid);
          },
          false
        );
        xhr.addEventListener(
          "load",
          function(event) {
            vm.uploadComplete(event, uid);
          },
          false
        );
        xhr.addEventListener(
          "error",
          function(event) {
            vm.uploadFailed(event, uid);
          },
          false
        );
        // xhr.addEventListener("abort", this.uploadCanceled, false);

        for (const key in this.headers) {
          xhr.setRequestHeader(key, this.headers[key]);
        }
        var fd = new FormData();
        fd.append("file", file);
        xhr.send(fd);
      }
      value.srcElement.value = "";
    },
    uploadProgress(evt, uid) {
      if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        for (let i = 0; i < this.percent.length; i++) {
          if (this.percent[i].uid === uid) {
            this.percent[i].percent = percentComplete;
            if (percentComplete === 100) {
              this.percent[i].status = "finished";
            }
          }
        }
      }
    },
    uploadComplete(evt, uid) {
      let file = JSON.parse(evt.target.response);
      if (file.status === 200) {
        this.fileList.push({
          name: file.msg,
          url: this.formatUrl(file.url),
          sourceUrl: HTTP_CONFIG.mapping.file + file.url,
          status: "finished",
          response: file
        });
        this.previewList.push({
          src: HTTP_CONFIG.mapping.file + file.url
        });
        this.imageList.push({
          img: HTTP_CONFIG.mapping.file + file.url,
          url:'javascript:',
          title:file.msg
        });
        for (let i = 0; i < this.percent.length; i++) {
          if (this.percent[i].uid === uid) {
            this.xhr.splice(i, 1);
            this.percent.splice(i, 1);
          }
        }
        this.handleSuccess(this.fileList);
      } else {
        this.uploadFailed(evt, uid);
      }
    },
    uploadFailed(evt, uid) {
      this.$aui.toast.show({
        text: "上传失败！"
      });
      for (let i = 0; i < this.percent.length; i++) {
        if (this.percent[i].uid === uid) {
          this.xhr.splice(i, 1);
          this.percent.splice(i, 1);
        }
      }
    },
    uploadCanceled(index) {
      this.xhr[index].abort();
      this.xhr.splice(index, 1);
      this.percent.splice(index, 1);
    },
    onIndexChange(index){
      this.imageIndex = index;
    },
    preview(index) {
      this.$refs.previewer.show(index);
    },
    deleteFile() {
      let index = this.$refs.previewer.getCurrentIndex();
      this.fileList.splice(index, 1);
      this.previewList.splice(index, 1);
      this.imageList.splice(index, 1);
      this.handleRemove(this.fileList);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../aui-m/theme-default/components/aui-uploader.less";

.upload /deep/ .aui-progress__bar {
  background-color: #ebebeb;
  height: 3px;
  flex: 1;
}
.upload /deep/ .aui-progress__inner-bar {
  width: 0;
  height: 100%;
  background-color: #09bb07;
}
.file-cell {
  font-size: 14px;
  color: #1aad19;
  padding-left: 15px;
}
.upload-cell {
  font-size: 14px;
  padding-left: 15px;
}
.progress-cell .aui-cells:before {
    border-top: 0px;
}
// .ximg-demo {
//   width: 40%;
//   height: auto;
//   float: left;
//   padding: 10px;
// }
// .ximg-error {
//   background-color: white;
// }
// .ximg-error:after {
//   content: "加载失败";
//   color: red;
// }
</style>

