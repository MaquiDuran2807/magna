
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useLazyload';
import { ProyectImagesMagna, ProyectosMagna, Result, Tipo } from '../types/projects';
import "./styles/cardsProjects.css";

interface Props {
    type: Tipo | number | undefined;
    actualPage: number | null;
    imagenes: ProyectImagesMagna[];
    projects: ProyectosMagna;
}

const CardsProjects =memo( ({ type, actualPage, imagenes, projects }: Props) => {
    const [proyectosCardType, setProyectosCardType] = useState<Result[]>([]);
    const [imagenesCard] = useState<ProyectImagesMagna[]>(imagenes);
    const [types, setTypes] = useState<Tipo[]>([]);
    const [typeProject, setTypeProject] = useState<Tipo | undefined>();

    useEffect(() => {
        if (!projects) return;
        let filteredProjects = projects.results;
        if (type !== 0) {
            filteredProjects = filteredProjects.filter((proyecto: Result) => proyecto.tipo.id === type && proyecto.id !== actualPage);
        }

        const uniqueTypes = Array.from(new Set(filteredProjects.map((proyecto: Result) => proyecto.tipo.id)))
            .map(id => {
                return projects.results.find((proyecto: Result) => proyecto.tipo.id === id)?.tipo;
            }).filter((tipo): tipo is Tipo => Boolean(tipo));

        setProyectosCardType(filteredProjects);
        setTypes([{ id: 0, name: "Todos" }, ...uniqueTypes]);
    }, [type, actualPage, imagenes, projects]);

    const filterProjects = (typeId: number | undefined) => {
        if (!projects || typeId === undefined) return;

        const newTypeProject = types.find((typeProject: Tipo) => typeProject.id === typeId);
        if (!newTypeProject) return;
        if (typeId === 0) {
            setProyectosCardType(projects.results);
            return;
        }
        const filteredProjects = projects.results.filter((proyecto: Result) => proyecto.tipo.id === newTypeProject.id);
        setTypeProject(newTypeProject);
        setProyectosCardType(filteredProjects);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    {type === 0 ?
                        types.map((typeProject: Tipo) => (
                            <motion.div
                                key={typeProject.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="col-12 col-sm-6 col-lg-3 col-md-4"
                            >
                                <button className="boton-1" onClick={() => filterProjects(typeProject.id)}>{typeProject.name}</button>
                            </motion.div>
                        ))
                        :
                        typeProject && (
                            <motion.div
                                key={typeProject.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="col-4 col-lg-3"
                            >
                                <button className="boton-1" onClick={() => filterProjects(typeProject.id)}>{typeProject.name}</button>
                            </motion.div>
                        )
                    }
                </div>
                <div className="row">
                    {proyectosCardType.map((proyecto: Result) => {
                        let firstImage = imagenesCard.find((imagen: ProyectImagesMagna) => imagen.proyecto === proyecto.id)?.imagen || "no hay imagen";
                        return (
                            <Link to={`/projects/${proyecto.id}`} key={proyecto.id} className="col-md-6 col-lg-4 col-12 col-xl-3 text-decoration-none">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.6 }}
                                    
                                >
                                    <div className='my-5'>
                                        <div className="card-project bg-white rounded transition cursor-pointer m-auto">
                                            <div className="card-body card-body-projects d-flex flex-column justify-content-between h-98">
                                                {firstImage !== "no hay imagen" ? <img src={firstImage} alt="" className="img-fluid card-img w-100 h-160" /> : <p>No hay imagen</p>}
                                                <div className="content-1 d-flex flex-column align-items-stretch flex-grow-1 p-20">
                                                    <div>
                                                        <h5 className="card-title text-center fw-bold text-black mb-5 mt-4">{proyecto.nombre}</h5>
                                                        <p className="card-text text-center text-black">{`${proyecto.descripcion.slice(0, 100)} ...`}</p>
                                                    </div>
                                                </div>
                                                <button className="boton-1 text-center end-boton">Ver más</button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default function LazyCardsProjects({ type, actualPage, imagenes,projects }: Props) {
    const { isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyServices" ref={ref}>
            {isVisible ? <CardsProjects type={type} actualPage={actualPage} imagenes={imagenes} projects={projects} /> : null}
        </div>
    );
}