import Banner from '../components/banner';
import CardsProjects from '../components/cardsProjects';
// import { Proyectos } from '../components/sections/proyectos';
import PagesLayout from '../layouts/pagesLayouts';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { ProyectosMagna,} from '../types/types';

const Projects: React.FC = () => {
    const Project:ProyectosMagna=useSelector((state: RootState) => state.projects.data);
    if(!Project){
        return null;
    }
    return (
        <PagesLayout>
            <Banner title="Proyectos" paragraph='Proyectos' />
            <br />
            <br />
            <div className="container">
                <div className="row">
                <CardsProjects type={0} actualPage={Project.proyectos} imagenes={Project.imagenes} />
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
