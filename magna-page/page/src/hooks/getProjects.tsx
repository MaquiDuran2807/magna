import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsImages, fetchWorkers } from '../api/pagesInfo';

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

