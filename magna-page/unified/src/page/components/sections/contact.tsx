import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { memo, useReducer } from 'react';
import Acordeon from '../acordeon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/contact.css'
import useIntersectionObserver from "../../hooks/useLazyload"
import { APIURL} from '../../apiClient';
import { SetionHeader } from '../setionHeader';

const actionTypes = {
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  RESET: 'RESET',
  ERROR: 'ERROR',
};

const formReducer = (state: any, action: { type: any; }) => {
  switch (action.type) {
    case actionTypes.SUBMITTING:
      return { ...state, isSubmitting: true, isSuccess: false };
    case actionTypes.SUCCESS:
      return { ...state, isSubmitting: false, isSuccess: true };
    case actionTypes.RESET:
      return { ...state, isSubmitting: false, isSuccess: false };
    case actionTypes.ERROR:
      return { ...state, isSubmitting: false, isSuccess: false, error: true };
    default:
      return state;
  }
};

const Contact = memo(() => {

  const [state, dispatch] = useReducer(formReducer, { isSubmitting: false, isSuccess: false });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    dispatch({ type: actionTypes.SUBMITTING });

    try {
      const response = await fetch(APIURL + "/contact/", {
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
      resetForm({});
    } catch (error) {
      toast.error('Hubo un error al enviar el formulario');
      dispatch({ type: actionTypes.ERROR });
    } finally {
      dispatch({ type: actionTypes.RESET });
    }
  };
  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es requerido'),
    telefono: Yup.string().matches(/^\d+$/, 'El teléfono debe ser numérico').required('El teléfono es requerido'),
    email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
    mensaje: Yup.string().required('El mensaje es requerido'),
    consentimiento_datos: Yup.boolean().oneOf([true], 'Debe aceptar la política de tratamiento de datos'),
  });

  return (
    <section className="contact" id="contact-form">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <SetionHeader title="Contacto" />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-6 contact-izq text-white d-flex flex-column">
        <div className="p-4 d-flex flex-column h-100">
          <h3 className="font-weight-bold mb-2">
            ESCRÍBENOS
          </h3>
          <h5 className="mb-4">¿Listos para trabajar juntos?</h5>
          <div className="flex-grow-1">
          <Formik
            initialValues={{
              nombre: '',
              telefono: '',
              email: '',
              mensaje: '',
              consentimiento_datos: false,
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
                <div className="form-group form-check">
                  <Field
                    type="checkbox"
                    className="form-check-input"
                    id="consentimiento_datos"
                    name="consentimiento_datos"
                  />
                  <label className="form-check-label" htmlFor="consentimiento_datos">
                    Acepto la <a href="/politica-de-datos" target="_blank" rel="noopener noreferrer">política de tratamiento de datos</a>
                  </label>
                  <ErrorMessage name="consentimiento_datos" />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary mt-3"
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
      </div>
      <div className="col-12 col-md-6 contact-der d-flex">
        <div className="frecuentes bg-light w-100 p-4 d-flex flex-column">
          <h3 className="font-weight-bold mb-3">
            Preguntas Frecuentes
          </h3>
          <Acordeon />
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