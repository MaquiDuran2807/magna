

import { useState,useEffect } from 'react'
import { Slider } from './components/slider'
import './App.css'
import PagesLayout from './layouts/pagesLayouts'
import Equipos from './components/sections/Equipos'
import { ProyectoPanel } from './components/sections/proyectoPanel'
import { Servicios } from './components/sections/Servicios';
import { Proyectos } from './components/sections/proyectos';
import { Clients } from './components/sections/clients';
import { Contact } from './components/sections/contact';
import { Statistics } from './components/sections/statistics'
import SplashScreen from './components/splashScreen';
import banner1 from './assets/img/banner/nosotros.svg'
import banner2 from './assets/img/banner/servicios.png'
import banner3 from './assets/img/banner/projects.png'
import banner4 from './assets/img/banner/topo.png'
import banner5 from './assets/img/banner/ingenieria.png'
import banner6 from './assets/img/banner/medio.png'



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
        <ProyectoPanel/>
      {/* fin quienes somos paneles */}

      {/* servicios */}
        <Servicios/>
      {/* fin servicios */}

      {/* proyectos  todo */}
        <Proyectos/>
      {/* fin proyectos*/}
      {/* estadisticas  */}
      <br /> 
      <br />
        <Statistics/>
      {/* fin estadisticas  */}

      {/* clientes */}
        <Clients/>
      {/* fin clientes */}
+
      {/* equipo y tecnologia y equipo de trabajo */}
        <Equipos/>
      {/* fin equipo y tecnologia y equipo de trabajo */}

      {/* contacto */}
      <Contact/>
      {/* fin contacto */}

    {/* estadisticas  */}
    
    {/* fin estadisticas  */}
    <img src={banner1}className="hidden" alt="banner1" />
    <img src={banner2}  className="hidden" alt="banner2" />
    <img src={banner3}  className="hidden" alt="banner3" />
    <img src={banner4}  className="hidden" alt="banner4" />
    <img src={banner5}  className="hidden" alt="banner5" />
    <img src={banner6}  className="hidden" alt="banner6" />

    </PagesLayout>
    

    </>
  )
}

