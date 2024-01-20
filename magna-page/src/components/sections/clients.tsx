import LogoCarrusel from "../LogoCarrusel"
import { SetionHeader } from "../setionHeader"
export const Clients = () => {
    return(
        <section className='clientes'>
      <div className="container">
        <div className="row">
          <SetionHeader title="Clientes" />
        </div>
      </div>
    <div className="container">
      <LogoCarrusel />
    </div>
    </section>
    )
}