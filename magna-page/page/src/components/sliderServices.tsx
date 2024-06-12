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
    console.log("se reinicio el slider",subServicios,subtitle);
    
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
                    <div className={`slide-service ${subServicio.nombre} ` }>
                        <img src={subServicio.imagen} alt={subServicio.nombre} className='img-fluid img-subservicio' />
                        <h3>
                            {
                                subtitle ? subServicio.nombre :  '' 
                            }
                        </h3>
                    </div>
                    
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderServices;
