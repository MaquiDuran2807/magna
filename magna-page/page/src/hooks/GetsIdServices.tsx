// Date: 2021/09/03
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsImages, fetchServices, fetchWorkers} from '../api/pagesInfo';
import {Spinner} from '../components/spinner';
import nosotros from '../assets/img/banner/nosotros.jpg';
import servicios from '../assets/img/banner/servicios.png';
import projects from '../assets/img/banner/projects.png';
import topo from '../assets/img/banner/topo.png';
import ingenieria from '../assets/img/banner/ingenieria.png';
import medio from '../assets/img/banner/medio.png';
import { useAuth } from '../auth/AuthProvider';

const imagesPaths = [
 nosotros,
  servicios,
  projects,
  topo,
  ingenieria,
  medio,
];

const images: HTMLImageElement[] = [];

imagesPaths.forEach(path => {
  const img = new Image();
  img.src = path;
  images.push(img);
});
export const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth=useAuth()
    auth.validateToken()


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

