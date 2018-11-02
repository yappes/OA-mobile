<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      showMode: this.$i18n.locale(),
      showBack: false,
      title: this.$route.name,
      drawerVisibility: false
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    locale() {
      return this.$i18n.locale();
    },
    headerTitle() {
      return 'header.' + this.title;
    },
    options() {
      return [
        {
          value: this.$t('app.zhCN'),
          key: 'zh-CN'
        },
        {
          value: this.$t('app.zhTw'),
          key: 'zh-tw'
        },
        {
          value: this.$t('app.English'),
          key: 'en'
        }
      ];
    }
  },
  watch: {
    path(newVal) {
      if (newVal !== '/login') {
        this.showBack = true;
      }
      this.title = this.$route.name;
    },
    locale(val) {
      this.showMode = val;
    }
  },
  methods: {
    back() {
      this.$router.push("/login")
    },
    changeDrawer() {
      this.drawerVisibility = !this.drawerVisibility;
    },
    onShowModeChange(val) {
      this.$i18n.set(val);
      this.drawerVisibility = false;
    }
  },
};
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background: #F4F4F4;
  color: #808080;
  font-size: 12px;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
/* 统一所有页面距离左边边距为15px;
      正文字体color:#808080;font-size:12px;
      标题字体color:#444444;font-size:16px;
      列表icon图片大小为40px*40px,距离右边距16px;
      输入框类value为color:#c8c8c8;font-size:14px;
      placeholder color:#c8c8c8;
      
*/

/* 正文类 */
.aui-media-box__desc {
  color: #808080;
  font-size: 12px;
}
.aui-media-box__info__meta:nth-of-type(2) {
  color: #808080;
}
.aui-grid-item__label {
  color: #808080;
  font-size: 12px;
}
.aui-panel__hd .head-info {
  color: #808080;
  font-size: 12px;
}
/* 标题类 */
.grid-info h3 {
  margin: 0 auto;
  color: #444444;
  font-size: 16px;
  padding: 15px 15px;
  font-weight: normal;
}
.aui-media-box__title {
  color: #444444;
  font-size: 16px;
}
.aui-media-box .aui-cell__bd {
  color: #444444;
  font-size: 16px;
}
.aui-step h3 {
  color: #444444;
  font-size: 16px;
  font-weight: normal;
}
.aui-label,
.agree-aui-label {
  color: #444444;
  font-size: 16px;
}
/* 图片类 */
.aui-media-box_appmsg .aui-media-box__hd {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}
/* 输入框类 */
// .aui-input,
.aui-popup-picker-select,
// .aui-textarea,
.aui-cell-placeholder {
  // color: #323232;
  color: #c8c8c8;
  font-size: 14px;
}
//输入框的值的字体颜色
.aui-input,
.aui-textarea,
.aui-cell-value {
  color: #323232;
  font-size: 14px;
}
input::-webkit-input-placeholder,
.aui-popup-picker-placeholder,
textarea::-webkit-input-placeholder {
  color: #c8c8c8;
}
textarea {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #323232;
  width: 92% !important
}

.aui-confirm {
  .aui-dialog {
    width: 80%;
    border-radius: 3px;
  }
  .aui-confirm__ft {
    position: relative;
    line-height: 48px;
    font-size: 16px;
    display: flex;
  }
  .aui-confirm__ft:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d5d5d6;
    color: #d5d5d6;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .aui-confirm__btn {
    display: block;
    flex: 1;
    color: #d5d5d6;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
  }
  .aui-confirm__btn:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #d5d5d6;
    color: #d5d5d6;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }
  .aui-confirm__btn_default {
    color: #353535;
  }
  .aui-confirm__btn_primary {
    color: #0bb20c;
  }
}
.aui-header .aui-header-title {
  color:white
}
</style>


