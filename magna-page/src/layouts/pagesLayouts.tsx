import React, { useEffect, useRef } from 'react';

import {NavBar} from '../components/navBar';
import Footer from '../components/footer1';
import { FloatWhatsapp } from '../components/floawhatsapp';
import { useLocation } from 'react-router-dom';


interface PagesLayoutProps {
    children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
    const inicioDePaginaRef = useRef<HTMLDivElement | null>(null); // Corregir el tipo de inicioDePaginaRef
    const location = useLocation();
    useEffect(() => {
        // Si hay un cambio en la ruta, realiza el scroll al inicio de la página
        if (inicioDePaginaRef.current) {
            // Realizar la lógica de scroll aquí
            inicioDePaginaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);
    return (
        <>
            <header ref={inicioDePaginaRef}>
                <NavBar />
                <div className="spand" id='header'>
                </div>
            </header>
            
            {children}
            <Footer />
            <FloatWhatsapp />
        </>
    );
};

export default PagesLayout;
