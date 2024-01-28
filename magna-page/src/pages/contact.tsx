import React from 'react';
import  PagesLayout from '../layouts/pagesLayouts';
import {Contact} from '../components/sections/contact';
import Banner from '../components/banner';
import { FaDirections } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdClock } from "react-icons/io";
import  Maps  from '../components/maps';

const ContactPage: React.FC = () => {
    return (
        <div>
            
            
            <PagesLayout>
                <Banner title='Contacto' paragraph='Contacto' />
                <div className="container contact-zone pt-5 pb-5">
                    <div className="row">
                        <div className="col-md-5 m-1">
                            <span><FaDirections size={24} color="black" /></span><span><strong> Dirección:</strong>   Cl. 18 #7-27, Ibagué, Tolima. Colombia</span>
                        </div>
                        <div className="col-md-5 m-1">
                            <span><FaSquarePhone size={24} color="black" /></span><span><strong> Teléfono:</strong>  2706488 </span> <span><strong> Celular:</strong> 3015490115</span>
                        </div>
                        <div className="col-md-5 m-1">
                            <span><MdEmail size={24} color="black" /></span><span> <strong> Correo: </strong> 
                                <a href="mailto:info@magnaingenieriaytopografia.com">info@magnaingenieriaytopografia.com</a></span>
                        </div>
                        <div className="col-md-6 m-1">
                            <span><IoMdClock size={24} color="black" /></span><span> <strong> Horario de atención:</strong>  Lunes a Viernes 8:00 am - 5:00 pm</span>
                        </div>
                            
                    </div>
                </div>
                <Contact />
                <div className="container mt-5 mb-5 ">
                <Maps />
                </div>
            </PagesLayout>
        </div>
    );
};

export default ContactPage;
