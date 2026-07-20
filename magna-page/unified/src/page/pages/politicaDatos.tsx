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
              <div className="politica-card-header">
                <FaFileLines />
                <span>Información general</span>
              </div>
              <p>
                <strong>MAGNA INGENIERÍA Y TOPOGRAFÍA S.A.S.</strong>, identificada con NIT 901.124.025-8,
                con domicilio en la Calle 98 # 13B sur-150, T5- apto 101, Ibagué, Tolima, Colombia,
                y correo electrónico de contacto{' '}
                <a href="mailto:info@magnaingenieriaytopografia.com">info@magnaingenieriaytopografia.com</a>,
                actúa como responsable del tratamiento de los datos personales suministrados por sus
                clientes, proveedores, empleados y demás titulares de la información.
              </p>
            </div>

            <div className="politica-card">
              <div className="politica-card-header">
                <FaLock />
                <span>Marco legal</span>
              </div>
              <p>
                Esta política se rige por las siguientes disposiciones normativas:
              </p>
              <ul>
                <li>Ley 1581 de 2012 — "Por la cual se dictan disposiciones generales para la protección de datos personales"</li>
                <li>Decreto Reglamentario 1377 de 2013</li>
                <li>Decreto 1074 de 2015 (Compilación normativa sector comercio, industria y turismo)</li>
                <li>Sentencias de la Corte Constitucional relacionadas con el Habeas Data</li>
              </ul>
            </div>

            <div className="politica-card">
              <div className="politica-card-header">
                <FaCheck />
                <span>Finalidades del tratamiento</span>
              </div>
              <p>
                Los datos personales recopilados serán utilizados para las siguientes finalidades:
              </p>
              <ol>
                <li>Prestar los servicios de ingeniería civil, topografía, estudios de suelos, consultoría y demás actividades propias del objeto social de la compañía.</li>
                <li>Gestionar cotizaciones, facturación y comunicación comercial relacionada con los servicios contratados.</li>
                <li>Enviar información relevante sobre nuestros servicios, promociones, novedades y eventos del sector, siempre que el titular haya otorgado su autorización expresa.</li>
                <li>Dar cumplimiento a obligaciones legales, contractuales y regulatorias aplicables.</li>
                <li>Evaluar la calidad de nuestros servicios y realizar estudios de satisfacción.</li>
                <li>Gestionar procesos de selección de personal y hoja de vida.</li>
              </ol>
            </div>

            <div className="politica-card">
              <div className="politica-card-header">
                <FaCheck />
                <span>Derechos del titular</span>
              </div>
              <p>De conformidad con el artículo 8 de la Ley 1581 de 2012, el titular de los datos personales tiene los siguientes derechos:</p>
              <ol>
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a Magna Ingeniería y Topografía S.A.S. en su condición de responsable del tratamiento.</li>
                <li><strong>Solicitar prueba de la autorización</strong> otorgada al responsable del tratamiento.</li>
                <li><strong>Ser informado</strong> por el responsable, previa solicitud, respecto del uso que le ha dado a sus datos personales.</li>
                <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la Ley 1581 de 2012.</li>
                <li><strong>Revocar la autorización</strong> y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                <li><strong>Acceder en forma gratuita</strong> a sus datos personales que hayan sido objeto de tratamiento.</li>
              </ol>
            </div>

            <div className="politica-card">
              <div className="politica-card-header">
                <FaCheck />
                <span>Procedimiento para ejercer los derechos</span>
              </div>
              <p>
                El titular podrá ejercer sus derechos mediante comunicación escrita dirigida a nuestro
                correo electrónico{' '}
                <a href="mailto:info@magnaingenieriaytopografia.com">info@magnaingenieriaytopografia.com</a>,
                indicando:
              </p>
              <ol>
                <li>Nombre completo del titular y documento de identidad.</li>
                <li>Descripción de los hechos que dan lugar a la solicitud.</li>
                <li>Dirección de notificación y correo electrónico de contacto.</li>
                <li>Documentos que soporten la solicitud, cuando corresponda.</li>
              </ol>
              <p>
                La solicitud será respondida en un plazo máximo de quince (15) días hábiles contados
                a partir del día siguiente a la fecha de recibo, de conformidad con lo establecido en
                el artículo 14 de la Ley 1581 de 2012.
              </p>
            </div>

            <div className="politica-card">
              <div className="politica-card-header">
                <FaCheck />
                <span>Vigencia</span>
              </div>
              <p>
                La presente política de tratamiento de datos personales rige a partir de su publicación
                y permanecerá vigente de forma indefinida, o hasta que se realicen modificaciones
                sustanciales que serán comunicadas oportunamente a los titulares de la información.
              </p>
              <p className="politica-fecha">
                Última actualización: Julio de 2026
              </p>
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
