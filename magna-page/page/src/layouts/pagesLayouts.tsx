import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useGetServices } from '../hooks/getInfoPage';

const LazyNavBar = lazy(() => import('../components/navBar'));
const LazyFloatWhatsapp = lazy(() => import('../components/floawhatsapp'));
const LazyFooter1 = lazy(() => import('../components/footer1'));

const PlaceholderComponent = () => {
    return (
      <div style={{ width: '100%', height: '80vh', backgroundColor: '#f0f0f0',marginBottom:"300px" }}>
        {/* Puedes ajustar el estilo para que se parezca más al componente real */}
      </div>
    );
  };

interface PagesLayoutProps {
    children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
    const inicioDePaginaRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    // const { services } = useGetServices();
//   if (!services) {
//     return null;
//   }
//     useEffect(() => {
//         services.forEach((servicio) => {
//           const image = new Image();
//           image.src = servicio.imagen;
//           console.log(image.src, 'cargada');
          
//         });
//       }, []);

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
        <div style={{ minHeight: '120vh' }}>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ type: "tween", duration: 0.7 }}
            >
                <Suspense fallback={<PlaceholderComponent/>}>
                    <div ref={inicioDePaginaRef}>
                        <LazyNavBar />
                    </div>
                </Suspense>
                <div style={{minHeight:"120vh"}}>
                    {children}
                </div>
                <Suspense fallback={<div>Cargando...</div>}>
                    <LazyFooter1 />
                    <LazyFloatWhatsapp />
                </Suspense>
            </motion.div>
        </div>
    );
};

export default PagesLayout;