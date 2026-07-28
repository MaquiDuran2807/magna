import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetSubServicioDetail, useGetProjects } from '../hooks/getInfoPage';
import PagesLayout from '../layouts/pagesLayouts';
import Spinner from '../components/spinner';
import './styles/servicesDetail.css';

const SubServicioDetail: React.FC = () => {
    const { serviceSlug, subServiceSlug } = useParams<{ serviceSlug: string; subServiceSlug: string }>();
    const navigate = useNavigate();
    const { data: subServicio, isLoading } = useGetSubServicioDetail(subServiceSlug!);
    const { projects } = useGetProjects();

    useEffect(() => {
        if (!isLoading && !subServicio) {
            navigate('/servicios', { replace: true });
        }
    }, [isLoading, subServicio, navigate]);

    if (isLoading) return <Spinner />;
    if (!subServicio) return null;

    const proyectosRelacionados = projects?.results?.filter((p: any) =>
        p.subservicios?.some((s: any) => s.id === subServicio.id)
    ) || [];

    const canonicalUrl = `https://magnaingenieriaytopografia.com/servicios/${subServicio.servicio_padre.slug}/${subServicio.slug}`;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Servicios",
                "item": "https://magnaingenieriaytopografia.com/servicios"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": subServicio.servicio_padre.nombre,
                "item": `https://magnaingenieriaytopografia.com/servicios/${subServicio.servicio_padre.slug}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": subServicio.nombre
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>{subServicio.nombre} | Magna Ingeniería y Topografía</title>
                <meta name="description" content={
                    subServicio.meta_description || subServicio.descripcion.substring(0, 160)
                } />
                <meta name="keywords" content={
                    `Magna, ${subServicio.nombre}, ${subServicio.servicio_padre.nombre}, ingeniería, topografía, Ibagué, Tolima, Colombia`
                } />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={`${subServicio.nombre} | Magna Ingeniería y Topografía`} />
                <meta property="og:description" content={subServicio.meta_description || subServicio.descripcion.substring(0, 160)} />
                <meta property="og:url" content={canonicalUrl} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
            </Helmet>

            <PagesLayout>
                <div className="container py-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/servicios">Servicios</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/servicios/${subServicio.servicio_padre.slug}`}>
                                    {subServicio.servicio_padre.nombre}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {subServicio.nombre}
                            </li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <img
                                src={subServicio.imagen_tablet || subServicio.imagen}
                                srcSet={`
                                    ${subServicio.imagen_celular || subServicio.imagen} 450w,
                                    ${subServicio.imagen_tablet || subServicio.imagen} 1024w
                                `}
                                sizes="(max-width: 768px) 100vw, 800px"
                                alt={subServicio.nombre}
                                className="img-fluid rounded shadow"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <h1>{subServicio.nombre}</h1>
                            <p>{subServicio.descripcion}</p>
                            <Link to={`/servicios/${subServicio.servicio_padre.slug}`}>
                                <button className="boton-1">
                                    Ver todos los servicios de {subServicio.servicio_padre.nombre}
                                </button>
                            </Link>
                        </div>
                    </div>

                    {proyectosRelacionados.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-12">
                                <h3>Proyectos relacionados</h3>
                                <div className="row">
                                    {proyectosRelacionados.slice(0, 4).map((p: any) => (
                                        <div key={p.id} className="col-12 col-md-3 mb-3">
                                            <Link to={`/projects/${p.id}`}>
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{p.nombre}</h5>
                                                        <p className="card-text">{p.descripcion?.substring(0, 100)}...</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PagesLayout>
        </>
    );
};

export default SubServicioDetail;
