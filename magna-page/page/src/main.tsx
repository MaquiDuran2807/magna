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
const LazyLogin = React.lazy(() => import('./pages/login'));
const LazyCotizador = React.lazy(() => import('./pages/cotizador'));
const LazyAboutUs = React.lazy(() => import('./pages/aboutUs'));
const LazyProjects = React.lazy(() => import('./pages/projects'));
const LazyServecesDetail = React.lazy(() => import('./pages/servecesDetail'));
const LazyProjectDetail = React.lazy(() => import('./pages/projecsDetail'));
const LazyContactPage = React.lazy(() => import('./pages/contact'));
const LazyBlogDetail = React.lazy(() => import('./pages/blogDetail'));
const LazyBlog = React.lazy(() => import('./pages/blog'));
import Sitemap from './sitemap/sitemap';
import Spinner from './components/spinner';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/sitemap.xml', element: <Sitemap /> },
  { path: '/login', element: <React.Suspense fallback={<Spinner />}><LazyLogin /></React.Suspense> },
  { path: '/aboutUs', element: <React.Suspense fallback={<Spinner />}><LazyAboutUs /></React.Suspense> },
  { path: '/servicios', element: <React.Suspense fallback={<Spinner />}><LazyServecesDetail /></React.Suspense> },
  { path: '/servicios/:id', element: <React.Suspense fallback={<Spinner />}><LazyServecesDetail /></React.Suspense> },
  { path: '/projects', element: <React.Suspense fallback={<Spinner />}><LazyProjects /></React.Suspense> },
  { path: '/projects/:projectArg', element: <React.Suspense fallback={<Spinner />}><LazyProjectDetail /></React.Suspense> },
  { path: '/contact', element: <React.Suspense fallback={<Spinner />}><LazyContactPage /></React.Suspense> },
  { path: '/blog', element: <React.Suspense fallback={<Spinner />}><LazyBlog /></React.Suspense> },
  { path: '/blog/:id', element: <React.Suspense fallback={<Spinner />}><LazyBlogDetail /></React.Suspense> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [{ path: '/cotizador', element: <React.Suspense fallback={<Spinner />}><LazyCotizador /></React.Suspense> }],
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
