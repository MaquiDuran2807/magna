// Date: 2021/09/03
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsImages, fetchServices, fetchWorkers } from '../api/pagesInfo';
import {Spinner} from '../components/spinner';

export const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const {
        error: errorWorkers,
        isLoading: isLoadingWorkers,
        isError: isErrorWorkers,
    }=useQuery(
        {queryKey:['workers'], queryFn: fetchWorkers,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );

    const {
        error: errorServices,
        isLoading: isLoadingServices,
        isError: isErrorServices,
    }=useQuery(
        {queryKey:['services'], queryFn: fetchServices,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    
    const{
        error: errorProjects,
        isLoading: isLoadingProjects,
        isError: isErrorProjects,
    }=useQuery(
        {queryKey:['projects'], queryFn: fetchProjects,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
    const{
        error: errorProjectsImages,
        isLoading: isLoadingProjectsImages,
    }=useQuery(
        {queryKey:['projectsImages'], queryFn: fetchProjectsImages,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );

    if (isLoadingWorkers || isLoadingServices || isLoadingProjects||isLoadingProjectsImages) {
        return <Spinner/>;
    }
    if (isErrorWorkers || isErrorServices || isErrorProjects) {
        console.log(errorWorkers, errorServices, errorProjects, errorProjectsImages, 'aqui estoy en error');
        ;
    }
    return <>{children}</>;
};


export default ServiciosIdProvider;


    





// import React, { useEffect,} from 'react';
// import { useDispatch} from 'react-redux';
// import { setServiciosId } from '../redux/reducers/serviciosIdSlice';
// import { setEquipos} from '../redux/reducers/equipSlice';
// import { setProject} from '../redux/reducers/projectsSlice';
// import { Equipos,ProyectosMagna} from '../types/types';
// import { API_EQUIPOS,API_SERVICIOS,API_PROYECTOS} from '../constans';



// export const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const dispatch = useDispatch();
//     // const serviciosId = useSelector((state: RootState) => state.serviciosId);
//     // const equipos = useSelector((state: RootState) => state.equipos);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(API_PROYECTOS);
//                 const result = await response.json();
//                 const proyectos: ProyectosMagna[] = result;
//                 dispatch(setProject(proyectos));
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, [dispatch]);

//     useEffect(() => {
//         const fetchEquipos = async () => {

//             try {
//                 const response = await fetch(API_EQUIPOS);
//                 const result = await response.json();
//                 const equipos: Equipos[] = result;
//                 dispatch(setEquipos(equipos));
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchEquipos();
//     }, [dispatch]);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(API_SERVICIOS);
//                 const result = await response.json();
//                 dispatch(setServiciosId(result));
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, [dispatch]);

//     return <>{children}</>;
// };

// export default ServiciosIdProvider;
