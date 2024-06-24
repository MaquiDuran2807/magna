// Date: 2021/09/03
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {  fetchServices1} from '../api/pagesInfo';
// import { Spinner } from 'react-bootstrap';
import Spinner from '../components/spinner';
import { Servicio2 } from '../types/types';

// Paso 1: Crear un contexto
const ServiciosContext = createContext<{ services: Servicio2[] | null | undefined, loading: boolean }>({ services: null , loading: true });

const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loadingImages, setLoadingImages] = useState<boolean>(true);
    const {data: services,error: errorServices,isLoading: isLoadingServices,isError: isErrorServices,
    }=useQuery(
        {queryKey:['services'], queryFn: fetchServices1,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    useEffect(() => {
        if (services) {
            const imagePromises = services.map(service => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = service.imagen;
                    img.onload = resolve;
                });
            });

            Promise.all(imagePromises).then(() => setLoadingImages(false));
        }
    }, [services]);


    if (isLoadingServices ) {
        return <div>cargando...</div>
    }
    

    if ( isErrorServices  ) {
        console.error( errorServices,  'aqui estoy en error');
        ;
    }
    if (services) {
        const images: HTMLImageElement[] =  [];
        console.log('aqui estoy en services getser',services);
        services.forEach((service) => {
            images.push(new Image());
            images[images.length - 1].src = service.imagen;
        }
        );
        images[images.length - 1].onload = () => {
            setLoadingImages(false);
        };
    }
    if (loadingImages) {
        return <div><Spinner/></div>
    }
    
    return (
        <ServiciosContext.Provider value={{ services, loading: isLoadingServices || loadingImages }}>
            {children}
        </ServiciosContext.Provider>
    );
};
export const useServicios = () => useContext(ServiciosContext);

export default ServiciosIdProvider;

