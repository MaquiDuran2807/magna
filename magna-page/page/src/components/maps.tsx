// Date: 04/08/21
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position: [number,number] = [4.444319033924122, -75.23365217644438];

const MapComponent: React.FC = () => {
  return (
    <MapContainer center={position} zoom={17} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    
      <Marker position={position}>
      <Popup>
        Magna <br /> Ingeniería y Topografía
      </Popup>
    </Marker>

    
    </MapContainer>
  );
};

export default MapComponent;


