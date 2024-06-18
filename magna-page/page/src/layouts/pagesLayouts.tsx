import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importa motion de Framer Motion
import NavBar from '../components/navBar';
import FloatWhatsapp from '../components/floawhatsapp';

const LazyFooter1 = lazy(() => import('../components/footer1'));

interface PagesLayoutProps {
    children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
    console.log("PagesLayout");
    
    const inicioDePaginaRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (inicioDePaginaRef.current) {
            inicioDePaginaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    // Define las variantes de animación
    const pageVariants = {
        initial: { opacity: 0  },
        in: { opacity: 1 },
        out: { opacity: 0 },
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: "tween", duration: 0.7 }}
        >
            <div ref={inicioDePaginaRef}>
                <NavBar />
            </div>
            {children}
            <Suspense fallback={<>cargando...</>}>
                <LazyFooter1 />
            </Suspense>
            <FloatWhatsapp />
        </motion.div>
    );
};

export default PagesLayout;