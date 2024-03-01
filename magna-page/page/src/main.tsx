import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { App} from './App'
import ProtectedRoute from "./routes/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './auth/AuthProvider'
import { Login } from './pages/login'
import { Cotizador } from './pages/cotizador';
import { Spinner } from './components/spinner';
const AboutUs = React.lazy(() => import('./pages/aboutUs'));
const Projects = React.lazy(() => import('./pages/projects'));
const ServecesDetail = React.lazy(() => import('./pages/servecesDetail'));
import ServiciosIdProvider from './hooks/GetsIdServices';
const ProjectDetail = React.lazy(() => import('./pages/projecsDetail'));
const ContactPage = React.lazy(() => import('./pages/contact'));
const BlogDetail = React.lazy(() => import('./pages/blogDetail'));
const Blog = React.lazy(() => import('./pages/blog'));
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/aboutUs',
      element: <AboutUs/>,
    },
    {
      path: '/services_topografia',
      element: <ServecesDetail issue='Topografía'/>,
    },
    {
      path: '/services_ingenieria',
      element: <ServecesDetail issue='Ingeniería y Consultoría'/>,
    },
    {
      path: '/services_ambiental',
      element: <ServecesDetail issue='Medio Ambiente'/>,
    },
    {
      path: '/servicios',
      element: <ServecesDetail issue='Servicios'/>,
    },
    {
      path: '/servicios/:id',
      element: <ServecesDetail issue='detailservices'/>,
    },
    {
      path: '/projects',
      element: <Projects/>,
    },
    {
      path: '/projects/:id',
      element: <ProjectDetail/>,
    },
    {
      path: '/contact',
      element: <ContactPage/>,
    },
    {
      path: '/blog',
      element: <Blog/>,
    },
    {
      path: '/blog/:id',
      element: <BlogDetail/>,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/cotizador",
          element: <Cotizador />,
        },
      ],
    },
  ],
  
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <React.Suspense fallback={<Spinner/>}>
            <ServiciosIdProvider>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </ServiciosIdProvider>
          </React.Suspense>
        </QueryClientProvider>
      </AuthProvider>
  </React.StrictMode>,
)