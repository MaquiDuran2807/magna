import{u as a,j as e,P as t,a as c}from"./index-73912ebe.js";import{B as n}from"./banner-3b286f1a.js";import o from"./cardsProjects-9a03608d.js";import"./index.esm-ebd93029.js";const j=()=>{const{data:r}=a({queryKey:["projects"],staleTime:18e5,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:18e5}),{data:s}=a({queryKey:["projectsImages"],staleTime:1e3*60*30,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:1e3*60*30});return!r||!s?null:e.jsxs(t,{children:[e.jsx(n,{title:"Proyectos",paragraph:"Proyectos",image:c}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{className:"container",children:e.jsx("div",{className:"row",children:e.jsx(o,{type:0,actualPage:null,imagenes:s})})}),e.jsx("div",{className:"container",children:e.jsx("div",{className:"row"})})]})};export{j as default};