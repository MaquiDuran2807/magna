import{a4 as g,r as i,ab as p,aa as y,ac as c,ad as S,a8 as l,ae as d,a0 as m,af as v}from"./index-d24fb47d.js";function E(t){const r=g(()=>y(t)),{isStatic:o}=i.useContext(p);if(o){const[,n]=i.useState(t);i.useEffect(()=>r.on("change",n),[])}return r}function A(t,r={}){const{isStatic:o}=i.useContext(p),n=i.useRef(null),a=E(c(t)?t.get():t),s=()=>{n.current&&n.current.stop()};return i.useInsertionEffect(()=>a.attach((e,u)=>{if(o)return u(e);if(s(),n.current=S({keyframes:[a.get(),e],velocity:a.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...r,onUpdate:u}),!l.isProcessing){const f=performance.now()-l.timestamp;f<30&&(n.current.time=d(f))}return a.get()},s),[JSON.stringify(r)]),m(()=>{if(c(t))return t.on("change",e=>a.set(parseFloat(e)))},[a]),a}function V(t,r,o){var n;if(typeof t=="string"){let a=document;r&&(v(!!r.current),a=r.current),o?((n=o[t])!==null&&n!==void 0||(o[t]=a.querySelectorAll(t)),t=o[t]):t=a.querySelectorAll(t)}else t instanceof Element&&(t=[t]);return Array.from(t||[])}export{A as a,V as r,E as u};