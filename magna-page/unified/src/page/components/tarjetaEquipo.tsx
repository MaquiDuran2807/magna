// TarjetaEquipo.tsx
import React from 'react';
// icono de hacer click o tocar la tarjeta
import { MdOutlineTouchApp } from "react-icons/md";
import arriba from '../assets/img/equipos/arriba.png';
import abajo from '../assets/img/equipos/abajo.png';

interface TarjetaEquipoProps {
    id: string;
    imagen: string;
    nombre: string;
    descripcion?: string;
    posicion?: string;
    tipo: 'tecnologia' | 'equipo';
    handleCardClick: (id: string, tipo: string) => void;
    selectedCard: string;
    APIURL: string;
    logo: string;
}

const TarjetaEquipo: React.FC<TarjetaEquipoProps> = ({ id, imagen, nombre, descripcion, posicion, tipo, handleCardClick, selectedCard, APIURL, logo }) => {
    return (
        <div key={id} className="col-xl-3 col-md-5 col-card cards-sections-equips my-3 ">
            <div onClick={() => handleCardClick(id, tipo)} className={`shadow card-equip ${selectedCard === id + tipo ? 'card-equipHover' : ''}`} style={{ border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className={`equip-${tipo === 'tecnologia' ? '1' : '4'} ${tipo === 'equipo' ? 'workers-equip' : ''}`}>
                    <img src={APIURL + imagen} alt="Card" className="img-fluid rounded mx-auto d-block" />
                    <h3 className='text-center text-capitalize'>
                        {nombre} 
                    </h3>
                    <img src={logo} alt="Company Logo" className="logo-1" />
                    <div className='text-center'>
                        <MdOutlineTouchApp  size={24} className='touch'/>
                    </div>
                    <img src={arriba} alt="arriba" className="arriba" />
                    <img src={abajo} alt="abajo" className="abajo" />
                </div>
            </div>
            <div className="desplegable">
                <div className='conteiner-desplegable'>
                    <h3>{nombre}</h3>
                    {posicion && <h5>{posicion}</h5>}
                    <p>{descripcion}</p>
                </div>
            </div>
        </div>
    );
};

export default TarjetaEquipo;