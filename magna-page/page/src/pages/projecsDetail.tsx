import React, { useEffect, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import Banner from '../components/banner';
import imagenBanner from '../assets/img/banner/projects.webp';
import { Result, ProyectImagesMagna, Servicio } from '../types/projects';
import SliderProjectDetail from '../components/sliderProjectDetail';
import PagesLayout from '../layouts/pagesLayouts';
import './styles/projectsDetail.css';
import { useGetProjects } from '../hooks/getProjects';

const Proyectos = lazy(() => import('../components/sections/proyectos'));
const LazyCardsProjects = lazy(() => import('../components/cardsProjects'));

const ProjectDetail: React.FC= () => {
    const [project, setProject] = React.useState<Result>();
    const [imagen, setImagen] = React.useState<ProyectImagesMagna[]>([]);
    const { projectArg } = useParams<{ projectArg: string }>();
    const { projects, projectImages } = useGetProjects();

    useEffect(() => {
        if (!projects || !projectImages || !projectArg) {
            return;
        }
        const project_select: Result | undefined = projects.results.find((project: Result) => project.id === parseInt(projectArg));
        const images: ProyectImagesMagna[] = projectImages.filter((imagen: ProyectImagesMagna) => imagen.proyecto === parseInt(projectArg));
        if (project_select) {
            setProject(project_select);
            setImagen(images);
        }
    }, [projects, projectImages, projectArg]);

    if (!project || !imagen || !projects || !projectImages || !projectArg) {
        return <div>No hay información disponible</div>;
    }

    return (
        <>
        <PagesLayout>
            <Banner title="Proyectos" paragraph='Proyectos' image={imagenBanner}/>
            <div className="container-fluid">
                <div className="row titulo">
                    <h2 className='col-10'>
                        {project.nombre}
                    </h2>
                    <Link to='/projects' className='col-2'>
                        <button className='boton-1 '>
                            ver más
                        </button>
                    </Link>
                    
                </div>
                <div className="row project-detail">
                    <div className="col-12 col-md-6 ">
                        <SliderProjectDetail images={imagen}/>
                    </div>
                    <div className="col-12 col-md-6" key={projectArg}>
                        <br />
                        <br />
                        <h3>
                            Descripción del proyecto
                        </h3>
                        <p>{project.descripcion}</p>
                        <h3>
                            Ubicación
                        </h3>
                        <p>
                            {project.ciudad.departamento.pais.nombre}, {project.ciudad.departamento.nombre}, {project.ciudad.nombre}
                        </p>
                        <h3>
                            Servicios prestados
                        </h3>
                        {
                            project.servicios.map((servicio: Servicio) => (
                                <>
                                <h5 key={servicio.id}>{servicio.nombre}</h5>
                                <Link to={`/servicios`}>
                                    <button className='boton-1'>
                                        ver más
                                    </button>

                                </Link>
                                
                                </>
                            ))
                            }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 relacionados">
                        <h3>
                            Proyectos relacionados
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <LazyCardsProjects type={project.tipo.id} actualPage={project.id} imagenes={projectImages} projects={projects}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Proyectos />
                    </div>
                </div>
            </div>
        </PagesLayout>
        </>
    );
};

export default ProjectDetail;
