import { memo} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,A11y } from 'swiper/modules';
import { useInView } from 'react-intersection-observer'
import { motion} from 'framer-motion';
import "./styles/slider.css"

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { BotonesSwiper } from './BotonesSwiper';

import { Link } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useLazyload';
import { Servicio2 } from '../types/types';

type SliderProps = {
  services: Servicio2[] ;
};


const Slider=memo( ({services}: SliderProps) => {

  const refs = services?.map(() => useInView({ triggerOnce: false, threshold: 0.5
   }));
   if (!services) {
    return null;
  }
  const variantes = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    exit: { opacity: 0, y: 50 },
  };

  return (

    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}

      modules={[Autoplay, Pagination, Navigation,A11y]}
      className="mySwiper"
      
    >
      {services?.map((servicio,index) => (
        <SwiperSlide key={index}>
          <div className="container-con-imagen">
                <img 
                  srcSet={
                    `${servicio.imagen_celular} 450w,
                    ${servicio.imagen_tablet} 1024w,
                    ${servicio.imagen} 5000w`
                    }
                  sizes="(max-width: 450px) 280px,
                  (max-width: 1023px) 736px,
                  (min-width: 1024px) 1024px"
                  alt={`imagen de ${servicio.nombre}`} 
                  loading='eager'
                  decoding='async'
                  className="img-fluid imagen"
                  fetchPriority="high"
                />
              </div>
          <div className={`container-fluid sliders`} >
          
            <motion.div
              ref={refs && refs[index]?.ref}
              variants={variantes}
              initial='hidden'
              animate={refs && refs[index]?.inView ? 'show' : 'hidden'}
              exit='exit'
            >
              
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8  description">
                  
                    <h1 className="title text-capitalize">{servicio.nombre}</h1>
                    <br />
                    <p className="text-white col-12 col-lg-10 ">{servicio.descripcion}</p>
                    <div className="col-12 ">
                      <br />
                      <Link to="/contact"><button className="llamado">Contactar</button></Link>
                    </div>
                    <BotonesSwiper />
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});


// Paso 1: Modificar LazySlider para aceptar services como prop
export default function LazySlider({ services }: { services: Servicio2[]  }) {
  const { isVisible, ref } = useIntersectionObserver('100px');
  return (
      <div id="LazySlider" ref={ref} >
          {isVisible ? <Slider services={services} /> : null}
      </div>
  );
}
