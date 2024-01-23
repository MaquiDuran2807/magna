
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='text-white'>Bienvenido a Magna</h1>
    </motion.div>
  );
};

export default SplashScreen;
