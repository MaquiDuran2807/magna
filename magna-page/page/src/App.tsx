

import { lazy,Suspense } from 'react'
// const SplashScreen = lazy(() => import('./components/splashScreen'));
import Slider from './components/slider'
import './App.css'
// import { useAuth } from './auth/AuthProvider'
import PagesLayout from './layouts/pagesLayouts'
// import useIntersectionObserver from './hooks/useLazyload'
import ProyectoPanel from './components/sections/proyectoPanel'
const  LazyProyectos = lazy(() => import('./components/sections/proyectos'))
const LazyServicios = lazy(() => import('./components/sections/Servicios'))
const LazyStatistics = lazy(() => import('./components/sections/statistics'))
const LazyClients = lazy(() => import('./components/sections/clients'))
const LazyEquipos = lazy(() => import('./components/sections/Equipos'))
const LazyContact = lazy(() => import('./components/sections/contact'))



// import SplashScreen from './components/splashScreen'; importar lazy




function App() {
  // const { firstView,firstViewCount } = useAuth();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log('firstView', firstView);
    
  //   if (firstView > 0 ) {
  //     setLoading(false);
  //     return;
  //   };
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     firstViewCount();
  //   }, 2000); // ajusta este tiempo según tus necesidades

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return <SplashScreen />;
  // }


  return (
   <>
   <PagesLayout >

      {/* slider */}
        <Slider />
      {/* fin slider */}

      <Suspense>
        {/* quienes somos paneles  */}
        <ProyectoPanel/>
      {/* fin quienes somos paneles */}
      </Suspense>
      <Suspense>
        {/* servicios */}
        <LazyServicios/>
      {/* fin servicios */}
      </Suspense>
      <Suspense>
        {/* proyectos  todo */}
        <LazyProyectos/>
      {/* fin proyectos*/}
      </Suspense>
      <Suspense>
        {/* estadisticas  */}
      <br /> 
      <br />
        <LazyStatistics/>
      {/* fin estadisticas  */}
      </Suspense>
      <Suspense>
        {/* clientes */}
        <LazyClients/>
      {/* fin clientes */}
      </Suspense>
      <Suspense>
        {/* equipo y tecnologia y equipo de trabajo */}
        <LazyEquipos/>
      {/* fin equipo y tecnologia y equipo de trabajo */}
      </Suspense>
      <Suspense>
        {/* contacto */}
      <LazyContact/>
      {/* fin contacto */}
      </Suspense>
      
+
      

      

    {/* estadisticas  */}
    
    {/* fin estadisticas  */}
    
    </PagesLayout>

    </>
  )
}
export default App

// export default function LazyApp(){
//   const {  isVisible, ref } = useIntersectionObserver('100px');
//   return (
//       <div id="LazyServices" ref={ref}>
//           {isVisible ? <App /> : null}
//       </div>
//   );
// }



