import React, { Suspense } from 'react';
import PagesLayout from './layouts/pagesLayouts';
import Slider from './components/slider';
import './App.css';

// Agrupación de importaciones lazy
const LazySections = {
  ProyectoPanel: React.lazy(() => import('./components/sections/proyectoPanel')),
  LazyProyectos: React.lazy(() => import('./components/sections/proyectos')),
  LazyServicios: React.lazy(() => import('./components/sections/Servicios')),
  LazyStatistics: React.lazy(() => import('./components/sections/statistics')),
  LazyClients: React.lazy(() => import('./components/sections/clients')),
  LazyEquipos: React.lazy(() => import('./components/sections/Equipos')),
  LazyContact: React.lazy(() => import('./components/sections/contact')),
};

function App() {
  console.log("App");
  
  return (
    <>
    <PagesLayout>
        <Slider />
        <Suspense fallback={<div>Cargando ProyectoPanel...</div>}>
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