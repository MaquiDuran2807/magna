import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
const LazyNavBar = lazy(() => import('../components/navBar'));
const LazyFloatWhatsapp = lazy(() => import('../components/floawhatsapp'));
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

    const pageVariants = {
        initial: { opacity: 0 },
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
            <Suspense fallback={<div>Cargando...</div>}>
                <div ref={inicioDePaginaRef}>
                    <LazyNavBar />

                </div>
            </Suspense>
                {children}
            <Suspense fallback={<div>Cargando...</div>}>
                <LazyFooter1 />
                <LazyFloatWhatsapp />
            </Suspense>
        </motion.div>
    );
};

export default PagesLayout;