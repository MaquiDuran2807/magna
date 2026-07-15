import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import PagesLayout from '../layouts/pagesLayouts';
import Banner from '../components/banner';
import { FaDirections } from 'react-icons/fa';
import { FaSquarePhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoMdClock } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../components/styles/contact.css';
import imagen from '../assets/img/banner/projects.webp';
import useIntersectionObserver from '../hooks/useLazyload';
import { SetionHeader } from '../components/setionHeader';
import LogoCarrusel from '../components/LogoCarrusel';
import mapaColombia from '../assets/img/app/mapa colombia cobertura trabajos.png';

const LazyMapComponents = lazy(() => import('../components/maps'));
const Contact = lazy(() => import('../components/sections/contact'));

const contactInfo = [
  {
    icon: <FaDirections size={28} />,
    title: 'Dirección',
    value: 'Calle 98# 13B sur-150, T5- apto 101',
    subvalue: 'Ibagué, Tolima',
  },
  {
    icon: <FaSquarePhone size={28} />,
    title: 'Celular',
    value: '3015490115 / 3113394860',
  },
  {
    icon: <MdEmail size={28} />,
    title: 'Correo electrónico',
    value: (
      <a href="mailto:info@magnaingenieriaytopografia.com" className="contact-card-link">
        info@magnaingenieriaytopografia.com
      </a>
    ),
  },
  {
    icon: <IoMdClock size={28} />,
    title: 'Horario de atención',
    value: 'Lunes a Viernes',
    subvalue: '8:00 am - 5:00 pm',
  },
];

const ContactPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Contacto | Magna Ingeniería y Topografía</title>
        <meta name="description" content="Contáctanos. Oficina en Ibagué, Tolima. Trabajamos en todo Colombia. Celular: 3015490115 / 3113394860. Escríbenos a info@magnaingenieriaytopografia.com" />
        <meta name="keywords" content="Magna, Ingeniería, Topografía, Contacto, Ibagué, Tolima, Colombia, cobertura nacional" />
        <meta property="og:title" content="Contacto | Magna Ingeniería y Topografía" />
        <meta property="og:description" content="Oficina en Ibagué — Trabajamos en todo Colombia. Contáctanos para proyectos de ingeniería y topografía." />
        <meta property="og:url" content="https://magnaingenieriaytopografia.com/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contacto | Magna Ingeniería y Topografía" />
        <meta name="twitter:description" content="Contáctanos. Ingeniería y Topografía en Ibagué, Tolima — Cobertura nacional." />
      </Helmet>

      <PagesLayout>
        <Banner title="Contacto" paragraph="Contacto" image={imagen} />

        <section className="contact-info-section py-5">
          <div className="container">
            <div className="row g-4 justify-content-center">
              {contactInfo.map((item, index) => (
                <div className="col-12 col-sm-6 col-lg-3" key={index}>
                  <div className="contact-card">
                    <div className="contact-card-icon">
                      {item.icon}
                    </div>
                    <h5 className="contact-card-title">{item.title}</h5>
                    <p className="contact-card-value">{item.value}</p>
                    {item.subvalue && (
                      <p className="contact-card-subvalue">{item.subvalue}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="text-center py-5">Cargando formulario...</div>}>
          <Contact />
        </Suspense>

        <section className="coverage-banner" style={{ backgroundImage: `url(${mapaColombia})` }}>
          <div className="coverage-banner-overlay" />
          <div className="coverage-banner-content">
            <div className="coverage-banner-icon">
              <FaMapMarkerAlt />
            </div>
            <h2 className="coverage-banner-title">
              Oficina en Ibagué — Trabajamos en todo Colombia
            </h2>
            <div className="coverage-banner-divider" />
            <p className="coverage-banner-subtitle">
              No importa dónde esté tu proyecto. Nuestro equipo se desplaza a cualquier región del país para brindarte soluciones en ingeniería y topografía.
            </p>
          </div>
        </section>

        <section className="clientes-contact">
          <div className="container">
            <SetionHeader prefix="Nuestros" title="Clientes" />
            <LogoCarrusel />
          </div>
        </section>

        <section className="map-section py-5">
          <div className="container">
            <div className="map-section-header">
              <h3>Ubícanos</h3>
              <p>Estamos ubicados en Ibagué, Tolima</p>
              <div className="map-section-divider" />
            </div>
            <Suspense fallback={<div className="text-center py-5">Cargando mapa...</div>}>
              <LazyMapComponents />
            </Suspense>
          </div>
        </section>
      </PagesLayout>
    </div>
  );
};

export default function LazyContactPage () {
  const { isVisible, ref } = useIntersectionObserver('100px');
  return (
    <div id="LazyContactPage" ref={ref}>
      {isVisible ? <ContactPage /> : null}
    </div>
  );
}