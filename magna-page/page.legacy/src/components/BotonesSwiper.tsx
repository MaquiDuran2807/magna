import { useSwiper } from "swiper/react";

export const BotonesSwiper = () => {
  const swiper = useSwiper();
  return (
    <>
        <button onClick={() => swiper.slideNext()} className="swiper-button-next custom-next-icon" aria-label="Siguiente diapositiva"></button>
        <button onClick={() => swiper.slidePrev()} className="swiper-button-prev custom-prev-icon" aria-label="Diapositiva anterior"></button>
    </>
  );
};