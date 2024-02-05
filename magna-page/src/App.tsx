

import { useState,useEffect,lazy } from 'react'
import { Slider } from './components/slider'
import './App.css'
import PagesLayout from './layouts/pagesLayouts'
import LazyProyectoPanel from './components/sections/proyectoPanel'
const  LazyProyectos = lazy(() => import('./components/sections/proyectos'))
const LazyServicios = lazy(() => import('./components/sections/Servicios'))
const LazyStatistics = lazy(() => import('./components/sections/statistics'))
const LazyClients = lazy(() => import('./components/sections/clients'))
const LazyEquipos = lazy(() => import('./components/sections/Equipos'))
const LazyContact = lazy(() => import('./components/sections/contact'))

import SplashScreen from './components/splashScreen';



export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // ajusta este tiempo según tus necesidades

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }


  return (
    <>
    <PagesLayout>
      {/* slider */}
        <Slider />
      {/* fin slider */}

      {/* quienes somos paneles  */}
        <LazyProyectoPanel/>
      {/* fin quienes somos paneles */}

      {/* servicios */}
        <LazyServicios/>
      {/* fin servicios */}

      {/* proyectos  todo */}
        <LazyProyectos/>
      {/* fin proyectos*/}
      {/* estadisticas  */}
      <br /> 
      <br />
        <LazyStatistics/>
      {/* fin estadisticas  */}

      {/* clientes */}
        <LazyClients/>
      {/* fin clientes */}
+
      {/* equipo y tecnologia y equipo de trabajo */}
        <LazyEquipos/>
      {/* fin equipo y tecnologia y equipo de trabajo */}

      {/* contacto */}
      <LazyContact/>
      {/* fin contacto */}

    {/* estadisticas  */}
    
    {/* fin estadisticas  */}
    
    </PagesLayout>
    </>
  )
}

