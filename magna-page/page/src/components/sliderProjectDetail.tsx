
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion} from 'framer-motion'
import { ProyectImagesMagna} from '../types/projects';
import { Autoplay, Pagination, Navigation,EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

type SliderProjectDetailProps = {
    images: ProyectImagesMagna[];
};

const SliderProjectDetail = (
    { images }: SliderProjectDetailProps
) => {

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
                delay: 8000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Pagination, Navigation,EffectFade]}
            effect='fade'
            className="projectDetailSlider"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <img src={`${image.imagen}`} alt={`proyecto-${image.proyecto} `} className="img-fluid imagen-proecto" />
                        <a href={image.references_url? image.references_url : 'https://www.Magnaingenieriaytopografia.com'} target="_blank" rel="noreferrer">
                      {
                        image.references_name? image.references_name : 'Magnaingenieriaytopografia.com'
                      }
                    </a>
                    </motion.div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderProjectDetail;
