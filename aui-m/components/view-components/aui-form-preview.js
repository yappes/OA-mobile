!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.AUI=e():t.AUI=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=586)}({0:function(t,e){t.exports=function(t,e,n,r,o,i){var u,f=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(u=t,f=t.default);var a="function"==typeof f?f.options:f;e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId=o);var s;if(i?(s=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},a._ssrRegister=s):r&&(s=r),s){var l=a.functional,p=l?a.render:a.beforeCreate;l?(a._injectStyles=s,a.render=function(t,e){return s.call(e),p(t,e)}):a.beforeCreate=p?[].concat(p,s):[s]}return{esModule:u,exports:f,options:a}}},1:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},10:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},11:function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},12:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},13:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},14:function(t,e,n){var r=n(30),o=n(20);t.exports=Object.keys||function(t){return r(t,o)}},15:function(t,e,n){var r=n(8);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},16:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},17:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},18:function(t,e,n){var r=n(19)("keys"),o=n(13);t.exports=function(t){return r[t]||(r[t]=o(t))}},19:function(t,e,n){var r=n(1),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},2:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},20:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},21:function(t,e){e.f={}.propertyIsEnumerable},22:function(t,e){t.exports=!0},23:function(t,e,n){var r=n(1),o=n(9),i=n(39),u=n(5),f=n(2),c=function(t,e,n){var a,s,l,p=t&c.F,v=t&c.G,d=t&c.S,y=t&c.P,h=t&c.B,_=t&c.W,b=v?o:o[e]||(o[e]={}),m=b.prototype,g=v?r:d?r[e]:(r[e]||{}).prototype;v&&(n=e);for(a in n)(s=!p&&g&&void 0!==g[a])&&f(b,a)||(l=s?g[a]:n[a],b[a]=v&&"function"!=typeof g[a]?n[a]:h&&s?i(l,r):_&&g[a]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):y&&"function"==typeof l?i(Function.call,l):l,y&&((b.virtual||(b.virtual={}))[a]=l,t&c.R&&m&&!m[a]&&u(m,a,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},24:function(t,e){t.exports={}},25:function(t,e,n){var r=n(4).f,o=n(2),i=n(7)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},26:function(t,e,n){e.f=n(7)},27:function(t,e,n){var r=n(1),o=n(9),i=n(22),u=n(26),f=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||f(e,t,{value:u.f(t)})}},28:function(t,e,n){t.exports=!n(3)&&!n(10)(function(){return 7!=Object.defineProperty(n(29)("div"),"a",{get:function(){return 7}}).a})},29:function(t,e,n){var r=n(8),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},3:function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},30:function(t,e,n){var r=n(2),o=n(6),i=n(42)(!1),u=n(18)("IE_PROTO");t.exports=function(t,e){var n,f=o(t),c=0,a=[];for(n in f)n!=u&&r(f,n)&&a.push(n);for(;e.length>c;)r(f,n=e[c++])&&(~i(a,n)||a.push(n));return a}},302:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(70);e.default={name:"aui-form-preview",props:["headerLabel","headerValue","bodyItems","footerButtons","name"],methods:{onButtonClick:function(t,e){t&&t(this.name),e&&(0,r.go)(e,this)}}}},31:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},32:function(t,e){e.f=Object.getOwnPropertySymbols},33:function(t,e,n){"use strict";var r=n(22),o=n(23),i=n(34),u=n(5),f=n(24),c=n(50),a=n(25),s=n(53),l=n(7)("iterator"),p=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,n,d,y,h,_){c(n,e,d);var b,m,g,x=function(t){if(!p&&t in j)return j[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",w="values"==y,O=!1,j=t.prototype,P=j[l]||j["@@iterator"]||y&&j[y],M=P||x(y),C=y?w?x("entries"):M:void 0,E="Array"==e?j.entries||P:P;if(E&&(g=s(E.call(new t)))!==Object.prototype&&g.next&&(a(g,S,!0),r||"function"==typeof g[l]||u(g,l,v)),w&&P&&"values"!==P.name&&(O=!0,M=function(){return P.call(this)}),r&&!_||!p&&!O&&j[l]||u(j,l,M),f[e]=M,f[S]=v,y)if(b={values:w?M:x("values"),keys:h?M:x("keys"),entries:C},_)for(m in b)m in j||i(j,m,b[m]);else o(o.P+o.F*(p||O),e,b);return b}},34:function(t,e,n){t.exports=n(5)},35:function(t,e,n){var r=n(11),o=n(51),i=n(20),u=n(18)("IE_PROTO"),f=function(){},c=function(){var t,e=n(29)("iframe"),r=i.length;for(e.style.display="none",n(52).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;r--;)delete c.prototype[i[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(f.prototype=r(t),n=new f,f.prototype=null,n[u]=t):n=c(),void 0===e?n:o(n,e)}},36:function(t,e,n){var r=n(30),o=n(20).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},37:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(46),i=r(o),u=n(58),f=r(u),c="function"==typeof f.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":typeof t};e.default="function"==typeof f.default&&"symbol"===c(i.default)?function(t){return void 0===t?"undefined":c(t)}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":void 0===t?"undefined":c(t)}},38:function(t,e,n){var r=n(17);t.exports=function(t){return Object(r(t))}},39:function(t,e,n){var r=n(40);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},4:function(t,e,n){var r=n(11),o=n(28),i=n(15),u=Object.defineProperty;e.f=n(3)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},40:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},41:function(t,e,n){var r=n(31);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},42:function(t,e,n){var r=n(6),o=n(43),i=n(44);t.exports=function(t){return function(e,n,u){var f,c=r(e),a=o(c.length),s=i(u,a);if(t&&n!=n){for(;a>s;)if((f=c[s++])!=f)return!0}else for(;a>s;s++)if((t||s in c)&&c[s]===n)return t||s||0;return!t&&-1}}},43:function(t,e,n){var r=n(16),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},44:function(t,e,n){var r=n(16),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},46:function(t,e,n){t.exports={default:n(47),__esModule:!0}},47:function(t,e,n){n(48),n(54),t.exports=n(26).f("iterator")},48:function(t,e,n){"use strict";var r=n(49)(!0);n(33)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},49:function(t,e,n){var r=n(16),o=n(17);t.exports=function(t){return function(e,n){var i,u,f=String(o(e)),c=r(n),a=f.length;return c<0||c>=a?t?"":void 0:(i=f.charCodeAt(c),i<55296||i>56319||c+1===a||(u=f.charCodeAt(c+1))<56320||u>57343?t?f.charAt(c):i:t?f.slice(c,c+2):u-56320+(i-55296<<10)+65536)}}},5:function(t,e,n){var r=n(4),o=n(12);t.exports=n(3)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},50:function(t,e,n){"use strict";var r=n(35),o=n(12),i=n(25),u={};n(5)(u,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},51:function(t,e,n){var r=n(4),o=n(11),i=n(14);t.exports=n(3)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),f=u.length,c=0;f>c;)r.f(t,n=u[c++],e[n]);return t}},52:function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},53:function(t,e,n){var r=n(2),o=n(38),i=n(18)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},54:function(t,e,n){n(55);for(var r=n(1),o=n(5),i=n(24),u=n(7)("toStringTag"),f="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<f.length;c++){var a=f[c],s=r[a],l=s&&s.prototype;l&&!l[u]&&o(l,u,a),i[a]=i.Array}},55:function(t,e,n){"use strict";var r=n(56),o=n(57),i=n(24),u=n(6);t.exports=n(33)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},56:function(t,e){t.exports=function(){}},57:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},58:function(t,e,n){t.exports={default:n(59),__esModule:!0}},586:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(587),o=function(t){return t&&t.__esModule?t:{default:t}}(r);o.default.install=function(t){t.component(o.default.name,o.default)},e.default=o.default},587:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(302),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);var u=n(588),f=n(0),c=f(o.a,u.a,!1,null,null,null);e.default=c.exports},588:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"aui-self-form-preview aui-form-preview"},[n("div",{staticClass:"aui-form-preview__hd"},[n("label",{staticClass:"aui-form-preview__label",domProps:{innerHTML:t._s(t.headerLabel)}}),t._v(" "),n("em",{staticClass:"aui-form-preview__value",domProps:{innerHTML:t._s(t.headerValue||"&nbsp;")}})]),t._v(" "),n("div",{staticClass:"aui-form-preview__bd"},t._l(t.bodyItems,function(e){return n("div",{staticClass:"aui-form-preview__item"},[n("label",{staticClass:"aui-form-preview__label"},[t._v(t._s(t.$t(e.label)))]),t._v(" "),n("span",{staticClass:"aui-form-preview__value"},[t._v(t._s(t.$t(e.value)))])])})),t._v(" "),n("div",{staticClass:"aui-form-preview__ft"},t._l(t.footerButtons,function(e){return n("a",{staticClass:"aui-form-preview__btn",class:{"aui-form-preview__btn_default":"default"===e.style,"aui-form-preview__btn_primary":"primary"===e.style},attrs:{href:"javascript:"},on:{click:function(n){t.onButtonClick(e.onButtonClick,e.link)}}},[t._v(t._s(t.$t(e.text)))])}))])},o=[],i={render:r,staticRenderFns:o};e.a=i},59:function(t,e,n){n(60),n(66),n(67),n(68),t.exports=n(9).Symbol},6:function(t,e,n){var r=n(41),o=n(17);t.exports=function(t){return r(o(t))}},60:function(t,e,n){"use strict";var r=n(1),o=n(2),i=n(3),u=n(23),f=n(34),c=n(61).KEY,a=n(10),s=n(19),l=n(25),p=n(13),v=n(7),d=n(26),y=n(27),h=n(62),_=n(63),b=n(11),m=n(8),g=n(6),x=n(15),S=n(12),w=n(35),O=n(64),j=n(65),P=n(4),M=n(14),C=j.f,E=P.f,L=O.f,T=r.Symbol,k=r.JSON,A=k&&k.stringify,F=v("_hidden"),I=v("toPrimitive"),N={}.propertyIsEnumerable,$=s("symbol-registry"),R=s("symbols"),V=s("op-symbols"),B=Object.prototype,D="function"==typeof T,G=r.QObject,U=!G||!G.prototype||!G.prototype.findChild,H=i&&a(function(){return 7!=w(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=C(B,e);r&&delete B[e],E(t,e,n),r&&t!==B&&E(B,e,r)}:E,W=function(t){var e=R[t]=w(T.prototype);return e._k=t,e},J=D&&"symbol"==typeof T.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof T},K=function(t,e,n){return t===B&&K(V,e,n),b(t),e=x(e,!0),b(n),o(R,e)?(n.enumerable?(o(t,F)&&t[F][e]&&(t[F][e]=!1),n=w(n,{enumerable:S(0,!1)})):(o(t,F)||E(t,F,S(1,{})),t[F][e]=!0),H(t,e,n)):E(t,e,n)},q=function(t,e){b(t);for(var n,r=h(e=g(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},z=function(t,e){return void 0===e?w(t):q(w(t),e)},X=function(t){var e=N.call(this,t=x(t,!0));return!(this===B&&o(R,t)&&!o(V,t))&&(!(e||!o(this,t)||!o(R,t)||o(this,F)&&this[F][t])||e)},Y=function(t,e){if(t=g(t),e=x(e,!0),t!==B||!o(R,e)||o(V,e)){var n=C(t,e);return!n||!o(R,e)||o(t,F)&&t[F][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=L(g(t)),r=[],i=0;n.length>i;)o(R,e=n[i++])||e==F||e==c||r.push(e);return r},Z=function(t){for(var e,n=t===B,r=L(n?V:g(t)),i=[],u=0;r.length>u;)!o(R,e=r[u++])||n&&!o(B,e)||i.push(R[e]);return i};D||(T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===B&&e.call(V,n),o(this,F)&&o(this[F],t)&&(this[F][t]=!1),H(this,t,S(1,n))};return i&&U&&H(B,t,{configurable:!0,set:e}),W(t)},f(T.prototype,"toString",function(){return this._k}),j.f=Y,P.f=K,n(36).f=O.f=Q,n(21).f=X,n(32).f=Z,i&&!n(22)&&f(B,"propertyIsEnumerable",X,!0),d.f=function(t){return W(v(t))}),u(u.G+u.W+u.F*!D,{Symbol:T});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)v(tt[et++]);for(var nt=M(v.store),rt=0;nt.length>rt;)y(nt[rt++]);u(u.S+u.F*!D,"Symbol",{for:function(t){return o($,t+="")?$[t]:$[t]=T(t)},keyFor:function(t){if(!J(t))throw TypeError(t+" is not a symbol!");for(var e in $)if($[e]===t)return e},useSetter:function(){U=!0},useSimple:function(){U=!1}}),u(u.S+u.F*!D,"Object",{create:z,defineProperty:K,defineProperties:q,getOwnPropertyDescriptor:Y,getOwnPropertyNames:Q,getOwnPropertySymbols:Z}),k&&u(u.S+u.F*(!D||a(function(){var t=T();return"[null]"!=A([t])||"{}"!=A({a:t})||"{}"!=A(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(m(e)||void 0!==t)&&!J(t))return _(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,A.apply(k,r)}}),T.prototype[I]||n(5)(T.prototype,I,T.prototype.valueOf),l(T,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},61:function(t,e,n){var r=n(13)("meta"),o=n(8),i=n(2),u=n(4).f,f=0,c=Object.isExtensible||function(){return!0},a=!n(10)(function(){return c(Object.preventExtensions({}))}),s=function(t){u(t,r,{value:{i:"O"+ ++f,w:{}}})},l=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!c(t))return"F";if(!e)return"E";s(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!c(t))return!0;if(!e)return!1;s(t)}return t[r].w},v=function(t){return a&&d.NEED&&c(t)&&!i(t,r)&&s(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:v}},62:function(t,e,n){var r=n(14),o=n(32),i=n(21);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,f=n(t),c=i.f,a=0;f.length>a;)c.call(t,u=f[a++])&&e.push(u);return e}},63:function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return"Array"==r(t)}},64:function(t,e,n){var r=n(6),o=n(36).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],f=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?f(t):o(r(t))}},65:function(t,e,n){var r=n(21),o=n(12),i=n(6),u=n(15),f=n(2),c=n(28),a=Object.getOwnPropertyDescriptor;e.f=n(3)?a:function(t,e){if(t=i(t),e=u(e,!0),c)try{return a(t,e)}catch(t){}if(f(t,e))return o(!r.f.call(t,e),t[e])}},66:function(t,e){},67:function(t,e,n){n(27)("asyncIterator")},68:function(t,e,n){n(27)("observable")},7:function(t,e,n){var r=n(19)("wks"),o=n(13),i=n(1).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},70:function(t,e,n){"use strict";function r(t,e){if(!/^javas/.test(t)&&t){if(e.$activityManager)return void e.$activityManager.requestUpdateView(t);"object"===(void 0===t?"undefined":(0,u.default)(t))||e.$router&&"string"==typeof t&&!/http/.test(t)?"object"===(void 0===t?"undefined":(0,u.default)(t))&&!0===t.replace?e.$router.replace(t):"BACK"===t?e.$router.go(-1):e.$router.push(t):window.location.href=t}}function o(t,e){return!e.$router||e.$router._history||"string"!=typeof t||/http/.test(t)?t&&"object"!==(void 0===t?"undefined":(0,u.default)(t))?t:"javascript:void(0);":"#!"+t}Object.defineProperty(e,"__esModule",{value:!0});var i=n(37),u=function(t){return t&&t.__esModule?t:{default:t}}(i);e.go=r,e.getUrl=o},8:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},9:function(t,e){var n=t.exports={version:"2.5.5"};"number"==typeof __e&&(__e=n)}})});