import "./styles/logoCarrusel.css";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import confenalco from "../assets/img/logos/confenalco.jpg";
import saludtotal from "../assets/img/logos/saludtotal.png";
import negratin from "../assets/img/logos/negratin 1 posicion.svg";
import varianz from "../assets/img/logos/VARIANZ EMPRESA CLIENTE 8.png";
import renergetica from "../assets/img/logos/renergetica empresa 5.png";
import akuo from "../assets/img/logos/negratin.jpg";
import aquis from "../assets/img/logos/AQUIS 3.png";
import orion from "../assets/img/logos/download 9.png";
import bOccidente from "../assets/img/logos/occidente.png";
import power from "../assets/img/logos/power 9.png";
import ventus from "../assets/img/logos/ventus 2.png";
import tpf from "../assets/img/logos/tpf 4.png";






interface ParallaxProps {
  children: any;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    t
    let moveBy = directionFactor.current * baseVelocity * (delta / 2000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        
      </motion.div>
    </div>
  );
}

export default function LogoCarrusel() {
  return (
    <section>
      <ParallaxText baseVelocity={-2}>
        <img src={negratin}alt="confenalco" className="logos" />
        <img src={ventus} alt="salud total" className="logos" />
        <img src={aquis} alt="salud total" className="logos" />
        <img src={tpf} alt="salud total" className="logos" />
        <img src={renergetica} alt="salud total" className="logos" />
        <img src={bOccidente} alt="banco de occidente" className="logos" />
        <img src={akuo} alt="akuo" className="logos" />
        <img src={varianz} alt="varianz" className="logos" />
        <img src={power} alt="powertis" className="logos" />
        <img src={orion} alt="salud total" className="logos" />
        <img src={confenalco}alt="confenalco" className="logos" />
        <img src={saludtotal} alt="salud total" className="logos" />



        

        
      </ParallaxText>
    </section>
  );
}
