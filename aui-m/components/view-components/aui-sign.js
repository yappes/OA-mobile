!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.AUI=e():t.AUI=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=624)}({0:function(t,e){t.exports=function(t,e,n,r,i,o){var u,s=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(u=t,s=t.default);var f="function"==typeof s?s.options:s;e&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns,f._compiled=!0),n&&(f.functional=!0),i&&(f._scopeId=i);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},f._ssrRegister=c):r&&(c=r),c){var d=f.functional,l=d?f.render:f.beforeCreate;d?(f._injectStyles=c,f.render=function(t,e){return c.call(e),l(t,e)}):f.beforeCreate=l?[].concat(l,c):[c]}return{esModule:u,exports:s,options:f}}},318:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"aui-sign",date:function(){return{}},props:{imgPath:String,text:{type:String,default:""},width:{type:Number,default:20},gutter:{type:Number,default:0},height:{type:Number,default:20},type:{type:String,default:"left"}},computed:{classObj:function(){return"right"==this.type?"aui-sign-right":"top"==this.type?"aui-sign-top":"bottom"==this.type?"aui-sign-bottom":"aui-sign-left"},styleObj:function(){return"right"==this.type?{margin:"0  0 0 "+this.gutter+"px"}:"top"==this.type?{margin:"0  0 "+this.gutter+"px 0"}:"bottom"==this.type?{margin:this.gutter+"px 0  0 0"}:{margin:"0 "+this.gutter+"px 0 0"}}}}},624:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(625),i=function(t){return t&&t.__esModule?t:{default:t}}(r);i.default.install=function(t){t.component(i.default.name,i.default)},e.default=i.default},625:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(318),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);var u=n(626),s=n(0),a=s(i.a,u.a,!1,null,null,null);e.default=a.exports},626:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.classObj},[t._t("img",[t.imgPath?n("img",{style:t.styleObj,attrs:{src:t.imgPath,width:t.width,height:t.height}}):t._e()]),t._v(" "),t._t("text",[n("span",{staticClass:"aui-sign-text"},[t._v(t._s(t.text))])])],2)},i=[],o={render:r,staticRenderFns:i};e.a=o}})});