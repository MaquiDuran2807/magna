import { FaCheck, FaBullseye } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
import { IoLeafOutline } from "react-icons/io5";
import { LiaHandshakeSolid } from "react-icons/lia";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { SetionHeader } from "../setionHeader";
import { useGetAbout } from "../../hooks/getInfoPage";
import InfoCard from "../InfoCard";
import "../styles/aboutContent.css";

function valorIcon(nombre: string): JSX.Element {
    const n = nombre.toLowerCase();
    if (n.includes('lider')) return <FaBullseye size={24} />;
    if (n.includes('ecol') || n.includes('ambient')) return <IoLeafOutline size={24} />;
    if (n.includes('segur')) return <FaCheck size={24} />;
    if (n.includes('innov')) return <GiTrophy size={24} />;
    if (n.includes('honest')) return <FaCheck size={24} />;
    if (n.includes('lealt')) return <LiaHandshakeSolid size={24} />;
    if (n.includes('respons')) return <MdOutlinePeopleAlt size={24} />;
    if (n.includes('respet')) return <FaBullseye size={24} />;
    return <GiTrophy size={24} />;
}

function resaltarTexto(texto: string | null | undefined): (string | JSX.Element)[] {
    if (!texto) return [];
    const palabras = [
        { texto: 'equipo', clase: 'title-span' },
        { texto: 'alta calidad', clase: 'title-span' },
    ];
    const regex = new RegExp(`(${palabras.map(p => p.texto).join('|')})`, 'gi');
    return texto.split(regex).map((parte, i) => {
        const palabra = palabras.find(p => p.texto.toLowerCase() === parte.toLowerCase());
        return palabra ? <span key={i} className={palabra.clase}>{parte}</span> : parte;
    });
}

function AboutDestacado() {
    return (
        <div className="about-destacado-wrapper">
            <div className="about-destacado-pattern"></div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-1 d-none d-lg-block text-center">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="about-destacado-icon-main" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"></path>
                        </svg>
                    </div>
                    <div className="col-lg-11">
                        <p className="about-desc-secundaria">Nos distinguimos por ofrecer soluciones integrales, precisas y eficientes, apoyadas en tecnología de vanguardia y en el cumplimiento de los más altos estándares técnicos y de calidad. Nuestro compromiso es generar valor para nuestros clientes mediante información confiable, entregas oportunas y un acompañamiento técnico que facilite la toma de decisiones en cada etapa de sus proyectos</p>
                    </div>
                </div>
                <div className="about-destacado-cards">
                    <InfoCard
                        icon={
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="m19.93 8.21-3.6 1.68L14 7.7V6.3l2.33-2.19 3.6 1.68c.38.18.82.01 1-.36.18-.38.01-.82-.36-1L16.65 2.6a.99.99 0 0 0-1.13.2l-1.74 1.6A.98.98 0 0 0 13 4c-.55 0-1 .45-1 1v1H8.82C8.34 4.65 6.98 3.73 5.4 4.07c-1.16.25-2.15 1.25-2.36 2.43-.22 1.32.46 2.47 1.48 3.08L7.08 18H4v3h13v-3h-3.62L8.41 8.77c.17-.24.31-.49.41-.77H12v1c0 .55.45 1 1 1 .32 0 .6-.16.78-.4l1.74 1.6c.3.3.75.38 1.13.2l3.92-1.83c.38-.18.54-.62.36-1a.753.753 0 0 0-1-.36M6 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"></path>
                            </svg>
                        }
                        title="Tecnología de vanguardia"
                        description="Equipos de última generación para garantizar precisión y eficiencia en cada proyecto."
                    />
                    <InfoCard
                        icon={
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                            </svg>
                        }
                        title="Información confiable"
                        description="Datos verificados y certificados que respaldan cada decisión técnica."
                    />
                    <InfoCard
                        icon={
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"></path>
                            </svg>
                        }
                        title="Acompañamiento técnico"
                        description="Asesoría permanente desde el estudio inicial hasta la entrega final del proyecto."
                    />
                    <InfoCard
                        icon={
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6H23V8H22V19H23V21H1V19H2V8H1V6H4V4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V6ZM20 8H4V19H7V12H9V19H11V12H13V19H15V12H17V19H20V8ZM6 5V6H18V5H6Z"></path>
                            </svg>
                        }
                        title="Altos estándares de calidad"
                        description="Procesos certificados que cumplen con la normativa vigente del sector."
                    />
                </div>
            </div>
        </div>
    );
}

function AboutContent() {
    const { about } = useGetAbout();

    if (!about) return null;

    return (
        <div className="about-content">
            <div className="info container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="abautUs row">
                            <h4>¿Quiénes somos?</h4>
                            <h2>{resaltarTexto(about.descripcion)}</h2>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-6">
                        <div className="abautUs row">
                            <details className="acordeon" open>
                                <summary>
                                    <FaCheck size={30} className="icon-info" />
                                    visión
                                </summary>
                                <div>
                                    <p>{about.vision}</p>
                                </div>
                            </details>
                            <details className="acordeon" open>
                                <summary>
                                    <FaCheck size={30} className="icon-info" />
                                    misión
                                </summary>
                                <div>
                                    <p>{about.mision}</p>
                                </div>
                            </details>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 text-center mt-4">
                            <button className="boton-1">Contáctanos</button>
                        </div>
                    </div>
                </div>
            </div>

            <AboutDestacado />

            <section className="valores-section">
                <div className="container">
                    <div className="row">
                        <SetionHeader prefix="Nuestros" title="Valores" />
                    </div>
                    {about.valores && about.valores.length > 0 && (
                        <div className="row justify-content-center">
                            {about.valores.map((valor) => (
                                <div key={valor.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <InfoCard
                                        icon={valorIcon(valor.nombre)}
                                        title={valor.nombre}
                                        description={valor.descripcion}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AboutContent;