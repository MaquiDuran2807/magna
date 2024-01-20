
import logo from '../../assets/img/SVG/Recurso 1.svg'
import equipo1 from '../../assets/img/equipos/1.png'
import equipo2 from '../../assets/img/equipos/2.png'
import equipo3 from '../../assets/img/equipos/3.png'
import equipo4 from '../../assets/img/equipos/4.png'
import { SetionHeader } from '../setionHeader'
import '../styles/equipos.css'
import {  useSelector } from 'react-redux';
import { RootState } from '../../store';


const Equipos = () => {
    const equipos= useSelector((state: RootState) => state.equipos.data);
    return (
        <section className="equipo">
            <div className="container">
                <div className="row">
                    <SetionHeader title="Equipos y Tecnología" />
                </div>
                <div >
                    <div className="row  justify-content-center">
                        <div className="col-xl-3 col-md-5  col-card  justify-content-center">
                            <div className=" shadow card-equip" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                <div key={"equip-1"} className='equip-1'>
                                    <img src={equipo1} alt="Card 1" className="img-fluid rounded mx-auto d-block" />
                                    <img src={logo} alt="Company Logo" className="logo"  />
                                </div>
                            </div>
                            <div className=" desplegable" >
                                <div className='conteiner-desplegable '>
                                    <h3>
                                        receptor gnss
                                    </h3>
                                    <p>
                                        Un receptor GNSS es un dispositivo que usa las señales de los satélites para determinar la ubicación exacta de un objeto en la Tierra. Contámos con receptores GNSS de alta tecnología, que nos permiten hacer mediciones topográficas precisas y rápidas.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-5 col-card">
                            <div className="shadow card-equip" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                <div key={"equip-2"} className='equip-2'>
                                    <img src={equipo2} alt="Card 1" className="img-fluid rounded mx-auto d-block" />
                                    <img src={logo} alt="Company Logo" className="logo"  />
                                </div>
                            </div>
                            <div className="desplegable">
                                <div className='conteiner-desplegable '>
                                    <h3>
                                        Estación total
                                    </h3>
                                    <p>
                                        Una estación total es un instrumento de medición que permite determinar la distancia y ángulo entre dos puntos. Contámos con estaciones totales de alta tecnología, que nos permiten hacer mediciones topográficas precisas y rápidas.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-5  col-card">
                            <div className="shadow card-equip" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                <div key={"equip-3"} className='equip-3'>
                                    <img src={equipo3} alt="Card 1" className="img-fluid rounded mx-auto d-block" />
                                    <img src={logo} alt="Company Logo" className="logo" />
                                </div>
                            </div>
                            {/* dron */}
                            <div className=" desplegable" >
                                <div className='conteiner-desplegable '>
                                    <h3>
                                        dron
                                    </h3>
                                    <p>
                                        Un dron es una aeronave no tripulada que puede ser controlada de forma remota por un operador. Contámos con drones de alta tecnología, que nos permiten hacer mediciones topográficas precisas.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-5  col-card">
                            <div className=" shadow card-equip" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                <div key={"equip-4"} className='equip-4'>
                                    <img src={equipo4} alt="Card 1" className="img-fluid rounded mx-auto d-block" />
                                    <img src={logo} alt="Company Logo" className="logo" />
                                </div>
                            </div>
                            <div className=" desplegable">
                                <div className='conteiner-desplegable '>
                                    <h3>
                                        nivel óptico
                                    </h3>
                                    <p>
                                        Un nivel óptico es un instrumento de medición que permite determinar la diferencia de altura entre dos puntos. Contámos con niveles ópticos de alta tecnología, que nos permiten hacer mediciones topográficas precisas y rápidas.
                                    </p>
                                </div>
                            </div>
                        {/* nivel optico */}
                        </div>
                    </div>

                {/* personal */}
                <div className="row">
                    {/* imagen del grupo de trabajadores y descripcion */}
                    <div className="col-12 shadow workers ">
                        <div className="" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        equipos?.map((equipo) => (
                           
                            <div key={equipo.id} className="col-xl-3 col-md-5  col-card">
                            <div className=" shadow card-equip" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                <div className='equip-4 workers-equip'>
                                    <img src={"http://127.0.0.1:8000/"+equipo.imagen} alt="Card 1" className="img-fluid rounded mx-auto d-block " />
                                    <div className="content-cardequip">
                                        <h3>
                                            {equipo.nombre}
                                        </h3>
                                        
                                    </div>
                                    
                                    <img src={logo} alt="Company Logo" className="logo-1" />
                                </div>
                            </div>
                            <div className=" desplegable">
                                <div className='conteiner-desplegable '>
                                    <h3>
                                        {equipo.nombre}
                                    </h3>
                                    <h5>
                                        {equipo.posicion}
                                    </h5>
                                    
                                    <p>
                                        {equipo.descripcion}
                                    </p>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                    </div>
            </div>
        </div>
    </section>
    );
};

export default Equipos;


