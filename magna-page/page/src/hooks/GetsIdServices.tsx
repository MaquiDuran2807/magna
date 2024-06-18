// Date: 2021/09/03
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {  fetchServices1} from '../api/pagesInfo';
// import { Spinner } from 'react-bootstrap';
import Spinner from '../components/spinner';

const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loadingImages, setLoadingImages] = React.useState<boolean>(true);
    const {
        data: services,
        error: errorServices,
        isLoading: isLoadingServices,
        isError: isErrorServices,
    }=useQuery(
        {queryKey:['services'], queryFn: fetchServices1,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );

        console.log('aqui estoy en servicios');


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
    
    return <>{children}</>;
};


export default ServiciosIdProvider;

