(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[790,179],{6071:function(e,n,t){"use strict";var r=t(3848),o=t(9448);n.default=void 0;var l=o(t(7294)),u=t(1689),a=t(2441),i=t(5749),c={};function s(e,n,t,r){if(e&&(0,u.isLocalURL)(n)){e.prefetch(n,t,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;c[n+"%"+t+(o?"%"+o:"")]=!0}}var f=function(e){var n=!1!==e.prefetch,t=(0,a.useRouter)(),o=t&&t.pathname||"/",f=l.default.useMemo((function(){var n=(0,u.resolveHref)(o,e.href,!0),t=r(n,2),l=t[0],a=t[1];return{href:l,as:e.as?(0,u.resolveHref)(o,e.as):a||l}}),[o,e.href,e.as]),d=f.href,v=f.as,h=e.children,p=e.replace,b=e.shallow,x=e.scroll,g=e.locale;"string"===typeof h&&(h=l.default.createElement("a",null,h));var m=l.Children.only(h),j=m&&"object"===typeof m&&m.ref,y=(0,i.useIntersection)({rootMargin:"200px"}),w=r(y,2),k=w[0],C=w[1],O=l.default.useCallback((function(e){k(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[j,k]);(0,l.useEffect)((function(){var e=C&&n&&(0,u.isLocalURL)(d),r="undefined"!==typeof g?g:t&&t.locale,o=c[d+"%"+v+(r?"%"+r:"")];e&&!o&&s(t,d,v,{locale:r})}),[v,d,C,g,n,t]);var M={ref:O,onClick:function(e){m.props&&"function"===typeof m.props.onClick&&m.props.onClick(e),e.defaultPrevented||function(e,n,t,r,o,l,a,i){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,u.isLocalURL)(t))&&(e.preventDefault(),null==a&&(a=r.indexOf("#")<0),n[o?"replace":"push"](t,r,{shallow:l,locale:i,scroll:a}))}(e,t,d,v,p,b,x,g)},onMouseEnter:function(e){(0,u.isLocalURL)(d)&&(m.props&&"function"===typeof m.props.onMouseEnter&&m.props.onMouseEnter(e),s(t,d,v,{priority:!0}))}};if(e.passHref||"a"===m.type&&!("href"in m.props)){var E="undefined"!==typeof g?g:t&&t.locale,D=t&&t.isLocaleDomain&&(0,u.getDomainLocale)(v,E,t&&t.locales,t&&t.domainLocales);M.href=D||(0,u.addBasePath)((0,u.addLocale)(v,E,t&&t.defaultLocale))}return l.default.cloneElement(m,M)};n.default=f},5749:function(e,n,t){"use strict";var r=t(3848);n.__esModule=!0,n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!u,i=(0,o.useRef)(),c=(0,o.useState)(!1),s=r(c,2),f=s[0],d=s[1],v=(0,o.useCallback)((function(e){i.current&&(i.current(),i.current=void 0),t||f||e&&e.tagName&&(i.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=a.get(n);if(t)return t;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return a.set(n,t={id:n,observer:o,elements:r}),t}(t),o=r.id,l=r.observer,u=r.elements;return u.set(e,n),l.observe(e),function(){u.delete(e),l.unobserve(e),0===u.size&&(l.disconnect(),a.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:n}))}),[t,n,f]);return(0,o.useEffect)((function(){if(!u&&!f){var e=(0,l.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,l.cancelIdleCallback)(e)}}}),[f]),[v,f]};var o=t(7294),l=t(8391),u="undefined"!==typeof IntersectionObserver;var a=new Map},7549:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return b}});var r=t(5893),o=t(4121),l=t(506),u=t(2974),a=t(184),i=t(8024),c=t(4706),s=t(4263),f=t(5492),d=t(7294),v=t(9933),h=t(9538),p=t(3451);function b(){(0,d.useContext)(p.G).lastUpdated;var e=(0,f._)("graphFlags",{showTooltip:!1,advancedZoom:!1}),n=(0,o.Z)(e,2),t=n[0],b=n[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.M,{}),(0,r.jsx)(i.W,{}),(0,r.jsxs)(h.Q,{children:[(0,r.jsxs)(v.z,{children:[(0,r.jsx)(c.P,{graphFlags:t}),(0,r.jsx)(l.k,{})]}),(0,r.jsx)(a.Y,{graphFlags:t,setGraphFlags:b}),(0,r.jsx)(s.I,{})]})]})}},506:function(e,n,t){"use strict";t.d(n,{k:function(){return s}});var r=t(5893),o=t(4096),l=t(4115),u=t(980),a=t(7294),i=t(9933),c=[{label:"1 Minute",value:6e4},{label:"2 Minutes",value:12e4},{label:"5 Minutes",value:3e5},{label:"10 Minutes",value:6e5},{label:"30 minutes",value:18e5},{label:"1 Hour",value:36e5},{label:"6 Hours",value:72e5},{label:"1 Day",value:864e5}],s=function(){var e=(0,a.useContext)(i.O),n=e.interval,t=e.setInterval;return(0,r.jsxs)(o.k,{flexDir:"column",children:[(0,r.jsx)(l.x,{my:1,fontWeight:"bold",as:"span",textAlign:"start",children:"Analysis Settings"}),(0,r.jsxs)(o.k,{flexDir:"row",alignItems:"center",children:[(0,r.jsx)(l.x,{mr:2,children:"Interval"}),(0,r.jsx)(u.Select,{value:n,onChange:function(e){return t(Number(e.target.value))},children:c.map((function(e){return(0,r.jsx)("option",{value:e.value,children:e.label},e.value)}))})]})]})}},184:function(e,n,t){"use strict";t.d(n,{Y:function(){return s}});var r=t(5893),o=t(6265),l=t(4096),u=t(980),a=t(4115);t(7294);function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){(0,o.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var s=function(e){var n=e.graphFlags,t=e.setGraphFlags,i=e.forecastOptions,s=void 0!==i&&i,f=function(e){t((function(n){return c(c({},n),{},(0,o.Z)({},e,!n[e]))}))};return(0,r.jsx)(l.k,{flexDir:"column",children:(0,r.jsxs)(l.k,{flexDir:"column",children:[(0,r.jsxs)(l.k,{children:[(0,r.jsx)(u.Switch,{isChecked:n.showTooltip,onChange:function(){return f("showTooltip")}}),(0,r.jsx)(a.x,{ml:2,children:"Show Details on hover"})]}),(0,r.jsxs)(l.k,{children:[(0,r.jsx)(u.Switch,{isChecked:n.advancedZoom,onChange:function(){return f("advancedZoom")}}),(0,r.jsx)(a.x,{ml:2,children:"Advanced Zoom"})]}),s&&(0,r.jsxs)(l.k,{children:[(0,r.jsx)(u.Switch,{isChecked:n.showForecast,onChange:function(){return f("showForecast")}}),(0,r.jsx)(a.x,{ml:2,children:"Show Forecast (Muni may break, as usual)"})]})]})})}},8024:function(e,n,t){"use strict";t.d(n,{W:function(){return c}});var r=t(5893),o=t(4096),l=t(6185),u=t(1664),a=t(1163),i=(t(7294),[{label:"Muniboard",url:"/"},{label:"Graph",url:"/graph"},{label:"Analyze",url:"/analyze"},{label:"Live",url:"/live"}]),c=function(){var e=(0,a.useRouter)();return(0,r.jsx)(o.k,{py:2,justifyContent:["center","start"],children:i.map((function(n){return(0,r.jsx)(l.z,{mx:2,p:2,rounded:"md",colorScheme:"blue",variant:e.pathname===n.url?"solid":"outline",fontSize:"lg",children:(0,r.jsx)(u.default,{href:n.url,children:n.label})},n.url)}))})}},4706:function(e,n,t){"use strict";t.d(n,{P:function(){return f}});var r=t(5893),o=t(4121),l=t(8017),u=t(7294),a=t(9933),i=t(5837),c=t(5277),s=t(7251),f=function(e){var n=e.tier,t=e.graphFlags,f=(0,u.useContext)(a.O).rate,d=(0,u.useContext)(i.A).event,v=(0,u.useRef)(null),h=(0,c.tH)(v),p=(0,o.Z)(h,2),b=p[0],x=p[1],g=(0,u.useMemo)((function(){return null===f||void 0===f?void 0:f[n]}),[f,n]);return(0,r.jsx)(l.xu,{ref:v,minH:"300px",w:"full",children:(0,r.jsx)(s.k,{id:"Rate",startDate:null===d||void 0===d?void 0:d.startdate,endDate:null===d||void 0===d?void 0:d.enddate,width:b,height:x,graphFlags:null!==t&&void 0!==t?t:{advancedZoom:!1,showTooltip:!1},points:g||(f?Object.values(f).flatMap((function(e){return e})):[]),isSmall:!0})})}},4263:function(e,n,t){"use strict";t.d(n,{I:function(){return c}});var r=t(5893),o=t(9999),l=t(6185),u=t(4096),a=t(7294),i=t(9538),c=function(){var e=(0,a.useContext)(i.B),n=e.displayTier,t=e.setDisplayTier,c=e.allTiers,s=(0,a.useMemo)((function(){return[{label:"Select All",tiers:c},{label:"Clear",tiers:[]},{label:"< T10",tiers:c.filter((function(e){return e<=10}))},{label:"< T20",tiers:c.filter((function(e){return e<=20}))},{label:"< T100",tiers:c.filter((function(e){return e<=100}))},{label:"> T500",tiers:c.filter((function(e){return e>=500}))}]}),[c]);return(0,r.jsxs)(u.k,{w:"full",flexWrap:"wrap",mx:"auto",children:[s.map((function(e){return(0,r.jsx)(l.z,{m:2,colorScheme:"blue",onClick:function(){return t(e.tiers)},children:e.label},e.label)})),c.sort((function(e,n){return e-n})).map((function(e){return(0,r.jsxs)(l.z,{m:2,colorScheme:null!==n&&void 0!==n&&n.includes(e)?"green":"gray",onClick:function(){return function(e){if(null!==n&&void 0!==n&&n.includes(e))return t((function(n){return n.filter((function(n){return n!==e}))}));t((function(n){return[].concat((0,o.Z)(n||[]),[e])}))}(e)},children:["T",e]},e)}))]})}},7189:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/analyze",function(){return t(7549)}])},1664:function(e,n,t){e.exports=t(6071)},1163:function(e,n,t){e.exports=t(2441)},4453:function(){}},function(e){e.O(0,[774,809,351,659,433,648,740,321,277,364,162],(function(){return n=7189,e(e.s=n);var n}));var n=e.O();_N_E=n}]);