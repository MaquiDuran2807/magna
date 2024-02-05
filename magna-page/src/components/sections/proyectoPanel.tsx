import React from 'react'
import paneles from '../../assets/img/app/paneles.jpeg'
import '../styles/ProyectPanel.css'
import { Link } from 'react-router-dom'


export  const ProyectoPanel = () => {
    return(
        <section className="about-us">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 d-flex justify-content-center  ">
                        <div className="marco">
                            <img src={paneles} alt="paneles" className='img-paneles' />
                            <div className="experiencia">
                                <h4 className='text-center'>
                                    <strong>10 +</strong>
                                </h4>
                                <h6>
                                    Años de Experiencia
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="row">
                            <div className="col-12">
                                <h6>
                                    <strong>Proyectos___</strong>
                                </h6>
                                <h2 className='titulo-proyectos'>
                                    Innovación y Precisión: <span>Nuestra Huella</span> en la Energía Solar
                                </h2>
                                <br />
                                <p>
                                Como líderes en ingeniería y topografía, nuestra experiencia abarca una amplia gama de proyectos, demostrando nuestro compromiso con la innovación y la precisión. Nuestro equipo altamente capacitado, equipado con tecnología de vanguardia, ha superado desafíos y se ha adaptado a diversas condiciones y requisitos. Estamos orgullosos de los resultados precisos y eficientes que hemos logrado y esperamos tener la oportunidad de colaborar en tu próximo proyecto.
                                </p>
                                <p>
                                    Nuestro equipo de trabajo está conformado por profesionales altamente capacitados y con amplia experiencia en el sector, lo que nos permite brindar un servicio de calidad y cumplimiento a nuestros clientes.
                                </p>
                                <p>
                                <strong>¡Descubre cómo estamos dejando nuestra huella en estos sectores cruciales!</strong>.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button className=' boton-1 '>
                                   <Link to={`/projects`}> Ver más</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function LazyProyectoPanel () {
    const [show, setShow] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
        const onChange = (entries: IntersectionObserverEntry[],observer: { disconnect: () => void; }) => {
            const { isIntersecting } = entries[0];
            console.log(isIntersecting, 'aqui estoy en isIntersecting');
            
            if (isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        };
  
        const observer = new IntersectionObserver(onChange, {
            rootMargin: '100px',
        });
  
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
  
    }, []);
  
    return (
        <div id="LazyServices" ref={elementRef}>
            {show ? <ProyectoPanel/> : null}
        </div>
    );
  }