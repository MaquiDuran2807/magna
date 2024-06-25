// Date: 2021/09/03
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchServices1 } from '../api/pagesInfo';
import Spinner from '../components/spinner';
import { Servicio2 } from '../types/types';

// Modificación: Incluir imágenes en el tipo del contexto
const ServiciosContext = createContext<{ services: Servicio2[] | null | undefined, loading: boolean, images: HTMLImageElement[]}>({ services: null, loading: true, images: [] });

const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: services, error: errorServices, isLoading: isLoadingServices } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices1,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
    });

    // Nuevo estado para almacenar imágenes cargadas
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Modificación: Pre-carga de imágenes y almacenamiento en el contexto
    useEffect(() => {
        const preloadImages = async () => {
    if (services) {
        const imagePromises = services.map(service => {
            return new Promise<HTMLImageElement>((resolve) => {
                const img = new Image();
                img.src = service.imagen;
                img.onload = () => resolve(img);
                img.onerror = () => resolve(img); // Considerar manejar el error de manera diferente
            });
        });
        const loadedImages = await Promise.all(imagePromises);

        // Actualiza el estado con el arreglo de imágenes cargadas
        setImages(loadedImages);
    }
};
        preloadImages();
    }, [services]);

    if (isLoadingServices) {
        return <Spinner />;
    }

    if (errorServices) {
        return <>Error al cargar</>;
    }

    return (
        <ServiciosContext.Provider value={{ services, loading: isLoadingServices, images }}>
            {children}
        </ServiciosContext.Provider>
    );
};

export const useServicios = () => useContext(ServiciosContext);

export default ServiciosIdProvider;