

import Lottie from "lottie-react";
import animationData from '../animations/Animation - 1706024995672.json';

const SplashScreen = () => {
  return (
    <div
      className="splash-screen "

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
      
    </div>
  );
};

export default SplashScreen;

// hacer que este componente tenga su propio fragmento de js y css

