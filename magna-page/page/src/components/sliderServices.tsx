import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SubServicio } from '../types/types';
import './styles/sliderService.css';
// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { API_URL } from '../constans';

interface SliderServicesProps {
    subServicios?: SubServicio[];
    id_servicio?: number;
    is_services?: boolean;
}


const SliderServices: React.FC<SliderServicesProps> = ({ subServicios,}) => {

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
                    <div className={`slide ${subServicio.nombre}`}>
                        <img src={API_URL+"/media/"+subServicio.imagen} alt={subServicio.nombre} className='img-fluid img-subservicio' />
                        <h3>
                            {subServicio.nombre}
                        </h3>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderServices;
