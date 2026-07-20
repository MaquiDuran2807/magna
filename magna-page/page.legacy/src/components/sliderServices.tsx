import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Subservicio } from '../types/types';
import './styles/sliderService.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useGetServices } from '../hooks/getInfoPage';

interface SliderServicesProps {
    serviceName?: string;
    onSubServicioClick?: (subServicio: Subservicio) => void;
}

const fallbackImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.srcset = '';
};

const SliderServices: React.FC<SliderServicesProps> = ({ serviceName, onSubServicioClick }) => {
    const { services } = useGetServices();

    const subServicios = useMemo(() => {
        if (!services) return [];
        if (serviceName) {
            return services.find(s => s.nombre === serviceName)?.subservicios ?? [];
        }
        return services.flatMap(s => s.subservicios);
    }, [services, serviceName]);

    if (!subServicios.length) {
        return (
            <div className="slide-service-skeleton">
                <div className="skeleton-shimmer" />
            </div>
        );
    }

    return (
        <Swiper
            key={subServicios.map(s => s.id).join('-')}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation, Pagination]}
>
            {subServicios.map((subServicio) => (
                <SwiperSlide key={subServicio.id}>
                    <div className="slide-card">
                        <div className="slide-header">
                            <h3 className="title-slider-service">{subServicio.nombre}</h3>
                            <div className="slide-accent" />
                        </div>
                        <div
                            className="slide-service"
                            onClick={() => onSubServicioClick?.(subServicio)}
                        >
                            <img
                                src={subServicio.imagen}
                                srcSet={`
                                    ${subServicio.imagen_celular || subServicio.imagen} 450w,
                                    ${subServicio.imagen_tablet || subServicio.imagen} 1024w,
                                    ${subServicio.imagen} 5000w
                                `}
                                sizes="(max-width: 450px) 280px,
                                    (max-width: 1023px) 736px,
                                    (min-width: 1024px) 1024px"
                                alt={subServicio.nombre}
                                className="img-fluid img-subservicio"
                                onError={fallbackImg} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderServices;
