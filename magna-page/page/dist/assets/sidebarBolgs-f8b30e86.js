import{r as l,u as j,j as s,c as v,z as b,B as o,C as r,L as t,D as p,E as f,F as d,G as N,H as y,i as $}from"./index-ef17fea3.js";import{u as B}from"./useLazyload-ebb7f7c0.js";import k from"./footer1-fcd33052.js";import{A as w}from"./index.esm-cbf36d8f.js";const x=l.forwardRef(({bsPrefix:e,fluid:a=!1,as:n="div",className:c,...u},m)=>{const i=j(e,"container"),g=typeof a=="string"?`-${a}`:"-fluid";return s.jsx(n,{ref:m,...u,className:v(c,a?`${i}${g}`:i)})});x.displayName="Container";const h=x,E=()=>b({mutationKey:["blog"],mutationFn:async({id:e})=>{const a=await o.get(`/blog/${e}/`);return console.log("useFetchBlog",a.data,"response.data",e),a.data}}),I=async e=>{try{const a=await o.get(`/blog/?page=${e}`);console.log(a.data);const n=a.data.next,c=a.data.results;return{nextPage:n,blogs:c}}catch(a){console.log(a);return}},F=async()=>{try{const e=await o.get("/blog/recent/");return console.log(e.data),e.data}catch(e){console.log(e);return}},P=async e=>{try{const a=await o.get(`/blog/search/${e}/`);return console.log(a.data),a.data}catch(a){console.log(a);return}};const L=()=>{const e="text-black";return s.jsx(s.Fragment,{children:s.jsx(h,{children:s.jsx(r,{className:"navbar",expand:"lg",children:s.jsxs(h,{children:[s.jsx(r.Brand,{as:t,to:"/",children:s.jsx(p,{width:"150",height:"30"})}),s.jsx(r.Toggle,{"aria-controls":"basic-navbar-nav"}),s.jsx(r.Collapse,{id:"basic-navbar-nav",children:s.jsxs(f,{className:"ms-auto",children:[s.jsx(t,{className:`links nav navbar  ${e} `,to:"/AboutUS",children:"Quiénes somos"}),s.jsx(d,{className:`links nav navbar  ${e} `,to:"/servicios#header",children:"Servicios"}),s.jsx(t,{className:`links nav navbar  ${e} `,to:"/contact",children:"Contacto"}),s.jsx(d,{className:`links nav navbar  ${e} `,to:"/projects",children:"Proyectos"}),s.jsx(t,{className:`links nav navbar  ${e} `,to:"/cotizador",children:"Login"}),s.jsx(t,{to:"/blog",className:"links nav navbar text-black",children:"blog "}),s.jsx("a",{className:`links nav navbar  ${e} `,href:"/store/",children:s.jsx("div",{className:"store",children:s.jsx("span",{children:"Magnatienda"})})})]})})]})})})})};function C(){const{isVisible:e,ref:a}=B("100px");return s.jsx("div",{id:"LazyServices",ref:a,children:e?s.jsx(L,{}):null})}const D=({children:e})=>{const a=l.useRef(null),n=N();return l.useEffect(()=>{a.current&&a.current.scrollIntoView({behavior:"smooth"})},[n]),s.jsxs(s.Fragment,{children:[s.jsxs("header",{ref:a,children:[s.jsx(C,{}),s.jsx("div",{className:"spand",id:"header"})]}),e,s.jsx(k,{}),s.jsx(y,{})]})},O=()=>{const{data:e}=$({queryKey:["importantBlogs"],queryFn:F,staleTime:18e5,refetchOnWindowFocus:!1,refetchInterval:18e5});return e?s.jsxs("div",{className:"blog-sidebar ",children:[s.jsx("h3",{className:"ml-5",children:"Artículos más importantes "}),s.jsx("ul",{children:e.map(a=>s.jsx("li",{children:s.jsx("div",{className:"row",children:s.jsxs(t,{to:`/blog/${a.id}`,children:[s.jsx("div",{className:"col-3",children:s.jsx("img",{src:a.image,alt:a.title,style:{width:"120px",borderRadius:"10px"}})}),s.jsxs("div",{className:"col-8 fs-4",children:[a.title," ",s.jsx(w,{}),s.jsxs("p",{className:"text-white ",children:[" Autor :  ",a.author.last_name]})]}),s.jsx("hr",{})]})})},a.id))})]}):s.jsx("p",{children:"Cargando..."})};export{D as B,O as S,I as a,P as f,E as u};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhckJvbGdzLWY4YjMwZTg2LmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Db250YWluZXIuanMiLCIuLi8uLi9zcmMvYXBpL2Jsb2cudHN4IiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvbmF2YmFyMi50c3giLCIuLi8uLi9zcmMvbGF5b3V0cy9ibG9nTGF5b3V0LnRzeCIsIi4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGViYXJCb2xncy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBDb250YWluZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgZmx1aWQgPSBmYWxzZSxcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIGNsYXNzTmFtZSxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdjb250YWluZXInKTtcbiAgY29uc3Qgc3VmZml4ID0gdHlwZW9mIGZsdWlkID09PSAnc3RyaW5nJyA/IGAtJHtmbHVpZH1gIDogJy1mbHVpZCc7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICAuLi5wcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBmbHVpZCA/IGAke3ByZWZpeH0ke3N1ZmZpeH1gIDogcHJlZml4KVxuICB9KTtcbn0pO1xuQ29udGFpbmVyLmRpc3BsYXlOYW1lID0gJ0NvbnRhaW5lcic7XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7IiwiaW1wb3J0IGFwaUNsaWVudCBmcm9tIFwiLi4vYXBpQ2xpZW50XCI7XG5pbXBvcnQgeyBCbG9nTWFnbmEsIEJsb2dpbXBvcnRhbnRNYWduYSwgUmVzdWx0LCB9IGZyb20gXCIuLi90eXBlcy9ibG9nXCI7XG5cblxuaW1wb3J0IHsgdXNlTXV0YXRpb24gfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuXG5cblxuZXhwb3J0IGNvbnN0IHVzZUZldGNoQmxvZyA9ICgpID0+IHtcbiAgXG4gIFxuICAgIHJldHVybiB1c2VNdXRhdGlvbjxSZXN1bHRbXSwgRXJyb3IsIHsgaWQ6IHN0cmluZyB9Pih7XG4gICAgICAgIG11dGF0aW9uS2V5OiBbJ2Jsb2cnXSxcbiAgICAgICAgbXV0YXRpb25GbjogYXN5bmMgKHtcbiAgICAgICAgICBpZFxuICAgICAgICB9KSA9PntcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQuZ2V0PFJlc3VsdFtdPihgL2Jsb2cvJHtpZH0vYCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1c2VGZXRjaEJsb2cnLCByZXNwb25zZS5kYXRhLCAncmVzcG9uc2UuZGF0YScsIGlkKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9IFxuICAgIH0pO1xuXG4gIH07XG5cbmV4cG9ydCBjb25zdCBmZXRjaE5leHRCbG9ncyA9IGFzeW5jICggcGFnZVBhcmFtOmFueSApID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQuZ2V0PEJsb2dNYWduYT4oYC9ibG9nLz9wYWdlPSR7cGFnZVBhcmFtfWApO1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICBjb25zdCBuZXh0UGFnZSA9IHJlc3BvbnNlLmRhdGEubmV4dDtcbiAgICAgIGNvbnN0IGJsb2dzID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuICAgICAgXG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZXh0UGFnZTogbmV4dFBhZ2UsXG4gICAgICAgIGJsb2dzOiBibG9nc1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuZXhwb3J0IGNvbnN0IGZldGNoaW5mb0ltcG9ydGFudEJsb2dzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpQ2xpZW50LmdldDxCbG9naW1wb3J0YW50TWFnbmFbXT4oJy9ibG9nL3JlY2VudC8nKTtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICBjb25zdCBibG9ncyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgcmV0dXJuIGJsb2dzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm5cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZmV0Y2hCbG9nU2VhcmNoID0gYXN5bmMgKHNlYXJjaDpzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaUNsaWVudC5nZXQ8UmVzdWx0W10+KGAvYmxvZy9zZWFyY2gvJHtzZWFyY2h9L2ApO1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgIGNvbnN0IGJsb2dzID0gcmVzcG9uc2UuZGF0YTtcbiAgICByZXR1cm4gYmxvZ3M7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVyblxuICB9XG59IiwiLy8gaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHtMb2dvT3JpZ2luYWx9IGZyb20gJy4uL2Fzc2V0cy9pbWcvbG9nb09yaWdpbmFsJ1xuaW1wb3J0IHtOYXYsTmF2YmFyLENvbnRhaW5lcn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAnLi9zdHlsZXMvbmF2YmFyMi5jc3MnXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgdXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgZnJvbSAnLi4vaG9va3MvdXNlTGF6eWxvYWQnO1xuXG5jb25zdCBOYXZCYXIgPSAoKSA9PiB7XG4gIGNvbnN0IHRoZW1lTG9naW49XCJ0ZXh0LWJsYWNrXCJcbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPiAqL31cbiAgICAgICAgICA8Q29udGFpbmVyID5cbiAgICAgICAgICAgICAgPE5hdmJhciBjbGFzc05hbWU9XCJuYXZiYXJcIiBleHBhbmQ9XCJsZ1wiICA+XG4gICAgICAgICAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgIDxOYXZiYXIuQnJhbmQgYXM9e0xpbmt9IHRvPVwiL1wiPjxMb2dvT3JpZ2luYWwgd2lkdGg9JzE1MCcgaGVpZ2h0PSczMCcgLz48L05hdmJhci5CcmFuZD5cbiAgICAgICAgICAgICAgICAgIDxOYXZiYXIuVG9nZ2xlIGFyaWEtY29udHJvbHM9XCJiYXNpYy1uYXZiYXItbmF2XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxOYXZiYXIuQ29sbGFwc2UgaWQ9XCJiYXNpYy1uYXZiYXItbmF2XCI+XG4gICAgICAgICAgICAgICAgICAgIDxOYXYgY2xhc3NOYW1lPVwibXMtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9e2BsaW5rcyBuYXYgbmF2YmFyICAke3RoZW1lTG9naW59IGB9IHRvPVwiL0Fib3V0VVNcIiA+UXVpw6luZXMgc29tb3M8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9e2BsaW5rcyBuYXYgbmF2YmFyICAke3RoZW1lTG9naW59IGB9IHRvPVwiL3NlcnZpY2lvcyNoZWFkZXJcIj5TZXJ2aWNpb3M8L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9e2BsaW5rcyBuYXYgbmF2YmFyICAke3RoZW1lTG9naW59IGB9IHRvPVwiL2NvbnRhY3RcIj5Db250YWN0bzwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT17YGxpbmtzIG5hdiBuYXZiYXIgICR7dGhlbWVMb2dpbn0gYH0gdG89XCIvcHJvamVjdHNcIj5Qcm95ZWN0b3M8L05hdkxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9e2BsaW5rcyBuYXYgbmF2YmFyICAke3RoZW1lTG9naW59IGB9IHRvPVwiL2NvdGl6YWRvclwiPkxvZ2luPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89XCIvYmxvZ1wiICBjbGFzc05hbWU9J2xpbmtzIG5hdiBuYXZiYXIgdGV4dC1ibGFjayc+YmxvZyA8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2BsaW5rcyBuYXYgbmF2YmFyICAke3RoZW1lTG9naW59IGB9IGhyZWY9XCIvc3RvcmUvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdG9yZSc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TWFnbmF0aWVuZGE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L05hdj5cbiAgICAgICAgICAgICAgICAgIDwvTmF2YmFyLkNvbGxhcHNlPlxuICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvTmF2YmFyPlxuICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICAgIFxuXG5cblxuICAgICAgICB7LyogPENvbnRhaW5lciBjbGFzc05hbWU9J2NvbCByb3VuZGVkLTkgJz5cbiAgICAgICAgPFJvdyA+XG4gICAgICAgIDxOYXZiYXIgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1kYXJrIGJnLWxpZ2ggIFwiIGlkPSdiYXJyYSAnIHZhcmlhbnQ9XCJkYXJrXCIgZXhwYW5kPVwibGdcIj5cbiAgICAgICAgXG4gICAgICAgICAgXG4gICAgICAgICAgPE5hdmJhci5CcmFuZCBhcz17TGlua30gdG89XCIvXCIgY2xhc3NOYW1lPVwiY29sLTYgXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIGFsdD1cImtqYXNua2RhbnNqa2Rua2FcIlxuICAgICAgICAgICAgICBzcmM9XCIuLi9hc3NldHMvcmVhY3Quc3ZnXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIzMFwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjMwXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZC1pbmxpbmUtYmxvY2sgYWxpZ24tdG9wXCJcbiAgICAgICAgICAgIC8+eycgJ31cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dC1saWdodCc+RWxpdDwvc3Bhbj5cbiAgICAgICAgICA8L05hdmJhci5CcmFuZD5cbiAgICAgICAgICAgIDxOYXZiYXIuVG9nZ2xlIGFyaWEtY29udHJvbHM9XCJiYXNpYy1uYXZiYXItbmF2XCIgLz5cbiAgICAgICAgICAgIDxOYXZiYXIuQ29sbGFwc2UgaWQ9XCJiYXNpYy1uYXZiYXItbmF2XCIgIGNsYXNzTmFtZT1cIiAgIFwiPlxuICAgICAgICAgICAgPE5hdiBjbGFzc05hbWU9J3JvdyBjb2wtMTIganVzdGlmeS1jb250ZW50LWVuZCc+IFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLTInPlxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiIGNsYXNzPVwibmF2LWl0ZW1cIiA+SG9tZTwvTGluaz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2Fib3V0XCIgY2xhc3M9XCJjb2wtMlwiPkFib3V0PC9MaW5rPlxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9jb250YWN0XCIgY2xhc3M9XCJjb2wtMlwiPkNvbnRhY3Q8L0xpbms+XG4gICAgICAgICAgICA8L05hdj5cbiAgICAgICAgICAgIDwvTmF2YmFyLkNvbGxhcHNlPlxuICAgICAgICBcbiAgICAgICAgPC9OYXZiYXI+XG4gICAgICAgIDwvUm93PlxuICAgICAgICA8L0NvbnRhaW5lcj4gKi99XG4gICAgICAgICAgey8qIDwvZGl2PiAqL31cbiAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIDwvPlxuICAgICk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF6eU5hdmJhcjIgKCkge1xuICAgICAgY29uc3QgeyAgaXNWaXNpYmxlLCByZWYgfSA9IHVzZUludGVyc2VjdGlvbk9ic2VydmVyKCcxMDBweCcpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGlkPVwiTGF6eVNlcnZpY2VzXCIgcmVmPXtyZWZ9PlxuICAgICAgICAgICAgICB7aXNWaXNpYmxlID8gPE5hdkJhciAvPiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJy4uL2NvbXBvbmVudHMvbmF2YmFyMic7XG5pbXBvcnQgeyBGbG9hdFdoYXRzYXBwIH0gZnJvbSAnLi4vY29tcG9uZW50cy9mbG9hd2hhdHNhcHAnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBMYXp5Rm9vdGVyMSBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3RlcjEnO1xuXG5cbmludGVyZmFjZSBCbG9nTGF5b3V0UHJvcHMge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59XG5cbmNvbnN0IEJsb2dMYXlvdXQ6IFJlYWN0LkZDPEJsb2dMYXlvdXRQcm9wcz4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgY29uc3QgaW5pY2lvRGVQYWdpbmFSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTsgLy8gQ29ycmVnaXIgZWwgdGlwbyBkZSBpbmljaW9EZVBhZ2luYVJlZlxuICAgIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAvLyBTaSBoYXkgdW4gY2FtYmlvIGVuIGxhIHJ1dGEsIHJlYWxpemEgZWwgc2Nyb2xsIGFsIGluaWNpbyBkZSBsYSBww6FnaW5hXG4gICAgICAgIGlmIChpbmljaW9EZVBhZ2luYVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBSZWFsaXphciBsYSBsw7NnaWNhIGRlIHNjcm9sbCBhcXXDrVxuICAgICAgICAgICAgaW5pY2lvRGVQYWdpbmFSZWYuY3VycmVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtsb2NhdGlvbl0pO1xuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8aGVhZGVyIHJlZj17aW5pY2lvRGVQYWdpbmFSZWZ9PlxuXG4gICAgICAgICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhbmRcIiBpZD0naGVhZGVyJz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8TGF6eUZvb3RlcjEvPlxuICAgICAgICAgICAgPEZsb2F0V2hhdHNhcHAgLz5cbiAgICAgICAgPC8+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2dMYXlvdXQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEFpT3V0bGluZURvdWJsZVJpZ2h0IH0gZnJvbSAncmVhY3QtaWNvbnMvYWknO1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgZmV0Y2hpbmZvSW1wb3J0YW50QmxvZ3MgfSBmcm9tICcuLi9hcGkvYmxvZyc7XG5cblxuXG5jb25zdCBTaWRlYmFyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGE6IGJsb2dzIH0gPSB1c2VRdWVyeSh7XG4gICAgICAgIHF1ZXJ5S2V5OiBbJ2ltcG9ydGFudEJsb2dzJ10sXG4gICAgICAgIHF1ZXJ5Rm46IGZldGNoaW5mb0ltcG9ydGFudEJsb2dzLFxuICAgICAgICBzdGFsZVRpbWU6IDEwMDAqNjAqMzAscmVmZXRjaE9uV2luZG93Rm9jdXM6IGZhbHNlLHJlZmV0Y2hJbnRlcnZhbDogMTAwMCo2MCozMCxcbiAgICB9KTtcbiAgICBpZiAoIWJsb2dzKSB7XG4gICAgICAgIHJldHVybiA8cD5DYXJnYW5kby4uLjwvcD47XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9nLXNpZGViYXIgXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdtbC01Jz5BcnTDrWN1bG9zIG3DoXMgaW1wb3J0YW50ZXMgPC9oMz5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmxvZ3MubWFwKChibG9nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17YmxvZy5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtgL2Jsb2cvJHtibG9nLmlkfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtibG9nLmltYWdlfSBhbHQ9e2Jsb2cudGl0bGV9IHN0eWxlPXt7d2lkdGg6XCIxMjBweFwiLGJvcmRlclJhZGl1czpcIjEwcHhcIn19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTggZnMtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtibG9nLnRpdGxlfSA8QWlPdXRsaW5lRG91YmxlUmlnaHQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtd2hpdGUgJz4gQXV0b3IgOiAge2Jsb2cuYXV0aG9yLmxhc3RfbmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGViYXI7Il0sIm5hbWVzIjpbIkNvbnRhaW5lciIsIlJlYWN0LmZvcndhcmRSZWYiLCJic1ByZWZpeCIsImZsdWlkIiwiQ29tcG9uZW50IiwiY2xhc3NOYW1lIiwicHJvcHMiLCJyZWYiLCJwcmVmaXgiLCJ1c2VCb290c3RyYXBQcmVmaXgiLCJzdWZmaXgiLCJfanN4IiwiY2xhc3NOYW1lcyIsIkNvbnRhaW5lciQxIiwidXNlRmV0Y2hCbG9nIiwidXNlTXV0YXRpb24iLCJpZCIsInJlc3BvbnNlIiwiYXBpQ2xpZW50IiwiZmV0Y2hOZXh0QmxvZ3MiLCJwYWdlUGFyYW0iLCJuZXh0UGFnZSIsImJsb2dzIiwiZXJyb3IiLCJmZXRjaGluZm9JbXBvcnRhbnRCbG9ncyIsImZldGNoQmxvZ1NlYXJjaCIsInNlYXJjaCIsIk5hdkJhciIsInRoZW1lTG9naW4iLCJqc3giLCJGcmFnbWVudCIsIk5hdmJhciIsImpzeHMiLCJMaW5rIiwiTG9nb09yaWdpbmFsIiwiTmF2IiwiTmF2TGluayIsIkxhenlOYXZiYXIyIiwiaXNWaXNpYmxlIiwidXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJCbG9nTGF5b3V0IiwiY2hpbGRyZW4iLCJpbmljaW9EZVBhZ2luYVJlZiIsInVzZVJlZiIsImxvY2F0aW9uIiwidXNlTG9jYXRpb24iLCJ1c2VFZmZlY3QiLCJMYXp5Rm9vdGVyMSIsIkZsb2F0V2hhdHNhcHAiLCJTaWRlYmFyIiwidXNlUXVlcnkiLCJibG9nIiwiQWlPdXRsaW5lRG91YmxlUmlnaHQiXSwibWFwcGluZ3MiOiJrUUFNQSxNQUFNQSxFQUF5QkMsRUFBZ0IsV0FBQyxDQUFDLENBQy9DLFNBQUFDLEVB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
