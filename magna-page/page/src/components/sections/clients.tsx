
import LogoCarrusel from "../LogoCarrusel"
import { SetionHeader } from "../setionHeader"
import useIntersectionObserver from "../../hooks/useLazyload"
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

export default function LazyClients () {
  const { isVisible, ref } = useIntersectionObserver('100px');

  return (
      <div id="LazyServices" ref={ref}>
          {isVisible ? <Clients/> : null}
      </div>
  );
}