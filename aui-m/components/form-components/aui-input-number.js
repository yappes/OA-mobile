!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AUI=t():e.AUI=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=194)}({0:function(e,t){e.exports=function(e,t,n,r,i,s){var u,o=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(u=e,o=e.default);var a="function"==typeof o?o.options:o;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),i&&(a._scopeId=i);var c;if(s?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},a._ssrRegister=c):r&&(c=r),c){var f=a.functional,h=f?a.render:a.beforeCreate;f?(a._injectStyles=c,a.render=function(e,t){return c.call(t),h(e,t)}):a.beforeCreate=h?[].concat(h,c):[c]}return{esModule:u,exports:o,options:a}}},169:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(235);t.default={name:"aui-input-number",props:{min:Number,max:Number,readonly:Boolean,step:{type:Number,default:1},value:{validator:function(e){return"number"==typeof e||"string"==typeof e&&""===e},default:0},name:String,title:String,fillable:{type:Boolean,default:!1},width:{type:String,default:"50px"},buttonStyle:{type:String,default:"square"},align:{type:String,default:"right"}},created:function(){this.currentValue=this.value},data:function(){return{currentValue:0}},computed:{disabledMin:function(){return void 0!==this.min&&(""===this.currentValue||this.currentValue<=this.min)},disabledMax:function(){return void 0!==this.max&&(""===this.currentValue||this.currentValue>=this.max)},labelClass:function(){return{"aui-cell-justify":"justify"===this.$parent.labelAlign||"justify"===this.$parent.$parent.labelAlign}}},watch:{currentValue:function(e,t){""!==e&&(void 0!==this.min&&this.currentValue<this.min&&(this.currentValue=this.min),this.max&&this.currentValue>this.max&&(this.currentValue=this.max)),this.$emit("input",this.currentValue),this.$emit("change",this.currentValue)},value:function(e){this.currentValue=e}},methods:{add:function(){if(!this.disabledMax){var e=new r(this.currentValue);this.currentValue=1*e.plus(this.step)}},sub:function(){if(!this.disabledMin){var e=new r(this.currentValue);this.currentValue=1*e.minus(this.step)}},blur:function(){""===this.currentValue&&(this.currentValue=0)}}}},194:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(234),i=function(e){return e&&e.__esModule?e:{default:e}}(r);i.default.install=function(e){e.component(i.default.name,i.default)},t.default=i.default},234:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(169),i=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,function(){return r[e]})}(s);var u=n(236),o=n(0),l=o(i.a,u.a,!1,null,null,null);t.default=l.exports},235:function(e,t,n){var r;!function(i){"use strict";function s(){function e(t){var n=this;if(!(n instanceof e))return void 0===t?s():new e(t);t instanceof e?(n.s=t.s,n.e=t.e,n.c=t.c.slice()):o(n,t),n.constructor=e}return e.prototype=v,e.DP=f,e.RM=h,e.E_NEG=d,e.E_POS=p,e}function u(e,t,n){var r=e.constructor,i=t-(e=new r(e)).e,s=e.c;for(s.length>++t&&l(e,i,r.RM),s[0]?n?i=t:(s=e.c,i=e.e+i+1):++i;s.length<i;s.push(0));return i=e.e,1===n||n&&(t<=i||i<=r.E_NEG)?(e.s<0&&s[0]?"-":"")+(s.length>1?s[0]+"."+s.join("").slice(1):s[0])+(i<0?"e":"e+")+i:e.toString()}function o(e,t){var n,r,i;for(0===t&&1/t<0?t="-0":m.test(t+="")||a(NaN),e.s="-"==t.charAt(0)?(t=t.slice(1),-1):1,(n=t.indexOf("."))>-1&&(t=t.replace(".","")),(r=t.search(/e/i))>0?(n<0&&(n=r),n+=+t.slice(r+1),t=t.substring(0,r)):n<0&&(n=t.length),i=t.length,r=0;r<i&&"0"==t.charAt(r);r++);if(r==i)e.c=[e.e=0];else{for(;i>0&&"0"==t.charAt(--i););for(e.e=n-r-1,e.c=[];r<=i;e.c.push(+t.charAt(r++)));}return e}function l(e,t,n,r){var i,s=e.c,u=e.e+t+1;if(1===n?r=s[u]>=5:2===n?r=s[u]>5||5==s[u]&&(r||u<0||s[u+1]!==i||1&s[u-1]):3===n?r=r||s[u]!==i||u<0:(r=!1,0!==n&&a("!Big.RM!")),u<1||!s[0])r?(e.e=-t,e.c=[1]):e.c=[e.e=0];else{if(s.length=u--,r)for(;++s[u]>9;)s[u]=0,u--||(++e.e,s.unshift(1));for(u=s.length;!s[--u];s.pop());}return e}function a(e){var t=new Error(e);throw t.name="BigError",t}var c,f=20,h=1,d=-7,p=21,v={},m=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;v.abs=function(){var e=new this.constructor(this);return e.s=1,e},v.cmp=function(e){var t,n=this,r=n.c,i=(e=new n.constructor(e)).c,s=n.s,u=e.s,o=n.e,l=e.e;if(!r[0]||!i[0])return r[0]?s:i[0]?-u:0;if(s!=u)return s;if(t=s<0,o!=l)return o>l^t?1:-1;for(s=-1,u=(o=r.length)<(l=i.length)?o:l;++s<u;)if(r[s]!=i[s])return r[s]>i[s]^t?1:-1;return o==l?0:o>l^t?1:-1},v.div=function(e){var t=this,n=t.constructor,r=t.c,i=(e=new n(e)).c,s=t.s==e.s?1:-1,u=n.DP;if((u!==~~u||u<0||u>1e6)&&a("!Big.DP!"),!r[0]||!i[0])return r[0]==i[0]&&a(NaN),i[0]||a(s/0),new n(0*s);var o,c,f,h,d,p,v=i.slice(),m=o=i.length,g=r.length,w=r.slice(0,o),b=w.length,_=e,x=_.c=[],y=0,S=u+(_.e=t.e-e.e)+1;for(_.s=s,s=S<0?0:S,v.unshift(0);b++<o;w.push(0));do{for(f=0;f<10;f++){if(o!=(b=w.length))h=o>b?1:-1;else for(d=-1,h=0;++d<o;)if(i[d]!=w[d]){h=i[d]>w[d]?1:-1;break}if(!(h<0))break;for(c=b==o?i:v;b;){if(w[--b]<c[b]){for(d=b;d&&!w[--d];w[d]=9);--w[d],w[b]+=10}w[b]-=c[b]}for(;!w[0];w.shift());}x[y++]=h?f:++f,w[0]&&h?w[b]=r[m]||0:w=[r[m]]}while((m++<g||w[0]!==p)&&s--);return x[0]||1==y||(x.shift(),_.e--),y>S&&l(_,u,n.RM,w[0]!==p),_},v.eq=function(e){return!this.cmp(e)},v.gt=function(e){return this.cmp(e)>0},v.gte=function(e){return this.cmp(e)>-1},v.lt=function(e){return this.cmp(e)<0},v.lte=function(e){return this.cmp(e)<1},v.sub=v.minus=function(e){var t,n,r,i,s=this,u=s.constructor,o=s.s,l=(e=new u(e)).s;if(o!=l)return e.s=-l,s.plus(e);var a=s.c.slice(),c=s.e,f=e.c,h=e.e;if(!a[0]||!f[0])return f[0]?(e.s=-l,e):new u(a[0]?s:0);if(o=c-h){for((i=o<0)?(o=-o,r=a):(h=c,r=f),r.reverse(),l=o;l--;r.push(0));r.reverse()}else for(n=((i=a.length<f.length)?a:f).length,o=l=0;l<n;l++)if(a[l]!=f[l]){i=a[l]<f[l];break}if(i&&(r=a,a=f,f=r,e.s=-e.s),(l=(n=f.length)-(t=a.length))>0)for(;l--;a[t++]=0);for(l=t;n>o;){if(a[--n]<f[n]){for(t=n;t&&!a[--t];a[t]=9);--a[t],a[n]+=10}a[n]-=f[n]}for(;0===a[--l];a.pop());for(;0===a[0];)a.shift(),--h;return a[0]||(e.s=1,a=[h=0]),e.c=a,e.e=h,e},v.mod=function(e){var t,n=this,r=n.constructor,i=n.s,s=(e=new r(e)).s;return e.c[0]||a(NaN),n.s=e.s=1,t=1==e.cmp(n),n.s=i,e.s=s,t?new r(n):(i=r.DP,s=r.RM,r.DP=r.RM=0,n=n.div(e),r.DP=i,r.RM=s,this.minus(n.times(e)))},v.add=v.plus=function(e){var t,n=this,r=n.constructor,i=n.s,s=(e=new r(e)).s;if(i!=s)return e.s=-s,n.minus(e);var u=n.e,o=n.c,l=e.e,a=e.c;if(!o[0]||!a[0])return a[0]?e:new r(o[0]?n:0*i);if(o=o.slice(),i=u-l){for(i>0?(l=u,t=a):(i=-i,t=o),t.reverse();i--;t.push(0));t.reverse()}for(o.length-a.length<0&&(t=a,a=o,o=t),i=a.length,s=0;i;)s=(o[--i]=o[i]+a[i]+s)/10|0,o[i]%=10;for(s&&(o.unshift(s),++l),i=o.length;0===o[--i];o.pop());return e.c=o,e.e=l,e},v.pow=function(e){var t=this,n=new t.constructor(1),r=n,i=e<0;for((e!==~~e||e<-1e6||e>1e6)&&a("!pow!"),e=i?-e:e;1&e&&(r=r.times(t)),e>>=1;)t=t.times(t);return i?n.div(r):r},v.round=function(e,t){var n=this,r=n.constructor;return null==e?e=0:(e!==~~e||e<0||e>1e6)&&a("!round!"),l(n=new r(n),e,null==t?r.RM:t),n},v.sqrt=function(){var e,t,n,r=this,i=r.constructor,s=r.c,u=r.s,o=r.e,c=new i("0.5");if(!s[0])return new i(r);u<0&&a(NaN),u=Math.sqrt(r.toString()),0===u||u===1/0?(e=s.join(""),e.length+o&1||(e+="0"),t=new i(Math.sqrt(e).toString()),t.e=((o+1)/2|0)-(o<0||1&o)):t=new i(u.toString()),u=t.e+(i.DP+=4);do{n=t,t=c.times(n.plus(r.div(n)))}while(n.c.slice(0,u).join("")!==t.c.slice(0,u).join(""));return l(t,i.DP-=4,i.RM),t},v.mul=v.times=function(e){var t,n=this,r=n.constructor,i=n.c,s=(e=new r(e)).c,u=i.length,o=s.length,l=n.e,a=e.e;if(e.s=n.s==e.s?1:-1,!i[0]||!s[0])return new r(0*e.s);for(e.e=l+a,u<o&&(t=i,i=s,s=t,a=u,u=o,o=a),t=new Array(a=u+o);a--;t[a]=0);for(l=o;l--;){for(o=0,a=u+l;a>l;)o=t[a]+s[l]*i[a-l-1]+o,t[a--]=o%10,o=o/10|0;t[a]=(t[a]+o)%10}for(o&&++e.e,t[0]||t.shift(),l=t.length;!t[--l];t.pop());return e.c=t,e},v.toString=v.valueOf=v.toJSON=function(){var e=this,t=e.constructor,n=e.e,r=e.c.join(""),i=r.length;if(n<=t.E_NEG||n>=t.E_POS)r=r.charAt(0)+(i>1?"."+r.slice(1):"")+(n<0?"e":"e+")+n;else if(n<0){for(;++n;r="0"+r);r="0."+r}else if(n>0)if(++n>i)for(n-=i;n--;r+="0");else n<i&&(r=r.slice(0,n)+"."+r.slice(n));else i>1&&(r=r.charAt(0)+"."+r.slice(1));return e.s<0&&e.c[0]?"-"+r:r},v.toExponential=function(e){return null==e?e=this.c.length-1:(e!==~~e||e<0||e>1e6)&&a("!toExp!"),u(this,e,1)},v.toFixed=function(e){var t,n=this,r=n.constructor,i=r.E_NEG,s=r.E_POS;return r.E_NEG=-(r.E_POS=1/0),null==e?t=n.toString():e===~~e&&e>=0&&e<=1e6&&(t=u(n,n.e+e),n.s<0&&n.c[0]&&t.indexOf("-")<0&&(t="-"+t)),r.E_NEG=i,r.E_POS=s,t||a("!toFix!"),t},v.toPrecision=function(e){return null==e?this.toString():((e!==~~e||e<1||e>1e6)&&a("!toPre!"),u(this,e-1,2))},c=s(),void 0!==(r=function(){return c}.call(t,n,t,e))&&(e.exports=r)}()},236:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"aui-cell"},[n("div",[n("p",{class:e.labelClass,style:{width:e.$parent.labelWidth,textAlign:e.$parent.labelAlign,marginRight:e.$parent.labelMarginRight},domProps:{innerHTML:e._s(e.$t(e.title))}})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.readonly,expression:"!readonly"}],staticClass:"aui-cell__ft aui-cell-primary",class:{"aui-input-number-round":"round"===e.buttonStyle},staticStyle:{"font-size":"0"}},[n("div",{style:{float:e.align}},[n("a",{staticClass:"aui-input-number-selector aui-input-number-selector-sub",class:{"aui-input-number-disabled":e.disabledMin},on:{click:e.sub}},[n("svg",{attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"18",height:"18"}},[n("defs"),e._v(" "),n("path",{attrs:{d:"M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"}})])]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.currentValue,expression:"currentValue",modifiers:{number:!0}}],staticClass:"aui-input-number-input",style:{width:e.width},attrs:{name:e.name,readonly:!e.fillable,pattern:"[0-9]*",type:"number"},domProps:{value:e.currentValue},on:{blur:[e.blur,function(t){e.$forceUpdate()}],input:function(t){t.target.composing||(e.currentValue=e._n(t.target.value))}}}),e._v(" "),n("a",{staticClass:"aui-input-number-selector aui-input-number-selector-plus",class:{"aui-input-number-disabled":e.disabledMax},on:{click:e.add}},[n("svg",{attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"20",height:"20"}},[n("defs"),e._v(" "),n("path",{attrs:{d:"M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"}})])])])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.readonly,expression:"readonly"}],staticClass:"aui-cell__ft aui-cell-primary"},[e._v("\n    "+e._s(e.value)+"\n  ")])])},i=[],s={render:r,staticRenderFns:i};t.a=s}})});