import { FaCheck, FaBullseye } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
import { IoLeafOutline } from "react-icons/io5";
import { LiaHandshakeSolid } from "react-icons/lia";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { SetionHeader } from "../setionHeader";
import { useGetAbout } from "../../hooks/getInfoPage";
import "../styles/aboutContent.css";

function valorIcon(nombre: string): JSX.Element {
    const n = nombre.toLowerCase();
    if (n.includes('lider')) return <FaBullseye size={28} />;
    if (n.includes('ecol') || n.includes('ambient')) return <IoLeafOutline size={28} />;
    if (n.includes('segur')) return <FaCheck size={28} />;
    if (n.includes('innov')) return <GiTrophy size={28} />;
    if (n.includes('honest')) return <FaCheck size={28} />;
    if (n.includes('lealt')) return <LiaHandshakeSolid size={28} />;
    if (n.includes('respons')) return <MdOutlinePeopleAlt size={28} />;
    if (n.includes('respet')) return <FaBullseye size={28} />;
    return <GiTrophy size={28} />;
}

function resaltarTexto(texto: string): (string | JSX.Element)[] {
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

            <section className="valores-section">
                <div className="container">
                    <div className="row">
                        <SetionHeader prefix="Nuestros" title="Valores" />
                    </div>
                    {about.valores && about.valores.length > 0 && (
                        <div className="row justify-content-center">
                            {about.valores.map((valor) => (
                                <div key={valor.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <div className="valor-card">
                                        <div className="valor-icon">
                                            {valorIcon(valor.nombre)}
                                        </div>
                                        <h3 className="valor-nombre">{valor.nombre}</h3>
                                        <p className="valor-descripcion">{valor.descripcion}</p>
                                    </div>
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