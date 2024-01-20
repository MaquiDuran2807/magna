// Date: 2/12/2023 started 2:20pm
//       2/12/2023 ended 2:50pm
import { useState,useEffect } from 'react';
import { useAuth } from "../auth/AuthProvider";
import { Form, Button } from 'react-bootstrap';
import { NavBar } from '../components/navBar';
import { useDispatch } from 'react-redux';
import { login } from "../redux/reducers/authSlice";

import './styles/login.css'
import { Navigate } from 'react-router-dom';

export const Login: React.FC =  () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth=useAuth();


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password); try {

        const res = await fetch("http://127.0.0.1:8000/auth/jwt/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          console.log(data);
          dispatch(login({ accessToken: data.access, refreshToken: data.refresh }));
          localStorage.setItem("refreshToken", data.refresh);
          auth.setAccessTokenAndRefreshToken(data.access, data.refresh);
          auth.saveUser(data);
          
        
      } catch (error) {
        console.log(error);
        return false;
      }
      

  };
  

  useEffect(() => {
    handleSubmit;
    }, []);

    if (auth.isAuthenticated) {
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

