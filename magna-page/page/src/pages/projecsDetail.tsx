import React, { useEffect,lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import Banner from '../components/banner';
import imagenBanner from '../assets/img/banner/projects.png';
import { Result,ProyectosMagna,ProyectImagesMagna,Servicio } from '../types/projects';
import SliderProjectDetail from '../components/sliderProjectDetail';
import PagesLayout from '../layouts/pagesLayouts';
import { Proyectos } from '../components/sections/proyectos';
import './styles/projectsDetail.css'
const LazyCardsProjects = lazy(() => import('../components/cardsProjects'));
const ProjectDetail: React.FC= () => {
    const [project, setProject] = React.useState<Result>();
    const [imagen, setImagen] = React.useState<ProyectImagesMagna[]>([]);
    const { id } = useParams<{ id: string }>();
    const { data:projects } = useQuery<ProyectosMagna>({
        queryKey: ['projects'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });
    const { data:projectImages } = useQuery<ProyectImagesMagna[]>({
        queryKey: ['projectsImages'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });

    if(!projects || !projectImages || !id){
        return null;
    }
    
    useEffect(() => {
        const project_select: Result | null = projects.results.find((project: Result) => project.id === parseInt(id)) || null;
        const images: ProyectImagesMagna[] = projectImages.filter((imagen: ProyectImagesMagna) => imagen.proyecto === parseInt(id));
        console.log(project_select, 'aqui estoy en project_select',images,"images");
        
        if (!project_select) {
            return;
        }
        setProject(project_select);
        setImagen(images);
        }, [projects,projectImages,id]);

    if (!project || !imagen) {
        return null;
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
                    <div className="col-12 col-md-6" key={project.id}>
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
                        <LazyCardsProjects type={project.tipo.id} actualPage={project.id} imagenes={projectImages}/>
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