
import { FaFacebook, FaInstagram, } from 'react-icons/fa';
import { FaSquareXTwitter,FaTiktok} from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { Icon } from '../assets/img/imgfooter';
import "./styles/footer.css";
import useIntersectionObserver from '../hooks/useLazyload';
import { Link } from 'react-router-dom';


const Footer1: React.FC = () => {
    return (
        <footer className="bg-footer text-white">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-5 ">

                        <div className="row m-3">
                            <div className="col-12 col-md-9 ">
                                <Icon  className='logo-footer'/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-9 ">
                                <p className="text-white">Somos un equipo de profesionales integrales con gran experiencia, que ofrece servicios de ingeniería de alta calidad, brindando a nuestros clientes soluciones eficaces y concretas.</p>
                            </div>
                        </div>
                    </div>
                    
                    
                <div className="col-6 col-md-3">
                    <div className="row">
                        <div className="col-12 ">
                            <h5>Contacto</h5>
                            <p className="text-white">Cel: 3015490115</p>
                            <p className="text-white">Tel: 2706488</p>
                            <a href='mailto:info@magnaingenieriaytopografia.com' className="text-white "  >
                                <button className='boton-1 mb-2'>
                                enviar correo
                                </button>
                            </a>
                            <div className="overflow-auto" style={{scrollbarColor:"black",scrollbarWidth:"thin"}}>
                            info@magnaingenieriaytopografia.com
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5>Dirección</h5>
                            <p className="text-white">Cl. 18 #7-27</p>
                            <p className="text-white">Ibagué, Tolima. Colombia</p>
                        </div>
                        </div>
                    
                    
                </div>
                
                    <div className="col-6 col-md-2">
                        <h5>Mapa del sitio</h5>
                        {/* Add your site map here */}
                        <p><Link to="/" className="text-white">Inicio</Link></p>
                        <p><Link to="/projects" className="text-white">Proyectos</Link></p>
                        <p><Link to="/servicios" className="text-white">Servicios</Link></p>
                        <p><Link to="/contact" className="text-white">Contáctanos</Link></p>
                    </div>
                    <div className="col-6 col-md-2">
                        <h5>Redes Sociales</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="https://m.facebook.com/MAGNAINGENIERIAYTOPOGRAFIA" target="_blank">
                                    <FaFacebook size={35} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.twitter.com" target="_blank">
                                <FaSquareXTwitter size={35}/>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.instagram.com/magna_ingenieria/" target="_blank">
                                    <FaInstagram size={35}/>
                                </a>
                            </li>
                            <li className="list-inline-item m-2">
                                <a href="https://www.tiktok.com" target="_blank">
                                    <FaTiktok size={35}/>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.linkedin.com/in/magna-ingenier%C3%ADa-topograf%C3%ADa-b40a912a5/" target="_blank">
                                    <BsLinkedin size={35}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row elit">
                <div className="col-12">
                    <a href="elitit.com" className="text-whithe col-12 copy-elit">
                    {/* todos los derechos reservados */}
                        <h6 className="text-white">
                            @2023 Elit-it. Todos los derechos reservados.
                        </h6>
                    </a>
                </div>
            </div>
        </footer>
    );
};

// export default Footer1;

export default function LazyFooter1 () {
    const {  isVisible, ref } = useIntersectionObserver('20px');
    return (
        <div id="LazyServices" ref={ref}>
            {isVisible ? <Footer1 /> : null}
        </div>
    );
}
