(this["webpackJsonplol-champ-skins"]=this["webpackJsonplol-champ-skins"]||[]).push([[0],{23:function(e,n,t){},28:function(e,n,t){},29:function(e,n,t){"use strict";t.r(n);var c=t(1),i=t.n(c),r=t(15),s=t.n(r),a=(t(23),t(6)),o=t(2),j=t(4),u=t(14),l=t.n(u),d=t(8),b=t(5),h=t(16),O=[],f=[],m={},p="",x="https://raw.communitydragon.org/pbe",v="".concat(x,"/plugins/rcp-be-lol-game-data/global/default"),k=Object(h.a)(l.a.mark((function e(){var n,t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(x,"/content-metadata.json"),{method:"GET",cache:"no-cache"}).then((function(e){return e.json()}));case 2:return n=e.sent,p=n.version,t="?".concat(encodeURIComponent(n.version)),e.next=7,Promise.all([fetch("".concat(v,"/v1/champion-summary.json").concat(t)).then((function(e){return e.json()})).then((function(e){return e.filter((function(e){return-1!==e.id})).sort((function(e,n){return e.name>n.name?1:-1})).map((function(e){return Object(b.a)(Object(b.a)({},e),{},{key:e.alias.toLowerCase()})}))})).then((function(e){return O.push.apply(O,Object(d.a)(e))})),fetch("".concat(v,"/v1/skinlines.json").concat(t)).then((function(e){return e.json()})).then((function(e){return e.filter((function(e){return 0!==e.id})).sort((function(e,n){return e.name>n.name?1:-1}))})).then((function(e){return f.push.apply(f,Object(d.a)(e))})),fetch("".concat(v,"/v1/skins.json").concat(t)).then((function(e){return e.json()})).then((function(e){return Object.assign(m,e)}))]).then((function(){return!0}));case 7:return e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})))();function y(e){return[Math.floor(e/1e3),e%1e3]}function g(e){return Object.values(m).filter((function(n){return y(n.id)[0]===e}))}function I(e){return Object.values(m).filter((function(n){var t;return null===(t=n.skinLines)||void 0===t?void 0:t.some((function(n){return n.id===e}))})).sort((function(e,n){var t=y(e.id)[0],c=y(n.id)[0];return O.findIndex((function(e){return e.id===t}))-O.findIndex((function(e){return e.id===c}))}))}function w(e){return e.replace("/lol-game-data/assets",v).toLowerCase()}var S={kUltimate:["ultimate.png","Ultimate"],kMythic:["mythic.png","Mythic"],kLegendary:["legendary.png","Legendary"],kEpic:["epic.png","Epic"]};function E(e){if(!S[e.rarity])return null;var n=Object(j.a)(S[e.rarity],2),t=n[0],c=n[1];return["".concat(v,"/v1/rarity-gem-icons/").concat(t),c]}function N(e){var n=y(e.id),t=Object(j.a)(n,2),c=t[0],i=t[1],r=O.find((function(e){return e.id===c})).key;return"https://teemo.gg/model-viewer?game=league-of-legends&type=champions&object=".concat(r,"&skinid=").concat(r,"-").concat(i)}var L=t(0);function $(){return Object(L.jsxs)("footer",{children:[Object(L.jsxs)("div",{children:["In-game data provided by"," ",Object(L.jsx)("a",{href:"https://communitydragon.org/",rel:"noreferrer",target:"_blank",children:"CommunityDragon"}),". Skin Explorer isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc."]}),Object(L.jsxs)("div",{children:[Object(L.jsxs)("div",{children:["Patch ",p]}),Object(L.jsxs)("div",{children:["Built by"," ",Object(L.jsx)("a",{href:"https://github.com/preyneyv",target:"_blank",rel:"noreferrer",children:"@preyneyv"}),"."," ",Object(L.jsx)("a",{href:"https://github.com/preyneyv/lol-skin-explorer",target:"_blank",rel:"noreferrer",children:"View Source on GitHub"})]})]})]})}function C(e){var n=e.children;return Object(L.jsx)("div",{className:"footer-container",children:n})}var P,M=t(17),T=t(12),_=t.n(T);function D(){var e=Object(c.useRef)(),n=Object(o.g)(),t=Object(c.useState)(""),i=Object(j.a)(t,2),r=i[0],s=i[1],a=Object(c.useState)(0),u=Object(j.a)(a,2),l=u[0],d=u[1],b=Object(c.useState)(!1),h=Object(j.a)(b,2),f=h[0],m=h[1],p=Object(c.useMemo)((function(){return r.length?P.search(r,{limit:5}):[]}),[r]);function x(){var e=p[l];console.log(e),function(e,t){if("champion"===e&&n(Object(o.d)("/champions/:champion",{champion:t.key})),"skinline"===e&&n(Object(o.d)("/skinlines/:id",{id:t.id})),"skin"===e){var c=y(t.id)[0],i=O.find((function(e){return e.id===c}));n(Object(o.d)("/champions/:cKey/skins/:sId",{cKey:i.key,sId:t.id}))}}(e.item.$$type,e.item),s("")}return Object(c.useEffect)((function(){return d(0)}),[r]),Object(c.useEffect)((function(){function n(n){var t;"Slash"===n.code&&n.altKey&&(null===(t=e.current)||void 0===t||t.focus(),n.preventDefault())}return document.addEventListener("keydown",n),function(){return document.removeEventListener("keydown",n)}})),Object(L.jsxs)("div",{className:"search-container",children:[Object(L.jsx)("input",{ref:e,type:"search",placeholder:"Search (Alt + /)",value:r,onChange:function(e){return s(e.target.value)},onFocus:function(){return m(!0)},onBlur:function(){return m(!1)},onKeyDown:function(e){"ArrowDown"===e.key&&(d((l+1)%p.length),e.preventDefault()),"ArrowUp"===e.key&&(d((0===l?p.length:l)-1),e.preventDefault()),"Enter"===e.key&&p.length&&(x(),e.preventDefault(),e.target.blur())}}),f&&0!==p.length&&Object(L.jsx)("ul",{children:p.map((function(e,n){var t=e.item;return Object(L.jsxs)("li",{onMouseEnter:function(){return d(n)},onMouseDown:x,className:_()(t.$$type,{selected:l===n}),children:["champion"===t.$$type?Object(L.jsx)("img",{src:w(t.squarePortraitPath),alt:t.name}):"skin"===t.$$type?Object(L.jsx)("img",{src:w(t.tilePath),alt:t.name}):null,Object(L.jsxs)("div",{children:[Object(L.jsx)("div",{children:t.name}),"champion"===t.$$type?Object(L.jsx)("span",{children:"Champion"}):"skinline"===t.$$type?Object(L.jsx)("span",{children:"Skinline"}):Object(L.jsx)("span",{children:"Skin"})]})]},n)}))})]})}k.then((function(){return P=new M.a(O.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{$$type:"champion"})})).concat(f.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{$$type:"skinline"})}))).concat(Object.values(m).map((function(e){return Object(b.a)(Object(b.a)({},e),{},{$$type:"skin"})}))),{keys:["name"]})}));var G=t(30),R=t(31),K=t(32),A=t(33),B=t(34),J=t(35),U=t(36),V=t(37);function H(e){return window.location.hash=e,null}function q(e){Object(c.useEffect)((function(){var n=document.title;return document.title="".concat(e," \xb7 Skin Explorer"),function(){document.title=n}}),[e])}function F(e){var n=Object(o.g)();Object(c.useEffect)((function(){function t(t){"Escape"===t.code&&(n(e),t.preventDefault())}return document.addEventListener("keydown",t),function(){return document.removeEventListener("keydown",t)}}),[n,e])}function Z(e,n){var t=Object(c.useState)(localStorage[e]?JSON.parse(localStorage[e]):n),i=Object(j.a)(t,2),r=i[0],s=i[1];return[r,function(n){s(n),localStorage[e]=JSON.stringify(n)}]}function z(e){var n,t=e.back,i=e.skins,r=e.current,s=e.title,u=e.linkTo,l=e.showSkinline,d=e.showChampion,b=Object(c.useState)(""),h=Object(j.a)(b,2),m=h[0],p=h[1],x=Object(c.useState)(!1),v=Object(j.a)(x,2),k=v[0],g=v[1],I=Z("carousel__centered",!1),S=Object(j.a)(I,2),$=S[0],C=S[1],P=Z("carousel__fill",!1),M=Object(j.a)(P,2),T=M[0],D=M[1];Object(c.useEffect)((function(){g(!1)}),[r,$]);var H,z,Q=Object(o.g)(),W=i.findIndex((function(e){return e.id===r})),X=i[W];i.length>1&&(z=i[(0===W?i.length:W)-1],H=i[(W+1)%i.length]),q(X.name),F(t);var Y=E(X),ee=y(r)[0],ne=O.find((function(e){return e.id===ee})),te=(null===(n=X.skinLines)||void 0===n?void 0:n.length)?X.skinLines.map((function(e){return f.find((function(n){return n.id===e.id}))})):[];Object(c.useEffect)((function(){function e(e){i.length>1&&("ArrowLeft"===e.key&&Q(u(z)),"ArrowRight"===e.key&&Q(u(H))),"KeyZ"===e.code&&D(!T),"KeyC"===e.code&&C(!$)}return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}}),[i,z,H,u,Q,T,D,$,C]);var ce=$?X.splashVideoPath:X.collectionSplashVideoPath,ie=$?X.splashPath:X.uncenteredSplashPath;return Object(L.jsxs)("div",{className:"skin-carousel",children:[!k&&Object(L.jsx)("div",{className:"preloader",children:Object(L.jsxs)("div",{children:[Object(L.jsx)("div",{}),Object(L.jsx)("div",{}),Object(L.jsx)("div",{})]})}),Object(L.jsxs)("header",{children:[Object(L.jsxs)(a.b,{to:t,children:[Object(L.jsx)(G.a,{}),Object(L.jsx)("span",{children:s})]}),Object(L.jsx)("div",{className:"btn",onClick:function(){return D(!T)},title:"Fill Screen (Z)",children:T?Object(L.jsx)(R.a,{}):Object(L.jsx)(K.a,{})}),Object(L.jsx)("div",{className:"btn",onClick:function(){return C(!$)},title:"Centered (C)",children:$?Object(L.jsx)(A.a,{}):Object(L.jsx)(B.a,{})})]}),Object(L.jsx)("div",{className:"mouse-event-block"}),z&&Object(L.jsxs)(a.b,{to:u(z),className:"prev",onMouseOver:function(){return p("prev")},onMouseOut:function(){return p("")},children:[Object(L.jsx)("img",{src:w(z.splashPath),alt:z.name}),Object(L.jsx)("div",{children:z.name}),Object(L.jsx)(G.a,{})]}),Object(L.jsx)("div",{className:_()("current",{"hover-prev":"prev"===m,"hover-next":"next"===m,fill:T}),children:ce?Object(L.jsx)("video",{muted:!0,autoPlay:!0,loop:!0,src:w(ce)}):Object(L.jsx)("img",{onLoad:function(){return g(!0)},className:_()({loading:!k}),src:w(ie),alt:X.name})}),Object(L.jsxs)("div",{className:"overlay",children:[Object(L.jsx)("span",{children:X.name}),Object(L.jsx)(J.a,{}),Object(L.jsxs)("div",{children:[Object(L.jsxs)("div",{className:"header",children:[Y&&Object(L.jsxs)("div",{className:"rarity",children:[Object(L.jsx)("img",{src:Y[0],alt:Y[1]}),Object(L.jsx)("span",{children:Y[1]})]}),d&&Object(L.jsx)(a.b,{to:Object(o.d)("/champions/:key",{key:ne.key}),children:ne.name}),l&&0!==te.length&&te.map((function(e){return Object(L.jsx)(a.b,{to:Object(o.d)("/skinlines/:id",{id:e.id}),children:e.name},e.id)}))]}),X.description?Object(L.jsx)("p",{dangerouslySetInnerHTML:{__html:X.description}}):Object(L.jsx)("p",{children:Object(L.jsx)("i",{children:"No description available."})}),Object(L.jsxs)("a",{href:N(X),rel:"noreferrer",target:"_blank",children:["View Model on Teemo.GG ",Object(L.jsx)(U.a,{size:12})]})]})]}),H&&Object(L.jsxs)(a.b,{to:u(H),className:"next",onMouseOver:function(){return p("next")},onMouseOut:function(){return p("")},children:[Object(L.jsx)("img",{src:w(H.splashPath),alt:H.name}),Object(L.jsx)("div",{children:H.name}),Object(L.jsx)(V.a,{})]})]})}function Q(e){var n=e.title,t=e.skins,c=e.linkTo;return Object(L.jsxs)(C,{children:[Object(L.jsxs)("div",{className:"skin-list",children:[Object(L.jsxs)("header",{children:[Object(L.jsxs)(a.b,{to:"/",children:[Object(L.jsx)(G.a,{}),Object(L.jsx)("span",{children:"Home"})]}),Object(L.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(L.jsx)("h1",{children:n}),Object(L.jsx)(D,{})]})]}),Object(L.jsx)("div",{children:t.map((function(e){var n=E(e);return Object(L.jsxs)(a.b,{to:c(e),children:[Object(L.jsx)("img",{src:w(e.tilePath),alt:e.name}),Object(L.jsxs)("div",{children:[n&&Object(L.jsx)("img",{src:n[0],title:n[1],alt:n[1]}),e.name]})]},e.id)}))})]}),Object(L.jsx)($,{})]})}function W(){return Object(L.jsx)("div",{className:"champions-index",children:O.map((function(e){return Object(L.jsxs)(a.b,{title:e.name,to:Object(o.d)("/champions/:champion",{champion:e.key}),children:[Object(L.jsx)("img",{src:w(e.squarePortraitPath),alt:e.name}),Object(L.jsx)("div",{children:e.name})]},e.id)}))})}function X(){var e,n,t=Object(o.h)().champion;if(q(null===(e=n=O.find((function(e){return e.key===t})))||void 0===e?void 0:e.name),F("/"),!n)return H("/");var c=g(n.id);return Object(L.jsx)(Q,{title:n.name,skins:c,linkTo:function(e){return Object(o.d)("/champions/:champion/skins/:skinId",{champion:t,skinId:e.id})}})}function Y(){var e,n=Object(o.h)(),t=n.champion,c=n.skinId;try{if(!(e=O.find((function(e){return e.key===t}))))throw new Error("Bad champion")}catch(r){return H("/")}var i=g(e.id);return i.find((function(e){return e.id===parseInt(c)}))?Object(L.jsx)(z,{back:Object(o.d)("/champions/:champion",{champion:t}),title:e.name,skins:i,current:parseInt(c),linkTo:function(e){return Object(o.d)("/champions/:champion/skins/:skinId",{champion:t,skinId:e.id})},showSkinline:!0}):H(Object(o.d)("/champions/:champion",{champion:t}))}function ee(){return Object(L.jsx)("div",{className:"skinlines-index",children:f.map((function(e){return Object(L.jsx)(a.b,{to:Object(o.d)("/skinlines/:lineId",{lineId:e.id}),children:e.name},e.id)}))})}function ne(){var e,n,t=Object(o.h)().lineId;F("/");var c=parseInt(t);if(q(null===(e=n=f.find((function(e){return e.id===c})))||void 0===e?void 0:e.name),!n)return H("/");var i=I(n.id);return Object(L.jsx)(Q,{title:n.name,skins:i,linkTo:function(e){return Object(o.d)("/skinlines/:lineId/skins/:skinId",{lineId:t,skinId:e.id})}})}function te(){var e,n=Object(o.h)(),t=n.lineId,c=n.skinId;try{var i=parseInt(t);if(!(e=f.find((function(e){return e.id===i}))))throw new Error("Bad skinline id")}catch(s){return H("/")}var r=I(e.id);return r.find((function(e){return e.id===parseInt(c)}))?Object(L.jsx)(z,{back:Object(o.d)("/skinlines/:lineId",{lineId:t}),title:e.name,skins:r,current:parseInt(c),linkTo:function(e){return Object(o.d)("/skinlines/:lineId/skins/:skinId",{lineId:t,skinId:e.id})},showChampion:!0}):H(Object(o.d)("/skinlines/:lineId",{lineId:t}))}function ce(){return Object(L.jsxs)(C,{children:[Object(L.jsxs)("div",{className:"home",children:[Object(L.jsxs)("header",{children:[Object(L.jsx)("h1",{children:"Skin Explorer"}),Object(L.jsx)(D,{})]}),Object(L.jsx)("h2",{children:"Champions"}),Object(L.jsx)(W,{}),Object(L.jsx)("hr",{}),Object(L.jsx)("h2",{children:"Skinlines"}),Object(L.jsx)(ee,{})]}),Object(L.jsx)($,{})]})}function ie(){var e=Object(o.f)();return Object(c.useEffect)((function(){document.body.scrollTop=document.documentElement.scrollTop=0}),[e]),null}t(28);var re=function(){var e=function(e){var n=Object(c.useState)(null),t=Object(j.a)(n,2),i=t[0],r=t[1];return Object(c.useEffect)((function(){e.then((function(e){return r(e)}))})),i}(k);return Object(L.jsxs)(a.a,{children:[Object(L.jsx)(ie,{}),e?Object(L.jsxs)(o.c,{children:[Object(L.jsx)(o.a,{path:"/",element:Object(L.jsx)(ce,{})}),Object(L.jsx)(o.a,{path:"/champions/:champion",element:Object(L.jsx)(X,{})}),Object(L.jsx)(o.a,{path:"/champions/:champion/skins/:skinId",element:Object(L.jsx)(Y,{})}),Object(L.jsx)(o.a,{path:"/skinlines/:lineId",element:Object(L.jsx)(ne,{})}),Object(L.jsx)(o.a,{path:"/skinlines/:lineId/skins/:skinId",element:Object(L.jsx)(te,{})})]}):Object(L.jsx)("div",{className:"preloader",children:Object(L.jsxs)("div",{children:[Object(L.jsx)("div",{}),Object(L.jsx)("div",{}),Object(L.jsx)("div",{})]})})]})};s.a.render(Object(L.jsx)(i.a.StrictMode,{children:Object(L.jsx)(re,{})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.461a78b9.chunk.js.map