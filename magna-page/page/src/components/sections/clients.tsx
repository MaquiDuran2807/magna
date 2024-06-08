
import LogoCarrusel from "../LogoCarrusel"
import { SetionHeader } from "../setionHeader"
import useIntersectionObserver from "../../hooks/useLazyload"
const Clients = () => {
  console.log("me rendericé Clientes seccion=====================");
  
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

export default function LazyClients () {
  const { isVisible, ref } = useIntersectionObserver('100px');

  return (
      <div id="LazyClients" ref={ref}>
          {isVisible ? <Clients/> : null}
      </div>
  );
}