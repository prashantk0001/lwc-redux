!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n=n||self).immer={})}(this,(function(n){function t(n){for(var t=arguments.length,r=Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];throw Error("[Immer] minified error nr: "+n+(r.length?" "+r.join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return!!n&&!!n[H]}function e(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var t=Object.getPrototypeOf(n);return!t||t===Object.prototype}(n)||Array.isArray(n)||!!n[G]||!!n.constructor[G]||v(n)||s(n))}function i(n,t,r){void 0===r&&(r=!1),0===u(n)?(r?Object.keys:Q)(n).forEach((function(e){r&&"symbol"==typeof e||t(e,n[e],n)})):n.forEach((function(r,e){return t(e,r,n)}))}function u(n){var t=n[H];return t?t.t>3?t.t-4:t.t:Array.isArray(n)?1:v(n)?2:s(n)?3:0}function o(n,t){return 2===u(n)?n.has(t):Object.prototype.hasOwnProperty.call(n,t)}function f(n,t){return 2===u(n)?n.get(t):n[t]}function a(n,t,r){var e=u(n);2===e?n.set(t,r):3===e?(n.delete(t),n.add(r)):n[t]=r}function c(n,t){return n===t?0!==n||1/n==1/t:n!=n&&t!=t}function v(n){return W&&n instanceof Map}function s(n){return X&&n instanceof Set}function l(n){return n.i||n.u}function p(n){if(Array.isArray(n))return n.slice();var t=T(n);delete t[H];for(var r=Q(t),e=0;e<r.length;e++){var i=r[e],u=t[i];!1===u.writable&&(u.writable=!0,u.configurable=!0),(u.get||u.set)&&(t[i]={configurable:!0,writable:!0,enumerable:u.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),t)}function h(n,t){y(n)||r(n)||!e(n)||(u(n)>1&&(n.set=n.add=n.clear=n.delete=d),Object.freeze(n),t&&i(n,(function(n,t){return h(t,!0)}),!0))}function d(){t(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function _(n){var r=U[n];return r||t(19,n),r}function b(n,t){U[n]=t}function m(){return J}function j(n,t){t&&(_("Patches"),n.o=[],n.v=[],n.s=t)}function O(n){w(n),n.l.forEach(M),n.l=null}function w(n){n===J&&(J=n.p)}function S(n){return J={l:[],p:J,h:n,_:!0,m:0}}function M(n){var t=n[H];0===t.t||1===t.t?t.j():t.O=!0}function P(n,r){r.m=r.l.length;var i=r.l[0],u=void 0!==n&&n!==i;return r.h.S||_("ES5").M(r,n,u),u?(i[H].P&&(O(r),t(4)),e(n)&&(n=g(r,n),r.p||x(r,n)),r.o&&_("Patches").g(i[H],n,r.o,r.v)):n=g(r,i,[]),O(r),r.o&&r.s(r.o,r.v),n!==B?n:void 0}function g(n,t,r){if(y(t))return t;var e=t[H];if(!e)return i(t,(function(i,u){return A(n,e,t,i,u,r)}),!0),t;if(e.A!==n)return t;if(!e.P)return x(n,e.u,!0),e.u;if(!e.R){e.R=!0,e.A.m--;var u=4===e.t||5===e.t?e.i=p(e.k):e.i;i(u,(function(t,i){return A(n,e,u,t,i,r)})),x(n,u,!1),r&&n.o&&_("Patches").F(e,r,n.o,n.v)}return e.i}function A(n,t,i,u,f,c){if(r(f)){var v=g(n,f,c&&t&&3!==t.t&&!o(t.D,u)?c.concat(u):void 0);if(a(i,u,v),!r(v))return;n._=!1}if(e(f)&&!y(f)){if(!n.h.K&&n.m<1)return;g(n,f),t&&t.A.p||x(n,f)}}function x(n,t,r){void 0===r&&(r=!1),n.h.K&&n._&&h(t,r)}function z(n,t){var r=n[H];return(r?l(r):n)[t]}function E(n){n.P||(n.P=!0,n.p&&E(n.p))}function R(n){n.i||(n.i=p(n.u))}function k(n,t,r){var e=v(t)?_("MapSet").$(t,r):s(t)?_("MapSet").C(t,r):n.S?function(n,t){var r=Array.isArray(n),e={t:r?1:0,A:t?t.A:m(),P:!1,R:!1,D:{},p:t,u:n,k:null,i:null,j:null,I:!1},i=e,u=V;r&&(i=[e],u=Y);var o=Proxy.revocable(i,u),f=o.revoke,a=o.proxy;return e.k=a,e.j=f,a}(t,r):_("ES5").J(t,r);return(r?r.A:m()).l.push(e),e}function F(n){return r(n)||t(22,n),function n(t){if(!e(t))return t;var r,o=t[H],c=u(t);if(o){if(!o.P&&(o.t<4||!_("ES5").N(o)))return o.u;o.R=!0,r=D(t,c),o.R=!1}else r=D(t,c);return i(r,(function(t,e){o&&f(o.u,t)===e||a(r,t,n(e))})),3===c?new Set(r):r}(n)}function D(n,t){switch(t){case 2:return new Map(n);case 3:return Array.from(n)}return p(n)}function K(){function n(n,t){var r=f[n];return r?r.enumerable=t:f[n]=r={configurable:!0,enumerable:t,get:function(){return V.get(this[H],n)},set:function(t){V.set(this[H],n,t)}},r}function t(n){for(var t=n.length-1;t>=0;t--){var r=n[t][H];if(!r.P)switch(r.t){case 5:u(r)&&E(r);break;case 4:e(r)&&E(r)}}}function e(n){for(var t=n.u,r=n.k,e=Q(r),i=e.length-1;i>=0;i--){var u=e[i];if(u!==H){var f=t[u];if(void 0===f&&!o(t,u))return!0;var a=r[u],v=a&&a[H];if(v?v.u!==f:!c(a,f))return!0}}var s=!!t[H];return e.length!==Q(t).length+(s?0:1)}function u(n){var t=n.k;if(t.length!==n.u.length)return!0;var r=Object.getOwnPropertyDescriptor(t,t.length-1);return!(!r||r.get)}var f={};b("ES5",{J:function(t,r){var e=Array.isArray(t),i=function(t,r){var e=T(r);t&&delete e.length,delete e[H];for(var i=Q(e),u=0;u<i.length;u++){var o=i[u];e[o]=n(o,t||!!e[o].enumerable)}if(t){var f=Array(r.length);return Object.defineProperties(f,e),f}return Object.create(Object.getPrototypeOf(r),e)}(e,t),u={t:e?5:4,A:r?r.A:m(),P:!1,R:!1,D:{},p:r,u:t,k:i,i:null,O:!1,I:!1};return Object.defineProperty(i,H,{value:u,writable:!0}),i},M:function(n,e,f){f?r(e)&&e[H].A===n&&t(n.l):(n.o&&function n(t){if(t&&"object"==typeof t){var r=t[H];if(r){var e=r.u,f=r.k,a=r.D,c=r.t;if(4===c)i(f,(function(t){t!==H&&(void 0!==e[t]||o(e,t)?a[t]||n(f[t]):(a[t]=!0,E(r)))})),i(e,(function(n){void 0!==f[n]||o(f,n)||(a[n]=!1,E(r))}));else if(5===c){if(u(r)&&(E(r),a.length=!0),f.length<e.length)for(var v=f.length;v<e.length;v++)a[v]=!1;else for(var s=e.length;s<f.length;s++)a[s]=!0;for(var l=Math.min(f.length,e.length),p=0;p<l;p++)void 0===a[p]&&n(f[p])}}}}(n.l[0]),t(n.l))},N:function(n){return 4===n.t?e(n):u(n)}})}function $(){function n(t){if(!t||"object"!=typeof t)return t;if(Array.isArray(t))return t.map(n);if(v(t))return new Map(Array.from(t.entries()).map((function(t){return[t[0],n(t[1])]})));if(s(t))return new Set(Array.from(t).map(n));var r=Object.create(Object.getPrototypeOf(t));for(var e in t)r[e]=n(t[e]);return r}function e(t){return r(t)?n(t):t}var a="add";b("Patches",{W:function(r,e){return e.forEach((function(e){for(var i=e.path,o=e.op,c=r,v=0;v<i.length-1;v++)"object"!=typeof(c=f(c,i[v]))&&t(15,i.join("/"));var s=u(c),l=n(e.value),p=i[i.length-1];switch(o){case"replace":switch(s){case 2:return c.set(p,l);case 3:t(16);default:return c[p]=l}case a:switch(s){case 1:return c.splice(p,0,l);case 2:return c.set(p,l);case 3:return c.add(l);default:return c[p]=l}case"remove":switch(s){case 1:return c.splice(p,1);case 2:return c.delete(p);case 3:return c.delete(e.value);default:return delete c[p]}default:t(17,o)}})),r},F:function(n,t,r,u){switch(n.t){case 0:case 4:case 2:return function(n,t,r,u){var c=n.u,v=n.i;i(n.D,(function(n,i){var s=f(c,n),l=f(v,n),p=i?o(c,n)?"replace":a:"remove";if(s!==l||"replace"!==p){var h=t.concat(n);r.push("remove"===p?{op:p,path:h}:{op:p,path:h,value:l}),u.push(p===a?{op:"remove",path:h}:"remove"===p?{op:a,path:h,value:e(s)}:{op:"replace",path:h,value:e(s)})}}))}(n,t,r,u);case 5:case 1:return function(n,t,r,i){var u=n.u,o=n.D,f=n.i;if(f.length<u.length){var c=[f,u];u=c[0],f=c[1];var v=[i,r];r=v[0],i=v[1]}for(var s=0;s<u.length;s++)if(o[s]&&f[s]!==u[s]){var l=t.concat([s]);r.push({op:"replace",path:l,value:e(f[s])}),i.push({op:"replace",path:l,value:e(u[s])})}for(var p=u.length;p<f.length;p++){var h=t.concat([p]);r.push({op:a,path:h,value:e(f[p])})}u.length<f.length&&i.push({op:"replace",path:t.concat(["length"]),value:u.length})}(n,t,r,u);case 3:return function(n,t,r,e){var i=n.u,u=n.i,o=0;i.forEach((function(n){if(!u.has(n)){var i=t.concat([o]);r.push({op:"remove",path:i,value:n}),e.unshift({op:a,path:i,value:n})}o++})),o=0,u.forEach((function(n){if(!i.has(n)){var u=t.concat([o]);r.push({op:a,path:u,value:n}),e.unshift({op:"remove",path:u,value:n})}o++}))}(n,t,r,u)}},g:function(n,t,r,e){r.push({op:"replace",path:[],value:t}),e.push({op:"replace",path:[],value:n.u})}})}function C(){function n(n,t){function r(){this.constructor=n}o(n,t),n.prototype=(r.prototype=t.prototype,new r)}function r(n){n.i||(n.D=new Map,n.i=new Map(n.u))}function i(n){n.i||(n.i=new Set,n.u.forEach((function(t){if(e(t)){var r=k(n.A.h,t,n);n.l.set(t,r),n.i.add(r)}else n.i.add(t)})))}function u(n){n.O&&t(3,JSON.stringify(l(n)))}var o=function(n,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r])})(n,t)},f=function(){function t(n,t){return this[H]={t:2,p:t,A:t?t.A:m(),P:!1,R:!1,i:void 0,D:void 0,u:n,k:this,I:!1,O:!1},this}n(t,Map);var i=t.prototype;return Object.defineProperty(i,"size",{get:function(){return l(this[H]).size}}),i.has=function(n){return l(this[H]).has(n)},i.set=function(n,t){var e=this[H];return u(e),l(e).has(n)&&l(e).get(n)===t||(r(e),E(e),e.D.set(n,!0),e.i.set(n,t),e.D.set(n,!0)),this},i.delete=function(n){if(!this.has(n))return!1;var t=this[H];return u(t),r(t),E(t),t.D.set(n,!1),t.i.delete(n),!0},i.clear=function(){var n=this[H];return u(n),r(n),E(n),n.D=new Map,n.i.clear()},i.forEach=function(n,t){var r=this;l(this[H]).forEach((function(e,i){n.call(t,r.get(i),i,r)}))},i.get=function(n){var t=this[H];u(t);var i=l(t).get(n);if(t.R||!e(i))return i;if(i!==t.u.get(n))return i;var o=k(t.A.h,i,t);return r(t),t.i.set(n,o),o},i.keys=function(){return l(this[H]).keys()},i.values=function(){var n,t=this,r=this.keys();return(n={})[L]=function(){return t.values()},n.next=function(){var n=r.next();return n.done?n:{done:!1,value:t.get(n.value)}},n},i.entries=function(){var n,t=this,r=this.keys();return(n={})[L]=function(){return t.entries()},n.next=function(){var n=r.next();if(n.done)return n;var e=t.get(n.value);return{done:!1,value:[n.value,e]}},n},i[L]=function(){return this.entries()},t}(),a=function(){function t(n,t){return this[H]={t:3,p:t,A:t?t.A:m(),P:!1,R:!1,i:void 0,u:n,k:this,l:new Map,O:!1,I:!1},this}n(t,Set);var r=t.prototype;return Object.defineProperty(r,"size",{get:function(){return l(this[H]).size}}),r.has=function(n){var t=this[H];return u(t),t.i?!!t.i.has(n)||!(!t.l.has(n)||!t.i.has(t.l.get(n))):t.u.has(n)},r.add=function(n){var t=this[H];return u(t),this.has(n)||(i(t),E(t),t.i.add(n)),this},r.delete=function(n){if(!this.has(n))return!1;var t=this[H];return u(t),i(t),E(t),t.i.delete(n)||!!t.l.has(n)&&t.i.delete(t.l.get(n))},r.clear=function(){var n=this[H];return u(n),i(n),E(n),n.i.clear()},r.values=function(){var n=this[H];return u(n),i(n),n.i.values()},r.entries=function(){var n=this[H];return u(n),i(n),n.i.entries()},r.keys=function(){return this.values()},r[L]=function(){return this.values()},r.forEach=function(n,t){for(var r=this.values(),e=r.next();!e.done;)n.call(t,e.value,e.value,this),e=r.next()},t}();b("MapSet",{$:function(n,t){return new f(n,t)},C:function(n,t){return new a(n,t)}})}var I,J,N="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),W="undefined"!=typeof Map,X="undefined"!=typeof Set,q="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,B=N?Symbol("immer-nothing"):((I={})["immer-nothing"]=!0,I),G=N?Symbol("immer-draftable"):"__$immer_draftable",H=N?Symbol("immer-state"):"__$immer_state",L="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Q="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,T=Object.getOwnPropertyDescriptors||function(n){var t={};return Q(n).forEach((function(r){t[r]=Object.getOwnPropertyDescriptor(n,r)})),t},U={},V={get:function(n,t){if(t===H)return n;var r=l(n);if(!o(r,t))return function(n,t,r){if(r in t)for(var e=Object.getPrototypeOf(t);e;){var i,u=Object.getOwnPropertyDescriptor(e,r);if(u)return"value"in u?u.value:null===(i=u.get)||void 0===i?void 0:i.call(n.k);e=Object.getPrototypeOf(e)}}(n,r,t);var i=r[t];return n.R||!e(i)?i:i===z(n.u,t)?(R(n),n.i[t]=k(n.A.h,i,n)):i},has:function(n,t){return t in l(n)},ownKeys:function(n){return Reflect.ownKeys(l(n))},set:function(n,t,r){if(n.D[t]=!0,!n.P){if(c(r,z(l(n),t))&&void 0!==r)return!0;R(n),E(n)}return n.i[t]=r,!0},deleteProperty:function(n,t){return void 0!==z(n.u,t)||t in n.u?(n.D[t]=!1,R(n),E(n)):delete n.D[t],n.i&&delete n.i[t],!0},getOwnPropertyDescriptor:function(n,t){var r=l(n),e=Reflect.getOwnPropertyDescriptor(r,t);return e?{writable:!0,configurable:1!==n.t||"length"!==t,enumerable:e.enumerable,value:r[t]}:e},defineProperty:function(){t(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.u)},setPrototypeOf:function(){t(12)}},Y={};i(V,(function(n,t){Y[n]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Y.deleteProperty=function(n,t){return V.deleteProperty.call(this,n[0],t)},Y.set=function(n,t,r){return V.set.call(this,n[0],t,r,n[0])};var Z=function(){function n(n){this.S=q,this.K=!1,"boolean"==typeof(null==n?void 0:n.useProxies)&&this.setUseProxies(n.useProxies),"boolean"==typeof(null==n?void 0:n.autoFreeze)&&this.setAutoFreeze(n.autoFreeze),this.produce=this.produce.bind(this),this.produceWithPatches=this.produceWithPatches.bind(this)}var i=n.prototype;return i.produce=function(n,r,i){if("function"==typeof n&&"function"!=typeof r){var u=r;r=n;var o=this;return function(n){var t=this;void 0===n&&(n=u);for(var e=arguments.length,i=Array(e>1?e-1:0),f=1;f<e;f++)i[f-1]=arguments[f];return o.produce(n,(function(n){var e;return(e=r).call.apply(e,[t,n].concat(i))}))}}var f;if("function"!=typeof r&&t(6),void 0!==i&&"function"!=typeof i&&t(7),e(n)){var a=S(this),c=k(this,n,void 0),v=!0;try{f=r(c),v=!1}finally{v?O(a):w(a)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(a,i),P(n,a)}),(function(n){throw O(a),n})):(j(a,i),P(f,a))}if(!n||"object"!=typeof n){if((f=r(n))===B)return;return void 0===f&&(f=n),this.K&&h(f,!0),f}t(21,n)},i.produceWithPatches=function(n,t){var r,e,i=this;return"function"==typeof n?function(t){for(var r=arguments.length,e=Array(r>1?r-1:0),u=1;u<r;u++)e[u-1]=arguments[u];return i.produceWithPatches(t,(function(t){return n.apply(void 0,[t].concat(e))}))}:[this.produce(n,t,(function(n,t){r=n,e=t})),r,e]},i.createDraft=function(n){e(n)||t(8),r(n)&&(n=F(n));var i=S(this),u=k(this,n,void 0);return u[H].I=!0,w(i),u},i.finishDraft=function(n,t){var r=(n&&n[H]).A;return j(r,t),P(void 0,r)},i.setAutoFreeze=function(n){this.K=n},i.setUseProxies=function(n){n&&!q&&t(20),this.S=n},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}var u=_("Patches").W;return r(n)?u(n,t):this.produce(n,(function(n){return u(n,t.slice(e+1))}))},n}(),nn=new Z,tn=nn.produce,rn=nn.produceWithPatches.bind(nn),en=nn.setAutoFreeze.bind(nn),un=nn.setUseProxies.bind(nn),on=nn.applyPatches.bind(nn),fn=nn.createDraft.bind(nn),an=nn.finishDraft.bind(nn);n.Immer=Z,n.applyPatches=on,n.castDraft=function(n){return n},n.castImmutable=function(n){return n},n.createDraft=fn,n.current=F,n.default=tn,n.enableAllPlugins=function(){K(),C(),$()},n.enableES5=K,n.enableMapSet=C,n.enablePatches=$,n.finishDraft=an,n.immerable=G,n.isDraft=r,n.isDraftable=e,n.nothing=B,n.original=function(n){return r(n)||t(23,n),n[H].u},n.produce=tn,n.produceWithPatches=rn,n.setAutoFreeze=en,n.setUseProxies=un,Object.defineProperty(n,"__esModule",{value:!0})}));
//# sourceMappingURL=immer.umd.production.min.js.map