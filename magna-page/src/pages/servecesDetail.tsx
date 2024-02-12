
import Banner from "../components/banner"
import PagesLayout from "../layouts/pagesLayouts";
import { useState,useRef,useEffect,lazy  } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { SubServicio,Servicio,  ServecesMagna} from "../types/types";
import { AnimatePresence, motion } from 'framer-motion';
const LazyServicios = lazy(() => import('../components/sections/Servicios'));
import SliderServices from "../components/sliderServices";
import useScreenSize from '../hooks/ScreenSize';
import { useQuery } from '@tanstack/react-query';
import "./styles/servicesDetail.css";
import { useParams } from "react-router-dom";
import imagenServicios from '../assets/img/banner/servicios.png';
import imagenTopografia from '../assets/img/banner/topo.png';
import imagenIngenieria from '../assets/img/banner/ingenieria.png';
import imagenMedioAmbiente from '../assets/img/banner/medio.png';

interface ServecesDetailProps {
    issue: string;
}



const ServecesDetail: React.FC<ServecesDetailProps> = ({ issue }) => {
    const { id } = useParams<{ id: string }>();
    let [title, setTitle] = useState<String>("Nuestros Servicios");
    let [imagen, setImagen] = useState<String>(imagenServicios);
    const { data:serveces } = useQuery<ServecesMagna>({
        queryKey: ['services'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
    });
    let dispositivo = "container";
    const [servicio_elegido, setServicio_elegido] = useState<Servicio[]>();
    const [subServicio_elegido, setSubServicio_elegido] = useState<SubServicio[]>([]);
    const [selectedSubServicio, setSelectedSubServicio] = useState<SubServicio | null>(null);
   useEffect(() => {
    if (serveces) {
        if (id){
            const servicioElegido = serveces.servicios.filter((servicio: Servicio) => servicio.id.toString() === id);
            if (servicioElegido) {
                const titleString = "servicios de "+ servicioElegido[0].nombre;
                setTitle(titleString);
                setServicio_elegido(servicioElegido);
                const subServiciosElegidos = serveces.subServicios.filter((subServicio: SubServicio) => subServicio.servicio_id === servicioElegido[0].id);
                setSubServicio_elegido(subServiciosElegidos);
                if (servicioElegido[0].nombre === "Topografía") {
                    setImagen(imagenTopografia);
                }
                if (servicioElegido[0].nombre === "Ingeniería y Consultoría") {
                    setImagen(imagenIngenieria);
                }
                if (servicioElegido[0].nombre === "Medio Ambiente") {
                    setImagen(imagenMedioAmbiente);
                }
                
                console.log(title, 'title');
                
            }
        }else{
            setServicio_elegido(serveces.servicios)
            setSubServicio_elegido(serveces.subServicios)
            setTitle("Nuestros Servicios");
        }
    }
    }, [serveces, id]);
    
    const { width} = useScreenSize();
    const isMobile = width <= 1000;
    const subServicioPaginaRef = useRef<HTMLDivElement >(null);
if (isMobile) {
    dispositivo = "mobile";
}

    const handleSubServicioClick = async(subServicio: SubServicio) => {
        setSelectedSubServicio(subServicio);
    };
    useEffect(() => {
        if (subServicioPaginaRef.current&&!!selectedSubServicio) {
            // Realizar la lógica de scroll aquí
            subServicioPaginaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    , [selectedSubServicio]);
    if (!servicio_elegido || !subServicio_elegido) {
        return <h3>Error</h3>;
    }
    console.log( servicio_elegido, 'servicio_elegido');
    
    return (
        <>
            <PagesLayout>
                <Banner title={servicio_elegido.length==1 ? servicio_elegido[0].nombre:"Servicios" } paragraph={title.toString()} image={imagen} />
                <div className={dispositivo}>
                    <div className="row servicio">
                        <div className="col-12">
                            <h2 className="text-center"> {title}</h2>
                        </div>
                    </div>
                    <div className="row content">
                        <div className="col-12 col-md-4 ">
                            <div  className={`aside ${issue}-template`} >
                                {
                                servicio_elegido.map((servicio) => {
                                    return (
                                        <div key={servicio.id}>
                                            <div  className="row">
                                                <div className="col-12">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.6}}
                                                        className="servicio"
                                                        key={servicio.id}
                                                    >
                                                        <h3>{servicio?.nombre}</h3>
                                                        <p>{servicio?.descripcion}</p> 
                                                    </motion.div>
                                                </div>
                                                <div>
                                                    {
                                                    subServicio_elegido.filter((subServicio) => subServicio.servicio_id === servicio.id)
                                                    .map((subServicio) => {
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
                                                                        <div className="row items">
                                                                        <span className="col-1 icon-row"><AiOutlineDoubleRight /></span>
                                                                        <h5 className="col-10">{subServicio.nombre+"   "}<span><AiFillCaretDown /></span></h5>
                                                                        </div>
                                                                        
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )
                                }
                            </div>
                        </div>
                        <div className="col-12 col-md-8 " >
                            <div className="row slider">
                                <SliderServices subServicios={subServicio_elegido}/>
                            </div>
                            <div ref={subServicioPaginaRef} key={selectedSubServicio?.descripcion}>
                                <br />
                            </div>
                            <br />
                            <br />
                            <div className="row porque-elegirnos" >
                                    {
                                       <AnimatePresence>
                                       <motion.div
                                         initial={{ height: 0, opacity: 0 }}
                                         animate={{ height: "auto", opacity: 1 }}
                                         exit={{ height: 0, opacity: 0, scale: 0.5 }}
                                         transition={{ duration: 0.3, delay: 1, delayChildren: 0.3, staggerChildren: 0.3 }}
                                         key={selectedSubServicio?.id}
                                       >
                                         <h2>
                                           {selectedSubServicio
                                             ? selectedSubServicio.nombre
                                             : "Servicios de calidad y con la más alta tecnología"}
                                         </h2>
                                         <p>
                                           {selectedSubServicio
                                             ? selectedSubServicio.descripcion
                                             : "Somos una empresa con más de 10 años de experiencia en el mercado, con profesionales altamente calificados y con amplia experiencia en el sector público y privado, brindando servicios de calidad y con la más alta tecnología."}
                                         </p>
                                       </motion.div>
                                     </AnimatePresence>
                                    }
                                <h2>¿Por qué elegirnos?</h2>
                                <p>
                                    Somos una empresa con más de 10 años de experiencia en el mercado, con
                                    profesionales altamente calificados y con amplia experiencia en el sector
                                    público y privado, brindando servicios de calidad y con la más alta
                                    tecnología.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <LazyServicios />
                    </div>
                </div>
            </PagesLayout>
        </>
    );
};

export default ServecesDetail;