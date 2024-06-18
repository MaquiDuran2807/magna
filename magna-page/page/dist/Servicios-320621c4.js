import{j as e,R as c,n as i,L as a}from"./index.js";import{S as n}from"./setionHeader-01dc1b94.js";import{u as l}from"./useLazyload-3251c952.js";const o=c.memo(()=>{const{data:r}=i({queryKey:["services"],staleTime:18e5,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchOnReconnect:!1,refetchInterval:18e5});return e.jsx("section",{className:"servicios   ",children:e.jsxs("div",{className:"container servicios-container",children:[e.jsx("div",{className:"row ",children:e.jsx(n,{title:"Servicios"})}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12 col-lg-12",children:e.jsx("div",{className:"row ",children:r==null?void 0:r.map(s=>e.jsx("div",{className:"col-12 col-lg-4 col-md-6 order-md-1 ",children:e.jsx("div",{className:"card border-0 p-1 tarjeta",children:e.jsxs("div",{className:"card-body",children:[e.jsx("img",{src:`${s.icon}`,alt:s.nombre}),e.jsx("h4",{className:"card-title",children:s.nombre}),e.jsxs("p",{className:"card-title",children:[s.descripcion.slice(0,150),"..."]}),e.jsx("button",{className:" boton-1 ",children:e.jsx(a,{to:`/servicios/${s.nombre}`,children:"Ver más"})})]})})},s.id))})})})]})})});function x(){const{isVisible:r,ref:s}=l("100px");return e.jsx("div",{id:"LazyServices",ref:s,children:r?e.jsx(o,{}):null})}export{x as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljaW9zLTMyMDYyMWM0LmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9zZWN0aW9ucy9TZXJ2aWNpb3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNlcnZpY2lvMiB9IGZyb20gJy4uLy4uL3R5cGVzL3R5cGVzJztcbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcbmltcG9ydCB7IFNldGlvbkhlYWRlciB9IGZyb20gJy4uL3NldGlvbkhlYWRlcidcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCAnLi4vc3R5bGVzL1NlcnZpY2lvcy5jc3MnXG5pbXBvcnQgdXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgZnJvbSAnLi4vLi4vaG9va3MvdXNlTGF6eWxvYWQnO1xuXG5cbmNvbnN0IFNlcnZpY2lvcyA9IFJlYWN0Lm1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YTpzZXJ2ZWNpb3MgfSA9IHVzZVF1ZXJ5PFNlcnZpY2lvMltdPih7XG4gICAgICAgIHF1ZXJ5S2V5OiBbJ3NlcnZpY2VzJ10sXG4gICAgICAgIHN0YWxlVGltZTogMTAwMCo2MCozMCxyZWZldGNoT25XaW5kb3dGb2N1czogZmFsc2UscmVmZXRjaE9uTW91bnQ6IGZhbHNlLHJlZmV0Y2hPblJlY29ubmVjdDogZmFsc2UscmVmZXRjaEludGVydmFsOiAxMDAwKjYwKjMwLFxuICAgIH0pO1xuICAgIHJldHVybihcbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VydmljaW9zICAgXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzZXJ2aWNpb3MtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTZXRpb25IZWFkZXIgdGl0bGU9XCJTZXJ2aWNpb3NcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiB0YXJqZXRhcyAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY29sLWxnLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlY2lvcz8ubWFwKChzZXJ2aWNpbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17c2VydmljaW8uaWR9IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbGctNCBjb2wtbWQtNiBvcmRlci1tZC0xIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgYm9yZGVyLTAgcC0xIHRhcmpldGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3NlcnZpY2lvLmljb259YH0gYWx0PXtzZXJ2aWNpby5ub21icmV9IC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+e3NlcnZpY2lvLm5vbWJyZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57c2VydmljaW8uZGVzY3JpcGNpb24uc2xpY2UoMCwgMTUwKX0uLi48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9JyBib3Rvbi0xICc+PExpbmsgdG89e2Avc2VydmljaW9zLyR7c2VydmljaW8ubm9tYnJlfWB9PlZlciBtw6FzPC9MaW5rPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICApXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF6eVNlcnZpY2lvcygpIHtcbiAgICBjb25zdCB7ICBpc1Zpc2libGUsIHJlZiB9ID0gdXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoJzEwMHB4Jyk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBpZD1cIkxhenlTZXJ2aWNlc1wiIHJlZj17cmVmfT5cbiAgICAgICAgICAgIHtpc1Zpc2libGUgPyA8U2VydmljaW9zIC8+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuXG5cbiJdLCJuYW1lcyI6WyJTZXJ2aWNpb3MiLCJSZWFjdCIsInNlcnZlY2lvcyIsInVzZVF1ZXJ5IiwianN4cyIsImpzeCIsIlNldGlvbkhlYWRlciIsInNlcnZpY2lvIiwiTGluayIsIkxhenlTZXJ2aWNpb3MiLCJpc1Zpc2libGUiLCJyZWYiLCJ1c2VJbnRlcnNlY3Rpb25PYnNlcnZlciJdLCJtYXBwaW5ncyI6ImlKQVVBLE1BQU1BLEVBQVlDLEVBQU0sS0FBSyxJQUFNLENBQy9CLEtBQU0sQ0FBRSxLQUFLQyxDQUFVLEVBQUlDLEVBQXNCLENBQzdDLFNBQVUsQ0FBQyxVQUFVLEVBQ3JCLFVBQVcsS0FBVyxxQkFBc0IsR0FBTSxlQUFnQixHQUFNLG1CQUFvQixHQUFNLGdCQUFpQixJQUFRLENBQzlILEVBQ0QsYUFDSyxVQUFRLENBQUEsVUFBVSxlQUNmLFNBQUNDLEVBQUEsS0FBQSxNQUFBLENBQUksVUFBVSxnQ0FDWCxTQUFBLENBQUFDLEVBQUFBLElBQUMsT0FBSSxVQUFVLE9BQ1gsZUFBQ0MsRUFBYSxDQUFBLE1BQU0sWUFBWSxDQUNwQyxDQUFBLEVBQ0NELE1BQUEsTUFBQSxDQUFJLFVBQVUsTUFFWCxlQUFDLE1BQUksQ0FBQSxVQUFVLG1CQUNYLFNBQUFBLEVBQUEsSUFBQyxPQUFJLFVBQVUsT0FFUCxTQUFXSCxHQUFBLFlBQUFBLEVBQUEsSUFBS0ssR0FFUkYsRUFBQUEsSUFBQyxNQUFzQixDQUFBLFVBQVUsdUNBQzdCLFNBQUFBLEVBQUFBLElBQUMsTUFBSSxDQUFBLFVBQVUsNEJBQ1gsU0FBQUQsRUFBQSxLQUFDLE1BQUksQ0FBQSxVQUFVLFlBQ1gsU0FBQSxDQUFDQyxFQUFBQSxJQUFBLE1BQUEsQ0FBSSxJQUFLLEdBQUdFLEVBQVMsSUFBSSxHQUFJLElBQUtBLEVBQVMsTUFBUSxDQUFBLEVBQ25ERixFQUFBLElBQUEsS0FBQSxDQUFHLFVBQVUsYUFBYyxXQUFTLE9BQU8sRUFDNUNELEVBQUFBLEtBQUMsSUFBRSxDQUFBLFVBQVUsYUFBYyxTQUFBLENBQVNHLEVBQUEsWUFBWSxNQUFNLEVBQUcsR0FBRyxFQUFFLEtBQUEsRUFBRyxFQUNoRUYsRUFBQSxJQUFBLFNBQUEsQ0FBTyxVQUFVLFlBQVksU0FBQ0EsRUFBQSxJQUFBRyxFQUFBLENBQUssR0FBSSxjQUFjRCxFQUFTLE1BQU0sR0FBSSxTQUFBLFNBQU8sQ0FBQSxFQUFPLENBQzNGLENBQUEsQ0FBQSxDQUFBLENBQ0osQ0FSTSxFQUFBQSxFQUFTLEVBU25CLEVBSWhCLENBQUEsQ0FDSixDQUFBLEVBQ0osQ0FBQSxDQUNKLENBQUEsQ0FDUixDQUFBLENBRUosQ0FBQyxFQUVELFNBQXdCRSxHQUFnQixDQUNwQyxLQUFNLENBQUcsVUFBQUMsRUFBVyxJQUFBQyxDQUFJLEVBQUlDLEVBQXdCLE9BQU8sRUFFdkQsT0FBQVAsRUFBQSxJQUFDLE9BQUksR0FBRyxlQUFlLElBQUFNLEVBQ2xCLFNBQVlELEVBQUFMLEVBQUEsSUFBQ0wsRUFBVSxDQUFBLENBQUEsRUFBSyxJQUNqQyxDQUFBLENBRVIifQ==