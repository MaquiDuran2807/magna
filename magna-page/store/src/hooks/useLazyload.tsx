import  { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (rootMargin = '100px') => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Desconecta el observador cuando el componente es visible
          }
        },
        { rootMargin }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        observer.disconnect(); // Asegúrate de desconectar el observador cuando el componente se desmonte
      };
    }, [rootMargin]);
  
    return { isVisible, ref };
}

export default useIntersectionObserver;
