
import { Swiper, SwiperSlide } from 'swiper/react';
import { useInView } from 'react-intersection-observer'
import { motion} from 'framer-motion'
import { API_URL } from '../constans';
import { Imagene } from '../types/types';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type SliderProjectDetailProps = {
    images: Imagene[];
};

const SliderProjectDetail = (
    { images }: SliderProjectDetailProps
) => {
    const refs = images.map(() => useInView({ triggerOnce: false, threshold: 0.5
    }));

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
                delay: 10000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="projectDetailSlider"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <motion.div
                        ref={refs[index].ref}
                        initial={{ opacity: 0, y: 50 }}
                        animate={refs[index].inView ? { opacity: 1,  } : { opacity: 0, scale:0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={`${API_URL}${image.imagen}`} alt={`proyecto-${image.proyecto} `} className="img-fluid imagen-proecto" />
                    </motion.div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderProjectDetail;
