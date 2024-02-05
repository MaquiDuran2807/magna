
import { ServecesMagna } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import { SetionHeader } from '../setionHeader'
import { Link } from 'react-router-dom';
import '../styles/Servicios.css'
import { API_URL } from '../../constans';
import React from 'react';


const Servicios = () => {
    const { data:servecios } = useQuery<ServecesMagna>({
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
                                servecios?.servicios.map((servicio) => {
                                    return (
                                        <div key={servicio.id} className="col-12 col-lg-4 col-md-6 order-md-1 ">
                                            <div className="card border-0 p-1 tarjeta tarjetas-12">
                                                <div className="card-body">
                                                    <img src={`${API_URL+servicio.icon}`} alt={servicio.nombre} /> 
                                                    <h4 className="card-title">{servicio.nombre}</h4>
                                                    <p className="card-title">{servicio.descripcion.slice(0, 150)}...</p>
                                                    <button className=' boton-1 '><Link to={`/servicios/${servicio.id}`}>Ver más</Link></button>
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
    const [show, setShow] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const onChange = (entries: IntersectionObserverEntry[],observer: { disconnect: () => void; }) => {
            const { isIntersecting } = entries[0];
            console.log(isIntersecting, 'aqui estoy en isIntersecting');
            
            if (isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        };

        const observer = new IntersectionObserver(onChange, {
            rootMargin: '100px',
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // return () => {
        //     if (elementRef.current) {
        //         observer.unobserve(elementRef.current);
        //     }
        // };
    }, []);

    return (
        <div id="LazyServices" ref={elementRef}>
            {show ? <Servicios /> : null}
        </div>
    );
}



