<template>
  <div class="detail-page">
    <aui-header  :showBack="false" style="z-index:99;height: 45px;position:absolute;left:0;top:0;width: 100%;background-color: #33c3cf">
      <div style="height: 30px;width: 30px;" slot="overwrite-left" @click="back">
        <img src="@/assets/back.png" style="height: 100%;width: 100%;margin-top: -8px">
      </div>
      <span>{{view.title}}</span>
      <div slot='right' style='height: 30px;width: 30px' v-if='view.operations&&view.operations.length>0' @click='showAllButtons=true'>
        <img src="@/assets/more.png" style="height: 100%;width: 100%;margin-top: -8px">
      </div>
    </aui-header>
    <!-- <aui-scroller
    ref="scroller"
    lock-x
    use-pulldown
    height="-45"
    :pulldown-config="pulldownConfig"
    @pulldown-loading="handleRefresh"> -->
      <div class="catalog">
        <catalog-module v-for="group in showGroups" :isDetail="true" :key="group.$id" :model="group" ref="catalogs"></catalog-module>
      </div>
    <!-- </aui-scroller> -->
    <aui-actionsheet v-model="showAllButtons" :menus="operations" @click-menu="buttonClick"></aui-actionsheet>
  </div>
</template>

<script>
import catalogModule from "@/components/catalog-module/catalog-module.vue";
import { DetailView } from "paas-web-utils/rules";
export default {
  name: 'DetailPage',

  components: { 
    catalogModule
  },

  props: {
    view: Object
  },

  data() {
    return {
      showAllButtons: false,
      // 下拉刷新配置
      pulldownConfig: {
        content: '下拉刷新',
        height: 60,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '下拉刷新',
        loadingContent: '数据更新中...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
    }
  },

  computed: {
    showGroups() {
      if (this.view.groups) {
        let r = this.view.groups.filter(group => {
          return !group.hidden;
        });
        return r;
      }
    },

    operations() {
      if (this.view.operations) {
        let operations = this.view.operations.filter(operation => {
          return !operation.hidden;
        });
        let button = {};
        for (const b of operations) {
          button[b.$id] = b.lable;
        }
        return button;
      }
    }
  },

  mounted(){
    this.$store.state.showDownMenu = false;
  },

  methods: {
    // 下拉刷新
    handleRefresh() {
      setTimeout(() => {
        this.$refs.scroller.donePulldown();
      }, 1000);
    },

    buttonClick(menuKey, menuItem) {
      for (const button of this.view.operations) {
        if (button.$id == menuKey) {
          button.triggerClick(this,this.view.renderData.record);
          break;
        }
      }
    },

    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less">
.detail-page {
  .catalog {
    height: auto !important;
    padding: 50px 0 0 0 !important;
    background: #fafafa;
  }
  .aui-cells__title {
    background-color: #fff;
    line-height: 2.5;
    margin-bottom: 0;
    &:before {
      display: inline-block;
      content: "";
      width: 3px;
      height: 14px;
      background-color: #5ae884;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
</style>
