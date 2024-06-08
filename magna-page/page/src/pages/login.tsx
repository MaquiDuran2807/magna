// Date: 2/12/2023 started 2:20pm
//       2/12/2023 ended 2:50pm
//      1/02/2004 updated 9:00pm 15 minutos 150 a 84 lineas
import { useState,useEffect } from 'react';
import { useAuth } from "../auth/AuthProvider";
import { Form, Button } from 'react-bootstrap';
import  NavBar  from '../components/navBar';
import './styles/login.css'
import { Navigate } from 'react-router-dom';
import { useSigninMutation } from '../api/user';
import useIntersectionObserver from '../hooks/useLazyload';

const Login: React.FC =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutateAsync: signin } = useSigninMutation()
    const auth=useAuth();
    const data = auth.isTokenValid;
    
        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            try {
                const dataTokens =await signin({ email, password })
                if (dataTokens) {
                    await auth.validateToken();
                }
            } catch (error) {
                console.log(error)
            }
        }
  
  useEffect(() => {
    handleSubmit;
    }, []);
    if (data) {
        return <Navigate to="/cotizador" />;
    }
  return (
    <div className=' contenedor-login'>
        <NavBar/>
        <section className='section-login' >
            <div className='container login text-white'>
                <Form onSubmit={handleSubmit} className='row'>
                    <div className="col-10 col-sm-6 ">
                        <h1>Iniciar sesión</h1>
                        <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingresa tu email" onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
                        } />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
                        } />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">
                        Iniciar sesión
                        </Button>
                        {/* <p>¿No tienes una cuenta? <a href="/signup">Regístrate</a></p> */}
                    </div>
                    <div className="col-12 col-sm-6 rig text-center container ">
                        <h2>
                        Magna
                        </h2>
                        <br/>
                        <p className='text-white'>
                            Ingeniería y Topografía
                        </p>
                        
                        <br/>
                        <h5>
                            "Dando forma al mundo, un proyecto a la vez."
                        </h5>
                        
                    </div>
                </Form>
            </div>
        </section>
    </div>
  );
};

export default function LazyLogin() {
    const {  isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyLogin" ref={ref}>
            {isVisible ? <Login /> : null}
        </div>
    );
}


