import{r as l,D as j,j as s,E as v,H as b,I as o,J as r,L as t,K as p,M as f,O as d,T as N,U as y,V as $,u as k}from"./index-d6e7f966.js";import{A as w}from"./index.esm-2d631b84.js";const x=l.forwardRef(({bsPrefix:e,fluid:a=!1,as:n="div",className:c,...g},u)=>{const i=j(e,"container"),m=typeof a=="string"?`-${a}`:"-fluid";return s.jsx(n,{ref:u,...g,className:v(c,a?`${i}${m}`:i)})});x.displayName="Container";const h=x,R=()=>b({mutationKey:["blog"],mutationFn:async({id:e})=>{const a=await o.get(`/blog/${e}/`);return console.log("useFetchBlog",a.data,"response.data",e),a.data}}),S=async e=>{try{const a=await o.get(`/blog/?page=${e}`);console.log(a.data);const n=a.data.next,c=a.data.results;return{nextPage:n,blogs:c}}catch(a){console.log(a);return}},B=async()=>{try{const e=await o.get("/blog/recent/");return console.log(e.data),e.data}catch(e){console.log(e);return}},A=async e=>{try{const a=await o.get(`/blog/search/${e}/`);return console.log(a.data),a.data}catch(a){console.log(a);return}};const F=()=>{const e="text-black";return s.jsx(s.Fragment,{children:s.jsx(h,{children:s.jsx(r,{className:"navbar",expand:"lg",children:s.jsxs(h,{children:[s.jsx(r.Brand,{as:t,to:"/",children:s.jsx(p,{width:"150",height:"30"})}),s.jsx(r.Toggle,{"aria-controls":"basic-navbar-nav"}),s.jsx(r.Collapse,{id:"basic-navbar-nav",children:s.jsxs(f,{className:"ms-auto",children:[s.jsx(t,{className:`links nav navbar  ${e} `,to:"/AboutUS",children:"Quiénes somos"}),s.jsx(d,{className:`links nav navbar  ${e} `,to:"/servicios#header",children:"Servicios"}),s.jsx(t,{className:`links nav navbar  ${e} `,to:"/contact",children:"Contacto"}),s.jsx(d,{className:`links nav navbar  ${e} `,to:"/projects",children:"Proyectos"}),s.jsx(t,{className:`links nav navbar  ${e} `,to:"/cotizador",children:"Login"}),s.jsx(t,{to:"/blog",className:"links nav navbar text-black",children:"blog "}),s.jsx("a",{className:`links nav navbar  ${e} `,href:"/store/",children:s.jsx("div",{className:"store",children:s.jsx("span",{children:"Magnatienda"})})})]})})]})})})})},E=({children:e})=>{const a=l.useRef(null),n=N();return l.useEffect(()=>{a.current&&a.current.scrollIntoView({behavior:"smooth"})},[n]),s.jsxs(s.Fragment,{children:[s.jsxs("header",{ref:a,children:[s.jsx(F,{}),s.jsx("div",{className:"spand",id:"header"})]}),e,s.jsx(y,{}),s.jsx($,{})]})},I=()=>{const{data:e}=k({queryKey:["importantBlogs"],queryFn:B,staleTime:18e5,refetchOnWindowFocus:!1,refetchInterval:18e5});return e?s.jsxs("div",{className:"blog-sidebar ",children:[s.jsx("h3",{className:"ml-5",children:"Artículos más importantes "}),s.jsx("ul",{children:e.map(a=>s.jsx("li",{children:s.jsx("div",{className:"row",children:s.jsxs(t,{to:`/blog/${a.id}`,children:[s.jsx("div",{className:"col-3",children:s.jsx("img",{src:a.image,alt:a.title,style:{width:"120px",borderRadius:"10px"}})}),s.jsxs("div",{className:"col-8 fs-4",children:[a.title," ",s.jsx(w,{}),s.jsxs("p",{className:"text-white ",children:[" Autor :  ",a.author.last_name]})]}),s.jsx("hr",{})]})})},a.id))})]}):s.jsx("p",{children:"Cargando..."})};export{E as B,I as S,S as a,A as f,R as u};
