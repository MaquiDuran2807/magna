
import { memo, useEffect } from 'react';
import paneles from '../../assets/img/app/paneles1.webp'
import '../styles/ProyectPanel.css'
import { Link } from 'react-router-dom';

import nosotros from '../../assets/img/banner/nosotros.webp';
import servicios from '../../assets/img/banner/servicios.webp';
import projects from '../../assets/img/banner/projects.webp';
import topo from '../../assets/img/banner/converted_topo.webp';
import ingenieria from '../../assets/img/banner/ingenieria.webp';
import medio from '../../assets/img/banner/medio.webp';
import useIntersectionObserver from '../../hooks/useLazyload';

const preloadImages = async (imagesPaths: any[]) => {
    const promises = imagesPaths.map(path => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                document.body.appendChild(img); // Agrega la imagen al cuerpo del documento
                img.style.display = 'none'; // Hace que la imagen no sea visible, pero aún se cargue
                resolve(img);
            };
            img.onerror = reject;
            img.src = path;
        });
    });
    try {
        await Promise.all(promises);
    } catch (error) {
        console.error('Error al cargar una o más imágenes', error);
    }
};



const ProyectoPanel = memo(() => {

    useEffect(() => {
        const imagesPaths = [
            nosotros,
            servicios,
            projects,
            topo,
            ingenieria,
            medio,
        ];
        preloadImages(imagesPaths);
    }, []);
    return(
        <section className="about-us">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 d-flex justify-content-center  ">
                        <div className="marco">
                            <img src={paneles} alt="paneles" className='img-paneles' loading='lazy' />
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
                                    <strong>Proyectos</strong>
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
});

export default function LazyProyectoPanel () {
    const {  isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyProyectoPanel" ref={ref}>
            {isVisible? <ProyectoPanel /> : null}
        </div>
    );
  }