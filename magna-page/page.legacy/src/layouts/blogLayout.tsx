import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import LazyFooter1 from '../components/footer1';
import { FloatWhatsapp } from '../components/floawhatsapp';
const LazyNavBar = lazy(() => import('../components/navBar'));


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
            <Suspense fallback={<div>Cargando...</div>}>
                <div ref={inicioDePaginaRef}>
                    <LazyNavBar />
                </div>
            </Suspense>
            
            {children}
            <LazyFooter1/>
            <FloatWhatsapp />
        </>
    );
};

export default BlogLayout;