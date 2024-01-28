import topografia from '../../assets/img/app/topografia.svg'
import medio from '../../assets/img/app/medio.svg'
import ingenieria from '../../assets/img/app/ingenieria.svg'
import { SetionHeader } from '../setionHeader'
import { Link } from 'react-router-dom';
import '../styles/Servicios.css'

export const Servicios = () => {
    const servicios = [
        {
            id: 1,
            title: 'Topografía',
            description: 'Georreferenciación de puntos geodésicos, Levantamientos topográficos, replanteos, Nivelaciones de precisión, Fotogrametría, entre otros.',
            img: topografia,
            url: '/services_topografia'
        },
        {
            id: 2,
            title: 'Ingeniería  y Consultoría',
            description: 'Diseño y construcción de obras civiles, Estudios hidrológicos e hidráulicos, Estudios Geológicos y Geotécnicos, entre otros.',
            img: ingenieria,
            url: '/services_ingenieria'
        },
        {
            id: 3,
            title: 'Medio Ambiente',
            description: 'Trámites y permisos Ambientales, Estudios de impacto ambiental, auditorías, monitoreo ambiental, programas y proyectos de manejo ambiental, entre otros.',
            img: medio,
            url: '/services_ambiental'
        }
    ]
    return(
        <section className="servicios   ">
            <div className="container servicios-container">
                <div className="row ">
                    <SetionHeader title="Servicios" />
                </div>
                <div className="row">
                    {/* tarjetas */}
                    <div className="col-12 col-lg-12">
                        <div className="row ">
                            {
                                servicios.map((servicio) => {
                                    return (
                                        <div key={servicio.id} className="col-12 col-lg-4 col-md-6 order-md-1 ">
                                            <div className="card border-0 p-1 tarjeta tarjetas-12">
                                                <div className="card-body">
                                                    <img src={servicio.img} alt={servicio.title} />
                                                    <h4 className="card-title">{servicio.title}</h4>
                                                    <p className="card-title">{servicio.description}</p>
                                                    <button className=' boton-1 '><Link to={servicio.url}>Ver más</Link></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
    </section>
    )
}