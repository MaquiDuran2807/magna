

import { useState,useEffect } from 'react'
import { Slider } from './components/slider'
import './App.css'
import PagesLayout from './layouts/pagesLayouts'
import LazyProyectoPanel from './components/sections/proyectoPanel'
import LazyProyectos from './components/sections/proyectos';
import LazyClients from './components/sections/clients';
import LazyContact from './components/sections/contact';
import LazyStatistics from './components/sections/statistics'
import SplashScreen from './components/splashScreen';
import LazyServicios from './components/sections/Servicios'
import LazyEquipos from './components/sections/Equipos'



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

