
import Lottie from "lottie-react";
import animationData from '../animations/Animation - 1706024995672.json';
import { useState, useEffect } from "react";

const styles = {
  container: {
    // opacity: 0,
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
  const [progress, setProgress] = useState(0);
          useEffect(() => {
            const timer = setInterval(() => {
              setProgress((prevProgress) => {
                if (prevProgress === 100) {
                  clearInterval(timer);
                  return prevProgress;
                } else {
                  return prevProgress + 1;
                }
              });
            }, 50);
            return () => {
              clearInterval(timer);
            };
          }, []);
  return (
    <div style={styles.container}>
      <Lottie
        animationData={animationData}
        loop={true}
        height={200}
        width={200}
        // style={styles.lottie}
      />
      <div>
          <div style={styles.container}>
            <div>
              {progress}% Loaded
            </div>
          </div>
          );
      </div>
    </div>
  );
};

export default Spinner;