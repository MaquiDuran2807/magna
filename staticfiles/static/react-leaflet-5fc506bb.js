import{r as o,b as p}from"./react-a84639bd.js";import{l as y}from"./leaflet-724e7fc3.js";import{r as T}from"./react-dom-47c417a6.js";function b(r,n){const e=o.useRef(n);o.useEffect(function(){n!==e.current&&r.attributionControl!=null&&(e.current!=null&&r.attributionControl.removeAttribution(e.current),n!=null&&r.attributionControl.addAttribution(n)),e.current=n},[r,n])}const j=1;function N(r){return Object.freeze({__version:j,map:r})}function S(r,n){return Object.freeze({...r,...n})}const g=o.createContext(null),R=g.Provider;function I(){const r=o.useContext(g);if(r==null)throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");return r}function _(r){function n(e,t){const{instance:u,context:a}=r(e).current;return o.useImperativeHandle(t,()=>u),e.children==null?null:p.createElement(R,{value:a},e.children)}return o.forwardRef(n)}function A(r){function n(e,t){const[u,a]=o.useState(!1),{instance:c}=r(e,a).current;o.useImperativeHandle(t,()=>c),o.useEffect(function(){u&&c.update()},[c,u,e.children]);const f=c._contentNode;return f?T.createPortal(e.children,f):null}return o.forwardRef(n)}function D(r){function n(e,t){const{instance:u}=r(e).current;return o.useImperativeHandle(t,()=>u),null}return o.forwardRef(n)}function w(r,n){const e=o.useRef();o.useEffect(function(){return n!=null&&r.instance.on(n),e.current=n,function(){e.current!=null&&r.instance.off(e.current),e.current=null}},[r,n])}function v(r,n){const e=r.pane??n.pane;return e?{...r,pane:e}:r}function V(r,n){return function(t,u){const a=I(),c=r(v(t,a),a);return b(a.map,t.attribution),w(c.current,t.eventHandlers),n(c.current,a,t,u),c}}function L(r,n,e){return Object.freeze({instance:r,context:n,container:e})}function E(r,n){return n==null?function(t,u){const a=o.useRef();return a.current||(a.current=r(t,u)),a}:function(t,u){const a=o.useRef();a.current||(a.current=r(t,u));const c=o.useRef(t),{instance:f}=a.current;return o.useEffect(function(){c.current!==t&&(n(f,t,c.current),c.current=t)},[f,t,u]),a}}function Z(r,n){o.useEffect(function(){return(n.layerContainer??n.map).addLayer(r.instance),function(){var a;(a=n.layerContainer)==null||a.removeLayer(r.instance),n.map.removeLayer(r.instance)}},[n,r])}function P(r){return function(e){const t=I(),u=r(v(e,t),t);return b(t.map,e.attribution),w(u.current,e.eventHandlers),Z(u.current,t),u}}function k(r,n){const e=E(r,n),t=P(e);return _(t)}function B(r,n){const e=E(r),t=V(e,n);return A(t)}function G(r,n){const e=E(r,n),t=P(e);return D(t)}function U(r,n,e){const{opacity:t,zIndex:u}=n;t!=null&&t!==e.opacity&&r.setOpacity(t),u!=null&&u!==e.zIndex&&r.setZIndex(u)}function C(){return C=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}return r},C.apply(this,arguments)}function X({bounds:r,boundsOptions:n,center:e,children:t,className:u,id:a,placeholder:c,style:f,whenReady:l,zoom:s,...d},x){const[H]=o.useState({className:u,id:a,style:f}),[i,M]=o.useState(null);o.useImperativeHandle(x,()=>(i==null?void 0:i.map)??null,[i]);const h=o.useCallback(O=>{if(O!==null&&i===null){const m=new y.Map(O,d);e!=null&&s!=null?m.setView(e,s):r!=null&&m.fitBounds(r,n),l!=null&&m.whenReady(l),M(N(m))}},[]);o.useEffect(()=>()=>{i==null||i.map.remove()},[i]);const z=i?p.createElement(R,{value:i},t):c??null;return p.createElement("div",C({},H,{ref:h}),z)}const K=o.forwardRef(X),Q=k(function({position:n,...e},t){const u=new y.Marker(n,e);return L(u,S(t,{overlayContainer:u}))},function(n,e,t){e.position!==t.position&&n.setLatLng(e.position),e.icon!=null&&e.icon!==t.icon&&n.setIcon(e.icon),e.zIndexOffset!=null&&e.zIndexOffset!==t.zIndexOffset&&n.setZIndexOffset(e.zIndexOffset),e.opacity!=null&&e.opacity!==t.opacity&&n.setOpacity(e.opacity),n.dragging!=null&&e.draggable!==t.draggable&&(e.draggable===!0?n.dragging.enable():n.dragging.disable())}),W=B(function(n,e){const t=new y.Popup(n,e.overlayContainer);return L(t,e)},function(n,e,{position:t},u){o.useEffect(function(){const{instance:c}=n;function f(s){s.popup===c&&(c.update(),u(!0))}function l(s){s.popup===c&&u(!1)}return e.map.on({popupopen:f,popupclose:l}),e.overlayContainer==null?(t!=null&&c.setLatLng(t),c.openOn(e.map)):e.overlayContainer.bindPopup(c),function(){var d;e.map.off({popupopen:f,popupclose:l}),(d=e.overlayContainer)==null||d.unbindPopup(),e.map.removeLayer(c)}},[n,e,u,t])}),Y=G(function({url:n,...e},t){const u=new y.TileLayer(n,v(e,t));return L(u,t)},function(n,e,t){U(n,e,t);const{url:u}=e;u!=null&&u!==t.url&&n.setUrl(u)});export{K as M,W as P,Y as T,Q as a};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtbGVhZmxldC01ZmM1MDZiYi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL0ByZWFjdC1sZWFmbGV0L2NvcmUvbGliL2F0dHJpYnV0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0ByZWFjdC1sZWFmbGV0L2NvcmUvbGliL2NvbnRleHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQHJlYWN0LWxlYWZsZXQvY29yZS9saWIvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0ByZWFjdC1sZWFmbGV0L2NvcmUvbGliL2V2ZW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AcmVhY3QtbGVhZmxldC9jb3JlL2xpYi9wYW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0ByZWFjdC1sZWFmbGV0L2NvcmUvbGliL2Rpdi1vdmVybGF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0ByZWFjdC1sZWFmbGV0L2NvcmUvbGliL2VsZW1lbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQHJlYWN0LWxlYWZsZXQvY29yZS9saWIvbGF5ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQHJlYWN0LWxlYWZsZXQvY29yZS9saWIvZ2VuZXJpYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AcmVhY3QtbGVhZmxldC9jb3JlL2xpYi9ncmlkLWxheWVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWxlYWZsZXQvbGliL01hcENvbnRhaW5lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1sZWFmbGV0L2xpYi9NYXJrZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtbGVhZmxldC9saWIvUG9wdXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtbGVhZmxldC9saWIvVGlsZUxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUF0dHJpYnV0aW9uKG1hcCwgYXR0cmlidXRpb24pIHtcbiAgICBjb25zdCBhdHRyaWJ1dGlvblJlZiA9IHVzZVJlZihhdHRyaWJ1dGlvbik7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0aW9uKCkge1xuICAgICAgICBpZiAoYXR0cmlidXRpb24gIT09IGF0dHJpYnV0aW9uUmVmLmN1cnJlbnQgJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRpb25SZWYuY3VycmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5yZW1vdmVBdHRyaWJ1dGlvbihhdHRyaWJ1dGlvblJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0cmlidXRpb25SZWYuY3VycmVudCA9IGF0dHJpYnV0aW9uO1xuICAgIH0sIFtcbiAgICAgICAgbWFwLFxuICAgICAgICBhdHRyaWJ1dGlvblxuICAgIF0pO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmV4cG9ydCBjb25zdCBDT05URVhUX1ZFUlNJT04gPSAxO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxlYWZsZXRDb250ZXh0KG1hcCkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgX192ZXJzaW9uOiBDT05URVhUX1ZFUlNJT04sXG4gICAgICAgIG1hcFxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZENvbnRleHQoc291cmNlLCBleHRyYSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgLi4uc291cmNlLFxuICAgICAgICAuLi5leHRyYVxuICAgIH0pO1xufVxuZXhwb3J0IGNvbnN0IExlYWZsZXRDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcbmV4cG9ydCBjb25zdCBMZWFmbGV0UHJvdmlkZXIgPSBMZWFmbGV0Q29udGV4dC5Qcm92aWRlcjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VMZWFmbGV0Q29udGV4dCgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChMZWFmbGV0Q29udGV4dCk7XG4gICAgaWYgKGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbnRleHQgcHJvdmlkZWQ6IHVzZUxlYWZsZXRDb250ZXh0KCkgY2FuIG9ubHkgYmUgdXNlZCBpbiBhIGRlc2NlbmRhbnQgb2YgPE1hcENvbnRhaW5lcj4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiwgdXNlRWZmZWN0LCB1c2VJbXBlcmF0aXZlSGFuZGxlLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBMZWFmbGV0UHJvdmlkZXIgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lckNvbXBvbmVudCh1c2VFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyQ29tcG9uZW50KHByb3BzLCBmb3J3YXJkZWRSZWYpIHtcbiAgICAgICAgY29uc3QgeyBpbnN0YW5jZSAsIGNvbnRleHQgIH0gPSB1c2VFbGVtZW50KHByb3BzKS5jdXJyZW50O1xuICAgICAgICB1c2VJbXBlcmF0aXZlSGFuZGxlKGZvcndhcmRlZFJlZiwgKCk9Pmluc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIHByb3BzLmNoaWxkcmVuID09IG51bGwgPyBudWxsIDogLyojX19QVVJFX18qLyBSZWFjdC5jcmVhdGVFbGVtZW50KExlYWZsZXRQcm92aWRlciwge1xuICAgICAgICAgICAgdmFsdWU6IGNvbnRleHRcbiAgICAgICAgfSwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgICByZXR1cm4gLyojX19QVVJFX18qLyBmb3J3YXJkUmVmKENvbnRhaW5lckNvbXBvbmVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2T3ZlcmxheUNvbXBvbmVudCh1c2VFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gT3ZlcmxheUNvbXBvbmVudChwcm9wcywgZm9yd2FyZGVkUmVmKSB7XG4gICAgICAgIGNvbnN0IFtpc09wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgICAgICBjb25zdCB7IGluc3RhbmNlICB9ID0gdXNlRWxlbWVudChwcm9wcywgc2V0T3BlbikuY3VycmVudDtcbiAgICAgICAgdXNlSW1wZXJhdGl2ZUhhbmRsZShmb3J3YXJkZWRSZWYsICgpPT5pbnN0YW5jZSk7XG4gICAgICAgIHVzZUVmZmVjdChmdW5jdGlvbiB1cGRhdGVPdmVybGF5KCkge1xuICAgICAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbXG4gICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgIGlzT3BlbixcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuXG4gICAgICAgIF0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlIF9jb250ZW50Tm9kZSBtaXNzaW5nIGluIHR5cGUgZGVmaW5pdGlvblxuICAgICAgICBjb25zdCBjb250ZW50Tm9kZSA9IGluc3RhbmNlLl9jb250ZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnROb2RlID8gLyojX19QVVJFX18qLyBjcmVhdGVQb3J0YWwocHJvcHMuY2hpbGRyZW4sIGNvbnRlbnROb2RlKSA6IG51bGw7XG4gICAgfVxuICAgIHJldHVybiAvKiNfX1BVUkVfXyovIGZvcndhcmRSZWYoT3ZlcmxheUNvbXBvbmVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGVhZkNvbXBvbmVudCh1c2VFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gTGVhZkNvbXBvbmVudChwcm9wcywgZm9yd2FyZGVkUmVmKSB7XG4gICAgICAgIGNvbnN0IHsgaW5zdGFuY2UgIH0gPSB1c2VFbGVtZW50KHByb3BzKS5jdXJyZW50O1xuICAgICAgICB1c2VJbXBlcmF0aXZlSGFuZGxlKGZvcndhcmRlZFJlZiwgKCk9Pmluc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAvKiNfX1BVUkVfXyovIGZvcndhcmRSZWYoTGVhZkNvbXBvbmVudCk7XG59XG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmV4cG9ydCBmdW5jdGlvbiB1c2VFdmVudEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50SGFuZGxlcnMpIHtcbiAgICBjb25zdCBldmVudEhhbmRsZXJzUmVmID0gdXNlUmVmKCk7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uIGFkZEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICAgIGlmIChldmVudEhhbmRsZXJzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zdGFuY2Uub24oZXZlbnRIYW5kbGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnRIYW5kbGVyc1JlZi5jdXJyZW50ID0gZXZlbnRIYW5kbGVycztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlbW92ZUV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyc1JlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmluc3RhbmNlLm9mZihldmVudEhhbmRsZXJzUmVmLmN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyc1JlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9LCBbXG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIGV2ZW50SGFuZGxlcnNcbiAgICBdKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB3aXRoUGFuZShwcm9wcywgY29udGV4dCkge1xuICAgIGNvbnN0IHBhbmUgPSBwcm9wcy5wYW5lID8/IGNvbnRleHQucGFuZTtcbiAgICByZXR1cm4gcGFuZSA/IHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHBhbmVcbiAgICB9IDogcHJvcHM7XG59XG4iLCJpbXBvcnQgeyB1c2VBdHRyaWJ1dGlvbiB9IGZyb20gJy4vYXR0cmlidXRpb24uanMnO1xuaW1wb3J0IHsgdXNlTGVhZmxldENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgdXNlRXZlbnRIYW5kbGVycyB9IGZyb20gJy4vZXZlbnRzLmpzJztcbmltcG9ydCB7IHdpdGhQYW5lIH0gZnJvbSAnLi9wYW5lLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXZPdmVybGF5SG9vayh1c2VFbGVtZW50LCB1c2VMaWZlY3ljbGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlRGl2T3ZlcmxheShwcm9wcywgc2V0T3Blbikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdXNlTGVhZmxldENvbnRleHQoKTtcbiAgICAgICAgY29uc3QgZWxlbWVudFJlZiA9IHVzZUVsZW1lbnQod2l0aFBhbmUocHJvcHMsIGNvbnRleHQpLCBjb250ZXh0KTtcbiAgICAgICAgdXNlQXR0cmlidXRpb24oY29udGV4dC5tYXAsIHByb3BzLmF0dHJpYnV0aW9uKTtcbiAgICAgICAgdXNlRXZlbnRIYW5kbGVycyhlbGVtZW50UmVmLmN1cnJlbnQsIHByb3BzLmV2ZW50SGFuZGxlcnMpO1xuICAgICAgICB1c2VMaWZlY3ljbGUoZWxlbWVudFJlZi5jdXJyZW50LCBjb250ZXh0LCBwcm9wcywgc2V0T3Blbik7XG4gICAgICAgIHJldHVybiBlbGVtZW50UmVmO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50T2JqZWN0KGluc3RhbmNlLCBjb250ZXh0LCBjb250YWluZXIpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGluc3RhbmNlLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXJcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50SG9vayhjcmVhdGVFbGVtZW50LCB1cGRhdGVFbGVtZW50KSB7XG4gICAgaWYgKHVwZGF0ZUVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gdXNlSW1tdXRhYmxlTGVhZmxldEVsZW1lbnQocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRSZWYgPSB1c2VSZWYoKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudFJlZi5jdXJyZW50KSBlbGVtZW50UmVmLmN1cnJlbnQgPSBjcmVhdGVFbGVtZW50KHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50UmVmO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlTXV0YWJsZUxlYWZsZXRFbGVtZW50KHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRSZWYgPSB1c2VSZWYoKTtcbiAgICAgICAgaWYgKCFlbGVtZW50UmVmLmN1cnJlbnQpIGVsZW1lbnRSZWYuY3VycmVudCA9IGNyZWF0ZUVsZW1lbnQocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICBjb25zdCBwcm9wc1JlZiA9IHVzZVJlZihwcm9wcyk7XG4gICAgICAgIGNvbnN0IHsgaW5zdGFuY2UgIH0gPSBlbGVtZW50UmVmLmN1cnJlbnQ7XG4gICAgICAgIHVzZUVmZmVjdChmdW5jdGlvbiB1cGRhdGVFbGVtZW50UHJvcHMoKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNSZWYuY3VycmVudCAhPT0gcHJvcHMpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVFbGVtZW50KGluc3RhbmNlLCBwcm9wcywgcHJvcHNSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgcHJvcHNSZWYuY3VycmVudCA9IHByb3BzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbXG4gICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgIHByb3BzLFxuICAgICAgICAgICAgY29udGV4dFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRSZWY7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUF0dHJpYnV0aW9uIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi5qcyc7XG5pbXBvcnQgeyB1c2VMZWFmbGV0Q29udGV4dCB9IGZyb20gJy4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyB1c2VFdmVudEhhbmRsZXJzIH0gZnJvbSAnLi9ldmVudHMuanMnO1xuaW1wb3J0IHsgd2l0aFBhbmUgfSBmcm9tICcuL3BhbmUuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUxheWVyTGlmZWN5Y2xlKGVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gYWRkTGF5ZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRleHQubGF5ZXJDb250YWluZXIgPz8gY29udGV4dC5tYXA7XG4gICAgICAgIGNvbnRhaW5lci5hZGRMYXllcihlbGVtZW50Lmluc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlbW92ZUxheWVyKCkge1xuICAgICAgICAgICAgY29udGV4dC5sYXllckNvbnRhaW5lcj8ucmVtb3ZlTGF5ZXIoZWxlbWVudC5pbnN0YW5jZSk7XG4gICAgICAgICAgICBjb250ZXh0Lm1hcC5yZW1vdmVMYXllcihlbGVtZW50Lmluc3RhbmNlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGVsZW1lbnRcbiAgICBdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYXllckhvb2sodXNlRWxlbWVudCkge1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VMYXllcihwcm9wcykge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdXNlTGVhZmxldENvbnRleHQoKTtcbiAgICAgICAgY29uc3QgZWxlbWVudFJlZiA9IHVzZUVsZW1lbnQod2l0aFBhbmUocHJvcHMsIGNvbnRleHQpLCBjb250ZXh0KTtcbiAgICAgICAgdXNlQXR0cmlidXRpb24oY29udGV4dC5tYXAsIHByb3BzLmF0dHJpYnV0aW9uKTtcbiAgICAgICAgdXNlRXZlbnRIYW5kbGVycyhlbGVtZW50UmVmLmN1cnJlbnQsIHByb3BzLmV2ZW50SGFuZGxlcnMpO1xuICAgICAgICB1c2VMYXllckxpZmVjeWNsZShlbGVtZW50UmVmLmN1cnJlbnQsIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gZWxlbWVudFJlZjtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGFpbmVyQ29tcG9uZW50LCBjcmVhdGVEaXZPdmVybGF5Q29tcG9uZW50LCBjcmVhdGVMZWFmQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQuanMnO1xuaW1wb3J0IHsgY3JlYXRlQ29udHJvbEhvb2sgfSBmcm9tICcuL2NvbnRyb2wuanMnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudEhvb2ssIGNyZWF0ZUVsZW1lbnRPYmplY3QgfSBmcm9tICcuL2VsZW1lbnQuanMnO1xuaW1wb3J0IHsgY3JlYXRlTGF5ZXJIb29rIH0gZnJvbSAnLi9sYXllci5qcyc7XG5pbXBvcnQgeyBjcmVhdGVEaXZPdmVybGF5SG9vayB9IGZyb20gJy4vZGl2LW92ZXJsYXkuanMnO1xuaW1wb3J0IHsgY3JlYXRlUGF0aEhvb2sgfSBmcm9tICcuL3BhdGguanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xDb21wb25lbnQoY3JlYXRlSW5zdGFuY2UpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50T2JqZWN0KGNyZWF0ZUluc3RhbmNlKHByb3BzKSwgY29udGV4dCk7XG4gICAgfVxuICAgIGNvbnN0IHVzZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50SG9vayhjcmVhdGVFbGVtZW50KTtcbiAgICBjb25zdCB1c2VDb250cm9sID0gY3JlYXRlQ29udHJvbEhvb2sodXNlRWxlbWVudCk7XG4gICAgcmV0dXJuIGNyZWF0ZUxlYWZDb21wb25lbnQodXNlQ29udHJvbCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGF5ZXJDb21wb25lbnQoY3JlYXRlRWxlbWVudCwgdXBkYXRlRWxlbWVudCkge1xuICAgIGNvbnN0IHVzZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50SG9vayhjcmVhdGVFbGVtZW50LCB1cGRhdGVFbGVtZW50KTtcbiAgICBjb25zdCB1c2VMYXllciA9IGNyZWF0ZUxheWVySG9vayh1c2VFbGVtZW50KTtcbiAgICByZXR1cm4gY3JlYXRlQ29udGFpbmVyQ29tcG9uZW50KHVzZUxheWVyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5Q29tcG9uZW50KGNyZWF0ZUVsZW1lbnQsIHVzZUxpZmVjeWNsZSkge1xuICAgIGNvbnN0IHVzZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50SG9vayhjcmVhdGVFbGVtZW50KTtcbiAgICBjb25zdCB1c2VPdmVybGF5ID0gY3JlYXRlRGl2T3ZlcmxheUhvb2sodXNlRWxlbWVudCwgdXNlTGlmZWN5Y2xlKTtcbiAgICByZXR1cm4gY3JlYXRlRGl2T3ZlcmxheUNvbXBvbmVudCh1c2VPdmVybGF5KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXRoQ29tcG9uZW50KGNyZWF0ZUVsZW1lbnQsIHVwZGF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCB1c2VFbGVtZW50ID0gY3JlYXRlRWxlbWVudEhvb2soY3JlYXRlRWxlbWVudCwgdXBkYXRlRWxlbWVudCk7XG4gICAgY29uc3QgdXNlUGF0aCA9IGNyZWF0ZVBhdGhIb29rKHVzZUVsZW1lbnQpO1xuICAgIHJldHVybiBjcmVhdGVDb250YWluZXJDb21wb25lbnQodXNlUGF0aCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGlsZUxheWVyQ29tcG9uZW50KGNyZWF0ZUVsZW1lbnQsIHVwZGF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCB1c2VFbGVtZW50ID0gY3JlYXRlRWxlbWVudEhvb2soY3JlYXRlRWxlbWVudCwgdXBkYXRlRWxlbWVudCk7XG4gICAgY29uc3QgdXNlTGF5ZXIgPSBjcmVhdGVMYXllckhvb2sodXNlRWxlbWVudCk7XG4gICAgcmV0dXJuIGNyZWF0ZUxlYWZDb21wb25lbnQodXNlTGF5ZXIpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRMYXllcihsYXllciwgcHJvcHMsIHByZXZQcm9wcykge1xuICAgIGNvbnN0IHsgb3BhY2l0eSAsIHpJbmRleCAgfSA9IHByb3BzO1xuICAgIGlmIChvcGFjaXR5ICE9IG51bGwgJiYgb3BhY2l0eSAhPT0gcHJldlByb3BzLm9wYWNpdHkpIHtcbiAgICAgICAgbGF5ZXIuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICB9XG4gICAgaWYgKHpJbmRleCAhPSBudWxsICYmIHpJbmRleCAhPT0gcHJldlByb3BzLnpJbmRleCkge1xuICAgICAgICBsYXllci5zZXRaSW5kZXgoekluZGV4KTtcbiAgICB9XG59XG4iLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHNvdXJjZSl7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuICAgIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuaW1wb3J0IHsgTGVhZmxldFByb3ZpZGVyLCBjcmVhdGVMZWFmbGV0Q29udGV4dCB9IGZyb20gJ0ByZWFjdC1sZWFmbGV0L2NvcmUnO1xuaW1wb3J0IHsgTWFwIGFzIExlYWZsZXRNYXAgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VJbXBlcmF0aXZlSGFuZGxlLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmZ1bmN0aW9uIE1hcENvbnRhaW5lckNvbXBvbmVudCh7IGJvdW5kcyAsIGJvdW5kc09wdGlvbnMgLCBjZW50ZXIgLCBjaGlsZHJlbiAsIGNsYXNzTmFtZSAsIGlkICwgcGxhY2Vob2xkZXIgLCBzdHlsZSAsIHdoZW5SZWFkeSAsIHpvb20gLCAuLi5vcHRpb25zIH0sIGZvcndhcmRlZFJlZikge1xuICAgIGNvbnN0IFtwcm9wc10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgaWQsXG4gICAgICAgIHN0eWxlXG4gICAgfSk7XG4gICAgY29uc3QgW2NvbnRleHQsIHNldENvbnRleHRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZShmb3J3YXJkZWRSZWYsICgpPT5jb250ZXh0Py5tYXAgPz8gbnVsbCwgW1xuICAgICAgICBjb250ZXh0XG4gICAgXSk7XG4gICAgY29uc3QgbWFwUmVmID0gdXNlQ2FsbGJhY2soKG5vZGUpPT57XG4gICAgICAgIGlmIChub2RlICE9PSBudWxsICYmIGNvbnRleHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcCA9IG5ldyBMZWFmbGV0TWFwKG5vZGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGNlbnRlciAhPSBudWxsICYmIHpvb20gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1hcC5zZXRWaWV3KGNlbnRlciwgem9vbSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJvdW5kcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMsIGJvdW5kc09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdoZW5SZWFkeSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFwLndoZW5SZWFkeSh3aGVuUmVhZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Q29udGV4dChjcmVhdGVMZWFmbGV0Q29udGV4dChtYXApKTtcbiAgICAgICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgICB9LCBbXSk7XG4gICAgdXNlRWZmZWN0KCgpPT57XG4gICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgY29udGV4dD8ubWFwLnJlbW92ZSgpO1xuICAgICAgICB9O1xuICAgIH0sIFtcbiAgICAgICAgY29udGV4dFxuICAgIF0pO1xuICAgIGNvbnN0IGNvbnRlbnRzID0gY29udGV4dCA/IC8qI19fUFVSRV9fKi8gUmVhY3QuY3JlYXRlRWxlbWVudChMZWFmbGV0UHJvdmlkZXIsIHtcbiAgICAgICAgdmFsdWU6IGNvbnRleHRcbiAgICB9LCBjaGlsZHJlbikgOiBwbGFjZWhvbGRlciA/PyBudWxsO1xuICAgIHJldHVybiAvKiNfX1BVUkVfXyovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICAgIHJlZjogbWFwUmVmXG4gICAgfSksIGNvbnRlbnRzKTtcbn1cbmV4cG9ydCBjb25zdCBNYXBDb250YWluZXIgPSAvKiNfX1BVUkVfXyovIGZvcndhcmRSZWYoTWFwQ29udGFpbmVyQ29tcG9uZW50KTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnRPYmplY3QsIGNyZWF0ZUxheWVyQ29tcG9uZW50LCBleHRlbmRDb250ZXh0IH0gZnJvbSAnQHJlYWN0LWxlYWZsZXQvY29yZSc7XG5pbXBvcnQgeyBNYXJrZXIgYXMgTGVhZmxldE1hcmtlciB9IGZyb20gJ2xlYWZsZXQnO1xuZXhwb3J0IGNvbnN0IE1hcmtlciA9IGNyZWF0ZUxheWVyQ29tcG9uZW50KGZ1bmN0aW9uIGNyZWF0ZU1hcmtlcih7IHBvc2l0aW9uICwgLi4ub3B0aW9ucyB9LCBjdHgpIHtcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgTGVhZmxldE1hcmtlcihwb3NpdGlvbiwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnRPYmplY3QobWFya2VyLCBleHRlbmRDb250ZXh0KGN0eCwge1xuICAgICAgICBvdmVybGF5Q29udGFpbmVyOiBtYXJrZXJcbiAgICB9KSk7XG59LCBmdW5jdGlvbiB1cGRhdGVNYXJrZXIobWFya2VyLCBwcm9wcywgcHJldlByb3BzKSB7XG4gICAgaWYgKHByb3BzLnBvc2l0aW9uICE9PSBwcmV2UHJvcHMucG9zaXRpb24pIHtcbiAgICAgICAgbWFya2VyLnNldExhdExuZyhwcm9wcy5wb3NpdGlvbik7XG4gICAgfVxuICAgIGlmIChwcm9wcy5pY29uICE9IG51bGwgJiYgcHJvcHMuaWNvbiAhPT0gcHJldlByb3BzLmljb24pIHtcbiAgICAgICAgbWFya2VyLnNldEljb24ocHJvcHMuaWNvbik7XG4gICAgfVxuICAgIGlmIChwcm9wcy56SW5kZXhPZmZzZXQgIT0gbnVsbCAmJiBwcm9wcy56SW5kZXhPZmZzZXQgIT09IHByZXZQcm9wcy56SW5kZXhPZmZzZXQpIHtcbiAgICAgICAgbWFya2VyLnNldFpJbmRleE9mZnNldChwcm9wcy56SW5kZXhPZmZzZXQpO1xuICAgIH1cbiAgICBpZiAocHJvcHMub3BhY2l0eSAhPSBudWxsICYmIHByb3BzLm9wYWNpdHkgIT09IHByZXZQcm9wcy5vcGFjaXR5KSB7XG4gICAgICAgIG1hcmtlci5zZXRPcGFjaXR5KHByb3BzLm9wYWNpdHkpO1xuICAgIH1cbiAgICBpZiAobWFya2VyLmRyYWdnaW5nICE9IG51bGwgJiYgcHJvcHMuZHJhZ2dhYmxlICE9PSBwcmV2UHJvcHMuZHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmIChwcm9wcy5kcmFnZ2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG1hcmtlci5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlci5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnRPYmplY3QsIGNyZWF0ZU92ZXJsYXlDb21wb25lbnQgfSBmcm9tICdAcmVhY3QtbGVhZmxldC9jb3JlJztcbmltcG9ydCB7IFBvcHVwIGFzIExlYWZsZXRQb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuZXhwb3J0IGNvbnN0IFBvcHVwID0gY3JlYXRlT3ZlcmxheUNvbXBvbmVudChmdW5jdGlvbiBjcmVhdGVQb3B1cChwcm9wcywgY29udGV4dCkge1xuICAgIGNvbnN0IHBvcHVwID0gbmV3IExlYWZsZXRQb3B1cChwcm9wcywgY29udGV4dC5vdmVybGF5Q29udGFpbmVyKTtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudE9iamVjdChwb3B1cCwgY29udGV4dCk7XG59LCBmdW5jdGlvbiB1c2VQb3B1cExpZmVjeWNsZShlbGVtZW50LCBjb250ZXh0LCB7IHBvc2l0aW9uICB9LCBzZXRPcGVuKSB7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uIGFkZFBvcHVwKCkge1xuICAgICAgICBjb25zdCB7IGluc3RhbmNlICB9ID0gZWxlbWVudDtcbiAgICAgICAgZnVuY3Rpb24gb25Qb3B1cE9wZW4oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5wb3B1cCA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUG9wdXBDbG9zZShldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnBvcHVwID09PSBpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQubWFwLm9uKHtcbiAgICAgICAgICAgIHBvcHVwb3Blbjogb25Qb3B1cE9wZW4sXG4gICAgICAgICAgICBwb3B1cGNsb3NlOiBvblBvcHVwQ2xvc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb250ZXh0Lm92ZXJsYXlDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gQXR0YWNoIHRvIGEgTWFwXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldExhdExuZyhwb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZS5vcGVuT24oY29udGV4dC5tYXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQXR0YWNoIHRvIGNvbnRhaW5lciBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbnRleHQub3ZlcmxheUNvbnRhaW5lci5iaW5kUG9wdXAoaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiByZW1vdmVQb3B1cCgpIHtcbiAgICAgICAgICAgIGNvbnRleHQubWFwLm9mZih7XG4gICAgICAgICAgICAgICAgcG9wdXBvcGVuOiBvblBvcHVwT3BlbixcbiAgICAgICAgICAgICAgICBwb3B1cGNsb3NlOiBvblBvcHVwQ2xvc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGV4dC5vdmVybGF5Q29udGFpbmVyPy51bmJpbmRQb3B1cCgpO1xuICAgICAgICAgICAgY29udGV4dC5tYXAucmVtb3ZlTGF5ZXIoaW5zdGFuY2UpO1xuICAgICAgICB9O1xuICAgIH0sIFtcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgc2V0T3BlbixcbiAgICAgICAgcG9zaXRpb25cbiAgICBdKTtcbn0pO1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudE9iamVjdCwgY3JlYXRlVGlsZUxheWVyQ29tcG9uZW50LCB1cGRhdGVHcmlkTGF5ZXIsIHdpdGhQYW5lIH0gZnJvbSAnQHJlYWN0LWxlYWZsZXQvY29yZSc7XG5pbXBvcnQgeyBUaWxlTGF5ZXIgYXMgTGVhZmxldFRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuZXhwb3J0IGNvbnN0IFRpbGVMYXllciA9IGNyZWF0ZVRpbGVMYXllckNvbXBvbmVudChmdW5jdGlvbiBjcmVhdGVUaWxlTGF5ZXIoeyB1cmwgLCAuLi5vcHRpb25zIH0sIGNvbnRleHQpIHtcbiAgICBjb25zdCBsYXllciA9IG5ldyBMZWFmbGV0VGlsZUxheWVyKHVybCwgd2l0aFBhbmUob3B0aW9ucywgY29udGV4dCkpO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50T2JqZWN0KGxheWVyLCBjb250ZXh0KTtcbn0sIGZ1bmN0aW9uIHVwZGF0ZVRpbGVMYXllcihsYXllciwgcHJvcHMsIHByZXZQcm9wcykge1xuICAgIHVwZGF0ZUdyaWRMYXllcihsYXllciwgcHJvcHMsIHByZXZQcm9wcyk7XG4gICAgY29uc3QgeyB1cmwgIH0gPSBwcm9wcztcbiAgICBpZiAodXJsICE9IG51bGwgJiYgdXJsICE9PSBwcmV2UHJvcHMudXJsKSB7XG4gICAgICAgIGxheWVyLnNldFVybCh1cmwpO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbInVzZUF0dHJpYnV0aW9uIiwibWFwIiwiYXR0cmlidXRpb24iLCJhdHRyaWJ1dGlvblJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsIkNPTlRFWFRfVkVSU0lPTiIsImNyZWF0ZUxlYWZsZXRDb250ZXh0IiwiZXh0ZW5kQ29udGV4dCIsInNvdXJjZSIsImV4dHJhIiwiTGVhZmxldENvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiTGVhZmxldFByb3ZpZGVyIiwidXNlTGVhZmxldENvbnRleHQiLCJjb250ZXh0IiwidXNlQ29udGV4dCIsImNyZWF0ZUNvbnRhaW5lckNvbXBvbmVudCIsInVzZUVsZW1lbnQiLCJDb250YWluZXJDb21wb25lbnQiLCJwcm9wcyIsImZvcndhcmRlZFJlZiIsImluc3RhbmNlIiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsIlJlYWN0IiwiZm9yd2FyZFJlZiIsImNyZWF0ZURpdk92ZXJsYXlDb21wb25lbnQiLCJPdmVybGF5Q29tcG9uZW50IiwiaXNPcGVuIiwic2V0T3BlbiIsInVzZVN0YXRlIiwiY29udGVudE5vZGUiLCJjcmVhdGVQb3J0YWwiLCJjcmVhdGVMZWFmQ29tcG9uZW50IiwiTGVhZkNvbXBvbmVudCIsInVzZUV2ZW50SGFuZGxlcnMiLCJlbGVtZW50IiwiZXZlbnRIYW5kbGVycyIsImV2ZW50SGFuZGxlcnNSZWYiLCJ3aXRoUGFuZSIsInBhbmUiLCJjcmVhdGVEaXZPdmVybGF5SG9vayIsInVzZUxpZmVjeWNsZSIsImVsZW1lbnRSZWYiLCJjcmVhdGVFbGVtZW50T2JqZWN0IiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudEhvb2siLCJjcmVhdGVFbGVtZW50IiwidXBkYXRlRWxlbWVudCIsInByb3BzUmVmIiwidXNlTGF5ZXJMaWZlY3ljbGUiLCJfYSIsImNyZWF0ZUxheWVySG9vayIsImNyZWF0ZUxheWVyQ29tcG9uZW50IiwidXNlTGF5ZXIiLCJjcmVhdGVPdmVybGF5Q29tcG9uZW50IiwidXNlT3ZlcmxheSIsImNyZWF0ZVRpbGVMYXllckNvbXBvbmVudCIsInVwZGF0ZUdyaWRMYXllciIsImxheWVyIiwicHJldlByb3BzIiwib3BhY2l0eSIsInpJbmRleCIsIl9leHRlbmRzIiwidGFyZ2V0IiwiaSIsImtleSIsIk1hcENvbnRhaW5lckNvbXBvbmVudCIsImJvdW5kcyIsImJvdW5kc09wdGlvbnMiLCJjZW50ZXIiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImlkIiwicGxhY2Vob2xkZXIiLCJzdHlsZSIsIndoZW5SZWFkeSIsInpvb20iLCJvcHRpb25zIiwic2V0Q29udGV4dCIsIm1hcFJlZiIsInVzZUNhbGxiYWNrIiwibm9kZSIsIkxlYWZsZXRNYXAiLCJjb250ZW50cyIsIk1hcENvbnRhaW5lciIsIk1hcmtlciIsInBvc2l0aW9uIiwiY3R4IiwibWFya2VyIiwiTGVhZmxldE1hcmtlciIsIlBvcHVwIiwicG9wdXAiLCJMZWFmbGV0UG9wdXAiLCJvblBvcHVwT3BlbiIsImV2ZW50Iiwib25Qb3B1cENsb3NlIiwiVGlsZUxheWVyIiwidXJsIiwiTGVhZmxldFRpbGVMYXllciJdLCJtYXBwaW5ncyI6InFJQUNPLFNBQVNBLEVBQWVDLEVBQUtDLEVBQWEsQ0FDN0MsTUFBTUMsRUFBaUJDLFNBQU9GLENBQVcsRUFDekNHLEVBQVMsVUFBQyxVQUE2QixDQUMvQkgsSUFBZ0JDLEVBQWUsU0FBV0YsRUFBSSxvQkFBc0IsT0FDaEVFLEVBQWUsU0FBVyxNQUMxQkYsRUFBSSxtQkFBbUIsa0JBQWtCRSxFQUFlLE9BQU8sRUFFL0RELEdBQWUsTUFDZkQsRUFBSSxtQkFBbUIsZUFBZUMsQ0FBVyxHQUd6REMsRUFBZSxRQUFVRCxDQUNqQyxFQUFPLENBQ0NELEVBQ0FDLENBQ1IsQ0FBSyxDQUNMLENDaEJPLE1BQU1JLEVBQWtCLEVBQ3hCLFNBQVNDLEVBQXFCTixFQUFLLENBQ3RDLE9BQU8sT0FBTyxPQUFPLENBQ2pCLFVBQVdLLEVBQ1gsSUFBQUwsQ0FDUixDQUFLLENBQ0wsQ0FDTyxTQUFTTyxFQUFjQyxFQUFRQyxFQUFPLENBQ3pDLE9BQU8sT0FBTyxPQUFPLENBQ2pCLEdBQUdELEVBQ0gsR0FBR0MsQ0FDWCxDQUFLLENBQ0wsQ0FDTyxNQUFNQyxFQUFpQkMsRUFBQUEsY0FBYyxJQUFJLEVBQ25DQyxFQUFrQkYsRUFBZSxTQUN2QyxTQUFTRyxHQUFvQixDQUNoQyxNQUFNQyxFQUFVQyxhQUFXTCxDQUFjLEVBQ3pDLEdBQUlJLEdBQVcsS0FDWCxNQUFNLElBQUksTUFBTSw2RkFBNkYsRUFFakgsT0FBT0EsQ0FDWCxDQ25CTyxTQUFTRSxFQUF5QkMsRUFBWSxDQUNqRCxTQUFTQyxFQUFtQkMsRUFBT0MsRUFBYyxDQUM3QyxLQUFNLENBQUUsU0FBQUMsRUFBVyxRQUFBUCxDQUFPLEVBQU1HLEVBQVdFLENBQUssRUFBRSxRQUNsREcsT0FBQUEsc0JBQW9CRixFQUFjLElBQUlDLENBQVEsRUFDdkNGLEVBQU0sVUFBWSxLQUFPLEtBQXFCSSxFQUFNLGNBQWNYLEVBQWlCLENBQ3RGLE1BQU9FLENBQ25CLEVBQVdLLEVBQU0sUUFBUSxDQUNwQixDQUNELE9BQXFCSyxFQUFBQSxXQUFXTixDQUFrQixDQUN0RCxDQUNPLFNBQVNPLEVBQTBCUixFQUFZLENBQ2xELFNBQVNTLEVBQWlCUCxFQUFPQyxFQUFjLENBQzNDLEtBQU0sQ0FBQ08sRUFBUUMsQ0FBTyxFQUFJQyxFQUFRLFNBQUMsRUFBSyxFQUNsQyxDQUFFLFNBQUFSLENBQVEsRUFBTUosRUFBV0UsRUFBT1MsQ0FBTyxFQUFFLFFBQ2pETixzQkFBb0JGLEVBQWMsSUFBSUMsQ0FBUSxFQUM5Q2pCLEVBQVMsVUFBQyxVQUF5QixDQUMzQnVCLEdBQ0FOLEVBQVMsT0FBTSxDQUUvQixFQUFXLENBQ0NBLEVBQ0FNLEVBQ0FSLEVBQU0sUUFDbEIsQ0FBUyxFQUVELE1BQU1XLEVBQWNULEVBQVMsYUFDN0IsT0FBT1MsRUFBNEJDLEVBQUFBLGFBQWFaLEVBQU0sU0FBVVcsQ0FBVyxFQUFJLElBQ2xGLENBQ0QsT0FBcUJOLEVBQUFBLFdBQVdFLENBQWdCLENBQ3BELENBQ08sU0FBU00sRUFBb0JmLEVBQVksQ0FDNUMsU0FBU2dCLEVBQWNkLEVBQU9DLEVBQWMsQ0FDeEMsS0FBTSxDQUFFLFNBQUFDLENBQVcsRUFBR0osRUFBV0UsQ0FBSyxFQUFFLFFBQ3hDRyxPQUFBQSxzQkFBb0JGLEVBQWMsSUFBSUMsQ0FBUSxFQUN2QyxJQUNWLENBQ0QsT0FBcUJHLEVBQUFBLFdBQVdTLENBQWEsQ0FDakQsQ0N2Q08sU0FBU0MsRUFBaUJDLEVBQVNDLEVBQWUsQ0FDckQsTUFBTUMsRUFBbUJsQyxFQUFBQSxTQUN6QkMsRUFBUyxVQUFDLFVBQTRCLENBQ2xDLE9BQUlnQyxHQUFpQixNQUNqQkQsRUFBUSxTQUFTLEdBQUdDLENBQWEsRUFFckNDLEVBQWlCLFFBQVVELEVBQ3BCLFVBQStCLENBQzlCQyxFQUFpQixTQUFXLE1BQzVCRixFQUFRLFNBQVMsSUFBSUUsRUFBaUIsT0FBTyxFQUVqREEsRUFBaUIsUUFBVSxJQUN2QyxDQUNBLEVBQU8sQ0FDQ0YsRUFDQUMsQ0FDUixDQUFLLENBQ0wsQ0NsQk8sU0FBU0UsRUFBU25CLEVBQU9MLEVBQVMsQ0FDckMsTUFBTXlCLEVBQU9wQixFQUFNLE1BQVFMLEVBQVEsS0FDbkMsT0FBT3lCLEVBQU8sQ0FDVixHQUFHcEIsRUFDSCxLQUFBb0IsQ0FDSCxFQUFHcEIsQ0FDUixDQ0ZPLFNBQVNxQixFQUFxQnZCLEVBQVl3QixFQUFjLENBQzNELE9BQU8sU0FBdUJ0QixFQUFPUyxFQUFTLENBQzFDLE1BQU1kLEVBQVVELElBQ1Y2QixFQUFhekIsRUFBV3FCLEVBQVNuQixFQUFPTCxDQUFPLEVBQUdBLENBQU8sRUFDL0QsT0FBQWYsRUFBZWUsRUFBUSxJQUFLSyxFQUFNLFdBQVcsRUFDN0NlLEVBQWlCUSxFQUFXLFFBQVN2QixFQUFNLGFBQWEsRUFDeERzQixFQUFhQyxFQUFXLFFBQVM1QixFQUFTSyxFQUFPUyxDQUFPLEVBQ2pEYyxDQUNmLENBQ0EsQ0NaTyxTQUFTQyxFQUFvQnRCLEVBQVVQLEVBQVM4QixFQUFXLENBQzlELE9BQU8sT0FBTyxPQUFPLENBQ2pCLFNBQUF2QixFQUNBLFFBQUFQLEVBQ0EsVUFBQThCLENBQ1IsQ0FBSyxDQUNMLENBQ08sU0FBU0MsRUFBa0JDLEVBQWVDLEVBQWUsQ0FDNUQsT0FBSUEsR0FBaUIsS0FDVixTQUFvQzVCLEVBQU9MLEVBQVMsQ0FDdkQsTUFBTTRCLEVBQWF2QyxFQUFBQSxTQUNuQixPQUFLdUMsRUFBVyxVQUFTQSxFQUFXLFFBQVVJLEVBQWMzQixFQUFPTCxDQUFPLEdBQ25FNEIsQ0FDbkIsRUFFVyxTQUFrQ3ZCLEVBQU9MLEVBQVMsQ0FDckQsTUFBTTRCLEVBQWF2QyxFQUFBQSxTQUNkdUMsRUFBVyxVQUFTQSxFQUFXLFFBQVVJLEVBQWMzQixFQUFPTCxDQUFPLEdBQzFFLE1BQU1rQyxFQUFXN0MsU0FBT2dCLENBQUssRUFDdkIsQ0FBRSxTQUFBRSxDQUFRLEVBQU1xQixFQUFXLFFBQ2pDdEMsT0FBQUEsRUFBUyxVQUFDLFVBQThCLENBQ2hDNEMsRUFBUyxVQUFZN0IsSUFDckI0QixFQUFjMUIsRUFBVUYsRUFBTzZCLEVBQVMsT0FBTyxFQUMvQ0EsRUFBUyxRQUFVN0IsRUFFbkMsRUFBVyxDQUNDRSxFQUNBRixFQUNBTCxDQUNaLENBQVMsRUFDTTRCLENBQ2YsQ0FDQSxDQzVCTyxTQUFTTyxFQUFrQmQsRUFBU3JCLEVBQVMsQ0FDaERWLEVBQVMsVUFBQyxVQUFvQixDQUUxQixPQURrQlUsRUFBUSxnQkFBa0JBLEVBQVEsS0FDMUMsU0FBU3FCLEVBQVEsUUFBUSxFQUM1QixVQUF1QixRQUMxQmUsRUFBQXBDLEVBQVEsaUJBQVIsTUFBQW9DLEVBQXdCLFlBQVlmLEVBQVEsVUFDNUNyQixFQUFRLElBQUksWUFBWXFCLEVBQVEsUUFBUSxDQUNwRCxDQUNBLEVBQU8sQ0FDQ3JCLEVBQ0FxQixDQUNSLENBQUssQ0FDTCxDQUNPLFNBQVNnQixFQUFnQmxDLEVBQVksQ0FDeEMsT0FBTyxTQUFrQkUsRUFBTyxDQUM1QixNQUFNTCxFQUFVRCxJQUNWNkIsRUFBYXpCLEVBQVdxQixFQUFTbkIsRUFBT0wsQ0FBTyxFQUFHQSxDQUFPLEVBQy9ELE9BQUFmLEVBQWVlLEVBQVEsSUFBS0ssRUFBTSxXQUFXLEVBQzdDZSxFQUFpQlEsRUFBVyxRQUFTdkIsRUFBTSxhQUFhLEVBQ3hEOEIsRUFBa0JQLEVBQVcsUUFBUzVCLENBQU8sRUFDdEM0QixDQUNmLENBQ0EsQ0NiTyxTQUFTVSxFQUFxQk4sRUFBZUMsRUFBZSxDQUMvRCxNQUFNOUIsRUFBYTRCLEVBQWtCQyxFQUFlQyxDQUFhLEVBQzNETSxFQUFXRixFQUFnQmxDLENBQVUsRUFDM0MsT0FBT0QsRUFBeUJxQyxDQUFRLENBQzVDLENBQ08sU0FBU0MsRUFBdUJSLEVBQWVMLEVBQWMsQ0FDaEUsTUFBTXhCLEVBQWE0QixFQUFrQkMsQ0FBYSxFQUM1Q1MsRUFBYWYsRUFBcUJ2QixFQUFZd0IsQ0FBWSxFQUNoRSxPQUFPaEIsRUFBMEI4QixDQUFVLENBQy9DLENBTU8sU0FBU0MsRUFBeUJWLEVBQWVDLEVBQWUsQ0FDbkUsTUFBTTlCLEVBQWE0QixFQUFrQkMsRUFBZUMsQ0FBYSxFQUMzRE0sRUFBV0YsRUFBZ0JsQyxDQUFVLEVBQzNDLE9BQU9lLEVBQW9CcUIsQ0FBUSxDQUN2QyxDQ2pDTyxTQUFTSSxFQUFnQkMsRUFBT3ZDLEVBQU93QyxFQUFXLENBQ3JELEtBQU0sQ0FBRSxRQUFBQyxFQUFVLE9BQUFDLENBQVMsRUFBRzFDLEVBQzFCeUMsR0FBVyxNQUFRQSxJQUFZRCxFQUFVLFNBQ3pDRCxFQUFNLFdBQVdFLENBQU8sRUFFeEJDLEdBQVUsTUFBUUEsSUFBV0YsRUFBVSxRQUN2Q0QsRUFBTSxVQUFVRyxDQUFNLENBRTlCLENDUkEsU0FBU0MsR0FBVyxDQUNoQixPQUFBQSxFQUFXLE9BQU8sUUFBVSxTQUFTQyxFQUFRLENBQ3pDLFFBQVFDLEVBQUksRUFBR0EsRUFBSSxVQUFVLE9BQVFBLElBQUksQ0FDckMsSUFBSXhELEVBQVMsVUFBVXdELENBQUMsRUFDeEIsUUFBUUMsS0FBT3pELEVBQ1AsT0FBTyxVQUFVLGVBQWUsS0FBS0EsRUFBUXlELENBQUcsSUFDaERGLEVBQU9FLENBQUcsRUFBSXpELEVBQU95RCxDQUFHLEVBR25DLENBQ0QsT0FBT0YsQ0FDZixFQUNXRCxFQUFTLE1BQU0sS0FBTSxTQUFTLENBQ3pDLENBSUEsU0FBU0ksRUFBc0IsQ0FBRSxPQUFBQyxFQUFTLGNBQUFDLEVBQWdCLE9BQUFDLEVBQVMsU0FBQUMsRUFBVyxVQUFBQyxFQUFZLEdBQUFDLEVBQUssWUFBQUMsRUFBYyxNQUFBQyxFQUFRLFVBQUFDLEVBQVksS0FBQUMsRUFBTyxHQUFHQyxDQUFPLEVBQUl6RCxFQUFjLENBQ2hLLEtBQU0sQ0FBQ0QsQ0FBSyxFQUFJVSxXQUFTLENBQ3JCLFVBQUEwQyxFQUNBLEdBQUFDLEVBQ0EsTUFBQUUsQ0FDUixDQUFLLEVBQ0ssQ0FBQzVELEVBQVNnRSxDQUFVLEVBQUlqRCxFQUFRLFNBQUMsSUFBSSxFQUMzQ1AsRUFBQUEsb0JBQW9CRixFQUFjLEtBQUlOLEdBQUEsWUFBQUEsRUFBUyxNQUFPLEtBQU0sQ0FDeERBLENBQ1IsQ0FBSyxFQUNELE1BQU1pRSxFQUFTQyxjQUFhQyxHQUFPLENBQy9CLEdBQUlBLElBQVMsTUFBUW5FLElBQVksS0FBTSxDQUNuQyxNQUFNZCxFQUFNLElBQUlrRixFQUFBQSxJQUFXRCxFQUFNSixDQUFPLEVBQ3BDUixHQUFVLE1BQVFPLEdBQVEsS0FDMUI1RSxFQUFJLFFBQVFxRSxFQUFRTyxDQUFJLEVBQ2pCVCxHQUFVLE1BQ2pCbkUsRUFBSSxVQUFVbUUsRUFBUUMsQ0FBYSxFQUVuQ08sR0FBYSxNQUNiM0UsRUFBSSxVQUFVMkUsQ0FBUyxFQUUzQkcsRUFBV3hFLEVBQXFCTixDQUFHLENBQUMsQ0FDdkMsQ0FFSixFQUFFLENBQUUsQ0FBQSxFQUNMSSxFQUFBQSxVQUFVLElBQ0MsSUFBSSxDQUNQVSxHQUFBLE1BQUFBLEVBQVMsSUFBSSxRQUN6QixFQUNPLENBQ0NBLENBQ1IsQ0FBSyxFQUNELE1BQU1xRSxFQUFXckUsRUFBd0JTLEVBQU0sY0FBY1gsRUFBaUIsQ0FDMUUsTUFBT0UsQ0FDZixFQUFPd0QsQ0FBUSxFQUFJRyxHQUFlLEtBQzlCLE9BQXFCbEQsRUFBTSxjQUFjLE1BQU91QyxFQUFTLENBQUEsRUFBSTNDLEVBQU8sQ0FDaEUsSUFBSzRELENBQ2IsQ0FBSyxFQUFHSSxDQUFRLENBQ2hCLENBQ1ksTUFBQ0MsRUFBNkI1RCxFQUFVLFdBQUMwQyxDQUFxQixFQ3REN0RtQixFQUFTakMsRUFBcUIsU0FBc0IsQ0FBRSxTQUFBa0MsRUFBVyxHQUFHVCxDQUFTLEVBQUVVLEVBQUssQ0FDN0YsTUFBTUMsRUFBUyxJQUFJQyxFQUFBQSxPQUFjSCxFQUFVVCxDQUFPLEVBQ2xELE9BQU9sQyxFQUFvQjZDLEVBQVFqRixFQUFjZ0YsRUFBSyxDQUNsRCxpQkFBa0JDLENBQ3JCLENBQUEsQ0FBQyxDQUNOLEVBQUcsU0FBc0JBLEVBQVFyRSxFQUFPd0MsRUFBVyxDQUMzQ3hDLEVBQU0sV0FBYXdDLEVBQVUsVUFDN0I2QixFQUFPLFVBQVVyRSxFQUFNLFFBQVEsRUFFL0JBLEVBQU0sTUFBUSxNQUFRQSxFQUFNLE9BQVN3QyxFQUFVLE1BQy9DNkIsRUFBTyxRQUFRckUsRUFBTSxJQUFJLEVBRXpCQSxFQUFNLGNBQWdCLE1BQVFBLEVBQU0sZUFBaUJ3QyxFQUFVLGNBQy9ENkIsRUFBTyxnQkFBZ0JyRSxFQUFNLFlBQVksRUFFekNBLEVBQU0sU0FBVyxNQUFRQSxFQUFNLFVBQVl3QyxFQUFVLFNBQ3JENkIsRUFBTyxXQUFXckUsRUFBTSxPQUFPLEVBRS9CcUUsRUFBTyxVQUFZLE1BQVFyRSxFQUFNLFlBQWN3QyxFQUFVLFlBQ3JEeEMsRUFBTSxZQUFjLEdBQ3BCcUUsRUFBTyxTQUFTLFNBRWhCQSxFQUFPLFNBQVMsVUFHNUIsQ0FBQyxFQ3hCWUUsRUFBUXBDLEVBQXVCLFNBQXFCbkMsRUFBT0wsRUFBUyxDQUM3RSxNQUFNNkUsRUFBUSxJQUFJQyxFQUFZLE1BQUN6RSxFQUFPTCxFQUFRLGdCQUFnQixFQUM5RCxPQUFPNkIsRUFBb0JnRCxFQUFPN0UsQ0FBTyxDQUM3QyxFQUFHLFNBQTJCcUIsRUFBU3JCLEVBQVMsQ0FBRSxTQUFBd0UsQ0FBVyxFQUFFMUQsRUFBUyxDQUNwRXhCLEVBQVMsVUFBQyxVQUFvQixDQUMxQixLQUFNLENBQUUsU0FBQWlCLENBQVcsRUFBR2MsRUFDdEIsU0FBUzBELEVBQVlDLEVBQU8sQ0FDcEJBLEVBQU0sUUFBVXpFLElBQ2hCQSxFQUFTLE9BQU0sRUFDZk8sRUFBUSxFQUFJLEVBRW5CLENBQ0QsU0FBU21FLEVBQWFELEVBQU8sQ0FDckJBLEVBQU0sUUFBVXpFLEdBQ2hCTyxFQUFRLEVBQUssQ0FFcEIsQ0FDRCxPQUFBZCxFQUFRLElBQUksR0FBRyxDQUNYLFVBQVcrRSxFQUNYLFdBQVlFLENBQ3hCLENBQVMsRUFDR2pGLEVBQVEsa0JBQW9CLE1BRXhCd0UsR0FBWSxNQUNaakUsRUFBUyxVQUFVaUUsQ0FBUSxFQUUvQmpFLEVBQVMsT0FBT1AsRUFBUSxHQUFHLEdBRzNCQSxFQUFRLGlCQUFpQixVQUFVTyxDQUFRLEVBRXhDLFVBQXVCLE9BQzFCUCxFQUFRLElBQUksSUFBSSxDQUNaLFVBQVcrRSxFQUNYLFdBQVlFLENBQzVCLENBQWEsR0FDRDdDLEVBQUFwQyxFQUFRLG1CQUFSLE1BQUFvQyxFQUEwQixjQUMxQnBDLEVBQVEsSUFBSSxZQUFZTyxDQUFRLENBQzVDLENBQ0EsRUFBTyxDQUNDYyxFQUNBckIsRUFDQWMsRUFDQTBELENBQ1IsQ0FBSyxDQUNMLENBQUMsRUM5Q1lVLEVBQVl4QyxFQUF5QixTQUF5QixDQUFFLElBQUF5QyxFQUFNLEdBQUdwQixDQUFTLEVBQUUvRCxFQUFTLENBQ3RHLE1BQU00QyxFQUFRLElBQUl3QyxZQUFpQkQsRUFBSzNELEVBQVN1QyxFQUFTL0QsQ0FBTyxDQUFDLEVBQ2xFLE9BQU82QixFQUFvQmUsRUFBTzVDLENBQU8sQ0FDN0MsRUFBRyxTQUF5QjRDLEVBQU92QyxFQUFPd0MsRUFBVyxDQUNqREYsRUFBZ0JDLEVBQU92QyxFQUFPd0MsQ0FBUyxFQUN2QyxLQUFNLENBQUUsSUFBQXNDLENBQU0sRUFBRzlFLEVBQ2I4RSxHQUFPLE1BQVFBLElBQVF0QyxFQUFVLEtBQ2pDRCxFQUFNLE9BQU91QyxDQUFHLENBRXhCLENBQUMiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxM119