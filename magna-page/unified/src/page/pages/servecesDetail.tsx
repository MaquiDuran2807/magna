import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, useEffect, useMemo, useRef, useState } from "react";
import { AiFillCaretDown, AiOutlineDoubleRight } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import imagenIngenieria from '../assets/img/banner/ingenieria.webp';
import imagenMedioAmbiente from '../assets/img/banner/medio.webp';
import imagenServicios from '../assets/img/banner/servicios.webp';
import imagenTopografia from '../assets/img/banner/converted_topo.webp';
import Banner from "../components/banner";
import SliderServices from "../components/sliderServices";
import PagesLayout from "../layouts/pagesLayouts";
import { Subservicio } from "../types/types";
import "./styles/servicesDetail.css";
import Spinner from '../components/spinner';
import useIntersectionObserver from '../hooks/useLazyload';
import { useGetServices } from '../hooks/getInfoPage';
const LazyServicios = lazy(() => import('../components/sections/Servicios'));

const fallbackImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.srcset = '';
};

const bannerImageMap: Record<string, string> = {
    "Topografía": imagenTopografia,
    "Ingeniería y Consultoría": imagenIngenieria,
    "Medio Ambiente": imagenMedioAmbiente,
};

const RESET_TIMEOUT = 40000;

const ServecesDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { services } = useGetServices();
    const [selectedSubServicio, setSelectedSubServicio] = useState<Subservicio | null>(null);
    const [openServiceId, setOpenServiceId] = useState<number | null>(null);
    const subServicioPaginaRef = useRef<HTMLDivElement>(null);
    const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const servicioElegido = useMemo(() => {
        if (!services) return undefined;
        if (!id) return services;
        return services.filter(s => s.nombre === id);
    }, [services, id]);

    const { title, imagen } = useMemo(() => {
        if (!id || !servicioElegido?.[0]) {
            return { title: "Nuestros Servicios", imagen: imagenServicios };
        }
        const s = servicioElegido[0];
        return {
            title: "servicios de " + s.nombre,
            imagen: bannerImageMap[s.nombre] || imagenServicios,
        };
    }, [id, servicioElegido]);

    const handleSubServicioClick = (subServicio: Subservicio) => {
        if (!subServicio) return;
        if (navTimerRef.current) {
            clearTimeout(navTimerRef.current);
        }
        setSelectedSubServicio(subServicio);
        if (subServicioPaginaRef.current) {
            const top = subServicioPaginaRef.current.getBoundingClientRect().top + window.pageYOffset;
            window.scroll({ top: top - 100, behavior: 'smooth' });
        }
    };

    // Cuando se navega a un servicio especifico, reiniciar el timer
    // para volver a /servicios mostrando todas las tarjetas
    useEffect(() => {
        if (navTimerRef.current) {
            clearTimeout(navTimerRef.current);
        }
        setSelectedSubServicio(null);
        if (id) {
            navTimerRef.current = setTimeout(() => {
                navigate('/servicios', { replace: true });
            }, RESET_TIMEOUT);
        }
        return () => {
            if (navTimerRef.current) {
                clearTimeout(navTimerRef.current);
            }
        };
    }, [id, navigate]);

    // Scroll al carrusel cuando el DOM está listo
    useEffect(() => {
        if (!id) return;
        let attempts = 0;
        const scrollToCarousel = () => {
            const carousel = document.querySelector<HTMLElement>('.servicios-carousel');
            const serviciosLoaded = document.querySelector('.servicios-grid');
            if (carousel && serviciosLoaded) {
                const rect = carousel.getBoundingClientRect();
                const top = rect.top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            } else if (attempts < 15) {
                attempts++;
                setTimeout(scrollToCarousel, 150);
            }
        };
        scrollToCarousel();
    }, [id, servicioElegido]);

    if (!servicioElegido) {
        return <Spinner/>;
    }

    return (
        <>
            <Helmet>
              <title>{title} | Magna Ingeniería y Topografía</title>
              <meta name="description" content={servicioElegido[0]?.descripcion?.substring(0, 160) ?? 'Servicios profesionales de ingeniería, topografía, estudios ambientales y más.'} />
            </Helmet>
            <PagesLayout>
                <Banner
                    title={servicioElegido.length === 1 ? servicioElegido[0].nombre : "Servicios"}
                    paragraph={title}
                    image={imagen}
                />
                <div className="servicios-page-wrapper">
                    {servicioElegido.length === 1 && (
                        <h2 className="servicio-title">{title}</h2>
                    )}

                    <LazyServicios />

                    <div className="servicios-layout">
                        <aside className="servicios-sidebar">
                            <div className="sidebar-header">
                                <h2>Nuestros Servicios</h2>
                            </div>
                            {services?.map((servicio) => (
                                <div key={servicio.id} className="servicio-accordion">
                                    <button
                                        className={`accordion-trigger ${openServiceId === servicio.id ? 'open' : ''}`}
                                        onClick={() => setOpenServiceId(openServiceId === servicio.id ? null : servicio.id)}
                                    >
                                        <span className="accordion-title">{servicio.nombre}</span>
                                        <AiFillCaretDown className="accordion-icon" />
                                    </button>
                                    <AnimatePresence>
                                        {openServiceId === servicio.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="accordion-content"
                                            >
                                                <p className="servicio-description">{servicio.descripcion}</p>
                                                <div className="subservicios-list">
                                                    {servicio.subservicios.map((sub) => (
                                                        <button
                                                            key={sub.id}
                                                            className="subservicio-item"
                                                            onClick={() => {
                                                                if (sub.slug && servicio.slug) {
                                                                    navigate(`/servicios/${servicio.slug}/${sub.slug}`);
                                                                } else {
                                                                    handleSubServicioClick(sub);
                                                                }
                                                            }}
                                                        >
                                                            <AiOutlineDoubleRight className="subservicio-icon" />
                                                            <span>{sub.nombre}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </aside>

                        <main className="servicios-main">
                            <section className="servicios-carousel">
                                <SliderServices
                                    serviceName={id}
                                    onSubServicioClick={handleSubServicioClick}
                                />
                            </section>

                            <section className="servicios-detail-panel" ref={subServicioPaginaRef}>
                                <AnimatePresence mode="wait">
                                    {selectedSubServicio ? (
                                        <motion.div
                                            key={selectedSubServicio.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                            className="detail-content"
                                        >
                                            <div className="detail-image">
                                                <img
                                                    src={selectedSubServicio.imagen_tablet || selectedSubServicio.imagen}
                                                    srcSet={`
                                                        ${selectedSubServicio.imagen_celular || selectedSubServicio.imagen} 450w,
                                                        ${selectedSubServicio.imagen_tablet || selectedSubServicio.imagen} 1024w
                                                    `}
                                                    sizes="(max-width: 768px) 100vw, 800px"
                                                    alt={selectedSubServicio.nombre}
                                                    className="detail-img"
                                                    onError={fallbackImg}
                                                />
                                            </div>
                                            <div className="detail-text">
                                                <h3>{selectedSubServicio.nombre}</h3>
                                                <p>{selectedSubServicio.descripcion}</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="detail-placeholder"
                                        >
                                            <h3>Servicios de calidad y con la más alta tecnología</h3>
                                            <p>
                                                Somos una empresa con más de 10 años de experiencia en el mercado,
                                                con profesionales altamente calificados y con amplia experiencia en
                                                el sector público y privado.
                                            </p>
                                            <p className="detail-hint">
                                                Selecciona un subservicio del menú lateral o del carrusel para ver más detalles.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>
                        </main>
                    </div>

                </div>
            </PagesLayout>
        </>
    );
};

export default function LazyServecesDetail () {
    const { isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyServecesDetail" ref={ref}>
            {isVisible ? <ServecesDetail /> : null}
        </div>
    );
}
