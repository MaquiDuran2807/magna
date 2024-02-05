import Banner from '../components/banner';
import CardsProjects from '../components/cardsProjects';
// import { Proyectos } from '../components/sections/proyectos';
import PagesLayout from '../layouts/pagesLayouts';
import { useQuery } from '@tanstack/react-query';

import { ProyectosMagna,ProyectImagesMagna} from '../types/projects';

const Projects: React.FC = () => {
    const { data:project } = useQuery<ProyectosMagna>({
        queryKey: ['projects'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });
    const { data:projectImages } = useQuery<ProyectImagesMagna[]>({
        queryKey: ['projectsImages'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });

    console.log(project, 'aqui estoy en project');
    
    // const Project:ProyectosMagna=useSelector((state: RootState) => state.projects.data);
    if(!project || !projectImages){
        return null;
    }
    return (
        <PagesLayout>
            <Banner title="Proyectos" paragraph='Proyectos' />
            <br />
            <br />
            <div className="container">
                <div className="row">
                <CardsProjects type={0} actualPage={null} imagenes={projectImages} />
                </div>
            </div>
            {/* <Proyectos/> */}
            <div className="container">
                <div className="row">
                    
                </div>
            </div>
        </PagesLayout>
    );
};

export default Projects;
