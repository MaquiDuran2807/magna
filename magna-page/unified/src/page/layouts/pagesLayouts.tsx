import React, { useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
const LazyNavBar = lazy(() => import('../components/navBar'));
const LazyFloatWhatsapp = lazy(() => import('../../shared/components/FloatWhatsapp'));
const LazyCtaFlotante = lazy(() => import('../components/ctaFlotante'));
const LazyFooter1 = lazy(() => import('../../shared/components/Footer'));



interface PagesLayoutProps {
    children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
    const inicioDePaginaRef = useRef<HTMLDivElement | null>(null);

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
                <LazyCtaFlotante />
            </Suspense>
        </motion.div>
    );
};

export default PagesLayout;