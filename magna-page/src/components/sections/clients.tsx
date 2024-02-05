import React from "react";
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

export default function LazyClients () {
  const [show, setShow] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
      const onChange = (entries: IntersectionObserverEntry[],observer: { disconnect: () => void; }) => {
          const { isIntersecting } = entries[0];
          console.log(isIntersecting, 'aqui estoy en isIntersecting');
          
          if (isIntersecting) {
              setShow(true);
              observer.disconnect();
          }
      };

      const observer = new IntersectionObserver(onChange, {
          rootMargin: '100px',
      });

      if (elementRef.current) {
          observer.observe(elementRef.current);
      }

  }, []);

  return (
      <div id="LazyServices" ref={elementRef}>
          {show ? <Clients/> : null}
      </div>
  );
}