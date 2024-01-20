
import "../styles/statistics.css"
import  Contador from "../contador"
import { GoProjectRoadmap } from "react-icons/go";
import { FaBuilding } from "react-icons/fa";
import { TbMapPlus } from "react-icons/tb";


export const Statistics = () => {
  // const controls = useAnimation();
  // const { ref, inView } = useInView();
  // const statisticsData = {
  //   number1: 100000,
  //   number2: 5000,
  //   number3: 100,
  //   number4: 1000
  // };

  // useEffect(() => {
  //   if (inView) {
  //     controls.start({
  //       scale: [0, statisticsData.number1],
  //       transition: { duration: 1 }
  //     });
  //   }
  // }, [controls, inView]);

  return (
    <section className="statistics container-fluid" >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4  text-center ">
              <div className="statistic__number">
                <FaBuilding className="statistic__icon" size={40}/>
                <h3>
                  <Contador value={10}/><span className="">+</span>
                </h3>
                <h4 className="statistic__title ">Clientes</h4>
                <p className="text-white text-description">
                Nos enorgullece contar con una amplia base de clientes satisfechos. Nuestra empresa se dedica a ofrecer soluciones de alta calidad, y es gracias a la confianza y lealtad de nuestros clientes que continuamos creciendo y mejorando. 
                </p>
              </div>
          </div>
          <div className="col-lg-4 statistics-1  text-center">
              <div className="statistic__number ">
                <GoProjectRoadmap className="statistic__icon" size={40}/>
                <h3>
                  <Contador value={100}/><span className="">+</span>
                </h3>
                <h4 className="statistic__title ">Proyectos</h4>
                <p className="text-white text-description">
                Nos enorgullece haber llevado a cabo una serie de proyectos exitosos. Nuestra empresa se dedica a transformar ideas en realidad, y es gracias a la diversidad y la envergadura de nuestros proyectos que continuamos innovando y creciendo.
                </p>
              </div>
          </div>
          <div className="col-lg-4 statistics-1  text-center">
              <div className="statistic__number">
                <TbMapPlus className="statistic__icon" size={40}/>
                <h3>
                  <Contador value={1000000}/><span className="">+</span>
                </h3>
                <h4 className="statistic__title ">
                  Hectareas intervenidas 
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
