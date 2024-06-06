import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import animationData from '../animations/Animation - 1706024995672.json';

const Spinner  = () => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='container'
    >
        <Lottie
            animationData={animationData}
            loop={true}
            height={200}
            width={200}
            style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
    </motion.div>
    </>
  );
};

export default Spinner;