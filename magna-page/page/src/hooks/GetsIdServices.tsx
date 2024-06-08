// Date: 2021/09/03
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsImages,  fetchServices1, fetchWorkers} from '../api/pagesInfo';

const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const {
        data: serveces,
        error: errorServices,
        isLoading: isLoadingServices,
        isError: isErrorServices,
    }=useQuery(
        {queryKey:['services'], queryFn: fetchServices1,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    console.log(serveces, 'aqui estoy en servicios');
    const {
        error: errorWorkers,
        isError: isErrorWorkers,
    }= useQuery(
        {queryKey:['workers'], queryFn: fetchWorkers,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    
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
    
            if (isErrorWorkers || isErrorProjects) {
                console.log(errorWorkers, errorProjects, errorProjectsImages, 'aqui estoy en error');
                ;
            }
    
    

    if (isLoadingServices ) {
        return <div>cargando...</div>
    }
    

    if ( isErrorServices ) {
        console.log( errorServices,  'aqui estoy en error');
        ;
    }
    return <>{children}</>;
};


export default ServiciosIdProvider;

