# aui-m

## Usage
```js
    // 引入Vue
    import Vue from 'vue'
    //引入第三方依赖库
    import objectAssign from 'object-assign'
    import Vuex from 'vuex'
    import vuexI18n from 'vuex-i18n'

    //if you want use all of them ,you can just import and install AUI.
    import AUI from 'aui-m.js'
    Vue.use(AUI)
    // else you can install them one by one
    import {AuiButton,AuiCard} from 'aui-m.js'
    Vue.use(AuiButton,AuiCard)
    Vue.use(AuiCard)

    // use style
    import 'AUI/theme-default/index.less';

    //项目国际化文件
    import AUIDefaultLang from './AUILang/zh-CN.js'

    //注册国际化文件
    Vue.i18n.add('zh-cn',AUIDefaultLang)

    //设置语言
    Vue.i18n.set('zh-cn')
```