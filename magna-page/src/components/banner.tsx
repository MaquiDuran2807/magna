import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './styles/banner.css';
import { Link } from 'react-router-dom';

interface BannerProps {
    title: string;
    paragraph: string;
}

const Banner: React.FC<BannerProps> = ({ title, paragraph }) => {
    return (
        <>
        <div className='banner-services row' id='header'>
            <div className={` ${title} servicios-d container-fluid`} id='header' >
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
        </div>
        {/* tarjetas de servicios */}
        
        </>
    );
};

export default Banner;
