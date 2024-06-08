import React from 'react'
import ReactDOM from 'react-dom/client'

import Spinner from './components/spinner'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import ServiciosIdProvider from './hooks/GetsIdServices';
// const App = React.lazy(() => import('./App'));
import App from './App';
import ProtectedRoute from "./routes/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './auth/AuthProvider'
const Login = React.lazy(() => import('./pages/login'));
const Cotizador = React.lazy(() => import('./pages/cotizador'));
const AboutUs = React.lazy(() => import('./pages/aboutUs'));
const Projects = React.lazy(() => import('./pages/projects'));
const ServecesDetail = React.lazy(() => import('./pages/servecesDetail'));
const ProjectDetail = React.lazy(() => import('./pages/projecsDetail'));
const ContactPage = React.lazy(() => import('./pages/contact'));
const BlogDetail = React.lazy(() => import('./pages/blogDetail'));
const Blog = React.lazy(() => import('./pages/blog'));
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Sitemap from './sitemap/sitemap';







const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
    },
    {
      path: '/sitemap.xml',
      element: <Sitemap/>,
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
      path: '/projects/:projectArg',
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
          <ServiciosIdProvider>
          <React.Suspense fallback={<Spinner></Spinner>}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </React.Suspense>
          </ServiciosIdProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  
)
