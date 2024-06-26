import React, { Suspense } from 'react';
import PagesLayout from './layouts/pagesLayouts';
import useIntersectionObserver from './hooks/useLazyload';
import { useGetServices } from './hooks/getInfoPage';
import { Spinner } from 'react-bootstrap';

// Agrupación de importaciones lazy
const LazySections = {
  Slider: React.lazy(() => import('./components/slider')),
  ProyectoPanel: React.lazy(() => import('./components/sections/proyectoPanel')),
  LazyProyectos: React.lazy(() => import('./components/sections/proyectos')),
  LazyServicios: React.lazy(() => import('./components/sections/Servicios')),
  LazyStatistics: React.lazy(() => import('./components/sections/statistics')),
  LazyClients: React.lazy(() => import('./components/sections/clients')),
  LazyEquipos: React.lazy(() => import('./components/sections/Equipos')),
  LazyContact: React.lazy(() => import('./components/sections/contact')),
};

function App() {
  const { services } = useGetServices();
  if (!services) {
    return null;
  }
  
  return (
    <>
    <PagesLayout>
      <div style={{minHeight:"100vh"}}>
        <Suspense  fallback={<Spinner/>}>
            <LazySections.Slider services={services}/>
        </Suspense>
      </div>
        
        <Suspense fallback={<div style={{marginBottom:"400px"}}>Cargando ProyectoPanel...</div>}>
          <div style={{ minHeight: '300px' }}>
            <LazySections.ProyectoPanel />
          </div>
        </Suspense>
        <Suspense fallback={<div>Cargando Servicios...</div>}>
          <LazySections.LazyServicios />
        </Suspense>
        <Suspense fallback={<div>Cargando Estadísticas...</div>}>
          <LazySections.LazyStatistics />
        </Suspense>
        <Suspense fallback={<div>Cargando Proyectos...</div>}>
          <LazySections.LazyProyectos />
        </Suspense>
        <Suspense fallback={<div>Cargando Clientes...</div>}>
          <LazySections.LazyClients />
        </Suspense>
        <Suspense fallback={<div>Cargando Equipos...</div>}>
          <LazySections.LazyEquipos />
        </Suspense>
        <Suspense fallback={<div>Cargando Contacto...</div>}>
          <LazySections.LazyContact />
        </Suspense>
      </PagesLayout>
    
    </>
  );
}



export default function LazyApp () {
  const { isVisible, ref } = useIntersectionObserver('100px');

  return (
      <div id="LazyApp" ref={ref}>
          {isVisible ? <App/> : null}
      </div>
  );
}