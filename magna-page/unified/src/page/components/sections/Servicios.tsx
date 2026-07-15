import React from 'react';
import { Servicio2 } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { SetionHeader } from '../setionHeader';
import '../styles/Servicios.css';
import useIntersectionObserver from '../../hooks/useLazyload';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
    }),
};

const Servicios = React.memo(() => {
    const { data: servicios } = useQuery<Servicio2[]>({
        queryKey: ['services'],
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: 1000 * 60 * 30,
    });

    return (
        <section className="servicios-cross-section">
            <div className="container">
                <SetionHeader prefix="Nuestros" title="Servicios" />
                <div className="servicios-grid">
                    {servicios?.map((servicio, i) => (
                        <motion.div
                            key={servicio.id}
                            className="service-card"
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={cardVariants}
                        >
                            <Link
                                to={`/servicios/${servicio.nombre}`}
                                className="service-card-link"
                            >
                                <div
                                    className="service-card-bg"
                                    style={{ backgroundImage: `url(${servicio.imagen})` }}
                                />
                                <div className="service-card-overlay" />
                                <div className="service-card-content">
                                    {servicio.icon && (
                                        <img
                                            src={servicio.icon}
                                            alt=""
                                            className="service-card-icon"
                                            loading="lazy"
                                        />
                                    )}
                                    <h4 className="service-card-title">{servicio.nombre}</h4>
                                    <p className="service-card-desc">
                                        {servicio.descripcion.slice(0, 150)}...
                                    </p>
                                    <span className="service-card-btn" role="button">
                                        Ver servicios <AiOutlineArrowRight />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default function LazyServicios() {
    const { isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyServices" ref={ref}>
            {isVisible ? <Servicios /> : null}
        </div>
    );
}
