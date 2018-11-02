<template>
  <div v-transfer-dom>
    <aui-popup v-model="popupShow" height="100%">
      <aui-popup-header left-text="取消" right-text="完成" title="编辑快捷菜单" 
        :show-bottom-border="false" @click-left="cancel" @click-right="submit">
      </aui-popup-header>
        <div class="grid-info">
            <h3>常用功能
            </h3>
            <aui-grid :cols='menuCol'>
              <aui-grid-item 
                :label="item.menuName"
                v-for="(item,index) in quickMenuList"
                :key="index">
                <img src='@/assets/delete.png' class='grid-item-badge' @click='removeQuickMenu(item)'>
                <i slot="icon" :class='item.iconClass' :style='{color:item.iconColor}'></i>
                <!-- <div slot='icon' :style='{"background-color":item.iconColor}' class='menuName'>
                  {{item.menuName[0]}}
                </div> -->
            </aui-grid-item>
          </aui-grid>
        </div>
        <div class="grid-info">
          <h3>所有功能</h3>
            <aui-grid :cols='menuCol'>
              <aui-grid-item 
                :label="item.menuName"
                v-for="(item,index) in othList"
                :key="index">
                <img v-if='item.isQuickMenu' src='@/assets/delete.png' @click='removeQuickMenuInBottom(item)' class='grid-item-badge'>
                <img v-else src='@/assets/add.png' @click='addQuickMenu(item)' class='grid-item-badge'>
                <i slot="icon" :class='item.iconClass' :style='{color:item.iconColor}'></i>
                <!-- <div slot='icon' :style='{"background-color":item.iconColor}' class='menuName'>
                  {{item.menuName[0]}}
                </div> -->
              </aui-grid-item>
            </aui-grid>
        </div>
    </aui-popup>
  </div>
</template>

<script>
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import AuiIcon from "AUI/components/view-components/aui-icon";
import { authService, menuService } from "paas-web-utils/services";
import loginUser from "paas-web-utils/services/login-user";
export default {
  components: {
    AuiPopupHeader,
    AuiIcon
  },
  props: {
    topData: Array,
    bottomData: Array,
    value: Boolean
  },
  data() {
    return {
      menuCol: 4,
      max: 12,
      quickMenuList: [],
      othList: [],
      deleteSrc: '@/assets/delete.png'
    };
  },
  computed: {
    popupShow: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    quickMenuNum() {
      return this.quickMenuList.length;
    }
  },
  methods: {
    deepClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    cancel() {
      this.popupShow = false;
    },
    submit() {
      let ids = this.quickMenuList.map(item => {
        return item.id;
      });
      loginUser.get().then(user => {
        menuService
        .updateQuickMenu({
          mobileMenuIds: ids.join(','),
          sourceType: 1,
          userId: user.userId
        })
        .then(data => {
          console.log(data);
          this.$emit('loadData');
        });
      })
      this.popupShow = false;
    },
    removeQuickMenu(item) {
      console.log("removeQuickMenu");
      let index = this.quickMenuList.indexOf(item);
      if (index > -1) {
        this.quickMenuList.splice(index, 1);
        // this.changeData()
      }
    },
    removeQuickMenuInBottom(item) {
      let id = item.id;
      this.quickMenuList = this.quickMenuList.filter(e => {
        return id !== e.id;
      });
      // this.changeData()
    },
    addQuickMenu(item) {
      if (this.quickMenuNum >= this.max) {
        this.$aui.toast.show({
          type: "warn",
          text: `最多只能添加${max}个`
        });
        return;
      }
      console.log("addQuickMenu");
      this.quickMenuList.push(item);
    },
    include(obj, list, key) {
      return list.some(e => {
        return e[key] === obj[key];
      });
    },
    changeData() {
      this.othList.forEach(item => {
        // group.menuList.forEach(item => {
        if (this.include(item, this.quickMenuList, "id")) {
          item.isQuickMenu = true;
        } else {
          item.isQuickMenu = false;
        }
        // })
      });
    }
  },
  watch: {
    quickMenuList(val) {
      this.changeData();
    },
    popupShow(val) {
      if (val) {
        this.quickMenuList = this.deepClone(this.topData),
        this.othList = this.deepClone(this.bottomData);
      }
    }
  }
};
</script>

<style scoped>
.workbench {
  width: 100%;
}
.grid-info {
  margin-bottom: 10px;
  background: white;
}
.grid-info .aui-grid:before {
  border-top: 0;
}
.grid-info .aui-grid-item:before {
  border-right: 0;
}
.grid-info .aui-grid:after {
  border-left: 0;
}
.grid-info .aui-grid-item:after {
  border-bottom: 0;
}
.workbench .aui-grid-item__icon img {
  width: 40px;
  height: 40px;
}
.workbench .aui-grid-item__label {
  margin-top: 10px;
  color: #939393;
}
.grid-info .aui-grid-item {
  padding: 10px 22px;
}
.grid-item-badge {
  position: absolute;
  right: 15px;
  top: 0;
  width: 20px;
  height: 20px;
  z-index: 99;
}
.menuName {
  position: relative;
  font-size: 25px;
  text-align: center;
  color: black;
  border-radius: 50%;
  height: 40px;
}

</style>

