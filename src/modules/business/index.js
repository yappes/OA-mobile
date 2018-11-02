import rules, { viewCache } from "paas-web-utils/rules";
import ListPage from "./list-page.vue";
import EditPage from "./edit-page.vue";
import DetailPage from "./detail-page.vue";

const appendParamsUrl = function (url, data) {
  if (typeof url === "string") {
    let params = [];
    for (const key in data) {
      if (data[key]) {
        params.push(`${key}=${encodeURIComponent(data[key])}`)
      }
    }
    if (url.indexOf("?") > 0) {
      return url + "&" + params.join("&");
    } else {
      return url + "?" + params.join("&");
    }
  } else {
    url.query || (url.query = {});
    url.query = Object.assign(url.query, data);
    return url;
  }
}

const IndexComponent = {
  name: "BusinessIndex",
  components: { ListPage, EditPage, DetailPage },
  template: `<div style="height:100%">
  <aui-header :showBack="false" style="z-index:99;height: 45px;position:absolute;left:0;top:0;width: 100%;">
      <div style="height: 30px;width: 30px;" slot="overwrite-left" @click="$router.go(-1)">
        <img v-bind:src="this.$store.state.headLeftImg" style="height: 100%;width: 100%;margin-top: -8px">
      </div>
    </aui-header>
  <aui-load-more v-if="loading" tip="数据加载中..." style="padding:80% 0"></aui-load-more>
  <component :is="componentType" :view="view"></component></div>`,
  data() {
    return {
      proxy: {
        view: {}
      },
      loading: false
    };
  },
  computed: {
    view() {
      return this.proxy.view;
    },
    componentType() {
      let componentType = undefined;
      switch (this.view.type) {
        case "list":
          componentType = "ListPage";
          break;
        case "insert":
        case "update":
          componentType = "EditPage";
          break;
        case "detail":
          componentType = "DetailPage";
          break;
      }
      return componentType;
    }
  },
  watch: {
    $route(go) {
      this.dataLoading(go.params.viewId, go.query.recordId);
    },
    view() {
      console.log("更新内容", this.view);
    }
  },
  mounted() {
    this.dataLoading(this.$route.params.viewId, this.$route.query.recordId);
  },
  methods: {
    dataLoading(viewId, recordId) {
      this.loading = true;
      rules.loading().then(() => {
        this.renderView(viewId, recordId);
      }, () => {
        this.$aui.toast.show({
          text: '组织架构或字典加载错误'
        })
        // this.$aui.notify.show.error({
        //   title: '错误',
        //   message: '组织架构或字典加载错误'
        // });
      });
    },
    renderView(viewId, recordId) {
      this.loading = true;
      viewCache.getMobileViewType(viewId).then(viewEnum => {
        if (viewEnum.value === "CUSTOM") {
          // 自定义视图
          viewCache.getMobileViewData(viewId).then((view) => {
            this.$router.replace(appendParamsUrl(view.viewUrl, {
              sourceViewId: viewId,
              recordId
            }));
          });
          return Promise.reject("进入自定义视图");
        }
        let oldView = this.proxy.view;
         // 清空视图信息
         this.$set(this.proxy, "view", {});
         
         oldView.$destroy && oldView.$destroy();

        console.log("recordId", recordId);
        // console.log('new viewEnum.class()', new viewEnum.class(), viewEnum)
        return new viewEnum.class().render(viewId, recordId);
      }).then(view => {
        if (view.triggerRelation && this.$route.query.relationId) {
          view.triggerRelation({
            relationId: this.$route.query.relationId,
            relationModuleId: `,${this.$route.query.relationModuleId},`,
            relationViewId: this.$route.query.relationViewId
          });
        }
        // 绑定视图到当前组件
        setTimeout(() => {
          this.$set(this.proxy, "view", view);
          this.loading = false;
        });
      });
    },
  },
  beforeDestroy(){
    this.proxy.view.$destroy && this.proxy.view.$destroy();
    this.$delete(this.proxy, "view");
  }
};

export default {
  path: "/business",
  name: "businessIndex",
  component: {
    template: `<router-view/>`
  },
  children: [
    {
      path: ":viewId",
      name: "business",
      component: IndexComponent,
    }
  ]
};
