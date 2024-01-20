import useScreenSize from '../../hooks/ScreenSize';
import Acordeon from '../acordeon';
import '../styles/contact.css'

export const Contact = () => {
    const { width} = useScreenSize();
    const isMobile = width <= 768;

    return(
        <section className="contact">
      <div className={
        isMobile ? "container-fluid" : "container"
      }>
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
              <h5>
                ¿Listos para trabajar juntos?
              </h5>
            </div>
            <div className="row">
              <form action="#" >
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input type="text" className="form-control" id="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea className="form-control" id="message" rows={3} defaultValue={""} />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Enviar
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
    </section>
    )
}