// Import Swiper React components
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './styles/projects.css'
import iconarrow from '../assets/img/SVG/Recurso 1.svg'

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import useScreenSize from '../hooks/ScreenSize';
import { Link } from 'react-router-dom';
import { ProyectImagesMagna, ProyectosMagna,Result } from '../types/projects';

export const SwiperProjects= () => {
  const { data:Project } = useQuery<ProyectosMagna>({
    queryKey: ['projects'],
    staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
});
const { data:projectImages } = useQuery<ProyectImagesMagna[]>({
  queryKey: ['projectsImages'],
  staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchOnMount: false,refetchOnReconnect: false,refetchInterval: 1000*60*30,
});

    const { width} = useScreenSize();
    const isMobile = width <= 768;
    const isTablet = width <= 1000;
    const slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;

  if (!Project || !projectImages) {
    return null;
  }

  return (
    <Swiper
      spaceBetween={25}
      slidesPerView={slidesPerView}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {Project?.results.map((project:Result) => (
        <SwiperSlide key={project.id}>
          <div className="projects border-0 ">
          <img src={
                ` ${projectImages?.filter((imagen:ProyectImagesMagna) => imagen.proyecto=== project.id)[0].imagen}`
              } alt="" className='project-img' />
            <div className="card-info">
              <h4>{project.nombre}</h4>
              <p>{project.descripcion.slice(0,90)} <span>... <Link to={`/projects/${project.id}`}>ver más</Link></span></p>
              
            </div>
            <Link to={`/projects/${project.id}`}>
              <img src={iconarrow} alt="" className="icon-arrow" />
            </Link>
          </div>
        </SwiperSlide>
      ))}
      
      ...
    </Swiper>
  );
};