
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,A11y } from 'swiper/modules';
import { useInView } from 'react-intersection-observer'
import { motion} from 'framer-motion'
import { useQuery } from '@tanstack/react-query';

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { BotonesSwiper } from './BotonesSwiper';
import {  Servicio2 } from '../types/types';

import { Link } from 'react-router-dom';
export const Slider= () => {
  const { data:servicios } = useQuery<Servicio2[]>({
    queryKey: ['services'],
    staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
});
if (!servicios) {
  return null;
}
  const refs = servicios?.map(() => useInView({ triggerOnce: false, threshold: 0.5
   }));


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
      {servicios?.map((servicio: Servicio2, index) => (
        <SwiperSlide key={index}>
          <div className={`container-fluid sliders`} style={{ backgroundImage: `linear-gradient(to bottom left,rgba(0, 0, 0, 0.8) 0%,rgba(0, 0, 0, 0.7) 35%,rgba(0, 0, 0, 0.8) 100%), url( ${servicio.imagen})` }}>

            <motion.div
              ref={refs[index].ref}
              variants={variantes}
              initial='hidden'
              animate={refs[index].inView ? 'show' : 'hidden'}
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
};