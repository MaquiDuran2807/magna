import React from 'react';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import servicios from '../assets/img/banner/servicios.png';
import proyectos from '../assets/img/banner/projects.png';
import topo from '../assets/img/banner/topo.png';
import ingenieria from '../assets/img/banner/ingenieria.png';
import medioAmbiente from '../assets/img/banner/medio.png';
import sobreNosotros from '../assets/img/banner/nosotros.svg';
import './styles/banner.css';
import { Link } from 'react-router-dom';


interface BannerProps {
    title: string;
    paragraph: string;
}

const Banner: React.FC<BannerProps> = ({ title, paragraph }) => {
    let img = '';
    switch (title) {
        case 'Proyectos':
            img = proyectos;
            break;
        case 'Servicios':
            img = servicios;
            break;
        case 'Topografía':
            img = topo;
            break;
        case 'Ingeniería y Consultoría':
            img = ingenieria;
            break;
        case 'Medio Ambiente':
            img = medioAmbiente;
            break;
        case 'Sobre Nosotros':
            img = sobreNosotros;
            break;
        default:
            img = servicios;
            break;
    }


    return (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='banner-services row' id='header'
        >
            
            <div className={` ${title} servicios-d container-fluid`} id='header' style={{backgroundImage:`url(${img})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}} > 
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',color:"whithe" }}>
                    <h1>{title}</h1>
                    <div className='row'>

                        <span className='col-2'><Link to="/"><FaHome size={24} color="white" /></Link></span><span className='col-2 '><Link to="/"><p className='text-white'>Inicio</p></Link></span>
                        <span className='col-2'>
                            <FiArrowRight size={16} color="white" />
                        </span>
                        <p className='col-6 text-white' >{paragraph}</p>
                    </div>
                </div>
            </div>
        {/* tarjetas de servicios */}
        </motion.div>
        
        </>
    );
};

export default Banner;
