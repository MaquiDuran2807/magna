
import { Suspense, memo, useState } from 'react';
import { APIURL } from '../../apiClient';
import logo from '../../assets/img/SVG/Recurso 1.svg';
import useGetWorjers from '../../hooks/getInfoPage';
import useIntersectionObserver from '../../hooks/useLazyload';
import { SetionHeader } from '../setionHeader';
import '../styles/equipos.css';
import TarjetaEquipo from '../tarjetaEquipo';


const Equipos1 = memo(() => {;
    const [selectedCard, setSelectedCard] = useState('');

    const handleCardClick = (id: string,card:string) => {
        if (selectedCard === id+card) {
            setSelectedCard('');
            return;
        }
        setSelectedCard(id+card); 
    };

    const { workers} = useGetWorjers(); 

    return (
        <section className="equipo">
            <div className="container">
                <div className="row">
                    <SetionHeader title="Equipos y Tecnología" />
                </div>
                <div >
                    <div className="row  justify-content-center">
                        <Suspense fallback={<div>Cargando...</div>}>
                            {workers?.tecnologias.map((tecnologia) => (
                                <TarjetaEquipo
                                    key={tecnologia.id}
                                    id={tecnologia.id.toString()}
                                    imagen={tecnologia.imagen}
                                    nombre={tecnologia.nombre}
                                    descripcion={tecnologia.descripcion}
                                    tipo="tecnologia"
                                    handleCardClick={handleCardClick}
                                    selectedCard={selectedCard}
                                    APIURL={APIURL}
                                    logo={logo}
                                />
                            ))}
                        </Suspense>
                    </div>

                    {/* personal */}
                    <div className="row my-4">
                        {/* imagen del grupo de trabajadores y descripcion */}
                        <div className="col-12 shadow workers ">
                            <div className="" style={{border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {workers?.equipos.map((equipo) => (
                            <TarjetaEquipo
                                key={equipo.id}
                                id={equipo.id.toString()}
                                imagen={equipo.imagen}
                                nombre={equipo.nombre}
                                descripcion={equipo.descripcion}
                                tipo="equipo"
                                handleCardClick={handleCardClick}
                                selectedCard={selectedCard}
                                APIURL={APIURL}
                                logo={logo}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

// export default Equipos;

export default function LazyEquipos () {
    const {  isVisible, ref } = useIntersectionObserver('150px');
    return (
        <div id="LazyEquip" ref={ref}>
            {isVisible ? <Equipos1/> : null}
        </div>
    );
  }