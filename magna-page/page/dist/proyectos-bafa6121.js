import{B as i,A as e,G as m,H as p,P as f,I as h,K as x,L as a,O as j}from"./useLazyload-2e42f549.js";import{S as y}from"./setionHeader-493033f1.js";import{l as v}from"./Recurso 1-89d2e2b4.js";import{u as w}from"./ScreenSize-868a02da.js";const N=()=>{const{data:r}=i({queryKey:["projects"],staleTime:18e5,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:18e5}),{data:n}=i({queryKey:["projectsImages"],staleTime:1e3*60*30,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:1e3*60*30});let o=[];const{width:c}=w(),l=c<=768,d=c<=1e3,u=l?1:d?2:3;return!r||!n?null:e.jsxs(m,{spaceBetween:25,slidesPerView:u,autoplay:{delay:2e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},navigation:!0,modules:[p,f,h],className:"mySwiper",children:[r==null?void 0:r.results.map(s=>e.jsx(x,{children:e.jsxs("div",{className:"projects border-0 ",children:[n.map(t=>t.proyecto===s.id&&!o.includes(t.proyecto)?(o.push(t.proyecto),e.jsx(e.Fragment,{children:e.jsx("img",{src:t.imagen,alt:"",className:"img-fluid slider-project-img "},t.id)})):null),";",e.jsxs("div",{className:"card-info",children:[e.jsx("h4",{children:s.nombre}),e.jsxs("p",{children:[s.descripcion.slice(0,90)," ",e.jsxs("span",{children:["... ",e.jsxs(a,{to:`/projects/${s.id}`,children:["ver más ",e.jsx("span",{children:e.jsx("img",{src:"",alt:`ver más del proyecto ${s.nombre}`})})]})]})]})]}),e.jsx(a,{to:`/projects/${s.id}`,children:e.jsx("img",{src:v,alt:"",className:"icon-arrow"})})]})},s.id)),"..."]})};const O=()=>e.jsx("section",{className:"proyectos",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"row",children:e.jsx(y,{title:"Proyectos"})}),e.jsx("div",{className:"row",children:e.jsx(N,{})})]})});function P(){const{isVisible:r,ref:n}=j("100px");return e.jsx("div",{id:"LazyProyectos",ref:n,children:r?e.jsx(O,{}):null})}export{P as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveWVjdG9zLWJhZmE2MTIxLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9zbGlkZXJQcm9qZWN0cy50c3giLCIuLi9zcmMvY29tcG9uZW50cy9zZWN0aW9ucy9wcm95ZWN0b3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBTd2lwZXIgUmVhY3QgY29tcG9uZW50c1xyXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XHJcbmltcG9ydCB7IFN3aXBlciwgU3dpcGVyU2xpZGUgfSBmcm9tICdzd2lwZXIvcmVhY3QnO1xyXG5pbXBvcnQgeyBBdXRvcGxheSwgUGFnaW5hdGlvbiwgTmF2aWdhdGlvbiB9IGZyb20gJ3N3aXBlci9tb2R1bGVzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9wcm9qZWN0cy5jc3MnXHJcbmltcG9ydCBpY29uYXJyb3cgZnJvbSAnLi4vYXNzZXRzL2ltZy9TVkcvUmVjdXJzbyAxLnN2ZydcclxuXHJcbi8vIEltcG9ydCBTd2lwZXIgc3R5bGVzXHJcbmltcG9ydCAnc3dpcGVyL2Nzcy9uYXZpZ2F0aW9uJztcclxuaW1wb3J0ICdzd2lwZXIvY3NzL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgJ3N3aXBlci9jc3Mvc2Nyb2xsYmFyJztcclxuaW1wb3J0ICdzd2lwZXIvY3NzJztcclxuaW1wb3J0IHVzZVNjcmVlblNpemUgZnJvbSAnLi4vaG9va3MvU2NyZWVuU2l6ZSc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgUHJveWVjdEltYWdlc01hZ25hLCBQcm95ZWN0b3NNYWduYSxSZXN1bHQgfSBmcm9tICcuLi90eXBlcy9wcm9qZWN0cyc7XHJcblxyXG5leHBvcnQgY29uc3QgU3dpcGVyUHJvamVjdHM9ICgpID0+IHtcclxuICBjb25zdCB7IGRhdGE6UHJvamVjdCB9ID0gdXNlUXVlcnk8UHJveWVjdG9zTWFnbmE+KHtcclxuICAgIHF1ZXJ5S2V5OiBbJ3Byb2plY3RzJ10sXHJcbiAgICBzdGFsZVRpbWU6IDEwMDAqNjAqMzAscmVmZXRjaE9uV2luZG93Rm9jdXM6IGZhbHNlLHJlZmV0Y2hPbk1vdW50OiBmYWxzZSxyZWZldGNoT25SZWNvbm5lY3Q6IGZhbHNlLHJlZmV0Y2hJbnRlcnZhbDogMTAwMCo2MCozMCxcclxufSk7XHJcbmNvbnN0IHsgZGF0YTpwcm9qZWN0SW1hZ2VzIH0gPSB1c2VRdWVyeTxQcm95ZWN0SW1hZ2VzTWFnbmFbXT4oe1xyXG4gIHF1ZXJ5S2V5OiBbJ3Byb2plY3RzSW1hZ2VzJ10sXHJcbiAgc3RhbGVUaW1lOiAxMDAwKjYwKjMwLHJlZmV0Y2hPbldpbmRvd0ZvY3VzOiBmYWxzZSxyZWZldGNoT25Nb3VudDogZmFsc2UscmVmZXRjaE9uUmVjb25uZWN0OiBmYWxzZSxyZWZldGNoSW50ZXJ2YWw6IDEwMDAqNjAqMzAsXHJcbn0pO1xyXG4gICAgbGV0IHByb3llY3Rvc0VuY29udHJhZG9zOm51bWJlcltdID1bXVxyXG4gICAgY29uc3QgeyB3aWR0aH0gPSB1c2VTY3JlZW5TaXplKCk7XHJcbiAgICBjb25zdCBpc01vYmlsZSA9IHdpZHRoIDw9IDc2ODtcclxuICAgIGNvbnN0IGlzVGFibGV0ID0gd2lkdGggPD0gMTAwMDtcclxuICAgIGNvbnN0IHNsaWRlc1BlclZpZXcgPSBpc01vYmlsZSA/IDEgOiBpc1RhYmxldCA/IDIgOiAzO1xyXG5cclxuICBpZiAoIVByb2plY3QgfHwgIXByb2plY3RJbWFnZXMpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxTd2lwZXJcclxuICAgICAgc3BhY2VCZXR3ZWVuPXsyNX1cclxuICAgICAgc2xpZGVzUGVyVmlldz17c2xpZGVzUGVyVmlld31cclxuICAgICAgYXV0b3BsYXk9e3tcclxuICAgICAgICBkZWxheTogMjAwMCxcclxuICAgICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgcGF1c2VPbk1vdXNlRW50ZXI6IHRydWUsXHJcbiAgICAgICAgXHJcbiAgICAgIH19XHJcbiAgICAgIG5hdmlnYXRpb249e3RydWV9XHJcbiAgICAgIG1vZHVsZXM9e1tBdXRvcGxheSwgUGFnaW5hdGlvbiwgTmF2aWdhdGlvbl19XHJcbiAgICAgIGNsYXNzTmFtZT1cIm15U3dpcGVyXCJcclxuICAgID5cclxuICAgICAge1Byb2plY3Q/LnJlc3VsdHMubWFwKChwcm9qZWN0OlJlc3VsdCkgPT4gKFxyXG4gICAgICAgIDxTd2lwZXJTbGlkZSBrZXk9e3Byb2plY3QuaWR9PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0cyBib3JkZXItMCBcIj5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcHJvamVjdEltYWdlcy5tYXAoKGltYWdlbjogUHJveWVjdEltYWdlc01hZ25hKSA9PiB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgaWYgKGltYWdlbi5wcm95ZWN0byA9PT0gcHJvamVjdC5pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmVyaWZpY2Egc2kgeWEgc2UgZW5jb250csOzIHVuYSBpbWFnZW4gcGFyYSBlbCBwcm95ZWN0b1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwcm95ZWN0b3NFbmNvbnRyYWRvcy5pbmNsdWRlcyhpbWFnZW4ucHJveWVjdG8pKSB7XHJcbiAgICAgICAgICAgICAgICAgIHByb3llY3Rvc0VuY29udHJhZG9zLnB1c2goaW1hZ2VuLnByb3llY3RvKTsgLy8gTWFyY2EgZWwgcHJveWVjdG8gY29tbyBlbmNvbnRyYWRvXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIGtleT17aW1hZ2VuLmlkfSBzcmM9e2ltYWdlbi5pbWFnZW59IGFsdD1cIlwiIGNsYXNzTmFtZT1cImltZy1mbHVpZCBzbGlkZXItcHJvamVjdC1pbWcgXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vIE9taXRpciBvdHJhcyBpbcOhZ2VuZXNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaW5mb1wiPlxyXG4gICAgICAgICAgICAgIDxoND57cHJvamVjdC5ub21icmV9PC9oND5cclxuICAgICAgICAgICAgICA8cD57cHJvamVjdC5kZXNjcmlwY2lvbi5zbGljZSgwLDkwKX0gPHNwYW4+Li4uIDxMaW5rIHRvPXtgL3Byb2plY3RzLyR7cHJvamVjdC5pZH1gfT52ZXIgbcOhcyA8c3Bhbj48aW1nIHNyYz1cIlwiIGFsdD17YHZlciBtw6FzIGRlbCBwcm95ZWN0byAke3Byb2plY3Qubm9tYnJlfWB9IC8+PC9zcGFuPjwvTGluaz48L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPExpbmsgdG89e2AvcHJvamVjdHMvJHtwcm9qZWN0LmlkfWB9PlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPXtpY29uYXJyb3d9IGFsdD1cIlwiIGNsYXNzTmFtZT1cImljb24tYXJyb3dcIiAvPlxyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1N3aXBlclNsaWRlPlxyXG4gICAgICApKX1cclxuICAgICAgXHJcbiAgICAgIC4uLlxyXG4gICAgPC9Td2lwZXI+XHJcbiAgKTtcclxufTtcclxuIiwiXG5pbXBvcnQgeyBTZXRpb25IZWFkZXIgfSBmcm9tICcuLi9zZXRpb25IZWFkZXInXG5pbXBvcnQgeyBTd2lwZXJQcm9qZWN0cyB9IGZyb20gJy4uL3NsaWRlclByb2plY3RzJ1xuaW1wb3J0ICcuLi9zdHlsZXMvcHJveWVjdG9zLmNzcydcbmltcG9ydCB1c2VJbnRlcnNlY3Rpb25PYnNlcnZlciBmcm9tICcuLi8uLi9ob29rcy91c2VMYXp5bG9hZCdcblxuXG5jb25zdCBQcm95ZWN0b3MgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInByb3llY3Rvc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8U2V0aW9uSGVhZGVyIHRpdGxlPVwiUHJveWVjdG9zXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8U3dpcGVyUHJvamVjdHMgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXp5UHJveWVjdG9zICgpIHtcbiAgICBjb25zdCB7ICBpc1Zpc2libGUsIHJlZiB9ID0gdXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoJzEwMHB4Jyk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBpZD1cIkxhenlQcm95ZWN0b3NcIiByZWY9e3JlZn0+XG4gICAgICAgICAgICB7aXNWaXNpYmxlID8gPFByb3llY3RvcyAvPiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0iXSwibmFtZXMiOlsiU3dpcGVyUHJvamVjdHMiLCJQcm9qZWN0IiwidXNlUXVlcnkiLCJwcm9qZWN0SW1hZ2VzIiwicHJveWVjdG9zRW5jb250cmFkb3MiLCJ3aWR0aCIsInVzZVNjcmVlblNpemUiLCJpc01vYmlsZSIsImlzVGFibGV0Iiwic2xpZGVzUGVyVmlldyIsImpzeHMiLCJTd2lwZXIiLCJBdXRvcGxheSIsIlBhZ2luYXRpb24iLCJOYXZpZ2F0aW9uIiwicHJvamVjdCIsIlN3aXBlclNsaWRlIiwiaW1hZ2VuIiwianN4IiwiRnJhZ21lbnQiLCJMaW5rIiwiaWNvbmFycm93IiwiUHJveWVjdG9zIiwiU2V0aW9uSGVhZGVyIiwiTGF6eVByb3llY3RvcyIsImlzVmlzaWJsZSIsInJlZiIsInVzZUludGVyc2VjdGlvbk9ic2VydmVyIl0sIm1hcHBpbmdzIjoiOE9BZ0JPLE1BQU1BLEVBQWdCLElBQU0sQ0FDakMsS0FBTSxDQUFFLEtBQUtDLENBQVEsRUFBSUMsRUFBeUIsQ0FDaEQsU0FBVSxDQUFDLFVBQVUsRUFDckIsVUFBVyxLQUFXLHFCQUFzQixHQUFNLGVBQWdCLEdBQU0sbUJBQW9CLEdBQU0sZ0JBQWlCLElBQVEsQ0FDOUgsRUFDSyxDQUFFLEtBQUtDLENBQWMsRUFBSUQsRUFBK0IsQ0FDNUQsU0FBVSxDQUFDLGdCQUFnQixFQUMzQixVQUFXLElBQUssR0FBRyxHQUFHLHFCQUFzQixHQUFNLGVBQWdCLEdBQU0sbUJBQW9CLEdBQU0sZ0JBQWlCLElBQUssR0FBRyxFQUFBLENBQzVILEVBQ0csSUFBSUUsRUFBK0IsQ0FBQSxFQUM3QixLQUFBLENBQUUsTUFBQUMsR0FBU0MsSUFDWEMsRUFBV0YsR0FBUyxJQUNwQkcsRUFBV0gsR0FBUyxJQUNwQkksRUFBZ0JGLEVBQVcsRUFBSUMsRUFBVyxFQUFJLEVBRWxELE1BQUEsQ0FBQ1AsR0FBVyxDQUFDRSxFQUNSLEtBSVBPLEVBQUEsS0FBQ0MsRUFBQSxDQUNDLGFBQWMsR0FDZCxjQUFBRixFQUNBLFNBQVUsQ0FDUixNQUFPLElBQ1AscUJBQXNCLEdBQ3RCLGtCQUFtQixFQUVyQixFQUNBLFdBQVksR0FDWixRQUFTLENBQUNHLEVBQVVDLEVBQVlDLENBQVUsRUFDMUMsVUFBVSxXQUVULFNBQUEsQ0FBU2IsR0FBQSxZQUFBQSxFQUFBLFFBQVEsSUFBS2MsU0FDcEJDLEVBQ0MsQ0FBQSxTQUFBTixFQUFBLEtBQUMsTUFBSSxDQUFBLFVBQVUscUJBRWIsU0FBQSxDQUFjUCxFQUFBLElBQUtjLEdBRWJBLEVBQU8sV0FBYUYsRUFBUSxJQUUxQixDQUFDWCxFQUFxQixTQUFTYSxFQUFPLFFBQVEsR0FDM0JiLEVBQUEsS0FBS2EsRUFBTyxRQUFRLEVBR3ZDQyxFQUFBQSxJQUFBQyxFQUFBQSxTQUFBLENBQUEsU0FBQUQsRUFBQUEsSUFBQyxNQUFvQixDQUFBLElBQUtELEVBQU8sT0FBUSxJQUFJLEdBQUcsVUFBVSwrQkFBQSxFQUFoREEsRUFBTyxFQUF5RSxDQUMxRixDQUFBLEdBSUMsSUFDUixFQUNBLElBR0RQLEVBQUFBLEtBQUMsTUFBSSxDQUFBLFVBQVUsWUFDYixTQUFBLENBQUNRLEVBQUFBLElBQUEsS0FBQSxDQUFJLFdBQVEsTUFBTyxDQUFBLFNBQ25CLElBQUcsQ0FBQSxTQUFBLENBQVFILEVBQUEsWUFBWSxNQUFNLEVBQUUsRUFBRSxFQUFFLFdBQUUsT0FBSyxDQUFBLFNBQUEsQ0FBQSxjQUFLSyxFQUFLLENBQUEsR0FBSSxhQUFhTCxFQUFRLEVBQUUsR0FBSSxTQUFBLENBQUEsV0FBUUcsRUFBQSxJQUFDLE9BQUssQ0FBQSxTQUFBQSxFQUFBQSxJQUFDLE1BQUksQ0FBQSxJQUFJLEdBQUcsSUFBSyx3QkFBd0JILEVBQVEsTUFBTSxFQUFJLENBQUEsRUFBRSxDQUFBLEVBQU8sQ0FBQSxFQUFPLENBQUEsRUFBTyxDQUFBLEVBRXRMLEVBQ0NHLE1BQUFFLEVBQUEsQ0FBSyxHQUFJLGFBQWFMLEVBQVEsRUFBRSxHQUMvQixTQUFDRyxFQUFBLElBQUEsTUFBQSxDQUFJLElBQUtHLEVBQVcsSUFBSSxHQUFHLFVBQVUsWUFBYSxDQUFBLEVBQ3JELENBQ0YsQ0FBQSxDQUFBLENBQUEsRUE3QmdCTixFQUFRLEVBOEIxQixHQUNDLEtBQUEsQ0FBQSxDQUFBLENBS1QsRUMvRUEsTUFBTU8sRUFBWSxVQUdULFVBQVEsQ0FBQSxVQUFVLFlBQ2YsU0FBQ1osRUFBQSxLQUFBLE1BQUEsQ0FBSSxVQUFVLFlBQ1gsU0FBQSxDQUFBUSxFQUFBQSxJQUFDLE9BQUksVUFBVSxNQUNYLGVBQUNLLEVBQWEsQ0FBQSxNQUFNLFlBQVksQ0FDcEMsQ0FBQSxRQUNDLE1BQUksQ0FBQSxVQUFVLE1BQ1gsU0FBQUwsTUFBQ2xCLEdBQWUsQ0FBQSxFQUNwQixDQUFBLENBQ0osQ0FBQSxDQUNKLENBQUEsRUFJUixTQUF3QndCLEdBQWlCLENBQ3JDLEtBQU0sQ0FBRyxVQUFBQyxFQUFXLElBQUFDLENBQUksRUFBSUMsRUFBd0IsT0FBTyxFQUV2RCxPQUFBVCxFQUFBLElBQUMsT0FBSSxHQUFHLGdCQUFnQixJQUFBUSxFQUNuQixTQUFZRCxFQUFBUCxFQUFBLElBQUNJLEVBQVUsQ0FBQSxDQUFBLEVBQUssSUFDakMsQ0FBQSxDQUVOIn0=