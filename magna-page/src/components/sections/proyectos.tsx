import React from 'react'
import { SetionHeader } from '../setionHeader'
import { SwiperProjects } from '../sliderProjects'
import '../styles/proyectos.css'


export const Proyectos = () => {
    return (
        
        <section className="proyectos">
            <div className="container">
                <div className="row">
                    <SetionHeader title="Proyectos" />
                </div>
                <div className="row">
                    <SwiperProjects />
                </div>
            </div>
        </section>
    )
}

export default function LazyProyectos () {
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
            {show ? <Proyectos /> : null}
        </div>
    );
  }