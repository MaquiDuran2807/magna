
import { useEffect, useState } from 'react';
import { ProyectosMagna,Result,ProyectImagesMagna,Tipo } from '../types/projects';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
// import { API_URL } from '../constans';
import { Link } from 'react-router-dom';
import "./styles/cardsProjects.css";
import React from 'react';

interface Props {
    type: Tipo | number | undefined;
    actualPage: number| null;
    imagenes: ProyectImagesMagna[];
}

const CardsProjects = ({ type, actualPage,imagenes }: Props) => {
    const [proyectos_card_type, setProyectos_card_type] = useState<Result[]|Result >([]);
    const [imagenesCard, setImagenes] = useState<ProyectImagesMagna[]>([]);
    const [types,setTypes] =  useState<Tipo[]>([]);
    const [typeProject, setTypeProject] = useState<Tipo>();
    const { data:Project } = useQuery<ProyectosMagna>({
        queryKey: ['projects'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });

    
    if (!Project) {
        return null;
    }
    
    useEffect(() => {
        if (type === 0) {
            const types1: Tipo[]= Array.isArray(Project.results) ? Project.results.map((proyecto: Result) => proyecto.tipo).filter ((proyecto: Tipo, index: number,self: Tipo[]) => self.findIndex((t: Tipo) => t.id === proyecto.id) === index) : [];
            setProyectos_card_type(Project.results);
            setImagenes(imagenes);
            setTypes([
                {
                    id:0,
                    name:"Todos"
                },
                ...types1
            ]);
            return;
        }
        const proyectos_card_type_1: Result[] = Project.results
    .filter((proyecto: Result) => proyecto.tipo.id === type) // Filtra por tipo
    .filter((proyecto: Result) => proyecto.id !== actualPage)

        setProyectos_card_type(proyectos_card_type_1);
        setImagenes(imagenes);
        
    }, [type, actualPage,imagenes]);

    const filterProjects = (type: number|undefined) => {
        if (type === 0) {
            setProyectos_card_type(Project.results);
            setTypeProject(undefined);
            return;
        }
        if (!type) {

            return;
        }
        const newTypeProject = types.filter((typeProject: Tipo) => typeProject.id === type)[0];
        if (!newTypeProject) {
            return;
        }
        const proyectos_card_type_1: Result[] = Array.isArray(Project.results) ? Project.results.filter((proyecto: Result) => proyecto.tipo.id === newTypeProject.id) : [];
        setTypeProject(newTypeProject);
        setProyectos_card_type(proyectos_card_type_1);
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                {
                        type === 0 ?
                            !types ? null:
                                types.map((typeProject: Tipo) => {
                                    return (
                                        <motion.div
                                            key={typeProject.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="col-12 col-sm-6 col-lg-3 col-md-4"
                                        >
                                            <button className="boton-1 " onClick={() => filterProjects(typeProject.id)}>{typeProject.name}</button>
                                        </motion.div>
                                    )
                                },
                                )
                                :
                                <motion.div
                                    key={typeProject?.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="col-4 col-lg-3"
                                >
                                    <button className="boton-1" onClick={() => filterProjects(typeProject?.id)}>{typeProject?.name}</button>
                                </motion.div>
                                
                    }
                </div>
                <div className="row">
            {Array.isArray(proyectos_card_type) && proyectos_card_type.map((proyecto: Result) => {
                const firstImage = imagenesCard.filter((imagen: ProyectImagesMagna) => imagen.proyecto === proyecto.id)[0].imagen
                return (
                    
                    <motion.div
                        key={proyecto.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6 }}
                        className="col-md-6 col-lg-4 col-12 col-xl-3"
                    >
                        <div >
                            <div className="card-project">
                                <div className="card-body card-body-projects">
                                    {firstImage && <img src={firstImage} alt="Project Image" className='img-fluid card-img'/>}        
                                    <div className="content-1 ">
                                        <div>
                                            <h5 className="card-title text-center">{proyecto.nombre}</h5>
                                            <p className="card-text text-center">{`${proyecto.descripcion.slice(0, 100)} ...`
                                            }</p>
                                        </div>
                                    </div>
                                    <Link to={`/projects/${proyecto.id}`} className="boton-1 text-center end-boton">Ver más</Link>
                                </div>
                            </div>
                        </div>
                            
                    </motion.div>
                );
            }
            )}
                </div>
            </div>
        </div>
    );
};

// export default CardsProjects;

export default function LazyCardsProjects ({ type, actualPage,imagenes }: Props) {
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
            {show ? <CardsProjects type={type} actualPage={actualPage} imagenes={imagenes}  /> : null}
        </div>
    );
}


