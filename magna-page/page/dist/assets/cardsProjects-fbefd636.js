import{V as _,j as s,r as d,u as g,m as f,L as A}from"./index-6bd21382.js";const I=({type:a,actualPage:m,imagenes:o})=>{const[u,n]=d.useState([]),[y,j]=d.useState([]),[x,v]=d.useState([]),[i,h]=d.useState(),{data:r}=g({queryKey:["projects"],staleTime:1e3*60*30,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:1e3*60*30});if(!r)return null;d.useEffect(()=>{if(a===0){const t=Array.isArray(r.results)?r.results.map(c=>c.tipo).filter((c,l,N)=>N.findIndex(b=>b.id===c.id)===l):[];n(r.results),j(o),v([{id:0,name:"Todos"},...t]);return}const e=r.results.filter(t=>t.tipo.id===a).filter(t=>t.id!==m);n(e),j(o)},[a,m,o]);const p=e=>{if(e===0){n(r.results),h(void 0);return}if(!e)return;const t=x.filter(l=>l.id===e)[0];if(!t)return;const c=Array.isArray(r.results)?r.results.filter(l=>l.tipo.id===t.id):[];h(t),n(c)};return s.jsx("div",{children:s.jsxs("div",{className:"container",children:[s.jsx("div",{className:"row",children:a===0?x?x.map(e=>s.jsx(f.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},className:"col-12 col-sm-6 col-lg-3 col-md-4",children:s.jsx("button",{className:"boton-1 ",onClick:()=>p(e.id),children:e.name})},e.id)):null:s.jsx(f.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},className:"col-4 col-lg-3",children:s.jsx("button",{className:"boton-1",onClick:()=>p(i==null?void 0:i.id),children:i==null?void 0:i.name})},i==null?void 0:i.id)}),s.jsx("div",{className:"row",children:Array.isArray(u)&&u.map(e=>{const t=y.filter(c=>c.proyecto===e.id)[0].imagen;return s.jsx(f.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,x:-100},transition:{duration:.6},className:"col-md-6 col-lg-4 col-12 col-xl-3",children:s.jsx("div",{children:s.jsx("div",{className:"card-project",children:s.jsxs("div",{className:"card-body card-body-projects",children:[t&&s.jsx("img",{src:t,alt:"Project Image",className:"img-fluid card-img"}),s.jsx("div",{className:"content-1 ",children:s.jsxs("div",{children:[s.jsx("h5",{className:"card-title text-center",children:e.nombre}),s.jsx("p",{className:"card-text text-center",children:`${e.descripcion.slice(0,100)} ...`})]})}),s.jsx(A,{to:`/projects/${e.id}`,className:"boton-1 text-center end-boton",children:"Ver más"})]})})})},e.id)})})]})})};function S({type:a,actualPage:m,imagenes:o}){const{isVisible:u,ref:n}=_("100px");return s.jsx("div",{id:"LazyServices",ref:n,children:u?s.jsx(I,{type:a,actualPage:m,imagenes:o}):null})}export{S as default};