import useScreenSize from '../../hooks/ScreenSize';
import Acordeon from '../acordeon';
import {API_CONTACTO} from '../../constans';
import '../styles/contact.css'

import { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const { width } = useScreenSize();
  const isMobile = width <= 768;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  let formDatas = {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(e.target as HTMLFormElement,"hola");
      
      
      // Perform the POST request to API_CONTACTO using the form data
      // Replace the following line with your actual API call
      const formData = new FormData(e.target as HTMLFormElement);
      let object: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      console.log(object);
      await fetch(API_CONTACTO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(object)
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(data => {
          console.log(data);
          setIsSuccess(true);
        }).catch(error => {
          console.error('Hubo un error al enviar el formulario: ', error);
          alert('Hubo un error al enviar el formulario');
          setIsSuccess(false);
        });
      
      console.log('Form submitted successfully');
      
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar el formulario');
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" className="form-control" id="name" name="nombre" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="text" className="form-control" id="phone" name="telefono" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" className="form-control" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="mensaje"
                  rows={3}
                  defaultValue={''}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>

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
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Nos comunicaremos pronto
        </motion.div>
      )}
    </section>
  );
};
//     const { width} = useScreenSize();
//     const isMobile = width <= 768;

//     return(
//         <section className="contact">
//       <div className={
//         isMobile ? "container-fluid" : "container"
//       }>
//         <div className="row">
//           <h2>
//             <strong>Contacto</strong>
//           </h2>
//         </div>
//         <div className="row">
//           <div className="col-12 col-md-6 contact-izq">
//             <div className="row">
//               <h3>
//                 <strong>ESCRÍBENOS </strong>
//               </h3>
//             </div>
//             <div className="row">
//               <h5>
//                 ¿Listos para trabajar juntos?
//               </h5>
//             </div>
//             <div className="row">
//               <form action="#" >
//                 <div className="form-group">
//                   <label htmlFor="name">Nombre</label>
//                   <input type="text" className="form-control" id="name" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">Teléfono</label>
//                   <input type="text" className="form-control" id="phone" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Correo electrónico</label>
//                   <input type="email" className="form-control" id="email" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="message">Mensaje</label>
//                   <textarea className="form-control" id="message" rows={3} defaultValue={""} />
//                 </div>
//                 <br />
//                 <button type="submit" className="btn btn-primary">
//                   Enviar
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div className="col-12 col-md-6 contact-der p-0">
//             <br />
//             <br />
//             <br />
            
//             <div className="row">
//               <div className="frecuentes">
                
//                 <br />
//                 <h3>
//                   <strong>Preguntas Frecuentes</strong>
//                 </h3>
//                 <br />
//                 <Acordeon />

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     )
// }