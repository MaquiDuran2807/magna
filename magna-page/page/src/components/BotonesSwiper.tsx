import { useSwiper } from "swiper/react";

export const BotonesSwiper = () => {
  const swiper = useSwiper();
  return (
    <>
        <span onClick={() => swiper.slideNext()} role='button' className="swiper-button-next custom-next-icon" aria-label="Botón para pasar a la siguiente diapositiva" ></span>
        <span  onClick={() => swiper.slidePrev()} className="swiper-button-prev custom-prev-icon" aria-label="Botón para pasar a la diapositiva anterior"></span>
    </>
  );
};