import React, { useEffect, useRef, lazy} from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/navBar';
const FloatWhatsapp = lazy(() => import('../components/floawhatsapp'));
const LazyFooter1 = lazy(() => import('../components/footer1'));

interface PagesLayoutProps {
    children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
    const inicioDePaginaRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    useEffect(() => {
        if (inicioDePaginaRef.current) {
            inicioDePaginaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <>
            <div ref={inicioDePaginaRef}>
                <NavBar />
            </div>
            {children}
            <LazyFooter1 />
            <FloatWhatsapp />
        </>
    );
};

export default PagesLayout;
