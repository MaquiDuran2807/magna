import{u as o,j as e,S as m,A as p,b as f,N as h,c as j,L as a,U as x}from"./index-73912ebe.js";import{S as y}from"./setionHeader-b5d18e70.js";import{l as v}from"./Recurso 1-e9af6898.js";import{u as w}from"./ScreenSize-8ac180d5.js";const N=()=>{const{data:s}=o({queryKey:["projects"],staleTime:18e5,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:18e5}),{data:n}=o({queryKey:["projectsImages"],staleTime:1e3*60*30,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:1e3*60*30});let c=[];const{width:i}=w(),l=i<=768,d=i<=1e3,u=l?1:d?2:3;return!s||!n?null:e.jsxs(m,{spaceBetween:25,slidesPerView:u,autoplay:{delay:2e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},navigation:!0,modules:[p,f,h],className:"mySwiper",children:[s==null?void 0:s.results.map(r=>e.jsx(j,{children:e.jsxs("div",{className:"projects border-0 ",children:[n.map(t=>t.proyecto===r.id&&!c.includes(t.proyecto)?(c.push(t.proyecto),e.jsxs(e.Fragment,{children:[e.jsx("img",{src:t.imagen,alt:"",className:"img-fluid "},t.id),e.jsx("a",{})]})):null),";",e.jsxs("div",{className:"card-info",children:[e.jsx("h4",{children:r.nombre}),e.jsxs("p",{children:[r.descripcion.slice(0,90)," ",e.jsxs("span",{children:["... ",e.jsx(a,{to:`/projects/${r.id}`,children:"ver más"})]})]})]}),e.jsx(a,{to:`/projects/${r.id}`,children:e.jsx("img",{src:v,alt:"",className:"icon-arrow"})})]})},r.id)),"..."]})};const S=()=>e.jsx("section",{className:"proyectos",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"row",children:e.jsx(y,{title:"Proyectos"})}),e.jsx("div",{className:"row",children:e.jsx(N,{})})]})});function P(){const{isVisible:s,ref:n}=x("100px");return e.jsx("div",{id:"LazyServices",ref:n,children:s?e.jsx(S,{}):null})}export{S as Proyectos,P as default};
