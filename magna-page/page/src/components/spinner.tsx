
import Lottie from "lottie-react";
import animationData from '../animations/Animation - 1706024995672.json';

const styles = {
  container: {
    opacity: 0,
    animation: 'fade-in 1s forwards',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  lottie: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Spinner = () => {
  return (
    <div style={styles.container}>
      <Lottie
        animationData={animationData}
        loop={true}
        height={200}
        width={200}
        // style={styles.lottie}
      />
    </div>
  );
};

export default Spinner;