!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AUI=t():e.AUI=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=367)}({0:function(e,t){e.exports=function(e,t,o,n,i,r){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var a="function"==typeof u?u.options:u;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),o&&(a.functional=!0),i&&(a._scopeId=i);var c;if(r?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},a._ssrRegister=c):n&&(c=n),c){var l=a.functional,p=l?a.render:a.beforeCreate;l?(a._injectStyles=c,a.render=function(e,t){return c.call(t),p(e,t)}):a.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:a}}},193:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={bind:function(e,t){var o=t.value,n=o;e.handler=function(t){e&&!e.contains(t.target)&&n(t)},document.addEventListener("click",e.handler,!0)},unbind:function(e){document.removeEventListener("click",e.handler,!0),e.handler=null}}},219:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(193),i=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default={name:"aui-popover",mounted:function(){var e=this;this.$nextTick(function(){var t=e.$refs.trigger.children[0];console.log(e.$refs.trigger);var o=e.$refs.popover;switch(e.placement){case"top":e.position.left=t.offsetLeft-o.offsetWidth/2+t.offsetWidth/2,e.position.top=t.getBoundingClientRect().top-o.offsetHeight-e.gutter;break;case"left":e.position.left=t.offsetLeft-parseInt(e.width)-e.gutter,e.position.top=t.getBoundingClientRect().top+t.offsetHeight/2-o.offsetHeight/2;break;case"right":e.position.left=t.offsetLeft+t.offsetWidth+e.gutter,e.position.top=t.getBoundingClientRect().top+t.offsetHeight/2-o.offsetHeight/2;break;case"bottom":e.position.left=t.offsetLeft-o.offsetWidth/2+t.offsetWidth/2,e.position.top=t.getBoundingClientRect().top+t.offsetHeight+e.gutter;break;default:console.warn("Wrong placement prop")}e.show=!1;var n=parseInt(e.width);e.popoverStyle={width:n+"px",top:e.position.top+"px",left:e.position.left+"px",display:"none"}})},directives:{ClickOutside:i.default},props:{content:String,placement:String,gutter:{type:Number,default:5},width:{type:[String,Number],default:"150px"}},methods:{onClickedOutside:function(){this.show&&(this.show=!1,this.$emit("hide"))},toggle:function(){this.show=!this.show,this.$emit(!0===this.show?"show":"hide")}},data:function(){return{position:{top:0,left:0},show:!0,popoverStyle:{}}},computed:{arrowClass:function(){return{"aui-popover-arrow":!0,"aui-popover-arrow-up":"bottom"===this.placement,"aui-popover-arrow-right":"left"===this.placement,"aui-popover-arrow-left":"right"===this.placement,"aui-popover-arrow-down":"top"===this.placement}}}}},367:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(368),i=function(e){return e&&e.__esModule?e:{default:e}}(n);i.default.install=function(e){e.component(i.default.name,i.default)},t.default=i.default},368:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(219),i=o.n(n);for(var r in n)"default"!==r&&function(e){o.d(t,e,function(){return n[e]})}(r);var s=o(369),u=o(0),f=u(i.a,s.a,!1,null,null,null);t.default=f.exports},369:function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.onClickedOutside,expression:"onClickedOutside"}],staticClass:"agree-aui-popover"},[o("span",{ref:"trigger",on:{click:e.toggle}},[o("span",[e._t("default")],2)]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],ref:"popover",staticClass:"aui-popover",style:e.popoverStyle},[o("div",{class:e.arrowClass}),e._v(" "),o("div",{on:{click:function(t){e.$emit("click-content")}}},[e._t("content",[o("div",{domProps:{innerHTML:e._s(e.content)}})])],2)])])},i=[],r={render:n,staticRenderFns:i};t.a=r}})});