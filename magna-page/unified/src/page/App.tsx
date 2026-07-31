import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import PagesLayout from './layouts/pagesLayouts';
import { useGetServices, useGetSlides } from './hooks/getInfoPage';
import type { Slide } from './types/types';
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
  const { slides } = useGetSlides();
  return (
    <>
    <Helmet>
      <title>Magna Ingeniería y Topografía — Inicio</title>
      <meta name="description" content="Magna Ingeniería y Topografía S.A.S. — Servicios profesionales de ingeniería civil, topografía, estudios de suelos y consultoría en Ibagué, Tolima." />
      <meta property="og:title" content="Magna Ingeniería y Topografía" />
      <meta property="og:description" content="Servicios profesionales de ingeniería civil, topografía y consultoría en Ibagué, Tolima." />
    </Helmet>
    <PagesLayout>
      <div style={{minHeight:"100vh"}}>
        <Suspense  fallback={<Spinner/>}>
            <LazySections.Slider slides={slides.length ? slides : (services as Slide[])} />
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



export default App;