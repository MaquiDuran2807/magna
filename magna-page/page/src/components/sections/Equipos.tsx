
import logo from '../../assets/img/SVG/Recurso 1.svg'
import { SetionHeader } from '../setionHeader'
import '../styles/equipos.css'
import { useQuery } from '@tanstack/react-query';
import { EquiposAndTech} from '../../types/types';
import { APIURL } from '../../apiClient';
import useIntersectionObserver from '../../hooks/useLazyload'
import { useState } from 'react';


const Equipos1 = () => {
    const [selectedCard, setSelectedCard] = useState('');

const handleCardClick = (id: string,card:string) => {
    console.log(id+card);
    
    if (selectedCard === id+card) {
        console.log('click');
        setSelectedCard('');
        return;
    }
    setSelectedCard(id+card); 
    console.log(selectedCard,"click");
    
};
    const { data:Workers } = useQuery<EquiposAndTech>({
        queryKey: ['workers'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
    });
    return (
        <section className="equipo">
            <div className="container">
                <div className="row">
                    <SetionHeader title="Equipos y Tecnología" />
                </div>
                <div >
                    <div className="row  justify-content-center">
                        {
                            Workers?.tecnologias.map((tecnologia) => (
                                <div key={tecnologia.id} className="col-xl-3 col-md-5  col-card">
                                    <div onClick={
                                        () => handleCardClick(tecnologia.id.toString(),"tecnologia")
                                    } className= {`shadow card-equip ${selectedCard === tecnologia.id.toString()+"tecnologia" ? 'card-equipHover' : ''}`} style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                        <div key={"equip-1"} className='equip-1'>
                                            <img src={APIURL+tecnologia.imagen} alt="Card 1" className="img-fluid rounded mx-auto d-block" />
                                            <img src={logo} alt="Company Logo" className="logo"  />
                                        </div>
                                    </div>
                                    <div className=" desplegable">
                                        <div className='conteiner-desplegable '>
                                            <h3>
                                                {tecnologia.nombre}
                                            </h3>
                                            <p>
                                                {tecnologia.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
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
                        Workers?.equipos.map((equipo) => (
                            <div key={equipo.id} className="col-xl-3 col-md-5  col-card">
                            <div className={` shadow card-equip ${selectedCard === equipo.id.toString()+"equipo" ? 'card-equipHover' : ''}`} style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                                <div onClick={
                                        () => handleCardClick(equipo.id.toString(),"equipo")
                                    } className={`equip-4 workers-equip `}>
                                    <img src={APIURL+equipo.imagen} alt="Card 1" className="img-fluid rounded mx-auto d-block " />
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

// export default Equipos;

export default function LazyEquipos () {
    const {  isVisible, ref } = useIntersectionObserver('150px');
    return (
        <div id="LazyServices" ref={ref}>
            {isVisible ? <Equipos1/> : null}
        </div>
    );
  }


