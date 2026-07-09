import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/navbar2';
import { FloatWhatsapp } from '../components/floawhatsapp';
import { useLocation } from 'react-router-dom';
import LazyFooter1 from '../components/footer1';


interface BlogLayoutProps {
    children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
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
            <Helmet>
              <title>Blog | Magna Ingeniería y Topografía</title>
              <meta name="description" content="Blog de Magna Ingeniería y Topografía — Artículos, noticias y novedades del sector." />
            </Helmet>
            <header ref={inicioDePaginaRef}>

                <NavBar />
                <div className="spand" id='header'>
                </div>
            </header>
            
            {children}
            <LazyFooter1/>
            <FloatWhatsapp />
        </>
    );
};

export default BlogLayout;