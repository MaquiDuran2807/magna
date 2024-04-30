
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import animationData from '../animations/Animation - 1706024995672.json';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      
    >
      <header>
        <h1 className='text-white container'>Bienvenido a Magna</h1>
          <Lottie
              animationData={animationData}
              loop={true}
              height={400}
              width={400}
          />
      </header>
      
    </motion.div>
  );
};

export default SplashScreen;

// hacer que este componente tenga su propio fragmento de js y css

