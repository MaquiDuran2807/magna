
import PagesLayout from '../layouts/pagesLayouts';
import Banner from "../components/banner"
import { ProyectoPanel } from '../components/sections/proyectoPanel';
import { Statistics } from '../components/sections/statistics';
import "./styles/aboutUs.css"
import { FaCheck } from "react-icons/fa6";
import Equipos from '../components/sections/Equipos';
import { Proyectos } from '../components/sections/proyectos';

const AboutUs: React.FC = () => {
    return (
        <PagesLayout>
            <Banner title="Sobre Nosotros" paragraph="Sobre Nosotros" />
            <ProyectoPanel />
            <Statistics />
            <div className="info container ">
                <div className="row">
                    <div className="col-md-6">
                        <div className="abautUs row">
                            <h4>
                                ¿Quiénes somos?___
                            </h4>
                            <h2>
                            Somos un <span className='title-span'>equipo </span> de profesionales integrales con gran experiencia,que ofrece servicios de ingeniería de <span className='title-span'> alta calidad</span>, brindando a nuestros clientes soluciones eficaces y concretas.

                                 
                            </h2>
                            
                            <button className='boton-1'>
                                Contáctanos
                            </button>
                            

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
                                        Topografía S.A.S será una empresa líder
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
                </div>

            </div>
            <Equipos/>
            <Proyectos/>
            <br />
            <br />
        </PagesLayout>

    );
};

export default AboutUs;
