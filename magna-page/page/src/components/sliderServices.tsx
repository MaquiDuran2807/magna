import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Subservicio } from '../types/types';
import './styles/sliderService.css';
// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


interface SliderServicesProps {
    subServicios?: Subservicio[] | null;
    subtitle?: boolean;
}

const SliderServices: React.FC<SliderServicesProps> = ({ subServicios,subtitle}) => {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              
        >
            {subServicios?.map((subServicio, index) => (
                <SwiperSlide key={index}>
                    <div className={`slide-service ` }>
                        <img srcSet={`
                            ${subServicio.imagen_celular} 450w,
                            ${subServicio.imagen_tablet} 1024w,
                            ${subServicio.imagen} 5000w
                        `}
                        sizes="(max-width: 450px) 280px,
                            (max-width: 1023px) 736px,
                            (min-width: 1024px) 1024px"
                              alt={subServicio.nombre}
                        className='img-fluid img-subservicio ' />
                    </div>
                    <h3 className='title-slider-service'>
                        {
                            subtitle ? subServicio.nombre :  '' 
                        }
                    </h3>
                    
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderServices;
