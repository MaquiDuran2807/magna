import{j as s,f as j,r as c,h}from"./index-ef17fea3.js";import{u as v}from"./useLazyload-ebb7f7c0.js";const O=()=>{const n=j();n.validateToken();const i=()=>{n.logout()},[r,l]=c.useState({}),d=[{pregunta:"Pregunta 1",opciones:["Opción 1","Opción 2","Opción 3"],valores:[10,20,30]},{pregunta:"Pregunta 2",opciones:["Opción A","Opción B","Opción C"],valores:[15,25,35]},{pregunta:"Pregunta 3",opciones:["Opción X","Opción Y","Opción Z"],valores:[5,10,15]}],[p,u]=c.useState(0),x=async(e,t)=>{await a(),l(o=>({...o,[e]:t}))},a=()=>{const e=Object.values(r).reduce((t,o)=>t+o,0);u(e)};return s.jsx("div",{children:s.jsxs(h,{children:[s.jsx("button",{onClick:i,style:{padding:"100px"},children:"Logout"}),s.jsx("br",{}),s.jsx("br",{}),s.jsx("h1",{children:"Cotizador de Servicios"}),s.jsxs("div",{style:{display:"flex"},children:[s.jsx("div",{style:{flex:1},children:d.map(e=>s.jsxs("div",{children:[s.jsx("p",{children:e.pregunta}),e.opciones.map((t,o)=>s.jsxs("button",{onClick:()=>x(e.pregunta,e.valores[o]),children:[t,s.jsx("span",{children:r[e.pregunta]===e.valores[o]&&" ✅"})]},t))]},e.pregunta))}),s.jsxs("div",{style:{flex:1},children:[s.jsx("h2",{children:"Tarjeta de Valor"}),Object.entries(r).map(([e,t])=>s.jsxs("div",{children:[s.jsx("p",{children:e}),s.jsxs("p",{children:["Valor: ",t]})]},e)),s.jsxs("h6",{children:["Total: ",p]})]})]}),s.jsx("button",{onClick:a,children:"Calcular Costo"})]})})};function f(){const{isVisible:n,ref:i}=v("100px");return s.jsx("div",{id:"LazyCotizador",ref:i,children:n?s.jsx(O,{}):null})}export{f as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY290aXphZG9yLTViZDk5YTYxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZXMvY290aXphZG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQYWdlc0xheW91dCBmcm9tICcuLi9sYXlvdXRzL3BhZ2VzTGF5b3V0cyc7XHJcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi9hdXRoL0F1dGhQcm92aWRlcic7XHJcbmltcG9ydCB1c2VJbnRlcnNlY3Rpb25PYnNlcnZlciBmcm9tICcuLi9ob29rcy91c2VMYXp5bG9hZCc7XHJcblxyXG5jb25zdCBDb3RpemFkb3I6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYXV0aD11c2VBdXRoKClcclxuICAgIGF1dGgudmFsaWRhdGVUb2tlbigpXHJcblxyXG4gICAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgICAgIGF1dGgubG9nb3V0KCk7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IFtyZXNwdWVzdGFzLCBzZXRSZXNwdWVzdGFzXSA9IHVzZVN0YXRlPHsgW3ByZWd1bnRhOiBzdHJpbmddOiBudW1iZXIgfT4oe30pO1xyXG5cclxuICAgIC8vIEFxdcOtIHB1ZWRlcyBvYnRlbmVyIGxhcyBwcmVndW50YXMgeSBzdXMgdmFsb3JlcyBkZXNkZSBsYSBiYXNlIGRlIGRhdG9zXHJcbiAgICBjb25zdCBwcmVndW50YXMgPSBbXHJcbiAgICAgICAgeyBwcmVndW50YTogJ1ByZWd1bnRhIDEnLCBvcGNpb25lczogWydPcGNpw7NuIDEnLCAnT3BjacOzbiAyJywgJ09wY2nDs24gMyddLCB2YWxvcmVzOiBbMTAsIDIwLCAzMF0gfSxcclxuICAgICAgICB7IHByZWd1bnRhOiAnUHJlZ3VudGEgMicsIG9wY2lvbmVzOiBbJ09wY2nDs24gQScsICdPcGNpw7NuIEInLCAnT3BjacOzbiBDJ10sIHZhbG9yZXM6IFsxNSwgMjUsIDM1XSB9LFxyXG4gICAgICAgIHsgcHJlZ3VudGE6ICdQcmVndW50YSAzJywgb3BjaW9uZXM6IFsnT3BjacOzbiBYJywgJ09wY2nDs24gWScsICdPcGNpw7NuIFonXSwgdmFsb3JlczogWzUsIDEwLCAxNV0gfSxcclxuICAgIFxyXG4gICAgICAgIC8vIEFncmVnYSBtw6FzIHByZWd1bnRhcyBhcXXDrVxyXG4gICAgXTtcclxuICAgIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVzcHVlc3RhID0gYXN5bmMgKHByZWd1bnRhOiBzdHJpbmcsIHZhbG9yOiBudW1iZXIpID0+IHtcclxuICAgICAgICBhd2FpdCBjYWxjdWxhckNvc3RvU2VydmljaW8oKTtcclxuICAgICAgICBzZXRSZXNwdWVzdGFzKChwcmV2UmVzcHVlc3RhcykgPT4gKHtcclxuICAgICAgICAgICAgLi4ucHJldlJlc3B1ZXN0YXMsXHJcbiAgICAgICAgICAgIFtwcmVndW50YV06IHZhbG9yLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNhbGN1bGFyQ29zdG9TZXJ2aWNpbyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb3N0b1RvdGFsID0gT2JqZWN0LnZhbHVlcyhyZXNwdWVzdGFzKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgICh0b3RhbCwgdmFsb3IpID0+IHRvdGFsICsgdmFsb3IsXHJcbiAgICAgICAgICAgIDBcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIEFxdcOtIHB1ZWRlcyBoYWNlciBhbGdvIGNvbiBlbCBjb3N0byB0b3RhbCwgY29tbyBtb3N0cmFybG8gZW4gcGFudGFsbGEgbyBlbnZpYXJsbyBhbCBzZXJ2aWRvclxyXG4gICAgICAgIHNldFRvdGFsKGNvc3RvVG90YWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgPFBhZ2VzTGF5b3V0ID5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtsb2dvdXR9IHN0eWxlPXt7cGFkZGluZzpcIjEwMHB4XCJ9fT5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICA8aDE+Q290aXphZG9yIGRlIFNlcnZpY2lvczwvaDE+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtwcmVndW50YXMubWFwKChwcmVndW50YSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJlZ3VudGEucHJlZ3VudGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3ByZWd1bnRhLnByZWd1bnRhfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmVndW50YS5vcGNpb25lcy5tYXAoKG9wY2lvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17b3BjaW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVSZXNwdWVzdGEocHJlZ3VudGEucHJlZ3VudGEsIHByZWd1bnRhLnZhbG9yZXNbaW5kZXhdKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3BjaW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXNwdWVzdGFzW3ByZWd1bnRhLnByZWd1bnRhXSA9PT0gcHJlZ3VudGEudmFsb3Jlc1tpbmRleF0gJiYgJyDinIUnfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPlRhcmpldGEgZGUgVmFsb3I8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhyZXNwdWVzdGFzKS5tYXAoKFtwcmVndW50YSwgdmFsb3JdKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwcmVndW50YX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57cHJlZ3VudGF9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+VmFsb3I6IHt2YWxvcn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDxoNj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVG90YWw6IHt0b3RhbH1cclxuICAgICAgICAgICAgICAgICAgICA8L2g2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2NhbGN1bGFyQ29zdG9TZXJ2aWNpb30+Q2FsY3VsYXIgQ29zdG88L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9QYWdlc0xheW91dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXp5Q290aXphZG9yKCkge1xyXG4gICAgY29uc3QgeyAgaXNWaXNpYmxlLCByZWYgfSA9IHVzZUludGVyc2VjdGlvbk9ic2VydmVyKCcxMDBweCcpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGlkPVwiTGF6eUNvdGl6YWRvclwiIHJlZj17cmVmfT5cclxuICAgICAgICAgICAge2lzVmlzaWJsZSA/IDxDb3RpemFkb3IgLz4gOiBudWxsfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbIkNvdGl6YWRvciIsImF1dGgiLCJ1c2VBdXRoIiwibG9nb3V0IiwicmVzcHVlc3RhcyIsInNldFJlc3B1ZXN0YXMiLCJ1c2VTdGF0ZSIsInByZWd1bnRhcyIsInRvdGFsIiwic2V0VG90YWwiLCJoYW5kbGVSZXNwdWVzdGEiLCJwcmVndW50YSIsInZhbG9yIiwiY2FsY3VsYXJDb3N0b1NlcnZpY2lvIiwicHJldlJlc3B1ZXN0YXMiLCJjb3N0b1RvdGFsIiwianN4IiwianN4cyIsIlBhZ2VzTGF5b3V0Iiwib3BjaW9uIiwiaW5kZXgiLCJMYXp5Q290aXphZG9yIiwiaXNWaXNpYmxlIiwicmVmIiwidXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiXSwibWFwcGluZ3MiOiJzR0FLQSxNQUFNQSxFQUFzQixJQUFNLENBQzlCLE1BQU1DLEVBQUtDLElBQ1hELEVBQUssY0FBYyxFQUVuQixNQUFNRSxFQUFTLElBQU0sQ0FDakJGLEVBQUssT0FBTyxDQUFBLEVBR1YsQ0FBQ0csRUFBWUMsQ0FBYSxFQUFJQyxFQUFBLFNB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
