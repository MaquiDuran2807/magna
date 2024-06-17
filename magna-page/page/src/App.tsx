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
  return (
    <>
    <PagesLayout>
      <Slider />
      <Suspense fallback={<div>Cargando...</div>}>
          <div style={{ minHeight: '300px' }}>
            <LazySections.ProyectoPanel />
          </div>
          <LazySections.LazyServicios />
          <LazySections.LazyProyectos />
          <br /> <br />
          <LazySections.LazyStatistics />
          <LazySections.LazyClients />
          <LazySections.LazyEquipos />
          <LazySections.LazyContact />
        </Suspense>
      </PagesLayout>
    
    </>
  );
}

export default App;