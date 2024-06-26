import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { memo, useReducer } from 'react';
import Acordeon from '../acordeon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useScreenSize from '../../hooks/ScreenSize';
import '../styles/contact.css'
import useIntersectionObserver from "../../hooks/useLazyload"
import { APIURL} from '../../apiClient';


// Definición de acciones para useReducer
const actionTypes = {
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  RESET: 'RESET',
  ERROR: 'ERROR',
};

// Reducer para manejar el estado del formulario
const formReducer = (state: any, action: { type: any; }) => {
  switch (action.type) {
    case actionTypes.SUBMITTING:
      return { ...state, isSubmitting: true, isSuccess: false };
    case actionTypes.SUCCESS:
      return { ...state, isSubmitting: false, isSuccess: true };
    case actionTypes.RESET:
      return { ...state, isSubmitting: false, isSuccess: false };
    case actionTypes.ERROR: // Manejar el estado de error
      return { ...state, isSubmitting: false, isSuccess: false, error: true };
    default:
      return state;
  }
};

const Contact = memo(() => {

  const { width } = useScreenSize();
  const isMobile = width <= 768;
  const [state, dispatch] = useReducer(formReducer, { isSubmitting: false, isSuccess: false });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    dispatch({ type: actionTypes.SUBMITTING });
    console.log(values, 'values', APIURL);
    
    try {
      const response = await fetch(APIURL + "contact/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      toast.success('Formulario enviado con éxito, nos comunicaremos pronto');
      dispatch({ type: actionTypes.SUCCESS });
      resetForm({}); // Resetear el formulario aquí
    } catch (error) {
      toast.error('Hubo un error al enviar el formulario');
      dispatch({ type: actionTypes.ERROR }); // Despachar acción de error
    } finally {
      dispatch({ type: actionTypes.RESET }); // Cambiar a RESET para restablecer el estado
    }
  };
  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es requerido'),
    telefono: Yup.string().matches(/^\d+$/, 'El teléfono debe ser numérico').required('El teléfono es requerido'),
    email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
    mensaje: Yup.string().required('El mensaje es requerido'),
  });

  return (
    <section className="contact">
  <div className={isMobile ? 'container-fluid' : 'container'}>
    <div className="row">
      <h2 className="font-weight-bold">
        Contacto
      </h2>
    </div>
    <div className="row">
      <div className="col-12 col-md-6 contact-izq text-white p-3">
        <div className="row">
          <h3 className="font-weight-bold my-3">
            ESCRÍBENOS
          </h3>
        </div>
        <div className="row">
          <h5 className="my-3">¿Listos para trabajar juntos?</h5>
        </div>
        <div className="row">
        <Formik
          initialValues={{
            nombre: '',
            telefono: '',
            email: '',
            mensaje: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
            <Form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
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
                className="btn btn-secondary"
                onClick={() => {
                  
                  dispatch({ type: actionTypes.RESET });
                }}
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? 'Enviando...' : 'Enviar'}
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
          <div className="frecuentes bg-light">
            <br />
            <h3 className="font-weight-bold">
              Preguntas Frecuentes
            </h3>
            <br />
            <Acordeon />
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer />
  {state.isSuccess && 'Nos comunicaremos pronto'}
</section>
);
})

export default function LazyContact () {
  const {  isVisible, ref } = useIntersectionObserver('100px');
  return (
      <div id="LazyContact" ref={ref}>
          {isVisible ? <Contact/> : null}
      </div>
  );
}