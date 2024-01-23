
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1706024995672.json';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='text-white'>Bienvenido a Magna</h1>
        <Lottie
            options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
            }}
            height={400}
            width={400}
        />
    </motion.div>
  );
};

export default SplashScreen;
