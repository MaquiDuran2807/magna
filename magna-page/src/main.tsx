import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { App} from './App'
import ProtectedRoute from "./routes/PrivateRoute";
import store from './store'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './auth/AuthProvider'
import { Login } from './pages/login'
import { Cotizador } from './pages/cotizador';
import AboutUs from './pages/aboutUs';
import Projects from './pages/projects';
import { ServecesDetail } from './pages/servecesDetail';
import ServiciosIdProvider from './hooks/GetsIdServices';
import ProjectDetail from './pages/projecsDetail'
import ContactPage from './pages/contact';
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
    <Provider store={store} >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ServiciosIdProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ServiciosIdProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
