!function(){var e={6372:function(e,t,r){"use strict";r.d(t,{ZP:function(){return w},B8:function(){return O}});var n=r(4087);function i(){}var o=.7,a=1/o,u="\\s*([+-]?\\d+)\\s*",s="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",c="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",l=/^#([0-9a-f]{3,8})$/,f=new RegExp("^rgb\\("+[u,u,u]+"\\)$"),h=new RegExp("^rgb\\("+[c,c,c]+"\\)$"),d=new RegExp("^rgba\\("+[u,u,u,s]+"\\)$"),p=new RegExp("^rgba\\("+[c,c,c,s]+"\\)$"),g=new RegExp("^hsl\\("+[s,c,c]+"\\)$"),m=new RegExp("^hsla\\("+[s,c,c,s]+"\\)$"),y={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function b(){return this.rgb().formatHex()}function v(){return this.rgb().formatRgb()}function w(e){var t,r;return e=(e+"").trim().toLowerCase(),(t=l.exec(e))?(r=t[1].length,t=parseInt(t[1],16),6===r?k(t):3===r?new x(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===r?Z(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===r?Z(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=f.exec(e))?new x(t[1],t[2],t[3],1):(t=h.exec(e))?new x(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=d.exec(e))?Z(t[1],t[2],t[3],t[4]):(t=p.exec(e))?Z(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=g.exec(e))?j(t[1],t[2]/100,t[3]/100,1):(t=m.exec(e))?j(t[1],t[2]/100,t[3]/100,t[4]):y.hasOwnProperty(e)?k(y[e]):"transparent"===e?new x(NaN,NaN,NaN,0):null}function k(e){return new x(e>>16&255,e>>8&255,255&e,1)}function Z(e,t,r,n){return n<=0&&(e=t=r=NaN),new x(e,t,r,n)}function M(e){return e instanceof i||(e=w(e)),e?new x((e=e.rgb()).r,e.g,e.b,e.opacity):new x}function O(e,t,r,n){return 1===arguments.length?M(e):new x(e,t,r,null==n?1:n)}function x(e,t,r,n){this.r=+e,this.g=+t,this.b=+r,this.opacity=+n}function N(){return"#"+E(this.r)+E(this.g)+E(this.b)}function S(){var e=this.opacity;return(1===(e=isNaN(e)?1:Math.max(0,Math.min(1,e)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===e?")":", "+e+")")}function E(e){return((e=Math.max(0,Math.min(255,Math.round(e)||0)))<16?"0":"")+e.toString(16)}function j(e,t,r,n){return n<=0?e=t=r=NaN:r<=0||r>=1?e=t=NaN:t<=0&&(e=NaN),new B(e,t,r,n)}function P(e){if(e instanceof B)return new B(e.h,e.s,e.l,e.opacity);if(e instanceof i||(e=w(e)),!e)return new B;if(e instanceof B)return e;var t=(e=e.rgb()).r/255,r=e.g/255,n=e.b/255,o=Math.min(t,r,n),a=Math.max(t,r,n),u=NaN,s=a-o,c=(a+o)/2;return s?(u=t===a?(r-n)/s+6*(r<n):r===a?(n-t)/s+2:(t-r)/s+4,s/=c<.5?a+o:2-a-o,u*=60):s=c>0&&c<1?0:u,new B(u,s,c,e.opacity)}function B(e,t,r,n){this.h=+e,this.s=+t,this.l=+r,this.opacity=+n}function D(e,t,r){return 255*(e<60?t+(r-t)*e/60:e<180?r:e<240?t+(r-t)*(240-e)/60:t)}(0,n.Z)(i,w,{copy:function(e){return Object.assign(new this.constructor,this,e)},displayable:function(){return this.rgb().displayable()},hex:b,formatHex:b,formatHsl:function(){return P(this).formatHsl()},formatRgb:v,toString:v}),(0,n.Z)(x,O,(0,n.l)(i,{brighter:function(e){return e=null==e?a:Math.pow(a,e),new x(this.r*e,this.g*e,this.b*e,this.opacity)},darker:function(e){return e=null==e?o:Math.pow(o,e),new x(this.r*e,this.g*e,this.b*e,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:N,formatHex:N,formatRgb:S,toString:S})),(0,n.Z)(B,(function(e,t,r,n){return 1===arguments.length?P(e):new B(e,t,r,null==n?1:n)}),(0,n.l)(i,{brighter:function(e){return e=null==e?a:Math.pow(a,e),new B(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?o:Math.pow(o,e),new B(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,r=this.l,n=r+(r<.5?r:1-r)*t,i=2*r-n;return new x(D(e>=240?e-240:e+120,i,n),D(e,i,n),D(e<120?e+240:e-120,i,n),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var e=this.opacity;return(1===(e=isNaN(e)?1:Math.max(0,Math.min(1,e)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===e?")":", "+e+")")}}))},5910:function(e,t,r){"use strict";r.d(t,{yi:function(){return o},ZP:function(){return a}});var n=r(5302);function i(e,t){return function(r){return e+r*t}}function o(e){return 1===(e=+e)?a:function(t,r){return r-t?function(e,t,r){return e=Math.pow(e,r),t=Math.pow(t,r)-e,r=1/r,function(n){return Math.pow(e+n*t,r)}}(t,r,e):(0,n.Z)(isNaN(t)?r:t)}}function a(e,t){var r=t-e;return r?i(e,r):(0,n.Z)(isNaN(e)?t:e)}},3933:function(e,t,r){"use strict";r.d(t,{Y1:function(){return A}});var n=r(4958),i=r(1344),o=r(6691),a=r(7827),u=r(4652),s=r(5261),c=r(8737),l=r(2978),f=r(2105),h=r(8244),d=r(8221),p=r(2322),g=r(7124),m=r(8098),y=r(9317),b=r(3912),v=r(4670),w=r(8358),k=r(1033),Z=r(9986),M=r(4010),O=r(6198),x=r(7647),N=r(5267),S=r(1242),E=r(8275),j=r(9911),P=r(1053),B=r(1261),D=r(9397),I=r(4391),J=r(5109),R=r(5362),$=r(6275),q=[null];function A(e,t){this._groups=e,this._parents=t}function T(){return new A([[document.documentElement]],q)}A.prototype=T.prototype={constructor:A,select:n.Z,selectAll:i.Z,selectChild:o.Z,selectChildren:a.Z,filter:u.Z,data:s.Z,enter:c.Z,exit:l.Z,join:f.Z,merge:h.Z,selection:function(){return this},order:d.Z,sort:p.Z,call:g.Z,nodes:m.Z,node:y.Z,size:b.Z,empty:v.Z,each:w.Z,attr:k.Z,style:Z.Z,property:M.Z,classed:O.Z,text:x.Z,html:N.Z,raise:S.Z,lower:E.Z,append:j.Z,insert:P.Z,remove:B.Z,clone:D.Z,datum:I.Z,on:J.Z,dispatch:R.Z,[Symbol.iterator]:$.Z},t.ZP=T},317:function(e,t,r){"use strict";r.d(t,{g0:function(){return i},wp:function(){return o}});var n,i,o,a,u=r(3994);a={dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},n=(0,u.Z)(a),n.format,n.parse,i=n.utcFormat,o=n.utcParse},1222:function(e,t,r){"use strict";r.d(t,{yB:function(){return n},UD:function(){return i},iM:function(){return o}});var n=6e4,i=864e5,o=6048e5},2263:function(e,t,r){"use strict";r(6067),r(337),r(8529),r(7811)},9328:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i=r(9999);var o=function(e){if("string"===typeof e.type)return e.type;switch(e.type){case 0:return"Poker";case 1:return"Bingo";case 2:return"Medley";case 3:return"Raid";default:return e.type}},a={Raid:{500:{hoursBeforeEnd:7,accleration:2e3},1e3:{hoursBeforeEnd:6,accleration:2e3},2e3:{hoursBeforeEnd:4,accleration:2e3},5e3:{hoursBeforeEnd:4,accleration:800},1e4:{hoursBeforeEnd:4,accleration:500},2e4:{hoursBeforeEnd:4,accleration:80},3e4:{hoursBeforeEnd:4,accleration:25},5e4:{hoursBeforeEnd:4,accleration:15}},Poker:{500:{hoursBeforeEnd:7,accleration:2e3},1e3:{hoursBeforeEnd:6,accleration:2e3},2e3:{hoursBeforeEnd:4,accleration:2e3},5e3:{hoursBeforeEnd:4,accleration:800},1e4:{hoursBeforeEnd:4,accleration:500},2e4:{hoursBeforeEnd:4,accleration:80},3e4:{hoursBeforeEnd:4,accleration:25},5e4:{hoursBeforeEnd:4,accleration:15}}},u=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,50,100,500,1e3,2e3,5e3,1e4,2e4,3e4,5e4];function s(e,t){let r=0;if(void 0===t)for(let n of e)(n=+n)&&(r+=n);else{let n=-1;for(let i of e)(i=+t(i,++n,e))&&(r+=i)}return r}var c=r(1616),l=r(9490),f=function(e,t,r,n){if(!r)return 0;var i=l.ou.fromISO(r.startdate),u=l.ou.fromISO(r.enddate),s=l.ou.fromJSDate(t).diff(i).as("hours"),c=o(r);if(a[c]&&e in a[c]){var f=a[c][e],h=f.hoursBeforeEnd,d=f.accleration,p=u.diff(l.ou.fromJSDate(t)).as("hours");if(p<h){var g=h-p,m=(s-g)*n;return Math.floor(m+(n+d*g)*g)}}return Math.floor(n*s)},h=r(4121),d=(r(2156),r(8823)),p=r(7622);r(810),r(2263);function g(e,t,r){this.k=e,this.x=t,this.y=r}g.prototype={constructor:g,scale:function(e){return 1===e?this:new g(this.k*e,this.x,this.y)},translate:function(e,t){return 0===e&0===t?this:new g(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};new g(1,0,0);g.prototype;var m=r(3376),y=function(e,t,r){var n=l.ou.fromJSDate(e),i=l.ou.fromJSDate(t),o=Math.ceil(n.toMillis()/r),a=Math.ceil(i.toMillis()/r);return Array(a-o).fill(null).map((function(e,t){return o+t}))},b=function(e,t){var r={};return e.forEach((function(e){t(e)in r||(r[t(e)]=[]),r[t(e)].push(e)})),r};function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=self;k.onmessage=function(e){var t=e.data,r=t.points,n=t.interval,g=t.event,v=b(r,(function(e){return e.rank})),Z=function(e){if(!(e in u))return"continue";v[Number(e)]=v[Number(e)].sort((function(e,t){return l.ou.fromISO(e.date).toSeconds()-l.ou.fromISO(t.date).toSeconds()})).map((function(e,t,r){return w(w({},e),{},{points:t>0?e.points-r[t-1].points:0})})),v[Number(e)]=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:36e5,r=Object.fromEntries(y((0,p.Z)(e,(function(e){return(0,m.Z)(e.date)})),(0,d.Z)(e,(function(e){return(0,m.Z)(e.date)})),t).map((function(e){return[e,[]]})));return e.forEach((function(e){var n=l.ou.fromISO(e.date).toMillis(),i=Math.floor(n/t);i in r||(r[i]=[]),r[i].push(e)})),Object.entries(r).map((function(e){var r=(0,h.Z)(e,2),n=r[0],i=r[1];return{date:l.ou.fromMillis(t*Number(n)).toISO(),data:i}}))}(v[Number(e)],null!==n&&void 0!==n?n:36e5).map((function(t){var n=t.date,i=t.data;return{eventid:r.find((function(e){return e.eventid})).eventid,rank:Number(e),points:s(i,(function(e){return e.points})),date:n}}))};for(var M in v)Z(M);var O=function(e,t,r){return Object.fromEntries(Object.entries(e).map((function(e){var n,i=(0,h.Z)(e,2),o=i[0],a=i[1];return[null!==(n=null===r||void 0===r?void 0:r(a,o))&&void 0!==n?n:o,t(a,o)]})))}(b(r,(function(e){return e.rank})),(function(e,t){var n=(0,c.Z)(e,(function(e){return e.points})),o=function(e,t){let r,n=-1,i=-1;if(void 0===t)for(const o of e)++i,null!=o&&(r>o||void 0===r&&o>=o)&&(r=o,n=i);else for(let o of e)null!=(o=t(o,++i,e))&&(r>o||void 0===r&&o>=o)&&(r=o,n=i);return n}(e,(function(e){return e.points})),a=l.ou.fromISO(e[n].date).diff(l.ou.fromISO(e[o].date)).as("hours"),u=e[n].points/(a>0?a:1);return[e[n]].concat((0,i.Z)(y(l.ou.fromISO(e[n].date).toJSDate(),l.ou.fromISO(g.enddate).toJSDate(),36e5).map((function(e,n){return{eventid:r.find((function(e){return e.eventid})).eventid,rank:Number(t),points:f(Number(t),l.ou.fromMillis(36e5*e).toJSDate(),g,u),date:l.ou.fromMillis(36e5*e).toISO()}}))))}));k.postMessage({rate:v,forecast:r.length>20&&o(g)in a?O:{}})}}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}},a=!0;try{e[n](o,o.exports,r),a=!1}finally{a&&delete t[n]}return o.exports}r.m=e,r.x=function(){var e=r.O(void 0,[809,740],(function(){return r(9328)}));return e=r.O(e)},function(){var e=[];r.O=function(t,n,i,o){if(!n){var a=1/0;for(c=0;c<e.length;c++){n=e[c][0],i=e[c][1],o=e[c][2];for(var u=!0,s=0;s<n.length;s++)(!1&o||a>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(u=!1,o<a&&(a=o));u&&(e.splice(c--,1),t=i())}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[n,i,o]}}(),r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))},r.u=function(e){return"static/chunks/"+(809===e?"0f1ac474":e)+"-"+{740:"e8749c1bae746933d9db",809:"faca5991ef86e1d36919"}[e]+".js"},r.h=function(){return"662b17f2c4f398859e27"},r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e+"../../"}(),function(){var e={813:1};r.f.i=function(t,n){e[t]||importScripts(r.p+r.u(t))};var t=self.webpackChunk_N_E=self.webpackChunk_N_E||[],n=t.push.bind(t);t.push=function(t){var i=t[0],o=t[1],a=t[2];for(var u in o)r.o(o,u)&&(r.m[u]=o[u]);for(a&&a(r);i.length;)e[i.pop()]=1;n(t)}}(),function(){var e=r.x;r.x=function(){return Promise.all([r.e(809),r.e(740)]).then(e)}}();var n=r.x();_N_E=n}();