import React from "react";
import {LogoMagna} from '../assets/img/logo'
import "./styles/footer.css"

export const Footer: React.FC = () => {
  return (
    <footer className="">
       
      <div className="container-fluid">

        <div className="row text-white">
          
          <div className="col-6 col-md-2">
            <h5>Dirección</h5>
            <p className="text-white">Calle 17A #7-78</p>
            <p className="text-white">Ibagué, Tolima. Colombia</p>
          LogoMagna</div>
          <div className="col-6 col-md-2">
            <h5>Contacto</h5>
            <p className="text-white">Cel: 3015490115</p>
            <p className="text-white">Tel: 2706488</p>
          </div>
          <div className="col-6 col-md-2">
            <h5>Email</h5>
            <p className="text-white">info@magna.com</p>
            <h5>redes sociales</h5>
          </div>
          <div className="col-6 col-md-2">
            <h5>Mapa del sitio</h5>
            <p className="text-white">Inicio</p>
            <p className="text-white">Proyectos</p>
            <p className="text-white">Clientes</p>
            <p className="text-white">Contáctanos</p>
          </div>
          <div className="col-6 col-md-2">
            <h5>Información</h5>
            <p className="text-white">¿Quiénes somos?</p>
            <p className="text-white">¿Qué hacemos?</p>
            <p className="text-white">¿Cómo lo hacemos?</p>
            <p className="text-white">¿Por qué lo hacemos?</p>
          </div>
          <div className="col-6 col-md-2">
            <h5>Redes sociales</h5>
            <p className="text-white">Facebook</p>
            <p className="text-white">Instagram</p>
            <p className="text-white">Twitter</p>
            <p className="text-white">LinkedIn</p>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-6 text-center">
          <LogoMagna width={400}/>
        </div>
        <a href="elitit.com" className="text-whithe col-6">
          {/* todos los derechos reservados */}
          <p className="text-white">
            @2023 Elit-it. Todos los derechos reservados.
          </p>
        </a>
        
        
      </div>
      
    </footer>
  );
};


