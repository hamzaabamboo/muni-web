(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[983],{1497:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/leaderboards",function(){return t(3755)}])},3755:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return A}});var r=t(5893),o=t(8527),a=t(5117),i=t(7294),u=t(949),l=t(2684),s=t(9042),c=t(6755),d=t(8520),f=t.n(d),m=t(1845),h=t(8743),v=t(3243);function x(e,n,t,r,o,a,i){try{var u=e[a](i),l=u.value}catch(s){return void t(s)}u.done?n(l):Promise.resolve(l).then(r,o)}var b=(0,i.createContext)({}),p=function(e){var n=e.lbData,t=e.children,o=(0,i.useContext)(v.S).server,a=(0,i.useState)(),u=a[0],l=a[1],s=(0,i.useState)(),c=s[0],d=s[1],p=(0,i.useState)(),j=p[0],g=p[1],y=(0,i.useState)(2e4)[0];return(0,i.useEffect)((function(){if(!n&&u){var e,t=!1;return(e=f().mark((function e(){var n;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=15;break}return e.prev=1,e.next=4,(0,m.N)(o)(u);case 4:if(n=e.sent,!t){e.next=7;break}return e.abrupt("break",15);case 7:d(n),g(new Date);case 9:return e.prev=9,e.next=12,(0,h._)(y);case 12:return e.finish(9);case 13:e.next=0;break;case 15:case"end":return e.stop()}}),e,null,[[1,,9,13]])})),function(){var n=this,t=arguments;return new Promise((function(r,o){var a=e.apply(n,t);function i(e){x(a,r,o,i,u,"next",e)}function u(e){x(a,r,o,i,u,"throw",e)}i(void 0)}))})(),function(){t=!0}}}),[y,o,u]),(0,i.useEffect)((function(){d([])}),[o]),(0,r.jsx)(b.Provider,{value:{lbData:c,lastUpdated:j,lbConfig:u,setLbConfig:l},children:t})},j=t(9867),g=t(7852),y=t(6832),S=t(8203),w=t(1213);function k(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function O(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){k(e,n,t[n])}))}return e}var T=function(e){var n=e.isSmall,t=(e.title,e.onTierSelected),a=(0,u.If)().colorMode,d=(0,l.Gc)(),f=(0,i.useContext)(b).lbData;if(!f)return(0,r.jsx)(S.L,{});var m,h=n||"base"===d||"sm"===d,v=h&&{display:"none"};return(0,r.jsx)(o.kC,{flexDir:"column",children:(0,r.jsxs)(s.iA,{size:"sm",children:[(0,r.jsx)(s.hr,{children:(0,r.jsxs)(s.Tr,{children:[(0,r.jsx)(s.Th,{textAlign:"center",children:"Rank"}),(0,r.jsx)(s.Th,{children:"Name"}),(0,r.jsx)(s.Th,{children:"Points"}),(0,r.jsx)(s.Th,O({textAlign:"end"},v,{children:"Gap"})),(0,r.jsx)(s.Th,{children:"Last Updated"})]})}),(0,r.jsx)(s.p3,{children:f.map((function(e,n,u){var l;return(0,i.createElement)(s.Tr,O({},null!==(m=(0,g._)(e,0,void 0,a))&&void 0!==m?m:{},{key:e.rank,borderBottom:c.X.includes(e.rank)&&"2px solid",borderBottomColor:"gray.400",onClick:function(){return null===t||void 0===t?void 0:t(e.rank)},children:[(0,r.jsx)(s.Td,{textAlign:"center",children:(0,r.jsx)(w.K,{tier:e.rank,children:h?(0,j.a)(e.rank):e.rank})}),(0,r.jsxs)(s.Td,{children:[(0,r.jsx)(o.xv,{fontSize:h?"sm":"md",overflow:h?"ellipsis":"unset",children:e.name}),(0,r.jsx)(o.xv,O({fontSize:"xs"},v,{children:e.description}))]}),(0,r.jsx)(s.Td,{children:(0,r.jsx)(o.xv,{fontSize:h?"sm":"md",children:e.points})}),(0,r.jsx)(s.Td,O({isNumeric:!0},v,{children:n+1<u.length?e.points-(null===(l=u[n+1])||void 0===l?void 0:l.points):0})),(0,r.jsx)(s.Td,{children:(0,y.q)(e.date)})]}))}))})]})})},C=t(5193),I=t(465),M=t(4517),N=function(){(0,i.useContext)(v.S).server;var e=(0,i.useContext)(M.A).event,n=(0,i.useContext)(b),a=n.lbConfig,u=n.setLbConfig,l=(0,i.useState)([]),s=l[0],c=l[1],d=(0,i.useState)(),f=d[0],h=d[1],x=(0,i.useCallback)((function(){return(0,m.n)(null===e||void 0===e?void 0:e.id)}),[]),p=(0,i.useCallback)((function(){return t.e(905).then(t.t.bind(t,3905,19))}),[]);return(0,I.b)(p,h),(0,I.b)(x,c),(0,i.useEffect)((function(){a||u(s[0])}),[s]),(0,r.jsx)(o.Ug,{children:s.map((function(e){var n=f?P(f[e.leaderboardType],e.leaderboardId):"(".concat(e.leaderboardType,", ").concat(e.leaderboardId,")"),t=e.leaderboardType===(null===a||void 0===a?void 0:a.leaderboardType)&&e.leaderboardId===(null===a||void 0===a?void 0:a.leaderboardId);return(0,r.jsx)(C.zx,{variant:t?"solid":"default",onClick:function(){return u(e)},children:n},n)}))})},P=function(e,n){switch(null===e||void 0===e?void 0:e.aggregationType){case"MainAddPoint":return"Overall";default:return"".concat(e.pointTypeName).concat(0!==n?" ".concat(n):"")}},E=t(4210),z=t(9490),_=t(1163);function A(){var e=(0,i.useContext)(M.A).event;return(0,i.useEffect)((function(){e&&z.ou.fromISO(e.enddate).diffNow("seconds").seconds<0&&_.default.push("/towaland")}),[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.M,{}),(0,r.jsx)(E.W,{}),(0,r.jsx)(o.xu,{px:2,w:"full",children:(0,r.jsxs)(p,{children:[(0,r.jsx)(N,{}),(0,r.jsx)(T,{})]})})]})}},8203:function(e,n,t){"use strict";t.d(n,{L:function(){return i}});var r=t(5893),o=t(8527),a=t(9609),i=(t(7294),function(){return(0,r.jsx)(o.kC,{w:"full",alignItems:"center",justifyContent:"center",h:"full",children:(0,r.jsx)(a.$,{size:"xl"})})})},1889:function(e,n,t){"use strict";t.d(n,{T:function(){return l}});var r=t(5893),o=t(8527),a=t(3756),i=t(9490),u=t(7294),l=(0,u.memo)((function(e){var n=e.align,t=e.event,l=(0,u.useMemo)((function(){return(0,a.Gk)(t)}),[t]);return(0,r.jsxs)(o.xv,{textAlign:n||"start",children:[(0,r.jsxs)(o.xv,{as:"span",mr:2,children:[i.ou.fromISO(t.startdate).toFormat("yyyy/MM/dd  HH:mm")," -"," ",i.ou.fromISO(t.enddate).toFormat("yyyy/MM/dd HH:mm")]}),"/",(0,r.jsxs)(o.xv,{as:"span",ml:2,children:[Math.round(i.ou.fromISO(t.enddate).diff(i.ou.fromISO(t.startdate)).as("hours"))," ","hours"]})," ","/",(0,r.jsx)(o.xv,{as:"span",ml:2,children:l})]})}));l.displayName="EventDetails"},5117:function(e,n,t){"use strict";t.d(n,{M:function(){return d}});var r=t(5893),o=t(8527),a=t(4651),i=t(9490),u=t(7294),l=t(4517),s=t(8142),c=t(1889),d=function(){var e=(0,u.useContext)(l.A).event;return e?(0,r.jsx)(o.kC,{flexDirection:"column",py:2,children:(0,r.jsxs)(o.kC,{flexDirection:["column",null,"row"],justifyContent:"space-between",children:[(0,r.jsxs)(o.kC,{flexDirection:"column",order:[2,null,1],children:[(0,r.jsx)(o.xv,{fontWeight:"bold",fontSize:"3xl",textAlign:["center",null,"start"],children:e.name}),(0,r.jsx)(c.T,{align:["center",null,"start"],event:e}),i.ou.fromISO(e.enddate).diffNow().as("second")>0&&(0,r.jsx)(f,{startTime:e.startdate,rankEndTime:e.enddate,resultsTime:e.enddate})]}),(0,r.jsx)(o.xu,{h:"120",margin:["0 auto",null,"auto 0"],order:[1,null,2],children:(0,r.jsx)(a.Ee,{src:(0,s.Z)("/images/events/logo/".concat(e.eventid,".png")),maxH:"full",maxW:"full"})})]})}):null},f=function(e){var n=e.startTime,t=e.rankEndTime,a=e.resultsTime,l=(0,u.useState)("--:--"),s=l[0],c=l[1],d=(0,u.useState)(""),f=d[0],m=d[1],h=(0,u.useState)("-"),v=h[0],x=h[1],b=(0,u.useMemo)((function(){return Math.round(i.ou.fromISO(t).diff(i.ou.fromISO(n)).as("hours"))}),[n,t]);return(0,u.useEffect)((function(){var e=!1,r=function(){var r=i.ou.fromISO(n).diffNow(),o=i.ou.fromISO(t).diffNow(),u=i.ou.fromISO(a).diffNow(),l=Math.floor(i.ou.now().diff(i.ou.fromISO(n)).as("hours"));if(!e){if(r.as("hours")>0)return m("Time until start"),c(r.toFormat("hh:mm")),void x(void 0);o.as("hours")>0?(m("Time until end"),c(o.toFormat("hh:mm"))):u.as("hours")>0&&(m("Time until results"),c(u.toFormat("hh:mm"))),x("".concat(l>b?b:l," / ").concat(b," ").concat(l>b?"100":Math.round(l/b*100),"%"))}};r();setInterval(r,3e4)}),[b]),(0,r.jsxs)(o.kC,{flexDirection:"column",justifyContent:["center",null,"start"],py:4,children:[v&&(0,r.jsxs)(o.xv,{textAlign:["center",null,"start"],children:["Progress: ",v]}),(0,r.jsxs)(o.xv,{textAlign:["center",null,"start"],children:[f,":",(0,r.jsx)(o.xv,{fontSize:"lg",fontWeight:"bold",as:"span",ml:"2",children:s})]})]})}},4210:function(e,n,t){"use strict";t.d(n,{W:function(){return c}});var r=t(5893),o=t(8527),a=t(5193),i=t(1664),u=t(1163),l=(t(7294),[{label:"Leaderboard",url:"/en/"},{label:"Graph",url:"/en/graph"}]),s=[{label:"Muniboard",url:"/"},{label:"Player",url:"/player"},{label:"Graph",url:"/graph"},{label:"Analyze",url:"/analyze"},{label:"Live",url:"/live"},{label:"Other Leaderboards",url:"/leaderboards"}],c=function(e){var n=e.en,t=(0,u.useRouter)();return(0,r.jsx)(o.kC,{py:2,mb:2,justifyContent:["center","start"],flexWrap:"wrap",children:(n?l:s).map((function(e){return(0,r.jsx)(a.zx,{mx:2,p:2,rounded:"md",colorScheme:"blue",variant:t.pathname===e.url?"solid":"outline",fontSize:"lg",children:(0,r.jsx)(i.default,{href:e.url,children:e.label})},e.url)}))})}},1213:function(e,n,t){"use strict";t.d(n,{K:function(){return u}});var r=t(5893),o=t(8527),a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=(0,a.memo)((function(e){var n=e.tier,t=e.children,u=(0,a.useMemo)((function(){switch(n){case 1:return{fontSize:"xl",fontWeight:"bold",color:"yellow.400"};case 2:return{fontSize:"xl",fontWeight:"bold",color:"gray.400"};case 3:return{fontSize:"xl",fontWeight:"bold",color:"red.800"};case 10:case 50:case 100:case 500:case 1e3:case 2e3:case 5e3:case 1e4:case 2e4:case 3e4:case 5e4:return{fontSize:"xl",fontWeight:"bold"};default:return{}}}),[n]);return(0,r.jsx)(o.xv,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){i(e,n,t[n])}))}return e}({},u,{children:t||n}))}));u.displayName="Tier"},5840:function(e,n,t){"use strict";t.d(n,{y:function(){return r}});var r={Medley:[{name:"Nyoom",value:5200},{name:"Good Room",value:4700},{name:"Rooming",value:4e3}],Poker:[{name:"Manual Rate",value:1800},{name:"Rooming Rate",value:2100}],Raid:[{name:"Max",value:2200}],Bingo:[{name:"Winning",value:4800},{name:"Playing",value:3e3}]}},6755:function(e,n,t){"use strict";t.d(n,{X:function(){return r},K:function(){return o}});var r=[1,2,3,10,50,100,500,1e3,2e3,5e3,1e4,2e4,3e4,5e4],o=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,50,100,500,1e3,2e3,5e3,1e4,2e4,3e4,5e4]},9867:function(e,n,t){"use strict";t.d(n,{a:function(){return r}});var r=function(e){return e<1e3?"".concat(e):e<1e6?"".concat(Math.round(e/1e3*100)/100,"k"):"".concat(Math.round(e/1e6*100)/100,"M")}},7852:function(e,n,t){"use strict";t.d(n,{_:function(){return a},I:function(){return i}});var r=t(5840),o=t(9490),a=function(e,n,t,a,i){var u,l=void 0===i||i,s=null===(u=r.y[t])||void 0===u?void 0:u.sort((function(e,n){return n.value-e.value}));if(l&&o.ou.fromISO(e.date).diffNow().as("minutes")<-10)return{};if(s){var c;if(null===(c=n>s[0].value)||void 0===c||c)return{bg:"light"===a?"red.100":"red.800"};if(s[1]&&n>s[1].value)return{bg:"light"===a?"yellow.100":"yellow.800"}}return{bg:"light"===a?"gray.100":"gray.700"}},i=function(e){return isNaN(e)||e<0?"--:--":o.nL.fromMillis(e).toFormat("hh:mm")}},6832:function(e,n,t){"use strict";t.d(n,{q:function(){return o}});var r=t(9490),o=function(e){return r.ou.fromISO(e).diffNow().as("minute")>-3?"Just now":r.ou.now().diff(r.ou.fromISO(e)).toFormat("hh:mm")}}},function(e){e.O(0,[695,774,888,179],(function(){return n=1497,e(e.s=n);var n}));var n=e.O();_N_E=n}]);