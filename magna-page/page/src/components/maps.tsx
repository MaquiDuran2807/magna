// Date: 04/08/21
import React from 'react';
import logo from '../assets/img/SVG/Recurso 1.svg';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import useIntersectionObserver from '../hooks/useLazyload';

const position: [number,number] = [4.444319033924122, -75.23365217644438];

const MapComponent: React.FC = () => {
  const customIcon = new Icon({
    iconUrl: logo,
    iconSize: [32, 32],
  });

  return (
    <MapContainer center={position} zoom={17} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    
      <Marker position={position} draggable={true} icon={customIcon}>
        <Popup>
          Magna <br /> Ingeniería y Topografía
        </Popup>
      </Marker>
    </MapContainer>
  );
};

 
export default function LazyMapComponents () {
  const {  isVisible, ref } = useIntersectionObserver('50px');
  return (
      <div id="LazyMapComponent" ref={ref}>
          {isVisible? <MapComponent /> : null}
      </div>
  );
}


