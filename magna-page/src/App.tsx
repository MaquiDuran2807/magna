
import { Slider } from './components/slider'
import './App.css'
import PagesLayout from './layouts/pagesLayouts'
import Equipos from './components/sections/Equipos'
import { ProyectoPanel } from './components/sections/proyectoPanel'
import { Servicios } from './components/sections/Servicios';
import { Proyectos } from './components/sections/proyectos';
import { Clients } from './components/sections/clients';
import { Contact } from './components/sections/contact';


export function App() {
  return (
    <>
    <PagesLayout>
      {/* slider */}
        <Slider/>
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

    </PagesLayout>
    </>
  )
}

