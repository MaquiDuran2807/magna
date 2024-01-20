import { SetionHeader } from '../setionHeader'
import { SwiperProjects } from '../sliderProjects'
import '../styles/proyectos.css'


export const Proyectos = () => {
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