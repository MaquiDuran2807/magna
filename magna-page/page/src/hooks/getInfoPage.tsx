import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsImages, fetchServices1, fetchWorkers } from '../api/pagesInfo';

export const useGetServices = () => {
    const { data: services, error: errorServices, isLoading: isLoadingServices } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices1,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
    });
     services?.map((service) => {
        const image = new Image();
        image.src = service.imagen;
        console.log(image.src, 'cargada');
    }
    );
    return { services, errorServices, isLoadingServices };
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

