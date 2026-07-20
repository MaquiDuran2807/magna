import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import { motion } from 'framer-motion';
import "./styles/slider.css"

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { BotonesSwiper } from './BotonesSwiper';

import { Link } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useLazyload';
import useScreenSize from '../hooks/ScreenSize';
import { Slide } from '../types/types';

type SliderProps = {
  slides: Slide[];
};

const SliderContent = memo(({ slide }: { slide: Slide }) => (
  <div className="container-fluid px-4 px-lg-5">
    <div className="row h-100">
      <div className="col-12 col-lg-12 description">
        <h1 className="title text-capitalize">{slide.nombre}</h1>
        <p className="text-white">{slide.descripcion}</p>
        <div className="col-12">
          <Link to="/contact"><button className="llamado">Contactar</button></Link>
        </div>
        <BotonesSwiper />
      </div>
    </div>
  </div>
));

const Slider = memo(({ slides }: SliderProps) => {
  const { width } = useScreenSize();
  const isMobile = width <= 768;

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
      modules={[Autoplay, Pagination, Navigation, A11y]}
      className="mySwiper"
    >
      {slides?.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="container-con-imagen">
            <img
              srcSet={
                `${slide.imagen_celular || slide.imagen} 450w,
                ${slide.imagen_tablet || slide.imagen} 1024w,
                ${slide.imagen} 5000w`
              }
              sizes="(max-width: 450px) 280px,
                  (max-width: 1023px) 736px,
                  (min-width: 1024px) 1024px"
              alt={`imagen de ${slide.nombre}`}
              loading='eager'
              decoding='async'
              className="img-fluid imagen"
              fetchPriority="high"
            />
          </div>
          <div className="container-fluid sliders">
            {isMobile ? (
              <SliderContent slide={slide} />
            ) : (
              <motion.div
                variants={variantes}
                initial='hidden'
                animate='show'
                exit='exit'
              >
                <SliderContent slide={slide} />
              </motion.div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});


export default function LazySlider({ slides }: { slides: Slide[] }) {
  const { isVisible, ref } = useIntersectionObserver('100px');
  return (
      <div id="LazySlider" ref={ref} >
          {isVisible ? <Slider slides={slides} /> : null}
      </div>
  );
}
