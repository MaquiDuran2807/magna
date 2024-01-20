import { RootState } from '../store';
import { useSelector } from 'react-redux';
// import { useState,useEffect } from 'react';
// import { Proyecto,ProyectosMagna,Imagene,Servicio,RootInterface,Pais,Ciudad,Departamento,TypeProject } from '../types/types';
// import { motion } from 'framer-motion';
// import { API_URL } from '../constans';
// import { Link } from 'react-router-dom';


import { useEffect, useState } from 'react';
import { Proyecto,Imagene,ProyectosMagna,TypeProject } from '../types/types';
import { motion } from 'framer-motion';
import { API_URL } from '../constans';
import { Link } from 'react-router-dom';
import "./styles/cardsProjects.css";

interface Props {
    type: number;
    actualPage: Proyecto[];
    imagenes: Imagene[];
}

const CardsProjects = ({ type, actualPage,imagenes }: Props) => {
    const [proyectos_card_type, setProyectos_card_type] = useState<Proyecto[]>([]);
    const [imagenesCard, setImagenes] = useState<Imagene[]>([]);
    const Project:ProyectosMagna = useSelector((state: RootState) => state.projects.data);
    const [typeProject, setTypeProject] = useState<TypeProject>();
    console.log(Project,"Project.type_project");
    
    const [types,setTypes] =  useState<TypeProject[]>([]);
    
    useEffect(() => {
        if (type === 0) {
            setProyectos_card_type(actualPage);
            setImagenes(imagenes);
            setTypes([
                {
                    id:0,
                    name:"Todos"
                },
                ...Project.type_project
            ]);
            return;
        }
        const proyectos_card_type_1: Proyecto[] = actualPage.filter((proyecto: Proyecto) => proyecto.tipo === type);
        setProyectos_card_type(proyectos_card_type_1);
        setImagenes(imagenes);
        
    }, [type, actualPage,imagenes]);

    const getFirstImage = (id: number) => {
        const imagen = imagenesCard.filter((imagen: Imagene) => imagen.proyecto === id)[0];
        if (imagen) {
            return `${API_URL}${imagen.imagen}`;
        }
        return null;
    };

    const filterProjects = (type: number|undefined) => {
        console.log(type,"type");
        if (type === 0) {
            setProyectos_card_type(actualPage);
            console.log("llego aqui");
            setTypeProject(undefined);
            return;
        }
        if (!type) {
            return;
        }
        console.log(type,"type");
        
        
        const newTypeProject = types.filter((typeProject: TypeProject) => typeProject.id === type)[0];
        if (!newTypeProject) {
            return;
        }
        setTypeProject(newTypeProject);
        setProyectos_card_type(actualPage.filter((proyecto: Proyecto) => proyecto.tipo === newTypeProject.id));
    }
    
    useEffect(() => {
        console.log(types,"types");
        
    }, [types]);


    return (
        <div>

            <div className="container">
                <div className="row">
                {
                        type === 0 ?
                            !types ? null:
                                types.map((typeProject: TypeProject) => {
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
            {proyectos_card_type.map((proyecto: Proyecto) => {
                const firstImage = getFirstImage(proyecto.id);
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

export default CardsProjects;
