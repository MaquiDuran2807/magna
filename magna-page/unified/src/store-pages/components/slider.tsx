
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,A11y } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

import { Link } from 'react-router-dom';
import { useGetPromos } from '../hooks/productHooks';
export const Slider= () => {
  const { data: promos, isLoading, error } = useGetPromos();
  console.log(promos);
  
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
      {promos?.map((promo) => (
        <SwiperSlide key={promo.id}>
          <Link to={`/store/product/${promo.products[0].slug}`}>
            <img src={promo.image} alt={promo.name} className='image-fluid swiper-image' />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};