import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

const SlideProfesionals: React.FC = () => {
    return (
        
        <Swiper
            autoplay={{ delay: 3000 }}
            navigation={false}
            slidesPerView={6}
            loop={true}
        >
            <SwiperSlide>
                <div>
                    <h2>Título 1</h2>
                    <p>Descripción 1</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <h2>Título 2</h2>
                    <p>Descripción 2</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <h2>Título 3</h2>
                    <p>Descripción 3</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <h2>Título 4</h2>
                    <p>Descripción 4</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <h2>Título 5</h2>
                    <p>Descripción 5</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <h2>Título 6</h2>
                    <p>Descripción 6</p>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default SlideProfesionals;
