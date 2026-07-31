import { Helmet } from 'react-helmet-async';
import PagesLayout from '../layouts/pagesLayouts';
import Banner from '../components/banner';
import { FaShieldHalved, FaCheck, FaFileLines } from 'react-icons/fa6';
import { FaLock } from 'react-icons/fa';
import imagen from '../assets/img/banner/projects.webp';
import './styles/politicaDatos.css';
import useIntersectionObserver from '../hooks/useLazyload';

const PoliticaDatos = () => {
  return (
    <>
      <Helmet>
        <title>Política de Tratamiento de Datos | Magna Ingeniería y Topografía</title>
        <meta name="description" content="Política de tratamiento de datos personales de Magna Ingeniería y Topografía S.A.S. conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013." />
        <meta name="keywords" content="Magna, política de datos, habeas data, Ley 1581, protección de datos personales, Ibagué, Tolima, Colombia" />
        <meta property="og:title" content="Política de Tratamiento de Datos | Magna Ingeniería y Topografía" />
        <meta property="og:description" content="Conoce nuestra política de tratamiento de datos personales — Ley 1581 de 2012, Habeas Data." />
        <meta property="og:url" content="https://magnaingenieriaytopografia.com/politica-de-datos" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <PagesLayout>
        <Banner title="Política de Datos" paragraph="Protección de datos personales" image={imagen} />

        <section className="politica-header">
          <div className="container">
            <div className="politica-header-content">
              <FaShieldHalved className="politica-header-icon" />
              <h1>Política de Tratamiento de Datos Personales</h1>
              <p>Magna Ingeniería y Topografía S.A.S.</p>
              <div className="politica-divider" />
              <p className="politica-subtitle">
                En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013
              </p>
            </div>
          </div>
        </section>

        <section className="politica-body">
          <div className="container">
            <div className="politica-card">
              <div className="politica-card-header"><FaFileLines /><span>Información general</span></div>
              <p>
                <strong>MAGNA INGENIERÍA Y TOPOGRAFÍA S.A.S.</strong>, identificada con NIT 901.124.025-8,
                con domicilio en la Calle 98 # 13B sur-150, T5- apto 101, Ibagué, Tolima, Colombia,
                y correo electrónico de contacto{' '}
                <a href="mailto:info@magnaingenieriaytopografia.com">info@magnaingenieriaytopografia.com</a>,
                actúa como responsable del tratamiento de los datos personales suministrados.
              </p>
            </div>

            <div className="politica-card">
              <div className="politica-card-header"><FaLock /><span>Marco legal</span></div>
              <p>Esta política se rige por:</p>
              <ul>
                <li>Ley 1581 de 2012 — protección de datos personales</li>
                <li>Decreto Reglamentario 1377 de 2013</li>
                <li>Decreto 1074 de 2015</li>
                <li>Sentencias de la Corte Constitucional sobre Habeas Data</li>
              </ul>
            </div>

            <div className="politica-card">
              <div className="politica-card-header"><FaCheck /><span>Finalidades del tratamiento</span></div>
              <ol>
                <li>Prestar servicios de ingeniería, topografía, estudios de suelos y consultoría.</li>
                <li>Gestionar cotizaciones, facturación y comunicación comercial.</li>
                <li>Enviar información sobre servicios, promociones y novedades del sector.</li>
                <li>Cumplir obligaciones legales y contractuales.</li>
                <li>Evaluar la calidad de nuestros servicios.</li>
                <li>Gestionar procesos de selección de personal.</li>
              </ol>
            </div>

            <div className="politica-card">
              <div className="politica-card-header"><FaCheck /><span>Derechos del titular</span></div>
              <ol>
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales.</li>
                <li><strong>Solicitar prueba de la autorización</strong> otorgada.</li>
                <li><strong>Ser informado</strong> del uso de sus datos.</li>
                <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio.</li>
                <li><strong>Revocar la autorización</strong> o solicitar la supresión del dato.</li>
                <li><strong>Acceder gratuitamente</strong> a sus datos personales.</li>
              </ol>
            </div>

            <div className="politica-card">
              <div className="politica-card-header"><FaCheck /><span>Procedimiento para ejercer los derechos</span></div>
              <p>
                Enviar solicitud a{' '}
                <a href="mailto:info@magnaingenieriaytopografia.com">info@magnaingenieriaytopografia.com</a>
                {' '}con nombre, documento, descripción de la solicitud y datos de contacto.
                Respuesta en máximo 15 días hábiles (Ley 1581 de 2012, art. 14).
              </p>
            </div>

            <div className="politica-card">
              <div className="politica-card-header"><FaCheck /><span>Vigencia</span></div>
              <p>
                Esta política rige a partir de su publicación y permanecerá vigente de forma indefinida.
              </p>
              <p className="politica-fecha">Última actualización: Julio de 2026</p>
            </div>
          </div>
        </section>
      </PagesLayout>
    </>
  );
};

export default function LazyPoliticaDatos() {
  const { isVisible, ref } = useIntersectionObserver('100px');
  return (
    <div id="LazyPoliticaDatos" ref={ref}>
      {isVisible ? <PoliticaDatos /> : null}
    </div>
  );
}
