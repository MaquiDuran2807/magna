import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Spinner from './components/spinner';
import ServiciosIdProvider from './hooks/GetsIdServices';
import App from './App';
import ProtectedRoute from "./routes/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthProvider } from './auth/AuthProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Componentes importados de manera normal
import Login from './pages/login';
import Cotizador from './pages/cotizador';
import AboutUs from './pages/aboutUs';
import Projects from './pages/projects';
import ServecesDetail from './pages/servecesDetail';
import ProjectDetail from './pages/projecsDetail';
import ContactPage from './pages/contact';
import BlogDetail from './pages/blogDetail';
import Blog from './pages/blog';
import Sitemap from './sitemap/sitemap';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/sitemap.xml', element: <Sitemap /> },
  { path: '/login', element: <Login /> },
  { path: '/aboutUs', element: <AboutUs /> },
  { path: '/servicios', element: <ServecesDetail issue='Servicios' /> },
  { path: '/servicios/:id', element: <ServecesDetail issue='detailservices' /> },
  { path: '/projects', element: <Projects /> },
  { path: '/projects/:projectArg', element: <ProjectDetail /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:id', element: <BlogDetail /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [{ path: '/cotizador', element: <Cotizador /> }],
  },
]);
console.log("main.tsx");

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ServiciosIdProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </ServiciosIdProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
