
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,A11y } from 'swiper/modules';
import { useInView } from 'react-intersection-observer'
import { motion} from 'framer-motion'



// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { BotonesSwiper } from './BotonesSwiper';
export const Slider= () => {

    const slides = [
        {
          title: 'Topografía',
          descripcion: 'Magna ingeniería y topografía  ofrece servicios topográficos integrales, desde georreferenciación inicial del proyecto, durante la construcción del mismo hasta fotogrametría avanzada, garantizando precisión y calidad en cada proyecto.',
          detalle:[
            'Georreferenciación de puntos',
            'Levantamiento topográfico según normativa IGAC',
            'Cálculos de movimiento de tierra',
            'Nivelaciones de precisión',
            'Replanteo y control de obras',
           ],
          slade: 'slide-1'
        },
        {
          title: 'Medio ambiente',
          descripcion: 'Gestión completa, desde trámites y permisos hasta auditoría y monitoreo ambiental.',
          detalle:[
            'Trámites y permisos ambientales',
            'Estudios de impacto ambiental',
            'Planes,programas y proyectos de manejo ambiental',
            'Caracterización y monitoreo de agua y residuos sólidos',
            'Monitoria de fauna y flora',
            'Auditoria e interventoria',
            'Monitoreo de calidad de aire y ruido',
            'Asesoria en sistemas de gestión NTC ISO 14001 y 45001',
          ],
          slade: 'slide-2'
        },

        {
          title: 'Ingeniería y consultoría',
          descripcion: 'Ingeniería y Consultoría para soluciones viales, hidrológicas, geotécnicas y construcción civil, con presupuestos detallados.',
          detalle:[
            'Diseño geométrico de vías',
            'Estudios hidrológicos e hidráulicos',
            'Estudios Geologicos y geotécnicos',
            'Construcción de obras civiles',
            'Presupuestos de obra',
          ],
          slade: 'slide-3'
        },

        // {
        //   title: 'Diapositiva 4',
        //   descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        //   detalle:[
        //     'Georreferenciación de puntos',
        //     'Levantamiento topográfico según normativa IGAC',
        //     'Cálculos de movimiento de tierra',
        //     'Nivelaciones de precisión',
        //     'Replanteo y control de obras',
        //   ],
        //   slade: 'slide-4'
        // },
        // Agrega más objetos aquí para más diapositivas
      ];
      

  const refs = slides.map(() => useInView({ triggerOnce: false, threshold: 0.5
   }));


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
      {slides.map((slide, index) => (
  <SwiperSlide key={index} >
    <div className={`container-fluid ${slide.slade}`}>
      
      <motion.div
        ref={refs[index].ref}
        variants={variantes}
        initial='hidden'
        animate={refs[index].inView ? 'show' : 'hidden'}
        exit='exit'
      >
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-8  description">
                    <h1 className="title text-capitalize">{slide.title}</h1>
                    <br />
                    <p className="text-white col-12 col-lg-10 " >{slide.descripcion}</p>
                    <div className="col-12 ">
                      <br />
                      {/* <button className="llamado">Cotizar</button>     */}
                      <button className="llamado">Contactar</button>
                    </div>
                    <BotonesSwiper  />
                </div>
                
            </div>
      </div>
       
      </motion.div>
    </div>
  </SwiperSlide>
))}
      ...
    </Swiper>
  );
};