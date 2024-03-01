import { useSwiper } from "swiper/react";

export const BotonesSwiper = () => {
  const swiper = useSwiper();
  return (
    <>
        <span onClick={() => swiper.slideNext()} role='button' className="swiper-button-next custom-next-icon"></span>
        <span  onClick={() => swiper.slidePrev()} className="swiper-button-prev custom-prev-icon"></span>
    </>
  );
};