
import { useState,useEffect,lazy } from 'react';
import PagesLayout from '../layouts/pagesLayouts';
import Banner from "../components/banner"

const LazyProyectoPanel = lazy(() => import('../components/sections/proyectoPanel'));
const LazyStatistics = lazy(() => import('../components/sections/statistics'));
const LazyEquipos = lazy(() => import('../components/sections/Equipos'));
const LazyProyectos = lazy(() => import('../components/sections/proyectos'));
import "./styles/aboutUs.css"
import { FaCheck } from "react-icons/fa6";
import imagen from '../assets/img/banner/nosotros.webp';
import useIntersectionObserver from '../hooks/useLazyload';
// import mapa from '../assets/img/app/mapa colombia cobertura trabajos.png';


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
        <PagesLayout>
            <Componente1 />
            {/* <Banner title="Sobre Nosotros" paragraph="Sobre Nosotros" /> */}
            <LazyProyectoPanel />
            <LazyStatistics />
            <div>
                
            </div>
            <div className="info container ">
                <div className="row">
                    <div className="col-md-6">
                        <div className="abautUs row">
                            <h4>
                                ¿Quiénes somos?
                            </h4>
                            <h2>
                            Somos un <span className='title-span'>equipo </span> de profesionales integrales con gran experiencia, que ofrece servicios de ingeniería de <span className='title-span'> alta calidad</span>, brindando a nuestros clientes soluciones eficaces y concretas.
                            </h2>

                        </div>
                        <br />
                    </div>
                    <div className="col-md-6">
                        <div className="abautUs row">
                            <details className='acordeon' open>
                                <summary>
                                <FaCheck size={30} className="icon-info"/>
                                    visión
                                </summary>
                                <div>
                                    
                                    <p>
                                        Para el año 2025 Magna Ingeniería y
                                        Topografía S.A.S. será una empresa líder
                                        en el sector, ofreciendo servicios de
                                        ingeniería en el tratamiento y análisis de
                                        la información geoespacial, adoptando
                                        estándares de calidad, salud y
                                        seguridad en el trabajo y medio
                                        ambiente, con un equipo de trabajo
                                    </p>
                                </div>
                            </details>
                            <details className='acordeon' open>
                                <summary>
                                <FaCheck size={30} className="icon-info"/>
                                    misión
                                </summary>
                                <div>
                                    <p>
                                        Magna Ingeniería y Topografía S.A.S.
                                        ofrece servicios de ingeniería y
                                        consultoría, contando con tecnología
                                        avanzada y personal altamente
                                        cualificado, con el fin de optimizar
                                        procesos y satisfacer oportunamente
                                        las necesidades del cliente y abiertos a
                                        nuevas iniciativas y retos.
                                    </p>
                                </div>
                            </details>
                        </div>
                        
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 text-center mt-4">
                        <button className='boton-1'>
                            Contáctanos
                        </button>
                        </div>

                    </div>
                    
                </div>

            </div>
            <LazyEquipos/>
            <LazyProyectos/>
            <br />
            <br />
        </PagesLayout>

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
