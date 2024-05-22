import{$ as C,a0 as k,a1 as b,a2 as p,a3 as j,a4 as F,r as x,a5 as I,a6 as J,a7 as O,a8 as D,a9 as M,aa as v,ab as U,j as c,n as Q,Y as X}from"./index-d6e7f966.js";import{u as z,r as q,a as Y}from"./resolve-element-9f971ef1.js";import{S as Z}from"./setionHeader-64f64551.js";const G=e=>typeof e=="object"&&e.mix,$=e=>G(e)?e.mix:void 0;function _(...e){const t=!Array.isArray(e[0]),n=t?0:-1,s=e[0+n],o=e[1+n],r=e[2+n],i=e[3+n],l=C(o,r,{mixer:$(r[0]),...i});return t?l(s):l}function K(e,t){const n=z(t()),s=()=>n.set(t());return s(),k(()=>{const o=()=>p.update(s,!1,!0),r=e.map(i=>i.on("change",o));return()=>{r.forEach(i=>i()),b(s)}}),n}function ee(e){j.current=[],e();const t=K(j.current,e);return j.current=void 0,t}function S(e,t,n,s){if(typeof e=="function")return ee(e);const o=typeof t=="function"?t:_(t,n,s);return Array.isArray(e)?B(e,o):B([e],([r])=>o(r))}function B(e,t){const n=F(()=>[]);return K(e,()=>{n.length=0;const s=e.length;for(let o=0;o<s;o++)n[o]=e[o].get();return t(n)})}function te(e,t,n){x.useInsertionEffect(()=>e.on(t,n),[e,t,n])}function se(e){const t=z(e.getVelocity());return te(e,"velocityChange",n=>{t.set(n)}),t}const w=new WeakMap;let A;function ne(e,t){if(t){const{inlineSize:n,blockSize:s}=t[0];return{width:n,height:s}}else return e instanceof SVGElement&&"getBBox"in e?e.getBBox():{width:e.offsetWidth,height:e.offsetHeight}}function oe({target:e,contentRect:t,borderBoxSize:n}){var s;(s=w.get(e))===null||s===void 0||s.forEach(o=>{o({target:e,contentSize:t,get size(){return ne(e,n)}})})}function re(e){e.forEach(oe)}function ce(){typeof ResizeObserver>"u"||(A=new ResizeObserver(re))}function ie(e,t){A||ce();const n=q(e);return n.forEach(s=>{let o=w.get(s);o||(o=new Set,w.set(s,o)),o.add(t),A==null||A.observe(s)}),()=>{n.forEach(s=>{const o=w.get(s);o==null||o.delete(t),o!=null&&o.size||A==null||A.unobserve(s)})}}const E=new Set;let m;function le(){m=()=>{const e={width:window.innerWidth,height:window.innerHeight},t={target:window,size:e,contentSize:e};E.forEach(n=>n(t))},window.addEventListener("resize",m)}function ae(e){return E.add(e),m||le(),()=>{E.delete(e),!E.size&&m&&(m=void 0)}}function ue(e,t){return typeof e=="function"?ae(e):ie(e,t)}const fe=50,R=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),de=()=>({time:0,x:R(),y:R()}),Ae={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function T(e,t,n,s){const o=n[t],{length:r,position:i}=Ae[t],l=o.current,a=n.time;o.current=e["scroll"+i],o.scrollLength=e["scroll"+r]-e["client"+r],o.offset.length=0,o.offset[0]=0,o.offset[1]=o.scrollLength,o.progress=I(0,o.scrollLength,o.current);const u=s-a;o.velocity=u>fe?0:J(o.current-l,u)}function ge(e,t,n){T(e,"x",t,n),T(e,"y",t,n),t.time=n}function pe(e,t){const n={x:0,y:0};let s=e;for(;s&&s!==t;)if(s instanceof HTMLElement)n.x+=s.offsetLeft,n.y+=s.offsetTop,s=s.offsetParent;else if(s.tagName==="svg"){const o=s.getBoundingClientRect();s=s.parentElement;const r=s.getBoundingClientRect();n.x+=o.left-r.left,n.y+=o.top-r.top}else if(s instanceof SVGGraphicsElement){const{x:o,y:r}=s.getBBox();n.x+=o,n.y+=r;let i=null,l=s.parentNode;for(;!i;)l.tagName==="svg"&&(i=l),l=s.parentNode;s=i}else break;return n}const xe={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},P={start:0,center:.5,end:1};function W(e,t,n=0){let s=0;if(P[e]!==void 0&&(e=P[e]),typeof e=="string"){const o=parseFloat(e);e.endsWith("px")?s=o:e.endsWith("%")?e=o/100:e.endsWith("vw")?s=o/100*document.documentElement.clientWidth:e.endsWith("vh")?s=o/100*document.documentElement.clientHeight:e=o}return typeof e=="number"&&(s=t*e),n+s}const he=[0,0];function me(e,t,n,s){let o=Array.isArray(e)?e:he,r=0,i=0;return typeof e=="number"?o=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?o=e.split(" "):o=[e,P[e]?e:"0"]),r=W(o[0],n,s),i=W(o[1],t),r-i}const ve={x:0,y:0};function we(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function Ee(e,t,n){let{offset:s=xe.All}=n;const{target:o=e,axis:r="y"}=n,i=r==="y"?"height":"width",l=o!==e?pe(o,e):ve,a=o===e?{width:e.scrollWidth,height:e.scrollHeight}:we(o),u={width:e.clientWidth,height:e.clientHeight};t[r].offset.length=0;let d=!t[r].interpolate;const g=s.length;for(let f=0;f<g;f++){const L=me(s[f],u[i],a[i],l[r]);!d&&L!==t[r].interpolatorOffsets[f]&&(d=!0),t[r].offset[f]=L}d&&(t[r].interpolate=C(t[r].offset,O(s)),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=t[r].interpolate(t[r].current)}function je(e,t=e,n){if(n.x.targetOffset=0,n.y.targetOffset=0,t!==e){let s=t;for(;s&&s!==e;)n.x.targetOffset+=s.offsetLeft,n.y.targetOffset+=s.offsetTop,s=s.offsetParent}n.x.targetLength=t===e?t.scrollWidth:t.clientWidth,n.y.targetLength=t===e?t.scrollHeight:t.clientHeight,n.x.containerLength=e.clientWidth,n.y.containerLength=e.clientHeight}function ye(e,t,n,s={}){return{measure:()=>je(e,s.target,n),update:o=>{ge(e,n,o),(s.offset||s.target)&&Ee(e,n,s)},notify:()=>t(n)}}const h=new WeakMap,N=new WeakMap,y=new WeakMap,H=e=>e===document.documentElement?window:e;function Pe(e,{container:t=document.documentElement,...n}={}){let s=y.get(t);s||(s=new Set,y.set(t,s));const o=de(),r=ye(t,e,o,n);if(s.add(r),!h.has(t)){const l=()=>{for(const f of s)f.measure()},a=()=>{for(const f of s)f.update(D.timestamp)},u=()=>{for(const f of s)f.notify()},d=()=>{p.read(l,!1,!0),p.update(a,!1,!0),p.update(u,!1,!0)};h.set(t,d);const g=H(t);window.addEventListener("resize",d,{passive:!0}),t!==document.documentElement&&N.set(t,ue(t,d)),g.addEventListener("scroll",d,{passive:!0})}const i=h.get(t);return p.read(i,!1,!0),()=>{var l;b(i);const a=y.get(t);if(!a||(a.delete(r),a.size))return;const u=h.get(t);h.delete(t),u&&(H(t).removeEventListener("scroll",u),(l=N.get(t))===null||l===void 0||l(),window.removeEventListener("resize",u))}}function V(e,t){M(!!(!t||t.current))}const be=()=>({scrollX:v(0),scrollY:v(0),scrollXProgress:v(0),scrollYProgress:v(0)});function ze({container:e,target:t,layoutEffect:n=!0,...s}={}){const o=F(be);return(n?k:x.useEffect)(()=>(V("target",t),V("container",e),Pe(({x:i,y:l})=>{o.scrollX.set(i.current),o.scrollXProgress.set(i.progress),o.scrollY.set(l.current),o.scrollYProgress.set(l.progress)},{...s,container:(e==null?void 0:e.current)||void 0,target:(t==null?void 0:t.current)||void 0})),[e,t,JSON.stringify(s.offset)]),o}function Le(e){const t=x.useRef(0),{isStatic:n}=x.useContext(U);x.useEffect(()=>{if(n)return;const s=({timestamp:o,delta:r})=>{t.current||(t.current=o),e(o-t.current,r)};return p.update(s,!0),()=>b(s)},[e])}const Se=(e,t,n)=>{const s=t-e;return((n-e)%s+s)%s+e},Be="/static/assets/confenalco-e8e62526.jpg",Re="/static/assets/saludtotal-5c199011.png",Te="/static/assets/negratin 1 posicion-eeef6f02.svg",We="/static/assets/VARIANZ EMPRESA CLIENTE 8-11dc12f0.png",Ne="/static/assets/renergetica empresa 5-75b0900d.png",He="data:image/jpeg;base64,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",Ve="/static/assets/AQUIS 3-d82707a9.png",Ce="/static/assets/download 9-d45675d8.png",ke="/static/assets/occidente-9690f26d.png",Fe="/static/assets/power 9-7a48b14d.png",Ke="/static/assets/ventus 2-847e09aa.png",Ie="/static/assets/tpf 4-e97ce184.png";function Je({children:e,baseVelocity:t=100}){const n=z(0),{scrollY:s}=ze(),o=se(s),r=Y(o,{damping:50,stiffness:400}),i=S(r,[0,1e3],[0,5],{clamp:!1}),l=S(n,u=>`${Se(-20,-45,u)}%`),a=x.useRef(1);return Le((u,d)=>{let g=a.current*t*(d/2e3);i.get()<0?a.current=-1:i.get()>0&&(a.current=1),g+=a.current*g*i.get(),n.set(n.get()+g)}),c.jsx("div",{className:"parallax",children:c.jsxs(Q.div,{className:"scroller",style:{x:l},children:[c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]}),c.jsxs("span",{children:[e," "]})]})})}function Oe(){return c.jsx("section",{children:c.jsxs(Je,{baseVelocity:-2,children:[c.jsx("img",{src:Te,alt:"confenalco",className:"logos"}),c.jsx("img",{src:Ke,alt:"salud total",className:"logos"}),c.jsx("img",{src:Ve,alt:"salud total",className:"logos"}),c.jsx("img",{src:Ie,alt:"salud total",className:"logos"}),c.jsx("img",{src:Ne,alt:"salud total",className:"logos"}),c.jsx("img",{src:ke,alt:"banco de occidente",className:"logos"}),c.jsx("img",{src:He,alt:"akuo",className:"logos"}),c.jsx("img",{src:We,alt:"varianz",className:"logos"}),c.jsx("img",{src:Fe,alt:"powertis",className:"logos"}),c.jsx("img",{src:Ce,alt:"salud total",className:"logos"}),c.jsx("img",{src:Be,alt:"confenalco",className:"logos"}),c.jsx("img",{src:Re,alt:"salud total",className:"logos"})]})})}const De=()=>c.jsxs("section",{className:"clientes",children:[c.jsx("div",{className:"container",children:c.jsx("div",{className:"row",children:c.jsx(Z,{title:"Clientes"})})}),c.jsx("div",{className:"container",children:c.jsx(Oe,{})})]});function Xe(){const{isVisible:e,ref:t}=X("100px");return c.jsx("div",{id:"LazyServices",ref:t,children:e?c.jsx(De,{}):null})}export{De as Clients,Xe as default};
