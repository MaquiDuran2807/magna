
import { SetionHeader } from '../setionHeader'
import { SwiperProjects } from '../sliderProjects'
import '../styles/proyectos.css'
import useIntersectionObserver from '../../hooks/useLazyload'


const Proyectos = () => {
    console.log("me rendericé Proyectos seccion=====================");
    
    return (
        
        <section className="proyectos">
            <div className="container">
                <div className="row">
                    <SetionHeader title="Proyectos" />
                </div>
                <div className="row">
                    <SwiperProjects />
                </div>
            </div>
        </section>
    )
}

export default function LazyProyectos () {
    const {  isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyProyectos" ref={ref}>
            {isVisible ? <Proyectos /> : null}
        </div>
    );
  }