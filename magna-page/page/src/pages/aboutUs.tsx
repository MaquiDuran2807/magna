import { Helmet } from 'react-helmet-async';
import { useState,useEffect,lazy } from 'react';
import PagesLayout from '../layouts/pagesLayouts';
import Banner from "../components/banner"

const LazyProyectoPanel = lazy(() => import('../components/sections/proyectoPanel'));
const LazyStatistics = lazy(() => import('../components/sections/statistics'));
const LazyEquipos = lazy(() => import('../components/sections/Equipos'));
const LazyProyectos = lazy(() => import('../components/sections/proyectos'));
const LazyAboutContent = lazy(() => import('../components/sections/AboutContent'));
import "./styles/aboutUs.css"
import imagen from '../assets/img/banner/nosotros.webp';
import useIntersectionObserver from '../hooks/useLazyload';


function Componente1() {
    return <Banner title="Sobre Nosotros" paragraph="Sobre Nosotros" image={imagen} />;
  }
 

const AboutUs: React.FC = () => {
    const [isComponente1Mounted, setIsComponente1Mounted] = useState(false);
    useEffect(() => {
        setIsComponente1Mounted(true);
      }, []);

    if (!isComponente1Mounted) {
        return null;
      }


    return (
        <>
        <Helmet>
          <title>Quiénes Somos | Magna Ingeniería y Topografía</title>
          <meta name="description" content="Conoce a Magna Ingeniería y Topografía S.A.S. — Nuestra historia, equipo profesional y experiencia en el sector de la ingeniería y topografía en Ibagué, Tolima." />
        </Helmet>
        <PagesLayout>
            <Componente1 />
            <LazyProyectoPanel />
            <LazyStatistics />
            <LazyAboutContent />
            <LazyEquipos/>
            <LazyProyectos/>
            <br />
            <br />
        </PagesLayout>
        </>
    );
};


export default function LazyAboutUs () {
    const { isVisible, ref } = useIntersectionObserver('100px');
  
    return (
        <div id="LazyAboutUs" ref={ref}>
            {isVisible ? <AboutUs/> : null}
        </div>
    );
  }