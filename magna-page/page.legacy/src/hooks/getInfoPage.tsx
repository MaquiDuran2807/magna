import { useQuery } from '@tanstack/react-query';
import { fetchAbout, fetchProjects, fetchProjectsImages, fetchServices1, fetchSlides, fetchWorkers } from '../api/pagesInfo';
import type { Servicio2, Slide } from '../types/types';

const DEFAULT_SERVICES: Servicio2[] = [{
  id: 1,
  nombre: "topografía",
  descripcion: "Ofrecemos soluciones topográficas profesionales, con equipos de alta tecnología y personal calificado. Estamos presentes en cada momento del proyecto, desde el levantamiento inicial hasta el control de obra, pasando por el diseño, la planificación y la ejecución",
  imagen: "/media/servicios/slide-banner1.webp",
  icon: "",
  imagen_tablet: "/media/servicios/slide-banner1.webp",
  imagen_celular: "/media/servicios/slide-banner1.webp",
  subservicios: [],
  caracteristicas: [],
}];

export const useGetServices = () => {
    const { data: services = DEFAULT_SERVICES, error: errorServices, isLoading: isLoadingServices } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices1,
        placeholderData: DEFAULT_SERVICES,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
    });
     if (!isLoadingServices && services !== DEFAULT_SERVICES) {
        console.log('[getInfoPage] real data loaded, services count:', services?.length);
        services?.forEach(s => console.log('[getInfoPage] service:', s.nombre, 'subservicios:', s.subservicios?.length));
        services?.map((service) => {
            const image = new Image();
            image.src = service.imagen;
        });
    }
    console.log('[getInfoPage] services:', services?.length, 'isLoading:', isLoadingServices, 'isPlaceholder:', services === DEFAULT_SERVICES);
    return { services, errorServices, isLoadingServices };
}

const SLIDE_PLACEHOLDER: Slide[] = [];

export const useGetSlides = () => {
    const { data: slides = SLIDE_PLACEHOLDER, error: errorSlides, isLoading: isLoadingSlides } = useQuery({
        queryKey: ['slides'],
        queryFn: fetchSlides,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
    });
    return { slides, errorSlides, isLoadingSlides };
}



const useGetWorjers = () => {
    const {
        data: workers,
        error: errorWorkers,
        isError: isErrorWorkers,
        refetch: refetchWorkers,
    } = useQuery(
        {queryKey:['workers'], queryFn: fetchWorkers,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
        console.log('aqui estoy en workers');
    return { workers, errorWorkers, isErrorWorkers, refetchWorkers};
};

export default useGetWorjers;

//  useGetProjects.tsx

export const useGetProjects = () => {
    const {
        data: projects,
        error: errorProjects,
        isError: isErrorProjects,
        refetch: refetchProjects,
    } = useQuery(
        {queryKey:['projects'], queryFn: fetchProjects,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
        );
        console.log('aqui estoy en projects');
        const{
            error: errorProjectsImages,
            isError: isErrorProjectsImages,
            data: projectImages,
        }=useQuery(
            {queryKey:['projectsImages'], queryFn: fetchProjectsImages,staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,}
            );
    return { projects, errorProjects, isErrorProjects, refetchProjects, projectImages, errorProjectsImages, isErrorProjectsImages};
};

export const useGetAbout = () => {
    const { data: about, error: errorAbout, isLoading: isLoadingAbout } = useQuery({
        queryKey: ['about'],
        queryFn: fetchAbout,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
    });
    return { about, errorAbout, isLoadingAbout };
};

