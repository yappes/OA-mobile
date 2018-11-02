import Vue from 'vue';

import AUIDefaultLang from '../../static/locales/AUILang/zh-CN';
import AUIEnLang from '../../static/locales/AUILang/en';
import AUIZhTwLang from '../../static/locales/AUILang/zh-tw';
import en from '../../static/locales/en';
import zhCN from '../../static/locales/zh-cn';
import zhTw from '../../static/locales/zh-tw';
import objectAssign from 'object-assign';
const Locales = {
    en: objectAssign(AUIEnLang, en),
    'zh-CN': objectAssign(AUIDefaultLang, zhCN),
    'zh-tw': objectAssign(AUIZhTwLang, zhTw)
};

import vuexI18n from 'vuex-i18n';
import store from '../store'
Vue.use(vuexI18n.plugin,store)
for (let i in Locales) {
    Vue.i18n.add(i, Locales[i]);
}

Vue.i18n.set(httpConfig.lang);