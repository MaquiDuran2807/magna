import{r as e,Y as I,$ as K,a1 as A,ag as O,ah as U}from"./index-71c105d5.js";function F(){const n=e.useRef(!1);return I(()=>(n.current=!0,()=>{n.current=!1}),[]),n}function b(){const n=F(),[s,t]=e.useState(0),r=e.useCallback(()=>{n.current&&t(s+1)},[s]);return[e.useCallback(()=>K.postRender(r),[r]),s]}class B extends e.Component{getSnapshotBeforeUpdate(s){const t=this.props.childRef.current;if(t&&s.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=t.offsetHeight||0,r.width=t.offsetWidth||0,r.top=t.offsetTop,r.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function S({children:n,isPresent:s}){const t=e.useId(),r=e.useRef(null),h=e.useRef({width:0,height:0,top:0,left:0});return e.useInsertionEffect(()=>{const{width:d,height:l,top:f,left:m}=h.current;if(s||!r.current||!d||!l)return;r.current.dataset.motionPopId=t;const a=document.createElement("style");return document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`
          [data-motion-pop-id="${t}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${l}px !important;
            top: ${f}px !important;
            left: ${m}px !important;
          }
        `),()=>{document.head.removeChild(a)}},[s]),e.createElement(B,{isPresent:s,childRef:r,sizeRef:h},e.cloneElement(n,{ref:r}))}const z=({children:n,initial:s,isPresent:t,onExitComplete:r,custom:h,presenceAffectsLayout:d,mode:l})=>{const f=A(T),m=e.useId(),a=e.useMemo(()=>({id:m,initial:s,isPresent:t,custom:h,onExitComplete:o=>{f.set(o,!0);for(const u of f.values())if(!u)return;r&&r()},register:o=>(f.set(o,!1),()=>f.delete(o))}),d?void 0:[t]);return e.useMemo(()=>{f.forEach((o,u)=>f.set(u,!1))},[t]),e.useEffect(()=>{!t&&!f.size&&r&&r()},[t]),l==="popLayout"&&(n=e.createElement(S,{isPresent:t},n)),e.createElement(O.Provider,{value:a},n)};function T(){return new Map}function D(n){return e.useEffect(()=>()=>n(),[])}const p=n=>n.key||"";function G(n,s){n.forEach(t=>{const r=p(t);s.set(r,t)})}function H(n){const s=[];return e.Children.forEach(n,t=>{e.isValidElement(t)&&s.push(t)}),s}const W=({children:n,custom:s,initial:t=!0,onExitComplete:r,exitBeforeEnter:h,presenceAffectsLayout:d=!0,mode:l="sync"})=>{const f=e.useContext(U).forceRender||b()[0],m=F(),a=H(n);let o=a;const u=e.useRef(new Map).current,y=e.useRef(o),C=e.useRef(new Map).current,x=e.useRef(!0);if(I(()=>{x.current=!1,G(a,C),y.current=o}),D(()=>{x.current=!0,C.clear(),u.clear()}),x.current)return e.createElement(e.Fragment,null,o.map(c=>e.createElement(z,{key:p(c),isPresent:!0,initial:t?void 0:!1,presenceAffectsLayout:d,mode:l},c)));o=[...o];const g=y.current.map(p),M=a.map(p),L=g.length;for(let c=0;c<L;c++){const i=g[c];M.indexOf(i)===-1&&!u.has(i)&&u.set(i,void 0)}return l==="wait"&&u.size&&(o=[]),u.forEach((c,i)=>{if(M.indexOf(i)!==-1)return;const w=C.get(i);if(!w)return;const $=g.indexOf(i);let R=c;if(!R){const v=()=>{u.delete(i);const P=Array.from(C.keys()).filter(E=>!M.includes(E));if(P.forEach(E=>C.delete(E)),y.current=a.filter(E=>{const k=p(E);return k===i||P.includes(k)}),!u.size){if(m.current===!1)return;f(),r&&r()}};R=e.createElement(z,{key:p(w),isPresent:!1,onExitComplete:v,custom:s,presenceAffectsLayout:d,mode:l},w),u.set(i,R)}o.splice($,0,R)}),o=o.map(c=>{const i=c.key;return u.has(i)?c:e.createElement(z,{key:p(c),isPresent:!0,presenceAffectsLayout:d,mode:l},c)}),e.createElement(e.Fragment,null,u.size?o:o.map(c=>e.cloneElement(c)))};export{W as A};