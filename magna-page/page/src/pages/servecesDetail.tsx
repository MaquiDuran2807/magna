import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiOutlineDoubleRight } from "react-icons/ai";
import { useParams } from "react-router-dom";
import imagenIngenieria from '../assets/img/banner/ingenieria.webp';
import imagenMedioAmbiente from '../assets/img/banner/medio.webp';
import imagenServicios from '../assets/img/banner/servicios.webp';
import imagenTopografia from '../assets/img/banner/converted_topo.webp';
import Banner from "../components/banner";
import SliderServices from "../components/sliderServices";
import useScreenSize from '../hooks/ScreenSize';
import PagesLayout from "../layouts/pagesLayouts";
import { Servicio2, Subservicio } from "../types/types";
import "./styles/servicesDetail.css";
const PdfViewer = lazy(() => import('../components/brochure'));

const LazyServicios = lazy(() => import('../components/sections/Servicios'));

interface ServecesDetailProps {
    issue: string;
}

const ServecesDetail: React.FC<ServecesDetailProps> = ({ issue }) => {
    const { id } = useParams<{ id: string }>();

    let [title, setTitle] = useState<String>("Nuestros Servicios");
    let [imagen, setImagen] = useState<String>(imagenServicios);
    const { data: serveces } = useQuery<Servicio2[]>({
        queryKey: ['services'],
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
    });
    let dispositivo = "container";
    const [servicio_elegido, setServicio_elegido] = useState<Servicio2[]>();
    const [selectedSubServicio, setSelectedSubServicio] = useState<Subservicio[] | null>(null);
    const [slider, setSlider] = useState<Subservicio[] | null>(null);
    const [subtitle, setSubtitle] = useState<boolean>(true);

    const filterServicio = (id: string) => {
        if (!serveces) {
            return;
        }
        const servicio: Servicio2[] = serveces.filter((servicio: Servicio2) => servicio.nombre === id);
        setSlider(servicio[0].subservicios);
        return servicio;
    }

    useEffect(() => {
        if (serveces) {
            if (id) {
                const servicioElegido = filterServicio(id);
                if (servicioElegido) {
                    const titleString = "servicios de " + servicioElegido[0].nombre;
                    setTitle(titleString);
                    setServicio_elegido(servicioElegido);
                    if (servicioElegido[0].nombre === "Topografía") {
                        setImagen(imagenTopografia);
                    }
                    if (servicioElegido[0].nombre === "Ingeniería y Consultoría") {
                        setImagen(imagenIngenieria);
                    }
                    if (servicioElegido[0].nombre === "Medio Ambiente") {
                        setImagen(imagenMedioAmbiente);
                    }
                }
            } else {
                setServicio_elegido(serveces);
                setTitle("Nuestros Servicios");
                const subServicios = serveces.flatMap((subServicio) => subServicio.subservicios);
                setSlider(subServicios);
            }
        }
    }, [serveces, id]);

    const { width } = useScreenSize();
    const isMobile = width <= 1000;
    const subServicioPaginaRef = useRef<HTMLDivElement>(null);
    if (isMobile) {
        dispositivo = "mobile";
    }

    const handleSubServicioClick = async (subServicio: Subservicio) => {
        if (!subServicio) {
            return;
        }

        const listSubservicios: Subservicio[] = []
        listSubservicios.push(subServicio)
        setSelectedSubServicio(listSubservicios);
        setSubtitle(false);
        if (!listSubservicios) {
            return
        }
        setSlider(listSubservicios);
        if (!id) {
            return
        }
        setTimeout(() => {
            setSelectedSubServicio(null);
            setSubtitle(true);
            if (!serveces) {
                return
            }
            filterServicio(id);
        }, 20000);
    };

    useEffect(() => {
        if (subServicioPaginaRef.current && !!selectedSubServicio) {
            const elementPosition = subServicioPaginaRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offset = -300; // Ajusta este valor según cuánto más arriba quieras que sea el scroll
            window.scroll({
                top: elementPosition + offset,
                behavior: 'smooth'
            });
        }
    }, [selectedSubServicio]);

    if (!servicio_elegido) {
        return <h3>Error</h3>;
    }

    return (
        <>
            <PagesLayout>
                <Banner title={servicio_elegido.length == 1 ? servicio_elegido[0].nombre : "Servicios"} paragraph={title.toString()} image={imagen} />
                <div className={dispositivo}>
                    <div className="row servicio">
                        {servicio_elegido.length === 1 ? (
                            <div className="col-12">
                                <h2 className="text-center">{title}</h2>
                            </div>
                        ) : (
                            <div className="row">
                                <LazyServicios />
                            </div>
                        )}
                    </div>
                    <div className="row content">
                        <div className="col-12 col-md-4 ">
                            <div className={`aside ${issue}-template`} >
                                {servicio_elegido.map((servicio) => {
                                    return (
                                        <div key={servicio.id}>
                                            <div className="row px-2">
                                                <div className="col-12">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.6 }}
                                                        className="servicio"
                                                        key={servicio.id}
                                                    >
                                                        <h3>{servicio?.nombre}</h3>
                                                        <p className='px-2'>{servicio?.descripcion}</p>
                                                    </motion.div>
                                                </div>
                                                <div>
                                                    {servicio.subservicios.map((subServicio) => {
                                                        return (
                                                            <div key={subServicio.id} className="row">
                                                                <div className="col-12">
                                                                    <motion.div
                                                                        onClick={() => handleSubServicioClick(subServicio)}
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="subservicio"
                                                                        key={subServicio.id}
                                                                    >
                                                                        <div className="row items mx-3">
                                                                            <span className="col-1 icon-row"><AiOutlineDoubleRight /></span>
                                                                            <h5 className="col-10">{subServicio.nombre + "   "}<span><AiFillCaretDown /></span></h5>
                                                                        </div>
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-12 col-md-8 " >
                            <div className="row slider">
                                <SliderServices subServicios={slider} subtitle={subtitle} />
                            </div>
                            
                            <div className="row porque-elegirnos" ref={subServicioPaginaRef} key={selectedSubServicio && selectedSubServicio[0]?.descripcion}>
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.3, delay: 1, delayChildren: 0.3, staggerChildren: 0.3 }}
                                        key={selectedSubServicio && selectedSubServicio[0]?.id}
                                    >
                                        <h2>
                                            {selectedSubServicio
                                                ? selectedSubServicio[0].nombre
                                                : "Servicios de calidad y con la más alta tecnología"}
                                        </h2>
                                        <p>
                                            {selectedSubServicio
                                                ? selectedSubServicio[0].descripcion
                                                : "Somos una empresa con más de 10 años de experiencia en el mercado, con profesionales altamente calificados y con amplia experiencia en el sector público y privado, brindando servicios de calidad y con la más alta tecnología."}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                                <div></div>
                                <div className='my-5'>
                                    <h2>Brochure</h2>
                                    <p>
                                        Para obtener una visión completa de nuestros servicios y ventajas, te invitamos a descargar nuestro brochure informativo. Aquí encontrarás detalles exhaustivos sobre nuestras ofertas, testimonios de clientes satisfechos y la información de contacto necesaria para dar el siguiente paso hacia una colaboración exitosa. ¡Descubre cómo podemos ayudarte a alcanzar tus objetivos hoy mismo!
                                    </p>
                                    <PdfViewer />
                                </div>
                            </div>
                        </div>
                        {servicio_elegido.length === 1 ? (
                            <div className="row">
                                <LazyServicios />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </PagesLayout>
        </>
    );
};

export default ServecesDetail;
