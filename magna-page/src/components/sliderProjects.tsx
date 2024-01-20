// Import Swiper React components
import {  useSelector } from 'react-redux';
import { RootState } from '../store';
import { Proyecto,ProyectosMagna,Imagene } from '../types/types';
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
import { API_URL } from '../constans';

export const SwiperProjects= () => {
    const projectsAll:ProyectosMagna = useSelector((state: RootState) => state.projects.data);
    // const imagen:Imagene[]=projectsAll.imagenes;
    const { width} = useScreenSize();
    const isMobile = width <= 768;
    const isTablet = width <= 1000;
    const slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;

    // const imagenProyecto = (id:number) => {
    //     const imagenProyecto = imagen.filter((imagen) => imagen.proyecto=== id)[0].imagen;
    //     return imagenProyecto;
    // }

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
      {projectsAll?.proyectos.map((project:Proyecto) => (
        <SwiperSlide key={project.id}>
          <div className="projects border-0 ">
          <img src={
                ` ${API_URL}${projectsAll.imagenes.filter((imagen:Imagene) => imagen.proyecto=== project.id)[0].imagen}`
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




{/* <SwiperSlide>
<div className="projects border-0 project-2">
    <div className="card-info">
        <h4>
            urbanización
        </h4>
        <p>
            el bosque
        </p>
    </div>
    <a href="/projects"><img src={iconarrow} alt="" className='icon-arrow'/></a>
</div>
</SwiperSlide>
<SwiperSlide>
<div className="projects border-0 project-3">
    <div className="card-info">
        <h4>
            via del mar
        </h4>
    </div>
    <a href="/projects"><img src={iconarrow} alt="" className='icon-arrow'/></a>
</div>
</SwiperSlide>
<SwiperSlide>
<div className="projects border-0 project-4">
    <div className="card-info">
        <h4>
            granja solar
        </h4>
    </div>
    <a href="/projects"><img src={iconarrow} alt="" className='icon-arrow'/></a>
</div>
</SwiperSlide> */}