import{Y as n,j as e,r as t,u as x,ag as o}from"./index-d6e7f966.js";import{l as d}from"./Recurso 1-e9af6898.js";import{S as m}from"./setionHeader-64f64551.js";const h=()=>{const[c,i]=t.useState(""),r=(s,l)=>{if(console.log(s+l),c===s+l){console.log("click"),i("");return}i(s+l),console.log(c,"click")},{data:a}=x({queryKey:["workers"],staleTime:1e3*60*30,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:1e3*60*30});return e.jsx("section",{className:"equipo",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"row",children:e.jsx(m,{title:"Equipos y Tecnología"})}),e.jsxs("div",{children:[e.jsx("div",{className:"row  justify-content-center",children:a==null?void 0:a.tecnologias.map(s=>e.jsxs("div",{className:"col-xl-3 col-md-5  col-card",children:[e.jsx("div",{onClick:()=>r(s.id.toString(),"tecnologia"),className:`shadow card-equip ${c===s.id.toString()+"tecnologia"?"card-equipHover":""}`,style:{border:"none",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"},children:e.jsxs("div",{className:"equip-1",children:[e.jsx("img",{src:o+s.imagen,alt:"Card 1",className:"img-fluid rounded mx-auto d-block"}),e.jsx("img",{src:d,alt:"Company Logo",className:"logo"})]},"equip-1")}),e.jsx("div",{className:" desplegable",children:e.jsxs("div",{className:"conteiner-desplegable ",children:[e.jsx("h3",{children:s.nombre}),e.jsx("p",{children:s.descripcion})]})})]},s.id))}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12 shadow workers ",children:e.jsx("div",{className:"",style:{border:"none",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"}})})}),e.jsx("div",{className:"row",children:a==null?void 0:a.equipos.map(s=>e.jsxs("div",{className:"col-xl-3 col-md-5  col-card",children:[e.jsx("div",{className:` shadow card-equip ${c===s.id.toString()+"equipo"?"card-equipHover":""}`,style:{border:"none",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"},children:e.jsxs("div",{onClick:()=>r(s.id.toString(),"equipo"),className:"equip-4 workers-equip ",children:[e.jsx("img",{src:o+s.imagen,alt:"Card 1",className:"img-fluid rounded mx-auto d-block "}),e.jsx("div",{className:"content-cardequip",children:e.jsx("h3",{children:s.nombre})}),e.jsx("img",{src:d,alt:"Company Logo",className:"logo-1"})]})}),e.jsx("div",{className:" desplegable",children:e.jsxs("div",{className:"conteiner-desplegable ",children:[e.jsx("h3",{children:s.nombre}),e.jsx("h5",{children:s.posicion}),e.jsx("p",{children:s.descripcion})]})})]},s.id))})]})]})})};function g(){const{isVisible:c,ref:i}=n("150px");return e.jsx("div",{id:"LazyServices",ref:i,children:c?e.jsx(h,{}):null})}export{g as default};
