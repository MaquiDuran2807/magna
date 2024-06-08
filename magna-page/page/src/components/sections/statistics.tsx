
import "../styles/statistics.css"
import  Contador from "../contador"
import { GoProjectRoadmap } from "react-icons/go";
import { FaRegHandshake } from "react-icons/fa";
import MapaIcono from "../../assets/img/statistics/mapa-icono.svg";
import { TfiRulerAlt2 } from "react-icons/tfi";
import useIntersectionObserver from "../../hooks/useLazyload";


const Statistics = () => {
  console.log("me rendericé Statistics seccion=====================");
  
  return (
    <section className="statistics container-fluid" >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6  text-center ">
              <div className="statistic__number">
                <FaRegHandshake className="statistic__icon" size={40}/>
                <h3>
                  <Contador value={500}/><span className="">+</span>
                </h3>
                <h4 className="statistic__title ">Clientes</h4>
                <p className="text-white text-description">
                  Nos enorgullece contar con una amplia base de clientes satisfechos. Nuestra empresa se dedica a ofrecer soluciones de alta calidad, y es gracias a la confianza y lealtad de nuestros clientes que continuamos creciendo y mejorando. 
                </p>
              </div>
          </div>
          <div className="col-lg-6 statistics-1  text-center">
              <div className="statistic__number ">
                <GoProjectRoadmap className="statistic__icon" size={40}/>
                <h3>
                  <Contador value={1000}/><span className="">+</span>
                </h3>
                <h4 className="statistic__title ">Proyectos</h4>
                <p className="text-white text-description">
                  Nos enorgullece haber llevado a cabo una serie de proyectos exitosos. Nuestra empresa se dedica a transformar ideas en realidad, y es gracias a la diversidad y la envergadura de nuestros proyectos que continuamos innovando y creciendo.
                </p>
              </div>
          </div>
          <div className="col-lg-6 statistics-1  text-center">
              <div className="statistic__number">
                <TfiRulerAlt2  className="statistic__icon" size={40}/>
                <h3>
                  <Contador value={200000}/><span className="">+</span>
                </h3>
                <h4 className="statistic__title ">
                  Hectáreas medidas
                </h4>
                <p className="text-white text-description">
                Nos enorgullece haber intervenido una amplia superficie de terreno. Nuestra empresa se dedica a transformar ideas en realidad, y es gracias a la diversidad y la envergadura de nuestros proyectos que continuamos innovando y creciendo.
                </p>
              </div>
          </div>
          <div className="col-lg-6 statistics-1  text-center">
              <div className="statistic__number Colombia">
                <img src={MapaIcono} alt="mapa-icono" className="statistic__icon " width={60} />
                <h3>
                  <Contador value={32}/><span className=""></span>
                </h3>
                <h4 className="statistic__title ">
                  Cobertura nacional
                </h4>
                <p className="text-white text-description">
                  Nos enorgullece haber intervenido una amplia superficie de terreno. Nuestra empresa se dedica a transformar ideas en realidad, y es gracias a la diversidad y la envergadura de nuestros proyectos que continuamos innovando y creciendo.
                </p>
              </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default function LazyStatistics () {
  const {  isVisible, ref } = useIntersectionObserver('100px');
  return (
      <div id="LazyStatics" ref={ref}>
          {isVisible? <Statistics /> : null}
      </div>
  );
}

