import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './styles/projects.css';
import iconarrow from '../assets/img/SVG/Recurso 1.svg';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import useScreenSize from '../hooks/ScreenSize';
import { Link } from 'react-router-dom';
import {  Result } from '../types/projects';
import { useGetProjects } from '../hooks/getProjects';

export const SwiperProjects = () => {
  const { projects, projectImages } = useGetProjects();
  const { width } = useScreenSize();
  const isMobile = width <= 768;
  const isTablet = width <= 1000;
  const slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;

  if (!projects || !projectImages) {
    return null;
  }

  // Crear un mapa de imágenes de proyecto para acceso rápido
  const projectImageMap: { [key: string]: string } = projectImages.reduce((acc: { [key: string]: string }, image) => {
    const key = String(image.proyecto); // Convertir el número a string
    if (!acc[key]) {
      acc[key] = image.imagen;
    }
    return acc;
  }, {});

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
      {projects.results.map((project: Result) => (
        <SwiperSlide key={project.id}>
          <div className="projects border-0">
            {projectImageMap[project.id] && (
              <img src={projectImageMap[project.id]} alt={`Imagen de ${project.nombre}`} className="img-fluid slider-project-img" />
            )}
            <div className="card-info">
              <h4>{project.nombre}</h4>
              <p>{project.descripcion.slice(0, 90)}... <Link to={`/projects/${project.id}`}>ver más</Link></p>
            </div>
            <Link to={`/projects/${project.id}`}>
              <img src={iconarrow} alt={`Icono de flecha para ${project.nombre}`} className="icon-arrow" />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};