import Banner from '../components/banner';
import CardsProjects from '../components/cardsProjects';
import PagesLayout from '../layouts/pagesLayouts';
import imagen from '../assets/img/banner/projects.webp';
import { useGetProjects } from '../hooks/getProjects';
import { memo } from 'react';
import useIntersectionObserver from '../hooks/useLazyload';

const Projects: React.FC = memo(() => {
    // 
    const { projects, projectImages } = useGetProjects();

    if( !projectImages || !projects){
        return null;
    }
    return (
        <PagesLayout>
            <Banner title="Proyectos" paragraph='Proyectos' image={imagen} />
            <br />
            <br />
            <div className="container">
                <div className="row">
                <CardsProjects type={0} actualPage={null} imagenes={projectImages} projects={projects} />
                </div>
            </div>
            {/* <Proyectos/> */}
            <div className="container">
                <div className="row">
                    
                </div>
            </div>
        </PagesLayout>
    );
});

export default function LazyProjects () {
    const { isVisible, ref } = useIntersectionObserver('100px');
  
    return (
        <div id="LazyProjects" ref={ref}>
            {isVisible ? <Projects/> : null}
        </div>
    );
  }