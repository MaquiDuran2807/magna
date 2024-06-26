import { lazy,memo,Suspense } from 'react';
import { FaFacebook, FaInstagram} from 'react-icons/fa';
import { FaSquareXTwitter,FaTiktok} from "react-icons/fa6";
import { BsLinkedin } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import  Icon  from '../assets/img/imgfooter';
const LogoFooterLazy = lazy(() => import('../assets/img/imgfooter'));
import "./styles/footer.css";
import useIntersectionObserver from '../hooks/useLazyload';


const contactInfo = {
    phone: '3015490115',
    tel: '2706488',
    email: 'info@magnaingenieriaytopografia.com',
    address: 'Cl. 18 #7-27 Ibagué, Tolima. Colombia'
};

const socialLinks = [
    { href: "https://m.facebook.com/MAGNAINGENIERIAYTOPOGRAFIA", icon: <FaFacebook size={35} />, name: "Facebook" },
    { href: "https://www.twitter.com", icon: <FaSquareXTwitter size={35} />, name: "Twitter" },
    { href: "https://www.instagram.com/magna_ingenieria/", icon: <FaInstagram size={35} />, name: "Instagram" },
    { href: "https://www.tiktok.com", icon: <FaTiktok size={35} />, name: "TikTok" },
    { href: "https://www.linkedin.com/in/magna-ingenier%C3%ADa-topograf%C3%ADa-b40a912a5/", icon: <BsLinkedin size={35} />, name: "LinkedIn" }
];

const Footer1: React.FC =memo( () => {
    return (
        <footer className="bg-footer text-white">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-5">
                        <div className="row m-3">
                        <Suspense fallback={<div>Cargando...</div>}>
                            <LogoFooterLazy className='logo-footer'/>
                        </Suspense>
                            {/* <Icon className='logo-footer'/> */}
                        </div>
                        <p>Somos un equipo de profesionales integrales con gran experiencia, que ofrece servicios de ingeniería de alta calidad, brindando a nuestros clientes soluciones eficaces y concretas.</p>
                    </div>
                    <div className="col-6 col-md-3">
                        <h5>Contacto</h5>
                        <p>Cel: {contactInfo.phone}</p>
                        <p>Tel: {contactInfo.tel}</p>
                        <div className="overflow-auto" style={{scrollbarColor:"black",scrollbarWidth:"thin"}}>
                            info@magnaingenieriaytopografia.com
                        </div>
                        <h5>Dirección</h5>
                        <p>{contactInfo.address}</p>
                    </div>
                    <div className="col-6 col-md-2">
                        <h5>Mapa del sitio</h5>
                        <p><Link to="/" className="text-white">Inicio</Link></p>
                        <p><Link to="/projects" className="text-white">Proyectos</Link></p>
                        <p><Link to="/servicios" className="text-white">Servicios</Link></p>
                        <p><Link to="/contact" className="text-white">Contáctanos</Link></p>
                    </div>
                    <div className="col-6 col-md-2">
                        <h5>Redes Sociales</h5>
                        <ul className="list-inline">
                            {socialLinks.map((link, index) => (
                                <li key={index} className="list-inline-item">
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row elit">
                <div className="col-12">
                    <a href="elitit.com" className="text-whithe col-12 copy-elit">
                        <h6>@2023 Elit-it. Todos los derechos reservados.</h6>
                    </a>
                </div>
            </div>
        </footer>
    );
});

// export default Footer1;

export default function LazyFooter1 () {
    const {  isVisible, ref } = useIntersectionObserver('20px');
    return (
        <div id="LazyFooter" ref={ref}>
            {isVisible ? <Footer1 /> : null}
        </div>
    );
}
