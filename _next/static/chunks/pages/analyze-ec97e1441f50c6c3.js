(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[790],{1391:function(e,n,r){"use strict";r.d(n,{Ph:function(){return m}});var t=r(9762),o=r(2846),l=r(4244),a=r(5031),i=r(8554),u=r.n(i),c=r(7294);function s(){return(s=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function f(e,n){if(null==e)return{};var r,t,o={},l=Object.keys(e);for(t=0;t<l.length;t++)r=l[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}var d=["children","placeholder","className"],v=["rootProps","placeholder","icon","color","height","h","minH","minHeight","iconColor","iconSize","isFullWidth"],h=["children"],p=(0,o.Gp)((function(e,n){var r=e.children,t=e.placeholder,l=e.className,i=f(e,d);return c.createElement(o.m$.select,s({},i,{ref:n,className:(0,a.cx)("chakra-select",l)}),t&&c.createElement("option",{value:""},t),r)}));a.Ts&&(p.displayName="SelectField");var m=(0,o.Gp)((function(e,n){var r=(0,o.jC)("Select",e),i=(0,o.Lr)(e),d=i.rootProps,h=i.placeholder,m=i.icon,y=i.color,b=i.height,g=i.h,w=i.minH,j=i.minHeight,C=i.iconColor,E=i.iconSize;i.isFullWidth;var k=f(i,v),_=(0,a.Vl)(k,l.oE),S=_[0],O=_[1],M=(0,t.Yp)(O),T={width:"100%",height:"fit-content",position:"relative",color:y},A=u()({paddingEnd:"2rem"},r.field,{_focus:{zIndex:"unset"}});return c.createElement(o.m$.div,s({className:"chakra-select__wrapper",__css:T},S,d),c.createElement(p,s({ref:n,height:null!=g?g:b,minH:null!=w?w:j,placeholder:h},M,{__css:A}),e.children),c.createElement(x,s({"data-disabled":(0,a.PB)(M.disabled)},(C||y)&&{color:C||y},{__css:r.icon},E&&{fontSize:E}),m))}));a.Ts&&(m.displayName="Select");var y=function(e){return c.createElement("svg",s({viewBox:"0 0 24 24"},e),c.createElement("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}))},b=(0,o.m$)("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),x=function(e){var n=e.children,r=void 0===n?c.createElement(y,null):n,t=f(e,h),o=c.cloneElement(r,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return c.createElement(b,s({},t,{className:"chakra-select__icon-wrapper"}),c.isValidElement(r)?o:null)};a.Ts&&(x.displayName="SelectIcon")},7189:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/analyze",function(){return r(5245)}])},8418:function(e,n,r){"use strict";function t(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,l=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(u){o=!0,l=u}finally{try{t||null==i.return||i.return()}finally{if(o)throw l}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.default=void 0;var o,l=(o=r(7294))&&o.__esModule?o:{default:o},a=r(6273),i=r(387),u=r(7190);var c={};function s(e,n,r,t){if(e&&a.isLocalURL(n)){e.prefetch(n,r,t).catch((function(e){0}));var o=t&&"undefined"!==typeof t.locale?t.locale:e&&e.locale;c[n+"%"+r+(o?"%"+o:"")]=!0}}var f=function(e){var n,r=!1!==e.prefetch,o=i.useRouter(),f=l.default.useMemo((function(){var n=t(a.resolveHref(o,e.href,!0),2),r=n[0],l=n[1];return{href:r,as:e.as?a.resolveHref(o,e.as):l||r}}),[o,e.href,e.as]),d=f.href,v=f.as,h=e.children,p=e.replace,m=e.shallow,y=e.scroll,b=e.locale;"string"===typeof h&&(h=l.default.createElement("a",null,h));var x=(n=l.default.Children.only(h))&&"object"===typeof n&&n.ref,g=t(u.useIntersection({rootMargin:"200px"}),2),w=g[0],j=g[1],C=l.default.useCallback((function(e){w(e),x&&("function"===typeof x?x(e):"object"===typeof x&&(x.current=e))}),[x,w]);l.default.useEffect((function(){var e=j&&r&&a.isLocalURL(d),n="undefined"!==typeof b?b:o&&o.locale,t=c[d+"%"+v+(n?"%"+n:"")];e&&!t&&s(o,d,v,{locale:n})}),[v,d,j,b,r,o]);var E={ref:C,onClick:function(e){n.props&&"function"===typeof n.props.onClick&&n.props.onClick(e),e.defaultPrevented||function(e,n,r,t,o,l,i,u){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&a.isLocalURL(r))&&(e.preventDefault(),null==i&&t.indexOf("#")>=0&&(i=!1),n[o?"replace":"push"](r,t,{shallow:l,locale:u,scroll:i}))}(e,o,d,v,p,m,y,b)},onMouseEnter:function(e){a.isLocalURL(d)&&(n.props&&"function"===typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),s(o,d,v,{priority:!0}))}};if(e.passHref||"a"===n.type&&!("href"in n.props)){var k="undefined"!==typeof b?b:o&&o.locale,_=o&&o.isLocaleDomain&&a.getDomainLocale(v,k,o&&o.locales,o&&o.domainLocales);E.href=_||a.addBasePath(a.addLocale(v,k,o&&o.defaultLocale))}return l.default.cloneElement(n,E)};n.default=f},7190:function(e,n,r){"use strict";function t(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,l=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(u){o=!0,l=u}finally{try{t||null==i.return||i.return()}finally{if(o)throw l}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(n,"__esModule",{value:!0}),n.useIntersection=function(e){var n=e.rootMargin,r=e.disabled||!a,u=o.useRef(),c=t(o.useState(!1),2),s=c[0],f=c[1],d=o.useCallback((function(e){u.current&&(u.current(),u.current=void 0),r||s||e&&e.tagName&&(u.current=function(e,n,r){var t=function(e){var n=e.rootMargin||"",r=i.get(n);if(r)return r;var t=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=t.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;n&&r&&n(r)}))}),e);return i.set(n,r={id:n,observer:o,elements:t}),r}(r),o=t.id,l=t.observer,a=t.elements;return a.set(e,n),l.observe(e),function(){a.delete(e),l.unobserve(e),0===a.size&&(l.disconnect(),i.delete(o))}}(e,(function(e){return e&&f(e)}),{rootMargin:n}))}),[r,n,s]);return o.useEffect((function(){if(!a&&!s){var e=l.requestIdleCallback((function(){return f(!0)}));return function(){return l.cancelIdleCallback(e)}}}),[s]),[d,s]};var o=r(7294),l=r(9311),a="undefined"!==typeof IntersectionObserver;var i=new Map},5245:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return m}});var t=r(5893),o=r(9380),l=r(5117),a=r(8889),i=r(4210),u=r(3509),c=r(2787),s=r(3660),f=r(7294),d=r(8987),v=r(7477),h=r(5487);function p(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,l=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(u){o=!0,l=u}finally{try{t||null==i.return||i.return()}finally{if(o)throw l}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function m(){(0,f.useContext)(h.G).lastUpdated;var e=p((0,s._)("graphFlags",{showTooltip:!1,advancedZoom:!1}),2),n=e[0],r=e[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.M,{}),(0,t.jsx)(i.W,{}),(0,t.jsxs)(v.Q,{children:[(0,t.jsxs)(d.z,{children:[(0,t.jsx)(u.P,{graphFlags:n}),(0,t.jsx)(o.k,{})]}),(0,t.jsx)(a.Y,{graphFlags:n,setGraphFlags:r}),(0,t.jsx)(c.I,{})]})]})}},9380:function(e,n,r){"use strict";r.d(n,{k:function(){return c}});var t=r(5893),o=r(8527),l=r(1391),a=r(7294),i=r(8987),u=[{label:"1 Minute",value:6e4},{label:"2 Minutes",value:12e4},{label:"5 Minutes",value:3e5},{label:"10 Minutes",value:6e5},{label:"30 minutes",value:18e5},{label:"1 Hour",value:36e5},{label:"6 Hours",value:72e5},{label:"1 Day",value:864e5}],c=function(){var e=(0,a.useContext)(i.O),n=e.interval,r=e.setInterval;return(0,t.jsxs)(o.kC,{flexDir:"column",children:[(0,t.jsx)(o.xv,{my:1,fontWeight:"bold",as:"span",textAlign:"start",children:"Analysis Settings"}),(0,t.jsxs)(o.kC,{flexDir:"row",alignItems:"center",children:[(0,t.jsx)(o.xv,{mr:2,children:"Interval"}),(0,t.jsx)(l.Ph,{value:n,onChange:function(e){return r(Number(e.target.value))},children:u.map((function(e){return(0,t.jsx)("option",{value:e.value,children:e.label},e.value)}))})]})]})}},8889:function(e,n,r){"use strict";r.d(n,{Y:function(){return i}});var t=r(5893),o=r(8527),l=r(9033);r(7294);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}var i=function(e){var n=e.graphFlags,r=e.setGraphFlags,i=e.forecastOptions,u=void 0!==i&&i,c=function(e){r((function(n){return function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){a(e,n,r[n])}))}return e}({},n,a({},e,!n[e]))}))};return(0,t.jsx)(o.kC,{flexDir:"column",children:(0,t.jsxs)(o.kC,{flexDir:"column",children:[(0,t.jsxs)(o.kC,{children:[(0,t.jsx)(l.r,{isChecked:n.showTooltip,onChange:function(){return c("showTooltip")}}),(0,t.jsx)(o.xv,{ml:2,children:"Show Details on hover"})]}),(0,t.jsxs)(o.kC,{children:[(0,t.jsx)(l.r,{isChecked:n.advancedZoom,onChange:function(){return c("advancedZoom")}}),(0,t.jsx)(o.xv,{ml:2,children:"Advanced Zoom"})]}),u&&(0,t.jsxs)(o.kC,{children:[(0,t.jsx)(l.r,{isChecked:n.showForecast,onChange:function(){return c("showForecast")}}),(0,t.jsx)(o.xv,{ml:2,children:"Show Forecast (Muni may break, as usual)"})]})]})})}},4210:function(e,n,r){"use strict";r.d(n,{W:function(){return s}});var t=r(5893),o=r(8527),l=r(5193),a=r(1664),i=r(1163),u=(r(7294),[{label:"Leaderboard",url:"/en/"},{label:"Graph",url:"/en/graph"}]),c=[{label:"Muniboard",url:"/"},{label:"Player",url:"/player"},{label:"Graph",url:"/graph"},{label:"Analyze",url:"/analyze"},{label:"Live",url:"/live"},{label:"Other Leaderboards",url:"/leaderboards"}],s=function(e){var n=e.en,r=(0,i.useRouter)();return(0,t.jsx)(o.kC,{py:2,mb:2,justifyContent:["center","start"],flexWrap:"wrap",children:(n?u:c).map((function(e){return(0,t.jsx)(l.zx,{mx:2,p:2,rounded:"md",colorScheme:"blue",variant:r.pathname===e.url?"solid":"outline",fontSize:"lg",children:(0,t.jsx)(a.default,{href:e.url,children:e.label})},e.url)}))})}},3509:function(e,n,r){"use strict";r.d(n,{P:function(){return f}});var t=r(5893),o=r(8527),l=r(7294),a=r(8987),i=r(4517),u=r(5277),c=r(6453);function s(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,l=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(u){o=!0,l=u}finally{try{t||null==i.return||i.return()}finally{if(o)throw l}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var f=function(e){var n=e.tier,r=e.graphFlags,f=(0,l.useContext)(a.O).rate,d=(0,l.useContext)(i.A).event,v=(0,l.useRef)(null),h=s((0,u.tH)(v),2),p=h[0],m=h[1],y=(0,l.useMemo)((function(){return null===f||void 0===f?void 0:f[n]}),[f,n]);return(0,t.jsx)(o.xu,{ref:v,minH:"300px",w:"full",children:(0,t.jsx)(c.k,{id:"Rate",startDate:null===d||void 0===d?void 0:d.startdate,endDate:null===d||void 0===d?void 0:d.enddate,width:p,height:m,graphFlags:null!==r&&void 0!==r?r:{advancedZoom:!1,showTooltip:!1},points:y||(f?Object.values(f).flatMap((function(e){return e})):[]),isSmall:!0})})}},2787:function(e,n,r){"use strict";r.d(n,{I:function(){return c}});var t=r(5893),o=r(5193),l=r(8527),a=r(7294),i=r(7477);function u(e){return function(e){if(Array.isArray(e)){for(var n=0,r=new Array(e.length);n<e.length;n++)r[n]=e[n];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var c=function(){var e=(0,a.useContext)(i.B),n=e.displayTier,r=e.setDisplayTier,c=e.allTiers,s=(0,a.useMemo)((function(){return[{label:"Select All",tiers:c},{label:"Clear",tiers:[]},{label:"< T10",tiers:c.filter((function(e){return e<=10}))},{label:"< T20",tiers:c.filter((function(e){return e<=20}))},{label:"< T100",tiers:c.filter((function(e){return e<=100}))},{label:"> T500",tiers:c.filter((function(e){return e>=500}))}]}),[c]);return(0,t.jsxs)(l.kC,{w:"full",flexWrap:"wrap",mx:"auto",children:[s.map((function(e){return(0,t.jsx)(o.zx,{m:2,colorScheme:"blue",onClick:function(){return r(e.tiers)},children:e.label},e.label)})),c.sort((function(e,n){return e-n})).map((function(e){return(0,t.jsxs)(o.zx,{m:2,colorScheme:(null===n||void 0===n?void 0:n.includes(e))?"green":"gray",onClick:function(){return function(e){if(null===n||void 0===n?void 0:n.includes(e))return r((function(n){return n.filter((function(n){return n!==e}))}));r((function(n){return u(n||[]).concat([e])}))}(e)},children:["T",e]},e)}))]})}},8987:function(e,n,r){"use strict";r.d(n,{O:function(){return s},z:function(){return f}});var t=r(5893),o=r(7294),l=r(5277),a=r(4517),i=r(3688),u=r(7477);function c(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,l=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(u){o=!0,l=u}finally{try{t||null==i.return||i.return()}finally{if(o)throw l}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=(0,o.createContext)({}),f=function(e){var n=e.children,f=e.all,d=(0,o.useContext)(i.V).points,v=(0,o.useContext)(u.B).points,h=(0,o.useContext)(a.A).event,p=(0,o.useRef)(),m=(0,o.useState)(),y=m[0],b=m[1],x=(0,o.useState)(),g=x[0],w=x[1],j=c((0,l._)("groupInterval",36e5),2),C=j[0],E=j[1],k=(0,o.useMemo)((function(){return(f?d:v||d)||[]}),[d,v]),_=function(e){var n=e.data,r=n.rate,t=n.forecast;b(r),w(t)};return(0,o.useEffect)((function(){return p.current=new Worker(new URL(r.p+r.u(951),r.b),{type:void 0}),p.current.postMessage({points:k,interval:C,event:h}),p.current.onmessage=_,function(){return p.current.removeEventListener("message",_),p.current.terminate()}}),[k,C]),(0,t.jsx)(s.Provider,{value:{rate:y,forecast:g,interval:C,setInterval:E},children:n})}},1664:function(e,n,r){e.exports=r(8418)},1163:function(e,n,r){e.exports=r(387)}},function(e){e.O(0,[484,653,205,696,774,888,179],(function(){return n=7189,e(e.s=n);var n}));var n=e.O();_N_E=n}]);