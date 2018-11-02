<template>
  <div class="edit-page">
    <!-- <aui-header :showMore='view.operations&&view.operations.length?true:false' @click-more='showAllButtons=true' :showBack="false" style="z-index:99;height: 45px;position:absolute;left:0;top:0;width: 100%;"> -->
    <aui-header  :showBack="false" style="z-index:99;height: 45px;position:absolute;left:0;top:0;width: 100%;background-color: #33c3cf">
      <div style="height: 30px;width: 30px;" slot="overwrite-left" @click="back">
        <img src="@/assets/back.png" style="height: 100%;width: 100%;margin-top: -8px">
      </div>
      <span>{{view.title}}</span>
      <div slot='right' style='height: 30px;width: 30px' v-if='view.operations&&view.operations.length>0' @click='showAllButtons=true'>
        <img src="@/assets/more.png" style="height: 100%;width: 100%;margin-top: -8px">
      </div>
    </aui-header>
    <!-- <aui-scroller class="scroller" ref="scroller" lock-x use-pulldown :use-pullup='false' height="-45" :pulldown-config="pulldownConfig" @pulldown-loading="handleRefresh"> -->
      <div class='catalog'>
        <catalog-module v-for="group in showGroups" :isDetail="false" :key="group.$id" :model="group" ref="catalogs"></catalog-module>
      </div>
    <!-- </aui-scroller> -->
    <aui-actionsheet v-model="showAllButtons" :menus="operations" @click-menu="buttonClick"></aui-actionsheet>
  </div>
</template>

<script>
import catalogModule from "@/components/catalog-module/catalog-module.vue";
import { EditView, InsertView } from "paas-web-utils/rules";
export default {
  name: "editPage",
  components: { catalogModule },
  props: {
    view: Object
  },
  data() {
    return {
      showAllButtons: false,
      pulldownConfig: {
        content: "下拉刷新",
        height: 60,
        autoRefresh: false,
        downContent: "下拉刷新",
        upContent: "下拉刷新",
        loadingContent: "数据更新中...",
        clsPrefix: "xs-plugin-pulldown-"
      }
    };
  },
  computed: {
    //筛选出hidden为true的groups，自定义页面会修改group的hidden
    //过滤掉隐藏的group，防止污染scroller的index
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
  mounted() {
    this.$store.state.showDownMenu = false;
  },
  methods: {
    handleRefresh() {
      setTimeout(() => {
        this.$refs.scroller.donePulldown();
      }, 1000);
    },
    validate() {
      let promises = [];
      this.$refs.catalogs.forEach(catalog => {
        promises.push(catalog.validate());
      });
      return Promise.all(promises).then(
        function() {
          return Promise.resolve(true);
        },
        error => {
          if (error instanceof Error) {
            this.$aui.toast.show({
              type:'warn',
              text: "表单校验未通过"
            });
          }
          return Promise.reject(false);
        }
      );
    },
    buttonClick(menuKey, menuItem) {
      for (const button of this.view.operations) {
        if (button.$id == menuKey) {
          button.triggerClick(this);
          break;
        }
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.edit-page {
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
