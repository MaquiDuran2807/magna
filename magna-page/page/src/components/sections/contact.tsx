import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Acordeon from '../acordeon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useScreenSize from '../../hooks/ScreenSize';
import '../styles/contact.css'
import useIntersectionObserver from "../../hooks/useLazyload"
import { APIURL} from '../../apiClient';


export const Contact = () => {
  const { width } = useScreenSize();
  const isMobile = width <= 768;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  console.log(APIURL+"contact/");
 
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    try {
      // Perform the POST request to API_CONTACTO using the form data
      // Replace the following line with your actual API call

      await fetch(APIURL+"contact/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(values),
      }).then(response => {
        console.log(response);
      });
        

      toast.success('Formulario enviado con éxito, nos comunicaremos pronto');
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className={isMobile ? 'container-fluid' : 'container'}>
        <div className="row">
          <h2>
            <strong>Contacto</strong>
                      </h2>
        </div>
      <div className="row">
          <div className="col-12 col-md-6 contact-izq">
            <div className="row">
              <h3>
                <strong>ESCRÍBENOS </strong>
              </h3>
            </div>
            <div className="row">
              <h5>¿Listos para trabajar juntos?</h5>
            </div>
            <div className="row">
              <Formik
                initialValues={{
                  nombre: '',
                  telefono: '',
                  email: '',
                  mensaje: '',
                }}
                validationSchema={Yup.object({
                  nombre: Yup.string().required('El nombre es requerido'),
                  telefono: Yup.string().required(
                    'El teléfono es requerido'
                  ),
                  email: Yup.string()
                    .email('El correo electrónico no es válido')
                    .required('El correo electrónico es requerido'),
                  mensaje: Yup.string().required(
                    'El mensaje es requerido'
                  ),
                })}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    < label htmlFor="nombre">Nombre</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                    />  
                    <ErrorMessage name="nombre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                    />
                    <ErrorMessage name="telefono" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje</label>
                    <Field
                      as="textarea"
                      className="form-control"
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                    />
                    <ErrorMessage name="mensaje" />
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="col-12 col-md-6 contact-der p-0">
            <br />
            <br />
            <br />

            <div className="row">
              <div className="frecuentes">
                <br />
                <h3>
                  <strong>Preguntas Frecuentes</strong>
                </h3>
                <br />
                <Acordeon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {isSuccess && 'Nos comunicaremos pronto'}
    </section>
  );
}

export default function LazyContact () {
  const {  isVisible, ref } = useIntersectionObserver('100px');
  return (
      <div id="LazyServices" ref={ref}>
          {isVisible ? <Contact/> : null}
      </div>
  );
}