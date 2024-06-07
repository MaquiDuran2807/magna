import React from 'react';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
// import servicios from '../assets/img/banner/servicios.png';
// import proyectos from '../assets/img/banner/projects.png';
// import topo from '../assets/img/banner/topo.png';
// import ingenieria from '../assets/img/banner/ingenieria.png';
// import medioAmbiente from '../assets/img/banner/medio.png';
// import sobreNosotros from '../assets/img/banner/sobre.webp';
import './styles/banner.css';
import { Link } from 'react-router-dom';




interface BannerProps {
    title: string;
    paragraph: string;
    image: String;
}

const Banner: React.FC<BannerProps> = ({ title, paragraph,image }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='banner-services row' id='header'
            >
                <div className={` ${title} servicios-d container-fluid d-flex align-items-center justify-content-center`} id='header' style={{backgroundImage:`url(${image})`,}} > 
                    <div className="d-flex flex-column align-items-center text-white">
                        <h1 className='pt-5 mt-5'>{title}</h1>
                        <div className='row'>
                            <span className='col-2'><Link to="/"><FaHome size={24} color="white" /></Link></span>
                            <span className='col-2'><Link to="/"><p className='text-white'>Inicio</p></Link></span>
                            <span className='col-2'>
                                <FiArrowRight size={16} color="white" />
                            </span>
                            <p className='col-6 text-white'>{paragraph}</p>
                        </div>
                    </div>
                </div>
            {/* tarjetas de servicios */}
            </motion.div>
        </>
    );
};

export default Banner;
