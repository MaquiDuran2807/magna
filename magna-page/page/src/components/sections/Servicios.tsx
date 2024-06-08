
import { Servicio2 } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import { SetionHeader } from '../setionHeader'
import { Link } from 'react-router-dom';
import '../styles/Servicios.css'
import useIntersectionObserver from '../../hooks/useLazyload';

const Servicios = () => {
    console.log("me rendericé Servicios seccion=====================");
    
    const { data:servecios } = useQuery<Servicio2[]>({
        queryKey: ['services'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });
    return(
        <section className="servicios   ">
            <div className="container servicios-container">
                <div className="row ">
                    <SetionHeader title="Servicios" />
                </div>
                <div className="row">
                    {/* tarjetas */}
                    <div className="col-12 col-lg-12">
                        <div className="row ">
                            {
                                servecios?.map((servicio) => {
                                    return (
                                        <div key={servicio.id} className="col-12 col-lg-4 col-md-6 order-md-1 ">
                                            <div className="card border-0 p-1 tarjeta tarjetas-12">
                                                <div className="card-body">
                                                    <img src={`${servicio.icon}`} alt={servicio.nombre} /> 
                                                    <h4 className="card-title">{servicio.nombre}</h4>
                                                    <p className="card-title">{servicio.descripcion.slice(0, 150)}...</p>
                                                    <button className=' boton-1 '><Link to={`/servicios/${servicio.nombre}`}>Ver más</Link></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
    </section>
    )
}

export default function LazyServicios() {
    const {  isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyServices" ref={ref}>
            {isVisible ? <Servicios /> : null}
        </div>
    );
}



