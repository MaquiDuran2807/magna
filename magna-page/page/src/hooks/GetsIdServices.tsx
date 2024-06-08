// Date: 2021/09/03
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsImages,  fetchServices1, fetchWorkers} from '../api/pagesInfo';

import nosotros from '../assets/img/banner/nosotros.jpg';
import servicios from '../assets/img/banner/servicios.png';
import projects from '../assets/img/banner/projects.png';
import topo from '../assets/img/banner/topo.png';
import ingenieria from '../assets/img/banner/ingenieria.png';
import medio from '../assets/img/banner/medio.png';

const AsyncImages = async () => {
    const imagesPaths = await[
        nosotros,
        servicios,
        projects,
        topo,
        ingenieria,
        medio,
       ];
    
    const images: HTMLImageElement[] =await  [];
    
    await imagesPaths.forEach(path => {
        const img = new Image();
        img.src = path;
        images.push(img);
    });
}

const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {



    const {
        error: errorWorkers,
        isError: isErrorWorkers,
    }=useQuery(
        {queryKey:['workers'], queryFn: fetchWorkers,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );

    const {
        data: serveces,
        error: errorServices,
        isLoading: isLoadingServices,
        isError: isErrorServices,
    }=useQuery(
        {queryKey:['services'], queryFn: fetchServices1,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    console.log(serveces, 'aqui estoy en servicios');
    
    const{
        error: errorProjects,
        isError: isErrorProjects,
    }=useQuery(
        {queryKey:['projects'], queryFn: fetchProjects,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    const{
        error: errorProjectsImages,
    }=useQuery(
        {queryKey:['projectsImages'], queryFn: fetchProjectsImages,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );

    if (isLoadingServices ) {
        console.log('loading');
        
    }
    if (isErrorWorkers || isErrorServices || isErrorProjects) {
        console.log(errorWorkers, errorServices, errorProjects, errorProjectsImages, 'aqui estoy en error');
        ;
    }
    AsyncImages();

    return <>{children}</>;
};


export default ServiciosIdProvider;

