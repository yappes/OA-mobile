<template>
  <div>
    <aui-cell :title="label+':'" class='file-preview' is-link :border-intent="false" :arrow-direction="showFileList ? 'down' : 'right'" @click.native="showFileList = !showFileList"></aui-cell>

    <template v-if="showFileList">
      <aui-cell-box class='file-box' v-for="file in fileList" :key="file.hash" @click.native="preview(file,index)" :border-intent="false">{{file.msg}}</aui-cell-box>
    </template>
    <div v-transfer-dom>
      <aui-previewer class='previewer' :list="previewList" ref="previewer">
        <template slot="button-after">
          <a :href="fileUrl" target="fileDownload">
            <span class="previewer-delete-icon-box">
              <img src="@/assets/download.png" width="22" height="22" style='float:right;margin:11px'>
            </span>
          </a>
      </template>
      </aui-previewer>
    </div>
    <div v-transfer-dom>
      <aui-dialog v-model="dialogVisible" class="dialog-preview">
        <div class="img-box">
          <aui-msg class='msg' description="当前附件不支持预览，请选择下载附件进行查看！" icon="warn"></aui-msg>
        </div>
        <div class='btn-download'>
          <span>
            <a :href="fileUrl" target="fileDownload">
              <aui-button type="primary" @click="dialogVisible = false">下载附件</aui-button>
            </a>
          </span>
        </div>
        <div class='btn-close'>
          <aui-button type="default" @click="dialogVisible = false">关闭</aui-button>
        </div>
      </aui-dialog>
    </div>
  </div>
</template>

<script>
import { HTTP_CONFIG } from "paas-web-utils/common/http.js";
import AuiMsg from "AUI/components/action-components/aui-msg.js";
import AuiCellBox from "AUI/components/layout-components/aui-cell-box.js";
import AuiPreviewer from "AUI/components/action-components/aui-previewer";
export default {
  name: "FilePreview",
  components: { AuiMsg, AuiCellBox,AuiPreviewer },
  props: {
    files: String,
    label: String
  },
  data() {
    return {
      dialogVisible: false,
      previewFile: {},
      previewList:[],
      isImg: false,
      showFileList: false,
      index:0
    };
  },
  computed: {
    fileList() {
      if (Boolean(this.files)) {
        return JSON.parse(this.files);
      }
      return [];
    },
    fileUrl() {
      let r = this.getFileUrl(this.previewFile);
      return r;
    }
  },
  methods: {
    x(vm,ref){
      console.log('ref',vm,ref)
    },
    preview(file,index) {
      this.index = index;
      this.previewFile = file;
      let fileName = (file.msg || "").toLowerCase();
      var suffix = fileName.substring(fileName.lastIndexOf("."));
      this.isImg = false;
      if (`.png,.gif,.jpeg,.jpg,.bmp,.webp`.indexOf(suffix) >= 0) {
        this.isImg = true;
      }
      this.previewList=[]
      if(this.isImg){
        this.previewList.push({
          src : this.getFileUrl(this.previewFile)
        })
        this.$nextTick(() => {
          this.$refs.previewer.show(0); 
        });
      }else{
        this.dialogVisible = true;
      }
    },
    getFileUrl(file){
      let fileUri = HTTP_CONFIG.mapping.file;
      let include =
        file.url && file.url.indexOf(fileUri) > -1;
      if (include) {
        return file.url;
      }
      let r = fileUri + file.url;
      return r;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../aui-m/theme-default/components/common/close.less";

.dialog-preview {
  .aui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 200px;
    overflow: hidden;
    .msg {
      padding-top:30px
    }
  }
}
.file-preview {
  padding: 5px 15px;
  border-top: 1px dotted #d9d9d9;
}
.file-box {
  font-size: 14px;
  margin: 0 0 0 15px;
  color: #1aad19;
  &:before {
    left: 5px;
  }
}
.btn-download {
  width:50%;
  float:left;
  .aui-btn {
    border-radius: 0px !important;
    &::after {
      border-radius: 0px !important;
    }
  }
}
.btn-close {
  width:50%;
  float:right;
  .aui-btn {
    border-radius: 0px !important;
    &::after {
      border-radius: 0px !important;
    }
  }
}
</style>
