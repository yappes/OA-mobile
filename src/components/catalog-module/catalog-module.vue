<script>
import batchTable from "../batch-table/batch-table.vue";
import listGrid from "../list-grid/list-grid.vue";
import formLayout from "../form-layout/form-layout.vue";
import DetailList from "./detail-list.vue";
const config = {
  props: {
    isDetail: { type: Boolean, required: true },
    model: Object
  }
};
export default {
  name: "CatalogModule",
  componentName: "CatalogModule",
  props: {
    isDetail: { type: Boolean, required: true },
    model: {
      type: Object
    }
  },
  components: {
    formLayout: {
      components: { formLayout },
      mixins: [config],
      methods: {
        validate() {
          return this.$refs.form.validate();
        }
      },
      render(h) {
        return (
          <form-layout
            ref="form"
            form-view={this.model}
            is-detail={this.isDetail}
          />
        );
      }
    },
    batchForm: {
      components: { batchTable },
      mixins: [config],
      methods: {
        validate() {
          return this.$refs.form.validate();
        }
      },
      render(h) {
        return <batch-table ref="form" batch-view={this.model} />;
      }
    },
    list: {
      components: { listGrid,DetailList },
      mixins: [config],
      render(h) {
        let listGridConfig = {
          props: {
            datasource: this.model.datasource,
            mobileListCaption:this.model.mobileListCaption,
            mobileListTitle:this.model.mobileListTitle,
            rowStyle: row => {
              this.model.rowStyle(row);
            },
            componentBtns: this.model.operations.component,
            columns: this.model.columns,
            isShowAdvanced: false
          },
          on: {
            "row-click": row => {
              this.model.rowClick(this, row);
            },
            "button-click": (button, row) => {
              button.triggerClick(this, row);
            }
          }
        };
        return (<detail-list batchView={this.model}><list-grid slot='listGrid' {...listGridConfig} style="padding-top:0"></list-grid></detail-list>);
      }
    },
    loading: {
      render(h) {
        return <div style="height: 400px;" />;
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.component && this.$refs.component.validate) {
        return this.$refs.component.validate();
      }
      return Promise.resolve(true);
    }
  },
  render(h) {
    if (this.model.hidden) {
      return h(false);
    }
    let component = h(false);
    if (this.model.componentRender) {
      // 可替换其他布局
      component = this.model.componentRender(h, {
        props: { model: this.model, isDetail: this.isDetail },
        ref: "component"
      });
    } else {
      component = h(this.model.type, {
        props: { model: this.model, isDetail: this.isDetail },
        ref: "component"
      });
    }
    return component;
  }
};
</script>
<style lang="less" scoped>
</style>
