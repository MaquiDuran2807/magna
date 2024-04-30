import { APIURL } from "../apiClient";


interface Route {
    path: string;
    children?: Route[];
}

const createSitemap = (routes: Route[], domain: string): string => {
    const urls = routes.map((route: Route) => {
        const url = new URL(domain + route.path);
        let changefreq: string = "monthly";
        let priority: number = 0.5; // Por defecto
        let lastmod: string = new Date().toISOString().split('T')[0]; // Fecha actual

        // Ajustar changefreq, priority y lastmod según la ruta
        if (route.path === '/') {
            priority = 1.0;
        } else if (route.path === '/servicios') {
            priority = 0.9;
        } else if (route.path === '/aboutUs') {
            priority = 0.8;
        }

        return `
            <url>
                <loc>${url.href}</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>${changefreq}</changefreq>
                <priority>${priority}</priority>
            </url>
        `;
    });

    const sitemap: string = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls.join('\n')}
        </urlset>
    `;

    return sitemap;
};

const Sitemap = () => {
  const routes = [
    {
      path: '/',
    },
    {
      path: '/login',
    },
    {
      path: '/aboutUs',
    },
    {
      path: '/services_topografia',
    },
    {
      path: '/services_ingenieria',
    },
    {
      path: '/services_ambiental',
    },
    {
      path: '/servicios',
    },
    {
      path: '/servicios/:id',
    },
    {
      path: '/projects',
    },
    {
      path: '/projects/:id',
    },
    {
      path: '/contact',
    },
    {
      path: '/blog',
    },
    {
      path: '/blog/:id',
    },
    {
      path: "/",
      children: [
        {
          path: "/cotizador",
        },
      ],
    },
  ];

  const domain = APIURL;

  const sitemapXml = createSitemap(routes, domain);

  return (
    <pre>{sitemapXml}</pre>
  );
};

export default Sitemap;
