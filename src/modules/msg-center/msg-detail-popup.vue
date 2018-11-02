<template>
  <div>
    <!-- <aui-popup v-model="popupShow" height="100%" v-if='popupShow'> -->
      <aui-header :showBack='false' class='header'>
        <div slot='default'>{{title}}</div>
        <div slot='left' @click='colsePopup' class='slot'>
          <img src="@/assets/back.png" class='img'>
        </div>
        <div slot='right' class='slot' @click='showAllButtons=true'>
          <img src='@/assets/more.png' class='img'>
        </div>
      </aui-header>
      <aui-group>
        <!-- {{detailData.content}} -->
        <aui-cell title="主题" v-if='showTitle'>{{detailData.title}}</aui-cell>
        <aui-cell title="发送人" v-if='showAuth'>{{detailData.auth_}}</aui-cell>
        <aui-cell title="创建时间">{{detailData.createTime_}}</aui-cell>
        <aui-cell>{{detailData.content}}
          <div slot='title' style='width: 35px'>内容</div>
        </aui-cell>
        <!-- <aui-cell title="附件"> -->
          <file-preview label="附件" :files="detailData.attachment"></file-preview>
        <!-- </aui-cell> -->
      </aui-group>
    <!-- </aui-popup> -->
    <aui-actionsheet v-model="showAllButtons" :menus="operations" @click-menu="handleButtonClick" show-cancel cancel-text='取消'></aui-actionsheet>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import FilePreview from "@/components/form-layout/file-preview";
// import imgMore from '@/assets/more.png';

export default {
  components: {
    AuiPopupHeader,
    FilePreview
  },
  props: {
    value: false,
    detailData: {
      type: Object,
    }
  },
  data() {
    return {
      titleMap: {
        announcement: `公告详情`,
        notify: `通知详情`,
        tip: `提醒详情`,
        letter: `私信详情`
      },
      showAllButtons: false,
      operations: [{
        label: '删除',
        value: 'delete',
        type: 'warn',
      }]
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
      return this.titleMap[this.detailData.type]
    },
    showTitle() {
      return this.detailData.type ==='notify' || this.detailData.type ==='announcement'
    },
    showAuth() {
      return this.detailData.type === 'letter'
    }
  },
  methods: {
    cancel() {
      this.popupShow = false
    },
    handleButtonClick(key, item) {
      console.log(key, item)
      let map = {
        delete: this.deleteMsg
      }
      if(map[key]) {
        map[key]()
      }
    },
    deleteMsg() {
      let id = this.detailData.id
      let type = this.detailData.type
      console.log('删除', id, type)
    },
    colsePopup() {
      this.$emit('close-popup')
    },
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

