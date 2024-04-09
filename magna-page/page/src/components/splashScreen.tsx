
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import animationData from '../animations/Animation - 1706024995672.json';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      
    >
      <h1 className='text-white'>Bienvenido a Magna</h1>
        <Lottie
            animationData={animationData}
            loop={true}
            height={400}
            width={400}
        />
    </motion.div>
  );
};

export default SplashScreen;
