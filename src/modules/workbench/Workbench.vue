<template>
    <div class="workbench">
        <aui-swiper :list="workbenchList"
                    v-model="workbenchIndex"
                    :aspect-ratio="320/750"
                    autoplay>
        </aui-swiper>
        <div class="grid-info">
            <h3>常用功能</h3>
            <aui-grid :cols='menuCol'>
              <aui-grid-item 
                :label="item.menuName"
                v-for="(item,index) in quickMenuList"
                :key="index"
                @touchstart.native="showDeleteButton" @touchend.native="clearLoop" @click.native='jump(item)'>
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
                              v-for="(item,index) in mobileMenu"
                              :key="index"
                              @touchstart.native="showDeleteButton" @touchend.native="clearLoop" @click.native='jump(item)'>
                  <i slot="icon" :class='item.iconClass' :style='{color:item.iconColor}'></i>
                <!-- <div slot='icon' :style='{"background-color":item.iconColor}' class='menuName'>
                  {{item.menuName[0]}}
                </div> -->

                </aui-grid-item>
              </aui-grid>
        </div>
        <work-bench-popup v-model='badgeShow' :topData='quickMenuList' :bottomData='mobileMenu' @loadData='loadData'></work-bench-popup>
    </div>
</template>

<script>
// const imgList = [
//   {
//     url: "javascript:",
//     img: "static/images/workbench/banner.png"
//   }
// ];

import { authService, menuService } from "paas-web-utils/services";
import workBenchPopup from "./work-bench-popup";
import axios from "axios";

export default {
  components: {
    workBenchPopup
  },
  data() {
    return {
      quickMenu: [],
      mobileMenu: [],
      workbenchList: [{
        url: "javascript:",
        img: 'static/images/workBench/banner.png'
      }, {
        url: "javascript:",
        img: 'static/studio/20171207101208128.jpg'
      },{
        url: "javascript:",
        img: 'static/studio/201712071023182318.jpg'
      },{
        url: "javascript:",
        img: 'static/studio/201712071858515851.jpg'
      }],
      workbenchIndex: 0,
      menuCol: 4,
      quickMenuRow: 3,
      keep: 1000,
      badgeShow: false,
      Loop: undefined
    };
  },
  computed: {
    quickMenuList() {
      let num = this.menuCol * this.quickMenuRow;
      let res = this.quickMenu.slice(0, num);
      return res;
    }
  },
  mounted() {
    this.$store.state.headTitle = "赞同科技";
    this.$store.state.headBack = false;
    this.$store.state.headAdd = false;
    this.$store.state.showDownMenu = true;
    this.loadData()
  },
  methods: {
    loadQuickMenu() {
      return menuService.findQuickMenu().then(data => {
        if (!data.mobileMenuIds) {
          return Promise.resolve([]);
        }
        let ids = data.mobileMenuIds.split(",").filter(item => {
          return item;
        });
        return Promise.resolve(ids)
      });
      // return menuService.findQuickMenu()
    },
    loadMobileMenu() {
      return menuService
        .findMenuAll({
          parentId: "",
          sourceType: 1,
          roleIdList: ""
        })
        .then(data => {
          if(!data || JSON.stringify(data) === '{}') {
            return Promise.resolve([])
          }
          return Promise.resolve(data)
        });
      // return menuService.findMenuAll({
      //   parentId: 1234567,
      //   sourceType: 1,
      //   roleIdList: ""
      // })
    },
    loadData() {
      let promises = [this.loadQuickMenu(), this.loadMobileMenu()]
      Promise.all(promises).then(datas => {
        console.log(datas)
        let quickMenuData = datas[0]
        let menuAllData = datas[1]
        this.mobileMenu = menuAllData
        this.quickMenu = this.mobileMenu.filter(item => {
          return quickMenuData.indexOf(String(item.id)) > -1
        })
      })
    },
    showDeleteButton() {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.badgeShow = true;
      }, this.keep);
    },
    clearLoop() {
      clearInterval(this.Loop);
    },
    jump(item) {
      if (this.badgeShow) {
        return;
      }
      this.$router.push({ name: "business", params: { viewId: item.viewId } });
    },
  }
};
</script>

<style scoped>
@import '~@/icon.scss';
.workbench {
  width: 100%;
  margin-bottom: 50px;
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
.workbench .aui-grid-item__icon  {
  width: 40px;
  height: 40px;
}
.workbench .aui-grid-item__label {
  margin-top: 10px;
  color: #939393;
}
.grid-info .aui-grid-item {
  padding: 0px 12px 10px 12px;
}
.grid-item-badge {
  position: absolute;
}
</style>
<style>
.grid-info .aui-grid-item__icon {
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
}
.menuName {
  font-size: 25px;
  text-align: center;
  color: black;
  border-radius: 50%;
  height: 40px;
}
</style>
