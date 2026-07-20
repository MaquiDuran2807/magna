/**
 * Componente de mapa Leaflet con diseño mejorado UX/UI.
 * 
 * Variables de entorno (Vite):
 *   VITE_MAP_LAT  — Latitud (fallback: 4.444319033924122)
 *   VITE_MAP_LNG  — Longitud (fallback: -75.23365217644438)
 *   VITE_MAP_ZOOM — Nivel de zoom (fallback: 17)
 */
import React from 'react';
import logo from '../assets/img/SVG/Recurso 1.svg';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import useIntersectionObserver from '../hooks/useLazyload';
import './styles/maps.css';

const LAT = import.meta.env.VITE_MAP_LAT
  ? parseFloat(import.meta.env.VITE_MAP_LAT as string)
  : 4.444319033924122;
const LNG = import.meta.env.VITE_MAP_LNG
  ? parseFloat(import.meta.env.VITE_MAP_LNG as string)
  : -75.23365217644438;
const ZOOM = import.meta.env.VITE_MAP_ZOOM
  ? parseInt(import.meta.env.VITE_MAP_ZOOM as string, 10)
  : 17;

const position: [number, number] = [LAT, LNG];

const MapComponent: React.FC = () => {
  const customIcon = new Icon({
    iconUrl: logo,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45],
  });

  return (
    <div className="map-card">
      <MapContainer
        center={position}
        zoom={ZOOM}
        scrollWheelZoom={true}
        className="map-marker-popup"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />

        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="popup-title">Magna Ingeniería y Topografía</div>
            <p className="popup-subtitle">
              Calle 98# 13B sur-150, T5- apto 101<br />
              Ibagué, Tolima
            </p>
          </Popup>
        </Marker>
      </MapContainer>

      <div className="map-card-footer">
        <div className="map-address">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>
            <strong>Calle 98# 13B sur-150</strong>, T5- apto 101, Ibagué, Tolima
          </span>
        </div>
        <div className="map-actions">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            Cómo llegar
          </a>
        </div>
      </div>
    </div>
  );
};

export default function LazyMapComponents () {
  const { isVisible, ref } = useIntersectionObserver('50px');
  return (
    <div id="LazyMapComponent" ref={ref}>
      {isVisible ? <MapComponent /> : null}
    </div>
  );
}
