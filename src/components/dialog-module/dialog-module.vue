<script>
import FormLayout from '../form-layout/form-layout.vue';
export default {
  name: "DialogModule",
  components:{FormLayout},
  props: {
    view: Object
  },
  computed: {
    isMoveGroup() {
      return this.view.groups.length > 1;
    },
    baseGroup() {
      return this.view.groups[0];
    }
  },
  data: function() {
    return {};
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
    if (this.baseGroup.componentRender) {
      return this.baseGroup.componentRender(h, {
        props: {
          "form-view": this.baseGroup,
          "is-detail": false
        },
        ref: "component"
      });
    }
    return (
      <div>
        <form-layout
          ref="component"
          form-view={this.baseGroup}
          is-detail={false}
        />
      </div>
    );
  }
};
</script>