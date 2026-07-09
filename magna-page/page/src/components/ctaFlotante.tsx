import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { BsHandIndex } from 'react-icons/bs';
import './styles/ctaFlotante.css'

const CtaFlotante = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHand, setShowHand] = useState(true);

  const scrollToForm = useCallback(() => {
    const tryScroll = () => {
      const el = document.getElementById('contact-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };
    if (!tryScroll()) {
      const interval = setInterval(() => {
        if (tryScroll()) clearInterval(interval);
      }, 200);
      setTimeout(() => clearInterval(interval), 3000);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (location.pathname === '/contact') {
      scrollToForm();
    } else {
      navigate('/contact');
    }
  }, [location.pathname, navigate, scrollToForm]);

  useEffect(() => {
    if (location.pathname === '/contact') {
      setTimeout(scrollToForm, 500);
    }
  }, [location.pathname, scrollToForm]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHand(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div className="cta-flotante-wrapper" onClick={handleClick}>
      <motion.button
        className="cta-flotante"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoChatbubbleEllipses size={22} />
        <span>Cuéntanos tu proyecto</span>
      </motion.button>
      {showHand && (
        <motion.div
          className="cta-flotante-mano"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 10] }}
          transition={{ duration: 2.5, repeat: 2, repeatDelay: 0.5 }}
        >
          <BsHandIndex size={24} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CtaFlotante;